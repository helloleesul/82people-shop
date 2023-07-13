import { main } from '/Common/index.js';
await main();

// 브라우저 쿠키에 토큰이 있는지 확인
function checkJWTTokenInCookie() {
	const cookies = document.cookie.split(';'); // 모든 쿠키 가져오기
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// JWT 토큰 쿠키인지 확인
		if (cookie.startsWith('uesetToken=')) {
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
// console.log(hasToken);

// 인풋 태그들
const receiverNameInput = document.querySelector('#receiver-name');
const receiverEmailInput = document.querySelector('#receiver-email');
const receiverPasswordInput = document.querySelector('#receiver-password');
const receiverAddressInput = document.querySelector('#receiver-address');
// 회원정보수정하는 버튼
const modifyBotton = document.querySelector('.modify-botton');

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
		receiverNameInput.value = json.userInformation.name;
		receiverEmailInput.value = json.userInformation.email;
		receiverPasswordInput.value = json.userInformation.password;
		receiverAddressInput.value = json.userInformation.addressInformation;
		// console.log(json.userInformation);
	});

// 회원정보수정 버튼을 클릭했을 떄
modifyBotton.addEventListener('click', () => {
	// 확인된 토큰으로 서버에게 수정 요청보내기
	fetch('/api/users', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: hasToken,
		},
		body: JSON.stringify({
			email: receiverEmailInput.value,
			password: receiverPasswordInput.value,
			address: '',
		}),
	})
		.then(res => res.json())
		.catch(err => alert(err))
		.then(json => {
			// console.log(json);
			alert(json.message);
		})
		.catch(err => alert(err));
});
