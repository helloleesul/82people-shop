import { main } from '/Common/index.js';
await main();

const testValue = [
	{
		_id: 1,
		title: 'title1',
		imageURL:
			'https://partyhae.com/web/product/big/202209/98d6274f8937871c917a6d547d0351b1.jpg',
		orderAmount: 10,
		price: 10000,
		shippingStatus: '배송 중',
	},
	{
		_id: 2,
		title: 'title2',
		imageURL:
			'https://partyhae.com/web/product/big/202209/98d6274f8937871c917a6d547d0351b1.jpg',
		orderAmount: 10,
		price: 10000,
		shippingStatus: '상품 준비 중',
	},
	{
		_id: 3,
		title: 'title3',
		imageURL:
			'https://partyhae.com/web/product/big/202209/98d6274f8937871c917a6d547d0351b1.jpg',
		orderAmount: 10,
		price: 10000,
		shippingStatus: '배송 중',
	},
	{
		_id: 4,
		title: 'title4',
		imageURL:
			'https://partyhae.com/web/product/big/202209/98d6274f8937871c917a6d547d0351b1.jpg',
		orderAmount: 10,
		price: 10000,
		shippingStatus: '배송 완료',
	},
];
const getOrders = newOrders => {
	// ${new Date(newOrders.createdAt).toLocaleString()}
	// newOrders._id
	// const shippingStat = ['상품 준비 중', '배송 중', '배송 완료'];
	return `
	<li>
	<article>
		<div class="info">
			<div>
				<span class="date">2023-01-01</span>
				<span class="status">${newOrders.shippingStatus}</span>
			</div>
			<select name="${newOrders._id}">
			<option value = '상품 준비 중' ${
				newOrders.shippingStatus === '상품 준비 중' ? 'selected' : ''
			}>상품 준비 중</option>
			<option value = '배송 중' ${
				newOrders.shippingStatus === '배송 중' ? 'selected' : ''
			}>배송 중</option>
			<option value = '배송 완료' ${
				newOrders.shippingStatus === '배송 완료' ? 'selected' : ''
			}>배송 완료</option>
			</select>
			
		</div>
		<ul class="products-list">
	<li>
		<div class="thumbnail">
			<img src="${newOrders.imageURL}" />
			<span class="title">${newOrders.title}</span>
		</div>
		<div><span>${
			newOrders.orderAmount
		}</span> 개 &#215; <span>${newOrders.price.toLocaleString()}</span>원</div>
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
// console.log(hasToken);

const userName = document.querySelector('#user-name');
const userRole = document.querySelector('.user-role');
const itemsList = document.querySelector('.history-list');

// 확인된 토큰으로 서버에게 요청해서 현재 유저 정보받아오기
fetch('/api/users/myPage', {
	method: 'GET',
	headers: {
		Authorization: hasToken,
	},
})
	.then(res => res.json())
	.then(json => {
		// 받아온 정보들을 위에 태그값에 넣어서 화면에 보여주기
		console.log('json', json);
		const { name, role } = json.userInformation;

		userName.innerText = name;
		userRole.innerText = role;

		console.log(json.userInformation);
	});
if (false) {
	itemsList.innerHTML = '<li style="padding:20px">주문 내역이 없습니다.</li>';
} else {
	itemsList.innerHTML = testValue.map(getOrders);
}
