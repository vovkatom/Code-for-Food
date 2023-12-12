import{i as d,c as g,K as b,u as T,s as m,l as Q}from"./assets/footer-8ae378de.js";import{a as S,P as V,N as X,l as ee}from"./assets/vendor-4b895a38.js";const te="https://food-boutique.b.goit.study/api/",oe="products/categories",se="products",ae="products/",re="products/popular",ne="products/discount",ce="subscription",ie="orders",f=S.create({baseURL:te});class le{static async getCategories(){return(await f.get(oe)).data}static async getProducts({keyword:e,category:s,page:o,limit:a,sortBy:r}={}){return(await f.get(se,{params:{keyword:e,category:s,page:o,limit:a,[r==null?void 0:r.key]:r==null?void 0:r.value}})).data}static async getProduct(e){return(await f.get(ae+e)).data}static async getPopularProducts(e=5){return(await f.get(re,{params:{limit:e}})).data}static async getDiscountedProducts(){return(await f.get(ne)).data}static async subscribe(e){return(await f.post(ce,{email:e})).data}static async placeOrder(e){const{email:s,products:o}=e;return(await f.post(ie,{email:s,products:o.map(({productId:r,amount:c})=>({productId:r,amount:c}))})).data}}const h=document.querySelector(".modal-background"),_=document.querySelector(".modal");async function de(t){try{h.classList.remove("is-hidden"),document.body.classList.add("is-modal-open"),_.innerHTML=`
      <button type="button" class="modal-close-btn" aria-label="modal close">
        <svg class="modal-icon-close" width="22" height="22">
          <use href="${d}#icon-x-close"></use>
        </svg>
      </button>
    `;const e=await le.getProduct(t);_.insertAdjacentHTML("beforeend",ue(e)),document.querySelector(".modal-btn").addEventListener("click",()=>{pe(e)}),document.querySelector(".modal-btn-remove").addEventListener("click",()=>{ge(e)});for(let s=0;s<g.length;s++)g[s]._id===t&&(document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block");document.querySelector(".modal-close-btn").addEventListener("click",$),h.addEventListener("click",U),document.addEventListener("keydown",z)}catch(e){console.error("Error fetching product data:",e.message)}finally{}}function ue({img:t,name:e,category:s,size:o,popularity:a,desc:r,price:c}){return`
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
        <span>$</span><span class="modal-price">${c}</span>
      </p>
      
      <div class="quantity-and-add">
      <button class="modal-btn" aria-label="add to card">
      <span class="modal-btn-text">Add to</span>
      <svg class="modal-icon-shop" width="18" height="18">
        <use href="${d}#icon-shopping-cart"></use>
      </svg>
    </button>
    <button class="modal-btn-remove" aria-label="add to card">
      <span class="modal-btn-text">Remove from</span>
      <svg class="modal-icon-shop" width="18" height="18">
        <use href="${d}#icon-shopping-cart"></use>
      </svg>
    </button>
      </div>
    </div>`}function pe(t){g.push(t),localStorage.setItem(b,JSON.stringify(g)),T(),document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block"}function ge(t){for(let e=0;e<g.length;e++)g[e]._id===t._id&&(g.splice(e,1),localStorage.setItem(b,JSON.stringify(g)),T(),document.querySelector(".modal-btn").style.display="block",document.querySelector(".modal-btn-remove").style.display="none")}function U({target:t}){t===h&&$()}function $(){h.classList.add("is-hidden"),document.body.classList.remove("is-modal-open"),document.querySelector(".modal-close-btn").removeEventListener("click",$),h.removeEventListener("click",U),document.removeEventListener("keydown",z)}function z({key:t}){t==="Escape"&&$()}const W="filter",k={paginationDop:document.querySelector(".paginationDop"),pagination:document.querySelector(".tui-pagination"),list:document.querySelector(".product-list"),search:document.querySelector("#search")},ye=document.getElementById("pagination");let v,D=3,F;function me(){const t=localStorage.getItem(W);if(t)try{const e=JSON.parse(t);F=e.page,v=e.limit}catch(e){console.error("Error updating localStorage:",e)}}function fe(t){let e={totalItems:t,itemsPerPage:v,visiblePages:D,page:F,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new V(ye,e).on("beforeMove",be)}function be(t){const e=localStorage.getItem(W);if(e)try{const s=JSON.parse(e);s.page=Number(`${t.page}`),localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}k.list.innerHTML="",u()}async function A(t){t<=Number(v)?k.pagination.classList.replace("tui-pagination","paginationDop"):(me(),k.pagination.classList.replace("paginationDop","tui-pagination")),v===9||v===8?D=4:D=2}const C={list:document.querySelector(".product-list")};let E=[],q;async function u(){document.getElementById("overlay").style.display="flex",we();const t=await $e();q=t.data.totalPages*t.data.perPage,A(q),fe(q);try{let e;t&&(e=t),E=e.data.results,ve(E)}catch(e){console.error(e)}finally{document.getElementById("overlay").style.display="none"}}function ve(t){const e=localStorage.getItem(b),s=`<div class="error-load">
                <h2 class="not-found-heading">Nothing was found for the selected <span
                        class="green-word">filters...</span>
                </h2>
                <p class="not-found-message">Try adjusting your search parameters or browse our range by other criteria
                    to
                    find
                    the perfect
                    product for
                    you.</p>
            </div>`,o=t.map(({img:a,name:r,popularity:c,category:i,price:y,size:l,_id:n,is10PercentOff:L})=>{const w=i.replace(/_/g," "),P=e?JSON.parse(e).some(I=>I._id===n):!1,K=L||(e?t.some(I=>I.is10PercentOff===!0):!1)?"icon-discount-pl":"visually-hidden",G=P?`${d}#icon-cart`:`${d}#icon-shopping-cart`;return`<li class="item-pl" data-id="${n}">
                <div class="background-img-pl">
                    <img src="${a}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${r}</h2>
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${w}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${l}</b></p>
                    <p class="paragraph-pl">Popularity: <b class="value-pl">${c}</b></p>
                </div>
                <div class="price-container-pl">
                    <b class="price-pl">$${y}</b>
                    <button aria-label="add basket" class="btn-pl" ${P?"disabled":""}>
                        <svg class="icon-pl">
                            <use href="${G}"></use>
                        </svg>
                    </button>
                </div>
                <svg class="${K}">
                <use href="${d}#icon-discount"></use>
                </svg>
            </li>`}).join("");C.list.innerHTML=o||s}window.addEventListener("load",u);C.list.addEventListener("click",N);function N(t){let e=0;const o=t.target.closest("button");if(o){const r=o.closest("li");if(r){const i=r.dataset.id,y=E.find(l=>l._id===i);he(r),y&&(e=1,Se(y,E))}o.querySelector(".icon-pl use").setAttribute("href",`${d}#icon-cart`),o.setAttribute("disabled",!0)}const a=t.target.closest("li");if(a&&!e){const r=a.dataset.id;de(r)}}function he(t){const e=t.dataset.id,s=document.querySelectorAll(".popular-list .item-popular"),o=document.querySelectorAll(".discount-list .discount-item"),a=document.querySelectorAll(".products .item-pl");s.forEach(r=>{if(r.dataset.id===e){const c=r.querySelector(".popularBtn");c.querySelector(".icon-popular use").setAttribute("href",`${d}#icon-cart`),c.setAttribute("disabled",!0)}}),o.forEach(r=>{if(r.dataset.id===e){const c=r.querySelector(".info-div .info-title-link");c.querySelector(".img-svg-osnova use").setAttribute("href",`${d}#icon-cart`),c.setAttribute("disabled",!0)}}),a.forEach(r=>{if(r.dataset.id===e){const c=r.querySelector(".price-container-pl .btn-pl");c.querySelector(".icon-pl use").setAttribute("href",`${d}#icon-cart`),c.setAttribute("disabled",!0)}})}function Se(t,e){const s=Pe(t,e);g.some(a=>a._id===s._id)||(g.push(s),localStorage.setItem(b,JSON.stringify(g)),T())}function Pe(t,e){const s=t._id;return e.find(({_id:o})=>o===s)}const Ee="filter";function Y(){const t=localStorage.getItem(Ee);try{const e=JSON.parse(t),o={...{},...e};return Object.keys(o).forEach(a=>{o[a]===void 0&&delete o[a]}),o}catch(e){return console.error(e),null}}async function $e(){document.getElementById("overlay").style.display="flex";const{keyword:t,category:e,page:s,limit:o,byABC:a,byPrice:r,byPopularity:c}=Y(),i={keyword:t||"",category:e||"",page:s||1,limit:o||6,byABC:a||"",byPrice:r||"",byPopularity:c||""},l=`https://food-boutique.b.goit.study/api/products?${Object.keys(i).filter(n=>i[n]!==void 0&&i[n]!==null&&i[n]!=="").map(n=>`${n}=${i[n]}`).join("&")}`;try{return await S.get(l)}catch(n){console.error(n)}finally{document.getElementById("overlay").style.display="none"}}function Le(){let t;return window.innerWidth<1440&&window.innerWidth>767?t=8:window.innerWidth<768?t=6:t=9,t}function we(){const t=Le(),e=localStorage.getItem("filter"),s=JSON.parse(e);s.limit=Number(t),localStorage.setItem("filter",JSON.stringify(s))}let B=window.innerWidth,x;const M=[768,1440];window.addEventListener("resize",Ie);function Ie(){clearTimeout(x),x=setTimeout(function(){const t=window.innerWidth;qe(B,t)&&(B=t,C.list.innerHTML="",u())},250)}function qe(t,e){return M.some(s=>t<s&&e>=s)||M.some(s=>t>=s&&e<s)}const ke="https://food-boutique.b.goit.study/api";function De(){return S.get(`${ke}/products/categories`).then(({data:t})=>t).catch(t=>t)}const p={selector:document.querySelector(".select__body"),currentfilter:document.querySelector(".select__current"),list:document.querySelector(".product-list"),sort:document.querySelector(".sort-body"),currentSort:document.querySelector(".sort-current"),form:document.querySelector("#search")};De().then(t=>{const e=Te(t);p.selector.insertAdjacentHTML("afterbegin",e),Ae();p.selector.addEventListener("click",Ce);}).catch(t=>{X.Notify.failure(`❌ Oops! Something went wrong! Error ${t} Try reloading the page! ❌`)});function Te(t){return t.map(e=>`<div class="select__item">${e.replace(/_/g," ")}</div>`).join("")}let Ae=function(){let t=document.querySelectorAll(".select__header"),e=document.querySelectorAll(".select__item");t.forEach(a=>{a.addEventListener("click",s)}),e.forEach(a=>{a.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let a=this.innerText,r=this.closest(".select"),c=r.querySelector(".select__current");c.innerText=a,r.classList.remove("is-active")}};function Ce(t){const e=t.target.innerText.replace(/ /g,"_").replace(/&/g,"%26"),s=localStorage.getItem("filter");if(s)try{const o=JSON.parse(s);t.target.innerText!=="Show all"?o.category=`${e}`:o.category=null,o.page=1,localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}A(1),u()}function Ne(){const{keyword:t,category:e,page:s,limit:o,byABC:a,byPrice:r,byPopularity:c}=Y(),y={keyword:t||null,category:e||null,page:s||1,limit:o||6,byABC:a||"",byPrice:r||"",byPopularity:c||""},l="filter";if(localStorage.getItem("filter")){const n=Q("filter");n.category!==null&&(p.currentfilter.innerText=n.category.replace(/_/g," ").replace(/%26/g,"&")),n.keyword!==null&&(p.form.elements.search.value=n.keyword),n.byABC&&(n.byABC==="false"&&(p.currentSort.innerText="Z to A"),n.byABC==="true"&&(p.currentSort.innerText="A to Z")),n.byPrice&&(n.byPrice==="false"&&(p.currentSort.innerText="Expensive"),n.byPrice==="true"&&(p.currentSort.innerText="Cheap")),n.byPopularity&&(n.byPopularity==="false"&&(p.currentSort.innerText="Popular"),n.byPopularity==="true"&&(p.currentSort.innerText="Not Popular"))}m(l,y)}Ne();let Oe=function(){let t=document.querySelectorAll(".sort-header"),e=document.querySelectorAll(".sort-item");t.forEach(a=>{a.addEventListener("click",s)}),e.forEach(a=>{a.addEventListener("click",o)});function s(){this.parentElement.classList.toggle("is-active")}function o(){let a=this.innerText,r=this.closest(".sort"),c=r.querySelector(".sort-current");c.innerText=a,r.classList.remove("is-active")}};Oe();p.sort.addEventListener("click",_e);function _e(t){const e=t.target.innerText,s=localStorage.getItem("filter");try{const o=JSON.parse(s);e==="A to Z"?(delete o.byPrice,delete o.byPopularity,o.byABC="true",m("filter",o),u()):e==="Z to A"?(delete o.byPrice,delete o.byPopularity,o.byABC="false",m("filter",o),u()):e==="Cheap"?(delete o.byABC,delete o.byPopularity,o.byPrice="true",m("filter",o),u()):e==="Expensive"?(delete o.byABC,delete o.byPopularity,o.byPrice="false",m("filter",o),u()):e==="Popular"?(delete o.byABC,delete o.byPrice,o.byPopularity="false",m("filter",o),u()):e==="Not Popular"?(delete o.byABC,delete o.byPrice,o.byPopularity="true",m("filter",o),u()):e==="Reset All"&&(delete o.byABC,delete o.byPrice,delete o.byPopularity,m("filter",o),u())}catch(o){console.error("Error updating localStorage:",o)}}const O=document.querySelector("#search");let R;O.addEventListener("input",Z);O.addEventListener("submit",Z);function Z(t){t.preventDefault();const e=O.elements.search.value.trim(),s=localStorage.getItem("filter");(t.type==="input"||t.type==="submit")&&(clearTimeout(R),R=setTimeout(()=>{Be(e,s),u(),A(1)},1e3))}function Be(t,e){if(e)try{const s=JSON.parse(e);s.keyword=`${t}`,s.page=1,localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}}async function xe(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/popular";try{return(await S.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const Me=document.querySelector(".popular-list");let J=[];async function Re(){const t=localStorage.getItem(b),e=5;try{J=(await xe()).slice(0,e);const o=J.map(({img:a,name:r,popularity:c,category:i,size:y,_id:l})=>{const n=t?JSON.parse(t).some(P=>P._id===l):!1,L=n?`${d}#icon-cart`:`${d}#icon-shopping-cart`,w=i.replace(/_/g," ");return`<li class="item-popular" data-id="${l}">
        <div class="background-img-popular">
            <img src="${a}" alt="" class="img-popular" loading="lazy" />
        </div>
        <div class="popular-wrap">
        <h3 class="popular-name">${r}</h3>
        <div class="popular-info">
            <p class="popular-info-items">
                Category: <b class="value-popular">${w}</b>
            </p>
            <p class="popular-info-items">Size: <b class="value-popular">${y}</b></p>
            <p class="popular-info-items">Popularity: <b class="value-popular">${c}</b></p>
        </div>
        </div>
            <button class="popularBtn" aria-label="Add basket" data-_id="${l}" ${n?"disabled":""}>
                <svg class="icon-popular" data-_id="${l}" width="12" height="12">
                    <use class="use-popular" data-_id="${l}"
                      href="${L}"
                    ></use>
                </svg>
            </button>
    </li>`}).join("");Me.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",Re);const Je=document.querySelector(".popular-list");Je.addEventListener("click",N);async function He(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/discount";try{return(await S.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const je=document.querySelector(".discount-list");let H=[];async function Ue(){const t=localStorage.getItem(b),e=2;try{H=(await He()).slice(0,e);const o=H.map(({_id:a,name:r,img:c,price:i})=>{const l=(t?JSON.parse(t).some(n=>n._id===a):!1)?`${d}#icon-cart`:`${d}#icon-shopping-cart`;return`<li class="discount-item" data-id="${a}">
           <svg class="icon-discount" width="64" height="64">
                  <use href="${d}#icon-discount"></use>
                </svg>
              </div>
    <div class="discount-item-img">
      <img class="discount-img"  src="${c}" alt="Product" loading="lazy" />
    </div>
    <div class="discont-info">
      <p class="info-title">${r}</p>
      <div class="discont-info-dop">
        <p class="info-price">$${i}</p>
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
  </li>`}).join("");je.insertAdjacentHTML("beforeend",o)}catch(s){console.error(s)}}window.addEventListener("load",Ue);const ze=document.querySelector(".discount-list");ze.addEventListener("click",N);const j=document.querySelector(".scroll-up");document.addEventListener("scroll",ee(We,400));function We(){const t=window.scrollY,e=document.documentElement.clientHeight;t>e?j.classList.add("scroll-up-is-hidden"):j.classList.remove("scroll-up-is-hidden")}
//# sourceMappingURL=commonHelpers2.js.map
