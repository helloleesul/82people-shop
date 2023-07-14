import { main } from '/Common/index.js';
await main();

const urlStr = window.location.href;
const orderId = new URL(urlStr).searchParams.get('orderId');
console.log(orderId);
// 브라우저 쿠키에 토큰이 있는지 확인
function checkJWTTokenInCookie() {
	const cookies = document.cookie.split(';'); // 모든 쿠키 가져오기
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// JWT 토큰 쿠키인지 확인
		if (cookie.startsWith('userToken=')) {
			const jwtToken = cookie.split('=')[1]; // JWT 토큰 값 가져오기
			// 토큰이 유효한지 여부 확인
			if (jwtToken) {
				return jwtToken; // 유효한 토큰이 존재함
			}
		}
	}
}

// 확인된 토큰을 부르는 이름
const hasToken = checkJWTTokenInCookie();

if (hasToken) {
	console.log('JWT 토큰이 쿠키에 존재합니다.');

	const base64Url = hasToken.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);
	const tokenData = JSON.parse(jsonPayload);
	document.querySelector('#user-name').innerText = tokenData.name;
} else {
	console.log('JWT 토큰이 쿠키에 존재하지 않습니다.');
}

const orderNumber = document.querySelector('#order-number');
const orderStatus = document.querySelector('#order-status');
const orderDate = document.querySelector('.date');
const orderAddress = document.querySelector('#address');
const orderPhone = document.querySelector('#phone');
const orderRecipient = document.querySelector('#recipient');
const orderShippingRequest = document.querySelector('#shippingRequest');
const orderShippingPrice = document.querySelector('#shippingPrice');
const orderTotalPrice = document.querySelector('#totalPrice');
const orderOrderPrice = document.querySelector('#orderPrice');
const products = document.querySelector('.products-list');
const shippingStatusOption = document.querySelector('#shippingStatus');

// 확인된 토큰으로 서버에게 요청해서 현재 유저 정보받아오기
fetch(`/api/admin/${orderId}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		Authorization: hasToken,
	},
})
	.then(res => res.json())
	.then(({ orderDetails }) => {
		// 받아온 정보들을 위에 태그값에 넣어서 화면에 보여주기
		console.log(orderDetails);
		orderNumber.innerHTML = orderDetails._id;
		orderRecipient.innerHTML = orderDetails.addressInformation.recipient;
		orderShippingRequest.innerHTML =
			orderDetails.addressInformation.shippingRequest;
		orderPhone.innerHTML = orderDetails.addressInformation.phone;
		orderAddress.innerHTML = orderDetails.addressInformation.address;
		orderShippingPrice.innerHTML = `${Number(
			orderDetails.totalPrice.shippingPrice
		).toLocaleString()} 원`;
		orderTotalPrice.innerHTML = `${Number(
			orderDetails.totalPrice.totalProductsPrice
		).toLocaleString()} 원`;
		orderOrderPrice.innerHTML = `${(
			Number(orderDetails.totalPrice.totalProductsPrice) +
			Number(orderDetails.totalPrice.shippingPrice)
		).toLocaleString()} 원`;
		orderDate.innerText = new Date(orderDetails.createdAt).toLocaleString();
		orderStatus.innerText = orderDetails.shippingStatus;
		// orderDetails.purchase
		products.innerHTML = orderDetails.purchase.map(getProducts).join('');

		if (orderDetails.shippingStatus === '상품 준비 중') {
			shippingStatusOption.options[0].setAttribute('selected', true);
		}
		if (orderDetails.shippingStatus === '배송 중') {
			shippingStatusOption.options[1].setAttribute('selected', true);
		}
		if (orderDetails.shippingStatus === '배송 완료') {
			shippingStatusOption.options[2].setAttribute('selected', true);
		}
	});

const getProducts = newProducts => {
	return `
		<li>
		<div class="thumbnail">
		<img src="${newProducts.imageURL}" />
		<span class="title">${newProducts.title}</span>
	</div>
	<div><span>${
		newProducts.orderAmount
	}</span> 개 &#215; <span>${newProducts.price.toLocaleString()}</span>원</div>
	<div>${(newProducts.price * newProducts.orderAmount).toLocaleString()}원</div>
	</li>
		`;
};

shippingStatusOption.addEventListener('change', e => {
	console.log('shippingStatusOption', e.target.value);
	fetch(`/api/admin/${orderId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: hasToken,
		},
		body: JSON.stringify({
			shippingStatus: e.target.value,
		}),
	})
		.then(res => {
			console.log('shippingStatusOption', res);
			window.location.reload();
			return res.json();
		})
		.catch(err => console.log('err', err));
});
