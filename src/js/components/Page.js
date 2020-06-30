import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
import Container from './Container';
import Popup from './Popup';
import Api from '../api/Api';
import { API_URL, PUBLIC_URL } from '../constants/config';

const api = new Api(API_URL);

export default withRouter(
  class Page extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        isLoaded: false,
        error: null,
        header: {},
        data: [],
      };
    }


    static async renderHeader (userId, albumId) {
      const album = albumId ? (await api.getAlbum(albumId)).title : null;
      const user = userId ? (await api.getUser(userId)).name : null;
      return {
        user,
        album,
      };
    }


    static async renderUsers () {
      const data = await api.getUsers();
      return {
        data: data.map((element) => {
          return {
            id: element.id,
            caption: {
              title: element.name,
              subtitle: `@${element.username}`,
            },
          };
        }),
      };
    }


    static async renderAlbums (userId) {
      const albums = await api.getAlbums(userId);
      return {
        data: await Promise.all(albums.map(async (element) => {
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
            },
          };
        })),
      };
    }


    static async renderPhotos (albumId, photoId) {
      const data = await api.getPhotos(albumId);
      let popup = null;
      const result = data.map((element, index) => {
        if (photoId === element.id.toString()) {
          popup = {
            src: element.url,
            alt: element.title,
            prevId: index > 0 ? data[index - 1].id : null,
            nextId: index < data.length - 1 ? data[index + 1].id : null,
          };
        }
        return {
          id: element.id,
          image: {
            src: element.thumbnailUrl,
            alt: `${element.title}`,
          },
        };
      });
      if (photoId && !popup) {
        throw new Error('Invalid Request');
      }
      return {
        data: result,
        popup,
      };
    }


    updateState () {
      const { userId, albumId, photoId } = this.props.match.params;
      let state;
      const promises = [];

      promises.push(Page.renderHeader(userId, albumId));

      if (albumId) {
        promises.push(Page.renderPhotos(albumId, photoId));
      } else if (userId) {
        promises.push(Page.renderAlbums(userId));
      } else {
        promises.push(Page.renderUsers());
      }

      Promise.all(promises)
        .then((result) => {
          state = {
            header: {
              ...result[0],
              userId,
              albumId,
            },
            ...result[1],
            isLoaded: true,
          };
        })
        .catch((error) => { state = { error }; })
        .finally(() => this.setState(state));
    }


    componentDidMount () {
      this.updateState();
    }

    componentDidUpdate (prevProps) {
      const { userId: prevUserId, albumId: prevAlbumId, photoId: prevPhotoId } = prevProps.match.params;
      const { userId, albumId, photoId } = this.props.match.params;
      if (userId !== prevUserId || albumId !== prevAlbumId || photoId !== prevPhotoId) {
        this.updateState();
      }
    }


    render () {
      if (this.state.error) {
        return <Redirect to={`${PUBLIC_URL}/error`} />;
      } else if (this.state.isLoaded) {
        const { userId, albumId } = this.state.header;
        const url = `${PUBLIC_URL}/${userId ? `${userId}/` : ''}${albumId ? `${albumId}/` : ''}`;
        return <React.Fragment>
          <Header {...this.state.header}/>
          <Container data={this.state.data} url={url} />
          {this.state.popup ? <Popup {...this.state.popup} url={url} /> : null}
        </React.Fragment>;
      } else {
        return null;
      }
    }
  },
);
