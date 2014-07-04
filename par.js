var fs = require('fs');
var arr = fs.readFileSync(process.argv[2]).toString();
var Per_Instruction=arr.split('\n');
var Per_Instruction_Array=[];
var stack=[];//store
var Level_one=[];
var html="<!DOCTYPE html><html><head><meta charset='UTF-8'><title>"
	    + process.argv[3]
	    + "</title><style></style></head><body><div><a href='#level1'>#level1</a> <a href='#showall'>#showall</a></div>";

Per_Instruction.forEach(function(index){
	Instruction_obj = new _obj(index.split(' ')[0],index.split(' ')[1],index.split(' ')[2],index.split(' ')[3].split('::')[0],index.split(' ')[3].split('::')[1])
	Per_Instruction_Array.push(Instruction_obj);
});
Per_Instruction_Array.forEach(function(index){
	if(index.functionname!=="unseen"){
		if(index.action==="CALL"){
			html= html + "<div style='margin-left:50px'>ENTER " + (stack.length+1)+ " : " +index.functionname;
			index.level=stack.length+1;
			stack.push(index);
	}
		else{
			html= html +" =>EXIT " +index.functionname+"</div>";
			stack.pop(index);
			index.level=stack.length+1;
		}
	}
});

fs.writeFileSync(process.argv[3],html+"</body></html>");

function _obj(index,pid,action,dllname,functionname){
	this.index=index;
	this.pid=pid;
	this.action=action;
	this.dllname=dllname;
	this.functionname=functionname;
}