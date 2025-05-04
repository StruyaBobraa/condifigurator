import React, {useState} from 'react'
import cclasses from './configurator.module.scss'
import Button from "@/UI/button/button";
import Call from "@/UI/call/call";
import MainPopup from "@/UI/popup/mainPopup/mainPopup";
import Backdrop from "@/UI/backdrop/backdrop";

const Configurator = (props) => {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState(null)
    const data = [
        {
            id: "cpu",
            name: localStorage.cpuName !== undefined ? localStorage.cpuName : "Центральный процессор",
            onClick: () => {setOpen(true)
                setType("cpu")}
        },
        {
            id: "gpu",
            name: localStorage.gpuName !== undefined ? localStorage.gpuName : "Видеокарта",
            onClick: () => {setOpen(true)
                setType("gpu")}
        },
        {
            id: "mb",
            name: localStorage.mbName !== undefined ? localStorage.mbName : "Материнская плата",
            onClick: () => {setOpen(true)
                setType("mb")}
        },
        {
            id: "ram",
            name: localStorage.ramName !== undefined ? localStorage.ramName : "Оперативная память",
            onClick: () => {setOpen(true)
                setType("ram")}
        },
        {
            id: "psu",
            name: localStorage.psuName !== undefined ? localStorage.psuName : "Блок питания",
            onClick: () => {setOpen(true)
                setType("psu")}
        },
        {
            id: "case",
            name: "Остальные комплектующие",
            onClick: () => {setOpen(true)
                setType("case")}
        }
    ]
    function renderCall() {
        return Object.keys(data).map((id) => {
            return (
                <Call name={data[id].name} type={data[id].id} onClick={() => data[id].onClick()}/>
            )
        })
    }
    return (
        <div id='portfolio' className={cclasses.Wrapper}>
            <Backdrop visible={open} onClick={() => setOpen(false)}/>
            <span className={cclasses.Span}>Конфигуратор</span>
            {open ? <MainPopup setType={(value) => setType(value)} data={props.data} onClose={() => {
                setOpen(false)
                setType(null)
            }} type={type}/> : null}
            <div className={cclasses.Content}>
                {renderCall()}
            </div>
            <Button style={{top: "15%"}} onClick={() => {
                setType('rate')
                setOpen(true)
            }} text="Оценить мою сборку"/>
        </div>
    )
}


export default Configurator