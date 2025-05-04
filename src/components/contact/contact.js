import React, { useState } from 'react'
import classes from './contact.module.scss'
import Button from "@/UI/button/button";
import Input from "@/UI/input/input";

const Contact = () => {
  const [fname, setFname] = useState('')
  const [subj, setSubj] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div id='contact' className={classes.Wrapper}>
      <div className={classes.Text}>
        <span>Напишите нам</span>
        <p>Если у Вас есть вопросы и пожелания относительно работы сайта</p>
      </div>
      <div className={classes.Mail}>
        <div className={classes.InputWrap}>
          <Input type='input' onChange={(e) => setFname(e.target.value)} placeholder='Имя'/>
          <Input type='input' onChange={(e) => setSubj(e.target.value)} placeholder='Тема'/>
        </div>
        <Input type='textarea' onChange={(e) => setMessage(e.target.value)} placeholder='Сообщение'/>
        <Button href={`mailto:oleg.a.yugov@gmail.com?subject=${subj}&body=${fname}, ${message}`} text="Отправить письмо"/>
      </div>
    </div>
  )
}

export default Contact