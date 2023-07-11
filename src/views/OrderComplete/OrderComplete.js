// checkJWTTokenInCookie를 공통 js로 만들어서 header,footer 불러올때 함께 사용하면 좋을 듯 함
// 쿠키에서 JWT 토큰 확인
function checkJWTTokenInCookie() {
	const cookies = document.cookie.split(';'); // 모든 쿠키 가져오기
	// console.log(cookies);
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// JWT 토큰 쿠키인지 확인
		if (cookie.startsWith('jwt=')) {
			const jwtToken = cookie.split('=')[1]; // JWT 토큰 값 가져오기
			// 토큰이 유효한지 여부 확인
			if (validateJWTToken(jwtToken)) {
				return true; // 유효한 토큰이 존재함
			}
		}
	}
	return false; // 토큰이 없거나 유효하지 않음
}

// JWT 토큰 유효성 검사 로직
function validateJWTToken(jwtToken) {
	// 예를 들어, 토큰의 시그니처 검증, 만료 여부 확인 등을 수행
	// 유효한 토큰이면 true, 그렇지 않으면 false 반환
	// 실제 구현은 JWT 라이브러리를 사용하거나 직접 로직을 작성
	return true; // 임시로 항상 유효한 토큰으로 가정
}

// 테스트용 JWT 토큰
const jwtToken = 'your-jwt-token';

// 👉 개발 시작 코드

// 비회원 파라미터 정보
const url = window.location.search;
const orderId = url.split('=')[1];
// console.log(orderId);

// 쿠키에서 JWT 토큰 확인
const hasToken = checkJWTTokenInCookie();
// 비회원 주문번호 노출 요소
const guestModeEl = document.querySelector('#guest-mode');
// 회원 이름
// 회원 이름을 토큰에서 가져올지 말지 고민중
const userName = document.querySelector('#user-name');

if (hasToken) {
	console.log('JWT 토큰이 쿠키에 존재합니다.');
	guestModeEl.innerText = '';
} else {
	console.log('JWT 토큰이 쿠키에 존재하지 않습니다.');
	guestModeEl.innerHTML = `주문번호 <button type="button" id="order-id">${orderId}</button> / 비밀번호를
    기억해주세요!`;
	const orderIdCopy = document.querySelector('#order-id');
	orderIdCopy.addEventListener('click', async () => {
		try {
			await navigator.clipboard.writeText(orderId);
			alert(`주문번호: ${orderId}`);
		} catch (err) {
			console.log('복사실패', err);
		}
	});
}
// 비회원이고 주문하지않고 주문완료 페이지로 들어왔을때 홈으로 내쫓기
if (!orderId && !hasToken) {
	alert('잘못된 접근입니다!');
	window.location.href = '/src/views/Home/Home.html';
}
