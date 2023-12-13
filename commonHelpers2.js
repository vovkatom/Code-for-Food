import{i as l,c as y,K as h,u as _,s as m,l as oe}from"./assets/footer-81995e60.js";import{a as $,P as se,N as ae,l as re}from"./assets/vendor-4b895a38.js";const ie="https://food-boutique.b.goit.study/api/",ne="products/categories",ce="products",le="products/",de="products/popular",ue="products/discount",pe="subscription",fe="orders",b=$.create({baseURL:ie});class ge{static async getCategories(){return(await b.get(ne)).data}static async getProducts({keyword:e,category:s,page:o,limit:r,sortBy:a}={}){return(await b.get(ce,{params:{keyword:e,category:s,page:o,limit:r,[a==null?void 0:a.key]:a==null?void 0:a.value}})).data}static async getProduct(e){return(await b.get(le+e)).data}static async getPopularProducts(e=5){return(await b.get(de,{params:{limit:e}})).data}static async getDiscountedProducts(){return(await b.get(ue)).data}static async subscribe(e){return(await b.post(pe,{email:e})).data}static async placeOrder(e){const{email:s,products:o}=e;return(await b.post(fe,{email:s,products:o.map(({productId:a,amount:i})=>({productId:a,amount:i}))})).data}}const E=document.querySelector(".modal-background"),H=document.querySelector(".modal");async function x(t){try{E.classList.remove("is-hidden"),document.body.classList.add("is-modal-open"),H.innerHTML=`
      <button type="button" class="modal-close-btn" aria-label="modal close">
        <svg class="modal-icon-close" width="22" height="22">
          <use href="${l}#icon-x-close"></use>
        </svg>
      </button>
    `;const e=await ge.getProduct(t);H.insertAdjacentHTML("beforeend",ye(e)),document.querySelector(".modal-btn").addEventListener("click",()=>{me(e)}),document.querySelector(".modal-btn-remove").addEventListener("click",()=>{be(e)});for(let s=0;s<y.length;s++)y[s]._id===t&&(document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block");document.querySelector(".modal-close-btn").addEventListener("click",I),E.addEventListener("click",Z),document.addEventListener("keydown",Y)}catch(e){console.error("Error fetching product data:",e.message)}finally{}}function ye({img:t,name:e,category:s,size:o,popularity:r,desc:a,price:i}){return`
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
    </div>`}function me(t){y.push(t),localStorage.setItem(h,JSON.stringify(y)),_(),document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block",ve(t)}function be(t){for(let e=0;e<y.length;e++)y[e]._id===t._id&&(y.splice(e,1),localStorage.setItem(h,JSON.stringify(y)),_(),document.querySelector(".modal-btn").style.display="block",document.querySelector(".modal-btn-remove").style.display="none");he(t)}function ve(t){const e=t._id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".popularBtn");i.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),o.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".info-div .info-title-link");i.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),r.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".price-container-pl .btn-pl");i.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}})}function he(t){const e=t._id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".popularBtn");i.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-shopping-cart`),i.removeAttribute("disabled")}}),o.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".info-div .info-title-link");i.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-shopping-cart`),i.removeAttribute("disabled")}}),r.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".price-container-pl .btn-pl");i.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-shopping-cart`),i.removeAttribute("disabled")}})}function Z({target:t}){t===E&&I()}function I(){E.classList.add("is-hidden"),document.body.classList.remove("is-modal-open"),document.querySelector(".modal-close-btn").removeEventListener("click",I),E.removeEventListener("click",Z),document.removeEventListener("keydown",Y)}function Y({key:t}){t==="Escape"&&I()}const K="filter",N={paginationDop:document.querySelector(".paginationDop"),pagination:document.querySelector(".tui-pagination"),list:document.querySelector(".product-list"),search:document.querySelector("#search")},Se=document.getElementById("pagination");let P,O=3,G;function Pe(){const t=localStorage.getItem(K);if(t)try{const e=JSON.parse(t);G=e.page,P=e.limit}catch(e){console.error("Error updating localStorage:",e)}}function Ee(t){let e={totalItems:t,itemsPerPage:P,visiblePages:O,page:G,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new se(Se,e).on("beforeMove",$e)}function $e(t){const e=localStorage.getItem(K);if(e)try{const s=JSON.parse(e);s.page=Number(`${t.page}`),localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}N.list.innerHTML="",f(),qe()}async function D(t){t<=Number(P)?N.pagination.classList.replace("tui-pagination","paginationDop"):(Pe(),N.pagination.classList.replace("paginationDop","tui-pagination")),P===9||P===8?O=4:O=2}function qe(){let e=document.querySelector(".product-list-section").getBoundingClientRect(),s=e.left,o=e.top;scrollTo(s,o),scrollTo({top:600,behavior:"smooth"}),console.log(s,o)}const T={list:document.querySelector(".product-list"),pagination:document.querySelector(".tui-pagination")};let L=[],A;async function f(){document.getElementById("overlay").style.display="flex",De();const t=await Ie();A=t.data.totalPages*t.data.perPage;const e=V();A<=Number(e)&&T.pagination.classList.replace("tui-pagination","paginationDop"),D(A),Ee(A);try{let s;t&&(s=t),L=s.data.results,Ae(L)}catch(s){console.error(s)}finally{document.getElementById("overlay").style.display="none"}}function Ae(t){const e=localStorage.getItem(h),s=`<div class="error-load">
                <h2 class="not-found-heading">Nothing was found for the selected <span
                        class="green-word">filters...</span>
                </h2>
                <p class="not-found-message">Try adjusting your search parameters or browse our range by other criteria
                    to
                    find
                    the perfect
                    product for
                    you.</p>
            </div>`,o=t.map(({img:r,name:a,popularity:i,category:c,price:u,size:g,_id:n,is10PercentOff:S})=>{const C=c.replace(/_/g," "),q=e?JSON.parse(e).some(B=>B._id===n):!1,ee=S||(e?t.some(B=>B.is10PercentOff===!0):!1)?"icon-discount-pl":"visually-hidden",te=q?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="item-pl" data-id="${n}">
                <div class="background-img-pl">
                    <img src="${r}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${a}</h2>
                <div class="container-info">
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${C}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${g}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${i}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${u}</b>
                    <button aria-label="add basket" class="btn-pl" ${q?"disabled":""}>
                        <svg class="icon-pl">
                            <use href="${te}"></use>
                        </svg>
                    </button>
                </div>
                <svg class="${ee}">
                <use href="${l}#icon-discount"></use>
                </svg>
                </div>
            </li>`}).join("");T.list.innerHTML=o||s}window.addEventListener("load",f);T.list.addEventListener("click",Le);function Le(t){let e=0;const o=t.target.closest("button");if(o){const a=o.closest("li");if(a){const i=a.dataset.id,c=L.find(u=>u._id===i);M(a),c&&(e=1,R(c,L))}o.setAttribute("disabled",!0)}const r=t.target.closest("li");if(r&&!e){const a=r.dataset.id;x(a)}}function M(t){const e=t.dataset.id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");s.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".popularBtn");i.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),o.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".info-div .info-title-link");i.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}}),r.forEach(a=>{if(a.dataset.id===e){const i=a.querySelector(".price-container-pl .btn-pl");i.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),i.setAttribute("disabled",!0)}})}function R(t,e){const s=ke(t,e);y.some(r=>r._id===s._id)||(y.push(s),localStorage.setItem(h,JSON.stringify(y)),_())}function ke(t,e){const s=t._id;return e.find(({_id:o})=>o===s)}const we="filter";function Q(){const t=localStorage.getItem(we);try{const e=JSON.parse(t),o={...{},...e};return Object.keys(o).forEach(r=>{o[r]===void 0&&delete o[r]}),o}catch(e){return console.error(e),null}}async function Ie(){document.getElementById("overlay").style.display="flex";const{keyword:t,category:e,page:s,limit:o,byABC:r,byPrice:a,byPopularity:i}=Q(),c={keyword:t||"",category:e||"",page:s||1,limit:o||6,byABC:r||"",byPrice:a||"",byPopularity:i||""},g=`https://food-boutique.b.goit.study/api/products?${Object.keys(c).filter(n=>c[n]!==void 0&&c[n]!==null&&c[n]!=="").map(n=>`${n}=${c[n]}`).join("&")}`;try{return await $.get(g)}catch(n){console.error(n)}finally{document.getElementById("overlay").style.display="none"}}function V(){let t;return window.innerWidth<1440&&window.innerWidth>767?t=8:window.innerWidth<768?t=6:t=9,t}function De(){const t=V(),e=localStorage.getItem("filter"),s=JSON.parse(e);s.limit=Number(t),localStorage.setItem("filter",JSON.stringify(s))}let j=window.innerWidth,U;const z=[768,1440];window.addEventListener("resize",Te);function Te(){clearTimeout(U),U=setTimeout(function(){const t=window.innerWidth;Ce(j,t)&&(j=t,T.list.innerHTML="",f())},250)}function Ce(t,e){return z.some(s=>t<s&&e>=s)||z.some(s=>t>=s&&e<s)}const Be="https://food-boutique.b.goit.study/api";function Ne(){return $.get(`${Be}/products/categories`).then(({data:t})=>t).catch(t=>t)}const p={selector:document.querySelector(".select__body"),currentfilter:document.querySelector(".select__current"),list:document.querySelector(".product-list"),sort:document.querySelector(".sort-body"),currentSort:document.querySelector(".sort-current"),form:document.querySelector("#search")};Ne().then(t=>{const e=Oe(t);p.selector.insertAdjacentHTML("afterbegin",e),_e();p.selector.addEventListener("click",xe);}).catch(t=>{ae.Notify.failure(`❌ Oops! Something went wrong! Error ${t} Try reloading the page! ❌`)});function Oe(t){return t.map(e=>`<div class="select__item">${e.replace(/_/g," ")}</div>`).join("")}let _e=function(){let t=document.querySelectorAll(".select__header"),e=document.querySelectorAll(".select__item");t.forEach(r=>{r.addEventListener("click",s)}),e.forEach(r=>{r.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let r=this.innerText,a=this.closest(".select"),i=a.querySelector(".select__current");i.innerText=r,a.classList.remove("is-active")}};function xe(t){const e=t.target.innerText.replace(/ /g,"_").replace(/&/g,"%26"),s=localStorage.getItem("filter");if(s)try{const o=JSON.parse(s);t.target.innerText!=="Show all"?(o.category=`${e}`,d.disabled=!1):(o.category=null,o.keyword!==null||o.byABC!==""||o.byPopularity!==""||o.byPrice!==""?d.disabled=!1:d.disabled=!0),o.page=1,localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}D(1),f()}function Me(){const{keyword:t,category:e,page:s,limit:o,byABC:r,byPrice:a,byPopularity:i}=Q(),u={keyword:t||null,category:e||null,page:s||1,limit:o||6,byABC:r||"",byPrice:a||"",byPopularity:i||""},g="filter";if(localStorage.getItem("filter")){const n=oe("filter");n.category!==null&&(p.currentfilter.innerText=n.category.replace(/_/g," ").replace(/%26/g,"&")),n.keyword!==null&&(p.form.elements.search.value=n.keyword),n.byABC&&(n.byABC==="false"&&(p.currentSort.innerText="Z to A"),n.byABC==="true"&&(p.currentSort.innerText="A to Z")),n.byPrice&&(n.byPrice==="false"&&(p.currentSort.innerText="Expensive"),n.byPrice==="true"&&(p.currentSort.innerText="Cheap")),n.byPopularity&&(n.byPopularity==="false"&&(p.currentSort.innerText="Popular"),n.byPopularity==="true"&&(p.currentSort.innerText="Not Popular"))}m(g,u),D()}Me();let Re=function(){let t=document.querySelectorAll(".sort-header"),e=document.querySelectorAll(".sort-item");t.forEach(r=>{r.addEventListener("click",s)}),e.forEach(r=>{r.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let r=this.innerText,a=this.closest(".sort"),i=a.querySelector(".sort-current");i.innerText=r,a.classList.remove("is-active")}};Re();p.sort.addEventListener("click",Je);function Je(t){const e=t.target.innerText,s=localStorage.getItem("filter");try{const o=JSON.parse(s);e==="A to Z"?(o.byPrice="",o.byPopularity="",o.byABC="",m("filter",o),f()):e==="Z to A"?(o.byPrice="",o.byPopularity="",o.byABC="false",m("filter",o),f(),d.disabled=!1):e==="Cheap"?(o.byABC="",o.byPopularity="",o.byPrice="true",m("filter",o),f(),d.disabled=!1):e==="Expensive"?(o.byABC="",o.byPopularity="",o.byPrice="false",m("filter",o),f(),d.disabled=!1):e==="Popular"?(o.byABC="",o.byPrice="",o.byPopularity="false",m("filter",o),f(),d.disabled=!1):e==="Not Popular"?(o.byABC="",o.byPrice="",o.byPopularity="true",m("filter",o),f(),d.disabled=!1):e==="Reset All"&&(o.byPrice="",o.byPopularity="",o.byABC="",m("filter",o),f(),o.keyword!==null||o.category!==null?d.disabled=!1:d.disabled=!0)}catch(o){console.error("Error updating localStorage:",o)}}const d=document.querySelector(".clean-button");d.addEventListener("click",He);function He(){const t=localStorage.getItem("filter"),e=JSON.parse(t);e.page=1,e.keyword=null,e.category=null,delete e.byABC,delete e.byPrice,delete e.byPopularity;const s=e;p.currentSort.innerText="A to Z",p.currentfilter.innerText="Categories",p.form.reset(),m("filter",s),f(),d.disabled=!0}const v=document.querySelector(".clean-button"),J=document.querySelector("#search");let W;J.addEventListener("input",X);J.addEventListener("submit",X);function X(t){t.preventDefault();const e=J.elements.search.value.trim(),s=localStorage.getItem("filter");(t.type==="input"||t.type==="submit")&&(clearTimeout(W),W=setTimeout(()=>{je(e,s),f(),D(1)},1e3))}function je(t,e){if(e)try{const s=JSON.parse(e);t===""?(s.keyword=null,s.category!==null||s.byABC!==""||s.byPopularity!==""||s.byPrice!==""?v.disabled=!1:v.disabled=!0):(s.keyword=`${t}`,v.disabled=!1),s.page=1,localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}}async function Ue(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/popular";try{return(await $.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const ze=document.querySelector(".popular-list");let k=[];async function We(){const t=localStorage.getItem(h),e=5;try{k=(await Ue()).slice(0,e);const o=k.map(({img:r,name:a,popularity:i,category:c,size:u,_id:g})=>{const n=t?JSON.parse(t).some(q=>q._id===g):!1,S=n?`${l}#icon-cart`:`${l}#icon-shopping-cart`,C=c.replace(/_/g," ");return`<li class="item-popular" data-id="${g}">
        <div class="background-img-popular">
            <img src="${r}" alt="" class="img-popular" loading="lazy" />
        </div>
        <div class="popular-wrap">
        <h3 class="popular-name">${a}</h3>
        <div class="popular-info">
            <p class="popular-info-items">
                Category: <b class="value-popular">${C}</b>
            </p>
            <p class="popular-info-items">Size: <b class="value-popular">${u}</b></p>
            <p class="popular-info-items">Popularity: <b class="value-popular">${i}</b></p>
        </div>
        </div>
            <button class="popularBtn" aria-label="Add basket" data-_id="${g}" ${n?"disabled":""}>
                <svg class="icon-popular" data-_id="${g}" width="12" height="12">
                    <use class="use-popular" data-_id="${g}"
                      href="${S}"
                    ></use>
                </svg>
            </button>
    </li>`}).join("");ze.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",We);const Fe=document.querySelector(".popular-list");Fe.addEventListener("click",Ze);function Ze(t){let e=0;const o=t.target.closest("button");if(o){const a=o.closest("li");if(a){const i=a.dataset.id,c=k.find(u=>u._id===i);M(a),c&&(e=1,R(c,k))}o.setAttribute("disabled",!0)}const r=t.target.closest("li");if(r&&!e){const a=r.dataset.id;x(a)}}async function Ye(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/discount";try{return(await $.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const Ke=document.querySelector(".discount-list");let w=[];async function Ge(){const t=localStorage.getItem(h),e=2;try{w=(await Ye()).slice(0,e);const o=w.map(({_id:a,name:i,img:c,price:u})=>{const n=(t?JSON.parse(t).some(S=>S._id===a):!1)?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="discount-item" data-id="${a}">
           <svg class="icon-discount" width="64" height="64">
                  <use href="${l}#icon-discount"></use>
                </svg>
    <div class="discount-item-img">
      <img class="discount-img"  src="${c}" alt="Product" loading="lazy" />
    </div>
    <div class="discont-info">
      <p class="info-title">${i}</p>
      <div class="discont-info-dop">
        <p class="info-price">$${u}</p>
        <div class="info-div">
          <button class="info-title-link" aria-label="Price" data-_id="${a}">
            <svg class="img-svg-osnova" data-_id="${a}" width="18" height="18">
              <use class="use" data-_id="${a}"
                href="${n}"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </li>`}).join("");Ke.insertAdjacentHTML("beforeend",o),document.querySelector(".discount-list").addEventListener("click",Qe)}catch(s){console.error(s)}}window.addEventListener("load",Ge);function Qe(t){let e=0;const o=t.target.closest("button");if(o){const a=o.closest("li");if(a){const i=a.dataset.id,c=w.find(u=>u._id===i);M(a),c&&(e=1,R(c,w))}o.setAttribute("disabled",!0)}const r=t.target.closest("li");if(r&&!e){const a=r.dataset.id;x(a)}}const F=document.querySelector(".scroll-up");document.addEventListener("scroll",re(Ve,400));function Ve(){const t=window.scrollY,e=document.documentElement.clientHeight;t>e?F.classList.add("scroll-up-is-hidden"):F.classList.remove("scroll-up-is-hidden")}
//# sourceMappingURL=commonHelpers2.js.map
