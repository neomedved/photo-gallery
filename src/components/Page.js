import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Api from '../api/Api';
import { BASE_URL } from '../constants/config';

const api = new Api(BASE_URL);

export default class Page extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      header: {},
    }
  }

  componentDidMount() {
    const { userId, albumId } = this.props.params;
    const state = { header: {} };
    const promises = [];

    if (albumId) {
      promises.push(api.getAlbum(albumId)
        .then((data) => {
          if (data.userId.toString() !== userId) {
            throw new Error('Invalid Request');
          } else {
            state.header.album = data.title;
            return Promise.resolve();
          }
        }));
    }

    if (userId) {
      promises.push(api.getUser(userId)
        .then((data) => {
          state.header.user = data.name;
          return Promise.resolve();
        }));
    }

    Promise.all(promises)
      .then(() => state.isLoaded = true)
      .catch((err) =>  state.error = err)
      .finally(() => this.setState(state));
  }

  static setParams(props) {
    return <Page params={props.match.params} />
  }

  render() {
    const { userId, albumId } = this.props.params;
    const { user, album } = this.state.header;
    if(this.state.isLoaded) {
    return <Header 
      userId={userId}
      user={user}
      albumId={albumId}
      album={album}
    />;
    } else if (this.state.error) {
      return <Redirect to='/error' />
    }
    else {
      return <Header />;
    }
  }
};
