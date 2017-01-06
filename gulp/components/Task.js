module.exports = class Task {
	constructor( name, options ){

		return this.initialize(name, options);

	}
	initialize( name, options = {} ){

		this
			.setName(name)
			.setSource(options.src || options.source)
			.setDestination(options.dst || options.destination)
			.setOutput(options.out || options.output)
			.setWatch((options.wth != undefined || options.wth === false ? options.wth : options.watch))
			.setReload(options.rld || options.reload);

		return this;

	}
	setName( name ){

		if( typeof name == "string" ){

			this.name = name;

		}
		else {

			throw new Error("name is undefined or of a wrong type.");

		};

		return this;

	}
	setSource( src ){

		if( typeof src == "string" ){

			this.src = src;

		}
		else {

			throw new Error("source (src) is undefined or of a wrong type.");

		};

		Object.defineProperty(this, "source", {
			get(){

				return this.src;

			},
			set( value ){

				this.setSource(value);

			}
		});

		return this;

	}
	setDestination( dst ){

		if( typeof dst == "string" ){

			this.dst = dst;

		}
		else {

			throw new Error("destination (dst) is undefined or of a wrong type.");

		};

		Object.defineProperty(this, "destination", {
			get(){

				return this.dst;

			},
			set( value ){

				this.setDestination(value);

			}
		});

		return this;

	}
	setOutput( out ){

		if( typeof out == "string" ){

			this.out = out;

		}
		else if( out != undefined ){

			throw new Error("output (out) is of a wrong type.");

		};

		Object.defineProperty(this, "output", {
			get(){

				return this.out;

			},
			set( value ){

				this.setOutput(value);

			}
		});

		return this;

	}
	setWatch( wth ){

		if( typeof wth == "string" || wth === false ){

			this.wth = wth;

		}
		else if( wth != undefined ){

			throw new Error("destination (wth) is of a wrong type.");

		};

		Object.defineProperty(this, "watch", {
			get(){

				return this.wth;

			},
			set( value ){

				this.setWatch(value);

			}
		});

		return this;

	}
	setReload( rld ){
		
		if( rld instanceof Array ){

			this.rld = rld;

		}
		else if( rld === undefined ){

			this.rld = [this.name];

		}
		else {

			throw new Error("reload (rld) is of a wrong type.");

		};

		Object.defineProperty(this, "reload", {
			get(){

				return this.rld;

			},
			set( value ){

				this.setReload(value);

			}
		});

		return this;

	}
};