import { main } from '/Common/index.js';
await main();

const orderId = document.querySelector('#orderId');
const orderPassword = document.querySelector('#orderPassword');
const orderButton = document.querySelector('#orderButton');
// const orderId = 도큐멘트에서 주문번호 인풋 가져와서,

// 비회원조회 클릭하면은 window.location.href = '/guest/orders/history/?orderId=${orderId.value}'

orderButton.addEventListener('click', e => {
	e.preventDefault();

	fetch(`/api/orders/history/${orderId.value}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password: orderPassword.value,
		}),
	})
		.then(res => {
			console.log(res);
			if (res.ok) {
				return res.json();
				// 로그인 페이지 이동
			} else {
				throw new Error('조회 실패');
			}
		})
		.catch(err => {
			alert(err);
		})
		.then(({ orderDetail }) => {
			console.log('value', orderDetail._id);

			// window.location.href = `http://localhost:3000/guest/orders/history=${orderDetail._id}`;
			window.location.href = `/guest/orders/history/?orderId=${orderDetail._id}`;
		})
		.catch(err => console.log(err));
});
