self.addEventListener("message",(msg)=>{
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage(msg.data);
        });
    });
});