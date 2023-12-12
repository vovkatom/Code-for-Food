import{i as l,c as g,K as b,u as C,s as f,l as V}from"./assets/footer-0e5e709c.js";import{a as S,P as X,N as ee,l as te}from"./assets/vendor-4b895a38.js";const oe="https://food-boutique.b.goit.study/api/",se="products/categories",re="products",ae="products/",ne="products/popular",ce="products/discount",ie="subscription",le="orders",m=S.create({baseURL:oe});class de{static async getCategories(){return(await m.get(se)).data}static async getProducts({keyword:e,category:o,page:s,limit:a,sortBy:r}={}){return(await m.get(re,{params:{keyword:e,category:o,page:s,limit:a,[r==null?void 0:r.key]:r==null?void 0:r.value}})).data}static async getProduct(e){return(await m.get(ae+e)).data}static async getPopularProducts(e=5){return(await m.get(ne,{params:{limit:e}})).data}static async getDiscountedProducts(){return(await m.get(ce)).data}static async subscribe(e){return(await m.post(ie,{email:e})).data}static async placeOrder(e){const{email:o,products:s}=e;return(await m.post(le,{email:o,products:s.map(({productId:r,amount:n})=>({productId:r,amount:n}))})).data}}const h=document.querySelector(".modal-background"),_=document.querySelector(".modal");async function ue(t){try{h.classList.remove("is-hidden"),document.body.classList.add("is-modal-open"),_.innerHTML=`
      <button type="button" class="modal-close-btn" aria-label="modal close">
        <svg class="modal-icon-close" width="22" height="22">
          <use href="${l}#icon-x-close"></use>
        </svg>
      </button>
    `;const e=await de.getProduct(t);_.insertAdjacentHTML("beforeend",pe(e)),document.querySelector(".modal-btn").addEventListener("click",()=>{ge(e)}),document.querySelector(".modal-btn-remove").addEventListener("click",()=>{ye(e)});for(let o=0;o<g.length;o++)g[o]._id===t&&(document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block");document.querySelector(".modal-close-btn").addEventListener("click",q),h.addEventListener("click",U),document.addEventListener("keydown",z)}catch(e){console.error("Error fetching product data:",e.message)}finally{}}function pe({img:t,name:e,category:o,size:s,popularity:a,desc:r,price:n}){return`
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
            <span class="modal-subtitle-info">${a}</span>
          </div>
        </div>
        <p class="modal-about-product">${r}</p>
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
    </div>`}function ge(t){g.push(t),localStorage.setItem(b,JSON.stringify(g)),C(),document.querySelector(".modal-btn").style.display="none",document.querySelector(".modal-btn-remove").style.display="block",fe(t)}function ye(t){for(let e=0;e<g.length;e++)g[e]._id===t._id&&(g.splice(e,1),localStorage.setItem(b,JSON.stringify(g)),C(),document.querySelector(".modal-btn").style.display="block",document.querySelector(".modal-btn-remove").style.display="none");me(t)}function fe(t){const e=t._id,o=document.querySelectorAll(".popular-list .item-popular"),s=document.querySelectorAll(".discount-list .discount-item"),a=document.querySelectorAll(".products .item-pl");o.forEach(r=>{if(r.dataset.id===e){const n=r.querySelector(".popularBtn");n.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}}),s.forEach(r=>{if(r.dataset.id===e){const n=r.querySelector(".info-div .info-title-link");n.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}}),a.forEach(r=>{if(r.dataset.id===e){const n=r.querySelector(".price-container-pl .btn-pl");n.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}})}function me(t){const e=t._id,o=document.querySelectorAll(".popular-list .item-popular"),s=document.querySelectorAll(".discount-list .discount-item"),a=document.querySelectorAll(".products .item-pl");o.forEach(r=>{if(r.dataset.id===e){const n=r.querySelector(".popularBtn");n.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-shopping-cart`),n.removeAttribute("disabled")}}),s.forEach(r=>{if(r.dataset.id===e){const n=r.querySelector(".info-div .info-title-link");n.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-shopping-cart`),n.removeAttribute("disabled")}}),a.forEach(r=>{if(r.dataset.id===e){const n=r.querySelector(".price-container-pl .btn-pl");n.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-shopping-cart`),n.removeAttribute("disabled")}})}function U({target:t}){t===h&&q()}function q(){h.classList.add("is-hidden"),document.body.classList.remove("is-modal-open"),document.querySelector(".modal-close-btn").removeEventListener("click",q),h.removeEventListener("click",U),document.removeEventListener("keydown",z)}function z({key:t}){t==="Escape"&&q()}const W="filter",k={paginationDop:document.querySelector(".paginationDop"),pagination:document.querySelector(".tui-pagination"),list:document.querySelector(".product-list"),search:document.querySelector("#search")},be=document.getElementById("pagination");let v,T=3,F;function ve(){const t=localStorage.getItem(W);if(t)try{const e=JSON.parse(t);F=e.page,v=e.limit}catch(e){console.error("Error updating localStorage:",e)}}function he(t){let e={totalItems:t,itemsPerPage:v,visiblePages:T,page:F,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new X(be,e).on("beforeMove",Se)}function Se(t){const e=localStorage.getItem(W);if(e)try{const o=JSON.parse(e);o.page=Number(`${t.page}`),localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}k.list.innerHTML="",p()}async function A(t){t<=Number(v)?k.pagination.classList.replace("tui-pagination","paginationDop"):(ve(),k.pagination.classList.replace("paginationDop","tui-pagination")),v===9||v===8?T=4:T=2}const L={list:document.querySelector(".product-list"),pagination:document.querySelector(".tui-pagination")};let $=[],E;async function p(){document.getElementById("overlay").style.display="flex",we();const t=await Le();E=t.data.totalPages*t.data.perPage;const e=Y();E<=Number(e)&&L.pagination.classList.replace("tui-pagination","paginationDop"),A(E),he(E);try{let o;t&&(o=t),$=o.data.results,Pe($)}catch(o){console.error(o)}finally{document.getElementById("overlay").style.display="none"}}function Pe(t){const e=localStorage.getItem(b),o=`<div class="error-load">
                <h2 class="not-found-heading">Nothing was found for the selected <span
                        class="green-word">filters...</span>
                </h2>
                <p class="not-found-message">Try adjusting your search parameters or browse our range by other criteria
                    to
                    find
                    the perfect
                    product for
                    you.</p>
            </div>`,s=t.map(({img:a,name:r,popularity:n,category:i,price:y,size:u,_id:c,is10PercentOff:w})=>{const I=i.replace(/_/g," "),P=e?JSON.parse(e).some(D=>D._id===c):!1,G=w||(e?t.some(D=>D.is10PercentOff===!0):!1)?"icon-discount-pl":"visually-hidden",Q=P?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="item-pl" data-id="${c}">
                <div class="background-img-pl">
                    <img src="${a}" alt="" class="img-pl" loading="lazy" />
                </div>
                <h2 class="product-name-pl">${r}</h2>
                <div class="container-info">
                <div class="product-info-pl">
                    <p class="paragraph-pl">
                        Category: <b class="value-pl">${I}</b>
                    </p>
                    <p class="paragraph-pl">Size: <b class="value-pl">${u}</b></p>
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
            </li>`}).join("");L.list.innerHTML=s||o}window.addEventListener("load",p);L.list.addEventListener("click",N);function N(t){let e=0;const s=t.target.closest("button");if(s){const r=s.closest("li");if(r){const n=r.dataset.id,i=$.find(y=>y._id===n);Ee(r),i&&(e=1,$e(i,$))}s.setAttribute("disabled",!0)}const a=t.target.closest("li");if(a&&!e){const r=a.dataset.id;ue(r)}}function Ee(t){const e=t.dataset.id,o=document.querySelectorAll(".popular-list .item-popular"),s=document.querySelectorAll(".discount-list .discount-item"),a=document.querySelectorAll(".products .item-pl");o.forEach(r=>{if(r.dataset.id===e){const n=r.querySelector(".popularBtn");n.querySelector(".icon-popular use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}}),s.forEach(r=>{if(r.dataset.id===e){const n=r.querySelector(".info-div .info-title-link");n.querySelector(".img-svg-osnova use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}}),a.forEach(r=>{if(r.dataset.id===e){const n=r.querySelector(".price-container-pl .btn-pl");n.querySelector(".icon-pl use").setAttribute("href",`${l}#icon-cart`),n.setAttribute("disabled",!0)}})}function $e(t,e){const o=qe(t,e);g.some(a=>a._id===o._id)||(g.push(o),localStorage.setItem(b,JSON.stringify(g)),C())}function qe(t,e){const o=t._id;return e.find(({_id:s})=>s===o)}const Ae="filter";function Z(){const t=localStorage.getItem(Ae);try{const e=JSON.parse(t),s={...{},...e};return Object.keys(s).forEach(a=>{s[a]===void 0&&delete s[a]}),s}catch(e){return console.error(e),null}}async function Le(){document.getElementById("overlay").style.display="flex";const{keyword:t,category:e,page:o,limit:s,byABC:a,byPrice:r,byPopularity:n}=Z(),i={keyword:t||"",category:e||"",page:o||1,limit:s||6,byABC:a||"",byPrice:r||"",byPopularity:n||""},u=`https://food-boutique.b.goit.study/api/products?${Object.keys(i).filter(c=>i[c]!==void 0&&i[c]!==null&&i[c]!=="").map(c=>`${c}=${i[c]}`).join("&")}`;try{return await S.get(u)}catch(c){console.error(c)}finally{document.getElementById("overlay").style.display="none"}}function Y(){let t;return window.innerWidth<1440&&window.innerWidth>767?t=8:window.innerWidth<768?t=6:t=9,t}function we(){const t=Y(),e=localStorage.getItem("filter"),o=JSON.parse(e);o.limit=Number(t),localStorage.setItem("filter",JSON.stringify(o))}let B=window.innerWidth,x;const M=[768,1440];window.addEventListener("resize",Ie);function Ie(){clearTimeout(x),x=setTimeout(function(){const t=window.innerWidth;De(B,t)&&(B=t,L.list.innerHTML="",p())},250)}function De(t,e){return M.some(o=>t<o&&e>=o)||M.some(o=>t>=o&&e<o)}const ke="https://food-boutique.b.goit.study/api";function Te(){return S.get(`${ke}/products/categories`).then(({data:t})=>t).catch(t=>t)}const d={selector:document.querySelector(".select__body"),currentfilter:document.querySelector(".select__current"),list:document.querySelector(".product-list"),sort:document.querySelector(".sort-body"),currentSort:document.querySelector(".sort-current"),form:document.querySelector("#search")};Te().then(t=>{const e=Ce(t);d.selector.insertAdjacentHTML("afterbegin",e),Ne();d.selector.addEventListener("click",Oe);}).catch(t=>{ee.Notify.failure(`❌ Oops! Something went wrong! Error ${t} Try reloading the page! ❌`)});function Ce(t){return t.map(e=>`<div class="select__item">${e.replace(/_/g," ")}</div>`).join("")}let Ne=function(){let t=document.querySelectorAll(".select__header"),e=document.querySelectorAll(".select__item");t.forEach(a=>{a.addEventListener("click",o)}),e.forEach(a=>{a.addEventListener("click",s)});function o(){this.parentElement.classList.toggle("is-active")}function s(){let a=this.innerText,r=this.closest(".select"),n=r.querySelector(".select__current");n.innerText=a,r.classList.remove("is-active")}};function Oe(t){const e=t.target.innerText.replace(/ /g,"_").replace(/&/g,"%26"),o=localStorage.getItem("filter");if(o)try{const s=JSON.parse(o);t.target.innerText!=="Show all"?s.category=`${e}`:s.category=null,s.page=1,localStorage.setItem("filter",JSON.stringify(s))}catch(s){console.error("Error updating localStorage:",s)}A(1),p()}function _e(){const{keyword:t,category:e,page:o,limit:s,byABC:a,byPrice:r,byPopularity:n}=Z(),y={keyword:t||null,category:e||null,page:o||1,limit:s||6,byABC:a||"",byPrice:r||"",byPopularity:n||""},u="filter";if(localStorage.getItem("filter")){const c=V("filter");c.category!==null&&(d.currentfilter.innerText=c.category.replace(/_/g," ").replace(/%26/g,"&")),c.keyword!==null&&(d.form.elements.search.value=c.keyword),c.byABC&&(c.byABC==="false"&&(d.currentSort.innerText="Z to A"),c.byABC==="true"&&(d.currentSort.innerText="A to Z")),c.byPrice&&(c.byPrice==="false"&&(d.currentSort.innerText="Expensive"),c.byPrice==="true"&&(d.currentSort.innerText="Cheap")),c.byPopularity&&(c.byPopularity==="false"&&(d.currentSort.innerText="Popular"),c.byPopularity==="true"&&(d.currentSort.innerText="Not Popular"))}f(u,y),A()}_e();let Be=function(){let t=document.querySelectorAll(".sort-header"),e=document.querySelectorAll(".sort-item");t.forEach(a=>{a.addEventListener("click",o)}),e.forEach(a=>{a.addEventListener("click",s)});function o(){this.parentElement.classList.toggle("is-active")}function s(){let a=this.innerText,r=this.closest(".sort"),n=r.querySelector(".sort-current");n.innerText=a,r.classList.remove("is-active")}};Be();d.sort.addEventListener("click",xe);function xe(t){const e=t.target.innerText,o=localStorage.getItem("filter");try{const s=JSON.parse(o);e==="A to Z"?(delete s.byPrice,delete s.byPopularity,s.byABC="true",f("filter",s),p()):e==="Z to A"?(delete s.byPrice,delete s.byPopularity,s.byABC="false",f("filter",s),p()):e==="Cheap"?(delete s.byABC,delete s.byPopularity,s.byPrice="true",f("filter",s),p()):e==="Expensive"?(delete s.byABC,delete s.byPopularity,s.byPrice="false",f("filter",s),p()):e==="Popular"?(delete s.byABC,delete s.byPrice,s.byPopularity="false",f("filter",s),p()):e==="Not Popular"?(delete s.byABC,delete s.byPrice,s.byPopularity="true",f("filter",s),p()):e==="Reset All"&&(delete s.byABC,delete s.byPrice,delete s.byPopularity,f("filter",s),p())}catch(s){console.error("Error updating localStorage:",s)}}const Me=document.querySelector(".clean-button");Me.addEventListener("click",Je);function Je(){const t=localStorage.getItem("filter"),e=JSON.parse(t);e.page=1,e.keyword=null,e.category=null,delete e.byPrice,delete e.byPopularity;const o=e;d.currentSort.innerText="A to Z",d.currentfilter.innerText="Categories",console.dir(d.form),d.form.value="",f("filter",o),p()}const O=document.querySelector("#search");let J;O.addEventListener("input",K);O.addEventListener("submit",K);function K(t){t.preventDefault();const e=O.elements.search.value.trim(),o=localStorage.getItem("filter");(t.type==="input"||t.type==="submit")&&(clearTimeout(J),J=setTimeout(()=>{Re(e,o),p(),A(1)},1e3))}function Re(t,e){if(e)try{const o=JSON.parse(e);o.keyword=`${t}`,o.page=1,localStorage.setItem("filter",JSON.stringify(o))}catch(o){console.error("Error updating localStorage:",o)}}async function He(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/popular";try{return(await S.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const je=document.querySelector(".popular-list");let R=[];async function Ue(){const t=localStorage.getItem(b),e=5;try{R=(await He()).slice(0,e);const s=R.map(({img:a,name:r,popularity:n,category:i,size:y,_id:u})=>{const c=t?JSON.parse(t).some(P=>P._id===u):!1,w=c?`${l}#icon-cart`:`${l}#icon-shopping-cart`,I=i.replace(/_/g," ");return`<li class="item-popular" data-id="${u}">
        <div class="background-img-popular">
            <img src="${a}" alt="" class="img-popular" loading="lazy" />
        </div>
        <div class="popular-wrap">
        <h3 class="popular-name">${r}</h3>
        <div class="popular-info">
            <p class="popular-info-items">
                Category: <b class="value-popular">${I}</b>
            </p>
            <p class="popular-info-items">Size: <b class="value-popular">${y}</b></p>
            <p class="popular-info-items">Popularity: <b class="value-popular">${n}</b></p>
        </div>
        </div>
            <button class="popularBtn" aria-label="Add basket" data-_id="${u}" ${c?"disabled":""}>
                <svg class="icon-popular" data-_id="${u}" width="12" height="12">
                    <use class="use-popular" data-_id="${u}"
                      href="${w}"
                    ></use>
                </svg>
            </button>
    </li>`}).join("");je.insertAdjacentHTML("beforeend",s)}catch(o){console.error(o)}}window.addEventListener("load",Ue);const ze=document.querySelector(".popular-list");ze.addEventListener("click",N);async function We(){document.getElementById("overlay").style.display="flex";const t="https://food-boutique.b.goit.study/api/products/discount";try{return(await S.get(t)).data}catch(e){throw e}finally{document.getElementById("overlay").style.display="none"}}const Fe=document.querySelector(".discount-list");let H=[];async function Ze(){const t=localStorage.getItem(b),e=2;try{H=(await We()).slice(0,e);const s=H.map(({_id:a,name:r,img:n,price:i})=>{const u=(t?JSON.parse(t).some(c=>c._id===a):!1)?`${l}#icon-cart`:`${l}#icon-shopping-cart`;return`<li class="discount-item" data-id="${a}">
           <svg class="icon-discount" width="64" height="64">
                  <use href="${l}#icon-discount"></use>
                </svg>
              </div>
    <div class="discount-item-img">
      <img class="discount-img"  src="${n}" alt="Product" loading="lazy" />
    </div>
    <div class="discont-info">
      <p class="info-title">${r}</p>
      <div class="discont-info-dop">
        <p class="info-price">$${i}</p>
        <div class="info-div">
          <button class="info-title-link" aria-label="Price" data-_id="${a}">
            <svg class="img-svg-osnova" data-_id="${a}" width="18" height="18">
              <use class="use" data-_id="${a}"
                href="${u}"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </li>`}).join("");Fe.insertAdjacentHTML("beforeend",s)}catch(o){console.error(o)}}window.addEventListener("load",Ze);const Ye=document.querySelector(".discount-list");Ye.addEventListener("click",N);const j=document.querySelector(".scroll-up");document.addEventListener("scroll",te(Ke,400));function Ke(){const t=window.scrollY,e=document.documentElement.clientHeight;t>e?j.classList.add("scroll-up-is-hidden"):j.classList.remove("scroll-up-is-hidden")}
//# sourceMappingURL=commonHelpers2.js.map
