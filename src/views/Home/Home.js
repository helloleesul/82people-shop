import { main } from '/Common/index.js';
await main();

const total = document.querySelector('.products.total');
const best = document.querySelector('.products.best');

fetch('/api/products', {
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
	.then(({ bestProducts, totalProducts }) => {
		console.log('bestProducts', bestProducts);
		console.log('totalProducts', totalProducts);
		best.innerHTML = bestProducts.map(getProducts).join('');
		total.innerHTML = totalProducts.map(getProducts).join('');
	})
	.catch(err => console.log(err));

//상품상세 불러오기
const getProducts = newProduct => {
	// ${newProduct.imageURL}
	return `<li>
    <a class='product-link'
    href='/products?productId=${newProduct._id}' target='_self'>
    <img class="product-img"
    src='${newProduct.imageURL}' alt="product-item"/>
    <div class="product-title">${newProduct.title}</div>
    <div class='product-price'>${newProduct.price.toLocaleString()} 원</div>
    </div>
    </a>
    </li>`;
};
