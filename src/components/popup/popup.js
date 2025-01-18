import React, { useState } from 'react';
import classes from './popup.module.scss';

const Popup = ( props ) => {
  const [hidden, setHidden] = useState(true)

  return (
    <div style={hidden ?{display: 'none'} :null} className={classes.Wrapper}>
      <p>
        Popup window
      </p>
    </div>
  )
}

export default Popup