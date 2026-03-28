import{r as e}from"./assets/rolldown-runtime-Cq0jCQ29.js";import{n as t,t as n}from"./assets/vendor-Cx6EavNb.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var r=`55201834-b2019b61559684ce41de74b7e`,i=`https://pixabay.com/api/`;function a(e){let n={key:r,q:e,image_type:`photo`,orientation:`horizontal`,safesearch:!0};return t.get(i,{params:n}).then(e=>e.data.hits).catch(e=>{throw Error(`Failed to fetch images`)})}var o=e(n(),1),s=document.querySelector(`.gallery`),c;function l(e){if(e.length===0){u(`Sorry, there are no images matching your search query. Please try again!`);return}s.innerHTML=e.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}" class="gallery-link">
          <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-image" />
        </a>
        <div class="image-info">
          <p>Likes: ${e.likes}</p>
          <p>Views: ${e.views}</p>
          <p>Comments: ${e.comments}</p>
          <p>Downloads: ${e.downloads}</p>
        </div>
      </li>
    `).join(``),c?c.refresh():c=new window.SimpleLightbox(`.gallery a`,{captionsData:`alt`,captionDelay:250})}function u(e){o.default.info({title:`Info`,message:e,position:`topRight`})}function d(){s.innerHTML=``}function f(){let e=document.querySelector(`.loader`);e.style.display=`block`}function p(){let e=document.querySelector(`.loader`);e.style.display=`none`}var m=document.querySelector(`.form`);m.addEventListener(`submit`,e=>{e.preventDefault();let t=m.elements[`search-text`].value.trim();if(!t){u(`Please enter a search query.`);return}d(),f(),a(t).then(e=>{l(e)}).catch(e=>{u(`An error occurred while fetching images. Please try again.`),console.error(e)}).finally(()=>{p()}),m.reset()});
//# sourceMappingURL=index.js.map