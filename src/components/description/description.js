import React, from 'react'
import classes from './description.module.scss'

const Description = () => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.TextWrapper}>
        {/*<span>Некоммерческий</span>*/}
        <p>Умный конфигуратор</p>
        <h2>Сборки компьютера</h2>
        {/*<div className={classes.Circle}/>*/}
      </div>
    </div>
  )
}

export default Description