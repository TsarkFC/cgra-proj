#ifdef GL_ES
precision highp float;
#endif


attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;


void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord;

	
	//vTextureCoord.x -= mod(timeFactor * 0.01, 1.0);
	vec4 filterer = texture2D(uSampler2, mod(vTextureCoord, 1.0));
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition , 1.0);
	gl_Position.y += filterer.y * 8.0;
}



