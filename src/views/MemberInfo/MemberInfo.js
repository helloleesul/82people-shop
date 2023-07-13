import { main } from '/Common/index.js';
await main();

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

const hasToken = checkJWTTokenInCookie();
// console.log(hasToken);

const receiverNameInput = document.querySelector('#receiver-name');
const receiverEmailInput = document.querySelector('#receiver-email');
const receiverPasswordInput = document.querySelector('#receiver-password');
const receiverAddressInput = document.querySelector('#receiver-address');

const modifyBotton = document.querySelector('.modify-botton');

fetch('/api/users/myPage', {
	method: 'GET',
	headers: {
		Authorization: hasToken,
	},
})
	.then(res => res.json())
	.then(json => {
		receiverNameInput.value = json.userInformation.name;
		receiverEmailInput.value = json.userInformation.email;
		receiverPasswordInput.value = json.userInformation.password;
		receiverAddressInput.value = json.userInformation.addressInformation;
		// console.log(json.userInformation);
	});

modifyBotton.addEventListener('click', () => {
	console.log(receiverNameInput.value, receiverPasswordInput.value);
	fetch('/api/users/', {
		method: 'PATCH',
		headers: {
			Authorization: hasToken,
		},
		body: JSON.stringify({
			email: receiverNameInput.value,
			password: receiverPasswordInput.value,
			address: [],
		}),
	}).then(res => console.log(res));
});

// //회원 탈퇴로 이동
// const memberOut = document.querySelectorAll('.member-out');

// memberOut.forEach(data => {
// 	data.addEventListener('click', () => {
// 		window.location.href = '/memberDelete'; // 회원 탈퇴 페이지 URL로 이동
// 	});
// });

// const modifyButton = document.querySelectorAll('.modify-botton');

// modifyButton.addEventListener('click', () => {
// 	const newName = receiverNameInput.value;
// 	const newEmail = receiverEmailInput.value;
// 	const newPassword = receiverPasswordInput.value;
// 	const newAddress = receiverAddressInput.value;

// 	// 회원 정보 업데이트 API 호출
// 	Api.modifyButton(newName, newEmail, newPassword, newAddress)
// 		.then(response => {
// 			// 성공적으로 업데이트되었을 때 처리할 코드 작성
// 			console.log('회원 정보가 성공적으로 업데이트되었습니다.');
// 			// 예를 들어, 업데이트 성공 메시지를 표시하거나 다른 동작을 수행할 수 있습니다.
// 		})
// 		.catch(error => {
// 			// 업데이트 실패 시 처리할 코드 작성
// 			console.error('회원 정보 업데이트에 실패했습니다:', error);
// 			// 예를 들어, 실패 메시지를 표시하거나 오류 처리를 수행할 수 있습니다.
// 			// 초기값과 다를 경우 api 요청에 사용할 data 객체에 넣어줌
// 			if (newName !== userData.fullName) {
// 				data.fullName = newName;
// 			}

// 			if (newPassword !== userData.password) {
// 				data.password = newPassword;
// 			}
// 			if (isAddressChanged) {
// 				data.address = {
// 					postalCode: newPostalCode,
// 					address1: newAddress1,
// 					address2: newAddress2,
// 				};
// 			}

// 			if (newPhoneNumber && newPhoneNumber !== userData.phoneNumber) {
// 				data.phoneNumber = newPhoneNumber;
// 			}
// 		});
// });
