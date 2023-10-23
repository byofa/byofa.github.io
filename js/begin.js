export function begin () {
    let time;
    let faces = document.getElementById("faces");
    window.onload = start;
    document.onmousedown = cancel;
    document.ontouchstart = cancel;

    function start() {
        console.log("click")
        faces.classList.add("begin");
        faces.insertAdjacentHTML("afterbegin", '<span id="tmp"><img src="../img/click.gif"> <br/> Click on the screen</span>');
    }

    function cancel() {
        faces.classList.remove("begin");
        document.getElementById("tmp") ? document.getElementById("tmp").remove() : null;
    }
};
