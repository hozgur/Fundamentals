// main.js

window.addEventListener('load', function() {
    console.log('window loaded');
  var content = document.getElementById('content');
  // load htmlfile and insert into content div
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'content1.html', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            content.innerHTML = xhr.responseText;
        }
    };
    xhr.send(null);
    
});