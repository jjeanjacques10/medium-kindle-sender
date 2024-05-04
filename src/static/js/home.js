const botaoEnviar = document.querySelector('#download-button');
const loadingDiv = document.querySelector('.loading');
const errorDiv = document.querySelector('.error');
const successDiv = document.querySelector('.success');

botaoEnviar.addEventListener('click', async (event) => {
    event.preventDefault();
    const url = document.querySelector('#article-url').value;

    try {
        loadingDiv.style.display = 'block'; // show loading div

        // return an epub file
        const response = await fetch(`/download?url=${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to download the file. Please try again later.');
        }

        // get the article file name from the response headers
        const filename = response.headers.get('Content-Disposition').split('filename=')[1];

        // download the file automatically
        const blob = await response.blob();
        const urlBlob = URL.createObjectURL(blob);
        const a = document.createElement('a'); // Create the 'a' element
        a.href = urlBlob;
        a.download = filename; // set the article file name
        a.click(); // Call the 'click' function on the 'a' element
        URL.revokeObjectURL(urlBlob);

        // clear the input
        document.querySelector('#article-url').value = '';

        successDiv.style.display = 'block'; // show success div
        errorDiv.style.display = 'none'; // hide error div
    } catch (error) {
        errorDiv.style.display = 'block'; // show error div
        successDiv.style.display = 'none'; // hide success div
        alert("Failed to download the file. Please try again later. Error: " + error.message);
    } finally {
        loadingDiv.style.display = 'none'; // hide loading div
    }
});
