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
      //vec4 value = texture2D(texture1,uv);
      vec4 value = texelFetch(texture1, ivec2(gl_FragCoord.xy), 0);

      //if(gl_FragCoord.x < 1.0)
      {
          {
            //  fragColor = vec4(mod(iTime,1.0),0.0,0.0,1.0);
          }
          
      }
      //else
      {
          float pos = texelFetch(texture1, ivec2(0,gl_FragCoord.y), 0).r;
          //float pos = 0.0;
          fragColor = texelFetch(texture1, ivec2(mod(gl_FragCoord.x+1.0,iResolution.x),gl_FragCoord.y), 0);
      }
      
      //if( fragCoord.y > 500.0)
        // value = val * value;
      // if( mod(fragCoord.y, 5.0) > 4.0)
      //   value = 0.9 * value + 0.1 * random(uv+ iTime);
      

      //fragColor = value;
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }