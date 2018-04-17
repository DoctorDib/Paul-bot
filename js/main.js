/*
** file: js/main.js
** description: javascript code for "html/main.html" page
*/

function init_main () {
    $('html').hide().fadeIn('slow');
}

var setURL = function(url){
	function readStream(stream) {
    const encodedbodyparts = [];
    const decoder = new TextDecoder('utf-8');

	return stream
		.getReader()
		.read()
		.then(({ done, value }) => {
			console.log(done)
			// Gather the parts
			if (!done) {
				if (value) encodedbodyparts.push(value);
				return;
			}

			// Join the parts
			const encodedbody = new Uint8Array(
				encodedbodyparts.reduce((acc, v) => acc + v.length, 0)
			);
	  
			let position = 0;
			encodedbodyparts.forEach((part, index, array) => {
				if (index) {
					position += array[index - 1].length;
				}
				encodedbody.set(part, position);
			});
				
			const body = decoder.decode(encodedbody);
		  console.log(body);
			return Promise.resolve(body);
		});
	}

	fetch(document.getElementById('url').value)
	.then(function(response) {
		console.log(response.body)
		return readStream(response.body);
	}).then(function(data){
		console.log(data);
	});
}

//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_main);