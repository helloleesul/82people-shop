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
const PRODUCT_KEY = 'cartProducts';

// 쿠키에서 JWT 토큰 확인
const hasToken = checkJWTTokenInCookie();
// console.log(hasToken);

// 비회원 비밀번호 입력 요소
const guestModeEl = document.querySelector('#guest-mode');
// 회원 기본 배송지 설정하기
const addressInfo = document.querySelector('#cart-form fieldset');
let addAddressBtn = `<button type="button" id="add-address" class="order-btn" style="width:100%;padding:10px;">기본 배송지 설정</button>`;

if (hasToken) {
	console.log('JWT 토큰이 쿠키에 존재합니다.');
	guestModeEl.innerText = '';
	addressInfo.innerHTML += addAddressBtn;
} else {
	console.log('JWT 토큰이 쿠키에 존재하지 않습니다.');
	guestModeEl.innerHTML = `<p>비회원 주문 시 주문내역 조회용 비밀번호를 설정해야합니다.</p>
    <section>
        <label class="require" for="guestPwd">비밀번호</label>
        <input
            type="password"
            id="guestPwd"
            name="orderForm"
        />
    </section>`;
}

// 로컬스토리지 장바구니 데이터
let products = JSON.parse(localStorage.getItem(PRODUCT_KEY));
// 상품 리스트 요소
const itemsList = document.querySelector('.cart-items');
let items = '';

// 로컬스토리지 장바구니 데이터 유무 확인
if (products?.length > 0) {
	console.log('장바구니에 상품 있음');
	products.map(getProducts);
} else {
	console.log('장바구니에 상품 없음');
	emptyProducts();
}

// 장바구니 비었을 때
function emptyProducts() {
	alert('장바구니가 비었습니다!');
	window.location.href = '/cart';
}

// 장바구니 상품들 화면 그려주기
function getProducts(newProducts) {
	// console.log(newProducts);
	const newItem = `<li id="${newProducts.id}">
        <article>
            <div class="thumbnail">
                <img src="${newProducts.imageUrl}" alt="${newProducts.title}" />
                <span>${newProducts.title}</span>
            </div>
            <div>
                <span>${newProducts.amount}</span> 개
                &#215; <span>${newProducts.price.toLocaleString()}</span>원
            </div>
            <div><span>${newProducts.totalPrice.toLocaleString()}</span>원</div>
        </article>
    </li>`;
	items += newItem;
	itemsList.innerHTML = items;
}

const address = document.querySelector('#address');
const detailAddress = document.querySelector('#detail-address');
let addressValue = '';

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
			address.value = `(${data.zonecode}) ${addr} ${addressValue}`;
			// 커서를 상세주소 필드로 이동한다.
			detailAddress.focus();
		},
	}).open();
}

address.addEventListener('click', addressApi);

// 선택된 상품금액
const productsPrice = document.querySelector('#products-price');
// 배송비
const shippingPrice = document.querySelector('#shipping-price');
let shippingPriceNumber = 0;
// 결제예정금액
const orderPrice = document.querySelector('#order-price');
let totalPrice = 0;

// 상품금액, 배송비, 결제예정금액
if (products.length === 0) {
	totalPrice = 0;
	shippingPriceNumber = 0;
} else {
	shippingPriceNumber = 3000;
}
products.map(product => {
	totalPrice += product.totalPrice;
});

productsPrice.innerText = `${totalPrice.toLocaleString()} 원`;
shippingPrice.innerText = `${shippingPriceNumber.toLocaleString()} 원`;
orderPrice.innerText = `${(
	totalPrice + shippingPriceNumber
).toLocaleString()} 원`;

// 주문 정보
const cartForm = document.querySelector('#cart-form');
const recipient = document.querySelector('#recipient');
const phone = document.querySelector('#phone');
const shippingRequest = document.querySelector('#shippingRequest');
const guestPwd = document.querySelector('#guestPwd');

// 연락처 자동 '-' 설정
function formattedValue(num) {
	const result = num.replace(
		/(\d{3})(\d{0,4})(\d{0,4})/,
		function (_, first, second, third) {
			let formattedNumber = '';
			if (first) {
				formattedNumber += first;
			}
			if (second) {
				formattedNumber += '-' + second;
			}
			if (third) {
				formattedNumber += '-' + third;
			}
			return formattedNumber;
		}
	);
	return result;
}

phone.addEventListener('input', e => {
	const phoneValue = e.target.value;
	const onlyNumbers = phoneValue.replace(/[^0-9]/g, '');
	let resultPhone = formattedValue(onlyNumbers);

	e.target.value = resultPhone;
});

