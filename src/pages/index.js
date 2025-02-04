import { useState } from 'react';
import Head from 'next/head'
import {Inter} from 'next/font/google'
const inter = Inter({subsets: ['cyrillic']})
import classes from '../styles/Home.module.scss'
import Navbar from '../components/navbar/navbar'
import React from 'react'
import Description from '../components/description/description'
import HowToUse from '../components/howToUse/howToUse'
import Configurator from '../components/configurator/configurator'
import Contact from '../components/contact/contact'
import Footer from '../components/footer/footer'
import fsPromises from 'fs/promises'
import path from 'path'

export default function Home({data}) {

    return (
        <>
            <Head>
                <title>Condifigurator</title>
                <meta name="description" content="Умный конфигуратор ПК"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico?v=1.0" type="image/x-icon"/>
            </Head>
            <div className={classes.Layout}>
                <div className={classes.Wrapper}>
                    <Navbar/>
                    <Description/>
                    <HowToUse/>
                    <Configurator data={data}/>
                    <Contact/>
                    <Footer/>
                </div>
            </div>
        </>
    )

}

export async function getStaticProps() {
    const localData = path.join(process.cwd(), '/local/data.json');
    const cpu = path.join(process.cwd(), '/local/cpu.json');
    const gpu = path.join(process.cwd(), '/local/gpu.json');
    const mb = path.join(process.cwd(), '/local/mb.json');
    const psu = path.join(process.cwd(), '/local/psu.json');
    const ram = path.join(process.cwd(), '/local/ram.json');

    const jsonData = await fsPromises.readFile(localData)
    const cpuData = await fsPromises.readFile(cpu)
    const gpuData = await fsPromises.readFile(gpu)
    const mbData = await fsPromises.readFile(mb)
    const psuData = await fsPromises.readFile(psu)
    const ramData = await fsPromises.readFile(ram)

    const objectData = JSON.parse(jsonData)
    const objectCpu = JSON.parse(cpuData)
    const objectGpu = JSON.parse(gpuData)
    const objectMb = JSON.parse(mbData)
    const objectPsu = JSON.parse(psuData)
    const objectRam = JSON.parse(ramData)

    return {
        props: {
            data: {
                data: objectData,
                cpu: objectCpu,
                gpu: objectGpu,
                mb: objectMb,
                psu: objectPsu,
                ram: objectRam
            }
        }
    }
}