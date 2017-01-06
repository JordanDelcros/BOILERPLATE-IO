import Vue from "vue";
import Router from "vue-router";
import EventHandler from "./tools/event-handler.js";

Vue.use(Router);

import HomeView from "./views/home-view.js";

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

		console.info("Try to resize me to test the event bus.");

		window.addEventListener("resize", this.resize, false);

	},
	methods: {
		resize(){

			EventHandler.$emit("resize");

		}
	}
})

document.addEventListener("DOMContentLoaded", function(){

	view.$mount("#App");

}, false);