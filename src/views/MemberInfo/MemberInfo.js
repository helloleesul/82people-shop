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

// 인풋 태그들
const receiverNameInput = document.querySelector('#receiver-name');
const receiverEmailInput = document.querySelector('#receiver-email');
const receiverPasswordInput = document.querySelector('#receiver-password');
const updateAddress = document.querySelector('#updateAddress');
const searchAddress = document.querySelector('#searchAddress');
const defaultAddress = document.querySelector('#address');
const defaultDetailAddress = document.querySelector('#detail-address');
// 회원정보수정하는 버튼
const modifyBotton = document.querySelector('.modify-botton');

const userName = document.querySelector('#user-name');

const defaultRecipient = document.querySelector('#recipient');
const defaultPhone = document.querySelector('#phone');
const defaultShippingRequest = document.querySelector('#shippingRequest');

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
		const { address, detailAddress, recipient, shippingRequest, phone } =
			json.userInformation.addressInformation;
		receiverNameInput.value = name;
		receiverEmailInput.value = email;
		receiverPasswordInput.value = password;
		if (role === 'admin') {
			window.location.href = '/';
		}

		if (json.userInformation.addressInformation.length !== 0) {
			defaultAddress.value = address;
			defaultDetailAddress.value = detailAddress;
			defaultRecipient.value = recipient;
			defaultPhone.value = phone;
			defaultShippingRequest.value = shippingRequest;
		}
		userName.innerText = json.userInformation.name;
		console.log(json.userInformation);
	});

let addressValue = '';
searchAddress.addEventListener('click', addressApi);
function addressApi() {
	new daum.Postcode({
		oncomplete: function (data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var addr = ''; // 주소 변수
			var extraAddr = ''; // 참고항목 변수

			//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') {
				// 사용자가 도로명 주소를 선택했을 경우
				addr = data.roadAddress;
			} else {
				// 사용자가 지번 주소를 선택했을 경우(J)
				addr = data.jibunAddress;
			}

			// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
			if (data.userSelectedType === 'R') {
				// 법정동명이 있을 경우 추가한다. (법정리는 제외)
				// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
				if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
					extraAddr += data.bname;
				}
				// 건물명이 있고, 공동주택일 경우 추가한다.
				if (data.buildingName !== '' && data.apartment === 'Y') {
					extraAddr +=
						extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
				}
				// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
				if (extraAddr !== '') {
					extraAddr = ' (' + extraAddr + ')';
				}
				// 조합된 참고항목을 해당 필드에 넣는다.
				addressValue = extraAddr;
			} else {
				addressValue = '';
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			defaultAddress.value = `(${data.zonecode}) ${addr} ${addressValue}`;
			// 커서를 상세주소 필드로 이동한다.
			defaultDetailAddress.focus();
		},
	}).open();
}

updateAddress.addEventListener('click', () => {
	fetch('/api/orders/addAddress', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: hasToken,
		},
		body: JSON.stringify({
			addressInformation: {
				recipient: defaultRecipient.value,
				phone: defaultPhone.value,
				address: defaultAddress.value,
				detailAddress: defaultDetailAddress.value,
				shippingRequest: defaultShippingRequest.value,
			},
		}),
	})
		.then(res => res.json())
		.catch(err => alert(err))
		.then(json => alert(json.message))
		.catch(err => alert(err));
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
