import { main } from '/Common/index.js';
await main();

function checkJWTTokenInCookie() {
	const cookies = document.cookie.split(';'); // 모든 쿠키 가져오기
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// 	JWT 토큰 쿠키인지 확인
		if (cookie.startsWith('uesetToken=')) {
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
const menuBar = document.querySelector('.myparty-menubar');
console.log(menuBar);

if (hasToken) {
	console.log('JWT 토큰이 쿠키에 존재합니다.');
	menuBar.style.display = 'block';
} else {
	console.log('JWT 토큰이 쿠키에 존재하지 않습니다.');
	menuBar.style.display = 'hidden';
}

fetch('/api/orders/history', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		Authorization: hasToken,
	},
})
	.then(res => {
		console.log('res', res);
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
