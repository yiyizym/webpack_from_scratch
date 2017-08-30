const app = {
    sayHello: _ => {
        let text = document.createElement('span');
        text.textContent = 'Hello!';
        document.querySelector('.app').appendChild(text);
        console.log(' hello !');
    }
}


module.exports = app;