import React, {useState} from 'react'
import classes from './howToUse.module.scss'

const HowToUse = () => {
    const [open, setOpen] = useState(false)

    function instruction() {
        return (
            <div className={classes.Exp}>
                <ul>
                    <li>
                        <h4>Как работает сайт</h4>
                        <b>Пошаговая инструкция</b>
                    </li>
                    <li>
                        <h4>Подберите комплектующие в конфигураторе</h4>
                        <b>Исходя из сценариев использования компьютера</b>
                    </li>
                    <li>
                        <h4>Наша нейросеть оценит вашу сборку</h4>
                        <b>По различным параметрам</b>
                    </li>
                    <li>
                        <h4>Комплектующие можно приобрести в любом магазине</h4>
                        <b>Наш сайт не осуществляет продаж</b>
                    </li>
                </ul>
            </div>
        )
    }

    function help() {
        return (
            <div className={classes.Help}>
                <h1>С чего начать сборку компьютера?</h1>
                <p>1. Определите цель использования ПК. Это поможет выбрать подходящие компоненты. Например, для игр
                    нужны высокие показатели производительности, а для работы — большой объём памяти или мощный
                    процессор.</p>
                <p>2. Начните подбор комплектующих в нашем конфигураторе. Мы рекомендуем начать с подбора процессора
                    исходя из ваших задач.</p>
                <p>3. Продолжите подбор других комплектующих в конфигураторе.</p>
                <button onClick={() => setOpen(false)}>Закрыть</button>
            </div>
        )
    }

    return (
        <div id='resume' className={classes.Wrapper}>
            <span>О проекте</span>
            <div className={classes.FirstSlide}>
                <div className={classes.TextWrapper}>
                    <h1>
                        Наш сайт создан, чтобы помочь Вам <p>собрать компьютер</p>
                    </h1>
                    {open ? (<button onClick={() => setOpen(false)}>Теперь понятно</button>) : (
                        <button onClick={() => setOpen(true)}>
                            Я не знаю с чего начать
                        </button>)}

                </div>
                {open ? help() : instruction()}
            </div>
        </div>
    )
}

export default HowToUse