import React, {useState} from "react";
import popupClasses from "@/components/configurator/popup.module.scss";
import cclasses from "@/components/configurator/configurator.module.scss";
import Popup from "@/UI/popup/popup/popup";
import renderPrice from "@/functions/price";
import Card from "@/UI/popup/card/card";

const MainPopup = (props) => {
    const [ssdHelp, setSsdHelp] = useState(false)
    const [ssD, setSsd] = useState(false)
    const [cooler, setCooler] = useState(false)



    function renderSsds() {
        const ssds = props.data.ssd.ssd_m2
        return Object.keys(ssds).map((id) => {
            return (
                <div key={id} onClick={() => {
                    setSsd(true)
                    localStorage.ssdName = ssds[id].name
                    localStorage.ssdCapacity = ssds[id].capacity
                    localStorage.ssdInterface = ssds[id].interface
                    localStorage.ssdRead = ssds[id].read_speed
                    localStorage.ssdWrite = ssds[id].write_speed
                    localStorage.ssdPrice = ssds[id].price
                }} className={popupClasses.CpuItem}>
                    <h1>{ssds[id].name}</h1>
                    <div className={popupClasses.Spec}>
                        <span>Чтение: {ssds[id].read_speed}</span>
                        <span>Интерфейс: {ssds[id].interface}</span>
                        <span>Запись: {ssds[id].write_speed}</span>
                        <span>Цена: {renderPrice(ssds[id].price, props.data.exc)}</span>
                    </div>
                </div>
            )
        })
    }

    function renderCoolers() {
        const coolers = []
        for (let i = 0; i < props.data.cooler.coolers.length; i++) {
            if (props.data.cooler.coolers[i].socket.includes(localStorage.cpuSocket) && props.data.cooler.coolers[i].tdp >= localStorage.cpuTdpR && props.data.cooler.coolers[i].tdp <= localStorage.cpuTdpR * 2) {
                coolers.push(props.data.cooler.coolers[i])
            }
        }
        return Object.keys(coolers).map((id) => {
            return (
                <div key={id} onClick={() => {
                    setCooler(true)
                    localStorage.coolerName = coolers[id].name
                    localStorage.coolerType = coolers[id].type
                    localStorage.coolerHeight = coolers[id].height
                    localStorage.coolerFan = coolers[id].fan
                    localStorage.coolerFanCount = coolers[id].fan_number
                    localStorage.coolerPrice = coolers[id].price
                    localStorage.coolerLighting = coolers[id].lighting
                    localStorage.coolerHeatpipes = coolers[id].heatpipes
                    localStorage.coolerSections = coolers[id].sections
                    localStorage.coolerSocket = coolers[id].socket
                    localStorage.coolerTdp = coolers[id].tdp
                    localStorage.coolerConnectors = coolers[id].connectors
                }} className={popupClasses.CpuItem}>
                    <h1>{coolers[id].name}</h1>
                    <div className={popupClasses.Spec}>
                        <span>Тип: {coolers[id].type}</span>
                        <span>Высота: {coolers[id].height}</span>
                        <span>Коннектор: {coolers[id].connectors}</span>
                        <span>Цена: {renderPrice(coolers[id].price, props.data.exc)}</span>
                    </div>
                </div>
            )
        })
    }

    function othSecond() {
        if (!ssD && !cooler) {
            return (
                <div className={cclasses.Rating}>
                    <div style={{display: 'flex', flexDirection: 'column', height: 'fit-content'}}>
                        <h1>Выбор накопителя:</h1>
                        <p>Вот несколько моделей, которые мы вам рекомендуем к покупке:</p>
                        <div style={{width: '100%', maxHeight: '300px'}} className={popupClasses.CpuList}>
                            {!ssdHelp ? renderSsds() : null}
                        </div>
                        <p style={ssdHelp ? null : {display: 'none'}}>
                            Для хранения данных в вашем ПК мы рекомендуем
                            использовать SSD-накопители. Они быстрее и дешевле чем HDD-накопители.
                            <br/>
                            SSD - накопители бывают в двух типах: M.2 накопители и 2.5" накопители. M.2 накопители в
                            свою
                            очередь делятся на два типа:
                            m.2 NVMe и m.2 SATA. Первые имеют гораздо более высокую скорость чтения и записи данных,
                            однако
                            их недостатком является высокая цена.
                            <br/>
                            2.5" накопители также подключаются по шине SATA, однако к материнской плате они подключены
                            специальным проводом, m.2 накопители в свою очередь вставляются в специальный разъём на
                            материнской плате.
                        </p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', height: 'fit-content'}}>
                        <h1>Выбор системы охлаждения:</h1>
                        <p>Система охлаждения должна иметь мощность теплоотвода не менее {localStorage.cpuTdpR}W. Вот
                            несколько моделей, которые подходят к вашему процессору:</p>
                        <div style={{width: '100%', maxHeight: '300px'}} className={popupClasses.CpuList}>
                            {!ssdHelp ? renderCoolers() : null}
                        </div>
                        <p style={ssdHelp ? null : {display: 'none'}}>
                            Система охлаждения - это важная часть вашего компьютера. Она отвечает за отвод тепла от
                            центрального
                            процессора. <br/>
                            При выборе системы охлаждения стоит обратить внимание на следующие параметры:
                            <ul>
                                <li>Мощность системы охлаждения. Она должна быть не меньше тепловыделения вашего
                                    процессора.
                                </li>
                                <li>Вид системы охлаждения. Она может быть воздушной или жидкостной.</li>
                                <li>Воздушная система охлаждения состоит из радиатора и вентилятора. Башенные кулеры
                                    имеют теплотрубки для более эффективного отвода тепла.
                                </li>
                                <li>Жидкостная система охлаждения состоит из водоблока, который отводит тепло от
                                    процессора и передает его жидкости, помпы, которая отвечает за циркуляцию жидкости в
                                    системе, трубок, по которым течёт жидкость и радиатора, где жидкость охлаждается за
                                    счет воздушного потока от вентиляторов.
                                </li>
                            </ul>
                        </p>
                    </div>
                </div>
            )
        }
        if (ssD && !cooler) {
            return (
                <Card setItem={(value) => setSsd(value)} type="ssd"/>
            )
        }
        if (!ssD && cooler) {
            return (
                <Card setItem={(value) => setCooler(value)} type="cooler"/>
            )
        }
    }

    function othPopup() {
        return (
            <div className={popupClasses.Cpu}>
                <h1>Выбор дополнительных компонентов
                    {!ssD && !cooler
                        ? <a className={cclasses.Help}
                             onClick={() => setSsdHelp(!ssdHelp)}>{ssdHelp ? "Скрыть справку" : "Показать справку"}</a>
                        : null
                    }

                </h1>
                {localStorage.cpuName && localStorage.gpuName && localStorage.mbName ? othSecond() :
                    <h1>Сначала выберите процессор, видеокарту и материнскую плату</h1>}
            </div>
        )
    }

    return (
        <div className={popupClasses.Wrapper}>

            <button onClick={props.onClose}>
                <svg fill="#8A2BE2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60%" height="60%"
                     viewBox="0 0 50 50">
                    <path
                        d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                </svg>
            </button>
            <Popup onBack={props.onClose} setType={(value) => props.setType(value)} data={props.data} type={props.type}/>
            {props.type === 'case' ? othPopup() : null}
        </div>
    );
};

export default MainPopup;