function $(id) {
    return document.getElementById(id);
}

function sync(color) {

    color = color || kolor(input.value);

    formats.forEach(function(format) {
        outputs[format].value = color ? color[format]() : '-';
    });
    if (color) {
        bg.style.backgroundColor = color.rgba().css();

        var skipColor;
        var hsla = color.hsla();
        if (hsla.l() > 0.5 || hsla.a() < 0.5) {
            skipColor = kolor('#000').fadeOut(0.8);
        } else {
            skipColor = kolor('#fff').fadeOut(0.8);
        }
        skip.style.color = skipColor.rgba().css();
        readme.style.backgroundColor = color.fadeOut(color.rgba().a() * 0.7).rgba().css();
    }
};

kolor.config('cssPrecision', 2);

var converter = $('converter');
var bg = $('bg');
var skip = $('skip');
var readme = $('readme');
var input = $('exp');
var action = $('action');
var menu = $('menu');
var param = $('param');
var go = $('go');

var formats = ['rgb', 'hsv', 'hsl', 'hwb', 'hex'];
var outputs = {};
var actionType = 'fadeIn';
var actionParam = {
    spin: '30',
    lighten: '0.1',
    darken: '0.1',
    fadeIn: '0.1',
    fadeOut: '0.1'
};

formats.forEach(function(format) {
    outputs[format] = $(format);
});

input.onfocus = function () { this.select(); };
input.oninput = function () {
    clearTimeout(autoPlay);
    sync();
};
sync();

action.onclick = function () {
    menu.classList.add('active');
};

menu.onclick = function (e) {
    var target = e.target;
    if (target.classList.contains('menu-item')) {
        menu.classList.remove('active');
        actionType = target.innerHTML;
        action.innerHTML = action.dataset.type = actionType;
        param.value = actionParam[actionType];
    }
};

go.onclick = function () {
    color = kolor(input.value);
    var mod = color[action.dataset.type](parseFloat(param.value));
    input.value = mod.toString();
    clearTimeout(autoPlay);
    sync(mod);
};

setTimeout(function() {
    bg.style.webkitTransition = skip.style.webkitTransition = readme.style.webkitTransition = 'all 1s';
    bg.style.transition = skip.style.transition = readme.style.transition = 'all 1s';
}, 0);

var cases = [
    'rebeccapurple',
    'rgb(255, 170, 0)',
    'rgba(64, 128, 255, 0.8)',
    'hsv(54, 40%, 95%)',
    'hsl(114, 75%, 75%)',
    'hwb(orangish(10%) red, 50%, 0%, 0.7)',
    '#8cf0e6'
];
var ticks = Math.floor(Math.random() * cases.length);
function nextCase() {
    input.value = cases[(++ticks) % cases.length];
    sync();
}
var autoPlay = setInterval(nextCase, 5000);
nextCase();