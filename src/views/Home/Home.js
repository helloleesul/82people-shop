axios({
	method: '',
	url: `/api`,
})
	.then(res => {
		const items = res.data.info;
		const list = document.querySelector('#bring-list');
		items.forEach(item => {
			list.innerHTML += itemDetailsPage(item);
		});
	})
	.catch(err => {
		alert(err.response.data.message);
	});

//상품상세 불러오기
const itemDetailsPage = item => {
	return `
    <li class='icons'>
    <a class='icon-img'
    href='/products?id=${item.id}'>
    <img class='icon-img'
    src='${item.imageUrl}'/>
    <div class='icons'><p class='contents1-blod'>${item.title}</p>
    <span>
    <div class='contents3'>${item.price.toLocaleString()}</div>원</span>
    </div>
    </a>
    </li>`;
};
