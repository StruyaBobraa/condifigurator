import React from "react";
import popupClasses from "@/components/configurator/popup.module.scss";
import Button from "@/UI/button/button";
import renderPrice from "@/functions/price";


const Card = (props) => {
    function renderTdp() {
        let tdp = localStorage.cpuTdp.split('W')[0]
        const clock = localStorage.cpuBoostClock.split(' ')[0]
        tdp = tdp * 1.2
        if (localStorage.cpuCores > 7) {
            tdp = tdp * 1.2
        }
        if (4.4 < clock < 4.9) {
            tdp = tdp * 1.2
        }
        if (5.5 > clock > 5) {
            tdp = tdp * 1.2
        }
        if (clock > 5.6) {
            tdp = tdp * 1.4
        }
        if (localStorage.cpuTdp.split('W')[0] > 125) {
            tdp = tdp * 0.6
        }
        if (localStorage.cpuName.includes('X3D')) {
            tdp = tdp * 0.8
        }
        if (localStorage.cpuName.includes('i5-13') || localStorage.cpuName.includes('i5-126')) {
            tdp = tdp * 0.82
        }
        if (localStorage.cpuName.includes('i5-124') || localStorage.cpuName.includes('i5-11') || localStorage.cpuName.includes('i5-125')) {
            tdp = tdp * 1.1
        }
        if (localStorage.cpuName.includes('i9-129')) {
            tdp = tdp * 1.3
        }
        localStorage.cpuTdpR = tdp + 10 - 10
        return (
            <div className={popupClasses.Cores}>
                <p>
                    Заявленное: {localStorage.cpuTdp}
                    <br/>
                    Фактическое: {Math.floor(tdp * 0.8)} - {Math.floor(tdp)}W
                </p>
            </div>
        )
    }

    function renderHybridCores() {
        return (
            <div className={popupClasses.Cores}>
                <p>
                    Производительных: {localStorage.cpuThreads - localStorage.cpuCores}
                    <br/>
                    Энергоэффективных: {localStorage.cpuThreads - 2 * (localStorage.cpuThreads - localStorage.cpuCores)}
                </p>
            </div>
        )
    }

    function chipSet() {
        const cpuCpipset = localStorage.cpuChipsets
        const mbName = localStorage.mbName
        if (mbName.includes(cpuCpipset.split(',')[0])) {
            return (
                cpuCpipset.split(',')[0]
            )
        }
        if (mbName.includes(cpuCpipset.split(',')[1])) {
            return (
                cpuCpipset.split(',')[1]
            )
        }
        if (mbName.includes(cpuCpipset.split(',')[2])) {
            return (
                cpuCpipset.split(',')[2]
            )
        }
    }


    if (props.type === "cpu") {
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.cpuName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p
                        style={{borderRight: '1px solid #ffffff'}}>Архитектура: {localStorage.cpuGeneration}
                        <br/> Сокет: {localStorage.cpuSocket} <br/> Цена: {renderPrice(localStorage.cpuPrice, props.exchange)}</p>
                    <p style={{borderRight: '1px solid #ffffff'}}>Количество
                        ядер: {localStorage.cpuThreads % localStorage.cpuCores !== 0 ? renderHybridCores() : localStorage.cpuCores}</p>
                    <p>Количество
                        потоков: {localStorage.cpuThreads}
                        <br/> Частота: {localStorage.cpuBaseClock} - {localStorage.cpuBoostClock}</p>
                    <p style={{borderRight: '1px solid #ffffff'}}>Тепловыделение: {renderTdp()}</p>
                    <p style={{borderRight: '1px solid #ffffff'}}>Видеоядро: {localStorage.igp !== "null" ? localStorage.igp : "Нет"}<br/>L3
                        кэш: {localStorage.cpuCache}<br/>Техпроцесс: {localStorage.cpuProcess}нм</p>
                    <p>
                        <Button onClick={() => {
                            props.setItem(false)
                            props.setType("gpu")
                        }} text="Выбрать"/><br/>
                        <Button onClick={() => props.setItem(false)} text="Назад"/>
                    </p>
                </div>
            </div>
        )
    }
    if (props.type === "gpu") {
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.gpuName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p
                        style={{borderRight: '1px solid #ffffff'}}>Поколение: {localStorage.gpuGen}
                        <br/> Цена: {localStorage.gpuPrice !== "undefined" ? renderPrice(localStorage.gpuPrice, props.exchange) : "Входит в стоимость процессора"}
                    </p>
                    {localStorage.gpuMemory !== "undefined" ? (<p style={{borderRight: '1px solid #ffffff'}}>Объём
                            памяти: {localStorage.gpuMemory.split("GB")[0]}Гб <br/>Тип
                            памяти: {localStorage.gpuMemory.split(" ")[2]}<br/>Шина памяти: {localStorage.gpuBus}</p>) :
                        <p style={{borderRight: '1px solid #ffffff'}}>Использует оперативную память</p>}
                    <p>Архитектура: {localStorage.gpuGeneration}
                        <br/>Частота: {localStorage.gpuBaseClock} - {localStorage.gpuBoostClock}</p>
                    <p style={{borderRight: '1px solid #ffffff'}}>Тепловыделение: {localStorage.gpuTdp}<br/>{localStorage.gpuCores !== "undefined" ? `Количество ядер: ${localStorage.gpuCores}` : `Скорость памяти: ${localStorage.gpuBand}`}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Версия
                        pci-e: {localStorage.gPciGen !== "undefined" ? `${localStorage.gPciGen}, количество линий: ${localStorage.gPciLine}` : "Не использует pci-e"}
                    </p>
                    <p>
                        <Button onClick={() => {
                            props.setItem(false)
                            props.setType("mb")
                        }} text="Выбрать"/><br/>
                        <Button onClick={() => props.setItem(false)} text="Назад"/>
                    </p>
                </div>
            </div>
        )
    }
    if (props.type === "mb") {
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.mbName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p
                        style={{borderRight: '1px solid #ffffff'}}>Сокет: {localStorage.mbSocket}
                        <br/> Цена: {renderPrice(localStorage.mbPrice, props.exchange)}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Чипсет: {chipSet()}<br/>Форм-фактор: {localStorage.mbForm}
                    </p>
                    <p>
                        Тип ОЗУ: {localStorage.memType}<br/>Количество слотов: {localStorage.memSlots}<br/>Максимальный
                        объём: {localStorage.maxMemory}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Версия pci-e: {localStorage.mbPci}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Дополнительные функции: {localStorage.mbFeatures}
                    </p>
                    <p>
                        <Button onClick={() => {
                            props.setItem(false)
                            props.setType("ram")
                        }} text="Выбрать"/><br/>
                        <Button onClick={() => props.setItem(false)} text="Назад"/>
                    </p>
                </div>
            </div>
        )
    }
    if (props.type === "psu") {
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.psuName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Мощность: {localStorage.psuPower}W
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Сертификат: {localStorage.psuSert}<br/>
                        Цена: {renderPrice(localStorage.psuPrice, props.exchange)}
                    </p>
                    <p>
                        Форм-фактор: {localStorage.psuFF}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Диаметр вентилятора: {localStorage.psuFan}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Модульный: {localStorage.modular ? "Да" : "Нет"}
                    </p>
                    <p>
                        <Button onClick={() => {
                            props.setItem(false)
                            props.setType("rate")
                        }} text="Выбрать"/><br/>
                        <Button onClick={() => props.setItem(false)} text="Назад"/>
                    </p>
                </div>
            </div>
        )
    }
    if (props.type === "ram") {
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.ramName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Объём комплекта: {localStorage.ram}<br/>
                        Объём одного модуля: {localStorage.ram.split(" ")[0] / localStorage.ramModules} GB<br/>
                        Количество модулей: {localStorage.ramModules}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Тип памяти: {localStorage.memType}<br/>
                        Частота: {localStorage.ramSpeed}<br/>
                        Латентность: {localStorage.ramLatency}
                    </p>
                    <p>
                        Напряжение: {localStorage.ramVoltage}<br/>
                        Цена: {renderPrice(localStorage.ramPrice, props.exchange)}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Дополнительные функции: {localStorage.ramFeatures}
                    </p>
                    <p>
                        <Button onClick={() => {
                            props.setItem(false)
                            props.setType("psu")
                        }} text="Выбрать"/><br/>
                        <Button onClick={() => props.setItem(false)} text="Назад"/>
                    </p>
                </div>
            </div>
        )
    }
    if (props.type === "ssd") {
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.ssdName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Объём: {localStorage.ssdCapacity}<br/>
                        Интерфейс: {localStorage.ssdInterface}<br/>
                        Цена: {renderPrice(localStorage.ssdPrice, props.exchange)}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Скорость чтения: {localStorage.ssdRead}
                        <br/>
                        Скорость записи: {localStorage.ssdWrite}
                    </p>
                    <p>
                        <Button onClick={() => props.setItem(false)} text="Выбрать"/><br/>
                        <Button onClick={() => props.setItem(false)} text="Назад"/>
                    </p>
                </div>
            </div>
        )
    }
    if (props.type === "cooler") {
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.coolerName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Тип: {localStorage.coolerType}<br/>
                        {
                            localStorage.coolerType === "Жидкостная система охлаждения"
                                ? `Количество секций: ${localStorage.coolerSections}`
                                : localStorage.coolerType === "Башенный кулер"
                                    ? `Количество теплотрубок: ${localStorage.coolerHeatpipes}`
                                    : null
                        }
                        <br/>
                        Цена: {renderPrice(localStorage.coolerPrice, props.exchange)}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Диаметр вентиляторов: {localStorage.coolerFan}<br/>
                        Количество вентиляторов: {localStorage.coolerFanCount}<br/>
                    </p>
                    <p>
                        Коннектор: {localStorage.coolerConnectors}<br/>
                        Подсветка: {localStorage.coolerLighting}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Максимальная мощность отвода тепла: {localStorage.coolerTdp}W<br/>
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Высота: {localStorage.coolerHeight}<br/>
                    </p>
                    <p>
                        <Button onClick={() => props.setItem(false)} text="Выбрать"/><br/>
                        <Button onClick={() => props.setItem(false)} text="Назад"/>
                    </p>
                </div>
            </div>
        )
    }

}


export default Card