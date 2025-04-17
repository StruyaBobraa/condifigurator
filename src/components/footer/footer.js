import React from 'react';
import classes from './footer.module.scss';

const Footer = () => {

    return (
        <div className={classes.Wrapper}>
            <p>Версия: 8.0.0 | Авторы проекта: Глухов Фёдор, Югов Олег | Tg: <a
                style={{textDecoration: 'underline'}}
                href="https://t.me/Condifigurator_support">@Condifigurator_support</a>
            </p>
        </div>
    )
}

export default Footer