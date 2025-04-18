import React, {useState} from 'react'
import cclasses from './configurator.module.scss'
import popupClasses from './popup.module.scss'

const Configurator = (props) => {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState(null)
    const [cpuType, setCpuType] = useState(null)
    const [cpu, setCpu] = useState(false)
    const [cpuHelp, setCpuHelp] = useState(false)
    const [gpu, setGpu] = useState(false)
    const [gpuHelp, setGpuHelp] = useState(false)
    const [gpuType, setGpuType] = useState(null)
    const [mbHelp, setMbHelp] = useState(false)
    const [mb, setMb] = useState(false)
    const [psu, setPsu] = useState(false)
    const [psuHelp, setPsuHelp] = useState(false)
    const [ram, setRam] = useState(false)
    const [ramHelp, setRamHelp] = useState(false)
    const [cpuName, setCpuName] = useState("")
    const [gpuName, setGpuName] = useState("")
    const [othersHelp, setOthersHelp] = useState(false)
    const [ssdHelp, setSsdHelp] = useState(false)
    const [ssD, setSsd] = useState(false)
    const [cooler, setCooler] = useState(false)
    const [cpuSort, setCpuSort] = useState("default")

    function renderCpuCard() {
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

        console.log(localStorage)
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.cpuName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p
                        style={{borderRight: '1px solid #ffffff'}}>Архитектура: {localStorage.cpuGeneration}
                        <br/> Сокет: {localStorage.cpuSocket} <br/> Цена: {localStorage.cpuPrice}$</p>
                    <p style={{borderRight: '1px solid #ffffff'}}>Количество
                        ядер: {localStorage.cpuThreads % localStorage.cpuCores !== 0 ? renderHybridCores() : localStorage.cpuCores}</p>
                    <p>Количество
                        потоков: {localStorage.cpuThreads}
                        <br/> Частота: {localStorage.cpuBaseClock} - {localStorage.cpuBoostClock}</p>
                    <p style={{borderRight: '1px solid #ffffff'}}>Тепловыделение: {renderTdp()}</p>
                    <p style={{borderRight: '1px solid #ffffff'}}>Видеоядро: {localStorage.igp !== "null" ? localStorage.igp : "Нет"}<br/>L3
                        кэш: {localStorage.cpuCache}<br/>Техпроцесс: {localStorage.cpuProcess}нм</p>
                    <p>
                        <button onClick={() => {
                            setOpen(false)
                            setCpu(false)
                        }}>Выбрать
                        </button>
                        <button onClick={() => setCpu(false)}>Назад</button>
                    </p>
                </div>
            </div>
        )
    }

    function renderGpuCard() {
        // console.log(localStorage)
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.gpuName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p
                        style={{borderRight: '1px solid #ffffff'}}>Поколение: {localStorage.gpuGen}
                        <br/> Цена: {localStorage.gpuPrice !== "undefined" ? localStorage.gpuPrice + "$" : "Входит в стоимость процессора"}
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
                        <button onClick={() => {
                            setOpen(false)
                            setGpu(false)
                        }}>Выбрать
                        </button>
                        <button onClick={() => setGpu(false)}>Назад</button>
                    </p>
                </div>
            </div>
        )
    }

    function renderMbCard() {
        // console.log(localStorage)
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

        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.mbName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p
                        style={{borderRight: '1px solid #ffffff'}}>Сокет: {localStorage.mbSocket}
                        <br/> Цена: {localStorage.mbPrice}
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
                        <button onClick={() => {
                            setOpen(false)
                            setMb(false)
                        }}>Выбрать
                        </button>
                        <button onClick={() => setMb(false)}>Назад</button>
                    </p>
                </div>
            </div>
        )
    }

    function renderPsuCard() {
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.psuName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Мощность: {localStorage.psuPower}W
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Сертификат: {localStorage.psuSert}
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
                        <button onClick={() => {
                            setOpen(false)
                            setPsu(false)
                        }}>Выбрать
                        </button>
                        <button onClick={() => setPsu(false)}>Назад</button>
                    </p>
                </div>
            </div>
        )
    }

    function renderRamCard() {
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
                        Напряжение: {localStorage.ramVoltage}
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Дополнительные функции: {localStorage.ramFeatures}
                    </p>
                    <p>
                        <button onClick={() => {
                            setOpen(false)
                            setRam(false)
                        }}>Выбрать
                        </button>
                        <button onClick={() => setRam(false)}>Назад</button>
                    </p>
                </div>
            </div>
        )
    }

    function renderSsdCard() {
        return (
            <div className={popupClasses.CpuCard}>
                <h1>{localStorage.ssdName}</h1>
                <div className={popupClasses.CpuSpec}>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Объём: {localStorage.ssdCapacity}<br/>
                        Интерфейс: {localStorage.ssdInterface}<br/>
                        Цена: {localStorage.ssdPrice}$
                    </p>
                    <p style={{borderRight: '1px solid #ffffff'}}>
                        Скорость чтения: {localStorage.ssdRead}
                        <br/>
                        Скорость записи: {localStorage.ssdWrite}
                    </p>
                    <p>
                        <button onClick={() => {
                            setSsd(false)
                        }}>Выбрать
                        </button>
                        <button onClick={() => setSsd(false)}>Назад</button>
                    </p>
                </div>
            </div>
        )
    }

    function renderCoolerCard() {
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
                        Цена: {localStorage.coolerPrice}$
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
                        <button onClick={() => {
                            setCooler(false)
                        }}>Выбрать
                        </button>
                        <button onClick={() => setCooler(false)}>Назад</button>
                    </p>
                </div>
            </div>
        )
    }

    function renderCpus() {
        localStorage.clear()
        const cpus = []
        for (let i = 0; i < props.data.cpu.processors.length; i++) {
            if (cpuName === "") {
                if (cpuType === "all") {
                    cpus.push(props.data.cpu.processors[i])
                } else {
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
            } else if (props.data.cpu.processors[i].name.toUpperCase().includes(cpuName.toUpperCase())) {
                cpus.push(props.data.cpu.processors[i])
            }
        }
        if (cpuSort === "price") {
            cpus.sort((a, b) => a.price - b.price)
        } if (cpuSort === "perf") {
            cpus.sort((a, b) => b.performance_score - a.performance_score)
        } if (cpuSort === "price_r") {
            cpus.sort((a, b) => b.price - a.price)
        } if (cpuSort === "price_p") {
            cpus.sort((a, b) => b.price_performance_ratio - a.price_performance_ratio)
        }
        return Object.keys(cpus).map((id) => {
            return (
                <div key={id} onClick={() => {
                    setCpu(true)
                    localStorage.clear()
                    localStorage.igp = cpus[id].igpu
                    localStorage.cpuName = cpus[id].name
                    localStorage.cpuPower = cpus[id].performance_score
                    localStorage.cpuPrPer = cpus[id].price_performance_ratio
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
                        <span>Цена: {cpus[id].price}$</span>
                        <span>Частота: до {cpus[id].boost_clock}</span>
                        <span>Видеоядро: {cpus[id].igpu !== null ? cpus[id].igpu : "Нет"}</span>
                    </div>
                </div>
            )
        })
    }

    function renderGpus() {
        const gpus = []
        for (let i = 0; i < props.data.gpu.graphics_cards.length; i++) {

            if (gpuName === "") {
                if (gpuType === "all" && props.data.gpu.graphics_cards[i].graphics_core_count === undefined) {
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
            if (props.data.gpu.graphics_cards[i].name === localStorage.igp) {
                gpus.push(props.data.gpu.graphics_cards[i])
            }
        }
        gpus.reverse()
        return Object.keys(gpus).map((id) => {
            return (
                <div key={id} onClick={() => {
                    setGpu(true)
                    localStorage.gpuCores = gpus[id].graphics_core_count
                    localStorage.gpuName = gpus[id].name
                    localStorage.gpuGen = gpus[id].generation
                    localStorage.gpuPower = gpus[id].performance_score
                    localStorage.gpuPrice = gpus[id].price
                    localStorage.gpuTdp = gpus[id].tdp
                    localStorage.gpuBaseClock = gpus[id].core_clock
                    localStorage.gpuBoostClock = gpus[id].boost_clock
                    localStorage.gpuGeneration = gpus[id].gpu_architecture
                    localStorage.gpuMemory = gpus[id].memory
                    localStorage.gpuBus = gpus[id].memory_bus
                    localStorage.gpuBand = gpus[id].memory_bandwidth
                    localStorage.gPciGen = gpus[id].pci_e
                    localStorage.gPciLine = gpus[id].pci_e_lines
                    localStorage.gpuPrPer = gpus[id].price_performance_ratio
                }} className={popupClasses.CpuItem}>
                    <h1>{gpus[id].name} {gpus[id].name === localStorage.igp ? "(встроенная в выбранный процесор)" : null}</h1>
                    <div className={popupClasses.Spec}>
                        <span>Видеопамять: {gpus[id].memory !== undefined ? gpus[id].memory : "Использует оперативную"}</span>
                        <span>Архитектура: {gpus[id].gpu_architecture}</span>
                        <span>Частота: до {gpus[id].boost_clock}</span>
                        <span>Цена: {gpus[id].price !== undefined ? gpus[id].price + "$" : "Входит в стоимость процессора"}</span>
                    </div>
                </div>
            )
        })
    }

    function renderMbs() {
        const mbs = []
        for (let i = 0; i < props.data.mb.motherboards.length; i++) {
            if (props.data.mb.motherboards[i].socket === localStorage.cpuSocket && (props.data.mb.motherboards[i].name.includes(localStorage.cpuChipsets.split(',')[0]) || props.data.mb.motherboards[i].name.includes(localStorage.cpuChipsets.split(',')[1]) || props.data.mb.motherboards[i].name.includes(localStorage.cpuChipsets.split(',')[2]))) {
                mbs.push(props.data.mb.motherboards[i])
            }
        }
        return Object.keys(mbs).map((id) => {
            return (
                <div key={id} onClick={() => {
                    setMb(true)
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
                        <span>Цена: {mbs[id].price}$</span>
                    </div>
                </div>
            )
        })
    }

    function renderPsus() {
        const psus = []
        for (let i = 0; i < props.data.psu.power_supplies.length; i++) {
            if (props.data.psu.power_supplies[i].wattage >= localStorage.psuReqPwr && props.data.psu.power_supplies[i].wattage <= localStorage.psuReqPwr * 1.5) {
                psus.push(props.data.psu.power_supplies[i])
            }
        }
        console.log(props.data.psu.power_supplies)
        console.log(localStorage.psuReqPwr)
        return Object.keys(psus).map((id) => {
            return (
                <div key={id} onClick={() => {
                    setPsu(true)
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
                        <span>Цена: {psus[id].price}$</span>
                    </div>
                </div>
            )
        })
    }

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
                        <span>Цена: {ssds[id].price}$</span>
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
                        <span>Цена: {coolers[id].price}$</span>
                    </div>
                </div>
            )
        })
    }

    function renderRams() {
        const rams = []
        for (let i = 0; i < props.data.ram.memory_kits.length; i++) {
            if (props.data.ram.memory_kits[i].memory_type === localStorage.memType && ((150 > localStorage.cpuPower && localStorage.cpuPower > 80 && props.data.ram.memory_kits[i].capacity.split(' ')[0] >= 16) || (localStorage.cpuPower >= 150 && props.data.ram.memory_kits[i].capacity.split(' ')[0] >= 32)) || (localStorage.cpuPower <= 80 && props.data.ram.memory_kits[i].capacity.split(' ')[0] <= 16)) {
                rams.push(props.data.ram.memory_kits[i])
            }
        }
        return Object.keys(rams).map((id) => {
            return (
                <div key={id} onClick={() => {
                    setRam(true)
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
                        <span>Цена: {rams[id].price}$</span>
                    </div>
                </div>
            )
        })
    }

    function cpuSecond() {
        return (
            <div className={popupClasses.CpuSecond}>
                <div className={popupClasses.CpuList}>
                    <input value={cpuName} placeholder="Поиск по названию"
                           onChange={(e) => setCpuName(e.target.value)}/>
                    {renderCpus()}
                </div>
                <p>Рекомендуемые процессоры для указанного сценария использования ПК
                    <a onClick={() => setCpuType('all')}>Показать все</a>
                    <br/>
                    <p>Сортировать по</p>
                    <select className={popupClasses.Sort} value={cpuSort} onChange={(e) => setCpuSort(e.target.value)}>
                        <option value="default">По умолчанию</option>
                        <option value="price">По возрастанию цены</option>
                        <option value="price_r">По убыванию цены</option>
                        <option value="perf">Сначала мощные</option>
                        <option value="price_p">Сначала выгодные</option>
                    </select>
                    <button
                        onClick={() => setCpuType(null)}>Назад
                    </button>
                    <button onClick={() => setCpuHelp(true)}>Справка</button>
                </p>
            </div>
        )
    }

    function gpuSecond() {
        return (
            <div className={popupClasses.CpuSecond}>
                <div className={popupClasses.CpuList}>
                    {gpuType !== "all" ? localStorage.cpuName !== undefined ?
                        <input value={gpuName} placeholder="Поиск по названию"
                               onChange={(e) => setGpuName(e.target.value)}/>
                        : null : <input value={gpuName} placeholder="Поиск по названию"
                                        onChange={(e) => setGpuName(e.target.value)}/>
                    }
                    {gpuType !== "all" ? localStorage.cpuName !== undefined ? renderGpus() :
                        <h1>Сначала выберите процессор</h1> : renderGpus()}
                </div>
                <p>Видеокарты, подходяшие к выбранному процессору.
                    {
                        gpuType === null
                            ? <a onClick={() => setGpuType("all")}>Показать все</a>
                            : <a onClick={() => setGpuType(null)}>Только подходящие</a>
                    }
                    <button
                        onClick={() => setOpen(null)}>Назад
                    </button>
                    <button onClick={() => setGpuHelp(true)}>Справка</button>
                </p>
            </div>
        )
    }

    function mbSecond() {
        return (
            <div className={popupClasses.CpuSecond}>
                <div className={popupClasses.CpuList}>
                    {renderMbs()}
                </div>
                <p>Материнская плата, подходящая к выбранному процессору, должна иметь сокет {localStorage.cpuSocket} и
                    один из следующих чипсетов: {localStorage.cpuChipsets}<br/>Вот несколько моделей, подходящих под ваш
                    процессор.
                    <button
                        onClick={() => setOpen(null)}>Назад
                    </button>
                    <button onClick={() => setMbHelp(true)}>Справка</button>
                </p>
            </div>
        )
    }

    function ramSecond() {
        return (
            <div className={popupClasses.CpuSecond}>
                <div className={popupClasses.CpuList}>
                    {renderRams()}
                </div>
                <p>Оперативная память, подходящая к выбранной конфигурации, должна иметь тип {localStorage.memType},
                    обЪём
                    от {localStorage.cpuPower < 80 ? "8 гб" : localStorage.cpuPower < 150 && localStorage.cpuPower >= 80 ? "16 гб" : "32 гб"}{localStorage.cpuPower > 80 ? ", двухканальный режим" : null}.<br/>Вот
                    несколько подходящих моделей.
                    <button
                        onClick={() => setOpen(null)}>Назад
                    </button>
                    <button onClick={() => setRamHelp(true)}>Справка</button>
                </p>
            </div>
        )
    }

    function psuSecond() {
        let psuPower = Math.round((localStorage.gpuTdp.split(' ')[0] * 1 + localStorage.cpuTdpR * 0.9) / 10) * 20
        localStorage.psuReqPwr = psuPower
        return (
            <div className={popupClasses.CpuSecond}>
                <div className={popupClasses.CpuList}>
                    {renderPsus()}
                </div>
                <p>Блок питания, подходящий к вашей конфигурации ПК должен обладать следующими параметрами: мощность -
                    не менее {psuPower}W
                    <button
                        onClick={() => setOpen(null)}>Назад
                    </button>
                    <button onClick={() => setPsuHelp(true)}>Справка</button>
                </p>
            </div>
        )
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
                renderSsdCard()
            )
        }
        if (!ssD && cooler) {
            return (
                renderCoolerCard()
            )
        }
    }

    function renderCpuHelp() {
        return (
            <div className={popupClasses.CpuHelp}>
                <h1>При выборе процессора стоит обратить внимание на следующие параметры:</h1>
                <p>1. Частота процессора. Измеряется в гигагерцах (ГГц) и отвечает за скорость обработки информации. Чем
                    выше частота, тем выше мощность процессора при прочих равных. Следует понимать, что сравнение
                    процессоров по частоте справедливо только для процессоров на одной архитектуре. Некоторые процессоры
                    имеют возможность ручной настройки частоты (разгона), такие процессоры имеют в названии префикс "K"
                    (для моделей Intel), все процессоры от AMD, кроме моделей с префиксом "X3D", имеют возможность
                    разгона.</p>
                <p>2. Количество ядер и потоков. Ядро процессора - физический вычислительный модуль в составе
                    процессора, поток - виртуальный вычислительный модуль, позволяющий одному ядру обрабатывать
                    несколько цепочек команд одновременно. Некоторые процессоры имеют гибридную архитектуру, включающую
                    разные виды ядер: производительные и энергоэффективные. В таких процессорах энергоэффективные ядра
                    берут на себя фоновую нагрузку, оставляя ресурсоёмкие задачи на мощные ядра. Несмотря на большее
                    количество ядер чем у аналогов без гибридной архитектуры, такие процессоры не всегда мощнее.</p>
                <p>3. Кэш память. Встроенная в процессор энергозависимая память. Её объём относительно небольшой, однако
                    скорость доступа в неё в несколька раз выше, чем у оперативной памяти. Большой объём кэша у
                    процессора повышает производительность, прирост от обьёма кэша наиболее заметен в играх. Самый
                    большой объём кэш-памяти 3 уровня у процессоров AMD с префиксом "X3D".</p>
                <p>4. Энергопотребление (TDP). Энергопотребление процессора является важным параметром при выборе
                    процессора. Высокое энергопотребление черевато не только дорогими счетами на оплату коммунальных
                    услуг. От этого параметра напрямую зависит тепловыделение процессора, требования к качеству
                    материнской платы, системе охлаждения и блока питания.</p>
                <p>5. Интегрированный графический ускоритель. Некоторые модели процессоров имеют встроенное подобие
                    видеокарты. Таким процессорам не нужна дискретная видеокарта, однако производительность встроенных
                    графических ускорителей заметно ниже чем у дискретных видеокарт, особенно в процессорах старых
                    поколений.</p>
                <button onClick={() => setCpuHelp(false)}>Назад</button>
            </div>
        )
    }

    function renderGpuHelp() {
        return (
            <div className={popupClasses.CpuHelp}>
                <h1>При выборе видеокарты стоит обратить внимание на следующие параметры:</h1>
                <p>1. Количество видеопамяти. Видеопамять нужна для хранения текстур и шейдеров в процессе обработки их
                    видеопроцессором. При недостаточном объёме видеопамяти видеокарта будет использовать оперативную
                    память, что приведет к снижению производительности. Также на производительность сильно влияет
                    скорость видеопамяти, которая зависит от типа и шины памяти.</p>
                <p>2. Шина pci-e. Шина pci-e связывает процессор и видеокарту, она имеет 2 параметра: количество линий и
                    версию. С каждой новой версией скорость увеличивается вдвое. Шины pci-e разных версий совместимы,
                    однако если у видеокарты будет шина более новой версии, чем на процессоре и материнской плате, и
                    количество линий меньше 16, то при нехватке видеопамяти время обращения видеокарты к ОЗУ увеличится,
                    снижая производительность.</p>
                <p>3. Система охлаждения. Система охлаждения - один из важнейших параметров при выборе видеокарты. Так
                    как наш сайт не осуществляет продаж, мы можем помочь подобрать только модель видеокарты. Каждую
                    модель видеокарт выпускает несколько компаний-вендоров, каждая из которых соответственно предлагает
                    свою систему охлаждения, подсистему питания и в некоторых случаях заводской разгон. Мы рекомендуем
                    при покупке видеокарты в розничных магазинах опираться на размер радиатора и количество вентиляторов
                    (для производительных карт не менее 2). Также понять качество системы охлаждения можно по отзывам на
                    конкретную модель в интернете.</p>
                <p>4. Энергопотребление (TDP). Видеокарты с высоким энергопотреблением более требовательны к качеству
                    системы охлаждения и блока питания.</p>
                <p>5. Также перед покупкой мы настоятельно рекомендуем смотреть обзоры на конкретную понравившуюся вам
                    модель, в которых рекомендуем обратить внимание на температуры в ходе тестов. Также полезно будет
                    изучить отзывы на модель в интернете.</p>
                <button onClick={() => setGpuHelp(false)}>Назад</button>
            </div>
        )
    }

    function renderMbHelp() {
        return (
            <div className={popupClasses.CpuHelp}>
                <h1>При выборе материнской платы стоит обратить внимание на следующие параметры:</h1>
                <p>1. Сокет. Сокет - это разъём на материнской плате, куда вставляется процессор. Тип сокета у
                    материнской платы и процессора должны совпадать. Также необходимо учитывать сокет при выборе системы
                    охлаждения процессора.</p>
                <p>2. Чипсет. Чипсет - набор микросхем, управляющий материнской платой и определяющий её функционал.
                    Условно, чипсеты можно разделить на три класса: 1. Чипсеты с наименьшим функционалом - линейка
                    чипсетов "А" у AMD и линейка "Н" у Intel. Эти чипсеты дают минимальную возможность для настройки,
                    позволяют менять только тайминги ОЗУ. 2. Чипсеты среднего класса - линнейкв чипсетов "B" у Intel и
                    AMD. эти чипсеты дают гораздо больше возможностей для настройки и позволяют менять как тайминги, так
                    и частоту ОЗУ, также чипсеты линейки "B" от AMD позволяют разгонять процессор. 3. Топовые чипсеты -
                    линейка чипсетов "Z" у Intel и линейка чипсетов "X" у AMD. Платы на этих чипсетах дают максимальный
                    простор для настроек, а также имеют хорошую подсистему питания.</p>
                <p>3. Подсистема питания процессора (VRM). Подсистема питания процессора отвечает за подачу
                    электропитания процессору. Чем выше энергопотребление процессора, тем более продвинутая подсистема
                    питания ему нужна. VRM состоит из некоторого количества фаз питания, чем выше их количество, тем
                    большую мощность сможет передать процессору VRM. Также на производительных материнских платах VRM
                    имеет радиатор охлаждения.</p>
                <p>4. Шина pci-e. Обратите внимание на количество линий и версию pci-e в материнской плате. Это
                    пригодится при выборе ssd и видеокарты.</p>
                <p>5. Форм-фактор. Форм-фактор материнской платы - это стандартизированный размер платы. На рынке 3
                    популярных форм-фактора: ATX, micro ATX (mATX) и mini ITX. Обратите внимание на форм-фактор
                    материнской платы при выборе корпуса.</p>
                <button onClick={() => setMbHelp(false)}>Назад</button>
            </div>
        )
    }

    function renderPsuHelp() {
        return (
            <div className={popupClasses.CpuHelp}>
                <h1>При выборе блока питания стоит обратить внимание на следующие параметры:</h1>
                <p>1. Мощность. Мощность блока питания показывает, какое суммарное энергопотребление всех компонентов ПК
                    сможет обеспечить блок питания. Чем выше этот параметр, тем более мощные компоненты можно поставить
                    в ПК, также от этого параметра зависит потенциал апгрейда ПК.</p>
                <p>2. Сертификат 80+. Наличие сертификата 80+ у блока питания означает, что КПД блока не меньше 80%. КПД
                    блока питания выше с каждым уровнем сертификата, также более высокий уровень сертификата 80+
                    подразумевает большее количество разных защит, более стабильное напряжение и более качественную
                    схемотехнику.</p>
                <p>3. Модульность. Модульный блок питания имеет возможность отсоединения проводов. Такие блоки питания
                    позволяют более аккуратно уложить провода в корпусе и оптимизировать внутреннее пространство.</p>
                <p>4. Диаметр вентилятора. Вентилятор нужен для охлаждения компонентов блока питания.</p>
                <p>5. Форм-фактор. Форм-фактор - это стандартизированный размер блока питания. Обратите внимание на этот
                    параметр при выборе корпуса.</p>
                <button onClick={() => setPsuHelp(false)}>Назад</button>
            </div>
        )
    }

    function renderRamHelp() {
        return (
            <div className={popupClasses.CpuHelp}>
                <h1>При выборе оперативной памяти стоит обратить внимание на следующие параметры:</h1>
                <p>1. Объём. Чем больше объём ОЗУ в компьютере, тем большее количество программ он может там держать и
                    тем выше производительность системы. В нынешнее время настоятельно рекомендуем ставить в компьютер
                    не менее 16 Гб ОЗУ, поскольку данного объёма хватит с запасом на будущее.</p>
                <p>2. Частота. Чем выше частота оперативной памяти, тем выше скорость чтения и записи данных в неё,
                    однако модули с высокой частотой могут потребовать дополнительного охлаждения в виде радиаторов.</p>
                <p>3. Тип памяти. Тип памяти должен быть совместим с процессором и материнской платой. Более новый тип
                    памяти имеет большую скорость и более высокую частоту.</p>
                <p>4. Латентность. Латентность показывает задержки работы контроллера пямяти. От латентности зависит
                    общая задержка памяти, соответственно чем меньше латентность, тем более прооизводительный модуль
                    памяти.</p>
                <p>5. Одноканальный или двухканальный режим. Оперативная память в двухканальном режиме работы имеет
                    вдвое больее широкую шину, следовательно вдвое большую пропускную способность. Двухканальный режим
                    не влияет на задержку доступа в память, однакко из-за вдвое большей скорости чтения/записи заметно
                    улучшает производительность. Чтобы активировать двухканальный режим оперативной памяти, необходмо
                    поставить 2 или 4 модуля памяти. Если у вас 2 модуля и материнская плата с 4 слотами для ОЗУ, то
                    модули надо ставить в слоты через один.</p>
                <button onClick={() => setRamHelp(false)}>Назад</button>
            </div>
        )
    }

    function renderOthersHelp() {
        return (
            <div className={popupClasses.CpuHelp}>
                <h1>При выборе второстепенных компонентов ПК стоит обратить внимание на следующие параметры:</h1>
                <p>1. Объём. Чем больше объём ОЗУ в компьютере, тем большее количество программ он может там держать и
                    тем выше производительность системы. В нынешнее время настоятельно рекомендуем ставить в компьютер
                    не менее 16 Гб ОЗУ, поскольку данного объёма хватит с запасом на будущее.</p>
                <p>2. Частота. Чем выше частота оперативной памяти, тем выше скорость чтения и записи данных в неё,
                    однако модули с высокой частотой могут потребовать дополнительного охлаждения в виде радиаторов.</p>
                <p>3. Тип памяти. Тип памяти должен быть совместим с процессором и материнской платой. Более новый тип
                    памяти имеет большую скорость и более высокую частоту.</p>
                <p>4. Латентность. Латентность показывает задержки работы контроллера пямяти. От латентности зависит
                    общая задержка памяти, соответственно чем меньше латентность, тем более прооизводительный модуль
                    памяти.</p>
                <p>5. Одноканальный или двухканальный режим. Оперативная память в двухканальном режиме работы имеет
                    вдвое больее широкую шину, следовательно вдвое большую пропускную способность. Двухканальный режим
                    не влияет на задержку доступа в память, однакко из-за вдвое большей скорости чтения/записи заметно
                    улучшает производительность. Чтобы активировать двухканальный режим оперативной памяти, необходмо
                    поставить 2 или 4 модуля памяти. Если у вас 2 модуля и материнская плата с 4 слотами для ОЗУ, то
                    модули надо ставить в слоты через один.</p>
                <button onClick={() => setOthersHelp(false)}>Назад</button>
            </div>
        )
    }

    function cpuFirst() {
        return (
            <div className={popupClasses.CpuFirst}>
                <span>Для каких задач вы будете использовать компьютер?</span>
                <div className={popupClasses.CpuFirstLinks}>
                    <div className={popupClasses.CpuLink}><p>Работа</p>
                        <div className={popupClasses.LastCpuLinks}><a onClick={() => setCpuType(1)}>Стандартные
                            офисные программы, интернет</a><a onClick={() => setCpuType(3)}>Ресурсоёмкие
                            программы, графические редакторы, сложные вычисления</a></div>
                    </div>
                    <div className={popupClasses.CpuLink}><p>Игры</p>
                        <div className={popupClasses.LastCpuLinks}><a onClick={() => setCpuType(3)}>Современные игры с
                            высокими
                            системными требованиями</a><a onClick={() => setCpuType(2)}>Игры c невысокими
                            настройками графики</a></div>
                    </div>
                </div>
            </div>
        )
    }

    function cpuPopup() {
        return (
            <div className={popupClasses.Cpu}>
                <h1>Выбор процессора</h1>
                {cpuHelp ? renderCpuHelp() : cpu ? renderCpuCard() : (cpuType === null ? cpuFirst() : cpuSecond())}
            </div>
        )
    }

    function gpuPopup() {
        return (
            <div className={popupClasses.Cpu}>
                <h1>Выбор видеокарты</h1>
                {gpuHelp ? renderGpuHelp() : gpu ? renderGpuCard() : gpuSecond()}
            </div>
        )
    }

    function mbPopup() {
        return (
            <div className={popupClasses.Cpu}>
                <h1>Выбор материнской платы</h1>
                {mbHelp ? renderMbHelp() : mb ? renderMbCard() : localStorage.cpuName ? mbSecond() :
                    <h1>Сначала выберите процессор</h1>}
            </div>
        )
    }

    function psuPopup() {
        return (
            <div className={popupClasses.Cpu}>
                <h1>Выбор блок питания</h1>
                {psuHelp ? renderPsuHelp() : psu ? renderPsuCard() : localStorage.cpuName && localStorage.gpuName && localStorage.mbName ? psuSecond() :
                    <h1>Сначала выберите процессор, видеокарту и материнскую плату</h1>}
            </div>
        )
    }

    function ramPopup() {
        return (
            <div className={popupClasses.Cpu}>
                <h1>Выбор оперативной памяти</h1>
                {ramHelp ? renderRamHelp() : ram ? renderRamCard() : localStorage.cpuName && localStorage.mbName ? ramSecond() :
                    <h1>Сначала выберите процессор и материнскую плату</h1>}
            </div>
        )
    }

    function renderRate() {
        const cpuPwr = Math.round(Math.sqrt(localStorage.cpuPower / 205) * 1000) / 10
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
                            <p>Цена: {localStorage.cpuPrice}$</p>
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
                            {localStorage.igp !== localStorage.gpuName ? <p>Цена: {localStorage.gpuPrice}$</p> : null}
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
                            <p>Цена: {localStorage.mbPrice}$</p>
                            <p>Рейтинг надёжности: {Math.round(localStorage.quality * 200) / 10}%
                                <div className={cclasses.Quality}>
                                    <div style={{width: `${Math.round(localStorage.quality * 200) / 10}%`}}/>
                                </div>
                            </p>
                        </div>
                        <div>
                            <h1>Блок питания: {localStorage.psuName}</h1>
                            <p>Цена: {localStorage.psuPrice}$</p>
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
                                        дешёвая, сборка несбалансировнна.</p> :
                                    <p>Проверка соотношения цен процессора и видеокарты не выполняется для
                                        интегрированных видеокарт.</p>}
                        {(localStorage.cpuTdpR >= 240 && mbPsu === 100) || (localStorage.cpuTdpR <= 240 && 150 <= localStorage.cpuTdpR && 80 <= mbPsu) || (localStorage.cpuTdpR <= 150 && 80 <= localStorage.cpuTdpR && mbPsu >= 50) || (localStorage.cpuTdpR < 79) ?
                            <p>Подсистема питания материнской платы способна выдавать необходимую мощность
                                процессору.</p> :
                            <p style={{color: "#E40037"}}>Подсистема питания материнской платы недостаточно мощная для
                                выбранного процессора.</p>}
                        {localStorage.quality * 20 < 50 && localStorage.cpuPrice > 150 ?
                            <p style={{color: "#E40037"}}>Среднее качество компонентов материнской платы недостаточно
                                высокое чтобы обеспесить стабильную и долговечную работу процессора.</p> :
                            <p>Качество компотентов материнской платы соответствует процессору.</p>}
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

    function renderPopup() {
        return (
            <div className={popupClasses.Wrapper}>

                <button onClick={() => {
                    setOpen(false)
                    setType(null)
                }}>
                    <svg fill="#8A2BE2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60%" height="60%"
                         viewBox="0 0 50 50">
                        <path
                            d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                    </svg>
                </button>
                {type === '/cpu.png' ? cpuPopup() : null}
                {type === '/gpu.png' ? gpuPopup() : null}
                {type === 'rate' ? renderRate() : null}
                {type === '/mb.png' ? mbPopup() : null}
                {type === '/psu.png' ? psuPopup() : null}
                {type === '/ram.png' ? ramPopup() : null}
                {type === '/case.png' ? othPopup() : null}
            </div>
        )
    }

    function cpuCall() {
        return (
            <div onClick={() => {
                setOpen(true)
                setType("/cpu.png")
            }} className={cclasses.AdWrapper}>
                <div style={{backgroundImage: `url(/cpu.png)`}} className={cclasses.Advertisement}>
                    <a>
                        <p>Центральный процессор отвечает за выполнение арифметических и логических операций, а
                            также управляет компонентами ПК. Обратите внимание на мощность процессора если
                            планируете использовать компьютер для игр и работы с большими потоками данных или
                            графикой.</p>
                    </a>
                </div>
                <strong>{localStorage.cpuName === undefined ? "Центральный процессор" : localStorage.cpuName}</strong>
            </div>
        )
    }

    function gpuCall() {
        return (
            <div onClick={() => {
                setOpen(true)
                setType("/gpu.png")
            }} className={cclasses.AdWrapper}>
                <div style={{backgroundImage: `url(/gpu.png)`}} className={cclasses.Advertisement}>
                    <a>
                        <p>Видеокарта отвечает за вывод изображения на экран монитора а также используется в
                            сложных вычислениях. Обратите внимание на мощность видеокарты если планируете
                            использовать компьютер для игр или работы с графикой или монтажем видео.</p>
                    </a>
                </div>
                <strong>{localStorage.gpuName === undefined ? "Видеокарта" : localStorage.gpuName}</strong>
            </div>
        )
    }

    function mbCall() {
        return (
            <div onClick={() => {
                setOpen(true)
                setType("/mb.png")
            }} className={cclasses.AdWrapper}>
                <div style={{backgroundImage: `url(/mb.png)`}} className={cclasses.Advertisement}>
                    <a>
                        <p>Материнская плата - это основа всего компьютера, к которой подключаются все
                            компоненты ПК. Возможности материнской платы определяются её чипсетом - набором
                            микросхем для управления материнской платой. Обратите внимание на качество
                            материнской платы если у вас процессор с высоким энергопотреблением или если вы
                            планируете дальнейший апгрейд ПК.</p>
                    </a>
                </div>
                <strong>{localStorage.mbName === undefined ? "Материнская плата" : localStorage.mbName}</strong>
            </div>
        )
    }

    function ramCall() {
        return (
            <div onClick={() => {
                setOpen(true)
                setType("/ram.png")
            }} className={cclasses.AdWrapper}>
                <div style={{backgroundImage: `url(/ram.png)`}} className={cclasses.Advertisement}>
                    <a>
                        <p>Оперативная память используется для временного хранения данных и программ в процессе
                            их выполнения. Объём и частота оперативной памяти сильно влияет на
                            производительность ПК. Обратите внимание на эти параметры если планируете
                            использовать компьютер для игр или работы с большими потоками данных.</p>
                    </a>
                </div>
                <strong>{localStorage.ramName === undefined ? "Оперативная память" : localStorage.ramName}</strong>
            </div>
        )
    }

    function psuCall() {
        return (
            <div onClick={() => {
                setOpen(true)
                setType("/psu.png")
            }} className={cclasses.AdWrapper}>
                <div style={{backgroundImage: `url(/psu.png)`}} className={cclasses.Advertisement}>
                    <a>
                        <p>Блок питания отвечает за стабильное и бесперебойное снабжение всех компонентов ПК
                            электрическим током. Качество блока питания показывает уровень его сертификата 80+.
                            От качества компонентов блока питания зависит надежность и безопасность ПК, а от его
                            мощности - потенциал апгрейда.</p>
                    </a>
                </div>
                <strong>{localStorage.psuName === undefined ? "Блок питания" : localStorage.psuName}</strong>
            </div>
        )
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
                {othersHelp ? renderOthersHelp() : localStorage.cpuName && localStorage.gpuName && localStorage.mbName ? othSecond() :
                    <h1>Сначала выберите процессор, видеокарту и материнскую плату</h1>}
            </div>
        )
    }

    const jokes = [
        "Why do web developers prefer dark mode? Because light attracts bugs.",
        "What's a web developer's favorite tea? Object-oriented tea.",
        "Why do web developers like to work with JSON? Because it's a lightweight way to store data. And also because it's a good way to avoid XML.",
        "What's the difference between a web developer and a software engineer? A web developer makes web applications. A software engineer makes software applications. And also, a web developer makes web applications that are also software applications.",
        "Why do web developers prefer to work with React? Because it's a library, not a framework.",
        "What do you call a web developer who doesn't know how to use a debugger? A developer who's always in the dark.",
        "Why do web developers like to work with SVGs? Because they can scale to any size without losing quality.",
        "What's the best way to get a web developer to do a task? Tell them to do it in a RESTful way.",
        "Why do web developers like to work with JavaScript? Because it's a language that's always in motion.",
        "Why do Java developers wear glasses? Because they can't C#!",
        "How do you tell if a Java program is efficient? It doesn't have any imports.",
        "Why was the Java developer always broke? Because he used up all his cache!",
        "What's the object-oriented way to become wealthy? Inheritance!",
        "Why do Java programmers prefer to work at night? Because the garbage collector comes out during the day!",
        "What do you call a group of Java developers? A Java team."
    ];

    const pipisa = Math.random()
    const jopa = Math.round(jokes.length * pipisa)
    console.log(jokes[jopa])

    function othCall() {
        return (
            <div onClick={() => {
                setOpen(true)
                setType("/case.png")
            }} className={cclasses.AdWrapper}>
                <div style={{backgroundImage: `url(/case.png)`}} className={cclasses.Advertisement}>
                    <a>
                        <p>Поможем Вам подобрать комплектующие, не влияющие на производительность ПК, но
                            влияющие на стабильность работы, потенциал апгрейда и внешний вид.</p>
                    </a>
                </div>
                <strong>Остальные комплектующие</strong>
            </div>
        )
    }

    return (
        <div id='portfolio' className={cclasses.Wrapper}>
            {
                open
                ?<div className={cclasses.Backdrop}/>
                    : null
            }

            <span className={cclasses.Span}>Конфигуратор</span>
            {open ? renderPopup() : null}
            <div className={cclasses.Content}>
                {cpuCall()}
                {gpuCall()}
                {mbCall()}
                {ramCall()}
                {psuCall()}
                {othCall()}
            </div>
            <button className={cclasses.Rate} onClick={() => {
                setType('rate')
                setOpen(true)
            }}>Оценить мою сборку
            </button>
        </div>
    )
}


export default Configurator