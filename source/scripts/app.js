import Vue from "vue";
import Router from "vue-router";
import EventHandler from "./tools/event-handler.js";

Vue.use(Router);

import HomeView from "./views/home-view.js";

import * as THREE from "three";

var router = new Router({
	mode: "history",
	base: "/",
	routes: [
		{
			path: "/",
			component: HomeView
		}
	]
});

var view = new Vue({
	router: router,
	created(){

		this.renderer = new THREE.WebGLRenderer({
			precision: "highp",
			antialias: true
		});

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
		this.camera.position.set(0, 0, 10);

		window.addEventListener("resize", this.resize.bind(this), false);

		this.resize();
		this.start();

		return this;

	},
	mounted(){

		this.$el.appendChild(this.renderer.domElement);

	},
	methods: {
		resize(){

			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.ratio = (this.width / this.height);

			this.camera.aspect = this.ratio;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(this.width, this.height);
			this.renderer.setPixelRatio(window.devicePixelRatio);

			EventHandler.$emit("resize");

			return this;

		},
		start(){

			this.animationFrame = window.requestAnimationFrame(this.update.bind(this));

		},
		stop(){

			window.cancelAnimationFrame(this.animationFrame);

		},
		update( now ){

			this.animationFrame = window.requestAnimationFrame(this.update.bind(this));

			EventHandler.$emit("update");

			this.render();

		},
		render(){

			this.renderer.render(this.scene, this.camera);

		}
	}
})

document.addEventListener("DOMContentLoaded", function(){

	view.$mount("#App");

}, false);