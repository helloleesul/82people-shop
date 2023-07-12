// 비회원 파라미터 정보
const urlStr = window.location.href;
const orderId = new URL(urlStr).searchParams.get('orderId'); //undefined
console.log(orderId);

fetch(`/api/orders/history/${orderId}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then(res => {
		console.log(res);
		return res.json();
	})
	.then(json => console.log(json))
	.catch(err => console.log(err));