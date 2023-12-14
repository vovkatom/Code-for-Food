import{c as r,i as p,K as v,d as f}from"./assets/footer-328ec2d7.js";import{a as S}from"./assets/vendor-4b895a38.js";const e={counterCart:document.querySelector(".js-cart-numbers"),counterMainPage:document.querySelector("#cart-count"),list:document.querySelector(".js-cart-list"),cartEmpty:document.querySelector(".js-empty-cart"),cartFull:document.querySelector(".cart-full"),buttonDeleteProduct:".delete-btn",buttonCleanCart:document.querySelector(".js-delete-all-btn"),formSubmit:document.querySelector(".form-cart"),totalPrice:document.querySelector(".total-price"),cartSuccess:document.querySelector(".js-success"),closeSuccess:document.querySelector(".js-close-success"),cartFormError:document.querySelector(".form-error"),invalidEmail:document.querySelector(".js-invalid-email"),closeInvalidEmail:document.querySelector(".js-close-invalid-email")};E();function E(){r.length!==0?(e.cartEmpty.style.display="none",e.cartFull.style.display="flex",e.list.insertAdjacentHTML("beforeend",i(r)),d(),e.counterCart.textContent=r.length,e.counterMainPage.textContent=r.length):(e.cartEmpty.style.display="flex",e.cartFull.style.display="none")}function d(){const t=r.reduce((c,o)=>c+o.price,0);e.totalPrice.innerHTML=t.toFixed(2)}function i(t){return t.map(({_id:c,name:o,img:n,category:l,price:a,size:u})=>{const s=l.replace(/_/g," ");return`<li class="selectedProduct" data-id=${c}>
            <div class="product-picture">
                <img src="${n}" alt="${o}" class="" loading="lazy" />
            </div>

            <div class="product-info-container">

            <div class="info-header">
                <h2 class="product-name">${o}</h2>
                <button class="delete-btn">
                    <svg class="" width="20" height="20">
                    <use href="${p}#icon-x-close"></use>
                    </svg>
                </button>
            </div>

            <div class="product-info">
                <p class="info-quality-category"> Category: <span class="info-value">${s}</span>
                </p>
                <p class="info-quality"> Size:<span class="info-value">${u}</span></p>
            </div>
            <div class="price">$
            <span>${a}</span>
            </div>
            </div>
        </li>`}).join("")}function m(){document.querySelectorAll(e.buttonDeleteProduct).forEach(t=>{t.addEventListener("click",()=>{f(r,t),e.list.innerHTML=i(r),m(),d()})})}m();e.buttonCleanCart.addEventListener("click",y);function y(){localStorage.removeItem(v),e.cartEmpty.style.display="flex",e.cartFull.style.display="none",e.list.innerHTML=i(r),document.querySelector(".js-cart-numbers").innerHTML=0,document.querySelector("#cart-count").innerHTML=0}e.formSubmit.addEventListener("submit",g);async function g(t){t.preventDefault();const{email:c}=t.target.elements;if(!h(c.value)){C();return}function n(a){return a.map(({_id:s})=>({productId:s,amount:1}))}const l={email:c.value,products:n(r)};document.getElementById("overlay").style.display="flex",await S.post("https://food-boutique.b.goit.study/api/orders",l).then(a=>{document.getElementById("overlay").style.display="none",b(),e.cartFormError.innerHTML=""}).catch(a=>{console.error(a),document.getElementById("overlay").style.display="none",e.cartFormError.innerHTML="We had some error. Try again please."})}function h(t){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)}function b(){e.cartSuccess.classList.remove("visually-hidden"),e.closeSuccess.addEventListener("click",()=>{q()})}function q(){setTimeout(L,500),e.cartSuccess.classList.add("visually-hidden"),e.formSubmit.reset(),y()}function L(){window.scrollTo({top:0,behavior:"smooth"})}function C(){e.invalidEmail.classList.remove("visually-hidden"),e.closeInvalidEmail.addEventListener("click",()=>{T()})}function T(){e.invalidEmail.classList.add("visually-hidden")}
//# sourceMappingURL=commonHelpers.js.map
