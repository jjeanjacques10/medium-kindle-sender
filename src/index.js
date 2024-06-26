import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateEpub } from './articleProcessor.js';
import { isValidUrl } from './utils.js';
import sendEmail from './email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/static', express.static(join(__dirname, 'static'), { extensions: ['css', 'svg', 'js'] }));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'home.html'));
});

app.get('/how-to-send-to-kindle', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'sendToKindle.html'));
});

app.post('/download', async (req, res) => {
    try {
        const { url } = req.query
        console.log(url);
        if (!isValidUrl(url)) {
            throw new Error('Invalid URL. Please enter a valid URL.');
        }
        const fileName = await generateEpub(url);
        res.download(join(__dirname, '..', 'articles', `${fileName}.epub`));
    } catch (error) {
        res.status(500).send('Failed to download the file. Please try again later. Error: ' + error.message);
    }
});

app.post('/email', async (req, res) => {
    try {
        const { url, email } = req.body;
        console.log(url, email);
        if (!isValidUrl(url)) {
            throw new Error('Invalid URL. Please enter a valid URL.');
        }
        const fileName = await generateEpub(url);
        await sendEmail(email, fileName, join(__dirname, '..', 'articles', `${fileName}.epub`));
        res.send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Failed to send the email. Please try again later. Error: ' + error);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});