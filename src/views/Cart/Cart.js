// 데이터 저장
// localStorage.setItem('key', 'value');
// 데이터 가져오기
// const existingData = localStorage.getItem('key');
// 데이터 추가
// const newData = 'new value';
// localStorage.setItem('key', existingData + newData);
// 데이터 삭제
// localStorage.removeItem('key');

// 현재 장바구니 기능 중 조회와 상품 수정부분만 구현했습니다.
// 해야할 기능: 총 가격조회, 전체삭제, 부분삭제

// 장바구니 개발용 더미 데이터 (id, 상품이름, 수량, 이미지주소, 가격, 수량계산된 가격)
const cartProducts = [
	{
		id: 1,
		title: '상품1',
		amount: 1,
		imageUrl: '/',
		price: 1000,
		totalPrice: 1000,
	},
	{
		id: 2,
		title: '상품2',
		amount: 1,
		imageUrl: '/',
		price: 2000,
		totalPrice: 2000,
	},
	{
		id: 3,
		title: '상품3',
		amount: 1,
		imageUrl: '/',
		price: 3000,
		totalPrice: 3000,
	},
];
localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

// 장바구니 상품 불러오기
const products = JSON.parse(localStorage.getItem('cartProducts'));
const itemsUl = document.querySelector('.cart-items > ul');

if (products?.length === 0 || products === null) {
	const emptyItems = document.createElement('li');
	emptyItems.innerText = '장바구니에 담으신 상품이 없습니다. 🥲';
	itemsUl.appendChild(emptyItems);
} else {
	products.map(product => {
		const newLi = document.createElement('li');
		const newItem = `<article>
		<div class="thumbnail">
			<input type="checkbox" id="${product.id}" name="cart-item-check" checked />
			<label for="${product.id}">
				<img src="${product.imageUrl}" alt="${product.title}" />
				${product.title}
			</label>
		</div>
		<div class="amount-btns">
			<button type="button" class="subtracting">-</button>
			<input
				type="number"
				class="amount"
				value="1"
				min="1"
			/>
			<button type="button" class="adding">+</button>
		</div>
		<div><span class="product-price">${product.totalPrice.toLocaleString()}</span>원</div>
	</article>
	<button type="button" class="delete-btn">삭제</button>`;
		newLi.innerHTML = newItem;
		itemsUl.appendChild(newLi);
	});
}

const allChecked = document.querySelector('#all-checked');
const itemsCheck = document.querySelectorAll('input[name=cart-item-check]');
const productsPrice = document.querySelector('#products-price');
const shippingPrice = document.querySelector('#shipping-price');
const orderPrice = document.querySelector('#order-price');

let shippingPriceNumber;

// 상품금액, 배송비, 결제예정금액 업데이트
const updateTotalPrice = () => {
	const checkFilter = [...itemsCheck].filter(item => item.checked);

	checkFilter.length !== itemsCheck.length
		? (allChecked.checked = false)
		: (allChecked.checked = true);

	// console.log(checkFilter);
	let totalPrice = 0;
	if (checkFilter.length === 0) {
		totalPrice = 0;
		shippingPriceNumber = 0;
	} else {
		shippingPriceNumber = 3000;
	}
	for (let i = 0; i < checkFilter.length; i++) {
		products.map(product => {
			if (product.id === Number(checkFilter[i].id)) {
				totalPrice += product.totalPrice;
			}
		});
	}
	productsPrice.innerText = `${totalPrice.toLocaleString()} 원`;
	shippingPrice.innerText = `${shippingPriceNumber.toLocaleString()} 원`;
	orderPrice.innerText = `${(
		totalPrice + shippingPriceNumber
	).toLocaleString()} 원`;
};

updateTotalPrice();

// 상품 전체선택
allChecked.addEventListener('click', () => {
	[...itemsCheck].map(item => {
		!allChecked.checked ? (item.checked = false) : (item.checked = true);
	});
	updateTotalPrice();
});
// 개별 선택 시 전체선택 인풋 제어
[...itemsCheck].map(item => {
	item.addEventListener('click', () => {
		updateTotalPrice();
	});
});

// 장바구니 상품 수량, 가격 변경
const cartItems = document.querySelectorAll('.cart-items > ul > li');

[...cartItems].map(item => {
	const amountInput = item.querySelector('input.amount');
	let amountValue = Number(amountInput.value);
	const addingAmount = item.querySelector('.adding');
	const subtractingAmount = item.querySelector('.subtracting');

	const itemCheck = item.querySelector('input[type=checkbox]');
	const itemPrice = item.querySelector('.product-price');

	const updateItem = () => {
		products.map(product => {
			if (product.id === Number(itemCheck.id)) {
				product.amount = Number(amountInput.value);
				product.totalPrice = product.price * product.amount;
				itemPrice.innerText = product.totalPrice.toLocaleString();
			}
		});
		localStorage.setItem('cartProducts', JSON.stringify(products));
	};

	// 수량 증가
	addingAmount.addEventListener('click', () => {
		amountValue += 1;
		amountInput.value = amountValue;
		updateItem();
		updateTotalPrice();
	});
	// 수량 감소
	subtractingAmount.addEventListener('click', () => {
		amountValue -= 1;
		if (amountInput.value < 2) {
			amountValue = 1;
			alert('최소 수량은 1개 입니다!');
		}
		amountInput.value = amountValue;
		updateItem();
		updateTotalPrice();
	});
	// 수량 직접 입력
	amountInput.addEventListener('change', e => {
		amountValue = Number(e.target.value);
		if (e.target.value < 2) {
			e.target.value = 1;
			alert('최소 수량은 1개 입니다!');
		}
		updateItem();
		updateTotalPrice();
	});
});

// // 상품 삭제 기능
// const deleteItem = item => {
// 	const deleteBtn = item.querySelector('.delete-btn');
// 	deleteBtn.addEventListener('click', () => {
// 		item.remove();
// 	});
// };

// [...cartItems].map(item => {
// 	deleteItem(item);

// 	const itemCheck = item.querySelector('input[type=checkbox]');
// 	// 상품 중 하나라도 선택해제라면 전체선택해제
// 	itemCheck.addEventListener('click', () => {
// 		if (!itemCheck.checked) {
// 			allCheckbox.checked = false;
// 		}
// 	});
// });
