const url = window.location.search;
const itemId = url.split('=')[1];

axios({
	method: 'get',
	url: `/api/products/${productId}`,
}).then(res => {
	const item = res.data.info;
	const itemImg = document.querySelectorAll('.item-img');
	const title = document.querySelectorAll('.product-title');
	const price = document.querySelectorAll('.product-price');
	const itemDescription = document.querySelectorAll('.product-detail');
	const productCount = document.querySelectorAll('.product-count');
	const productTotalPrice = document.querySelectorAll('.product-total-price');
	const addToCart = document.querySelectorAll('.add-to-cart');

	itemImg.forEach(data => data.setAttribute('src', item.imageUrl));

	title.forEach(data => (data.innerText = item.title));

	price.forEach(data => (data.innerText = item.price.toLocaleString()));

	itemDescription.forEach(data => (data.innerText = item.itemDescription));

	productCount.forEach((data, index) => {
		data.addEventListener('input', () => {
			const count = parseInt(data.value);
			const totalPrice = item.price * count;
			productTotalPrice[index].innerText = totalPrice.toLocaleString();
		});
	});

	addToCart.forEach(data => {
		data.addEventListener('click', () => {
			window.location.href = '/cart'; // 장바구니 페이지 URL로 이동
		});
	});
});
