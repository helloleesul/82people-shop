const urlStr = window.location.href;
const orderId = new URL(urlStr).searchParams.get('orderId');
console.log(orderId);

// 회원이 아닐경우 경로 변경해주고, 회원인데 searchParams값이 없으면 주문 내역으로 옮기기

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
