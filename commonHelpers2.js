import{i as l,c as b,K as h,u as q,s as f,l as Q,a as j}from"./assets/footer-0b0ef2db.js";import{a as S,P as V,N as X}from"./assets/vendor-66af562d.js";const ee="https://food-boutique.b.goit.study/api/",te="products/categories",oe="products",se="products/",ae="products/popular",re="products/discount",ne="subscription",ie="orders",y=S.create({baseURL:ee});class ce{static async getCategories(){return(await y.get(te)).data}static async getProducts({keyword:t,category:s,page:o,limit:a,sortBy:r}={}){return(await y.get(oe,{params:{keyword:t,category:s,page:o,limit:a,[r==null?void 0:r.key]:r==null?void 0:r.value}})).data}static async getProduct(t){return(await y.get(se+t)).data}static async getPopularProducts(t=5){return(await y.get(ae,{params:{limit:t}})).data}static async getDiscountedProducts(){return(await y.get(re)).data}static async subscribe(t){return(await y.post(ne,{email:t})).data}static async placeOrder(t){const{email:s,products:o}=t;return(await y.post(ie,{email:s,products:o.map(({productId:r,amount:i})=>({productId:r,amount:i}))})).data}}const v=document.querySelector(".modal-background"),x=document.querySelector(".modal");async function le(e){try{v.classList.remove("is-hidden"),document.body.classList.add("is-modal-open"),x.innerHTML=`
      <button type="button" class="modal-close-btn" aria-label="modal close">
        <svg class="modal-icon-close" width="22" height="22">
          <use href="${l}#icon-x-close"></use>
        </svg>
      </button>
    `;const t=await ce.getProduct(e);x.insertAdjacentHTML("beforeend",de(t)),document.querySelector(".modal-btn").addEventListener("click",()=>{ue(t)}),document.querySelector(".modal-close-btn").addEventListener("click",L),v.addEventListener("click",U),document.addEventListener("keydown",z)}catch(t){console.error("Error fetching product data:",t.message)}finally{}}function de({img:e,name:t,category:s,size:o,popularity:a,desc:r,price:i}){return`
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
            <span class="modal-subtitle-info">${a}</span>
          </div>
        </div>
        <p class="modal-about-product">${r}</p>
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
      </div>
    </div>`}function ue(e){b.push(e),localStorage.setItem(h,JSON.stringify(b)),console.log(e);const t=document.querySelector(".modal-btn-text");console.dir(t),t.innerHTML="Remove from",q()}function U({target:e}){e===v&&L()}function L(){v.classList.add("is-hidden"),document.body.classList.remove("is-modal-open"),document.querySelector(".modal-close-btn").removeEventListener("click",L),v.removeEventListener("click",U),document.removeEventListener("keydown",z)}function z({key:e}){e==="Escape"&&L()}const W="filter",D={paginationDop:document.querySelector(".paginationDop"),pagination:document.querySelector(".tui-pagination"),list:document.querySelector(".product-list"),search:document.querySelector("#search")},pe=document.getElementById("pagination");let N,ge=3,F;function fe(){const e=localStorage.getItem(W);if(e)try{const t=JSON.parse(e);F=t.page,N=t.limit}catch(t){console.error("Error updating localStorage:",t)}}function ye(e){let t={totalItems:e,itemsPerPage:N,visiblePages:ge,page:F,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new V(pe,t).on("beforeMove",me)}function me(e){const t=localStorage.getItem(W);if(t)try{const s=JSON.parse(t);s.page=Number(`${e.page}`),localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}D.list.innerHTML="",u()}async function O(e){e<=Number(N)?D.pagination.classList.replace("tui-pagination","paginationDop"):(fe(),D.pagination.classList.replace("paginationDop","tui-pagination"))}const _={list:document.querySelector(".product-list")};let E=[],A;async function u(){document.getElementById("overlay").style.display="flex",we();const e=await Ee();A=e.data.totalPages*e.data.perPage,O(A),ye(A);try{let t;e&&(t=e),E=t.data.results,be(E)}catch(t){console.error(t)}finally{document.getElementById("overlay").style.display="none"}}function be(e){const t=localStorage.getItem(h),s=`<div class="error-load">
                <h2 class="not-found-heading">Nothing was found for the selected <span
                        class="green-word">filters...</span>
                </h2>
                <p class="not-found-message">Try adjusting your search parameters or browse our range by other criteria
                    to
                    find
                    the perfect
                    product for
                    you.</p>
            </div>`,o=e.map(({img:a,name:r,popularity:i,category:d,price:p,size:c,_id:n,is10PercentOff:w})=>{const I=d.replace(/_/g," "),P=t?JSON.parse(t).some(T=>T._id===n):!1,Y=w||(t?e.some(T=>T.is10PercentOff===!0):!1)?"icon-discount-pl":"visually-hidden",G=P?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="item-pl" data-id="${n}">
                <div class="background-img-pl">
                    <img src="${a}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${r}</h2>
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${I}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${c}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${i}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${p}</b>
                    <button aria-label="add basket" class="btn-pl" ${P?"disabled":""}>
                        <svg class="icon-pl">
                            <use href="${G}"></use>
                        </svg>
                    </button>
                </div>
                <svg class="${Y}">
                <use href="${l}#icon-discount"></use>
                </svg>
            </li>`}).join("");_.list.innerHTML=o||s}window.addEventListener("load",u);_.list.addEventListener("click",ve);function ve(e){let t=0;const o=e.target.closest("button");if(o){const r=o.closest("li");if(r){const d=r.dataset.id,p=E.find(c=>c._id===d);he(r),p&&(t=1,Se(p,E))}o.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),o.setAttribute("disabled",!0)}const a=e.target.closest("li");if(a&&!t){const r=a.dataset.id;le(r)}}function he(e){const t=e.dataset.id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item");s.forEach(a=>{if(a.dataset.id===t){const r=a.querySelector(".popularBtn");r.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),r.setAttribute("disabled",!0)}}),o.forEach(a=>{if(a.dataset.id===t){const r=a.querySelector(".info-div .info-title-link");r.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),r.setAttribute("disabled",!0)}})}function Se(e,t){const s=Pe(e,t);b.some(a=>a._id===s._id)||(b.push(s),localStorage.setItem(h,JSON.stringify(b)),q())}function Pe(e,t){const s=e._id;return t.find(({_id:o})=>o===s)}const $e="filter";function Z(){const e=localStorage.getItem($e);try{const t=JSON.parse(e),o={...{},...t};return Object.keys(o).forEach(a=>{o[a]===void 0&&delete o[a]}),o}catch(t){return console.error(t),null}}async function Ee(){document.getElementById("overlay").style.display="flex";const{keyword:e,category:t,page:s,limit:o,byABC:a,byPrice:r,byPopularity:i}=Z(),d={keyword:e||"",category:t||"",page:s||1,limit:o||6,byABC:a||"",byPrice:r||"",byPopularity:i||""},c=`https://food-boutique.b.goit.study/api/products?${Object.keys(d).filter(n=>d[n]!==void 0&&d[n]!==null&&d[n]!=="").map(n=>`${n}=${d[n]}`).join("&")}`;try{return await S.get(c)}catch(n){console.error(n)}finally{document.getElementById("overlay").style.display="none"}}function Le(){let e;return window.innerWidth<1440&&window.innerWidth>767?e=8:window.innerWidth<768?e=6:e=9,e}function we(){const e=Le(),t=localStorage.getItem("filter"),s=JSON.parse(t);s.limit=Number(e),localStorage.setItem("filter",JSON.stringify(s))}let M=window.innerWidth,R;const H=[768,1440];window.addEventListener("resize",Ie);function Ie(){clearTimeout(R),R=setTimeout(function(){const e=window.innerWidth;Te(M,e)&&(M=e,_.list.innerHTML="",u())},250)}function Te(e,t){return H.some(s=>e<s&&t>=s)||H.some(s=>e>=s&&t<s)}const Ae="https://food-boutique.b.goit.study/api";function De(){return S.get(`${Ae}/products/categories`).then(({data:e})=>e).catch(e=>e)}const g={selector:document.querySelector(".select__body"),currentfilter:document.querySelector(".select__current"),list:document.querySelector(".product-list"),sort:document.querySelector(".sort-body"),currentSort:document.querySelector(".sort-current"),form:document.querySelector("#search")};De().then(e=>{const t=ke(e);g.selector.insertAdjacentHTML("afterbegin",t),Ce();g.selector.addEventListener("click",qe);}).catch(e=>{X.Notify.failure(`❌ Oops! Something went wrong! Error ${e} Try reloading the page! ❌`)});function ke(e){return e.map(t=>`<div class="select__item">${t.replace(/_/g," ")}</div>`).join("")}let Ce=function(){let e=document.querySelectorAll(".select__header"),t=document.querySelectorAll(".select__item");e.forEach(a=>{a.addEventListener("click",s)}),t.forEach(a=>{a.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let a=this.innerText,r=this.closest(".select"),i=r.querySelector(".select__current");i.innerText=a,r.classList.remove("is-active")}};function qe(e){const t=e.target.innerText.replace(/ /g,"_").replace(/&/g,"%26"),s=localStorage.getItem("filter");if(s)try{const o=JSON.parse(s);e.target.innerText!=="Show all"?o.category=`${t}`:o.category=null,o.page=1,localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}O(1),u()}function Ne(){const{keyword:e,category:t,page:s,limit:o,byABC:a,byPrice:r,byPopularity:i}=Z(),p={keyword:e||null,category:t||null,page:s||1,limit:o||6,byABC:a||"",byPrice:r||"",byPopularity:i||""},c="filter";if(console.log(p),localStorage.getItem("filter")){const n=Q("filter");n.category!==null&&(g.currentfilter.innerText=n.category.replace(/_/g," ").replace(/%26/g,"&")),n.keyword!==null&&(g.form.elements.search.value=n.keyword),n.byABC&&(n.byABC==="false"&&(g.currentSort.innerText="Z to A"),n.byABC==="true"&&(g.currentSort.innerText="A to Z")),n.byPrice&&(n.byPrice==="false"&&(g.currentSort.innerText="Expensive"),n.byPrice==="true"&&(g.currentSort.innerText="Cheap")),n.byPopularity&&(n.byPopularity==="false"&&(g.currentSort.innerText="Popular"),n.byPopularity==="true"&&(g.currentSort.innerText="Not Popular"))}f(c,p)}Ne();let Oe=function(){let e=document.querySelectorAll(".sort-header"),t=document.querySelectorAll(".sort-item");e.forEach(a=>{a.addEventListener("click",s)}),t.forEach(a=>{a.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let a=this.innerText,r=this.closest(".sort"),i=r.querySelector(".sort-current");i.innerText=a,r.classList.remove("is-active")}};Oe();g.sort.addEventListener("click",_e);function _e(e){const t=e.target.innerText,s=localStorage.getItem("filter");try{const o=JSON.parse(s);t==="A to Z"?(delete o.byPrice,delete o.byPopularity,o.byABC="true",f("filter",o),u()):t==="Z to A"?(delete o.byPrice,delete o.byPopularity,o.byABC="false",f("filter",o),u()):t==="Cheap"?(delete o.byABC,delete o.byPopularity,o.byPrice="true",f("filter",o),u()):t==="Expensive"?(delete o.byABC,delete o.byPopularity,o.byPrice="false",f("filter",o),u()):t==="Popular"?(delete o.byABC,delete o.byPrice,o.byPopularity="false",f("filter",o),u()):t==="Not Popular"?(delete o.byABC,delete o.byPrice,o.byPopularity="true",f("filter",o),u()):t==="Reset All"&&(delete o.byABC,delete o.byPrice,delete o.byPopularity,f("filter",o),u())}catch(o){console.error("Error updating localStorage:",o)}}const B=document.querySelector("#search");let J;B.addEventListener("input",K);B.addEventListener("submit",K);function K(e){e.preventDefault();const t=B.elements.search.value.trim(),s=localStorage.getItem("filter");(e.type==="input"||e.type==="submit")&&(clearTimeout(J),J=setTimeout(()=>{Be(t,s),u(),O(1)},1e3))}function Be(e,t){if(t)try{const s=JSON.parse(t);s.keyword=`${e}`,s.page=1,localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}}async function xe(){document.getElementById("overlay").style.display="flex";const e="https://food-boutique.b.goit.study/api/products/popular";try{return(await S.get(e)).data}catch(t){throw t}finally{document.getElementById("overlay").style.display="none"}}const Me=document.querySelector(".popular-list");let k=[];async function Re(){const e=localStorage.getItem(h),t=5;try{k=(await xe()).slice(0,t);const o=k.map(({img:a,name:r,popularity:i,category:d,size:p,_id:c})=>{const n=e?JSON.parse(e).some(P=>P._id===c):!1,w=n?`${l}#icon-cart`:`${l}#icon-shopping-cart`,I=d.replace(/_/g," ");return`<li class="item-popular" data-id="${c}">
        <div class="background-img-popular">
            <img src="${a}" alt="" class="img-popular" loading="lazy" />
        </div>
        <div class="popular-wrap">
        <h3 class="popular-name">${r}</h3>
        <div class="popular-info">
            <p class="popular-info-items">
                Category: <b class="value-popular">${I}</b>
            </p>
            <p class="popular-info-items">Size: <b class="value-popular">${p}</b></p>
            <p class="popular-info-items">Popularity: <b class="value-popular">${i}</b></p>
        </div>
        </div>
            <button class="popularBtn" aria-label="Add basket" data-_id="${c}" ${n?"disabled":""}>
                <svg class="icon-popular" data-_id="${c}" width="12" height="12">
                    <use class="use-popular" data-_id="${c}"
                      href="${w}"
                    ></use>
                </svg>
            </button>
    </li>`}).join("");Me.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",Re);const He=document.querySelector(".popular-list");He.addEventListener("click",Je);let m;function Je(e){m=e.target.closest(".popularBtn"),e.target.closest(".popularBtn")&&j(e,k),m.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),m.setAttribute("disabled",!0),m.style.cursor="auto",m.style.background="#6d8434",m.style.border="#6d8434",q()}async function je(){document.getElementById("overlay").style.display="flex";const e="https://food-boutique.b.goit.study/api/products/discount";try{return(await S.get(e)).data}catch(t){throw t}finally{document.getElementById("overlay").style.display="none"}}const Ue=document.querySelector(".discount-list");let C=[];async function ze(){const e=localStorage.getItem(h),t=2;try{C=(await je()).slice(0,t);const o=C.map(({_id:a,name:r,img:i,price:d})=>{const c=(e?JSON.parse(e).some(n=>n._id===a):!1)?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="discount-item" data-id="${a}">
           <svg class="icon-discount" width="64" height="64">
                  <use href="${l}#icon-discount"></use>
                </svg>
              </div>
    <div class="discount-item-img">
      <img class="discount-img"  src="${i}" alt="Product" loading="lazy" />
    </div>
    <div class="discont-info">
      <p class="info-title">${r}</p>
      <div class="discont-info-dop">
        <p class="info-price">$${d}</p>
        <div class="info-div">
          <button class="info-title-link" aria-label="Price" data-_id="${a}">
            <svg class="img-svg-osnova" data-_id="${a}" width="18" height="18">
              <use class="use" data-_id="${a}"
                href="${c}"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </li>`}).join("");Ue.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",ze);const We=document.querySelector(".discount-list");We.addEventListener("click",Fe);let $;function Fe(e){$=e.target.closest(".info-title-link"),e.target.closest(".info-title-link")&&j(e,C),$.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),$.setAttribute("disabled",!0),$.style.cursor="auto"}
//# sourceMappingURL=commonHelpers2.js.map
