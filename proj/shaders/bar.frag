#ifdef GL_ES
precision highp float;
#endif


uniform float percentageDelivered;

varying vec4 coords;

void main() {
    if(coords.x < (-0.5 + percentageDelivered)){
	    gl_FragColor.r = 0.5 - coords.x;
        gl_FragColor.g = 0.5 + coords.x;
        gl_FragColor.ba = vec2(0.0, 1.0);
    }
    else{
        gl_FragColor.rgb = vec3(0.5, 0.5, 0.5);
        gl_FragColor.a = 1.0;
    }
}