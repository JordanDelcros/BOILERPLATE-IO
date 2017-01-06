import EventHandler from "../tools/event-handler.js";

export default {
	name: "Home",
	template: require("../../views/routes/home.html"),
	data(){

		return {
			message: "Hello vue boilerplate world!"
		};

	},
	created(){

		EventHandler.$on("resize", this.resize);

	},
	methods: {
		resize(){

			console.log("The $root told me to launch resize");

		}
	}
};
