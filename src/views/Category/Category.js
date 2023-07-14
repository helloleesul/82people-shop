import { main } from '/Common/index.js';
await main();

const products = document.querySelector('.icons');
const categoryTag = document.querySelector('.category');
const urlStr = window.location.href;
const category = new URL(urlStr).searchParams.get('category');
let categoryTitle;
// console.log(category);

switch (category) {
	case 'Christmas':
		categoryTitle = '크리스마스';
		break;
	case 'newYear':
		categoryTitle = '새해';
		break;
	case 'birthDay':
		categoryTitle = '생일';
		break;
	case 'Halloween':
		categoryTitle = '할로윈';
		break;
	case 'partySet':
		categoryTitle = '파티세트';
		break;
	default:
		categoryTitle = '잘못된 접근입니다.';
}
categoryTag.innerHTML = categoryTitle;

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
    href='/products?productId=${newProduct._id}' target='_self'>
    <img class="product-img"
    src='${newProduct.imageURL}'/>
    <div class="product-title">${newProduct.title}</div>
    <div class='product-price'>${newProduct.price.toLocaleString()} 원</div>
    </div>
    </a>
    </li>`;
};
