import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../constants/config';

export default withRouter(
  function Header (props) {
    const { user, userId, album, albumId } = props;
    return <header className='header'>
      <Link to={`${PUBLIC_URL}/`} className='header__link'>Галерея</Link>

      {
        userId
          ? <React.Fragment>
            <span className='header__slash'> / </span>
            <Link to={`${PUBLIC_URL}/${userId}`} className='header__link'>{`${user}`}</Link>
          </React.Fragment>
          : null
      }

      {
        albumId
          ? <React.Fragment>
            <span className='header__slash'> / </span>
            <Link to={`${PUBLIC_URL}/${userId}/${albumId}`} className='header__link'>{`${album}`}</Link>
          </React.Fragment>
          : null
      }
    </header>;
  },
);
