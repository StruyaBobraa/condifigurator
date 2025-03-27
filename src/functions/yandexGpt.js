'use server'
import axios from "axios";
// const axios = require('axios')

async function askYandexGPT(config) {
    let cpu = "Intel Core i5-10400F"
    let gpu = "AMD Radeon RX 6600XT"

    if (typeof config === "object") {
        cpu = config.cpu
        gpu = config.gpu
    }

    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
    const API_KEY = "AQVN2XjpNoTrAQWDeqSYM-uHz-g3Ua04vl1M_eEu"; // Укажите ваш API-ключ
    const FOLDER_ID = "b1ge4jhtddsvu2ouvtt3"; // Идентификатор каталога
    const URL = `${PROXY_URL}https://llm.api.cloud.yandex.net/foundationModels/v1/completion`;
    const prompt = `Оцени по разным параметрам сборку, состоящую из ${cpu}, ${gpu}, и дай рекомендации. Не учитывай блок питания и оперативную память. Если на твой взгляд сборка несбалансированна, скажи, что в ней надо поменять. Не давай рекомендации по замене если сборка на твой взгляд сбалансированна. Постарайся уместить рекомендации в 5-6 предложений. Учти, что сбалансированной можно назвать сборку где процессор и видеокарта соответствуют друг другу по уровню производительности, например, сборка содержащая в себе бюджетный процессор и топовую видеокарту не будет сбалансированной и в таком случае ты должен будешь посоветовать конкретную модель на замену для процессора или видеокарты, чтобы они соответствовали друг другу по уровню производительности. Для топовых видеокарт рекомендуй процессоры Core I9 или Ryzen 9, для среднебюджетных - Core I7 или I5 или Ryzen 7 или 5. Процессоры с индексом X3D относи к топовым процессорам уровня Core I9 и Ryzen 9. К топовым видеокартам можно отнести модели RTX 4070 и мощнее. Учти что НЕЛЬЗЯ давать оценку производительности видеокарты по объёму видеопамяти. Делай оценку производительности видеокарты и процессора исходя из тестов.`
    try {
        const response = await axios.post(
            URL,
            {
                modelUri: `gpt://${FOLDER_ID}/yandexgpt-pro`, // Используем YandexGPT Pro
                completionOptions: {
                    stream: false, // Отключаем потоковый режим
                    temperature: 0.7,
                    maxTokens: 1000
                },
                messages: [
                    {
                        role: "ai.generation.user",
                        text: prompt
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Api-Key ${API_KEY}`
                }
            }
        );

        console.log("Ответ от YandexGPT Pro:", response.data.result.alternatives[0].message.text);
        return response.data.result.alternatives[0].message.text
    } catch (error) {
        console.error("Ошибка при запросе к YandexGPT Pro:", error.response?.data || error.message);
    }
}

export default askYandexGPT()