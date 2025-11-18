setTimeout(() => {
    chrome.runtime.sendMessage({type: 'injected'});
}, 500);

document.addEventListener('copy', () => {
    const text = document.getSelection().toString();
    chrome.runtime.sendMessage({type: 'copy', text: text});
});
