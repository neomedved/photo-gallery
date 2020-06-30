import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export default withRouter(
  function Popup (props) {
    const { src, alt, prevId, nextId, url } = props;
    return <div className='popup'>
      <div className='popup__content'>
        <Link to={url} className='popup__close' />
        {prevId ? <Link to={`${url}${prevId}`} className='popup__switch popup__switch_left'>{'<='}</Link> : null}
        {nextId ? <Link to={`${url}${nextId}`} className='popup__switch popup__switch_right'>{'=>'}</Link> : null}
        <img className='popup__image' src={src} alt={alt} />
      </div>
    </div>;
  },
);
