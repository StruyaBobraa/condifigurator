'use client'
import React, { useState, useEffect } from 'react'
import classes from './slider.module.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Slider = () => {
  // localStorage.test = 'test'

  // const [cpuPower, setCpuPower] = useState(localStorage.cpuPower / 205 * 100)
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Text}>
        <p>Анализ вашей сборки</p>
      </div>
      <Swiper
        className={classes.swiper}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        navigation
        pagination={{
          /*el: `.swiper-pagination`,
          type: 'bullets',*/
          clickable: true,
          bulletClass: classes.SwiperButton,
          bulletActiveClass: classes.SwiperButtonActive,
          renderBullet: (index, className) => {
            return '<button class="' + className + '">' + '</button>'
          }
        }}
        initialSlide={0}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <div className={classes.FirstSlide}>
            <p>Производительность</p>
            <div className={classes.FrontEnd}>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Процессор</h1>
                  <strong>97%</strong></div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: `${97}%` }}/>
                </div>
              </div>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Видеокарта</h1><strong>95%</strong></div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '95%' }}/>
                </div>
              </div>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>ОЗУ</h1><strong>87%</strong></div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '87%' }}/>
                </div>
              </div>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Вся сборка</h1><strong>87%</strong></div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '87%' }}/>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.FirstSlide}>
            <p>Рентабельность</p>
            <div className={classes.FrontEnd}>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Процессор</h1><strong>65%</strong></div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '65%' }}/>
                </div>
              </div>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Материнская плата</h1><strong>75%</strong>
                </div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '75%' }}/>
                </div>
              </div>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Видеокарта</h1><strong>65%</strong></div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '65%' }}/>
                </div>
              </div>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Вся сборка</h1><strong>75%</strong></div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '75%' }}/>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.FirstSlide}>
            <p>Актуальность</p>
            <div className={classes.FrontEnd}>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Процессор</h1><strong>85%</strong></div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '85%' }}/>
                </div>
              </div>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Материнская плата</h1><strong>90%</strong>
                </div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '90%' }}/>
                </div>
              </div>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Видеокарта</h1><strong>87%</strong></div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '87%' }}/>
                </div>
              </div>
              <div>
                <div style={{ width: '100%' }} className={classes.Desc}><h1>Вся сборка</h1><strong>75%</strong></div>
                <div style={{ width: '100%' }} className={classes.Quality}>
                  <div style={{ width: '75%' }}/>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slider