import * as THREE from "three";

const DEGREE = (Math.PI / 180);

class App {
	constructor(){

		return this.initialize();

	}
	initialize(){

		this.renderer = new THREE.WebGLRenderer({
			precision: "highp",
			antialias: true
		});

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		document.body.appendChild(this.renderer.domElement);

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
		this.camera.position.set(0, 0, 10);

		var texture = new THREE.TextureLoader().load("/assets/images/default.jpg");

		this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 1), new THREE.MeshPhongMaterial({
			map: texture
		}));
		this.cube.position.set(-1, 0, 0);
		this.cube.castShadow = true;
		this.scene.add(this.cube);

		var textureCube = new THREE.CubeTextureLoader().setPath("/assets/images/").load(["pos-x.png", "neg-x.png", "pos-y.png", "neg-y.png", "pos-z.png" ,"neg-z.png"]);

		this.cubeReflection = new THREE.Mesh(new THREE.SphereGeometry(1, 15, 15), new THREE.ShaderMaterial({
			uniforms: {
				texture: {
					type: "t",
					value: textureCube
				}
			},
			vertexShader: require("../shaders/environement.vert.glsl"),
			fragmentShader: require("../shaders/environement.frag.glsl")
		}));
		this.cubeReflection.position.set(1, 0, 0);
		this.cubeReflection.castShadow = true;
		this.scene.add(this.cubeReflection);

		this.plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 1, 1), new THREE.MeshPhongMaterial());
		this.plane.rotation.x = -(90 * DEGREE);
		this.plane.position.set(0, -2, 0);
		this.plane.receiveShadow = true;
		this.scene.add(this.plane);

		this.light = new THREE.PointLight(0xFFFFFF, 1, 100);
		this.light.position.set(0, 10, 10);
		this.light.castShadow = true;
		this.light.shadow.mapSize.width = this.light.shadow.mapSize.height = 2048;
		this.scene.add(this.light);

		window.addEventListener("resize", this.resize.bind(this), false);

		this.resize();
		this.start();

		return this;

	}
	resize(){

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.ratio = (this.width / this.height);

		this.camera.aspect = this.ratio;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.width, this.height);
		this.renderer.setPixelRatio(window.devicePixelRatio);

		return this;

	}
	start(){

		this.animationFrame = window.requestAnimationFrame(this.update.bind(this));

	}
	stop(){

		window.cancelAnimationFrame(this.animationFrame);

	}
	update( now ){

		this.animationFrame = window.requestAnimationFrame(this.update.bind(this));

		this.cube.rotation.x += (DEGREE * 1);
		this.cube.rotation.y += (DEGREE * 1);
		this.cube.rotation.z += (DEGREE * 1);

		this.cubeReflection.rotation.x += (DEGREE * 1);
		this.cubeReflection.rotation.y += (DEGREE * 1);
		this.cubeReflection.rotation.z += (DEGREE * 1);

		this.render();

	}
	render(){

		this.renderer.render(this.scene, this.camera);

	}
};

document.addEventListener("DOMContentLoaded", function(){

	new App();

}, false);