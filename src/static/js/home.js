const botaoEnviar = document.querySelector('#download-button');

botaoEnviar.addEventListener('click', async (event) => {
    event.preventDefault();
    const url = document.querySelector('#article-url').value;

    try {
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
    } catch (error) {
        // Display a pop-up error
        alert("Failed to download the file. Please try again later. Error: " + error.message);
    }
});
