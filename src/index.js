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
    const { url } = req.query
    const fileName = await generateEpub(url);
    res.download(join(__dirname, '..', 'articles', `${fileName}.epub`));	
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});