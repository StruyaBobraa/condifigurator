import React from 'react'
import classes from './navbar.module.scss'

const Navbar = (props) => {
  return (
    <div className={classes.Wrapper}>
      <h2>Кондифигуратор</h2>
      <div className={classes.Nav}>
        <a href='/#resume'>О проекте</a>
        <a href='/#portfolio'>Собрать компьютер</a>
        <a href='/#contact'>Обратная связь</a>
      </div>
    </div>
  )
}

export default Navbar