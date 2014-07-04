var fs = require('fs');
if(process.argv[2].search("flog")===-1){
	console.log("the input file should be .flog!");
	process.exit();
}
var arr = fs.readFileSync(process.argv[2]).toString();
var Per_Instruction=arr.split('\n'); //each instruction split into four part
var Per_Instruction_Array=[];
var stack=[];//store
var Level_one=[];

/*judge if user enter some extra option, if not, execute default leve1 one*/
if(process.execArgv.length!==0){ 
	console.log("execute lv2");
	lv2();
}
else{
	default_lv1();
}

function default_lv1(){
	Per_Instruction.forEach(function(index){
		Instruction_obj = new _obj(index.split(' ')[0],index.split(' ')[1],index.split(' ')[2],index.split(' ')[3])
		Per_Instruction_Array.push(Instruction_obj);
	});
	Per_Instruction_Array.forEach(function(index){
		if(index.name!=="unseen::unseen"){
			if(index.action==="CALL"){
				if(stack.length===0){
					Level_one.push(index);
				};
				stack.push(index);
			}
			else{
				stack.pop(index);
				if(stack.length===0){
					Level_one.push(index);
				};
			}
		}

	});
	fs.writeFileSync(process.argv[3]+".json",JSON.stringify(Level_one));
}
function lv2(){
	var temp=0;
	default_lv1();
	Per_Instruction_Array[0].child="";
	Per_Instruction_Array.forEach(function(index,val){
		if(index.name!=="unseen::unseen"){
			console.log(val);
			console.log(index);
			if(index.action==="CALL"){
				if(stack.length===0){
					Level_one.push(index);
				};
				else if(stack.length===1){
					Level_one[temp].child.push();
				}
				stack.push(index);
			}
			else{
				stack.pop(index);
				if(stack.length===0){
					Level_one.push(index);
				};
				
			}

		}
	});
	// console.log(Per_Instruction_Array[0]);
	// Per_Instruction.forEach(function(index){
	// 	Instruction_obj = new _obj(index.split(' ')[0],index.split(' ')[1],index.split(' ')[2],index.split(' ')[3])
	// 	Instruction_obj.chlid="";
	// 	Per_Instruction_Array.push(Instruction_obj);
	// });
	// Per_Instruction_Array.forEach(function(index){
	// 	if(index.name!=="unseen::unseen"){
	// 		if(index.action==="CALL"){
	// 			if(stack.length===0){
	// 				Level_one.push(index);
	// 			};
	// 			stack.push(index);
	// 		}
	// 		else{
	// 			stack.pop(index);
	// 			if(stack.length===0){
	// 				Level_one.push(index);
	// 			};
	// 		}
	// 	}

	// });
	// fs.writeFileSync(process.argv[3]+".json",JSON.stringify(Level_one));
}

function _obj(index,pid,action,functionname){
	this.index=index;
	this.pid=pid;
	this.action=action;
	this.name=functionname;
}