if (hasToken) {
	// 기본배송지 유무
	fetch('/api/orders/checkAddress', {
		method: 'GET',
		headers: {
			Authorization: hasToken,
		},
	})
		.then(res => res.json())
		.catch(err => alert(err))
		.then(json => {
			// console.log(json.userAddress[0].addressInformation);
			if (json.userAddress[0].addressInformation.length !== 0) {
				recipient.value = json.userAddress[0].addressInformation.recipient;
				phone.value = formattedValue(
					json.userAddress[0].addressInformation.phone
				);
				address.value = json.userAddress[0].addressInformation.address;
				detailAddress.value =
					json.userAddress[0].addressInformation.detailAddress;
				shippingRequest.value =
					json.userAddress[0].addressInformation.shippingRequest;
			}
		});

	// 기본배송지 설정
	const addAddress = document.querySelector('#add-address');
	addAddress.addEventListener('click', () => {
		const onlyPhoneNumbers = phone.value.replace(/[^0-9]/g, '');
		if (
			recipient.value !== '' &&
			phone.value !== '' &&
			address.value !== '' &&
			detailAddress.value !== ''
		) {
			fetch('/api/orders/addAddress', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: hasToken,
				},
				body: JSON.stringify({
					addressInformation: {
						recipient: recipient.value,
						phone: onlyPhoneNumbers,
						address: address.value,
						detailAddress: detailAddress.value,
						shippingRequest: shippingRequest.value,
					},
				}),
			})
				.then(res => res.json())
				.catch(err => alert(err))
				.then(json => alert(json.message))
				.catch(err => alert(err));
		} else {
			alert('필수입력을 적어주세요!');
		}
	});
}

// 결제하기 버튼 클릭
function orderBtn(e) {
	e.preventDefault();
	const onlyPhoneNumbers = phone.value.replace(/[^0-9]/g, '');
	// console.log('수령인', recipient.value);
	// console.log('연락처', onlyPhoneNumbers);
	// console.log('배송지', address.value + detailAddress.value);
	// console.log('배송시 요청사항', shippingRequest.value);
	// console.log('비회원 비밀번호', guestPwd?.value);

	const orderProducts = [];
	products.map(product => {
		const {
			id: productId,
			title,
			amount: orderAmount,
			price,
			imageUrl: imageURL,
		} = product;
		orderProducts.push({ productId, title, orderAmount, price, imageURL });
	});
	// console.log(orderProducts);

	if (hasToken) {
		console.log('회원이시네요.');

		if (
			recipient.value !== '' &&
			phone.value !== '' &&
			address.value !== '' &&
			detailAddress.value !== ''
		) {
			// 회원 주문 POST 요청 전송
			fetch('/api/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: hasToken,
				},
				body: JSON.stringify({
					purchase: orderProducts,
					recipient: recipient.value,
					phone: onlyPhoneNumbers,
					address: address.value,
					detailAddress: detailAddress.value,
					shippingRequest: shippingRequest.value,
					shippingPrice: shippingPriceNumber,
				}),
			})
				.then(res => {
					if (res.ok) {
						alert('회원주문 완료');
						window.location.href = '/orders/complete';
						localStorage.removeItem(PRODUCT_KEY);
					} else {
						throw new Error('회원주문 실패');
					}
				})
				.catch(err => console.log(err));
			// res, json부분 dev에서 확인 다시 필요함! res 에러 컨트롤 작업 필요함.. 볼수없어서 이렇게.. 했어요
		} else {
			alert('필수입력을 적어주세요!');
		}
	} else {
		console.log('비회원이시네요.');

		if (
			recipient.value !== '' &&
			phone.value !== '' &&
			address.value !== '' &&
			detailAddress.value !== '' &&
			guestPwd.value !== ''
		) {
			// 비회원 주문 POST 요청 전송
			fetch('/api/orders/guest', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					purchase: orderProducts,
					recipient: recipient.value,
					phone: onlyPhoneNumbers,
					password: guestPwd.value,
					address: address.value,
					detailAddress: detailAddress.value,
					shippingRequest: shippingRequest.value,
					shippingPrice: shippingPriceNumber,
				}),
			})
				.then(res => res.json())
				.then(json => {
					console.log(json);
					window.location.href = '/orders/complete?orderId=' + json.orderId._id;
					localStorage.removeItem(PRODUCT_KEY);
				})
				.catch(err => console.log(err));
			// res, json부분 dev에서 확인 다시 필요함! res 에러 컨트롤 작업 필요함.. 볼수없어서 이렇게.. 했어요
		} else {
			alert('필수입력을 적어주세요!');
		}
	}
}
cartForm.addEventListener('submit', orderBtn);
