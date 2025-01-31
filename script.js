function handleUserInput() {
    const userInput = document.getElementById('user-input').value.trim();
    const chatOutput = document.getElementById('chat-output');

    if (userInput === "") {
        chatOutput.innerHTML += `<div class="bot-message">Please enter a word to search.</div>`;
        return;
    }

    chatOutput.innerHTML += `<div class="user-message">${userInput}</div>`;
    fetchWikipediaData(userInput);
    document.getElementById('user-input').value = '';
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function fetchWikipediaData(query) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const chatOutput = document.getElementById('chat-output');
            if (data.extract) {
                let imageHTML = data.thumbnail ? `<img src="${data.thumbnail.source}" alt="${query}" style="max-width: 100%; height: auto; border-radius: 5px;">` : '';
                chatOutput.innerHTML += `<div class="bot-message">${imageHTML}<p>${data.extract}</p></div>`;
            } else {
                chatOutput.innerHTML += `<div class="bot-message">Sorry, I couldn't find on that word "${query}".</div>`;
            }
            chatOutput.scrollTop = chatOutput.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
            const chatOutput = document.getElementById('chat-output');
            chatOutput.innerHTML += `<div class="bot-message">There was an error retrieving the information.</div>`;
            chatOutput.scrollTop = chatOutput.scrollHeight;
        });
}
