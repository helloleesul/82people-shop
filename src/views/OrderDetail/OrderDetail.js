import { main } from '/Common/index.js';
await main();

const urlStr = window.location.href;
const orderId = new URL(urlStr).searchParams.get('orderId');
console.log(orderId);

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

const hasToken = checkJWTTokenInCookie();
const menuBar = document.querySelector('.myparty-menubar');
console.log(menuBar);

if (hasToken) {
	console.log('JWT 토큰이 쿠키에 존재합니다.');
	menuBar.style.display = 'block';
} else {
	console.log('JWT 토큰이 쿠키에 존재하지 않습니다.');
	menuBar.style.display = 'none';
}

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
