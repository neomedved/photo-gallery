import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export default withRouter(
  function Card(props){
    const { image, caption, id } = props.card;
    return <Link to={`${props.location.pathname.replace(/\/$/, '')}/${id}`}>
      {image ? <img src={image.src} alt={image.alt} /> : null}
      {
        caption ?
          <React.Fragment>
            <h3>{caption.title}</h3>
            <h4>{caption.subtitle}</h4>
          </React.Fragment> :
          null
      }
    </Link>
  }
);
