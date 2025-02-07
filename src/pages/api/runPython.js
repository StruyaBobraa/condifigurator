const fs = require('fs');
const brain = require('brain.js');

// Чтение JSON файлов
const processorsFile = './local/cpu.json';
const graphicsCardsFile = './local/gpu.json';
const motherboardsFile = './local/mb.json';
const powerSuppliesFile = './local/psu.json';

export default async function handler(req, res) {


    const {name = 'World'} = req.query;

    const cpu = name.split('*')[0]
    const gpu = name.split('*')[1]
    const mb = name.split('*')[2]
    const cpuT = name.split('*')[3]
    const gpuT = name.split('*')[4]
    const psu = name.split('*')[5]
    const prc = name.split('*')[6]
    const grc = name.split('*')[7]

    function readJsonFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    async function prepareData(processorsFile, graphicsCardsFile, motherboardsFile, powerSuppliesFile) {
        const processors = await readJsonFile(processorsFile);
        const graphicsCards = await readJsonFile(graphicsCardsFile);
        const motherboards = await readJsonFile(motherboardsFile);
        const powerSupplies = await readJsonFile(powerSuppliesFile);


        const trainingData = [];

        processors.processors.forEach(processor => {
            graphicsCards.graphics_cards.forEach(graphicsCard => {
                motherboards.motherboards.forEach(motherboard => {
                    powerSupplies.power_supplies.forEach(powerSupply => {
                        const input = [
                            parseFloat(processor.performance_score),
                            parseFloat(graphicsCard.performance_score),
                            parseFloat(motherboard.power_supply_headroom),
                            parseFloat(processor.tdp.replace(' W', '')),
                            parseFloat(graphicsCard.tdp.replace(' W', '')),
                            parseFloat(powerSupply.wattage),
                            parseFloat(processor.price_performance_ratio),
                            parseFloat(graphicsCard.price_performance_ratio)
                        ];

                        let output = ""

                        if (Math.abs(Math.sqrt(processor.performance_score / 205) * 100 - Math.sqrt(graphicsCard.performance_score / 370) * 100) > 12) {
                            output += "Performance_disbalance"
                            if (!((processor.tdp.replace(' W', '') < 70 && motherboard.power_supply_headroom === 0) || (processor.tdp.replace(' W', '') < 100 && motherboard.power_supply_headroom === 1) || (processor.tdp.replace(' W', '') < 130 && motherboard.power_supply_headroom === 2) || (processor.tdp.replace(' W', '') < 200 && motherboard.power_supply_headroom === 3))) {
                                output += "Motherboard_psu_bottleneck"
                                if (processor.tdp.replace(' W', '') * 3.6 + graphicsCard.tdp.replace(' W', '') < powerSupply.wattage) {
                                    output += "PSU_bottleneck"
                                    if (processor.price_performance_ratio * 100 < 50) {
                                        output += "Cpu_overprice"
                                        if (graphicsCard.price_performance_ratio * 100 < 50) {
                                            output += "Gpu_overprice"
                                        }
                                    }
                                }
                            }
                        }
                        /*const output = Math.abs(Math.sqrt(processor.performance_score / 205) * 100 - Math.sqrt(graphicsCard.performance_score / 370) * 100) < 10 ? "Good" : "Bad";*/

                        trainingData.push({
                            input: input,
                            output: output
                        });
                    });
                });
            });
        });

        return trainingData;
    }

// Обучение нейросети
    function trainNeuralNetwork(trainingData) {
        const net = new brain.NeuralNetwork();
        net.train(trainingData);  // Обучаем нейросеть
        return net;
    }

// Предсказание и советы по замене компонентов
    function giveUpgradeAdvice(net, inputData) {
        const output = net.run(inputData);
        let advice = ""

        if (output.includes("Performance_disbalance")) {
            advice += "В Вашей сборке нарушен баланс производительности между поцессором и видеокартой."
        }
        if (output.includes("Motherboard_psu_bottleneck")) {
            advice += " Подсистема питания выбранной материнской платы не способна обеспечить процессор необходимой мощностью."
        }
        if (output.includes("PSU_bottleneck")) {
            advice += " Выбранный блок питания недостаточно мощный."
        }
        if (output.includes("Cpu_overprice")) {
            advice += " Пересмотрите выбор процессора, у выбранной модели неоправданно высокая цена."
        }
        if (output.includes("Gpu_overprice")) {
            advice += " Пересмотрите выбор видеокарты, у выбранной модели неоправданно высокая цена."
        }

        // Если оценка конфигурации плохая, предлагается улучшение
        if (output !== "") {
            return advice;
        } else {
            return "Наша нейросеть оценила вашу сборку и считает её сбалансированной.";
        }
    }

// Основная функция
    async function evaluatePCConfiguration(processorsFile, graphicsCardsFile, motherboardsFile, powerSuppliesFile, inputData) {
        try {
            const trainingData = await prepareData(processorsFile, graphicsCardsFile, motherboardsFile, powerSuppliesFile);
            const net = trainNeuralNetwork(trainingData);

            // Прогнозируем и даем советы
            const advice = giveUpgradeAdvice(net, inputData);
            console.log(advice);
            res.status(200).json({advice});
        } catch (error) {
            console.error('Error:', error);
        }
    }

// Пример использования
    const inputData = [
        cpu,
        gpu,
        mb,
        cpuT,
        gpuT,
        psu,
        prc,
        grc
    ];

    evaluatePCConfiguration(processorsFile, graphicsCardsFile, motherboardsFile, powerSuppliesFile, inputData).then()
}

// Подготовка данных для обучения


/*
import { exec } from 'child_process';

export default async function handler(req, res) {


    try {
        // Получаем параметр из запроса
        const { name = 'World' } = req.query;

        // Запускаем Python-скрипт
        exec(`python script.py ${name}`, { encoding: 'utf8' }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${stderr}`);
                return res.status(500).json({ error: stderr });
            }
            res.status(200).json({ message: stdout.trim() });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}*/
