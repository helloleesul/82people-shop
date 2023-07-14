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
}

// 확인된 토큰을 부르는 이름
const hasToken = checkJWTTokenInCookie();
// console.log(hasToken);

const userName = document.querySelector('#user-name');
const userRole = document.querySelector('.user-role');

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
		const { name, email, password, role } = json.userInformation;

		userName.innerText = name;
		userRole.innerText = role;

		console.log(json.userInformation);
	});
