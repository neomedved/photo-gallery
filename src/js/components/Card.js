import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export default withRouter(
  function Card(props){
    const { image, caption, id } = props.card;
    return <Link to={`${props.location.pathname.replace(/\/$/, '')}/${id}`} className='cards__card'>
      {image ? <img src={image.src} alt={image.alt} className='cards__image'/> : null}
      {
        caption ?
          <React.Fragment>
            <h3 className='cards__title'>{caption.title}</h3>
            <h4 className='cards__subtitle'>{caption.subtitle}</h4>
          </React.Fragment> :
          null
      }
    </Link>
  }
);
