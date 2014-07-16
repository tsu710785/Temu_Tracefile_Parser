var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
if(process.argv[2].search("flog")===-1){
	console.log("the input file should be .flog!");
	process.exit();
}

var arr = fs.readFileSync(process.argv[2]).toString();
var Per_Instruction=arr.split('\n');
var Per_Instruction_Array=[];
var stack=[];//store

var Level_one=[];
var Call_itself=[];

var html="<!DOCTYPE html><html><head><meta charset='UTF-8'><title>"
	    + process.argv[3]
	    + "</title><style></style></head><body><div id='top'><br><a href='#level1'>#level1</a> <a href='#showall'>#showall</a> <a href='#callitself'>#callitself</a></div><br><hr>";



var instream = fs.createReadStream(process.argv[2].toString());
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line) {
  // process line here
	 Per_Instruction.forEach(function(index){
		Instruction_obj ={};
		Instruction_obj.index=index.split(' ')[0];
		Instruction_obj.pid=index.split(' ')[1];
		Instruction_obj.action=index.split(' ')[2];
		Instruction_obj.dllname=index.split(' ')[3].split('::')[0];
		Instruction_obj.functionname=index.split(' ')[3].split('::')[1];
		Per_Instruction_Array.push(Instruction_obj);
	});
	html = html + "<div id='showall'><h2>showall</h2>";
	Per_Instruction_Array.forEach(function(index){
		if(index.functionname!=="unseen"){
			if(index.action==="CALL"){
				html= html + "<div style='margin-left:50px'>ENTER " + (stack.length+1)+ " : " +index.functionname;
				index.level=stack.length+1;
				if(stack.length===0){
						Level_one.push(index);
				};
				if(index.dllname === process.argv[2].replace("flog","exe")){
					Call_itself.push(index);

				};

				stack.push(index);
			}
			else{
				html= html +" =>EXIT " +index.functionname+"</div>";
				stack.pop(index);
				index.level=stack.length+1;
				if(stack.length===0){
						Level_one.push(index);
				};
				if(index.dllname === process.argv[2].replace("flog","exe")){
					Call_itself.push(index);

				};
			}
		}
	});

	for (var i = 0; i <= stack.length; i++) {
		html = html + "</div>";
	};

	html = html + "<br><a href='#top'>#top</a><hr>" + "<div id='level1'><h2>level1</h2>";
	Level_one.forEach(function(index){
		html = html + "<div>" + index.action + " " + index.dllname + " " + index.functionname + "</div>"
	});

	html = html + "</div><br><a href='#top'>#top</a><hr>" + "<div id='callitself'><h2>callitself</h2>";
	Call_itself.forEach(function(index){
		html = html + "<div>" + (stack.length+1)+ " : " + index.action + " " + index.functionname + "</div>";
	});

	html = html + "</div><br><a href='#top'>#top</a>";
});

rl.on('close', function() {
  // do something on finish here
  fs.writeFileSync(process.argv[3],html+"</body></html>");
});