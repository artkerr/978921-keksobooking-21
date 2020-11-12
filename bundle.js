(()=>{"use strict";(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking";window.backend={getAdverts:(t,o)=>{const r=new XMLHttpRequest;r.responseType="json",r.addEventListener("load",(()=>{200===r.status?t(r.response):o(`Статус ответа:  ${r.status} ${r.statusText}`)})),r.addEventListener("error",(()=>{o(`Запрос не успел выполниться за ${r.timeout}мс`)})),r.timeout=1e4,r.open("GET",e),r.send()},sendUserData:(e,o,r)=>{const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(()=>{200===n.status?o(n.response):r(`Статус ответа:  ${n.status} ${n.statusText}`)})),n.open("POST",t),n.send(e)}}})(),(()=>{let e=null;window.debounce=t=>{e&&window.clearTimeout(e),e=window.setTimeout(t,500)}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelector("#title");window.setFieldStatus=(e,t)=>{e.forEach((e=>{e.disabled=t}))},t.addEventListener("invalid",(()=>{t.validity.tooShort?t.setCustomValidity("Минимальная длина заголовка — 30 символов"):t.validity.tooLong?t.setCustomValidity("Максимальная длина заголовка — 100 символов"):t.validity.valueMissing?t.setCustomValidity("Заголовок объявления обязателен для заполнения"):t.setCustomValidity("")}));const o=e.querySelector("#price");o.addEventListener("invalid",(()=>{o.validity.rangeOverflow?(o.setCustomValidity("Максимальная сумма 1 000 000"),o.value=1e6):o.setCustomValidity("")}));const r={bungalow:0,flat:1e3,house:5e3,palace:1e4};e.querySelector("#type").addEventListener("change",(e=>{var t;t=e.target.value,o.setAttribute("min",r[t]),o.setAttribute("placeholder",r[t])}));const n={1:[1],2:[1,2],3:[1,2,3],100:[0]},c=e.querySelector("#capacity").querySelectorAll("option");window.setRooms=e=>{c.forEach((e=>{e.disabled=!0})),n[e].forEach((e=>{c.forEach((t=>{Number(t.value)===e&&(t.disabled=!1,t.selected=!0)}))}))};const s=e.querySelector("#timein"),a=s.querySelectorAll("option"),i=e.querySelector("#timeout"),l=i.querySelectorAll("option"),d=e=>{a.forEach((t=>{l.forEach((o=>{e.target.value===t.value&&e.target.value===o.value&&(t.selected=!0,o.selected=!0)}))}))};s.addEventListener("change",(e=>{d(e)})),i.addEventListener("change",(e=>{d(e)}));const u=document.querySelector("main"),p=(e,t)=>{window.util.isMouseDown(e,(()=>t.remove()))},m=(e,t)=>{window.util.isEscEvt(e,(()=>t.remove())),document.removeEventListener("keydown",f),document.removeEventListener("keydown",w)},y=e=>{const t=u.querySelector(".success");p(e,t)},f=e=>{const t=u.querySelector(".success");m(e,t)},v=e=>{const t=u.querySelector(".error");p(e,t)},w=e=>{const t=u.querySelector(".error");m(e,t)},S=()=>{const e=document.querySelector("#success").content.querySelector(".success").cloneNode(!0);u.appendChild(e),h(),document.addEventListener("keydown",f),e.addEventListener("click",y)},q=()=>{const e=document.querySelector("#error").content.querySelector(".error").cloneNode(!0);u.appendChild(e),e.addEventListener("click",v),document.addEventListener("keydown",w)};e.addEventListener("submit",(t=>{window.backend.sendUserData(new FormData(e),S,q),t.preventDefault()}));const _=document.querySelector(".map__pin--main"),h=()=>{e.reset(),window.map.getPinLocation(_)};e.querySelector(".ad-form__reset").addEventListener("click",(e=>{e.preventDefault(),h()}))})(),(()=>{const e=document.querySelector(".map__pins"),t=document.querySelector(".map"),o=document.querySelector(".ad-form"),r=t.querySelector(".map__filters"),n=o.querySelectorAll("fieldset"),c=r.querySelectorAll("select"),s=o.querySelector("#address"),a=e.querySelector(".map__pin--main"),i=a.offsetWidth,l=a.offsetHeight,d=e=>{const t=Math.floor(parseInt(e.style.left,10)-i/2),o=Math.floor(parseInt(e.style.top,10)-l/2+22);s.value=`${t}, ${o}`};window.map={renderPins:e=>{window.util.isMouseDown(e,(()=>{window.setFieldStatus(n,!1),window.setFieldStatus(c,!1),o.classList.remove("ad-form--disabled"),t.classList.remove("map--faded"),window.backend.getAdverts(window.pin.successHandler,window.pin.errorHandler),d(a),a.removeEventListener("click",window.map.renderPins)}))},getPinLocation:d}})(),window.util={isEscEvt:(e,t)=>{"Escape"===e.key&&t()},isEnterEvt:(e,t)=>{"Enter"===e.key&&t()},isMouseDown:(e,t)=>{1===e.which&&t()},errorHandler:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="40px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}},(()=>{const e=document.querySelector(".map__pins").querySelector(".map__pin--main"),t=document.querySelector(".map"),o=document.querySelector(".ad-form"),r=t.querySelector(".map__filters"),n=o.querySelectorAll("fieldset"),c=r.querySelectorAll("select");window.setFieldStatus(n,!0),window.setFieldStatus(c,!0),e.addEventListener("click",window.map.renderPins),o.querySelector("#room_number").addEventListener("change",(e=>{window.setRooms(e.target.value)}))})(),(()=>{const e=document.querySelector("#pin").content,t=document.querySelector(".map__pins");let o=[];const r=t=>{const o=e.cloneNode(!0),r=o.querySelector(".map__pin"),n=o.querySelector("img");return r.style.left=t.location.x-r.offsetWidth+"px",r.style.top=t.location.y-r.offsetHeight+"px",n.src=t.author.avatar,n.alt=t.offer.title,r.addEventListener("click",(()=>{window.card.renderCard(window.card.createCard(t))})),o},n=()=>{let e=t.querySelectorAll(".map__pin");for(let t=1;t<e.length;t++)e[t].remove()},c=()=>{n(),(e=>{window.fragment=document.createDocumentFragment();for(let t=0;t<e.length;t++)window.fragment.appendChild(r(e[t]));t.appendChild(window.fragment)})(o.filter(window.filter.applyFilter).slice(0,5))};document.querySelector(".map__filters").addEventListener("change",(()=>{n(),window.debounce(c)})),window.pin={updatePinsList:c,successHandler:e=>{o=e,c()},errorHandler:e=>{window.util.errorHandler(e)}}})(),(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),o=e.querySelector("#housing-price"),r=e.querySelector("#housing-rooms"),n=e.querySelector("#housing-guests"),c=e.querySelector("#housing-features");window.filter={applyFilter:e=>(e=>"any"===t.value||t.value===e.offer.type)(e)&&(e=>"any"===o.value||("low"===o.value?e.offer.price<1e4:"middle"===o.value?e.offer.price>1e4&&e.offer.price<=5e4:"high"===o.value&&e.offer.price>=5e4))(e)&&(e=>"any"===r.value||parseInt(r.value,10)===e.offer.rooms)(e)&&(e=>"any"===n.value||parseInt(n.value,10)===e.offer.quests)(e)&&(e=>Array.from(c.querySelectorAll(".map__checkbox:checked")).map((e=>e.value)).every((t=>e.offer.features.includes(t))))(e)}})(),(()=>{const e={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},t=document.querySelector(".map"),o=document.querySelector("#card").content.querySelector(".map__card"),r=document.querySelector("#photo").content.querySelector("img"),n=e=>{const o=t.querySelector(".popup");window.util.isMouseDown(e,(()=>o.remove())),document.removeEventListener("keydown",c)},c=e=>{const o=t.querySelector(".popup");window.util.isEscEvt(e,(()=>o.remove())),document.removeEventListener("keydown",c)};window.card={createCard:t=>{const n=o.cloneNode(!0),c=n.querySelector(".popup__avatar"),s=n.querySelector(".popup__title"),a=n.querySelector(".popup__text--address"),i=n.querySelector(".popup__text--price"),l=n.querySelector(".popup__type"),d=n.querySelector(".popup__text--capacity"),u=n.querySelector(".popup__text--time"),p=n.querySelector(".popup__features"),m=n.querySelector(".popup__description"),y=n.querySelector(".popup__photos");return c.src=t.author.avatar,s.textContent=t.offer.title,a.textContent=t.offer.address,i.textContent=t.offer.price+"₽/ночь",l.textContent=e[t.offer.type],d.textContent=`${t.offer.rooms} комнаты для ${t.offer.guests} гостей`,u.textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,p.innerHTML="",t.offer.features.forEach((e=>{const t=((e,t)=>{const o=document.createElement("li");return o.classList.add("popup__feature","popup__feature--"+t),o})(0,e);p.appendChild(t)})),y.innerHTML="",y.appendChild((e=>{const t=document.createDocumentFragment();return e.offer.photos.forEach((e=>{const o=r.cloneNode(!0);o.src=e,t.appendChild(o)})),t})(t)),m.textContent=t.offer.description,n},renderCard:e=>{const o=document.createDocumentFragment(),r=t.querySelector(".popup");r&&r.remove(),o.appendChild(e),o.querySelector(".popup__close").addEventListener("click",n),document.addEventListener("keydown",c),t.appendChild(o)}}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pin--main"),o={TOP_Y:130,BOTTOM_Y:630,LEFT_X:0-t.offsetWidth/2,RIGHT_X:e.offsetWidth-t.offsetWidth/2};t.addEventListener("mousedown",(r=>{r.preventDefault();let n={x:r.clientX,y:r.clientY},c=!1;const s=e=>{e.preventDefault(),c=!0;const r=n.x-e.clientX,s=n.y-e.clientY;n={x:e.clientX,y:e.clientY};let a=t.offsetTop-s,i=t.offsetLeft-r;a<o.TOP_Y?a=o.TOP_Y:a>o.BOTTOM_Y&&(a=o.BOTTOM_Y),i<o.LEFT_X?i=o.LEFT_X:i>o.RIGHT_X&&(i=o.RIGHT_X),t.style.top=a+"px",t.style.left=i+"px",window.map.getPinLocation(t)},a=e=>{if(e.preventDefault(),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",a),c){const e=o=>{o.preventDefault(),t.removeEventListener("click",e)};t.addEventListener("click",e)}};e.classList.contains("map--faded")||(document.addEventListener("mousemove",s),document.addEventListener("mouseup",a))}))})(),(()=>{const e=["image/gif","image/jpg","image/jpeg","image/png"],t=document.querySelector(".ad-form"),o=t.querySelector(".ad-form__field input[type=file]"),r=t.querySelector(".ad-form-header__preview img"),n=t.querySelector(".ad-form__upload input[type=file]"),c=t.querySelector(".ad-form__photo img"),s=(t,o)=>{const r=t.files[0],n=r.type;if(e.some((e=>n===e))){const e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result})),e.readAsDataURL(r)}};o.addEventListener("change",(()=>{s(o,r)})),n.addEventListener("change",(()=>{s(n,c)}))})()})();