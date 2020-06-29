import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export default withRouter(
  function Header(props) {
    const { user, userId, album, albumId } = props;
    return <header className='header'>
      <Link to='/' className='header__link'>Галерея</Link>

      {
        userId ?
          <React.Fragment>
            <span className='header__slash'> / </span>
            <Link to={`/${userId}`} className='header__link'>{`${user}`}</Link>
          </React.Fragment> :
          null
      }

      {
        albumId ?
          <React.Fragment>
            <span className='header__slash'> / </span>
            <Link to={`/${userId}/${albumId}`} className='header__link'>{`${album}`}</Link>
          </React.Fragment> :
          null
      }
    </header>;
  }
);
