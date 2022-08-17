let caps = document.querySelector('[data-key="20"]')
let text = [];
let capslock = false;

function getKey(event) {
    let location = event.location;
    let selector;
    if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
        selector = ['[data-key="' + event.keyCode + '-R"]']
    } else {
        selector = [
            '[data-key="' + event.keyCode + '"]',
            '[data-char="' + encodeURIComponent(String.fromCharCode(event.keyCode)) + '"]'
        ]
    }
    return document.querySelector(selector);
}

function outputLetter(event) {
    let textarea = document.querySelector('.text');
    let answer;
    let letter = event.target.getAttribute('data-char');
    let number = String.fromCharCode(event.target.getAttribute('data-key'));

    typeof letter === 'string' ? answer = letter : answer = number;
    !capslock ? text.push(answer.toLowerCase()) : text.push(answer.toUpperCase());
    textarea.textContent = text.join('')
}

document.body.addEventListener('keydown', function (event) {
    getKey(event).setAttribute('data-pressed', 'on');
});

document.body.addEventListener('keyup', function (event) {
    getKey(event) && getKey(event).removeAttribute('data-pressed');
});

caps.addEventListener('click', () => {
    !capslock ? capslock = true : capslock = false
});

document.body.addEventListener('click', function (event) {
    outputLetter(event);
});