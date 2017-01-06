var Task = require("./Task.js");

module.exports = class TaskManager {
	constructor( tasks, options ){

		return this.initialize(tasks, options);

	}
	initialize( tasks, options ){

		this.tasks = new Object();

		this.options = new Object();

		for( let task of tasks ){

			this.addTask(task.name, task);

		};

		for( let optionName in options ){

			if( options.hasOwnProperty(optionName) ){

				this.addOption(optionName, options[optionName]);

			};

		};

		return this;

	}
	addTask( name, task ){

		if( this.tasks[name] == undefined && task instanceof Task ){

			this.tasks[name] = task;

		}
		else {

			throw new Error("The task ${name} already exists or is of the wrong type.");

		};

		return this;

	}
	addOption( name, value = null ){

		if( this.options[name] == undefined ){

			this.options[name] = value;
			
		}
		else {

			throw new Error("The option ${name} is already defined.");

		};

		return this;

	}
	setOption( name, value ){

		if( this.options[name] != undefined ){

			this.options[name] = value;

		}
		else {

			throw new Error("The option ${name} is not defined.");

		};

		return this;

	}
	getTask( name ){

		if( this.tasks[name] instanceof Task ){

			return this.tasks[name];

		}
		else {

			throw new Error("The task ${name} is not defined.");

		};

	}
	getOption( name ){

		if( this.options[name] != undefined ){

			return this.options[name];

		}
		else {

			throw new Error("The option ${name} is not defined.");

		};

	}
	each( callback ){

		if( callback instanceof Function ){

			for( let taskName in this.tasks ){

				let task = this.tasks[taskName];

				if( this.tasks.hasOwnProperty(taskName) && task instanceof Task ){

					callback(task);

				};

			};

		};

		return this;

	}
}