if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(i[f])return;let o={};const t=e=>s(e,f),d={module:{uri:f},exports:o,require:t};i[f]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-55453404.css",revision:null},{url:"assets/index-9f6bdcc9.js",revision:null},{url:"index.html",revision:"4155ec0fe43ac2ffb0ffecd819976fb4"},{url:"registerSW.js",revision:"887d659a1e4fa645d5e6170b1686fc11"},{url:"favicon.svg",revision:"e24b6bd06e0dee385f4256d86c2d780f"},{url:"icon-192.svg",revision:"625ee0b4f182ea93054151e4e01af315"},{url:"icon-512.svg",revision:"64ed40e157fe2fe06c8211b15eda264b"},{url:"manifest.webmanifest",revision:"622e3150bf096f9faa8f9df3f31b50d1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
