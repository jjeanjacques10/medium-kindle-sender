import Epub from "epub-gen";
import axios from "axios";
import { JSDOM } from 'jsdom';

async function generateEpub(articleUrl) {
    const response = await getArticleContent(articleUrl)
    if (!response.data) return console.error("No data found");

    const article = extractArticleFromHTML(response.data);

    const option = {
        title: article.title, // *Required, title of the book.
        author: article.author, // *Required, name of the author.
        cover: article.cover, // Url or File path, both ok.
        content: [
            {
                data: article.data
            }
        ]
    };

    const fileName = cleanTitle(article.title);
    new Epub(option, `./articles/${fileName}.epub`);

    // return epub location to download
    return fileName;
}

function extractArticleFromHTML(html) {
    const doc = new JSDOM(html).window.document;

    doc.querySelectorAll('picture').forEach(e => {
        e.querySelector('img').src = e.querySelector('source').srcset.split(', ').pop().replace(/ \d+w/, '');
    });

    doc.querySelectorAll('button').forEach(e => e.remove());

    return {
        data: doc.documentElement.outerHTML,
        title: doc.querySelector('h1').textContent,
        author: doc.querySelector('a[data-testid="authorName"]').textContent,
        cover: doc.querySelector('img').src
    };
}


async function getArticleContent(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {
                let data = response.data;
                let start = data.indexOf('<article>');
                let end = data.indexOf('</article>');
                data = data.substring(start, end);
                resolve({ data });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function cleanTitle(title) {
    return title.replace(/[^a-zA-Z ]/g, "").replace(/ /g, "-").toLowerCase();
}


export { generateEpub };
