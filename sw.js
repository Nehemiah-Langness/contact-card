if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>s(e,o),l={module:{uri:o},exports:t,require:d};i[o]=Promise.all(n.map((e=>l[e]||d(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-1ad3481d.js",revision:null},{url:"assets/index-6c5ed399.css",revision:null},{url:"index.html",revision:"c52b7af2b4d782146f6278e48f4c716f"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.svg",revision:"8765fc19a8802b37859772977f95cf83"},{url:"logo192x192.png",revision:"692133530d68cbbfbb24ac37d9befb66"},{url:"logo512x512.png",revision:"632593838d82d011b8662bdb09dca160"},{url:"manifest.webmanifest",revision:"1c8fa48682ab3da5747d0fef8d987810"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
