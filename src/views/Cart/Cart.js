// 데이터 저장
// localStorage.setItem('key', 'value');
// 데이터 가져오기
// const existingData = localStorage.getItem('key');
// 데이터 추가
// const newData = 'new value';
// localStorage.setItem('key', existingData + newData);
// 데이터 삭제
// localStorage.removeItem('key');

// 장바구니 개발용 가짜 상품데이터
// id, 상품이름, 수량, 이미지주소, 가격
const cartProducts = [
	{ id: 1, title: '상품1', amount: 1, imageUrl: '/', price: 1000 },
	{ id: 2, title: '상품2', amount: 1, imageUrl: '/', price: 2000 },
	{ id: 3, title: '상품3', amount: 1, imageUrl: '/', price: 3000 },
];
localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

// 장바구니 상품 불러오기
const products = JSON.parse(localStorage.getItem('cartProducts'));
const itemsUl = document.querySelector('.cart-items > ul');

if (products?.length === 0 || products === null) {
	const emptyItems = document.createElement('li');
	emptyItems.innerText = '상품이 없습니다.';
	itemsUl.appendChild(emptyItems);
} else {
	products.map(product => {
		const newLi = document.createElement('li');
		const newItem = `<article>
		<div class="thumbnail">
			<input type="checkbox" id="${product.id}" name="cartItemCheck" checked />
			<label for="${product.id}">
				<img src="${product.imageUrl}" alt="${product.title}" />
				${product.title}
			</label>
		</div>
		<div>
			<button type="button" class="subtracting">-</button>
			<input
				type="number"
				class="amount"
				value="1"
				min="1"
			/>
			<button type="button" class="adding">+</button>
		</div>
		<div><span class="product-price">${product.price}</span>원</div>
	</article>
	<button type="button" class="delete-btn">삭제</button>`;
		newLi.innerHTML = newItem;
		itemsUl.appendChild(newLi);
	});
}

// 장바구니 상품 수량, 가격 변경
const cartItems = document.querySelectorAll('.cart-items > ul > li');

[...cartItems].map(item => {
	const amountInput = item.querySelector('input.amount');
	let amountValue = Number(amountInput.value);
	const addingAmount = item.querySelector('.adding');
	const subtractingAmount = item.querySelector('.subtracting');

	const itemCheck = item.querySelector('input[name="cartItemCheck"]');
	const itemPrice = item.querySelector('.product-price');

	const updateItem = () => {
		products.map(product => {
			if (product.id === Number(itemCheck.id)) {
				product.amount = Number(amountInput.value);
				product.price = Number(itemPrice.innerText) * product.amount;
			}
		});
		localStorage.setItem('cartProducts', JSON.stringify(products));
	};

	// 수량 증가
	addingAmount.addEventListener('click', () => {
		amountValue += 1;
		amountInput.value = amountValue;
		updateItem();
	});
	// 수량 증감
	subtractingAmount.addEventListener('click', () => {
		amountValue -= 1;
		if (amountInput.value < 2) {
			amountValue = 1;
			alert('최소 수량은 1개 입니다!');
		}
		amountInput.value = amountValue;
		updateItem();
	});
	// 수량 직접 입력
	amountInput.addEventListener('change', e => {
		amountValue = Number(e.target.value);
		if (e.target.value < 2) {
			e.target.value = 1;
			alert('최소 수량은 1개 입니다!');
		}
		updateItem();
	});
});

// const cartItems = document.querySelectorAll('.cart-items li');
// const allCheckbox = document.querySelector('#allItem');

// // 상품 삭제
// const deleteItem = item => {
// 	const deleteBtn = item.querySelector('.delete-btn');
// 	deleteBtn.addEventListener('click', () => {
// 		item.remove();
// 	});
// };

// [...cartItems].map(item => {
// 	deleteItem(item);

// 	const amount = item.querySelector('input.amount');
// 	let amountValue = Number(amount.value);
// 	const addingAmount = item.querySelector('.adding');
// 	const subtractingAmount = item.querySelector('.subtracting');
// 	// 수량 증가
// 	addingAmount.addEventListener('click', () => {
// 		amountValue += 1;
// 		amount.value = amountValue;
// 	});
// 	// 수량 증감
// 	subtractingAmount.addEventListener('click', () => {
// 		amountValue -= 1;
// 		if (amount.value < 2) {
// 			return (amountValue = 1);
// 		}
// 		amount.value = amountValue;
// 	});
// 	// 수량 직접 입력
// 	amount.addEventListener('change', e => {
// 		amountValue = Number(e.target.value);
// 	});

// 	const itemCheck = item.querySelector('input[type=checkbox]');
// 	// 상품 중 하나라도 선택해제라면 전체선택해제
// 	itemCheck.addEventListener('click', () => {
// 		if (!itemCheck.checked) {
// 			allCheckbox.checked = false;
// 		}
// 	});
// });

// // 상품 전체선택
// allCheckbox.addEventListener('click', () => {
// 	const allChecked = allCheckbox.checked;
// 	[...cartItems].map(item => {
// 		const itemCheck = item.querySelector('input[type=checkbox]');
// 		if (allChecked) {
// 			itemCheck.checked = true;
// 		} else {
// 			itemCheck.checked = false;
// 		}
// 	});
// });
