import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from './Card';

export default withRouter(
  function Container (props) {
    return <main>
      {
        props.data.map((element) => {
          return <Card key={`${props.location.pathname.replace(/\/$/, '')}/${element.id}`} card={element} />;
        })
      }
    </main>;
}
);
