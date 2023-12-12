import{i as l,c as g,K as b,u as C,s as f,l as V}from"./assets/footer-7130a4ee.js";import{a as S,P as X,N as ee,l as te}from"./assets/vendor-4b895a38.js";const oe="https://food-boutique.b.goit.study/api/",se="products/categories",ae="products",re="products/",ne="products/popular",ie="products/discount",ce="subscription",le="orders",m=S.create({baseURL:oe});class de{static async getCategories(){return(await m.get(se)).data}static async getProducts({keyword:e,category:s,page:o,limit:r,sortBy:a}={}){return(await m.get(ae,{params:{keyword:e,category:s,page:o,limit:r,[a==null?void 0:a.key]:a==null?void 0:a.value}})).data}static async getProduct(e){return(await m.get(re+e)).data}static async getPopularProducts(e=5){return(await m.get(ne,{params:{limit:e}})).data}static async getDiscountedProducts(){return(await m.get(ie)).data}static async subscribe(e){return(await m.post(ce,{email:e})).data}static async placeOrder(e){const{email:s,products:o}=e;return(await m.post(le,{email:s,products:o.map(({productId:a,amount:n})=>({productId:a,amount:n}))})).data}}const h=document.querySelector(".modal-background"),_=document.querySelector(".modal");async function ue(t){try{h.classList.remove("is-hidden"),document.body.classList.add("is-modal-open"),_.innerHTML=`
      <button type="button" class="modal-close-btn" aria-label="modal close">
        <svg class="modal-icon-close" width="22" height="22">
          <use href="${l}#icon-x-close"></use>
        </svg>
      </button>
    `;const e=await de.getProduct(t);_.insertAdjacentHTML("beforeend",pe(e)),document.querySelector(".modal-btn").addEventListener("click",()=>{ge(e)}),document.querySelector(".modal-btn-remove").addEventListener("click",()=>{ye(e)});for(let s=0;s<g.length;s++)g[s]._id===t&&(document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block");document.querySelector(".modal-close-btn").addEventListener("click",q),h.addEventListener("click",U),document.addEventListener("keydown",z)}catch(e){console.error("Error fetching product data:",e.message)}finally{}}function pe({img:t,name:e,category:s,size:o,popularity:r,desc:a,price:n}){return`
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
        <span>$</span><span class="modal-price">${n}</span>
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
    </div>`}function ge(t){g.push(t),localStorage.setItem(b,JSON.stringify(g)),C(),document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block",fe(t)}function ye(t){for(let e=0;e<g.length;e++)g[e]._id===t._id&&(g.splice(e,1),localStorage.setItem(b,JSON.stringify(g)),C(),document.querySelector(".modal-btn").style.display="block",document.querySelector(".modal-btn-remove").style.display="none");me(t)}function fe(t){const e=t._id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".popularBtn");n.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}}),o.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".info-div .info-title-link");n.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}}),r.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".price-container-pl .btn-pl");n.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}})}function me(t){const e=t._id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".popularBtn");n.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-shopping-cart`),n.removeAttribute("disabled")}}),o.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".info-div .info-title-link");n.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-shopping-cart`),n.removeAttribute("disabled")}}),r.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".price-container-pl .btn-pl");n.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-shopping-cart`),n.removeAttribute("disabled")}})}function U({target:t}){t===h&&q()}function q(){h.classList.add("is-hidden"),document.body.classList.remove("is-modal-open"),document.querySelector(".modal-close-btn").removeEventListener("click",q),h.removeEventListener("click",U),document.removeEventListener("keydown",z)}function z({key:t}){t==="Escape"&&q()}const W="filter",k={paginationDop:document.querySelector(".paginationDop"),pagination:document.querySelector(".tui-pagination"),list:document.querySelector(".product-list"),search:document.querySelector("#search")},be=document.getElementById("pagination");let v,T=3,F;function ve(){const t=localStorage.getItem(W);if(t)try{const e=JSON.parse(t);F=e.page,v=e.limit}catch(e){console.error("Error updating localStorage:",e)}}function he(t){let e={totalItems:t,itemsPerPage:v,visiblePages:T,page:F,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new X(be,e).on("beforeMove",Se)}function Se(t){const e=localStorage.getItem(W);if(e)try{const s=JSON.parse(e);s.page=Number(`${t.page}`),localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}k.list.innerHTML="",u()}async function L(t){t<=Number(v)?k.pagination.classList.replace("tui-pagination","paginationDop"):(ve(),k.pagination.classList.replace("paginationDop","tui-pagination")),v===9||v===8?T=4:T=2}const A={list:document.querySelector(".product-list"),pagination:document.querySelector(".tui-pagination")};let $=[],E;async function u(){document.getElementById("overlay").style.display="flex",we();const t=await Ae();E=t.data.totalPages*t.data.perPage;const e=Z();E<=Number(e)&&A.pagination.classList.replace("tui-pagination","paginationDop"),L(E),he(E);try{let s;t&&(s=t),$=s.data.results,Pe($)}catch(s){console.error(s)}finally{document.getElementById("overlay").style.display="none"}}function Pe(t){const e=localStorage.getItem(b),s=`<div class="error-load">
                <h2 class="not-found-heading">Nothing was found for the selected <span
                        class="green-word">filters...</span>
                </h2>
                <p class="not-found-message">Try adjusting your search parameters or browse our range by other criteria
                    to
                    find
                    the perfect
                    product for
                    you.</p>
            </div>`,o=t.map(({img:r,name:a,popularity:n,category:c,price:y,size:d,_id:i,is10PercentOff:w})=>{const I=c.replace(/_/g," "),P=e?JSON.parse(e).some(D=>D._id===i):!1,G=w||(e?t.some(D=>D.is10PercentOff===!0):!1)?"icon-discount-pl":"visually-hidden",Q=P?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="item-pl" data-id="${i}">
                <div class="background-img-pl">
                    <img src="${r}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${a}</h2>
                <div class="container-info">
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${I}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${d}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${n}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${y}</b>
                    <button aria-label="add basket" class="btn-pl" ${P?"disabled":""}>
                        <svg class="icon-pl">
                            <use href="${Q}"></use>
                        </svg>
                    </button>
                </div>
                <svg class="${G}">
                <use href="${l}#icon-discount"></use>
                </svg>
                </div>
            </li>`}).join("");A.list.innerHTML=o||s}window.addEventListener("load",u);A.list.addEventListener("click",N);function N(t){let e=0;const o=t.target.closest("button");if(o){const a=o.closest("li");if(a){const n=a.dataset.id,c=$.find(y=>y._id===n);Ee(a),c&&(e=1,$e(c,$))}o.setAttribute("disabled",!0)}const r=t.target.closest("li");if(r&&!e){const a=r.dataset.id;ue(a)}}function Ee(t){const e=t.dataset.id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item");s.forEach(r=>{if(r.dataset.id===e){const a=r.querySelector(".popularBtn");a.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),a.setAttribute("disabled",!0)}}),o.forEach(r=>{if(r.dataset.id===e){const a=r.querySelector(".info-div .info-title-link");a.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),a.setAttribute("disabled",!0)}})}function $e(t,e){const s=qe(t,e);g.some(r=>r._id===s._id)||(g.push(s),localStorage.setItem(b,JSON.stringify(g)),C())}function qe(t,e){const s=t._id;return e.find(({_id:o})=>o===s)}const Le="filter";function Y(){const t=localStorage.getItem(Le);try{const e=JSON.parse(t),o={...{},...e};return Object.keys(o).forEach(r=>{o[r]===void 0&&delete o[r]}),o}catch(e){return console.error(e),null}}async function Ae(){document.getElementById("overlay").style.display="flex";const{keyword:t,category:e,page:s,limit:o,byABC:r,byPrice:a,byPopularity:n}=Y(),c={keyword:t||"",category:e||"",page:s||1,limit:o||6,byABC:r||"",byPrice:a||"",byPopularity:n||""},d=`https://food-boutique.b.goit.study/api/products?${Object.keys(c).filter(i=>c[i]!==void 0&&c[i]!==null&&c[i]!=="").map(i=>`${i}=${c[i]}`).join("&")}`;try{return await S.get(d)}catch(i){console.error(i)}finally{document.getElementById("overlay").style.display="none"}}function Z(){let t;return window.innerWidth<1440&&window.innerWidth>767?t=8:window.innerWidth<768?t=6:t=9,t}function we(){const t=Z(),e=localStorage.getItem("filter"),s=JSON.parse(e);s.limit=Number(t),localStorage.setItem("filter",JSON.stringify(s))}let B=window.innerWidth,x;const M=[768,1440];window.addEventListener("resize",Ie);function Ie(){clearTimeout(x),x=setTimeout(function(){const t=window.innerWidth;De(B,t)&&(B=t,A.list.innerHTML="",u())},250)}function De(t,e){return M.some(s=>t<s&&e>=s)||M.some(s=>t>=s&&e<s)}const ke="https://food-boutique.b.goit.study/api";function Te(){return S.get(`${ke}/products/categories`).then(({data:t})=>t).catch(t=>t)}const p={selector:document.querySelector(".select__body"),currentfilter:document.querySelector(".select__current"),list:document.querySelector(".product-list"),sort:document.querySelector(".sort-body"),currentSort:document.querySelector(".sort-current"),form:document.querySelector("#search")};Te().then(t=>{const e=Ce(t);p.selector.insertAdjacentHTML("afterbegin",e),Ne();p.selector.addEventListener("click",Oe);}).catch(t=>{ee.Notify.failure(`❌ Oops! Something went wrong! Error ${t} Try reloading the page! ❌`)});function Ce(t){return t.map(e=>`<div class="select__item">${e.replace(/_/g," ")}</div>`).join("")}let Ne=function(){let t=document.querySelectorAll(".select__header"),e=document.querySelectorAll(".select__item");t.forEach(r=>{r.addEventListener("click",s)}),e.forEach(r=>{r.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let r=this.innerText,a=this.closest(".select"),n=a.querySelector(".select__current");n.innerText=r,a.classList.remove("is-active")}};function Oe(t){const e=t.target.innerText.replace(/ /g,"_").replace(/&/g,"%26"),s=localStorage.getItem("filter");if(s)try{const o=JSON.parse(s);t.target.innerText!=="Show all"?o.category=`${e}`:o.category=null,o.page=1,localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}L(1),u()}function _e(){const{keyword:t,category:e,page:s,limit:o,byABC:r,byPrice:a,byPopularity:n}=Y(),y={keyword:t||null,category:e||null,page:s||1,limit:o||6,byABC:r||"",byPrice:a||"",byPopularity:n||""},d="filter";if(localStorage.getItem("filter")){const i=V("filter");i.category!==null&&(p.currentfilter.innerText=i.category.replace(/_/g," ").replace(/%26/g,"&")),i.keyword!==null&&(p.form.elements.search.value=i.keyword),i.byABC&&(i.byABC==="false"&&(p.currentSort.innerText="Z to A"),i.byABC==="true"&&(p.currentSort.innerText="A to Z")),i.byPrice&&(i.byPrice==="false"&&(p.currentSort.innerText="Expensive"),i.byPrice==="true"&&(p.currentSort.innerText="Cheap")),i.byPopularity&&(i.byPopularity==="false"&&(p.currentSort.innerText="Popular"),i.byPopularity==="true"&&(p.currentSort.innerText="Not Popular"))}f(d,y),L()}_e();let Be=function(){let t=document.querySelectorAll(".sort-header"),e=document.querySelectorAll(".sort-item");t.forEach(r=>{r.addEventListener("click",s)}),e.forEach(r=>{r.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let r=this.innerText,a=this.closest(".sort"),n=a.querySelector(".sort-current");n.innerText=r,a.classList.remove("is-active")}};Be();p.sort.addEventListener("click",xe);function xe(t){const e=t.target.innerText,s=localStorage.getItem("filter");try{const o=JSON.parse(s);e==="A to Z"?(delete o.byPrice,delete o.byPopularity,o.byABC="true",f("filter",o),u()):e==="Z to A"?(delete o.byPrice,delete o.byPopularity,o.byABC="false",f("filter",o),u()):e==="Cheap"?(delete o.byABC,delete o.byPopularity,o.byPrice="true",f("filter",o),u()):e==="Expensive"?(delete o.byABC,delete o.byPopularity,o.byPrice="false",f("filter",o),u()):e==="Popular"?(delete o.byABC,delete o.byPrice,o.byPopularity="false",f("filter",o),u()):e==="Not Popular"?(delete o.byABC,delete o.byPrice,o.byPopularity="true",f("filter",o),u()):e==="Reset All"&&(delete o.byABC,delete o.byPrice,delete o.byPopularity,f("filter",o),u())}catch(o){console.error("Error updating localStorage:",o)}}const O=document.querySelector("#search");let R;O.addEventListener("input",K);O.addEventListener("submit",K);function K(t){t.preventDefault();const e=O.elements.search.value.trim(),s=localStorage.getItem("filter");(t.type==="input"||t.type==="submit")&&(clearTimeout(R),R=setTimeout(()=>{Me(e,s),u(),L(1)},1e3))}function Me(t,e){if(e)try{const s=JSON.parse(e);s.keyword=`${t}`,s.page=1,localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}}async function Re(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/popular";try{return(await S.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const Je=document.querySelector(".popular-list");let J=[];async function He(){const t=localStorage.getItem(b),e=5;try{J=(await Re()).slice(0,e);const o=J.map(({img:r,name:a,popularity:n,category:c,size:y,_id:d})=>{const i=t?JSON.parse(t).some(P=>P._id===d):!1,w=i?`${l}#icon-cart`:`${l}#icon-shopping-cart`,I=c.replace(/_/g," ");return`<li class="item-popular" data-id="${d}">
        <div class="background-img-popular">
            <img src="${r}" alt="" class="img-popular" loading="lazy" />
        </div>
        <div class="popular-wrap">
        <h3 class="popular-name">${a}</h3>
        <div class="popular-info">
            <p class="popular-info-items">
                Category: <b class="value-popular">${I}</b>
            </p>
            <p class="popular-info-items">Size: <b class="value-popular">${y}</b></p>
            <p class="popular-info-items">Popularity: <b class="value-popular">${n}</b></p>
        </div>
        </div>
            <button class="popularBtn" aria-label="Add basket" data-_id="${d}" ${i?"disabled":""}>
                <svg class="icon-popular" data-_id="${d}" width="12" height="12">
                    <use class="use-popular" data-_id="${d}"
                      href="${w}"
                    ></use>
                </svg>
            </button>
    </li>`}).join("");Je.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",He);const je=document.querySelector(".popular-list");je.addEventListener("click",N);async function Ue(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/discount";try{return(await S.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const ze=document.querySelector(".discount-list");let H=[];async function We(){const t=localStorage.getItem(b),e=2;try{H=(await Ue()).slice(0,e);const o=H.map(({_id:r,name:a,img:n,price:c})=>{const d=(t?JSON.parse(t).some(i=>i._id===r):!1)?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="discount-item" data-id="${r}">
           <svg class="icon-discount" width="64" height="64">
                  <use href="${l}#icon-discount"></use>
                </svg>
              </div>
    <div class="discount-item-img">
      <img class="discount-img"  src="${n}" alt="Product" loading="lazy" />
    </div>
    <div class="discont-info">
      <p class="info-title">${a}</p>
      <div class="discont-info-dop">
        <p class="info-price">$${c}</p>
        <div class="info-div">
          <button class="info-title-link" aria-label="Price" data-_id="${r}">
            <svg class="img-svg-osnova" data-_id="${r}" width="18" height="18">
              <use class="use" data-_id="${r}"
                href="${d}"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </li>`}).join("");ze.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",We);const Fe=document.querySelector(".discount-list");Fe.addEventListener("click",N);const j=document.querySelector(".scroll-up");document.addEventListener("scroll",te(Ye,400));function Ye(){const t=window.scrollY,e=document.documentElement.clientHeight;t>e?j.classList.add("scroll-up-is-hidden"):j.classList.remove("scroll-up-is-hidden")}
//# sourceMappingURL=commonHelpers2.js.map
