const sendButton = document.querySelector('#download-button');
const sendEmailButton = document.querySelector('#email-button');
const loadingDiv = document.querySelector('.loading');
const errorDiv = document.querySelector('.error');
const successDiv = document.querySelector('.success');

sendButton.addEventListener('click', async (event) => {
    event.preventDefault();
    disableButton();
    const url = document.querySelector('#article-url').value;

    try {
        loadingDiv.style.display = 'block'; // show loading div

        const response = await fetch(`/download?url=${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        // get the article file name from the response headers
        const filename = response.headers.get('Content-Disposition').split('filename=')[1];

        const blob = await response.blob();
        const urlBlob = URL.createObjectURL(blob);
        const a = document.createElement('a'); // Create the 'a' element
        a.href = urlBlob;
        a.download = filename.replace(".epub", "");

        a.click(); // Call the 'click' function on the 'a' element
        URL.revokeObjectURL(urlBlob);

        // clear the input
        document.querySelector('#article-url').value = '';

        successDiv.innerHTML = "<span>Article converted successfully! Check your downloads folder for the epub file.</span>";
        successDiv.style.display = 'block'; // show success div
        errorDiv.style.display = 'none'; // hide error div
    } catch (error) {
        errorDiv.style.display = 'block'; // show error div
        successDiv.style.display = 'none'; // hide success div
        errorDiv.textContent = error.message;
    } finally {
        enableButton();
        loadingDiv.style.display = 'none'; // hide loading div
    }
});

sendEmailButton.addEventListener('click', async (event) => {
    event.preventDefault();
    disableButton();
    const url = document.querySelector('#article-url').value;
    const email = document.querySelector('#email').value;

    try {
        loadingDiv.style.display = 'block'; // show loading div

        const response = await fetch('/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, email })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        // clear the input
        document.querySelector('#article-url').value = '';
        document.querySelector('#email').value = '';

        successDiv.innerHTML = "<span>Article converted successfully! Check your email</span>";
        successDiv.style.display = 'block'; // show success div
        errorDiv.style.display = 'none'; // hide error div
    } catch (error) {
        errorDiv.style.display = 'block'; // show error div
        successDiv.style.display = 'none'; // hide success div
        errorDiv.textContent = error.message;
    } finally {
        enableButton();
        loadingDiv.style.display = 'none'; // hide loading div
    }
});

function disableButton() {
    sendButton.disabled = true;
    sendButton.style.cursor = 'not-allowed';
    sendButton.style.backgroundColor = '#ccc';

    sendEmailButton.disabled = true;
    sendEmailButton.style.cursor = 'not-allowed';
    sendEmailButton.style.backgroundColor = '#ccc';
}

function enableButton() {
    sendButton.disabled = false;
    sendButton.style.cursor = 'pointer';
    sendButton.style.backgroundColor = '#4caf50';

    sendEmailButton.disabled = false;
    sendEmailButton.style.cursor = 'pointer';
    sendEmailButton.style.backgroundColor = '#4caf50';
}