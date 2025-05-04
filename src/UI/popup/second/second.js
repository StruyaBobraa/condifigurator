import React, { useState } from "react";
import popupClasses from "@/components/configurator/popup.module.scss";
import Input from "@/UI/input/input";
import Button from "@/UI/button/button";
import List from "@/UI/popup/list/list";
import Select from "@/UI/select/select";
import Anchor from "@/UI/anchor/anchor";


const data = [
    {
        id: "cpu",
        name: "процессоры",
    },
    {
        id: "gpu",
        name: "видеокарты",
    },
    {
        id: "mb",
        name: "материнские платы",
    },
    {
        id: "ram",
        name: "наборы оперативной памяти",
    },
    {
        id: "psu",
        name: "блоки питания",
    },
]


const Second = (props) => {
    const [cpuName, setCpuName] = useState("")
    const [gpuName, setGpuName] = useState("")
    const [sort, setSort] = useState("default")
    let cpuType = useState(props.cpuType)
    const [cpuTypeLocal, setCpuTypeLocal] = useState(undefined)
    const [gpuType, setGpuType] = useState(false)

    let name = ""
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === props.type) {
            name = data[i].name
        }
    }

    return (
        <div className={popupClasses.CpuSecond}>
            <div className={popupClasses.CpuList}>
                {
                    props.type === "cpu" ? <Input type="input" value={cpuName} placeholder="Поиск по названию"
                                                  onChange={(e) => setCpuName(e.target.value)}/>
                        : props.type === "gpu" ? <Input type="input" value={gpuName} placeholder="Поиск по названию"
                                                        onChange={(e) => setGpuName(e.target.value)}/> : null
                }
                <List gpuType={gpuType} cpuName={cpuName} gpuName={gpuName} data={props.data} type={props.type} setItem={(value) => props.setItem(value)} sort={sort} cpuType={cpuTypeLocal !== undefined ? cpuTypeLocal : cpuType[0]} />
            </div>
            <p>Рекомендуемые {name} для указанного сценария использования ПК
                {
                    props.type === "cpu"
                    ? <Anchor text="Показать все" onClick={() => setCpuTypeLocal('all')}/>
                        : props.type === "gpu"
                    ? <Anchor text={!gpuType ?"Показать все" :"Только подходящие"} onClick={() => setGpuType(!gpuType)}/>
                        : null
                }

                <br/>
                <p>Сортировать по</p>
                <Select value={sort} type={props.type} onChange={(value) => {setSort(value)}}/>
                <Button onClick={() => props.onBack(null)} text="Назад"/>
                <Button onClick={() => props.onHelpCLick(true)} text="Справка"/>
            </p>
        </div>
    )
}


export default Second