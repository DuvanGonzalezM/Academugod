var sun = document.getElementById('sun');
var body = document.getElementsByTagName('body');

sun.onmousedown = function(event) {
    sun.style.position = 'absolute';
    sun.style.zIndex = 1000;

    document.body.append(sun);

    function moveAt(pageX, pageY) {
        sun.style.left = pageX - sun.offsetWidth / 2 + 'px';
        sun.style.top = pageY - sun.offsetHeight / 2 + 'px';
        const distanciaX = pageX - 200;
        const distanciaY = pageY - 200;

        var calculo =  Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
        const valorNormalizado = Number((200/Math.round(calculo)));
        if(calculo >= 250){
            body[0].style.opacity = valorNormalizado;
        }else{
            body[0].style.opacity = 1;
        }
    }

    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    sun.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        sun.onmouseup = null;
    };
}

sun.ondragstart = function() {
    return false;
};