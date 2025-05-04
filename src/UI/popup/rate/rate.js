import React from 'react'
import popupClasses from "@/components/configurator/popup.module.scss";
import cclasses from "@/components/configurator/configurator.module.scss";
import renderPrice from "@/functions/price";


const Rate = (props) => {
    const cpuPwr = Math.round(Math.sqrt(localStorage.cpuPower / 230) * 1000) / 10
    const cpuPrPer = Math.round(localStorage.cpuPrPer * 1000) / 10
    const gpuPwr = Math.round(Math.sqrt(localStorage.gpuPower / 370) * 1000) / 10
    let gpuPrPer = Math.round(localStorage.gpuPrPer * 1000) / 10
    if (localStorage.gpuPrPer < 0.4) {
        gpuPrPer = Math.round((1 - localStorage.gpuPrPer) * 1000) / 10
    }
    let mbPsu = null
    if (localStorage.mbPsu === "0") {
        mbPsu = 20
    }
    if (localStorage.mbPsu === "1") {
        mbPsu = 50
    }
    if (localStorage.mbPsu === "2") {
        mbPsu = 80
    }
    if (localStorage.mbPsu === "3") {
        mbPsu = 100
    }
    if (localStorage.cpuName !== undefined && localStorage.gpuName !== undefined && localStorage.mbName !== undefined && localStorage.psuName) {
        return (
            <div className={popupClasses.Cpu}>
                <h1>Оценка Вашей сборки</h1>
                <div className={cclasses.Rating}>
                    <div>
                        <h1>Процессор: {localStorage.cpuName}</h1>
                        <p>Цена: {renderPrice(localStorage.cpuPrice, props.exchange)}</p>
                        <p>Относительная производительность: {cpuPwr}%
                            <div className={cclasses.Quality}>
                                <div style={{width: `${cpuPwr}%`}}/>
                            </div>
                        </p>
                        <p>Цена / производительность: {cpuPrPer}%
                            <div className={cclasses.Quality}>
                                <div style={{width: `${cpuPrPer}%`}}/>
                            </div>
                        </p>
                        <p>Энергопотребление: {Math.floor(localStorage.cpuTdpR * 0.8)} - {Math.floor(localStorage.cpuTdpR)}W</p>
                    </div>
                    <div>
                        <h1>Видеокарта: {localStorage.gpuName}</h1>
                        {localStorage.igp !== localStorage.gpuName ?
                            <p>Цена: {renderPrice(localStorage.gpuPrice, props.exchange)}</p> : null}
                        <p>Относительная производительность: {gpuPwr}%
                            <div className={cclasses.Quality}>
                                <div style={{width: `${gpuPwr}%`}}/>
                            </div>
                        </p>
                        {localStorage.igp !== localStorage.gpuName ? <p>Цена / производительность: {gpuPrPer}%
                            <div className={cclasses.Quality}>
                                <div style={{width: `${gpuPrPer}%`}}/>
                            </div>
                        </p> : null}
                        <p>Оптимальное разрешение монитора в
                            играх: {gpuPwr >= 90 ? "4К" : gpuPwr < 90 && gpuPwr >= 70 ? "2560 x 1440" : gpuPwr < 70 && gpuPwr >= 55 ? "1920 x 1080" : gpuPwr >= 40 && gpuPwr < 55 ? "1600 x 900" : "1366 x 768"}</p>
                        <p>Энергопотребление: {localStorage.gpuTdp}</p>
                    </div>
                    <div>
                        <h1>Материнская плата: {localStorage.mbName}</h1>
                        <p>Цена: {renderPrice(localStorage.mbPrice, props.exchange)}</p>
                        <p>Рейтинг надёжности: {Math.round(localStorage.quality * 200) / 10}%
                            <div className={cclasses.Quality}>
                                <div style={{width: `${Math.round(localStorage.quality * 200) / 10}%`}}/>
                            </div>
                        </p>
                    </div>
                    <div>
                        <h1>Блок питания: {localStorage.psuName}</h1>
                        <p>Цена: {renderPrice(localStorage.psuPrice, props.exchange)}</p>
                        <p>Рейтинг надёжности: {Math.round(localStorage.psuQuality * 200) / 10}%
                            <div className={cclasses.Quality}>
                                <div style={{width: `${Math.round(localStorage.psuQuality * 200) / 10}%`}}/>
                            </div>
                        </p>
                        <p>Сертификат: {localStorage.psuSert}</p>
                        <p>Мощность: {localStorage.psuPower}W</p>
                    </div>
                </div>
                <div className={cclasses.Advice}>
                    <h1>Рекомендации</h1>
                    {cpuPwr < gpuPwr + 12 && gpuPwr < cpuPwr + 12 ?
                        <p>Хорошее соотношение мощности между процессором и
                            видеокартой.</p> : cpuPwr > gpuPwr + 12 ?
                            <p style={{color: "#E40037"}}>Для выбранного процессора видеокарта недостаточно мощная и
                                будет слабым звеном в системе.</p> :
                            <p style={{color: "#E40037"}}>Для выбранного процессора видеокарта слишком мощная,
                                рекомендуем выбрать более мощный процессор или более дешёвую видеокарту.</p>}
                    {cpuPrPer < 50 ?
                        <p style={{color: "#E40037"}}>Советуем пересмотреть выбор процессора. У выбранной модели
                            неоправданно высокая цена.</p> :
                        <p>Процессор имеет приемлемое соотношение цены к производительности.</p>}
                    {localStorage.gPciGen !== "undefined" ? gpuPrPer < 50 ?
                            <p style={{color: "#E40037"}}>Советуем пересмотреть выбор видеокарты. У выбранной модели
                                неоправданно высокая цена.</p> :
                            <p>Видеокарта имеет приемлемое соотношение цены к производительности.</p> :
                        <p>Проверка соотношения цены к производительности не выполняется для интегрированных
                            видеокарт.</p>}
                    {localStorage.cpuPrice * 3 >= localStorage.gpuPrice && localStorage.cpuPrice * 1.5 <= localStorage.gpuPrice ?
                        <p>Процессор и видеокарта имеют хорошее соотношение
                            цен.</p> : localStorage.cpuPrice * 2.75 < localStorage.gpuPrice ?
                            <p style={{color: "#E40037"}}>Для выбранного процессора данная видеокарта слишком
                                дорогая, сборка
                                несбалансированна.</p> : localStorage.cpuPrice * 1.5 > localStorage.gpuPrice ?
                                <p style={{color: "#E40037"}}>Для выбранного процессора данная видеокарта слишком
                                    дешёвая, сборка несбалансированна.</p> :
                                <p>Проверка соотношения цен процессора и видеокарты не выполняется для
                                    интегрированных видеокарт.</p>}
                    {(localStorage.cpuTdpR >= 240 && mbPsu === 100) || (localStorage.cpuTdpR <= 240 && 150 <= localStorage.cpuTdpR && 80 <= mbPsu) || (localStorage.cpuTdpR <= 150 && 80 <= localStorage.cpuTdpR && mbPsu >= 50) || (localStorage.cpuTdpR < 79) ?
                        <p>Подсистема питания материнской платы способна выдавать необходимую мощность
                            процессору.</p> :
                        <p style={{color: "#E40037"}}>Подсистема питания материнской платы недостаточно мощная для
                            выбранного процессора.</p>}
                    {localStorage.quality * 20 < 50 && localStorage.cpuPrice > 150 ?
                        <p style={{color: "#E40037"}}>Среднее качество компонентов материнской платы недостаточно
                            высокое чтобы обеспечить стабильную и долговечную работу процессора.</p> :
                        <p>Качество компонентов материнской платы соответствует процессору.</p>}
                    {localStorage.gPciGen !== "undefined" ? localStorage.gPciGen <= localStorage.mbPci.split(' ')[1] ?
                            <p>Версия pci-e на материнской плате и на видеокарте совместимы для нормальной работы.</p> :
                            <p style={{color: "#E40037"}}>На выбранной материнской плате более старая версия pci-e, это
                                может привести к потере производительности.</p> :
                        <p>Проверка совместимости версий pci-e не выполняется для интегрированных видеокарт.</p>}
                </div>
            </div>
        )
    } else {
        return (
            <div className={
                popupClasses.Cpu
            }>
                <h1 style={{width: "80%"}}>Сначала
                    выберите {localStorage.cpuName === undefined ? "процессор," : null}
                    {localStorage.gpuName === undefined ? " видеокарту," : null}
                    {localStorage.mbName === undefined ? " материнскую плату," : null}
                    {localStorage.psuName === undefined ? " блок питания," : null}
                    {localStorage.ramName === undefined ? " ОЗУ" : null}</h1>
            </div>
        )
    }
}

export default Rate