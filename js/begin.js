export function begin () {
    let time;
    let faces = document.getElementById("faces");
    window.onload = start;
    window.onmousedown = cancel;
    window.ontouchstart = cancel;

    function start() {
        faces.classList.add("begin");
        faces.insertAdjacentHTML("afterbegin", '<span id="tmp"><img src="../img/click.gif"> <br/> Click on the screen</span>');
    }

    function cancel() {
        faces.classList.remove("begin");
        document.getElementById("tmp") ? document.getElementById("tmp").remove() : null;
    }
};
