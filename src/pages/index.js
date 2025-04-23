import Head from 'next/head'
import classes from '../styles/Home.module.scss'
import Navbar from '../components/navbar/navbar'
import React from 'react'
import Description from '../components/description/description'
import HowToUse from '../components/howToUse/howToUse'
import Contact from '../components/contact/contact'
import Footer from '../components/footer/footer'
import fsPromises from 'fs/promises'
import path from 'path'
import axios from "axios";
import dynamic from "next/dynamic";
const { subDays, format } = require('date-fns');
const { DOMParser } = require("xmldom");
const Configurator = dynamic(() => import('../components/configurator/configurator'), { ssr: false });

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
    const yesterday = subDays(new Date(), 1);
    const formattedDate = format(yesterday, 'dd/MM/yyyy');

    const parser = new DOMParser();
    const response = await axios.get(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=${formattedDate}`)
    const xmlDoc = parser.parseFromString(response.data, "application/xml")
    const exchange = xmlDoc.getElementsByTagName("Value")[13].textContent

    const localData = path.join(process.cwd(), '/local/data.json');
    const cpu = path.join(process.cwd(), '/local/cpu.json');
    const gpu = path.join(process.cwd(), '/local/gpu.json');
    const mb = path.join(process.cwd(), '/local/mb.json');
    const psu = path.join(process.cwd(), '/local/psu.json');
    const ram = path.join(process.cwd(), '/local/ram.json');
    const ssd = path.join(process.cwd(), '/local/ssd.json');
    const cooler = path.join(process.cwd(), '/local/coolers.json')

    const jsonData = await fsPromises.readFile(localData)
    const cpuData = await fsPromises.readFile(cpu)
    const gpuData = await fsPromises.readFile(gpu)
    const mbData = await fsPromises.readFile(mb)
    const psuData = await fsPromises.readFile(psu)
    const ramData = await fsPromises.readFile(ram)
    const ssdData = await fsPromises.readFile(ssd)
    const coolerData = await fsPromises.readFile(cooler)

    const objectData = JSON.parse(jsonData)
    const objectCpu = JSON.parse(cpuData)
    const objectGpu = JSON.parse(gpuData)
    const objectMb = JSON.parse(mbData)
    const objectPsu = JSON.parse(psuData)
    const objectRam = JSON.parse(ramData)
    const objectSsd = JSON.parse(ssdData)
    const objectCooler = JSON.parse(coolerData)

    return {
        props: {
            data: {
                data: objectData,
                cpu: objectCpu,
                gpu: objectGpu,
                mb: objectMb,
                psu: objectPsu,
                ram: objectRam,
                ssd: objectSsd,
                cooler: objectCooler,
                exc: parseInt(exchange)
            }
        }
    }
}
