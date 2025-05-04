import React from 'react'
import classes from './input.module.scss'

const Input = (props) => {
    if (props.type === 'textarea') return <textarea style={{height: '30%'}} value={props.value} onChange={props.onChange} placeholder={props.placeholder} className={classes.Wrapper} />
    if (props.type === 'input') return <input value={props.value} type={'text'} onChange={props.onChange} placeholder={props.placeholder} className={classes.Wrapper} />
}

export default Input