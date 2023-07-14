import { main } from '/Common/index.js';
await main();

const products = document.querySelector('.icons');
const categoryTag = document.querySelector('.category');
const urlStr = window.location.href;
const category = new URL(urlStr).searchParams.get('category');

categoryTag.innerHTML = category;

fetch(`/api/products/category/${category}`, {
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
	.then(({ categoryProducts }) => {
		console.log(categoryProducts);

		products.innerHTML = categoryProducts.map(getProducts).join('');
	})
	.catch(err => console.log(err));

//상품상세 불러오기
const getProducts = newProduct => {
	return `<li>
    <a class='icon-img'
    href='/products?productId=${newProduct._id}' target='_self' id='bring-list'>
	<div class="icon-img">
    <img class='icon-img'
    src='${newProduct.imageURL}'/>
	</div>
    <div class="contents1-blod">${newProduct.title}</div>
    <div class='contents3'>${newProduct.price.toLocaleString()} 원</div>
    </div>
    </a>
    </li>`;
};
