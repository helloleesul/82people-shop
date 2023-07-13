const url = window.location.search;
const itemId = url.split('=')[1];
console.log(itemId);

// axios({
// 	method: 'get',
// 	url: `/api/products/${productId}`,
// }).then(res => {
// 	const item = res.data.info;
// 	const itemImg = document.querySelectorAll('.item-img');
// 	const title = document.querySelectorAll('.product-title');
// 	const price = document.querySelectorAll('.product-price');
// 	const itemDescription = document.querySelectorAll('.product-detail');
// 	const productCount = document.querySelectorAll('.product-count');
// 	const productTotalPrice = document.querySelectorAll('.product-total-price');

// 	itemImg.forEach(data => data.setAttribute('src', item.imageUrl));

// 	title.forEach(data => (data.innerText = item.title));

// 	price.forEach(data => (data.innerText = item.price.toLocaleString()));

// 	itemDescription.forEach(data => (data.innerText = item.itemDescription));

// 	productCount.forEach((data, index) => {
// 		data.addEventListener('input', () => {
// 			const count = parseInt(data.value);
// 			const totalPrice = item.price * count;
// 			productTotalPrice[index].innerText = totalPrice.toLocaleString();
// 		});
// 	});
// });

// 장바구니 작업
const addToCart = document.querySelector('#add-to-cart');
const productAmount = document.querySelector('#amount');
const totalCash = document.querySelector('.product-total-cash');
const price = document.querySelector('.product-price');
// 임의로 넣어준 상품가격
const priceValue = Number(price.innerText);
price.innerText = priceValue.toLocaleString() + '원';
totalCash.innerText = price.innerText;

const PRODUCT_KEY = 'cartProducts';
let products = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];

productAmount.addEventListener('change', e => {
	productAmount.value = e.target.value;
	totalCash.innerText =
		(priceValue * productAmount.value).toLocaleString() + '원';
});

addToCart.addEventListener('click', () => {
	const hasProduct = products.findIndex(product => product.id === itemId);

	let product = {
		id: itemId, // api에서 가져온 id값
		title: '상품1', // api에서 가져온 title값
		amount: Number(productAmount.value),
		imageUrl: '/', // api에서 가져온 imageUrl값
		price: priceValue,
		totalPrice: priceValue * Number(productAmount.value),
	};

	if (hasProduct !== -1) {
		// 같은 id의 상품이 있는 경우 덮어쓰기
		products[hasProduct] = product;
	} else {
		// 같은 id의 상품이 없는 경우 추가
		products.push(product);
	}
	localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
	alert('장바구니에 추가되었습니다!');
	// window.location.href = '/cart';
});
