class Command {

	constructor(cmd){
		this.cmd = cmd;
	}
	output() {
		console.log(this.cmd);
	}

}

let test = new Command('Hello');
test.output();