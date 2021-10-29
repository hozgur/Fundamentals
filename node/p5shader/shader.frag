#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 1.0-sin(u_time*15.0)*0.5;
    vec4 color1 = vec4(st.x,0.0, 0.0, 1.0);
    
    gl_FragColor = color1;
}
