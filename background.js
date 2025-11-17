chrome.runtime.onMessage.addListener((message) => {
    switch (message.type) {
        case 'copy':
            console.log("Copied: " + message.text);
            chrome.storage.local.get('history', (result) => {
                const history = result.history || [];
                history.unshift(message.text);
                if (history.length > 7) history.pop();
                chrome.storage.local.set({ history: history });
            })
            break;

        case 'injected':
            console.log("Script injected");
            break;
        default: 
            break;
    }
});