var fs = require('fs')
var readLine = require('readline');
var Promise = require('bluebird');

var rl = readLine.createInterface({
	input:process.stdin,
	output:process.stdout
});

rl.prompt();
var lines = 'first';

rl.on("line",function(line){
	if(lines==='first') {
		lines = +line;
		if(!lines) process.exit();
	}
	else{
		checkLine(line).then((longestWord)=>{
			console.log(longestWord);
			if(lines-- === 1) process.exit();
		});
	}
})

var checkLine = exports.checkLine = (letters)=>{
	var re = new RegExp('[^'+letters+']');
	var filteredWords = [];
	return getWords().then(
		function(words){
			filteredWords = words.filter(function(word){
				return !re.test(word);
			})
			var longestWord = '';
			filteredWords.forEach(function(el){
				if(longestWord.length < el.length){
					longestWord = el;
				}
			})
			return longestWord;
		}
	)
}

var getWords = exports.getWords = ()=>{
	return new Promise(function(resolve,reject){
		fs.readFile('enable1.txt',function(err,data){
			if(err) reject(err);
			else resolve(data.toString().split('\r\n'));
		})
	})
}
