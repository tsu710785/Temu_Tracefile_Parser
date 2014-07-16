var fs = require('graceful-fs');



if(process.argv[2].search("flog")===-1){
	console.log("the input file should be .flog!");
	process.exit();
}

var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream(process.argv[2]);
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
var stack_level=0;
var remove="";
var filename=process.argv[2].substring(0, process.argv[2].length-5);

fs.exists(filename+"_alllevel.html", function (exists) {

	if(exists===true){
		fs.writeFile(filename+"_alllevel.html",remove,function (err) {
		    if (err) return console.log(err);
		});
	}
});
fs.exists(filename+"_level1.html", function (exists) {

	if(exists===true){
		fs.writeFile(filename+"_level1.html",remove,function (err) {
	     	if (err) return console.log(err);
	  	});
	}
});
console.log("wait for processing... please wait for a while");
rl.on('line', function(line) {
  // process line here

  if(line.split(' ')[3].split('::')[1]!=="unseen"){
  		if(line.split(' ')[2]==="CALL"){
  			fs.appendFileSync((process.argv[2].substring(0, process.argv[2].length-5))+"_alllevel.html", "<div style='margin-left:20px'>ENTER " + (stack_level+1)+ " : " +line.split(' ')[3].split('::')[1]);
  			
  			if(stack_level===0){
  				fs.appendFileSync((process.argv[2].substring(0, process.argv[2].length-5))+"_level1.html",line.split(' ')[3].split('::')[1]+"<br>");
  			}
  			stack_level = stack_level + 1;
		}
		else{
			stack_level = stack_level - 1;

			fs.appendFileSync((process.argv[2].substring(0, process.argv[2].length-5))+"_alllevel.html"," =>EXIT " + (stack_level+1)+ " : " +line.split(' ')[3].split('::')[1]+"</div>");
		}
  		
  }


});

rl.on('close', function() {
	console.log("finish!");
  // do something on finish here
});




