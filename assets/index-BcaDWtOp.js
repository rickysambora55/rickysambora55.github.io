(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const P="modulepreload",S=function(e){return"/"+e},x={},m=function(t,o,a){let r=Promise.resolve();if(o&&o.length>0){let d=function(i){return Promise.all(i.map(c=>Promise.resolve(c).then(l=>({status:"fulfilled",value:l}),l=>({status:"rejected",reason:l}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),p=s?.nonce||s?.getAttribute("nonce");r=d(o.map(i=>{if(i=S(i),i in x)return;x[i]=!0;const c=i.endsWith(".css"),l=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${l}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":P,c||(u.as="script"),u.crossOrigin="",u.href=i,p&&u.setAttribute("nonce",p),document.head.appendChild(u),c)return new Promise((M,H)=>{u.addEventListener("load",M),u.addEventListener("error",()=>H(new Error(`Unable to preload CSS for ${i}`)))})}))}function n(s){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=s,window.dispatchEvent(p),!p.defaultPrevented)throw s}return r.then(s=>{for(const p of s||[])p.status==="rejected"&&n(p.reason);return t().catch(n)})},O="/data/projects.json",b="/assets/main-sOkBwpIW.js";async function $(e){const t=await fetch(e);if(!t.ok)throw new Error("Failed to fetch: "+e);return t.json()}const k=await $(O);if(sessionStorage.redirect){const e=sessionStorage.redirect;delete sessionStorage.redirect,history.replaceState(null,"",e)}function f(e){e.querySelectorAll("script").forEach(o=>{const a=document.createElement("script");[...o.attributes].forEach(r=>{a.setAttribute(r.name,r.value)}),a.src||(a.textContent=o.textContent),o.replaceWith(a)})}function y(e){const t="text-md/6 hover:text-pink-300 font-semibold text-gray-900 transition-colors duration-150",o="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50";if(!(location.pathname==="/"||location.pathname==="/index")){const r=new DOMParser().parseFromString(e,"text/html"),n=r.querySelector("#desktop-menu"),s=r.querySelector("#mobile-menu");return n&&(n.innerHTML="",n.innerHTML=`
                <a href="/" class="${t}">Home</a>
                <a href="/projects" class="${t}">Projects</a>
            `),s&&(s.innerHTML="",s.innerHTML=`
                <a href="/" class="${o}">Home</a>
                <a href="/projects" class="${o}">Projects</a>
            `),r.body.innerHTML}return e}function w(e){const t=document.createElement("script");t.type="module",t.src=e,document.body.appendChild(t)}const h=Object.assign({"../../views/404.html":()=>m(()=>import("./404-DcIttmf4.js"),[]).then(e=>e.default),"../../views/index.html":()=>m(()=>import("./index-BrxqVxQ_.js"),[]).then(e=>e.default),"../../views/partials/footer.html":()=>m(()=>import("./footer-BqYMhEpR.js"),[]).then(e=>e.default),"../../views/partials/header.html":()=>m(()=>import("./header-BZQ5E8kt.js"),[]).then(e=>e.default),"../../views/partials/project.html":()=>m(()=>import("./project-BH-Pchwo.js"),[]).then(e=>e.default),"../../views/projects.html":()=>m(()=>import("./projects-BPXHoImq.js"),[]).then(e=>e.default)}),v=location.pathname.slice(1)||"index",L=`../../views/${v}.html`,_="../../views/404.html",E="../../views/partials/header.html",T="../../views/partials/footer.html",A=["partials"],j=v.split("/")[0],g=`
<main
    class="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 px-6 lg:px-8 grid place-items-center"
>
    <div class="text-center animate-fade-in">
        <p
            class="text-[8rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-md select-none"
        >
            Oops! Something went wrong
        </p>
        <h1
            class="mt-4 text-5xl font-bold tracking-tight text-gray-800 sm:text-6xl"
        >
            Failed to load this page
        </h1>
        <p class="mt-6 text-lg text-gray-600 sm:text-xl max-w-lg mx-auto">
            Something went wrong while loading the content.
        </p>
        <div class="mt-10 flex justify-center gap-x-6">
            <a
                href="/"
                class="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            >
                Go back home
            </a>
        </div>
    </div>
</main>
`;if(j==="project"){const e=v.split("/")[1],t="../../views/partials/project.html";h[t]?Promise.all([h[E]().then(o=>fetch(o).then(a=>a.text())),h[t]().then(o=>fetch(o).then(a=>a.text())),h[T]().then(o=>fetch(o).then(a=>a.text()))]).then(([o,a,r])=>{const n=k.find(d=>d.slug===e);if(!n){h[_]().then(d=>{fetch(d).then(i=>i.text()).then(i=>{app.innerHTML=i,f(app)})});return}const s=document.createElement("div");s.innerHTML=a;for(const d in n){const i=s.querySelector(`#${d}`);if(i)if(Array.isArray(n[d]))if(d==="images"){i.innerHTML=n.images.map(l=>`<div class="w-full h-96 bg-gray-900 flex items-center justify-center flex-shrink-0">
                                            <img
                                                alt="${l}"
                                                title="${l}"
                                                src="/img/projects/${l}"
                                                class="max-h-96 object-contain"
                                            />
                                        </div>
                                        `).join("");const c=s.querySelector("#indicators");c.innerHTML=n.images.map((l,u)=>`<div
                                            class="w-3 h-3 bg-white rounded-full opacity-70 hover:cursor-pointer"
                                            data-index="${u}"
                                        ></div>`).join("")}else d==="techs"&&(i.innerHTML=n.techs.map(c=>`<img src="/img/${c}.svg" alt="${c}" title="${c}" class="h-10 w-10 inline-block mr-2" />`).join(""));else d==="links"?(i.innerHTML="",Object.values(n.links).length>0?Object.values(n.links).forEach(c=>{let l="bg-gray-600 hover:bg-gray-500";c?.label?.includes("Source")&&(l="bg-indigo-600 hover:bg-indigo-500"),i.innerHTML+=`
                                    <a
                                    href="${c.url}"
                                    class="text-white ${l} rounded-lg py-2 px-4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    ${c.label}
                                    </a>
                                `}):i.innerHTML='<p class="text-lg text-gray-600">No links available</p>'):i.innerHTML=n[d]}const p=y(o);app.innerHTML=p+s.innerHTML+r,w(b),f(app)}).catch(o=>{console.error("Error loading project:",o),app.innerHTML=g,f(app)}):(app.innerHTML=g,f(app))}else!h[L]||A.includes(j)?h[_]().then(e=>{fetch(e).then(t=>t.text()).then(t=>{app.innerHTML=t,f(app)})}):Promise.all([h[E]().then(e=>fetch(e).then(t=>t.text())),h[L]().then(e=>fetch(e).then(t=>t.text())),h[T]().then(e=>fetch(e).then(t=>t.text()))]).then(([e,t,o])=>{const a=y(e);app.innerHTML=a+t+o,w(b),f(app)}).catch(e=>{console.error("Error loading HTML:",e),app.innerHTML=g,f(app)});
