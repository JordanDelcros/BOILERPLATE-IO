uniform samplerCube texture;

// varying vec2 vUv;
varying vec3 cameraToVertex;
varying vec3 worldNormal;

void main() {

	vec3 reflection = reflect(cameraToVertex, worldNormal);

	vec4 outputColor = textureCube(texture, reflection);

	gl_FragColor = outputColor;

}
