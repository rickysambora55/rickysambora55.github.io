(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const _="modulepreload",P=function(r){return"/"+r},x={},m=function(n,o,c){let e=Promise.resolve();if(o&&o.length>0){let v=function(s){return Promise.all(s.map(p=>Promise.resolve(p).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var i=v;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),l=d?.nonce||d?.getAttribute("nonce");e=v(o.map(s=>{if(s=P(s),s in x)return;x[s]=!0;const p=s.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${f}`))return;const a=document.createElement("link");if(a.rel=p?"stylesheet":_,p||(a.as="script"),a.crossOrigin="",a.href=s,l&&a.setAttribute("nonce",l),document.head.appendChild(a),p)return new Promise((L,E)=>{a.addEventListener("load",L),a.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${s}`)))})}))}function t(d){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=d,window.dispatchEvent(l),!l.defaultPrevented)throw d}return e.then(d=>{for(const l of d||[])l.status==="rejected"&&t(l.reason);return n().catch(t)})},j=[{slug:"project-a",title:"Project A",image:"a.jpg",description:"This is Project A"},{slug:"project-b",title:"Project B",image:"b.jpg",description:"This is Project B"}];if(sessionStorage.redirect){const r=sessionStorage.redirect;delete sessionStorage.redirect,history.replaceState(null,"",r)}const u=Object.assign({"../../views/404.html":()=>m(()=>import("./404-CFAsrWoh.js"),[]).then(r=>r.default),"../../views/index.html":()=>m(()=>import("./index-CuGUuytf.js"),[]).then(r=>r.default),"../../views/partials/project.html":()=>m(()=>import("./project-B4SG0Sls.js"),[]).then(r=>r.default),"../../views/projects.html":()=>m(()=>import("./projects-BOPlO3lN.js"),[]).then(r=>r.default)}),g=location.pathname.slice(1)||"index",y=`../../views/${g}.html`,w="../../views/404.html",T=["partials"],b=g.split("/")[0],h=`
<main
    class="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 px-6 py-24 sm:py-32 lg:px-8 grid place-items-center"
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
`;if(b==="project"){const r=g.split("/")[1],n="../../views/partials/project.html";u[n]?Promise.all([u[n]().then(o=>fetch(o).then(c=>c.text()))]).then(([o])=>{const c=j.find(t=>t.slug===r);if(!c){u[w]().then(t=>{fetch(t).then(i=>i.text()).then(i=>{app.innerHTML=i})});return}const e=document.createElement("div");e.innerHTML=o;for(const t in c){const i=e.querySelector(`#${t}`);i&&(i.innerHTML=c[t])}app.innerHTML=e.innerHTML}).catch(o=>{console.error("Error loading project:",o),app.innerHTML=h}):app.innerHTML=h}else!u[y]||T.includes(b)?u[w]().then(r=>{fetch(r).then(n=>n.text()).then(n=>{app.innerHTML=n})}):u[y]().then(r=>{fetch(r).then(n=>n.text()).then(n=>{app.innerHTML=n}).catch(n=>{console.error("Error loading HTML:",n),app.innerHTML=h})});
