import {load} from './node_modules/js-yaml/dist/js-yaml.mjs';

import {element_start,element_end} from './elements.js';

export function parse(layout_string){
    let layout = load(layout_string);
    return _parse(layout);
}


function setStart(element,props){
    let tag = "";
    if(element_start.hasOwnProperty(element)){
        tag = element_start[element];
        tag += _parse(props);
        console.log("tag2 : ",tag);
    }
    else {
        if(element == "input"){
            tag = "<input ";
            if(props){
                let p = props.split(" ");
                if(p.length > 0){
                    tag+= "id='"+p[0]+"' ";
                }
                if(p.length > 1){
                    tag += "type='"+p[1]+"' ";
                }
                if(p.length > 2){
                    tag += "value='"+p[2]+"' ";
                }
                tag += ">";
            }
        }
        else
        if(element == "label"){
            tag = "<label ";
            if(props){
                let p = props.split(" ");                
                if(p.length > 1){
                    tag += "class='"+p[1]+"' ";
                }                
                tag += ">";
                if(p.length > 0){
                    tag+= p[0];
                }
            }
        }
        else {
            tag = "<" + element + ">";
            tag += _parse(props);
            console.log("tag : ",tag);
        }
    }
    return tag;
}


function setEnd(element){
    let tag = "";
    if(element_end.hasOwnProperty(element)){
        tag = element_end[element];        
    }
    else {
        if(element == "input"){
        }
        else {
            tag = "</" + element + ">";
        }
    }
    return tag;
}



function _parse(layout) {    
    let result = "";
    if (typeof layout != "object") {
        return layout;
    } 
    if(Array.isArray(layout)){        
        for(let i=0;i<layout.length;i++) {
            result += _parse(layout[i]);
        }} else {
        for(let key in layout) {            
            result += setStart(key,layout[key]);
            result += setEnd(key);
        }
    }    
    return result;
}