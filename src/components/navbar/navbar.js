import React from 'react'
import classes from './navbar.module.scss'
import Anchor from "@/UI/anchor/anchor";
import Button from "@/UI/button/button";

const Navbar = (props) => {
    return (
        <div className={classes.Wrapper}>
            <h2>Кондифигуратор</h2>
            <div style={{textTransform: 'uppercase'}} className={classes.Nav}>
                <Anchor href='https://forms.gle/equiN4nxbBD2bNUf6' text='Актуальность'/>
                <Anchor href='/#portfolio' text='Собрать компьютер'/>
                <Button href='/#contact' text='Обратная связь'/>
            </div>
        </div>
    )
}

export default Navbar