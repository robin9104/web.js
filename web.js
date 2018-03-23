const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => res.send('Hello World!'))

var seq = 0
app.get('/update', function(req, res) {
	fs.appendFile('log.txt', JSON.stringify(req.query)+"\n", function (err) {
		if( err ) throw err
		console.log("%j",req.query)
		res.send("Got "+ String(seq++) +" "+ JSON.stringify(req.query))
	});	
})

app.get('/get', function(req,res) {
	var arr2=""	
	var arr = fs.readFileSync('log.txt').toString().split("\n")
	for(var i =  0 ; i < arr.length ; i++){
		arr2 = arr2 + arr[i]+"<br>" 
		console.log(arr[i])
	}
	res.send(arr2)	
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
