import React from "react";
import classes from "./button.module.scss";

const Button = (props) => {
    return (
        <a style={props.style} href={props.href !== undefined ? props.href :null} className={classes.Wrapper} onClick={props.onClick}>
            {props.text}
        </a>
    );
}

export default Button