import React, { useState } from 'react'
import classes from './configurator.module.scss'
import popupClasses from './popup.module.scss'

const Configurator = (props) => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(null)
  const [cpuType, setCpuType] = useState(null)
  const [cpu, setCpu] = useState(false)
  const [cpuHelp, setCpuHelp] = useState(false)

  function renderCpuCard () {
    function renderHybridCores () {
      return (
        <div className={popupClasses.Cores}>
          <p>
            Производительных: {localStorage.cpuThreads - localStorage.cpuCores}
          </p>
          <p>
            Энергоэффективных: {localStorage.cpuThreads - 2 * (localStorage.cpuThreads - localStorage.cpuCores)}
          </p>
        </div>
      )
    }

    function renderTdp () {
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
      return (
        <div className={popupClasses.Cores}>
          <p>
            Заявленное: {localStorage.cpuTdp}
          </p>
          <p>
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
            style={{ borderRight: '1px solid #ffffff' }}>Архитектура: {localStorage.cpuGeneration} <br/> Сокет: {localStorage.cpuSocket} <br/> Цена: {localStorage.cpuPrice}$</p>
          <p style={{ borderRight: '1px solid #ffffff' }}>Количество
            ядер: {localStorage.cpuThreads % localStorage.cpuCores !== 0 ? renderHybridCores() : localStorage.cpuCores}</p>
          <p>Количество
            потоков: {localStorage.cpuThreads} <br/> Частота: {localStorage.cpuBaseClock} - {localStorage.cpuBoostClock}</p>
          <p style={{ borderRight: '1px solid #ffffff' }}>Тепловыделение: {renderTdp()}</p>
          <p>
            <button onClick={() => {
              setOpen(false)
              setCpu(false)
              setCpuType(null)
            }}>Выбрать
            </button>
            <button onClick={() => setCpu(false)}>Назад</button>
          </p>
        </div>
      </div>
    )
  }

  function renderCpus () {
    localStorage.clear()
    const cpus = []
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
          setCpu(true)
          localStorage.cpuName = cpus[id].name
          localStorage.cpuPower = cpus[id].performance_score
          localStorage.cpuPrice = cpus[id].price
          localStorage.cpuTdp = cpus[id].tdp
          localStorage.cpuBaseClock = cpus[id].base_clock
          localStorage.cpuBoostClock = cpus[id].boost_clock
          localStorage.cpuGeneration = cpus[id].generation
          localStorage.cpuCores = cpus[id].cores
          localStorage.cpuThreads = cpus[id].threads
          localStorage.cpuSocket = cpus[id].socket
        }} className={popupClasses.CpuItem}>
          <h1>{cpus[id].name}</h1>
          <div className={popupClasses.Spec}>
            <span>Ядра | потоки: {cpus[id].cores} | {cpus[id].threads}</span>
            <span>Архитектура: {cpus[id].generation}</span>
            <span>Частота: до {cpus[id].boost_clock}</span>
            <span>Цена: {cpus[id].price}$</span>
          </div>
        </div>
      )
    })
  }

  function cpuSecond () {
    return (
      <div className={popupClasses.CpuSecond}>
        <div className={popupClasses.CpuList}>
          {renderCpus()}
        </div>
        <p>Рекомендуемые процессоры для указанного сценария использования ПК <button
          onClick={() => setCpuType(null)}>Назад</button>
          <button onClick={() => setCpuHelp(true)}>Справка</button>
        </p>
      </div>
    )
  }

  function renderCpuHelp () {
    return (
      <div className={popupClasses.CpuHelp}>
        <h1>При выборе процессора стоит обратить внимание на следующие параметры:</h1>
        <p>1. Частота процессора. Измеряется в гигагерцах (ГГц) и отвечает за скорость обработки информации. Чем выше частота, тем выше мощность процессора при прочих равных. Следует понимать, что сравнение процессоров по частоте справедливо только для процессоров на одной архитектуре. Некоторые процессоры имеют возможность ручной настройки частоты (разгона), такие процессоры имеют в названии префикс "K" (для моделей Intel), все процессоры от AMD, кроме моделей с префиксом "X3D", имеют возможность разгона.</p>
        <p>2. Количество ядер и потоков. Ядро процессора - физический вычислительный модуль в составе процессора, поток - виртуальный вычислительный модуль, позволяющий одному ядру обрабатывать несколько цепочек команд одновременно. Некоторые процессоры имеют гибридную архитектуру, включающую разные виды ядер: производительные и энергоэффективные. В таких процессорах энергоэффективные ядра берут на себя фоновую нагрузку, оставляя ресурсоёмкие задачи на мощные ядра. Несмотря на большее количество ядер чем у аналогов без гибридной архитектуры, такие процессоры не всегда мощнее.</p>
        <p>3. Кэш память. Встроенная в процессор энергозависимая память. Её объём относительно небольшой, однако скорость доступа в неё в несколька раз выше, чем у оперативной памяти. Большой объём кэша у процессора повышает производительность, прирост от обьёма кэша наиболее заметен в играх. Самый большой объём кэш-памяти 3 уровня у процессоров AMD с префиксом "X3D".</p>
        <p>4. Энергопотребление (TDP). Энергопотребление процессора является важным параметром при выборе процессора. Высокое энергопотребление черевато не только дорогими счетами на оплату коммунальных услуг. От этого параметра напрямую зависит тепловыделение процессора, требования к качеству материнской платы, системе охлаждения и блока питания.</p>
        <p>5. Интегрированный графический ускоритель. Некоторые модели процессоров имеют встроенное подобие видеокарты. Таким процессорам не нужна дискретная видеокарта, однако производительность встроенных графических ускорителей заметно ниже чем у дискретных видеокарт, особенно в процессорах старых поколений.</p>
        <button onClick={() => setCpuHelp(false)}>Назад</button>
      </div>
    )
  }

  function cpuFirst () {
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

  function cpuPopup () {
    return (
      <div className={popupClasses.Cpu}>
        <h1>Выбор процессора</h1>
        {cpuHelp ?renderCpuHelp() :cpu ? renderCpuCard() : (cpuType === null ? cpuFirst() : cpuSecond())}
      </div>
    )
  }

  function renderPopup () {
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
        {type === '/cpu.png' ? cpuPopup() : null}
      </div>
    )
  }

  function renderPortfolio (data) {
    return Object.keys(data).map((id) => {
      return (
        <div onClick={() => {
          setOpen(true)
          setType(data[id].backgroundImg)
        }} className={classes.AdWrapper} key={id}>
          <div style={{ backgroundImage: `url(${data[id].backgroundImg})` }} className={classes.Advertisement}>
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
      <span className={classes.Span}>Конфигуратор</span>
      {open ? renderPopup() : null}
      <div className={classes.Content}>
        {renderPortfolio(props.data.data.portfolio)}
      </div>
    </div>
  )
}

export default Configurator