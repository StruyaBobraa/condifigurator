import React from "react";
import classes from './backdrop.module.scss'


const Backdrop = (props) => {
    return (
        <div style={props.visible ? null : {backgroundColor: "transparent", zIndex: "-10"}} onClick={props.onClick} className={classes.Backdrop}/>
    )
}

export default Backdrop