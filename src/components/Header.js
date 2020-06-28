import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const { user, userId, album, albumId } = props;
  return <header>
    <Link to='/'>Галерея</Link>

    {
      userId ?
        <React.Fragment>
          <span> / </span>
          <Link to={`/${userId}`}>{`${user}`}</Link>
        </React.Fragment> :
        null
    }

    {
      albumId ?
        <React.Fragment>
          <span> / </span>
          <Link to={`/${userId}/${albumId}`}>{`${album}`}</Link>
        </React.Fragment> :
        null
    }
  </header>;
};
