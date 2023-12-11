import{i as c,c as g,K as v,u as L,s as f,l as Q,a as H}from"./assets/footer-df31535d.js";import{a as S,P as V,N as X}from"./assets/vendor-66af562d.js";const ee="https://food-boutique.b.goit.study/api/",te="products/categories",oe="products",se="products/",ae="products/popular",re="products/discount",ne="subscription",ie="orders",m=S.create({baseURL:ee});class ce{static async getCategories(){return(await m.get(te)).data}static async getProducts({keyword:e,category:s,page:o,limit:a,sortBy:r}={}){return(await m.get(oe,{params:{keyword:e,category:s,page:o,limit:a,[r==null?void 0:r.key]:r==null?void 0:r.value}})).data}static async getProduct(e){return(await m.get(se+e)).data}static async getPopularProducts(e=5){return(await m.get(ae,{params:{limit:e}})).data}static async getDiscountedProducts(){return(await m.get(re)).data}static async subscribe(e){return(await m.post(ne,{email:e})).data}static async placeOrder(e){const{email:s,products:o}=e;return(await m.post(ie,{email:s,products:o.map(({productId:r,amount:i})=>({productId:r,amount:i}))})).data}}const h=document.querySelector(".modal-background"),x=document.querySelector(".modal");async function le(t){try{h.classList.remove("is-hidden"),document.body.classList.add("is-modal-open"),x.innerHTML=`
      <button type="button" class="modal-close-btn" aria-label="modal close">
        <svg class="modal-icon-close" width="22" height="22">
          <use href="${c}#icon-x-close"></use>
        </svg>
      </button>
    `;const e=await ce.getProduct(t);x.insertAdjacentHTML("beforeend",de(e)),document.querySelector(".modal-btn").addEventListener("click",()=>{ue(e)}),document.querySelector(".modal-btn-remove").addEventListener("click",()=>{pe(e)});for(let s=0;s<g.length;s++)g[s]._id===t&&(document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block");document.querySelector(".modal-close-btn").addEventListener("click",w),h.addEventListener("click",U),document.addEventListener("keydown",z)}catch(e){console.error("Error fetching product data:",e.message)}finally{}}function de({img:t,name:e,category:s,size:o,popularity:a,desc:r,price:i}){return`
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
        <use href="${c}#icon-shopping-cart"></use>
      </svg>
    </button>
     <button class="modal-btn-remove" aria-label="add to card">
      <span class="modal-btn-text">Remove from</span>
      <svg class="modal-icon-shop" width="18" height="18">
        <use href="${c}#icon-shopping-cart"></use>
      </svg>
    </button>
      </div>
    </div>`}function ue(t){g.push(t),localStorage.setItem(v,JSON.stringify(g)),L(),document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block"}function pe(t){for(let e=0;e<g.length;e++)g[e]._id===t._id&&(g.splice(e,1),localStorage.setItem(v,JSON.stringify(g)),L(),document.querySelector(".modal-btn").style.display="block",document.querySelector(".modal-btn-remove").style.display="none")}function U({target:t}){t===h&&w()}function w(){h.classList.add("is-hidden"),document.body.classList.remove("is-modal-open"),document.querySelector(".modal-close-btn").removeEventListener("click",w),h.removeEventListener("click",U),document.removeEventListener("keydown",z)}function z({key:t}){t==="Escape"&&w()}const W="filter",T={paginationDop:document.querySelector(".paginationDop"),pagination:document.querySelector(".tui-pagination"),list:document.querySelector(".product-list"),search:document.querySelector("#search")},ge=document.getElementById("pagination");let N,ye=3,F;function fe(){const t=localStorage.getItem(W);if(t)try{const e=JSON.parse(t);F=e.page,N=e.limit}catch(e){console.error("Error updating localStorage:",e)}}function me(t){let e={totalItems:t,itemsPerPage:N,visiblePages:ye,page:F,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new V(ge,e).on("beforeMove",be)}function be(t){const e=localStorage.getItem(W);if(e)try{const s=JSON.parse(e);s.page=Number(`${t.page}`),localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}T.list.innerHTML="",u()}async function O(t){t<=Number(N)?T.pagination.classList.replace("tui-pagination","paginationDop"):(fe(),T.pagination.classList.replace("paginationDop","tui-pagination"))}const _={list:document.querySelector(".product-list")};let E=[],D;async function u(){document.getElementById("overlay").style.display="flex",Ie();const t=await Le();D=t.data.totalPages*t.data.perPage,O(D),me(D);try{let e;t&&(e=t),E=e.data.results,ve(E)}catch(e){console.error(e)}finally{document.getElementById("overlay").style.display="none"}}function ve(t){const e=localStorage.getItem(v),s=`<div class="error-load">
                <h2 class="not-found-heading">Nothing was found for the selected <span
                        class="green-word">filters...</span>
                </h2>
                <p class="not-found-message">Try adjusting your search parameters or browse our range by other criteria
                    to
                    find
                    the perfect
                    product for
                    you.</p>
            </div>`,o=t.map(({img:a,name:r,popularity:i,category:d,price:y,size:l,_id:n,is10PercentOff:I})=>{const k=d.replace(/_/g," "),P=e?JSON.parse(e).some(A=>A._id===n):!1,Y=I||(e?t.some(A=>A.is10PercentOff===!0):!1)?"icon-discount-pl":"visually-hidden",G=P?`${c}#icon-cart`:`${c}#icon-shopping-cart`;return`<li class="item-pl" data-id="${n}">
                <div class="background-img-pl">
                    <img src="${a}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${r}</h2>
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${k}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${l}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${i}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${y}</b>
                    <button aria-label="add basket" class="btn-pl" ${P?"disabled":""}>
                        <svg class="icon-pl">
                            <use href="${G}"></use>
                        </svg>
                    </button>
                </div>
                <svg class="${Y}">
                <use href="${c}#icon-discount"></use>
                </svg>
            </li>`}).join("");_.list.innerHTML=o||s}window.addEventListener("load",u);_.list.addEventListener("click",he);function he(t){let e=0;const o=t.target.closest("button");if(o){const r=o.closest("li");if(r){const d=r.dataset.id,y=E.find(l=>l._id===d);Se(r),y&&(e=1,Pe(y,E))}o.querySelector(".icon-pl use").setAttribute("href",`${c}#icon-cart`),o.setAttribute("disabled",!0)}const a=t.target.closest("li");if(a&&!e){const r=a.dataset.id;le(r)}}function Se(t){const e=t.dataset.id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item");s.forEach(a=>{if(a.dataset.id===e){const r=a.querySelector(".popularBtn");r.querySelector(".icon-popular use").setAttribute("href",`${c}#icon-cart`),r.setAttribute("disabled",!0)}}),o.forEach(a=>{if(a.dataset.id===e){const r=a.querySelector(".info-div .info-title-link");r.querySelector(".img-svg-osnova use").setAttribute("href",`${c}#icon-cart`),r.setAttribute("disabled",!0)}})}function Pe(t,e){const s=$e(t,e);g.some(a=>a._id===s._id)||(g.push(s),localStorage.setItem(v,JSON.stringify(g)),L())}function $e(t,e){const s=t._id;return e.find(({_id:o})=>o===s)}const Ee="filter";function Z(){const t=localStorage.getItem(Ee);try{const e=JSON.parse(t),o={...{},...e};return Object.keys(o).forEach(a=>{o[a]===void 0&&delete o[a]}),o}catch(e){return console.error(e),null}}async function Le(){document.getElementById("overlay").style.display="flex";const{keyword:t,category:e,page:s,limit:o,byABC:a,byPrice:r,byPopularity:i}=Z(),d={keyword:t||"",category:e||"",page:s||1,limit:o||6,byABC:a||"",byPrice:r||"",byPopularity:i||""},l=`https://food-boutique.b.goit.study/api/products?${Object.keys(d).filter(n=>d[n]!==void 0&&d[n]!==null&&d[n]!=="").map(n=>`${n}=${d[n]}`).join("&")}`;try{return await S.get(l)}catch(n){console.error(n)}finally{document.getElementById("overlay").style.display="none"}}function we(){let t;return window.innerWidth<1440&&window.innerWidth>767?t=8:window.innerWidth<768?t=6:t=9,t}function Ie(){const t=we(),e=localStorage.getItem("filter"),s=JSON.parse(e);s.limit=Number(t),localStorage.setItem("filter",JSON.stringify(s))}let M=window.innerWidth,R;const J=[768,1440];window.addEventListener("resize",ke);function ke(){clearTimeout(R),R=setTimeout(function(){const t=window.innerWidth;Ae(M,t)&&(M=t,_.list.innerHTML="",u())},250)}function Ae(t,e){return J.some(s=>t<s&&e>=s)||J.some(s=>t>=s&&e<s)}const De="https://food-boutique.b.goit.study/api";function Te(){return S.get(`${De}/products/categories`).then(({data:t})=>t).catch(t=>t)}const p={selector:document.querySelector(".select__body"),currentfilter:document.querySelector(".select__current"),list:document.querySelector(".product-list"),sort:document.querySelector(".sort-body"),currentSort:document.querySelector(".sort-current"),form:document.querySelector("#search")};Te().then(t=>{const e=qe(t);p.selector.insertAdjacentHTML("afterbegin",e),Ce();p.selector.addEventListener("click",Ne);}).catch(t=>{X.Notify.failure(`❌ Oops! Something went wrong! Error ${t} Try reloading the page! ❌`)});function qe(t){return t.map(e=>`<div class="select__item">${e.replace(/_/g," ")}</div>`).join("")}let Ce=function(){let t=document.querySelectorAll(".select__header"),e=document.querySelectorAll(".select__item");t.forEach(a=>{a.addEventListener("click",s)}),e.forEach(a=>{a.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let a=this.innerText,r=this.closest(".select"),i=r.querySelector(".select__current");i.innerText=a,r.classList.remove("is-active")}};function Ne(t){const e=t.target.innerText.replace(/ /g,"_").replace(/&/g,"%26"),s=localStorage.getItem("filter");if(s)try{const o=JSON.parse(s);t.target.innerText!=="Show all"?o.category=`${e}`:o.category=null,o.page=1,localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}O(1),u()}function Oe(){const{keyword:t,category:e,page:s,limit:o,byABC:a,byPrice:r,byPopularity:i}=Z(),y={keyword:t||null,category:e||null,page:s||1,limit:o||6,byABC:a||"",byPrice:r||"",byPopularity:i||""},l="filter";if(localStorage.getItem("filter")){const n=Q("filter");n.category!==null&&(p.currentfilter.innerText=n.category.replace(/_/g," ").replace(/%26/g,"&")),n.keyword!==null&&(p.form.elements.search.value=n.keyword),n.byABC&&(n.byABC==="false"&&(p.currentSort.innerText="Z to A"),n.byABC==="true"&&(p.currentSort.innerText="A to Z")),n.byPrice&&(n.byPrice==="false"&&(p.currentSort.innerText="Expensive"),n.byPrice==="true"&&(p.currentSort.innerText="Cheap")),n.byPopularity&&(n.byPopularity==="false"&&(p.currentSort.innerText="Popular"),n.byPopularity==="true"&&(p.currentSort.innerText="Not Popular"))}f(l,y)}Oe();let _e=function(){let t=document.querySelectorAll(".sort-header"),e=document.querySelectorAll(".sort-item");t.forEach(a=>{a.addEventListener("click",s)}),e.forEach(a=>{a.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let a=this.innerText,r=this.closest(".sort"),i=r.querySelector(".sort-current");i.innerText=a,r.classList.remove("is-active")}};_e();p.sort.addEventListener("click",Be);function Be(t){const e=t.target.innerText,s=localStorage.getItem("filter");try{const o=JSON.parse(s);e==="A to Z"?(delete o.byPrice,delete o.byPopularity,o.byABC="true",f("filter",o),u()):e==="Z to A"?(delete o.byPrice,delete o.byPopularity,o.byABC="false",f("filter",o),u()):e==="Cheap"?(delete o.byABC,delete o.byPopularity,o.byPrice="true",f("filter",o),u()):e==="Expensive"?(delete o.byABC,delete o.byPopularity,o.byPrice="false",f("filter",o),u()):e==="Popular"?(delete o.byABC,delete o.byPrice,o.byPopularity="false",f("filter",o),u()):e==="Not Popular"?(delete o.byABC,delete o.byPrice,o.byPopularity="true",f("filter",o),u()):e==="Reset All"&&(delete o.byABC,delete o.byPrice,delete o.byPopularity,f("filter",o),u())}catch(o){console.error("Error updating localStorage:",o)}}const B=document.querySelector("#search");let j;B.addEventListener("input",K);B.addEventListener("submit",K);function K(t){t.preventDefault();const e=B.elements.search.value.trim(),s=localStorage.getItem("filter");(t.type==="input"||t.type==="submit")&&(clearTimeout(j),j=setTimeout(()=>{xe(e,s),u(),O(1)},1e3))}function xe(t,e){if(e)try{const s=JSON.parse(e);s.keyword=`${t}`,s.page=1,localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}}async function Me(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/popular";try{return(await S.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const Re=document.querySelector(".popular-list");let q=[];async function Je(){const t=localStorage.getItem(v),e=5;try{q=(await Me()).slice(0,e);const o=q.map(({img:a,name:r,popularity:i,category:d,size:y,_id:l})=>{const n=t?JSON.parse(t).some(P=>P._id===l):!1,I=n?`${c}#icon-cart`:`${c}#icon-shopping-cart`,k=d.replace(/_/g," ");return`<li class="item-popular" data-id="${l}">
        <div class="background-img-popular">
            <img src="${a}" alt="" class="img-popular" loading="lazy" />
        </div>
        <div class="popular-wrap">
        <h3 class="popular-name">${r}</h3>
        <div class="popular-info">
            <p class="popular-info-items">
                Category: <b class="value-popular">${k}</b>
            </p>
            <p class="popular-info-items">Size: <b class="value-popular">${y}</b></p>
            <p class="popular-info-items">Popularity: <b class="value-popular">${i}</b></p>
        </div>
        </div>
            <button class="popularBtn" aria-label="Add basket" data-_id="${l}" ${n?"disabled":""}>
                <svg class="icon-popular" data-_id="${l}" width="12" height="12">
                    <use class="use-popular" data-_id="${l}"
                      href="${I}"
                    ></use>
                </svg>
            </button>
    </li>`}).join("");Re.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",Je);const je=document.querySelector(".popular-list");je.addEventListener("click",He);let b;function He(t){b=t.target.closest(".popularBtn"),t.target.closest(".popularBtn")&&H(t,q),b.querySelector(".icon-popular use").setAttribute("href",`${c}#icon-cart`),b.setAttribute("disabled",!0),b.style.cursor="auto",b.style.background="#6d8434",b.style.border="#6d8434",L()}async function Ue(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/discount";try{return(await S.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const ze=document.querySelector(".discount-list");let C=[];async function We(){const t=localStorage.getItem(v),e=2;try{C=(await Ue()).slice(0,e);const o=C.map(({_id:a,name:r,img:i,price:d})=>{const l=(t?JSON.parse(t).some(n=>n._id===a):!1)?`${c}#icon-cart`:`${c}#icon-shopping-cart`;return`<li class="discount-item" data-id="${a}">
           <svg class="icon-discount" width="64" height="64">
                  <use href="${c}#icon-discount"></use>
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
                href="${l}"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </li>`}).join("");ze.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",We);const Fe=document.querySelector(".discount-list");Fe.addEventListener("click",Ze);let $;function Ze(t){$=t.target.closest(".info-title-link"),t.target.closest(".info-title-link")&&H(t,C),$.querySelector(".img-svg-osnova use").setAttribute("href",`${c}#icon-cart`),$.setAttribute("disabled",!0),$.style.cursor="auto"}
//# sourceMappingURL=commonHelpers2.js.map
