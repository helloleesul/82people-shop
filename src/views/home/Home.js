//상품상세 불러오기
const createItem = (item) => {
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
    </li>;
}