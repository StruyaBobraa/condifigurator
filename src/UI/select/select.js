import React from "react";
import popupClasses from "@/components/configurator/popup.module.scss";

const data = [
    {
        id: "cpu",
        values: [
            "price",
            "price_r",
            "perf",
            "price_p"
        ],
        names: [
            "По возрастанию цены",
            "По убыванию цены",
            "Сначала мощные",
            "Сначала выгодные"
        ]
    },
    {
        id: "gpu",
        values: [
            "price",
            "price_r",
            "perf",
            "price_p"
        ],
        names: [
            "По возрастанию цены",
            "По убыванию цены",
            "Сначала мощные",
            "Сначала выгодные"
        ]
    },
    {
        id: "mb",
        values: [
            "price",
            "price_r",
            "quality",
            "vrm"
        ],
        names: [
            "По возрастанию цены",
            "По убыванию цены",
            "Сначала более надёжные",
            "По мощности VRM"
        ]
    },
    {
        id: "ram",
        values: [
            "price",
            "price_r"
        ],
        names: [
            "По возрастанию цены",
            "По убыванию цены"
        ]
    },
    {
        id: "psu",
        values: [
            "price",
            "price_r",
            "quality"
        ],
        names: [
            "По возрастанию цены",
            "По убыванию цены",
            "Сначала более надёжные"
        ]
    }
]


const Select = (props) => {
    const value = props.value
    let values = []
    let names = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === props.type) {
            values = data[i].values
            names = data[i].names
        }
    }

    function renderOptions() {
        return Object.keys(values).map((id) => {
            return (
                <option key={id} value={values[id]}>{names[id]}</option>
            )
        })
    }

    return (
        <select className={popupClasses.Sort} value={value} onChange={(e) => props.onChange(e.target.value)}>
            <option value="default">По умолчанию</option>
            {renderOptions()}
        </select>
    )
}


export default Select