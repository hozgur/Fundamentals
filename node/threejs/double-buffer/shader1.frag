 #include <common>

  uniform vec3 iResolution;
  uniform float iTime;
  uniform sampler2D texture1;
 
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      // Normalized pixel coordinates (from 0 to 1)
      vec2 uv = fragCoord/iResolution.xy;
      vec4 value = texture2D(texture1,uv);
      if( mod(fragCoord.y, 2.0) > 1.0)
        value = 0.9 * value + 0.1 * random(uv+ iTime);
      

      fragColor = value;
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }