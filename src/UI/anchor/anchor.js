import React from "react";
import classes from "./anchor.module.scss";

const Anchor = (props) => {
    return (
        <a href={props.href} onClick={props.onClick !== undefined ? props.onClick : null} className={classes.Wrapper}>
            {props.text}
        </a>
    );
};

export default Anchor;