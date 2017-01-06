class App {
	constructor(){

		return this.initialize();

	}
	initialize(){

		var message = "Hello boilerplate world!";

		var paragraph = document.querySelector("p");

		paragraph.textContent = message;

		console.log(message);

		return this;

	}
};

document.addEventListener("DOMContentLoaded", function(){

	new App();

}, false);