import React from 'react';
import classes from './footer.module.scss';
import Anchor from "@/UI/anchor/anchor";

const Footer = () => {

    return (
        <div className={classes.Wrapper}>
            <p style={{textTransform: 'none'}}>Версия: optimized 2.0 | Авторы проекта: Глухов Фёдор, Югов Олег | Tg: <Anchor
                href="https://t.me/Condifigurator_support" text="@Condifigurator_support"/>
            </p>
        </div>
    )
}

export default Footer