import{i as l,c as b,K as P,u as _,l as re,s as v}from"./assets/footer-3ddf5155.js";import{a as x,P as ie,N as ne,l as ce}from"./assets/vendor-4b895a38.js";const le="https://food-boutique.b.goit.study/api/",de="products/categories",ue="products",pe="products/",fe="products/popular",ge="products/discount",ye="subscription",me="orders",h=x.create({baseURL:le});class M{static async getCategories(){return(await h.get(de)).data}static async getProducts({keyword:t,category:s,page:o,limit:r,sortBy:a}={}){return(await h.get(ue,{params:{keyword:t,category:s,page:o,limit:r,[a==null?void 0:a.key]:a==null?void 0:a.value}})).data}static async getProduct(t){return(await h.get(pe+t)).data}static async getPopularProducts(t=5){return(await h.get(fe,{params:{limit:t}})).data}static async getDiscountedProducts(){return(await h.get(ge)).data}static async subscribe(t){return(await h.post(ye,{email:t})).data}static async placeOrder(t){const{email:s,products:o}=t;return(await h.post(me,{email:s,products:o.map(({productId:a,amount:i})=>({productId:a,amount:i}))})).data}}const A=document.querySelector(".modal-background"),U=document.querySelector(".modal");async function R(e){try{A.classList.remove("is-hidden"),document.body.classList.add("is-modal-open"),U.innerHTML=`
      <button type="button" class="modal-close-btn" aria-label="modal close">
        <svg class="modal-icon-close" width="22" height="22">
          <use href="${l}#icon-x-close"></use>
        </svg>
      </button>
    `;const t=await M.getProduct(e);U.insertAdjacentHTML("beforeend",be(t)),document.querySelector(".modal-btn").addEventListener("click",()=>{ve(t)}),document.querySelector(".modal-btn-remove").addEventListener("click",()=>{he(t)});for(let s=0;s<b.length;s++)b[s]._id===e&&(document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block");document.querySelector(".modal-close-btn").addEventListener("click",D),A.addEventListener("click",K),document.addEventListener("keydown",G)}catch(t){console.error("Error fetching product data:",t.message)}finally{}}function be({img:e,name:t,category:s,size:o,popularity:r,desc:a,price:i}){return`
    <div class="modal-container">
      <div>
        <div class="modal-img">
          <img
            src="${e}"
            alt="${t}"
          />
        </div>
      </div>
      <div class="modal-product-info">
        <h2 class="modal-title">${t}</h2>
        <div class="modal-details">
          <div>
            <span class="modal-subtitle">Category:</span>
            <span class="modal-subtitle-info">
              ${s.replaceAll("_"," ")}
            </span>
          </div>
          <div>
            <span class="modal-subtitle">Size:</span>
            <span class="modal-subtitle-info">${o}</span>
          </div>
          <div>
            <span class="modal-subtitle">Popularity:</span>
            <span class="modal-subtitle-info">${r}</span>
          </div>
        </div>
        <p class="modal-about-product">${a}</p>
      </div>
    </div>
    <div class="modal-price-container">
      <p class="modal-price-product">
        <span>$</span><span class="modal-price">${i}</span>
      </p>
      
      <div class="quantity-and-add">
      <button class="modal-btn" aria-label="add to card">
      <span class="modal-btn-text">Add to</span>
      <svg class="modal-icon-shop" width="18" height="18">
        <use href="${l}#icon-shopping-cart"></use>
      </svg>
    </button>
    <button class="modal-btn-remove" aria-label="add to card">
      <span class="modal-btn-text">Remove from</span>
      <svg class="modal-icon-shop" width="18" height="18">
        <use href="${l}#icon-shopping-cart"></use>
      </svg>
    </button>
      </div>
    </div>`}function ve(e){b.push(e),localStorage.setItem(P,JSON.stringify(b)),_(),document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block",Se(e)}function he(e){for(let t=0;t<b.length;t++)b[t]._id===e._id&&(b.splice(t,1),localStorage.setItem(P,JSON.stringify(b)),_(),document.querySelector(".modal-btn").style.display="block",document.querySelector(".modal-btn-remove").style.display="none");Pe(e)}function Se(e){const t=e._id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===t){const i=a.querySelector(".popularBtn");i.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),o.forEach(a=>{if(a.dataset.id===t){const i=a.querySelector(".info-div .info-title-link");i.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),r.forEach(a=>{if(a.dataset.id===t){const i=a.querySelector(".price-container-pl .btn-pl");i.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}})}function Pe(e){const t=e._id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===t){const i=a.querySelector(".popularBtn");i.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-shopping-cart`),i.removeAttribute("disabled")}}),o.forEach(a=>{if(a.dataset.id===t){const i=a.querySelector(".info-div .info-title-link");i.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-shopping-cart`),i.removeAttribute("disabled")}}),r.forEach(a=>{if(a.dataset.id===t){const i=a.querySelector(".price-container-pl .btn-pl");i.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-shopping-cart`),i.removeAttribute("disabled")}})}function K({target:e}){e===A&&D()}function D(){const e=document.querySelector(".modal-container");e.classList.add("modal-closing"),setTimeout(()=>{A.classList.add("is-hidden"),document.body.classList.remove("is-modal-open"),e.classList.remove("modal-closing")},1500),document.querySelector(".modal-close-btn").removeEventListener("click",D),A.removeEventListener("click",K),document.removeEventListener("keydown",G)}function G({key:e}){e==="Escape"&&D()}const Q="filter",N={paginationDop:document.querySelector(".paginationDop"),pagination:document.querySelector(".tui-pagination"),list:document.querySelector(".product-list"),search:document.querySelector("#search")},Ee=document.getElementById("pagination");let $,O=3,V;function $e(){const e=localStorage.getItem(Q);if(e)try{const t=JSON.parse(e);V=t.page,$=t.limit}catch(t){console.error("Error updating localStorage:",t)}}function Ae(e){let t={totalItems:e,itemsPerPage:$,visiblePages:O,page:V,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new ie(Ee,t).on("beforeMove",Le)}function Le(e){const t=localStorage.getItem(Q);if(t)try{const s=JSON.parse(t);s.page=Number(`${e.page}`),localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}N.list.innerHTML="",g(),qe()}async function C(e){e<=Number($)?N.pagination.classList.replace("tui-pagination","paginationDop"):($e(),N.pagination.classList.replace("paginationDop","tui-pagination")),$===9||$===8?O=4:O=2}function qe(){let t=document.querySelector(".container-pl").getBoundingClientRect(),s=t.left,o=t.top;scrollTo(s,o),scrollTo({top:600,behavior:"smooth"})}const T={list:document.querySelector(".product-list"),pagination:document.querySelector(".tui-pagination")};let k=[],q;async function g(){document.getElementById("overlay").style.display="flex",Te();const e=await Ce();q=e.data.totalPages*e.data.perPage;const t=ee();q<=Number(t)&&T.pagination.classList.replace("tui-pagination","paginationDop"),C(q),Ae(q);try{let s;e&&(s=e),k=s.data.results,ke(k)}catch(s){console.error(s)}finally{document.getElementById("overlay").style.display="none"}}function ke(e){const t=localStorage.getItem(P),s=`<div class="error-load">
                <h2 class="not-found-heading">Nothing was found for the selected <span
                        class="green-word">filters...</span>
                </h2>
                <p class="not-found-message">Try adjusting your search parameters or browse our range by other criteria
                    to
                    find
                    the perfect
                    product for
                    you.</p>
            </div>`,o=e.map(({img:r,name:a,popularity:i,category:n,price:u,size:y,_id:d,is10PercentOff:E})=>{const B=n.replace(/_/g," "),L=t?JSON.parse(t).some(ae=>ae._id===d):!1,oe=E?"icon-discount-pl":"visually-hidden",se=L?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="item-pl" data-id="${d}">
                <div class="background-img-pl">
                    <img src="${r}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${a}</h2>
                <div class="container-info">
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${B}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${y}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${i}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${u}</b>
                    <button aria-label="add basket" class="btn-pl" ${L?"disabled":""}>
                        <svg class="icon-pl">
                            <use href="${se}"></use>
                        </svg>
                    </button>
                </div>
                <svg class="${oe}">
                <use href="${l}#icon-discount"></use>
                </svg>
                </div>
            </li>`}).join("");T.list.innerHTML=o||s}window.addEventListener("load",g);T.list.addEventListener("click",we);function we(e){let t=0;const o=e.target.closest("button");if(o){const a=o.closest("li");if(a){const i=a.dataset.id,n=k.find(u=>u._id===i);J(a),n&&(t=1,H(n,k))}o.setAttribute("disabled",!0)}const r=e.target.closest("li");if(r&&!t){const a=r.dataset.id;R(a)}}function J(e){const t=e.dataset.id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===t){const i=a.querySelector(".popularBtn");i.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),o.forEach(a=>{if(a.dataset.id===t){const i=a.querySelector(".info-div .info-title-link");i.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),r.forEach(a=>{if(a.dataset.id===t){const i=a.querySelector(".price-container-pl .btn-pl");i.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}})}function H(e,t){const s=Ie(e,t);b.some(r=>r._id===s._id)||(b.push(s),localStorage.setItem(P,JSON.stringify(b)),_())}function Ie(e,t){const s=e._id;return t.find(({_id:o})=>o===s)}const De="filter";function X(){const e=localStorage.getItem(De);try{const t=JSON.parse(e),o={...{},...t};return Object.keys(o).forEach(r=>{o[r]===void 0&&delete o[r]}),o}catch(t){return console.error(t),null}}async function Ce(){document.getElementById("overlay").style.display="flex";const{keyword:e,category:t,page:s,limit:o,byABC:r,byPrice:a,byPopularity:i}=X(),n={keyword:e||"",category:t||"",page:s||1,limit:o||6,byABC:r||"",byPrice:a||"",byPopularity:i||""},y=`https://food-boutique.b.goit.study/api/products?${Object.keys(n).filter(d=>n[d]!==void 0&&n[d]!==null&&n[d]!=="").map(d=>`${d}=${n[d]}`).join("&")}`;try{return await x.get(y)}catch(d){console.error(d)}finally{document.getElementById("overlay").style.display="none"}}function ee(){let e;return window.innerWidth<1440&&window.innerWidth>767?e=8:window.innerWidth<768?e=6:e=9,e}function Te(){const e=ee(),t=localStorage.getItem("filter"),s=JSON.parse(t);s.limit=Number(e),localStorage.setItem("filter",JSON.stringify(s))}let z=window.innerWidth,W;const F=[768,1440];window.addEventListener("resize",Be);function Be(){clearTimeout(W),W=setTimeout(function(){const e=window.innerWidth;Ne(z,e)&&(z=e,T.list.innerHTML="",g())},250)}function Ne(e,t){return F.some(s=>e<s&&t>=s)||F.some(s=>e>=s&&t<s)}const Oe="https://food-boutique.b.goit.study/api";function _e(){return x.get(`${Oe}/products/categories`).then(({data:e})=>e).catch(e=>e)}const p={selector:document.querySelector(".select__body"),currentfilter:document.querySelector(".select__current"),list:document.querySelector(".product-list"),sort:document.querySelector(".sort-body"),currentSort:document.querySelector(".sort-current"),form:document.querySelector("#search")};_e().then(e=>{const t=xe(e);p.selector.insertAdjacentHTML("afterbegin",t),Me();p.selector.addEventListener("click",Re);}).catch(e=>{ne.Notify.failure(`❌ Oops! Something went wrong! Error ${e} Try reloading the page! ❌`)});function xe(e){return e.map(t=>`<div class="select__item">${t.replace(/_/g," ")}</div>`).join("")}let Me=function(){let e=document.querySelectorAll(".select__header"),t=document.querySelectorAll(".select__item");e.forEach(r=>{r.addEventListener("click",s)}),t.forEach(r=>{r.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let r=this.innerText,a=this.closest(".select"),i=a.querySelector(".select__current");i.innerText=r,a.classList.remove("is-active")}};function Re(e){const t=e.target.innerText.replace(/ /g,"_").replace(/&/g,"%26"),s=localStorage.getItem("filter");if(s)try{const o=JSON.parse(s);e.target.innerText!=="Show all"?(o.category=`${t}`,c.disabled=!1):(o.category=null,o.keyword!==null||o.byABC!==""||o.byPopularity!==""||o.byPrice!==""?c.disabled=!1:c.disabled=!0),o.page=1,localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}C(1),g()}const f=re("filter");function Je(){const{keyword:e,category:t,page:s,limit:o,byABC:r,byPrice:a,byPopularity:i}=X(),u={keyword:e||null,category:t||null,page:s||1,limit:o||6,byABC:r||"",byPrice:a||"",byPopularity:i||""},y="filter";localStorage.getItem("filter")&&(f.category!==null&&(p.currentfilter.innerText=f.category.replace(/_/g," ").replace(/%26/g,"&")),f.keyword!==null&&(p.form.elements.search.value=f.keyword),f.byABC&&(f.byABC==="false"&&(p.currentSort.innerText="Z to A"),f.byABC==="true"&&(p.currentSort.innerText="A to Z")),f.byPrice&&(f.byPrice==="false"&&(p.currentSort.innerText="Expensive"),f.byPrice==="true"&&(p.currentSort.innerText="Cheap")),f.byPopularity&&(f.byPopularity==="false"&&(p.currentSort.innerText="Popular"),f.byPopularity==="true"&&(p.currentSort.innerText="Not Popular"))),v(y,u),C()}Je();let He=function(){let e=document.querySelectorAll(".sort-header"),t=document.querySelectorAll(".sort-item");e.forEach(r=>{r.addEventListener("click",s)}),t.forEach(r=>{r.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let r=this.innerText,a=this.closest(".sort"),i=a.querySelector(".sort-current");i.innerText=r,a.classList.remove("is-active")}};He();p.sort.addEventListener("click",je);function je(e){const t=e.target.innerText,s=localStorage.getItem("filter");try{const o=JSON.parse(s);t==="A to Z"?(o.byPrice="",o.byPopularity="",o.byABC="",v("filter",o),g()):t==="Z to A"?(o.byPrice="",o.byPopularity="",o.byABC="false",v("filter",o),g(),c.disabled=!1):t==="Cheap"?(o.byABC="",o.byPopularity="",o.byPrice="true",v("filter",o),g(),c.disabled=!1):t==="Expensive"?(o.byABC="",o.byPopularity="",o.byPrice="false",v("filter",o),g(),c.disabled=!1):t==="Popular"?(o.byABC="",o.byPrice="",o.byPopularity="false",v("filter",o),g(),c.disabled=!1):t==="Not Popular"?(o.byABC="",o.byPrice="",o.byPopularity="true",v("filter",o),g(),c.disabled=!1):t==="Reset Sort"&&(o.byPrice="",o.byPopularity="",o.byABC="",v("filter",o),g(),o.keyword!==null||o.category!==null?c.disabled=!1:c.disabled=!0)}catch(o){console.error("Error updating localStorage:",o)}}const c=document.querySelector(".clean-button");c.addEventListener("click",ze);const Ue=localStorage.getItem("filter"),m=JSON.parse(Ue);function ze(){m.page=1,m.keyword=null,m.category=null,m.byPrice="",m.byPopularity="",m.byABC="";const e=m;p.currentSort.innerText="A to Z",p.currentfilter.innerText="Categories",p.form.reset(),v("filter",e),g(),c.disabled=!0}We();function We(){m.keyword!==null||m.byABC!==""||m.byPopularity!==""||m.byPrice!==""||m.category!==null?c.disabled=!1:c.disabled=!0}const S=document.querySelector(".clean-button"),j=document.querySelector("#search");let Z;j.addEventListener("input",te);j.addEventListener("submit",te);function te(e){e.preventDefault();const t=j.elements.search.value.trim(),s=localStorage.getItem("filter");(e.type==="input"||e.type==="submit")&&(clearTimeout(Z),Z=setTimeout(()=>{Fe(t,s),g(),C(1)},1e3))}function Fe(e,t){if(t)try{const s=JSON.parse(t);e===""?(s.keyword=null,s.category!==null||s.byABC!==""||s.byPopularity!==""||s.byPrice!==""?S.disabled=!1:S.disabled=!0):(s.keyword=`${e}`,S.disabled=!1),s.page=1,localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}}async function Ze(){document.getElementById("overlay").style.display="flex";try{return await M.getPopularProducts()}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const Ye=document.querySelector(".popular-list");let w=[];async function Ke(){const e=localStorage.getItem(P),t=5;try{w=(await Ze()).slice(0,t);const o=w.map(({img:r,name:a,popularity:i,category:n,size:u,_id:y})=>{const d=e?JSON.parse(e).some(L=>L._id===y):!1,E=d?`${l}#icon-cart`:`${l}#icon-shopping-cart`,B=n.replace(/_/g," ");return`<li class="item-popular" data-id="${y}">
        <div class="background-img-popular">
            <img src="${r}" alt="" class="img-popular" loading="lazy" />
        </div>
        <div class="popular-wrap">
        <h3 class="popular-name">${a}</h3>
        <div class="popular-info">
            <p class="popular-info-items">
                Category: <b class="value-popular">${B}</b>
            </p>
            <p class="popular-info-items">Size: <b class="value-popular">${u}</b></p>
            <p class="popular-info-items">Popularity: <b class="value-popular">${i}</b></p>
        </div>
        </div>
            <button class="popularBtn" aria-label="Add basket" data-_id="${y}" ${d?"disabled":""}>
                <svg class="icon-popular" data-_id="${y}" width="12" height="12">
                    <use class="use-popular" data-_id="${y}"
                      href="${E}"
                    ></use>
                </svg>
            </button>
    </li>`}).join("");Ye.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",Ke);const Ge=document.querySelector(".popular-list");Ge.addEventListener("click",Qe);function Qe(e){let t=0;const o=e.target.closest("button");if(o){const a=o.closest("li");if(a){const i=a.dataset.id,n=w.find(u=>u._id===i);J(a),n&&(t=1,H(n,w))}o.setAttribute("disabled",!0)}const r=e.target.closest("li");if(r&&!t){const a=r.dataset.id;R(a)}}async function Ve(){document.getElementById("overlay").style.display="flex";try{return await M.getDiscountedProducts()}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const Xe=document.querySelector(".discount-list");let I=[];async function et(){const e=localStorage.getItem(P),t=2;try{I=(await Ve()).slice(0,t);const o=I.map(({_id:a,name:i,img:n,price:u})=>{const d=(e?JSON.parse(e).some(E=>E._id===a):!1)?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="discount-item" data-id="${a}">
           <svg class="icon-discount" width="64" height="64">
                  <use href="${l}#icon-discount"></use>
                </svg>
    <div class="discount-item-img">
      <img class="discount-img"  src="${n}" alt="Product" loading="lazy" />
    </div>
    <div class="discont-info">
      <p class="info-title">${i}</p>
      <div class="discont-info-dop">
        <p class="info-price">$${u}</p>
        <div class="info-div">
          <button class="info-title-link" aria-label="Price" data-_id="${a}">
            <svg class="img-svg-osnova" data-_id="${a}" width="18" height="18">
              <use class="use" data-_id="${a}"
                href="${d}"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </li>`}).join("");Xe.insertAdjacentHTML("beforeend",o),document.querySelector(".discount-list").addEventListener("click",tt)}catch(s){console.error(s)}}window.addEventListener("load",et);function tt(e){let t=0;const o=e.target.closest("button");if(o){const a=o.closest("li");if(a){const i=a.dataset.id,n=I.find(u=>u._id===i);J(a),n&&(t=1,H(n,I))}o.setAttribute("disabled",!0)}const r=e.target.closest("li");if(r&&!t){const a=r.dataset.id;R(a)}}const Y=document.querySelector(".scroll-up");document.addEventListener("scroll",ce(ot,400));function ot(){const e=window.scrollY,t=document.documentElement.clientHeight;e>t?Y.classList.add("scroll-up-is-hidden"):Y.classList.remove("scroll-up-is-hidden")}
//# sourceMappingURL=commonHelpers2.js.map
