# Medium to Kindle

<div align="center">
    <a href="https://medium-kindle-sender.onrender.com/" target="_blank"><img src="./src/static/img/ArticleKindleConverter.png" alt="Logo Project"/></a>
</div>

This is a simple script to convert Medium articles to Kindle format (epub).

Test it at <https://medium-kindle-sender.onrender.com/>.

## Built with

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Epub-gen lib](https://github.com/cyrilis/epub-gen)
- [Mailersend](https://github.com/mailersend/mailersend-nodejs)

## Features

- [x] Convert Medium articles to epub
- [x] Website to convert articles
- [x] Download the epub file
- [x] Multilanguage support (PT-BR and EN-US)
- [x] Send the epub file by email
- [ ] Create a CLI
- [ ] Create a browser extension

## Usage

1. Install the required packages:

```bash
npm install
```

2. Run the script:

```bash
npm run start
```

## Environment variables

Create a `.env` file in the root directory with the following variables:

``` env
PORT=3000 # Port where the server will run (default: 3000)
API_KEY=your_api_key # Mailersend API key
EMAIL_SENDER=your_email # Email to send the epub file
```

## Endpoints

- Website:
  - `GET /`: Home page
  - `GET /how-to-send-to-kindle`: Page with instructions on how to send the epub file to Kindle

- API Endpoints:
  - `POST /download`: Download the epub file
  - `POST /email`: Send the epub file by email

## Example epub

You can see an example of the generated epub file in `articles/` folder.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Developed by [Jean Jacques Barros](https://github.com/jjeanjacques10)
