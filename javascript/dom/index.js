window.onload = test;

function test() {
    r.value = 20;
    b.onclick = () => {
        r.value = 30;
    }
}