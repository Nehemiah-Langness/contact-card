if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const t=e=>s(e,o),l={module:{uri:o},exports:d,require:t};i[o]=Promise.all(n.map((e=>l[e]||t(e)))).then((e=>(r(...e),d)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-1ad3481d.js",revision:null},{url:"assets/index-6c5ed399.css",revision:null},{url:"index.html",revision:"cfb1d174e08b345e3ff280ad790682c8"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.svg",revision:"7bb31052bea0a5331f37e379c82a2f1b"},{url:"logo192x192.png",revision:"e43845df5a41b736315692a1c23a5d81"},{url:"logo512x512.png",revision:"4df9217cd546f3d9edfd67ee16335d53"},{url:"manifest.webmanifest",revision:"1c8fa48682ab3da5747d0fef8d987810"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
