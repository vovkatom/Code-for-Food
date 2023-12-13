import{i as l,c as g,K as h,u as O,s as m,l as ee}from"./assets/footer-b83dbc79.js";import{a as E,P as te,N as oe,l as se}from"./assets/vendor-4b895a38.js";const ae="https://food-boutique.b.goit.study/api/",re="products/categories",ne="products",ie="products/",ce="products/popular",le="products/discount",de="subscription",ue="orders",b=E.create({baseURL:ae});class pe{static async getCategories(){return(await b.get(re)).data}static async getProducts({keyword:e,category:o,page:s,limit:r,sortBy:a}={}){return(await b.get(ne,{params:{keyword:e,category:o,page:s,limit:r,[a==null?void 0:a.key]:a==null?void 0:a.value}})).data}static async getProduct(e){return(await b.get(ie+e)).data}static async getPopularProducts(e=5){return(await b.get(ce,{params:{limit:e}})).data}static async getDiscountedProducts(){return(await b.get(le)).data}static async subscribe(e){return(await b.post(de,{email:e})).data}static async placeOrder(e){const{email:o,products:s}=e;return(await b.post(ue,{email:o,products:s.map(({productId:a,amount:n})=>({productId:a,amount:n}))})).data}}const P=document.querySelector(".modal-background"),x=document.querySelector(".modal");async function fe(t){try{P.classList.remove("is-hidden"),document.body.classList.add("is-modal-open"),x.innerHTML=`
      <button type="button" class="modal-close-btn" aria-label="modal close">
        <svg class="modal-icon-close" width="22" height="22">
          <use href="${l}#icon-x-close"></use>
        </svg>
      </button>
    `;const e=await pe.getProduct(t);x.insertAdjacentHTML("beforeend",ge(e)),document.querySelector(".modal-btn").addEventListener("click",()=>{ye(e)}),document.querySelector(".modal-btn-remove").addEventListener("click",()=>{me(e)});for(let o=0;o<g.length;o++)g[o]._id===t&&(document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block");document.querySelector(".modal-close-btn").addEventListener("click",w),P.addEventListener("click",W),document.addEventListener("keydown",F)}catch(e){console.error("Error fetching product data:",e.message)}finally{}}function ge({img:t,name:e,category:o,size:s,popularity:r,desc:a,price:n}){return`
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
              ${o.replaceAll("_"," ")}
            </span>
          </div>
          <div>
            <span class="modal-subtitle">Size:</span>
            <span class="modal-subtitle-info">${s}</span>
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
    </div>`}function ye(t){g.push(t),localStorage.setItem(h,JSON.stringify(g)),O(),document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block",be(t)}function me(t){for(let e=0;e<g.length;e++)g[e]._id===t._id&&(g.splice(e,1),localStorage.setItem(h,JSON.stringify(g)),O(),document.querySelector(".modal-btn").style.display="block",document.querySelector(".modal-btn-remove").style.display="none");ve(t)}function be(t){const e=t._id,o=document.querySelectorAll(".popular-list .item-popular"),s=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");o.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".popularBtn");n.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}}),s.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".info-div .info-title-link");n.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}}),r.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".price-container-pl .btn-pl");n.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}})}function ve(t){const e=t._id,o=document.querySelectorAll(".popular-list .item-popular"),s=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");o.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".popularBtn");n.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-shopping-cart`),n.removeAttribute("disabled")}}),s.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".info-div .info-title-link");n.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-shopping-cart`),n.removeAttribute("disabled")}}),r.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".price-container-pl .btn-pl");n.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-shopping-cart`),n.removeAttribute("disabled")}})}function W({target:t}){t===P&&w()}function w(){P.classList.add("is-hidden"),document.body.classList.remove("is-modal-open"),document.querySelector(".modal-close-btn").removeEventListener("click",w),P.removeEventListener("click",W),document.removeEventListener("keydown",F)}function F({key:t}){t==="Escape"&&w()}const Z="filter",C={paginationDop:document.querySelector(".paginationDop"),pagination:document.querySelector(".tui-pagination"),list:document.querySelector(".product-list"),search:document.querySelector("#search")},he=document.getElementById("pagination");let S,N=3,Y;function Se(){const t=localStorage.getItem(Z);if(t)try{const e=JSON.parse(t);Y=e.page,S=e.limit}catch(e){console.error("Error updating localStorage:",e)}}function Pe(t){let e={totalItems:t,itemsPerPage:S,visiblePages:N,page:Y,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new te(he,e).on("beforeMove",Ee)}function Ee(t){const e=localStorage.getItem(Z);if(e)try{const o=JSON.parse(e);o.page=Number(`${t.page}`),localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}C.list.innerHTML="",f(),$e()}async function L(t){t<=Number(S)?C.pagination.classList.replace("tui-pagination","paginationDop"):(Se(),C.pagination.classList.replace("paginationDop","tui-pagination")),S===9||S===8?N=4:N=2}function $e(){let e=document.querySelector(".product-list-section").getBoundingClientRect(),o=e.left,s=e.top;scrollTo(o,s),scrollTo({top:600,behavior:"smooth"}),console.log(o,s)}const I={list:document.querySelector(".product-list"),pagination:document.querySelector(".tui-pagination")};let A=[],q;async function f(){document.getElementById("overlay").style.display="flex",De();const t=await ke();q=t.data.totalPages*t.data.perPage;const e=G();q<=Number(e)&&I.pagination.classList.replace("tui-pagination","paginationDop"),L(q),Pe(q);try{let o;t&&(o=t),A=o.data.results,qe(A)}catch(o){console.error(o)}finally{document.getElementById("overlay").style.display="none"}}function qe(t){const e=localStorage.getItem(h),o=`<div class="error-load">
                <h2 class="not-found-heading">Nothing was found for the selected <span
                        class="green-word">filters...</span>
                </h2>
                <p class="not-found-message">Try adjusting your search parameters or browse our range by other criteria
                    to
                    find
                    the perfect
                    product for
                    you.</p>
            </div>`,s=t.map(({img:r,name:a,popularity:n,category:c,price:y,size:p,_id:i,is10PercentOff:k})=>{const D=c.replace(/_/g," "),$=e?JSON.parse(e).some(T=>T._id===i):!1,V=k||(e?t.some(T=>T.is10PercentOff===!0):!1)?"icon-discount-pl":"visually-hidden",X=$?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="item-pl" data-id="${i}">
                <div class="background-img-pl">
                    <img src="${r}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${a}</h2>
                <div class="container-info">
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${D}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${p}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${n}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${y}</b>
                    <button aria-label="add basket" class="btn-pl" ${$?"disabled":""}>
                        <svg class="icon-pl">
                            <use href="${X}"></use>
                        </svg>
                    </button>
                </div>
                <svg class="${V}">
                <use href="${l}#icon-discount"></use>
                </svg>
                </div>
            </li>`}).join("");I.list.innerHTML=s||o}window.addEventListener("load",f);I.list.addEventListener("click",_);function _(t){let e=0;const s=t.target.closest("button");if(s){const a=s.closest("li");if(a){const n=a.dataset.id,c=A.find(y=>y._id===n);Ae(a),c&&(e=1,we(c,A))}s.setAttribute("disabled",!0)}const r=t.target.closest("li");if(r&&!e){const a=r.dataset.id;fe(a)}}function Ae(t){const e=t.dataset.id,o=document.querySelectorAll(".popular-list .item-popular"),s=document.querySelectorAll(".discount-list .discount-item"),r=document.querySelectorAll(".products .item-pl");o.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".popularBtn");n.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}}),s.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".info-div .info-title-link");n.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}}),r.forEach(a=>{if(a.dataset.id===e){const n=a.querySelector(".price-container-pl .btn-pl");n.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}})}function we(t,e){const o=Le(t,e);g.some(r=>r._id===o._id)||(g.push(o),localStorage.setItem(h,JSON.stringify(g)),O())}function Le(t,e){const o=t._id;return e.find(({_id:s})=>s===o)}const Ie="filter";function K(){const t=localStorage.getItem(Ie);try{const e=JSON.parse(t),s={...{},...e};return Object.keys(s).forEach(r=>{s[r]===void 0&&delete s[r]}),s}catch(e){return console.error(e),null}}async function ke(){document.getElementById("overlay").style.display="flex";const{keyword:t,category:e,page:o,limit:s,byABC:r,byPrice:a,byPopularity:n}=K(),c={keyword:t||"",category:e||"",page:o||1,limit:s||6,byABC:r||"",byPrice:a||"",byPopularity:n||""},p=`https://food-boutique.b.goit.study/api/products?${Object.keys(c).filter(i=>c[i]!==void 0&&c[i]!==null&&c[i]!=="").map(i=>`${i}=${c[i]}`).join("&")}`;try{return await E.get(p)}catch(i){console.error(i)}finally{document.getElementById("overlay").style.display="none"}}function G(){let t;return window.innerWidth<1440&&window.innerWidth>767?t=8:window.innerWidth<768?t=6:t=9,t}function De(){const t=G(),e=localStorage.getItem("filter"),o=JSON.parse(e);o.limit=Number(t),localStorage.setItem("filter",JSON.stringify(o))}let M=window.innerWidth,R;const J=[768,1440];window.addEventListener("resize",Te);function Te(){clearTimeout(R),R=setTimeout(function(){const t=window.innerWidth;Ce(M,t)&&(M=t,I.list.innerHTML="",f())},250)}function Ce(t,e){return J.some(o=>t<o&&e>=o)||J.some(o=>t>=o&&e<o)}const Ne="https://food-boutique.b.goit.study/api";function Oe(){return E.get(`${Ne}/products/categories`).then(({data:t})=>t).catch(t=>t)}const u={selector:document.querySelector(".select__body"),currentfilter:document.querySelector(".select__current"),list:document.querySelector(".product-list"),sort:document.querySelector(".sort-body"),currentSort:document.querySelector(".sort-current"),form:document.querySelector("#search")};Oe().then(t=>{const e=_e(t);u.selector.insertAdjacentHTML("afterbegin",e),Be();u.selector.addEventListener("click",xe);}).catch(t=>{oe.Notify.failure(`❌ Oops! Something went wrong! Error ${t} Try reloading the page! ❌`)});function _e(t){return t.map(e=>`<div class="select__item">${e.replace(/_/g," ")}</div>`).join("")}let Be=function(){let t=document.querySelectorAll(".select__header"),e=document.querySelectorAll(".select__item");t.forEach(r=>{r.addEventListener("click",o)}),e.forEach(r=>{r.addEventListener("click",s)});function o(){this.parentElement.classList.toggle("is-active")}function s(){let r=this.innerText,a=this.closest(".select"),n=a.querySelector(".select__current");n.innerText=r,a.classList.remove("is-active")}};function xe(t){const e=t.target.innerText.replace(/ /g,"_").replace(/&/g,"%26"),o=localStorage.getItem("filter");if(o)try{const s=JSON.parse(o);t.target.innerText!=="Show all"?(s.category=`${e}`,d.disabled=!1):(s.category=null,s.keyword!==null||s.byABC!==""||s.byPopularity!==""||s.byPrice!==""?d.disabled=!1:d.disabled=!0),s.page=1,localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}L(1),f()}function Me(){const{keyword:t,category:e,page:o,limit:s,byABC:r,byPrice:a,byPopularity:n}=K(),y={keyword:t||null,category:e||null,page:o||1,limit:s||6,byABC:r||"",byPrice:a||"",byPopularity:n||""},p="filter";if(localStorage.getItem("filter")){const i=ee("filter");i.category!==null&&(u.currentfilter.innerText=i.category.replace(/_/g," ").replace(/%26/g,"&")),i.keyword!==null&&(u.form.elements.search.value=i.keyword),i.byABC&&(i.byABC==="false"&&(u.currentSort.innerText="Z to A"),i.byABC==="true"&&(u.currentSort.innerText="A to Z")),i.byPrice&&(i.byPrice==="false"&&(u.currentSort.innerText="Expensive"),i.byPrice==="true"&&(u.currentSort.innerText="Cheap")),i.byPopularity&&(i.byPopularity==="false"&&(u.currentSort.innerText="Popular"),i.byPopularity==="true"&&(u.currentSort.innerText="Not Popular"))}m(p,y),L()}Me();let Re=function(){let t=document.querySelectorAll(".sort-header"),e=document.querySelectorAll(".sort-item");t.forEach(r=>{r.addEventListener("click",o)}),e.forEach(r=>{r.addEventListener("click",s)});function o(){this.parentElement.classList.toggle("is-active")}function s(){let r=this.innerText,a=this.closest(".sort"),n=a.querySelector(".sort-current");n.innerText=r,a.classList.remove("is-active")}};Re();u.sort.addEventListener("click",Je);function Je(t){const e=t.target.innerText,o=localStorage.getItem("filter");try{const s=JSON.parse(o);e==="A to Z"?(s.byPrice="",s.byPopularity="",s.byABC="",m("filter",s),f()):e==="Z to A"?(s.byPrice="",s.byPopularity="",s.byABC="false",m("filter",s),f(),d.disabled=!1):e==="Cheap"?(s.byABC="",s.byPopularity="",s.byPrice="true",m("filter",s),f(),d.disabled=!1):e==="Expensive"?(s.byABC="",s.byPopularity="",s.byPrice="false",m("filter",s),f(),d.disabled=!1):e==="Popular"?(s.byABC="",s.byPrice="",s.byPopularity="false",m("filter",s),f(),d.disabled=!1):e==="Not Popular"?(s.byABC="",s.byPrice="",s.byPopularity="true",m("filter",s),f(),d.disabled=!1):e==="Reset All"&&(s.byPrice="",s.byPopularity="",s.byABC="",m("filter",s),f(),s.keyword!==null||s.category!==null?d.disabled=!1:d.disabled=!0)}catch(s){console.error("Error updating localStorage:",s)}}const d=document.querySelector(".clean-button");d.addEventListener("click",He);function He(){const t=localStorage.getItem("filter"),e=JSON.parse(t);e.page=1,e.keyword=null,e.category=null,delete e.byABC,delete e.byPrice,delete e.byPopularity;const o=e;u.currentSort.innerText="A to Z",u.currentfilter.innerText="Categories",u.form.reset(),m("filter",o),f(),d.disabled=!0}const v=document.querySelector(".clean-button"),B=document.querySelector("#search");let H;B.addEventListener("input",Q);B.addEventListener("submit",Q);function Q(t){t.preventDefault();const e=B.elements.search.value.trim(),o=localStorage.getItem("filter");(t.type==="input"||t.type==="submit")&&(clearTimeout(H),H=setTimeout(()=>{je(e,o),f(),L(1)},1e3))}function je(t,e){if(e)try{const o=JSON.parse(e);t===""?(o.keyword=null,o.category!==null||o.byABC!==""||o.byPopularity!==""||o.byPrice!==""?v.disabled=!1:v.disabled=!0):(o.keyword=`${t}`,v.disabled=!1),o.page=1,localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}}async function Ue(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/popular";try{return(await E.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const ze=document.querySelector(".popular-list");let j=[];async function We(){const t=localStorage.getItem(h),e=5;try{j=(await Ue()).slice(0,e);const s=j.map(({img:r,name:a,popularity:n,category:c,size:y,_id:p})=>{const i=t?JSON.parse(t).some($=>$._id===p):!1,k=i?`${l}#icon-cart`:`${l}#icon-shopping-cart`,D=c.replace(/_/g," ");return`<li class="item-popular" data-id="${p}">
        <div class="background-img-popular">
            <img src="${r}" alt="" class="img-popular" loading="lazy" />
        </div>
        <div class="popular-wrap">
        <h3 class="popular-name">${a}</h3>
        <div class="popular-info">
            <p class="popular-info-items">
                Category: <b class="value-popular">${D}</b>
            </p>
            <p class="popular-info-items">Size: <b class="value-popular">${y}</b></p>
            <p class="popular-info-items">Popularity: <b class="value-popular">${n}</b></p>
        </div>
        </div>
            <button class="popularBtn" aria-label="Add basket" data-_id="${p}" ${i?"disabled":""}>
                <svg class="icon-popular" data-_id="${p}" width="12" height="12">
                    <use class="use-popular" data-_id="${p}"
                      href="${k}"
                    ></use>
                </svg>
            </button>
    </li>`}).join("");ze.insertAdjacentHTML("beforeend",s)}catch(o){console.error(o)}}window.addEventListener("load",We);const Fe=document.querySelector(".popular-list");Fe.addEventListener("click",_);async function Ze(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/discount";try{return(await E.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const Ye=document.querySelector(".discount-list");let U=[];async function Ke(){const t=localStorage.getItem(h),e=2;try{U=(await Ze()).slice(0,e);const s=U.map(({_id:r,name:a,img:n,price:c})=>{const p=(t?JSON.parse(t).some(i=>i._id===r):!1)?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="discount-item" data-id="${r}">
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
                href="${p}"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </li>`}).join("");Ye.insertAdjacentHTML("beforeend",s)}catch(o){console.error(o)}}window.addEventListener("load",Ke);const Ge=document.querySelector(".discount-list");Ge.addEventListener("click",_);const z=document.querySelector(".scroll-up");document.addEventListener("scroll",se(Qe,400));function Qe(){const t=window.scrollY,e=document.documentElement.clientHeight;t>e?z.classList.add("scroll-up-is-hidden"):z.classList.remove("scroll-up-is-hidden")}
//# sourceMappingURL=commonHelpers2.js.map
