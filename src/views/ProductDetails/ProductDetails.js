import { main } from '/Common/index.js';
await main();

const urlStr = window.location.href;
const productId = new URL(urlStr).searchParams.get('productId');

console.log(productId);

// 장바구니 작업
const productMaker = document.querySelector('.maker');
const productTitle = document.querySelector('.product-title');
const productPrice = document.querySelector('.product-price');
const productDescription = document.querySelector('.product-detail');
const productImage = document.querySelector('.product-icon-image>img');

const addToCart = document.querySelector('#add-to-cart');
const productAmount = document.querySelector('#amount');
const totalCash = document.querySelector('.product-total-cash');

let imageURL;
let price;
let totalPrice;

fetch(`/api/products/${productId}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then(res => {
		console.log(res);
		if (res.ok) {
			return res.json();
			// 로그인 페이지 이동
		} else {
			throw new Error('조회 실패');
		}
	})
	.catch(err => {
		alert(err);
	})
	.then(({ productInfo }) => {
		//{ manufacturer, title, price, description }

		productMaker.innerText = productInfo.manufacturer;
		productTitle.innerText = productInfo.title;
		productPrice.innerText = `${Number(productInfo.price).toLocaleString()} 원`;
		productDescription.innerText = productInfo.description;
		//  productInfo._id;

		imageURL = productInfo.imageURL[0];
		productImage.setAttribute('src', imageURL);
		totalCash.innerText = `${Number(productInfo.price).toLocaleString()} 원`;

		price = Number(productInfo.price);
		totalPrice = Number(productInfo.price);
	})
	.catch(err => console.log(err));

const PRODUCT_KEY = 'cartProducts';
let products = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];

productAmount.addEventListener('change', e => {
	productAmount.value = e.target.value;

	totalCash.innerText = `	${(
		price * Number(productAmount.value)
	).toLocaleString()}  원`;
});

addToCart.addEventListener('click', () => {
	const hasProduct = products.findIndex(product => product.id === productId);

	let product = {
		id: productId, // api에서 가져온 id값
		title: productTitle.textContent, // api에서 가져온 title값
		amount: Number(productAmount.value),
		imageUrl: imageURL, // api에서 가져온 imageUrl값
		price: price,
		totalPrice: price * Number(productAmount.value),
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
