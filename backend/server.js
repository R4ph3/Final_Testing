const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let hashes = [];

function isSHA256(hash) {
    return /^[a-fA-F0-9]{64}$/.test(hash);
}

app.get('/api/hashes', (req, res) => {
    res.json(hashes);
});

app.post('/api/hashes', (req, res) => {
    const { hash, name, family } = req.body;

    if (!hash || !name || !family) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (!isSHA256(hash)) {
        return res.status(400).json({ error: 'El hash no es válido (debe ser SHA256)' });
    }

    if (hashes.find(h => h.hash === hash)) {
        return res.status(400).json({ error: 'Hash duplicado' });
    }

    hashes.push({ hash, name, family });
    res.status(201).json({ message: 'Hash agregado correctamente' });
});

app.listen(3000, () => console.log('Backend corriendo en http://localhost:3000'));