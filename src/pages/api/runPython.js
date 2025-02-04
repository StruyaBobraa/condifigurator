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
}