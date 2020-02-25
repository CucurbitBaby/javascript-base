/*

{
	'mark jhansson': [
		{ name: 'waffle iron',  price: '80', quantity: '2' },
		{ name: 'blender',      price: '200', quantity: '1' },
		{ name: 'knife',        price: '10', quantity: '3' }
	],
	'Nikita Smith': [
		{ name: 'waffle iron',  price: '80', quantity: '1' },
		{ name: 'knife',        price: '10', quantity: '2' },
		{ name: 'pot',          price: '20', quantity: '3' }
	]
}

*/
var fs = require('fs')

var output = fs.readFileSync('data.txt', 'utf-8')
.trim()
.split('\r\n')
.map(line => line.split('\t'))
.reduce((customers, line) => {, 
  customers[line[0]] = customers[line[0]] || []
  customers[line[0]].push({
  	name: line[1],
  	price: line[2],
  	quantity: line[3]
  })
  return customers
}, {})

console.log('output', JSON.stringify(output, null ,2))


/*

	output mark johansson   waffle iron     80      2
	mark johansson  blender 200     1
	mark johansson  knife   10      4
	Nikita Smith    waffle iron     80      1
	Nikita Smith    knife   10      2
	Nikita Smith    pot     20      3

*/

// .trim()从终端看不出什么区别

// .split('\r\n')
/*

	output [
	  'mark johansson\twaffle iron\t80\t2',
	  'mark johansson\tblender\t200\t1',
	  'mark johansson\tknife\t10\t4',
	  'Nikita Smith\twaffle iron\t80\t1',
	  'Nikita Smith\tknife\t10\t2',
	  'Nikita Smith\tpot \t20\t3'
	]

*/

// .map(line => line.split('\t'))
/*

	output [
		[ 'mark johansson  waffle iron 80  2' ],
		[ 'mark johansson  blender 200 1' ],
		[ 'mark johansson  knife 10  4' ],
		[ 'Nikita Smith  waffle iron 80  1' ],
		[ 'Nikita Smith  knife 10  2' ],
		[ 'Nikita Smith  pot  20 3' ]
	]

*/

// console.log('hello line', line)  line[0]的精髓
/*
	hello line [ 'mark johansson', 'waffle iron', '80', '2' ]
	hello line [ 'mark johansson', 'blender', '200', '1' ]
	hello line [ 'mark johansson', 'knife', '10', '4' ]
	hello line [ 'Nikita Smith', 'waffle iron', '80', '1' ]
	hello line [ 'Nikita Smith', 'knife', '10', '2' ]
	hello line [ 'Nikita Smith', 'pot ', '20', '3' ]

*/

// customers[line[0]] = []
// output { 'mark johansson': [], 'Nikita Smith': [] }