// varying vec2 vUv;
varying vec3 cameraToVertex;
varying vec3 worldNormal;

vec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {

	return normalize((vec4(normal, 0.0) * matrix ).xyz);

}

void main() {

	// vUv = uv;

	vec3 transformed = vec3(position);

	vec3 objectNormal = vec3(normal);

	vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);

	vec3 transformedNormal = (normalMatrix * objectNormal);

	cameraToVertex = normalize(worldPosition.xyz - cameraPosition);

	worldNormal = inverseTransformDirection(transformedNormal, viewMatrix);

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}