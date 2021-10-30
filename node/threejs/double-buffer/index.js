import * as THREE from './three.module.js';
import { dialog } from './node_modules/@hozgur/easy-ui/index.js';

const width = 800;
const height = 600;

const dlg = new dialog();

window.dlg = dlg;

const layout = `
col
    row  c_dark
        label threejs_Shader_Test

    canvas id=threejs_placeholder style=width:${width}px;height:${height}px;
`;

let theShader;

function loadFile(path) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

let fragShader1 = "";
let fragShader2 = "";
let first = true;
let texture = null;
window.onload = function () {    
    dlg.init(layout, "myapp");

    loadFile('shader1.frag').then(shaderText => {
        fragShader1 = shaderText;
        loadFile('shader2.frag').then(shaderText => {
            fragShader2 = shaderText;
            new THREE.TextureLoader().load('./ben.jpg' , (data) => {texture = data; main();});
        });
    });    
};




function main() {
  const canvas = document.getElementById('threejs_placeholder');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.autoClearColor = false;

  const camera = new THREE.OrthographicCamera(
    -1, // left
     1, // right
     1, // top
    -1, // bottom
    -1, // near,
     1, // far
  );

  const plane = new THREE.PlaneGeometry(2, 2);
  const rtWidth = width;
  const rtHeight = height;
  const bufferTexture1 = new THREE.WebGLRenderTarget(rtWidth, rtHeight);
  const bufferTexture2 = new THREE.WebGLRenderTarget(rtWidth, rtHeight);

  const bufferScene = new THREE.Scene();

  const uniforms1 = {
    iTime: { value: 0 },
    iResolution:  { value: new THREE.Vector3() },
    texture1: { type: "t", value: null }
  };

  const material1 = new THREE.ShaderMaterial({        
    fragmentShader: fragShader1,
    uniforms: uniforms1,    
  });

  bufferScene.add(new THREE.Mesh(plane, material1));
  const scene = new THREE.Scene();


  const uniforms2 = {
    iTime: { value: 0 },
    iResolution:  { value: new THREE.Vector3() },
    texture1: { type: "t", value: null }
  };

  const material2 = new THREE.ShaderMaterial({
        fragmentShader: fragShader2,
        uniforms: uniforms2,        
    });

  scene.add(new THREE.Mesh(plane, material2));

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;  // convert to seconds
    
    const canvas = renderer.domElement;
    uniforms1.iResolution.value.set(width, height, 1);
    uniforms1.iTime.value = time;
    if(first == true && texture) {
        uniforms1.texture1 =  { type: "t", value: texture };        
        first = false;
    }        
    else {
        uniforms1.texture1 =  { type: "t", value: bufferTexture2.texture };
    }
    
    renderer.setRenderTarget(bufferTexture1);
    renderer.render(bufferScene, camera);
    renderer.setRenderTarget(bufferTexture2);
    uniforms1.texture1 =  { type: "t", value: bufferTexture1.texture };
    renderer.render(bufferScene, camera);
    renderer.setRenderTarget(null);
    resizeRendererToDisplaySize(renderer);
    uniforms2.iResolution.value.set(canvas.width, canvas.height, 1);
    uniforms2.iTime.value = time;
    uniforms2.texture1 =  { type: "t", value: bufferTexture2.texture };
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
