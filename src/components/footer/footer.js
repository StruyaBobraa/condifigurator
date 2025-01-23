import React from 'react';
import classes from './footer.module.scss';

const Footer = () => {
    return (
        <div className={classes.Wrapper}>
          <p>Версия: 3.5.0 alpha | Авторы проекта: Глухов Фёдор, Югов Олег | Tg: @c2btx</p>
        </div>
    )
}

export default Footer