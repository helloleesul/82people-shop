import { main } from '/Common/index.js';
await main();

function checkJWTTokenInCookie() {
	const cookies = document.cookie.split(';'); // 모든 쿠키 가져오기
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// 	JWT 토큰 쿠키인지 확인
		if (cookie.startsWith('userToken=')) {
			const jwtToken = cookie.split('=')[1]; // JWT 토큰 값 가져오기
			// 토큰이 유효한지 여부 확인
			if (jwtToken) {
				return jwtToken; // 유효한 토큰이 존재함
			}
		}
	}
}

// 👉 개발 시작 코드

// 쿠키에서 JWT 토큰 확인
const hasToken = checkJWTTokenInCookie();

// 비회원 파라미터 정보
const urlStr = window.location.href;
const orderId = new URL(urlStr).searchParams.get('orderId');
// console.log(orderId);

// 비회원 주문번호 노출 요소
const guestModeEl = document.querySelector('#guest-mode');
// 회원 이름
const userName = document.querySelector('#user-name');

if (hasToken) {
	console.log('JWT 토큰이 쿠키에 존재합니다.');
	guestModeEl.innerText = '';
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
	userName.innerHTML = `<strong style="font-weight:700">${tokenData.name}</strong> 님의`;
} else {
	console.log('JWT 토큰이 쿠키에 존재하지 않습니다.');
	userName.innerHTML = '';
	guestModeEl.innerHTML = `주문번호 <label for="order-id" id="order-id-label">${orderId}</label><input id="order-id"  />와 비밀번호를
    기억해주세요!`;
	const orderIdInput = document.querySelector('#order-id');
	const orderIdCopy = document.querySelector('#order-id-label');
	orderIdCopy.addEventListener('click', () => {
		orderIdInput.value = orderId;
		orderIdInput.select();
		document.execCommand('copy');
		alert('주문번호가 복사되었습니다!');
	});
}

const orderHistoryBtn = document.querySelector('.order-history-btn');
if (hasToken) {
	orderHistoryBtn.setAttribute('href', `/myPage/orders`);
} else {
	orderHistoryBtn.setAttribute(
		'href',
		`/guest/orders/history/?orderId=${orderId}`
	);
}
