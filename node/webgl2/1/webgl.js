
let gl    = undefined;
let canvas= undefined;

function loadFile(path) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', path);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }

    function initWebGL(canvasID) {
        canvas = document.getElementById(canvasID);
        gl = canvas.getContext('webgl2');
        if (!gl) {
            alert('Unable to initialize WebGL. Your browser or machine may not support it.');
            return;
        }
    }

  export { loadFile, initWebGL };