const Epub = require("epub-gen");
var axios = require("axios").default;
const { JSDOM } = require('jsdom');

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

getArticleContent('https://medium.com/@fengruohang/postgres-is-eating-the-database-world-157c204dcfc4')
    .then((response) => {
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

        new Epub(option, "./" + cleanTitle(article.title) + ".epub");
    })
    .catch((error) => {
        console.error(error);
    });




