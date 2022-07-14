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
      // Time varying pixel color
      vec3 col = mapTexel.xyz + 0.5*cos(iTime+uv.xyx+vec3(0,0,0));
      //vec3 col = mapTexel.xyz;//vec3(0,1.0,0);

      // Output to screen
      fragColor = vec4(col,1.0);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }