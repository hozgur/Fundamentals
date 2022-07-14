 #include <common>

  uniform vec3 iResolution;
  uniform float iTime;
  //varying vec2 v_uv;
  uniform sampler2D texture1;
  // By iq: https://www.shadertoy.com/user/iq  
  // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      // Normalized pixel coordinates (from 0 to 1)
      vec2 uv = fragCoord/iResolution.xy;
      vec4 mapTexel = texture2D( texture1, uv.xy );
      
      // Output to screen
      fragColor = mapTexel;
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }