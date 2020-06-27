import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component{
  render() {
    const { user, userId, album, albumId } = this.props;
    return (
      <header>
        <Link to='/'>Галерея</Link>
        {userId ? <Link to={`/${userId}`}>{` / ${user}`}</Link> : null}
        {albumId ? <Link to={`/${userId}/${albumId}`}>{` / ${album}`}</Link> : null}
      </header>
    );
  }
};
