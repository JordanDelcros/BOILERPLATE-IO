import * as THREE from "three";
import EventHandler from "../tools/event-handler.js";

const DEGREE = (Math.PI / 180);

export default {
	name: "Home",
	template: require("../../views/routes/home.html"),
	data(){

		return {
			message: "Hello vue boilerplate world!"
		};

	},
	created(){

		var texture = new THREE.TextureLoader().load("/assets/images/default.jpg");

		this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 1), new THREE.MeshPhongMaterial({
			map: texture
		}));
		this.cube.castShadow = true;
		this.$root.scene.add(this.cube);

		this.plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 1, 1), new THREE.MeshPhongMaterial());
		this.plane.rotation.x = -(90 * DEGREE);
		this.plane.position.set(0, -2, 0);
		this.plane.receiveShadow = true;
		this.$root.scene.add(this.plane);

		this.light = new THREE.PointLight(0xFFFFFF, 1, 100);
		this.light.position.set(0, 10, 10);
		this.light.castShadow = true;
		this.light.shadow.mapSize.width = this.light.shadow.mapSize.height = 2048;
		this.$root.scene.add(this.light);

		EventHandler.$on("resize", this.resize);
		EventHandler.$on("update", this.update);

	},
	methods: {
		resize(){

			console.log("The $root told me to launch resize");

		},
		update(){

			this.cube.rotation.x += (DEGREE * 1);
			this.cube.rotation.y += (DEGREE * 1);
			this.cube.rotation.z += (DEGREE * 1);

		}
	}
};
