import{c as r,i as y,K as f,d as v}from"./assets/footer-2ef1196d.js";import{a as S}from"./assets/vendor-4b895a38.js";const e={counterCart:document.querySelector(".js-cart-numbers"),counterMainPage:document.querySelector("#cart-count"),list:document.querySelector(".js-cart-list"),cartEmpty:document.querySelector(".js-empty-cart"),cartFull:document.querySelector(".cart-full"),buttonDeleteProduct:".delete-btn",buttonCleanCart:document.querySelector(".js-delete-all-btn"),formSubmit:document.querySelector(".form-cart"),totalPrice:document.querySelector(".total-price"),cartSuccess:document.querySelector(".js-success"),closeSuccess:document.querySelector(".js-close-success"),cartFormError:document.querySelector(".form-error")};g();function g(){r.length!==0?(e.cartEmpty.style.display="none",e.cartFull.style.display="flex",e.list.insertAdjacentHTML("beforeend",i(r)),d(),e.counterCart.textContent=r.length,e.counterMainPage.textContent=r.length):(e.cartEmpty.style.display="flex",e.cartFull.style.display="none")}function d(){const t=r.reduce((c,n)=>c+n.price,0);e.totalPrice.innerHTML=t.toFixed(2)}function i(t){return t.map(({_id:c,name:n,img:a,category:s,price:o,size:u})=>{const l=s.replace(/_/g," ");return`<li class="selectedProduct" data-id=${c}>
            <div class="product-picture">
                <img src="${a}" alt="${n}" class="" loading="lazy" />
            </div>

            <div class="product-info-container">

            <div class="info-header">
                <h2 class="product-name">${n}</h2>
                <button class="delete-btn">
                    <svg class="" width="20" height="20">
                    <use href="${y}#icon-x-close"></use>
                    </svg>
                </button>
            </div>

            <div class="product-info">
                <p class="info-quality"> Category: <span class="info-value">${l}</span>
                </p>
                <p class="info-quality"> Size:<span class="info-value">${u}</span></p>
            </div>
            <div class="price">$
            <span>${o}</span>
            </div>
            </div>
        </li>`}).join("")}function m(){document.querySelectorAll(e.buttonDeleteProduct).forEach(t=>{t.addEventListener("click",()=>{v(r,t),e.list.innerHTML=i(r),m(),d()})})}m();e.buttonCleanCart.addEventListener("click",p);function p(){localStorage.removeItem(f),e.cartEmpty.style.display="flex",e.cartFull.style.display="none",e.list.innerHTML=i(r),document.querySelector(".js-cart-numbers").innerHTML=0,document.querySelector("#cart-count").innerHTML=0}e.formSubmit.addEventListener("submit",h);async function h(t){t.preventDefault();const{email:c}=t.target.elements;if(!b(c.value)){alert("Email is invalid");return}function a(o){return o.map(({_id:l})=>({productId:l,amount:1}))}const s={email:c.value,products:a(r)};document.getElementById("overlay").style.display="flex",await S.post("https://food-boutique.b.goit.study/api/orders",s).then(o=>{document.getElementById("overlay").style.display="none",E(),e.cartFormError.innerHTML=""}).catch(o=>{console.error(o),document.getElementById("overlay").style.display="none",e.cartFormError.innerHTML="We had some error. Try again please."})}function b(t){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)}function E(){e.cartSuccess.classList.remove("visually-hidden"),e.closeSuccess.addEventListener("click",()=>{q()})}function q(){setTimeout(C,500),e.cartSuccess.classList.add("visually-hidden"),e.formSubmit.reset(),p()}function C(){window.scrollTo({top:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
