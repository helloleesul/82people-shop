import { main } from '/Common/index.js';
await main();

const getOrders = newOrders => {
	return `
	<li>
	<article>
		<div class="info">
			<div>
				<span class="date">${new Date(newOrders.createdAt).toLocaleString()}</span>
				<span class="status">${newOrders.shippingStatus}</span>
			</div>
			<a
			href="/admin/orderId/?orderId=${newOrders._id}"
			class="detail-btn"
			>주문 상세보기 ></a>
		</div>
		<ul class="products-list">
	<li>
		<div class="thumbnail">
			<img src="${newOrders.purchase[0].imageURL[0]}" />
			<span class="title">${newOrders.purchase[0].title}</span>
		</div>
		<div><span>${
			newOrders.purchase[0].orderAmount
		}</span> 개 &#215; <span>${newOrders.purchase[0].price.toLocaleString()}</span>원</div>
	</li>	
	</ul>
	</article>
</li>
	`;
};

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

const itemsList = document.querySelector('.history-list');

// 확인된 토큰으로 서버에게 요청해서 현재 유저 정보받아오기
fetch(`/api/admin`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		Authorization: hasToken,
	},
})
	.then(res => res.json())
	.then(json => {
		// 받아온 정보들을 위에 태그값에 넣어서 화면에 보여주기
		const { orders } = json;

		if (orders.length <= 0) {
			itemsList.innerHTML =
				'<li style="padding:20px">주문 내역이 없습니다.</li>';
		} else {
			itemsList.innerHTML = orders.map(getOrders).reverse();
		}
	});
