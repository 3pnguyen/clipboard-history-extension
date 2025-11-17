const notification = document.getElementById('notification');
const list = document.getElementById('history');

const MAX_CHARACTER_LENGTH = 50;

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('history', (result) => {
        const history = result.history || [];

        history.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            if (li.textContent.length > MAX_CHARACTER_LENGTH) {
                li.textContent = li.textContent.substring(0, MAX_CHARACTER_LENGTH) + '...';
            } else if (li.textContent.length === 0) {
                li.textContent = '...?';
            }

            const button = document.createElement('button');
            button.textContent = 'Copy';
            button.addEventListener('click', () => {
                navigator.clipboard.writeText(item);
                notification.textContent = 'Copied!';
                setTimeout(() => {
                    notification.textContent = '';
                }, 1000);
            });

            li.appendChild(button);
            list.appendChild(li);
        });
    });
});

document.getElementById('clear').addEventListener('click', () => {
    chrome.storage.local.set({ history: [] });
    const list = document.getElementById('history');
    list.innerHTML = '';
    notification.textContent = 'Cleared!';
    setTimeout(() => {
        notification.textContent = '';
    }, 1000);
});