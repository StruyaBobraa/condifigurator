import React from "react";
import popupClasses from "@/components/configurator/popup.module.scss";

const CpuFirst = (props) => {
    return (
        <div className={popupClasses.CpuFirst}>
            <span>Выберите класс процессора</span>
            <div className={popupClasses.CpuFirstLinks}>
                <div className={popupClasses.LastCpuLinks}>
                    <a onClick={() => props.onClick(3)}>Мощные процессоры, которые могут выполнять сложные вычисления и
                        подходят для современных игр и работы со сложными вычислениями</a>
                    <a onClick={() => props.onClick(2)}>Процессоры среднего класса, дающие максимум производительности за небольшую цену и подходящие для игр</a>
                    <a onClick={() => props.onClick(1)}>Бюджетные процессоры, которые подойдут для офисной работы, не
                        требующей сложных вычислений</a>
                </div>
            </div>
        </div>
    )
}


export default CpuFirst