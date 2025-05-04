import React, {useState} from "react";
import popupClasses from "@/components/configurator/popup.module.scss";
import Help from "@/UI/help/help";
import CpuFirst from "@/UI/popup/cpuFirst/cpuFirst";
import Second from "@/UI/popup/second/second";
import Card from "@/UI/popup/card/card";
import Rate from "@/UI/popup/rate/rate";

const data = [
    {
        id: "cpu",
        name: "процессора",
    },
    {
        id: "gpu",
        name: "видеокарты",
    },
    {
        id: "mb",
        name: "материнской платы",
    },
    {
        id: "ram",
        name: "оперативной памяти",
    },
    {
        id: "psu",
        name: "блока питания",
    },
]

const Popup = (props) => {
    const [cpuType, setCpuType] = useState(null)
    const [cpu, setCpu] = useState(false)
    const [cpuHelp, setCpuHelp] = useState(false)

    let name = ""
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === props.type) {
            name = data[i].name
        }
    }
    if (props.type === "rate") {
        return (
            <div className={popupClasses.Cpu}>
                <Rate exchange={props.data.exc}/>
            </div>
        )
    }
    if (props.type === "case") {
        return null
    }
    else
    {
        return (
            <div className={popupClasses.Cpu}>
                <h1>Выбор {name}</h1>
                {cpuHelp ? (<Help type={props.type}
                                  onClick={() => setCpuHelp(false)}/>) : cpu ?
                    <Card setType={(value) => props.setType(value)} setItem={(value) => setCpu(value)}
                          exchange={props.data.exc} type={props.type}/> : (cpuType === null && props.type === "cpu" ?
                        <CpuFirst onClick={(value) => setCpuType(value)}/> :
                        <Second onHelpCLick={(value) => setCpuHelp(value)} onBack={props.type === "cpu" ?() => setCpuType(null) :props.onBack} data={props.data} cpuType={cpuType} setItem={(value) => setCpu(value)}
                                type={props.type}/>)}
            </div>
        )
    }
}

export default Popup