import React from "react";
import popupClasses from "@/components/configurator/popup.module.scss";
import renderPrice from "@/functions/price";


const List = (props) => {
    const sort = props.sort
    const cpuType = props.cpuType
    const gpuType = props.gpuType
    const cpuName = props.cpuName
    const gpuName = props.gpuName

    if (props.type === "cpu") {
        localStorage.clear()
        const cpus = []
        for (let i = 0; i < props.data.cpu.processors.length; i++) {
            if (cpuName === "") {
                if (cpuType === "all") {
                    cpus.push(props.data.cpu.processors[i])
                } else {
                    if (cpuType === 1 && props.data.cpu.processors[i].performance_score <= 70) {
                        cpus.push(props.data.cpu.processors[i])
                    }
                    if (cpuType === 2 && props.data.cpu.processors[i].performance_score <= 150 && props.data.cpu.processors[i].performance_score > 70 && props.data.cpu.processors[i].price_performance_ratio * 1.2 >= 0.6) {
                        cpus.push(props.data.cpu.processors[i])
                    }
                    if (cpuType === 3 && props.data.cpu.processors[i].performance_score > 150) {
                        cpus.push(props.data.cpu.processors[i])
                    }
                }
            } else if (props.data.cpu.processors[i].name.toUpperCase().includes(cpuName.toUpperCase())) {
                cpus.push(props.data.cpu.processors[i])
            }
        }
        if (sort === "price") {
            cpus.sort((a, b) => a.price - b.price)
        }
        if (sort === "perf") {
            cpus.sort((a, b) => b.performance_score - a.performance_score)
        }
        if (sort === "price_r") {
            cpus.sort((a, b) => b.price - a.price)
        }
        if (sort === "price_p") {
            cpus.sort((a, b) => b.price_performance_ratio - a.price_performance_ratio)
        }
        return Object.keys(cpus).map((id) => {
            return (
                <div key={id} onClick={() => {
                    props.setItem(true)
                    localStorage.clear()
                    localStorage.igp = cpus[id].igpu
                    localStorage.cpuName = cpus[id].name
                    localStorage.cpuPower = cpus[id].performance_score
                    localStorage.cpuPrPer = cpus[id].price_performance_ratio * 1.2
                    localStorage.cpuPrice = cpus[id].price
                    localStorage.cpuTdp = cpus[id].tdp
                    localStorage.cpuBaseClock = cpus[id].base_clock
                    localStorage.cpuBoostClock = cpus[id].boost_clock
                    localStorage.cpuGeneration = cpus[id].generation
                    localStorage.cpuCores = cpus[id].cores
                    localStorage.cpuThreads = cpus[id].threads
                    localStorage.cpuSocket = cpus[id].socket
                    localStorage.cpuCache = cpus[id].l3_cache
                    localStorage.cpuProcess = cpus[id].tprocess
                    localStorage.cpuChipsets = cpus[id].recommended_chipsets
                }} className={popupClasses.CpuItem}>
                    <h1>{cpus[id].name}</h1>
                    <div className={popupClasses.Spec}>
                        <span>Ядра | потоки: {cpus[id].cores} | {cpus[id].threads}</span>
                        <span>Цена: {renderPrice(cpus[id].price, props.data.exc)}</span>
                        <span>Частота: до {cpus[id].boost_clock}</span>
                        <span>Видеоядро: {cpus[id].igpu !== null ? cpus[id].igpu : "Нет"}</span>
                    </div>
                </div>
            )
        })
    } else if (props.type === "gpu") {
        const gpus = []
        for (let i = 0; i < props.data.gpu.graphics_cards.length; i++) {

            if (gpuName === "") {
                if (gpuType && props.data.gpu.graphics_cards[i].graphics_core_count === undefined) {
                    gpus.push(props.data.gpu.graphics_cards[i])
                } else {
                    if (props.data.gpu.graphics_cards[i].graphics_core_count === undefined) {
                        if (localStorage.cpuPrice * 3 > props.data.gpu.graphics_cards[i].price && localStorage.cpuPrice * 1.5 < props.data.gpu.graphics_cards[i].price) {
                            gpus.push(props.data.gpu.graphics_cards[i])
                        }
                    }
                }
            } else if (props.data.gpu.graphics_cards[i].name.toUpperCase().includes(gpuName.toUpperCase()) && props.data.gpu.graphics_cards[i].graphics_core_count === undefined) {
                gpus.push(props.data.gpu.graphics_cards[i])
            }
        }
        if (sort === "price") {
            gpus.sort((a, b) => a.price - b.price)
        }
        if (sort === "perf") {
            gpus.sort((a, b) => b.performance_score - a.performance_score)
        }
        if (sort === "price_r") {
            gpus.sort((a, b) => b.price - a.price)
        }
        if (sort === "price_p") {
            gpus.sort((a, b) => b.price_performance_ratio - a.price_performance_ratio)
        }
        gpus.reverse()
        for (let i = 0; i < props.data.gpu.graphics_cards.length; i++) {
            if (props.data.gpu.graphics_cards[i].name === localStorage.igp) {
                gpus.push(props.data.gpu.graphics_cards[i])
            }
        }
        gpus.reverse()
        return Object.keys(gpus).map((id) => {
            return (
                <div key={id} onClick={() => {
                    props.setItem(true)
                    localStorage.gpuCores = gpus[id].graphics_core_count
                    localStorage.gpuName = gpus[id].name
                    localStorage.gpuGen = gpus[id].generation
                    localStorage.gpuPower = gpus[id].performance_score
                    if ('40 Series50 Series7000 Series'.includes(gpus[id].generation) && gpus[id].price > 600) {
                        localStorage.gpuPrice = parseInt(gpus[id].price * 1.4)
                    } else if ('40 Series50 Series7000 Series'.includes(gpus[id].generation) && gpus[id].price <= 600) {
                        localStorage.gpuPrice = parseInt(gpus[id].price * 1.1)
                    } else {
                        localStorage.gpuPrice = gpus[id].price
                    }
                    localStorage.gpuTdp = gpus[id].tdp
                    localStorage.gpuBaseClock = gpus[id].core_clock
                    localStorage.gpuBoostClock = gpus[id].boost_clock
                    localStorage.gpuGeneration = gpus[id].gpu_architecture
                    localStorage.gpuMemory = gpus[id].memory
                    localStorage.gpuBus = gpus[id].memory_bus
                    localStorage.gpuBand = gpus[id].memory_bandwidth
                    localStorage.gPciGen = gpus[id].pci_e
                    localStorage.gPciLine = gpus[id].pci_e_lines
                    localStorage.gpuPrPer = gpus[id].price_performance_ratio * 1.2
                }} className={popupClasses.CpuItem}>
                    <h1>{gpus[id].name} {gpus[id].name === localStorage.igp ? "(встроенная в выбранный процессор)" : null}</h1>
                    <div className={popupClasses.Spec}>
                        <span>Видеопамять: {gpus[id].memory !== undefined ? gpus[id].memory : "Использует оперативную"}</span>
                        <span>Архитектура: {gpus[id].gpu_architecture}</span>
                        <span>Частота: до {gpus[id].boost_clock}</span>
                        <span>Цена: {gpus[id].price !== undefined ? '40 Series50 Series7000 Series'.includes(gpus[id].generation) && gpus[id].price > 600 ? renderPrice(parseInt(gpus[id].price * 1.4), props.data.exc) : '40 Series50 Series7000 Series'.includes(gpus[id].generation) && gpus[id].price < 600 ? renderPrice(parseInt(gpus[id].price * 1.1), props.data.exc) : renderPrice(gpus[id].price, props.data.exc) : "Входит в стоимость процессора"}</span>
                    </div>
                </div>
            )
        })
    } else if (props.type === "mb") {
        const mbs = []
        for (let i = 0; i < props.data.mb.motherboards.length; i++) {
            if (props.data.mb.motherboards[i].socket === localStorage.cpuSocket && (props.data.mb.motherboards[i].name.includes(localStorage.cpuChipsets.split(',')[0]) || props.data.mb.motherboards[i].name.includes(localStorage.cpuChipsets.split(',')[1]) || props.data.mb.motherboards[i].name.includes(localStorage.cpuChipsets.split(',')[2]))) {
                mbs.push(props.data.mb.motherboards[i])
            }
        }
        if (sort === "price") {
            mbs.sort((a, b) => a.price - b.price)
        }
        if (sort === "vrm") {
            mbs.sort((a, b) => b.power_supply_headroom - a.power_supply_headroom)
        }
        if (sort === "price_r") {
            mbs.sort((a, b) => b.price - a.price)
        }
        if (sort === "quality") {
            mbs.sort((a, b) => b.quality_rating - a.quality_rating)
        }
        return Object.keys(mbs).map((id) => {
            return (
                <div key={id} onClick={() => {
                    props.setItem(true)
                    localStorage.mbName = mbs[id].name
                    localStorage.mbSocket = mbs[id].socket
                    localStorage.mbForm = mbs[id].form_factor
                    localStorage.memSlots = mbs[id].memory_slots
                    localStorage.maxMemory = mbs[id].max_memory
                    localStorage.memType = mbs[id].supported_memory_types
                    localStorage.mbPci = mbs[id].pci_express_slots
                    localStorage.quality = mbs[id].quality_rating
                    localStorage.mbPsu = mbs[id].power_supply_headroom
                    localStorage.mbPrice = mbs[id].price
                    localStorage.mbFeatures = mbs[id].features
                }} className={popupClasses.CpuItem}>
                    <h1>{mbs[id].name}</h1>
                    <div className={popupClasses.Spec}>
                        <span>Сокет: {mbs[id].socket}</span>
                        <span>Форм-фактор: {mbs[id].form_factor}</span>
                        <span>Слотов ОЗУ: {mbs[id].memory_slots}</span>
                        <span>Цена: {renderPrice(mbs[id].price, props.data.exc)}</span>
                    </div>
                </div>
            )
        })
    } else if (props.type === "ram") {
        const rams = []
        for (let i = 0; i < props.data.ram.memory_kits.length; i++) {
            if (props.data.ram.memory_kits[i].memory_type === localStorage.memType && ((150 > localStorage.cpuPower && localStorage.cpuPower > 80 && props.data.ram.memory_kits[i].capacity.split(' ')[0] >= 16) || (localStorage.cpuPower >= 150 && props.data.ram.memory_kits[i].capacity.split(' ')[0] >= 32)) || (localStorage.cpuPower <= 80 && props.data.ram.memory_kits[i].capacity.split(' ')[0] <= 16)) {
                rams.push(props.data.ram.memory_kits[i])
            }
        }
        if (sort === "price") {
            rams.sort((a, b) => a.price - b.price)
        }
        if (sort === "price_r") {
            rams.sort((a, b) => b.price - a.price)
        }
        return Object.keys(rams).map((id) => {
            return (
                <div key={id} onClick={() => {
                    props.setItem(true)
                    localStorage.ramName = rams[id].name
                    localStorage.ram = rams[id].capacity
                    localStorage.dualChanel = rams[id].modules !== 1
                    localStorage.ramModules = rams[id].modules
                    localStorage.ramSpeed = rams[id].speed
                    localStorage.ramLatency = rams[id].latency
                    localStorage.ramVoltage = rams[id].power_consumption
                    localStorage.ramQuality = rams[id].quality_rating
                    localStorage.ramFeatures = rams[id].features
                    localStorage.ramPrice = rams[id].price
                }} className={popupClasses.CpuItem}>
                    <h1>{rams[id].name}</h1>
                    <div className={popupClasses.Spec}>
                        <span>Объём комплекта: {rams[id].capacity}</span>
                        <span>Тип: {localStorage.memType}</span>
                        <span>Частота: {rams[id].speed}</span>
                        <span>Цена: {renderPrice(rams[id].price, props.data.exc)}</span>
                    </div>
                </div>
            )
        })
    } else if (props.type === "psu") {
        localStorage.psuReqPwr = Math.round((localStorage.gpuTdp.split(' ')[0] * 1 + localStorage.cpuTdpR * 0.9) / 10) * 20
        const psus = []
        for (let i = 0; i < props.data.psu.power_supplies.length; i++) {
            if (props.data.psu.power_supplies[i].wattage >= localStorage.psuReqPwr && props.data.psu.power_supplies[i].wattage <= localStorage.psuReqPwr * 1.75) {
                psus.push(props.data.psu.power_supplies[i])
            }
        }
        if (sort === "price") {
            psus.sort((a, b) => a.price - b.price)
        }
        if (sort === "quality") {
            psus.sort((a, b) => b.quality_rating - a.quality_rating)
        }
        if (sort === "price_r") {
            psus.sort((a, b) => b.price - a.price)
        }
        return Object.keys(psus).map((id) => {
            return (
                <div key={id} onClick={() => {
                    props.setItem(true)
                    localStorage.psuName = psus[id].name
                    localStorage.psuPower = psus[id].wattage
                    localStorage.psuSert = psus[id].efficiency_rating
                    localStorage.psuFF = psus[id].form_factor
                    localStorage.modular = psus[id].modular !== "Non-Modular";
                    localStorage.psuFan = psus[id].fan
                    localStorage.psuQuality = psus[id].quality_rating
                    localStorage.psuPrice = psus[id].price
                }} className={popupClasses.CpuItem}>
                    <h1>{psus[id].name}</h1>
                    <div className={popupClasses.Spec}>
                        <span>Мощность: {psus[id].wattage}W</span>
                        <span>Сертификат: {psus[id].efficiency_rating}</span>
                        <span>Форм-фактор: {psus[id].form_factor}</span>
                        <span>Цена: {renderPrice(psus[id].price, props.data.exc)}</span>
                    </div>
                </div>
            )
        })
    }
}

export default List