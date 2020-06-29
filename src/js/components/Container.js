import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from './Card';

export default withRouter(
  function Container (props) {
    const { url } = props
    return <main className='cards'>
      {
        props.data.map((element) => {
          return <Card key={`${url}${element.id}`} card={element} url={url} />;
        })
      }
    </main>;
}
);
