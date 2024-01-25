import{i as l,c as b,K as P,u as x,l as ae,s as v}from"./assets/footer-3ddf5155.js";import{a as A,P as re,N as ie,l as ne}from"./assets/vendor-4b895a38.js";const ce="https://food-boutique.b.goit.study/api/",le="products/categories",de="products",ue="products/",pe="products/popular",fe="products/discount",ge="subscription",ye="orders",h=A.create({baseURL:ce});class me{static async getCategories(){return(await h.get(le)).data}static async getProducts({keyword:e,category:s,page:o,limit:r,sortBy:a}={}){return(await h.get(de,{params:{keyword:e,category:s,page:o,limit:r,[a==null?void 0:a.key]:a==null?void 0:a.value}})).data}static async getProduct(e){return(await h.get(ue+e)).data}static async getPopularProducts(e=5){return(await h.get(pe,{params:{limit:e}})).data}static async getDiscountedProducts(){return(await h.get(fe)).data}static async subscribe(e){return(await h.post(ge,{email:e})).data}static async placeOrder(e){const{email:s,products:o}=e;return(await h.post(ye,{email:s,products:o.map(({productId:a,amount:i})=>({productId:a,amount:i}))})).data}}const q=document.querySelector(".modal-background"),j=document.querySelector(".modal");async function M(t){try{q.classList.remove("is-hidden"),document.body.classList.add("is-modal-open"),j.innerHTML=`
      <button type="button" class="modal-close-btn" aria-label="modal close">
        <svg class="modal-icon-close" width="22" height="22">
          <use href="${l}#icon-x-close"></use>
        </svg>
      </button>
    `;const e=await me.getProduct(t);j.insertAdjacentHTML("beforeend",be(e)),document.querySelector(".modal-btn").addEventListener("click",()=>{ve(e)}),document.querySelector(".modal-btn-remove").addEventListener("click",()=>{he(e)});for(let s=0;s<b.length;s++)b[s]._id===t&&(document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block");document.querySelector(".modal-close-btn").addEventListener("click",C),q.addEventListener("click",Y),document.addEventListener("keydown",K)}catch(e){console.error("Error fetching product data:",e.message)}finally{}}function be({img:t,name:e,category:s,size:o,popularity:r,desc:a,price:i}){return`
    <div class="modal-container">
      <div>
        <div class="modal-img">
          <img
            src="${t}"
            alt="${e}"
          />
        </div>
      </div>
      <div class="modal-product-info">
        <h2 class="modal-title">${e}</h2>
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
    </div>`}function ve(t){b.push(t),localStorage.setItem(P,JSON.stringify(b)),x(),document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block",Se(t)}function he(t){for(let e=0;e<b.length;e++)b[e]._id===t._id&&(b.splice(e,1),localStorage.setItem(P,JSON.stringify(b)),x(),document.querySelector(".modal-btn").style.display="block",document.querySelector(".modal-btn-remove").style.display="none");Pe(t)}function Se(t){const e=t._id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".popularBtn");i.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),o.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".info-div .info-title-link");i.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),r.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".price-container-pl .btn-pl");i.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}})}function Pe(t){const e=t._id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".popularBtn");i.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-shopping-cart`),i.removeAttribute("disabled")}}),o.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".info-div .info-title-link");i.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-shopping-cart`),i.removeAttribute("disabled")}}),r.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".price-container-pl .btn-pl");i.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-shopping-cart`),i.removeAttribute("disabled")}})}function Y({target:t}){t===q&&C()}function C(){const t=document.querySelector(".modal-container");t.classList.add("modal-closing"),setTimeout(()=>{q.classList.add("is-hidden"),document.body.classList.remove("is-modal-open"),t.classList.remove("modal-closing")},500),document.querySelector(".modal-close-btn").removeEventListener("click",C),q.removeEventListener("click",Y),document.removeEventListener("keydown",K)}function K({key:t}){t==="Escape"&&C()}const G="filter",O={paginationDop:document.querySelector(".paginationDop"),pagination:document.querySelector(".tui-pagination"),list:document.querySelector(".product-list"),search:document.querySelector("#search")},Ee=document.getElementById("pagination");let $,_=3,Q;function $e(){const t=localStorage.getItem(G);if(t)try{const e=JSON.parse(t);Q=e.page,$=e.limit}catch(e){console.error("Error updating localStorage:",e)}}function qe(t){let e={totalItems:t,itemsPerPage:$,visiblePages:_,page:Q,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new re(Ee,e).on("beforeMove",Ae)}function Ae(t){const e=localStorage.getItem(G);if(e)try{const s=JSON.parse(e);s.page=Number(`${t.page}`),localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}O.list.innerHTML="",g(),Le()}async function T(t){t<=Number($)?O.pagination.classList.replace("tui-pagination","paginationDop"):($e(),O.pagination.classList.replace("paginationDop","tui-pagination")),$===9||$===8?_=4:_=2}function Le(){let e=document.querySelector(".container-pl").getBoundingClientRect(),s=e.left,o=e.top;scrollTo(s,o),scrollTo({top:600,behavior:"smooth"})}const B={list:document.querySelector(".product-list"),pagination:document.querySelector(".tui-pagination")};let w=[],k;async function g(){document.getElementById("overlay").style.display="flex",Te();const t=await Ce();k=t.data.totalPages*t.data.perPage;const e=X();k<=Number(e)&&B.pagination.classList.replace("tui-pagination","paginationDop"),T(k),qe(k);try{let s;t&&(s=t),w=s.data.results,ke(w)}catch(s){console.error(s)}finally{document.getElementById("overlay").style.display="none"}}function ke(t){const e=localStorage.getItem(P),s=`<div class="error-load">
                <h2 class="not-found-heading">Nothing was found for the selected <span
                        class="green-word">filters...</span>
                </h2>
                <p class="not-found-message">Try adjusting your search parameters or browse our range by other criteria
                    to
                    find
                    the perfect
                    product for
                    you.</p>
            </div>`,o=t.map(({img:r,name:a,popularity:i,category:n,price:u,size:y,_id:d,is10PercentOff:E})=>{const N=n.replace(/_/g," "),L=e?JSON.parse(e).some(se=>se._id===d):!1,te=E?"icon-discount-pl":"visually-hidden",oe=L?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="item-pl" data-id="${d}">
                <div class="background-img-pl">
                    <img src="${r}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${a}</h2>
                <div class="container-info">
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${N}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${y}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${i}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${u}</b>
                    <button aria-label="add basket" class="btn-pl" ${L?"disabled":""}>
                        <svg class="icon-pl">
                            <use href="${oe}"></use>
                        </svg>
                    </button>
                </div>
                <svg class="${te}">
                <use href="${l}#icon-discount"></use>
                </svg>
                </div>
            </li>`}).join("");B.list.innerHTML=o||s}window.addEventListener("load",g);B.list.addEventListener("click",we);function we(t){let e=0;const o=t.target.closest("button");if(o){const a=o.closest("li");if(a){const i=a.dataset.id,n=w.find(u=>u._id===i);R(a),n&&(e=1,J(n,w))}o.setAttribute("disabled",!0)}const r=t.target.closest("li");if(r&&!e){const a=r.dataset.id;M(a)}}function R(t){const e=t.dataset.id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".popularBtn");i.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),o.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".info-div .info-title-link");i.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),r.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".price-container-pl .btn-pl");i.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}})}function J(t,e){const s=Ie(t,e);b.some(r=>r._id===s._id)||(b.push(s),localStorage.setItem(P,JSON.stringify(b)),x())}function Ie(t,e){const s=t._id;return e.find(({_id:o})=>o===s)}const De="filter";function V(){const t=localStorage.getItem(De);try{const e=JSON.parse(t),o={...{},...e};return Object.keys(o).forEach(r=>{o[r]===void 0&&delete o[r]}),o}catch(e){return console.error(e),null}}async function Ce(){document.getElementById("overlay").style.display="flex";const{keyword:t,category:e,page:s,limit:o,byABC:r,byPrice:a,byPopularity:i}=V(),n={keyword:t||"",category:e||"",page:s||1,limit:o||6,byABC:r||"",byPrice:a||"",byPopularity:i||""},y=`https://food-boutique.b.goit.study/api/products?${Object.keys(n).filter(d=>n[d]!==void 0&&n[d]!==null&&n[d]!=="").map(d=>`${d}=${n[d]}`).join("&")}`;try{return await A.get(y)}catch(d){console.error(d)}finally{document.getElementById("overlay").style.display="none"}}function X(){let t;return window.innerWidth<1440&&window.innerWidth>767?t=8:window.innerWidth<768?t=6:t=9,t}function Te(){const t=X(),e=localStorage.getItem("filter"),s=JSON.parse(e);s.limit=Number(t),localStorage.setItem("filter",JSON.stringify(s))}let U=window.innerWidth,z;const W=[768,1440];window.addEventListener("resize",Be);function Be(){clearTimeout(z),z=setTimeout(function(){const t=window.innerWidth;Ne(U,t)&&(U=t,B.list.innerHTML="",g())},250)}function Ne(t,e){return W.some(s=>t<s&&e>=s)||W.some(s=>t>=s&&e<s)}const Oe="https://food-boutique.b.goit.study/api";function _e(){return A.get(`${Oe}/products/categories`).then(({data:t})=>t).catch(t=>t)}const p={selector:document.querySelector(".select__body"),currentfilter:document.querySelector(".select__current"),list:document.querySelector(".product-list"),sort:document.querySelector(".sort-body"),currentSort:document.querySelector(".sort-current"),form:document.querySelector("#search")};_e().then(t=>{const e=xe(t);p.selector.insertAdjacentHTML("afterbegin",e),Me();p.selector.addEventListener("click",Re);}).catch(t=>{ie.Notify.failure(`❌ Oops! Something went wrong! Error ${t} Try reloading the page! ❌`)});function xe(t){return t.map(e=>`<div class="select__item">${e.replace(/_/g," ")}</div>`).join("")}let Me=function(){let t=document.querySelectorAll(".select__header"),e=document.querySelectorAll(".select__item");t.forEach(r=>{r.addEventListener("click",s)}),e.forEach(r=>{r.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let r=this.innerText,a=this.closest(".select"),i=a.querySelector(".select__current");i.innerText=r,a.classList.remove("is-active")}};function Re(t){const e=t.target.innerText.replace(/ /g,"_").replace(/&/g,"%26"),s=localStorage.getItem("filter");if(s)try{const o=JSON.parse(s);t.target.innerText!=="Show all"?(o.category=`${e}`,c.disabled=!1):(o.category=null,o.keyword!==null||o.byABC!==""||o.byPopularity!==""||o.byPrice!==""?c.disabled=!1:c.disabled=!0),o.page=1,localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}T(1),g()}const f=ae("filter");function Je(){const{keyword:t,category:e,page:s,limit:o,byABC:r,byPrice:a,byPopularity:i}=V(),u={keyword:t||null,category:e||null,page:s||1,limit:o||6,byABC:r||"",byPrice:a||"",byPopularity:i||""},y="filter";localStorage.getItem("filter")&&(f.category!==null&&(p.currentfilter.innerText=f.category.replace(/_/g," ").replace(/%26/g,"&")),f.keyword!==null&&(p.form.elements.search.value=f.keyword),f.byABC&&(f.byABC==="false"&&(p.currentSort.innerText="Z to A"),f.byABC==="true"&&(p.currentSort.innerText="A to Z")),f.byPrice&&(f.byPrice==="false"&&(p.currentSort.innerText="Expensive"),f.byPrice==="true"&&(p.currentSort.innerText="Cheap")),f.byPopularity&&(f.byPopularity==="false"&&(p.currentSort.innerText="Popular"),f.byPopularity==="true"&&(p.currentSort.innerText="Not Popular"))),v(y,u),T()}Je();let He=function(){let t=document.querySelectorAll(".sort-header"),e=document.querySelectorAll(".sort-item");t.forEach(r=>{r.addEventListener("click",s)}),e.forEach(r=>{r.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let r=this.innerText,a=this.closest(".sort"),i=a.querySelector(".sort-current");i.innerText=r,a.classList.remove("is-active")}};He();p.sort.addEventListener("click",je);function je(t){const e=t.target.innerText,s=localStorage.getItem("filter");try{const o=JSON.parse(s);e==="A to Z"?(o.byPrice="",o.byPopularity="",o.byABC="",v("filter",o),g()):e==="Z to A"?(o.byPrice="",o.byPopularity="",o.byABC="false",v("filter",o),g(),c.disabled=!1):e==="Cheap"?(o.byABC="",o.byPopularity="",o.byPrice="true",v("filter",o),g(),c.disabled=!1):e==="Expensive"?(o.byABC="",o.byPopularity="",o.byPrice="false",v("filter",o),g(),c.disabled=!1):e==="Popular"?(o.byABC="",o.byPrice="",o.byPopularity="false",v("filter",o),g(),c.disabled=!1):e==="Not Popular"?(o.byABC="",o.byPrice="",o.byPopularity="true",v("filter",o),g(),c.disabled=!1):e==="Reset Sort"&&(o.byPrice="",o.byPopularity="",o.byABC="",v("filter",o),g(),o.keyword!==null||o.category!==null?c.disabled=!1:c.disabled=!0)}catch(o){console.error("Error updating localStorage:",o)}}const c=document.querySelector(".clean-button");c.addEventListener("click",ze);const Ue=localStorage.getItem("filter"),m=JSON.parse(Ue);function ze(){m.page=1,m.keyword=null,m.category=null,m.byPrice="",m.byPopularity="",m.byABC="";const t=m;p.currentSort.innerText="A to Z",p.currentfilter.innerText="Categories",p.form.reset(),v("filter",t),g(),c.disabled=!0}We();function We(){m.keyword!==null||m.byABC!==""||m.byPopularity!==""||m.byPrice!==""||m.category!==null?c.disabled=!1:c.disabled=!0}const S=document.querySelector(".clean-button"),H=document.querySelector("#search");let F;H.addEventListener("input",ee);H.addEventListener("submit",ee);function ee(t){t.preventDefault();const e=H.elements.search.value.trim(),s=localStorage.getItem("filter");(t.type==="input"||t.type==="submit")&&(clearTimeout(F),F=setTimeout(()=>{Fe(e,s),g(),T(1)},1e3))}function Fe(t,e){if(e)try{const s=JSON.parse(e);t===""?(s.keyword=null,s.category!==null||s.byABC!==""||s.byPopularity!==""||s.byPrice!==""?S.disabled=!1:S.disabled=!0):(s.keyword=`${t}`,S.disabled=!1),s.page=1,localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}}async function Ze(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/popular";try{return(await A.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const Ye=document.querySelector(".popular-list");let I=[];async function Ke(){const t=localStorage.getItem(P),e=5;try{I=(await Ze()).slice(0,e);const o=I.map(({img:r,name:a,popularity:i,category:n,size:u,_id:y})=>{const d=t?JSON.parse(t).some(L=>L._id===y):!1,E=d?`${l}#icon-cart`:`${l}#icon-shopping-cart`,N=n.replace(/_/g," ");return`<li class="item-popular" data-id="${y}">
        <div class="background-img-popular">
            <img src="${r}" alt="" class="img-popular" loading="lazy" />
        </div>
        <div class="popular-wrap">
        <h3 class="popular-name">${a}</h3>
        <div class="popular-info">
            <p class="popular-info-items">
                Category: <b class="value-popular">${N}</b>
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
    </li>`}).join("");Ye.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",Ke);const Ge=document.querySelector(".popular-list");Ge.addEventListener("click",Qe);function Qe(t){let e=0;const o=t.target.closest("button");if(o){const a=o.closest("li");if(a){const i=a.dataset.id,n=I.find(u=>u._id===i);R(a),n&&(e=1,J(n,I))}o.setAttribute("disabled",!0)}const r=t.target.closest("li");if(r&&!e){const a=r.dataset.id;M(a)}}async function Ve(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/discount";try{return(await A.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const Xe=document.querySelector(".discount-list");let D=[];async function et(){const t=localStorage.getItem(P),e=2;try{D=(await Ve()).slice(0,e);const o=D.map(({_id:a,name:i,img:n,price:u})=>{const d=(t?JSON.parse(t).some(E=>E._id===a):!1)?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="discount-item" data-id="${a}">
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
  </li>`}).join("");Xe.insertAdjacentHTML("beforeend",o),document.querySelector(".discount-list").addEventListener("click",tt)}catch(s){console.error(s)}}window.addEventListener("load",et);function tt(t){let e=0;const o=t.target.closest("button");if(o){const a=o.closest("li");if(a){const i=a.dataset.id,n=D.find(u=>u._id===i);R(a),n&&(e=1,J(n,D))}o.setAttribute("disabled",!0)}const r=t.target.closest("li");if(r&&!e){const a=r.dataset.id;M(a)}}const Z=document.querySelector(".scroll-up");document.addEventListener("scroll",ne(ot,400));function ot(){const t=window.scrollY,e=document.documentElement.clientHeight;t>e?Z.classList.add("scroll-up-is-hidden"):Z.classList.remove("scroll-up-is-hidden")}
//# sourceMappingURL=commonHelpers2.js.map
