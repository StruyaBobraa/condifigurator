import React, { useState } from 'react'
import classes from './contact.module.scss'

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
          <input type='text' onChange={(e) => setFname(e.target.value)} placeholder='Имя'/>
          <input type='text' onChange={(e) => setSubj(e.target.value)} placeholder='Тема'/>
        </div>
        <textarea onChange={(e) => setMessage(e.target.value)} style={{height: '30%'}} placeholder='Сообщение'/>
        <a href={`mailto:oleg.a.yugov@gmail.com?subject=${subj}&body=${fname}, ${message}`}>Отправить письмо</a>
      </div>
    </div>
  )
}

export default Contact