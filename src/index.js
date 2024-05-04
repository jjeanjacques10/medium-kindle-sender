import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateEpub } from './articleProcessor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/static', express.static(join(__dirname, 'static'), { extensions: ['css', 'svg', 'js'] }));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'home.html'));
});

app.post('/download', async (req, res) => {
    try {
        const { url } = req.query
        if (!isValidUrl(url)) {
            throw new Error('Invalid URL. Please enter a valid URL.');
        }
        const fileName = await generateEpub(url);
        res.download(join(__dirname, '..', 'articles', `${fileName}.epub`));
    } catch (error) {
        res.status(500).send('Failed to download the file. Please try again later. Error: ' + error.message);
    }
});

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});