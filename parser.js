var fs = require('fs');
var arr = fs.readFileSync(process.argv[2]).toString();
var Per_Instruction=arr.split('\n');
var Per_Instruction_Array=[];
var stack=[];//store
var Level_one=[];


Per_Instruction.forEach(function(index){
	Instruction_obj = new _obj(index.split(' ')[0],index.split(' ')[1],index.split(' ')[2],index.split(' ')[3])
	Per_Instruction_Array.push(Instruction_obj);
});
Per_Instruction_Array.forEach(function(index){
	if(index.functionname!=="unseen::unseen"){
		if(index.action==="CALL"){
			if(stack_null(stack.length)==true){
				Level_one.push(index);
			};
			stack.push(index);
	}
		else{
			stack.pop(index);
			if(stack_null(stack.length)==true){
				Level_one.push(index);
			};
		}
	}

});

fs.writeFileSync(process.argv[3],JSON.stringify(Level_one));
// console.log()
function stack_null(length){
	if(length==0){
		return true;
	}
	else{
		return false;
	}
}

function _obj(index,pid,action,functionname){
	this.index=index;
	this.pid=pid;
	this.action=action;
	this.functionname=functionname;
}