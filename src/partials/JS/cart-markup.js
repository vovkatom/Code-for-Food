function createCartMarkUp(arr, list) {
    let cartMarkUp;
    if (arr.length) {
        cartMarkUp = arr.map(({ _id, name, img, category, price, size }) => {
        const cleanedCategory = category.replace(/_/g, ' ');
        cartEmpty.disabled=true;
        cartFull.disabled=false;

        return `<li class="selectedProduct" data-id=${_id}>
            <div class="product-picture">
                <img src="${img}" alt="${name}" class="" loading="lazy" />
            </div>

            <div class="product-info-container">

            <div class="info-header">
                <h2 class="product-name">${name}</h2>
                <button class="btn-deleteProduct"></button>
            </div>

            <div class="product-info">
                <p class="quality"> Category: <span class="value">${cleanedCategory}</span>
                </p>
                <p class="quality"> Size:<span class="value">${size}</span></p>
            </div>
            <div class="price">
                <span>${price}</span>
            </div>
            </div>
        </li>`;
    }).join(""); 
    } else{
        cartEmpty.disabled=false;
        cartFull.disabled=true;
    }
    list.innerHTML=cartMarkUp;
}

export {createCartMarkUp};






//{
   // "_id": "640c2dd963a319ea671e383b",
   // "name": "Ackee",
   // "desc": "A fruit that is native to West Africa, but is also grown in the Caribbean, and is often used in traditional Jamaican dishes such as ackee and saltfish.",
   // "img": "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e383b.png",
    //"category": "Fresh_Produce",
    //"price": 8.99,
   // "size": "16 oz",
    //"is10PercentOff": false, ???????????????????????????
    //"popularity": 2
 // }