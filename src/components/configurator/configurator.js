import React, {useState} from 'react'
import classes from './configurator.module.scss'
import popupClasses from './popup.module.scss'

const Configurator = (props) => {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState(null)
    const [cpuType, setCpuType] = useState(null)
    const [cpu, setCpu] = useState(null)

    // console.log(props)

    function renderCpus() {
        const cpus = []
        let currentCpu = {}
        for (let i = 0; i < props.data.cpu.processors.length; i++) {
            if (cpuType === 1 && props.data.cpu.processors[i].performance_score <= 60) {
                cpus.push(props.data.cpu.processors[i])
            }
            if (cpuType === 2 && props.data.cpu.processors[i].performance_score <= 120 && props.data.cpu.processors[i].performance_score > 60 && props.data.cpu.processors[i].price <= 230) {
                cpus.push(props.data.cpu.processors[i])
            }
            if (cpuType === 3 && props.data.cpu.processors[i].performance_score > 120) {
                cpus.push(props.data.cpu.processors[i])
            }
        }
        return Object.keys(cpus).map((id) => {
            return (
                <div key={id} onClick={() => {
                    setOpen(false)
                    // localStorage.cpu = cpus[id];
                    currentCpu = {
                        name: cpus[id].name,
                        power: cpus[id].performance_score,
                        price: cpus[id].price,
                        tdp: cpus[id].tdp,
                    }
                    setCpu(currentCpu)
                    alert(cpu);
                }} className={popupClasses.CpuItem}>
                    <h1>{cpus[id].name}</h1>
                    <div className={popupClasses.Spec}>
                        <p>Ядра|потоки: {cpus[id].cores}|{cpus[id].threads}</p>
                        <span>Архитектура: {cpus[id].generation}</span>
                        <span>Частота: до {cpus[id].boost_clock}</span>
                        <span>Цена: {cpus[id].price}$</span>
                    </div>
                </div>
            )
        })
    }

    function cpuSecond() {
        return (
            <div className={popupClasses.CpuSecond}>
                <div className={popupClasses.CpuList}>
                    {renderCpus()}
                </div>
                <p>Вот варианты процессоров, которые мы рекомендуем Вам, основываясь на сценариях использования,
                    указанных Вами.</p>
            </div>
        )
    }

    function cpuFirst() {
        return (
            <div className={popupClasses.CpuFirst}>
                <span>Для каких задач вы будете использовать компьютер?</span>
                <div className={popupClasses.CpuFirstLinks}>
                    {/*<a className={popupClasses.CpuLinkA}>Нетребовательные офисные программы, работа с браузером.</a>
                    <a className={popupClasses.CpuLinkA}>Работа в тяжёлых программах, например 3D графика или монтаж.</a>*/}
                    <div style={{borderRight: "1px solid #E40037"}} className={popupClasses.CpuLink}><p>Работа</p>
                        <div className={popupClasses.LastCpuLinks}><a onClick={() => setCpuType(1)}>Нетребовательные
                            офисные программы, работа с браузером.</a><a onClick={() => setCpuType(3)}>Работа в тяжёлых
                            программах, например 3D графика или монтаж.</a></div>
                    </div>
                    <div className={popupClasses.CpuLink}><p>Игры</p>
                        <div className={popupClasses.LastCpuLinks}><a onClick={() => setCpuType(3)}>Тяжёлые игры с
                            высокими настройками графики.</a><a onClick={() => setCpuType(2)}>Игры c невысокими
                            настройками графики.</a></div>
                    </div>
                </div>
            </div>
        )
    }

    function cpuPopup() {
        return (
            <div className={popupClasses.Cpu}>
                <h1>Выбор процессора</h1>
                {localStorage.clear()}
                {cpuType === null ? cpuFirst() : cpuSecond()}
            </div>
        )
    }

    function renderPopup() {
        return (
            <div className={popupClasses.Wrapper}>
                <button onClick={() => {
                    setOpen(false)
                    setType(null)
                }}>
                    <svg fill="#E40037" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60%" height="60%"
                         viewBox="0 0 50 50">
                        <path
                            d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                    </svg>
                </button>
                {type === "/cpu.png" ? cpuPopup() : null}
            </div>
        )
    }

    function renderPortfolio(data) {
        return Object.keys(data).map((id) => {
            return (
                <div onClick={() => {
                    setOpen(true)
                    setType(data[id].backgroundImg)
                }} className={classes.AdWrapper} key={id}>
                    <div style={{backgroundImage: `url(${data[id].backgroundImg})`}} className={classes.Advertisement}>
                        <a>
                            <p>{data[id].desc}</p>
                        </a>
                    </div>
                    <strong>{data[id].name}</strong>
                </div>
            )
        })
    }

    return (
        <div id='portfolio' className={classes.Wrapper}>
            <span>Конфигуратор</span>
            {open ? renderPopup() : null}
            <div className={classes.Content}>
                {renderPortfolio(props.data.data.portfolio)}
            </div>
        </div>
    )
}

export default Configurator