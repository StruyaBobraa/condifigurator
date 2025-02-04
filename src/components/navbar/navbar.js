import React from 'react'
import classes from './navbar.module.scss'

const Navbar = (props) => {
  return (
    <div className={classes.Wrapper}>
      <h2>Кондифигуратор</h2>
      <div className={classes.Nav}>
        <a style={{color: '#E40037', textDecoration: 'underline', textTransform: 'uppercase'}} href='https://forms.gle/equiN4nxbBD2bNUf6'>Актуальность</a>
        <a href='/#portfolio'>Собрать компьютер</a>
        <a href='/#contact'>Обратная связь</a>
      </div>
    </div>
  )
}

export default Navbar