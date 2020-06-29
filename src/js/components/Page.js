import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
import Container from './Container';
import Api from '../api/Api';
import { API_URL, PUBLIC_URL } from '../constants/config';

const api = new Api(API_URL);

export default withRouter(
  class Page extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        isLoaded: false,
        error: null,
        header: {},
        data: [],
      }
    }


    static async renderHeader (userId, albumId) {
      const album = albumId ? (await api.getAlbum(albumId)).title : null;
      const user = userId ? (await api.getUser(userId)).name : null;
      return {
        user,
        album,
      }
    }
    

    static async renderUsers() {
      const data = await api.getUsers();
      return data.map((element) => {
        return {
          id: element.id,
          caption: {
            title: element.name,
            subtitle: `@${element.username}`,
          },
        };
      });   
    }


    static async renderAlbums(userId){
      const albums = await api.getAlbums(userId);
      return await Promise.all(albums.map(async (element) => {
        const photos = await api.getPhotos(element.id);
        return {
          id: element.id,
          caption: {
            title: element.title,
            subtitle: `Фотографий: ${photos.length}`,
          },
          image: {
            src: photos[0].thumbnailUrl,
            alt: element.title,
          }
        }
      }));
    }


    static async renderPhotos(albumId) {
      const data = await api.getPhotos(albumId)  
      return data.map((element) => {
        return {
          id: element.id,
          image: {
            src: element.thumbnailUrl,
            alt: `${element.title}`,
          }
        };
      });
    }


    updateState() {
      const { userId, albumId } = this.props.match.params;
      const state = {
        header: {
          userId,
          albumId,
        },
        data: [],
      };
      const promises = [];

      promises.push(Page.renderHeader(userId, albumId, state));

      if(albumId) {
        promises.push(Page.renderPhotos(albumId,state));
      } else if (userId) {
        promises.push(Page.renderAlbums(userId));
      } else {
        promises.push(Page.renderUsers());
      }

      Promise.all(promises)
        .then((result) => {
          state.header = {
            ...state.header,
            ...result[0],
          };
          state.data = result[1];
          state.isLoaded = true;
        })
        .catch((err) =>  state.error = err)
        .finally(() => this.setState(state));
    }


    componentDidMount() {
      this.updateState();
    }

    componentDidUpdate(prevProps) {
      const { userId: prevUserId, albumId: prevAlbumId } = prevProps.match.params;
      const { userId, albumId } = this.props.match.params;
      if(userId !== prevUserId || albumId !== prevAlbumId) {
        this.updateState();
      }
    }


    render() {
      if (this.state.error) {
        return <Redirect to={`${PUBLIC_URL}/error`} />
      } else if (this.state.isLoaded) {
        return <React.Fragment>
          <Header {...this.state.header}/>
          <Container data={this.state.data} />
        </React.Fragment>;
      } else {
        return null;
      }
    }
  }
);
