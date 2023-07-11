fetch('/api/orders/history', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		Authorization: '',
	},
})
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.log(err));
