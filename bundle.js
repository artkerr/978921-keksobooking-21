(()=>{"use strict";(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",o=(e,t,o)=>(e.responseType="json",e.addEventListener("load",(()=>{200===e.status?t(e.response):o(`Статус ответа:  ${e.status} ${e.statusText}`)})),e.addEventListener("error",(()=>{o(`Запрос не успел выполниться за ${e.timeout}мс`)})),e.timeout=1e4,e);window.backend={load:(t,r)=>{const n=new XMLHttpRequest;o(n,t,r),n.open("GET",e),n.send()},send:(e,r,n)=>{const c=new XMLHttpRequest;o(c,r,n),c.open("POST",t),c.send(e)}}})(),(()=>{let e=null;window.debounce=t=>{e&&window.clearTimeout(e),e=window.setTimeout(t,500)}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelector("#title");t.addEventListener("invalid",(()=>{t.validity.tooShort?t.setCustomValidity("Минимальная длина заголовка — 30 символов"):t.validity.tooLong?t.setCustomValidity("Максимальная длина заголовка — 100 символов"):t.validity.valueMissing?t.setCustomValidity("Заголовок объявления обязателен для заполнения"):t.setCustomValidity("")}));const o=e.querySelector("#price");o.addEventListener("invalid",(()=>{o.validity.rangeOverflow?(o.setCustomValidity("Максимальная сумма 1 000 000"),o.value=1e6):o.setCustomValidity("")}));const r={bungalow:0,flat:1e3,house:5e3,palace:1e4};e.querySelector("#type").addEventListener("change",(e=>{var t;t=e.target.value,o.setAttribute("min",r[t]),o.setAttribute("placeholder",r[t])}));const n={1:[1],2:[1,2],3:[1,2,3],100:[0]},c=e.querySelector("#capacity").querySelectorAll("option"),s=e.querySelector("#timein"),i=s.querySelectorAll("option"),a=e.querySelector("#timeout"),d=a.querySelectorAll("option"),l=e=>{i.forEach((t=>{d.forEach((o=>{e.target.value===t.value&&e.target.value===o.value&&(t.selected=!0,o.selected=!0)}))}))};s.addEventListener("change",(e=>{l(e)})),a.addEventListener("change",(e=>{l(e)}));const u=document.querySelector("main"),p=(e,t)=>{window.util.isMouseDown(e,(()=>t.remove()))},m=(e,t)=>{window.util.isEscEvt(e,(()=>t.remove())),document.removeEventListener("keydown",y),document.removeEventListener("keydown",w)},f=e=>{const t=u.querySelector(".success");p(e,t)},y=e=>{const t=u.querySelector(".success");m(e,t)},v=e=>{const t=u.querySelector(".error");p(e,t)},w=e=>{const t=u.querySelector(".error");m(e,t)},S=()=>{const e=document.querySelector("#success").content.querySelector(".success").cloneNode(!0);u.appendChild(e),E(),document.addEventListener("keydown",y),e.addEventListener("click",f)},_=()=>{const e=document.querySelector("#error").content.querySelector(".error").cloneNode(!0);u.appendChild(e),e.addEventListener("click",v),document.addEventListener("keydown",w)};e.addEventListener("submit",(t=>{window.backend.send(new FormData(e),S,_),t.preventDefault()}));const q=e.querySelector(".ad-form-header__preview img"),h=e.querySelector(".ad-form__photo img"),E=()=>{e.reset(),window.resetPhoto(q),window.resetPhoto(h),window.map.disablePage()};e.querySelector(".ad-form__reset").addEventListener("click",(e=>{e.preventDefault(),E()})),window.form={setFieldStatus:(e,t)=>{e.forEach((e=>{e.disabled=t}))},setRooms:e=>{c.forEach((e=>{e.disabled=!0})),n[e].forEach((e=>{c.forEach((t=>{Number(t.value)===e&&(t.disabled=!1,t.selected=!0)}))}))}}})(),(()=>{const e=document.querySelector(".map__pins"),t=document.querySelector(".map"),o=document.querySelector(".ad-form"),r=t.querySelector(".map__filters"),n=o.querySelectorAll("fieldset"),c=r.querySelectorAll("*"),s=o.querySelector("#address"),i=e.querySelector(".map__pin--main"),a=(e=570,o=375)=>{t.classList.contains("map--faded")?s.value=`${e}, ${o}`:s.value=`${e}, ${o+Math.ceil(i.offsetHeight/2)+22}`};window.map={renderPins:e=>{window.util.isMouseDown(e,(()=>{window.form.setFieldStatus(n,!1),window.form.setFieldStatus(c,!1),o.classList.remove("ad-form--disabled"),t.classList.remove("map--faded"),window.backend.load(window.pin.successHandler,window.pin.errorHandler),a(),i.removeEventListener("click",window.map.renderPins)}))},setPinLocation:a,disablePage:()=>{window.form.setFieldStatus(n,!0),window.form.setFieldStatus(c,!0),o.classList.add("ad-form--disabled"),t.classList.add("map--faded"),e.querySelectorAll('button[type="button"]').forEach((e=>{e.remove()})),i.addEventListener("click",window.map.renderPins),s.value="570, 375",i.style.left="570px",i.style.top="375px",window.card.removePopup()}}})(),window.util={isEscEvt:(e,t)=>{"Escape"===e.key&&t()},isEnterEvt:(e,t)=>{"Enter"===e.key&&t()},isMouseDown:(e,t)=>{1===e.which&&t()},errorHandler:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="40px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}},(()=>{const e=document.querySelector(".map__pins").querySelector(".map__pin--main"),t=document.querySelector(".map"),o=document.querySelector(".ad-form"),r=t.querySelector(".map__filters"),n=o.querySelectorAll("fieldset"),c=r.querySelectorAll("*");window.form.setFieldStatus(n,!0),window.form.setFieldStatus(c,!0),window.map.setPinLocation(),e.addEventListener("click",window.map.renderPins),o.querySelector("#room_number").addEventListener("change",(e=>{window.form.setRooms(e.target.value)}))})(),(()=>{const e=document.querySelector("#pin").content,t=document.querySelector(".map__pins");let o=[];const r=()=>{t.querySelectorAll("button").forEach((e=>{e.classList.contains("map__pin--active")&&e.classList.remove("map__pin--active")}))},n=()=>{t.querySelectorAll('button[type="button"]').forEach((e=>{e.remove()}))},c=()=>{n();const c=[];for(let e=0;e<o.length&&!(c.length>=5);e++)window.filter.applyFilter(o[e])&&c.push(o[e]);(o=>{const n=document.createDocumentFragment();o.forEach((t=>{n.appendChild((t=>{const o=e.cloneNode(!0),n=o.querySelector(".map__pin"),c=o.querySelector("img");return n.style.left=t.location.x-n.offsetWidth+"px",n.style.top=t.location.y-n.offsetHeight+"px",c.src=t.author.avatar,c.alt=t.offer.title,n.addEventListener("click",(()=>{r(),window.card.renderCard(window.card.createCard(t)),n.classList.add("map__pin--active")})),o})(t))})),t.appendChild(n)})(c)};document.querySelector(".map__filters").addEventListener("change",(()=>{window.card.removePopup(),n(),window.debounce(c)})),window.pin={updatePinsList:c,successHandler:e=>{o=e,c()},errorHandler:e=>{window.util.errorHandler(e)},removeActiveClass:r}})(),(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),o=e.querySelector("#housing-price"),r=e.querySelector("#housing-rooms"),n=e.querySelector("#housing-guests"),c=e.querySelector("#housing-features");window.filter={applyFilter:e=>(e=>"any"===t.value||t.value===e.offer.type)(e)&&(e=>"any"===o.value||("low"===o.value?e.offer.price<1e4:"middle"===o.value?e.offer.price>1e4&&e.offer.price<=5e4:"high"===o.value&&e.offer.price>=5e4))(e)&&(e=>"any"===r.value||parseInt(r.value,10)===e.offer.rooms)(e)&&(e=>"any"===n.value||parseInt(n.value,10)===e.offer.guests)(e)&&(e=>Array.from(c.querySelectorAll(".map__checkbox:checked")).map((e=>e.value)).every((t=>e.offer.features.includes(t))))(e)}})(),(()=>{const e={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},t=document.querySelector(".map"),o=t.querySelector(".map__filters-container"),r=document.querySelector("#card").content.querySelector(".map__card"),n=document.querySelector("#photo").content.querySelector("img"),c=r.cloneNode(!0),s=c.querySelector(".popup__avatar"),i=c.querySelector(".popup__title"),a=c.querySelector(".popup__text--address"),d=c.querySelector(".popup__text--price"),l=c.querySelector(".popup__type"),u=c.querySelector(".popup__text--capacity"),p=c.querySelector(".popup__text--time"),m=c.querySelector(".popup__features"),f=c.querySelector(".popup__description"),y=c.querySelector(".popup__photos"),v=e=>{const o=t.querySelector(".popup");window.util.isMouseDown(e,(()=>o.remove())),window.pin.removeActiveClass(),document.removeEventListener("keydown",w)},w=e=>{const o=t.querySelector(".popup");window.util.isEscEvt(e,(()=>o.remove())),window.pin.removeActiveClass(),document.removeEventListener("keydown",w)},S=()=>{const e=document.querySelector(".popup");e&&e.remove()};window.card={createCard:t=>(s.src=t.author.avatar,i.textContent=t.offer.title,a.textContent=t.offer.address,d.textContent=t.offer.price+"₽/ночь",l.textContent=e[t.offer.type],u.textContent=`${t.offer.rooms} комнаты для ${t.offer.guests} гостей`,p.textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,m.innerHTML="",t.offer.features.forEach((e=>{const t=((e,t)=>{const o=document.createElement("li");return o.classList.add("popup__feature","popup__feature--"+t),o})(0,e);m.appendChild(t)})),y.innerHTML="",y.appendChild((e=>{const t=document.createDocumentFragment();return e.offer.photos.forEach((e=>{const o=n.cloneNode(!0);o.src=e,t.appendChild(o)})),t})(t)),f.textContent=t.offer.description,c),renderCard:e=>{const r=document.createDocumentFragment();S(),r.appendChild(e),r.querySelector(".popup__close").addEventListener("click",v),document.addEventListener("keydown",w),t.insertBefore(r,o)},removePopup:S}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pin--main"),o={TOP_Y:130-t.offsetHeight-22,BOTTOM_Y:630-t.offsetHeight-22,LEFT_X:0-t.offsetWidth/2,RIGHT_X:e.offsetWidth-t.offsetWidth/2};t.addEventListener("mousedown",(r=>{r.preventDefault();let n={x:r.clientX,y:r.clientY},c=!1;const s=e=>{e.preventDefault(),c=!0;const r=n.x-e.clientX,s=n.y-e.clientY;n={x:e.clientX,y:e.clientY};let i=t.offsetTop-s,a=t.offsetLeft-r;i<o.TOP_Y?i=o.TOP_Y:i>o.BOTTOM_Y&&(i=o.BOTTOM_Y),a<o.LEFT_X?a=o.LEFT_X:a>o.RIGHT_X&&(a=o.RIGHT_X),t.style.top=i+"px",t.style.left=a+"px",window.map.setPinLocation(a,i+Math.floor(t.offsetHeight/2))},i=e=>{if(e.preventDefault(),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",i),c){const e=o=>{o.preventDefault(),t.removeEventListener("click",e)};t.addEventListener("click",e)}};e.classList.contains("map--faded")||(document.addEventListener("mousemove",s),document.addEventListener("mouseup",i))}))})(),(()=>{const e=["image/gif","image/jpg","image/jpeg","image/png"],t=document.querySelector(".ad-form"),o=t.querySelector(".ad-form__field input[type=file]"),r=t.querySelector(".ad-form-header__preview img"),n=t.querySelector(".ad-form__upload input[type=file]"),c=t.querySelector(".ad-form__photo img"),s=(t,o)=>{const r=t.files[0],n=r.type;if(e.some((e=>n===e))){const e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result})),e.readAsDataURL(r)}};o.addEventListener("change",(()=>{s(o,r)})),n.addEventListener("change",(()=>{s(n,c)})),window.resetPhoto=e=>{e.src="img/muffin-grey.svg"}})()})();