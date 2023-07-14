import { main } from '/Common/index.js';
await main();

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
	return false; // 토큰이 없거나 유효하지 않음
}

// 확인된 토큰을 부르는 이름
const hasToken = checkJWTTokenInCookie();
if (hasToken) {
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
	const userEmail = document.querySelector('.member-email2');
	document.querySelector('#user-name').innerText = tokenData.name;
	userEmail.innerText = tokenData.email;
}

const inputElement = document.querySelector('.input');
const checkButton = document.querySelector('.check-button');

// 확인 버튼 클릭 이벤트 처리
checkButton.addEventListener('click', () => {
	console.log('clickCheck');
	const withdrawalStatement = inputElement.value.trim();

	if (withdrawalStatement === '파티피플에서 탈퇴하겠습니다.') {
		// 탈퇴 신청 처리
		processWithdrawal();
	} else {
		// 알림창 표시
		alert('입력한 문구가 일치하지 않습니다.');
	}
});

// 회원 탈퇴 처리
function processWithdrawal() {
	fetch('/api/users', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: hasToken,
		},
	})
		.then(response => {
			console.log('response', response);
			if (response.ok) {
				alert('탈퇴신청이 정상적으로 처리되었습니다.');
				// 로그인 토큰 삭제
				document.cookie =
					'userToken' +
					'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';

				window.location.href = '/';
				return response.json();
			} else {
				throw new Error('탈퇴 요청에 실패했습니다.');
			}
		})
		.catch(err => {
			alert(err);
		});
}
