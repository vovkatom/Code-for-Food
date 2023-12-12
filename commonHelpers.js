import{c,i as y,K as f,d as S}from"./assets/footer-c9477d03.js";import{a as v}from"./assets/vendor-4b895a38.js";const e={counterCart:document.querySelector(".js-cart-numbers"),counterMainPage:document.querySelector("#cart-count"),list:document.querySelector(".js-cart-list"),cartEmpty:document.querySelector(".js-empty-cart"),cartFull:document.querySelector(".cart-full"),buttonDeleteProduct:".delete-btn",buttonCleanCart:document.querySelector(".js-delete-all-btn"),formSubmit:document.querySelector(".form-cart"),totalPrice:document.querySelector(".total-price"),cartSuccess:document.querySelector(".js-success"),closeSuccess:document.querySelector(".js-close-success")};g();function g(){c.length!==0?(e.cartEmpty.style.display="none",e.cartFull.style.display="flex",e.list.insertAdjacentHTML("beforeend",u(c)),d(),e.counterCart.textContent=c.length,e.counterMainPage.textContent=c.length):(e.cartEmpty.style.display="flex",e.cartFull.style.display="none")}function d(){const t=c.reduce((n,o)=>n+o.price,0);e.totalPrice.innerHTML=t.toFixed(2)}function u(t){return t.map(({_id:n,name:o,img:s,category:a,price:r,size:i})=>{const l=a.replace(/_/g," ");return`<li class="selectedProduct" data-id=${n}>
            <div class="product-picture">
                <img src="${s}" alt="${o}" class="" loading="lazy" />
            </div>

            <div class="product-info-container">

            <div class="info-header">
                <h2 class="product-name">${o}</h2>
                <button class="delete-btn">
                    <svg class="" width="20" height="20">
                    <use href="${y}#icon-x-close"></use>
                    </svg>
                </button>
            </div>

            <div class="product-info">
                <p class="info-quality"> Category: <span class="info-value">${l}</span>
                </p>
                <p class="info-quality"> Size:<span class="info-value">${i}</span></p>
            </div>
            <div class="price">$<span>${r}</span>
            </div>
            </div>
        </li>`}).join("")}function m(){document.querySelectorAll(e.buttonDeleteProduct).forEach(t=>{t.addEventListener("click",()=>{S(c,t),e.list.innerHTML=u(c),m(),d()})})}m();e.buttonCleanCart.addEventListener("click",p);function p(){localStorage.removeItem(f),e.cartEmpty.style.display="flex",e.cartFull.style.display="none",e.list.innerHTML=u(c),document.querySelector(".js-cart-numbers").innerHTML=0,document.querySelector("#cart-count").innerHTML=0}e.formSubmit.addEventListener("submit",b);async function b(t){t.preventDefault();const{email:n}=t.target.elements,o=h();console.log(o);function s(r){return r.map(({_id:l})=>({productId:l,amount:1}))}console.log("createProducts",s(c));const a={email:n.value,products:s(c)};console.log("newOrder",a),await v.post("https://food-boutique.b.goit.study/api/orders",a).then(r=>{console.log(r)}).catch(r=>{console.error(r)}).finally(()=>{C()})}function h(t){return!0}function C(){e.cartSuccess.classList.remove("visually-hidden"),e.closeSuccess.addEventListener("click",()=>{q()})}function q(){e.cartSuccess.classList.add("visually-hidden"),e.formSubmit.reset(),p()}
//# sourceMappingURL=commonHelpers.js.map
