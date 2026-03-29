import{r as e}from"./assets/rolldown-runtime-Cq0jCQ29.js";import{n as t,r as n,t as r}from"./assets/vendor-CPGPy-p3.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var i=`55201834-b2019b61559684ce41de74b7e`,a=`https://pixabay.com/api/`;async function o(e,t=1){let r={key:i,q:e,image_type:`photo`,orientation:`horizontal`,safesearch:!0,per_page:15,page:t};return(await n.get(a,{params:r})).data}var s=e(t(),1),c=e(r(),1),l=document.querySelector(`.gallery`),u=document.querySelector(`.loader`);document.querySelector(`#loadmore-button`);var d=new c.default(`.gallery a`,{captionsData:`alt`,captionDelay:250});function f(e){let t=e.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}" class="gallery-link">
          <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-image" />
        </a>
        <div class="image-info">
          <p><span>Likes</span>${e.likes}</p>
          <p><span>Views</span>${e.views}</p>
          <p><span>Comments</span>${e.comments}</p>
          <p><span>Downloads</span>${e.downloads}</p>
        </div>
      </li>
    `).join(``);l.insertAdjacentHTML(`beforeend`,t),d.refresh()}function p(e){s.default.info({message:e,position:`topRight`})}function m(){l.innerHTML=``}function h(){u.style.display=`block`}function g(){u.style.display=`none`}var _=document.querySelector(`.form`);_.addEventListener(`submit`,e=>{e.preventDefault();let t=_.elements[`search-text`].value.trim();if(!t){p(`Please enter a search query.`);return}m(),h(),o(t).then(e=>{f(e)}).catch(e=>{p(`An error occurred while fetching images. Please try again.`),console.error(e)}).finally(()=>{g()}),_.reset()});
//# sourceMappingURL=index.js.map