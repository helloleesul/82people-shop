fetch('/api/orders/history', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		Authorization: '',
	},
})
	.then(res => {
		console.log(res);
		if (res.ok) {
			return res.json();
		} else {
			throw new Error('로그인한 회원만 사용 가능합니다.');
		}
	})
	.catch(err => {
		//redirect
		console.log(err);
	})
	.then(json => console.log(json))
	.catch(err => console.log(err));
