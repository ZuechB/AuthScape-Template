if(!self.define){let e,s={};const i=(i,t)=>(i=new URL(i+".js",t).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(t,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let c={};const r=e=>i(e,n),d={module:{uri:n},exports:c,require:r};s[n]=Promise.all(t.map((e=>d[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DefaultNoImage.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"},{url:"/_next/static/-j8R3ekrk8acG-J0rrwL1/_buildManifest.js",revision:"cdd2072d7299442a313ec1f63f0f4c5b"},{url:"/_next/static/-j8R3ekrk8acG-J0rrwL1/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/102-7f05dedc9196726f.js",revision:"7f05dedc9196726f"},{url:"/_next/static/chunks/140-3fb2c5a9641fce4b.js",revision:"3fb2c5a9641fce4b"},{url:"/_next/static/chunks/234-be0e1ab5010eb355.js",revision:"be0e1ab5010eb355"},{url:"/_next/static/chunks/27739d3a.8c38b00de64617e7.js",revision:"8c38b00de64617e7"},{url:"/_next/static/chunks/397-f1013ae6bf8f5c88.js",revision:"f1013ae6bf8f5c88"},{url:"/_next/static/chunks/413-c93ebd7c1ba1385a.js",revision:"c93ebd7c1ba1385a"},{url:"/_next/static/chunks/448-0f7d3a5e8c0d45c3.js",revision:"0f7d3a5e8c0d45c3"},{url:"/_next/static/chunks/545-fe11099bcc775d4d.js",revision:"fe11099bcc775d4d"},{url:"/_next/static/chunks/556.29c03c3e81300fa8.js",revision:"29c03c3e81300fa8"},{url:"/_next/static/chunks/591-18427c4675612e10.js",revision:"18427c4675612e10"},{url:"/_next/static/chunks/599.29995e100cb45871.js",revision:"29995e100cb45871"},{url:"/_next/static/chunks/633-4ff743c05760a3f9.js",revision:"4ff743c05760a3f9"},{url:"/_next/static/chunks/664-7af439310aee7d36.js",revision:"7af439310aee7d36"},{url:"/_next/static/chunks/819-c991ea3058239dca.js",revision:"c991ea3058239dca"},{url:"/_next/static/chunks/912-0a70bba4de16a6d6.js",revision:"0a70bba4de16a6d6"},{url:"/_next/static/chunks/948-6c1a0c3eb7f16731.js",revision:"6c1a0c3eb7f16731"},{url:"/_next/static/chunks/961-4437634be1a2a561.js",revision:"4437634be1a2a561"},{url:"/_next/static/chunks/d711c980-2dbdff05eef95f77.js",revision:"2dbdff05eef95f77"},{url:"/_next/static/chunks/e0ce3c29.e997d5a6df0cfbbc.js",revision:"e997d5a6df0cfbbc"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-9d3e2373d1a03d88.js",revision:"9d3e2373d1a03d88"},{url:"/_next/static/chunks/pages/404-759ee94e4909f97f.js",revision:"759ee94e4909f97f"},{url:"/_next/static/chunks/pages/_app-79ed18b2a3bfb27e.js",revision:"79ed18b2a3bfb27e"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/blocky-51681687185de626.js",revision:"51681687185de626"},{url:"/_next/static/chunks/pages/index-02d4eb9e9d3ba2d9.js",revision:"02d4eb9e9d3ba2d9"},{url:"/_next/static/chunks/pages/login-cfe6a7d8a0dea774.js",revision:"cfe6a7d8a0dea774"},{url:"/_next/static/chunks/pages/portal-8a149f1848dda2c1.js",revision:"8a149f1848dda2c1"},{url:"/_next/static/chunks/pages/portal/documentManager-b86f1eb01ea13075.js",revision:"b86f1eb01ea13075"},{url:"/_next/static/chunks/pages/portal/editor/%5BpageId%5D-da5ff0267ac7c1c8.js",revision:"da5ff0267ac7c1c8"},{url:"/_next/static/chunks/pages/portal/identityserver/applications-8c24b280bca69aaa.js",revision:"8c24b280bca69aaa"},{url:"/_next/static/chunks/pages/portal/invoices-999c128b43c8baa3.js",revision:"999c128b43c8baa3"},{url:"/_next/static/chunks/pages/portal/oem-44008d0301848f6b.js",revision:"44008d0301848f6b"},{url:"/_next/static/chunks/pages/portal/pages-7f031383d8c12cbd.js",revision:"7f031383d8c12cbd"},{url:"/_next/static/chunks/pages/portal/tickets-69be33ed4c0e6ae1.js",revision:"69be33ed4c0e6ae1"},{url:"/_next/static/chunks/pages/portal/tickets/%5Bid%5D-72569fed9d5b13de.js",revision:"72569fed9d5b13de"},{url:"/_next/static/chunks/pages/signin-oidc-64f166b97867642f.js",revision:"64f166b97867642f"},{url:"/_next/static/chunks/pages/signout-oidc-4341b6d84901ede5.js",revision:"4341b6d84901ede5"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-af38967f35cc1a52.js",revision:"af38967f35cc1a52"},{url:"/_next/static/css/149b18973e5508c7.css",revision:"149b18973e5508c7"},{url:"/_next/static/css/57ce96b5953bbb58.css",revision:"57ce96b5953bbb58"},{url:"/_next/static/css/989975dbea0cd821.css",revision:"989975dbea0cd821"},{url:"/_next/static/media/main-fonts.304f0c52.ttf",revision:"304f0c52"},{url:"/_next/static/media/main-fonts.4f7a7307.eot",revision:"4f7a7307"},{url:"/_next/static/media/main-fonts.8ff91f00.woff",revision:"8ff91f00"},{url:"/_next/static/media/main-fonts.f5fb7e4b.svg",revision:"f5fb7e4b"},{url:"/_next/static/media/sprite.1.1.5x.9767ed27.90dcdc97.png",revision:"90dcdc97"},{url:"/_next/static/media/sprite.1.1x.440fbbec.b7deab97.png",revision:"b7deab97"},{url:"/_next/static/media/sprite.1.2x.87a96297.934c5383.png",revision:"934c5383"},{url:"/_next/static/media/sprite.2.1.5x.1c6a5f02.5505f2c8.png",revision:"5505f2c8"},{url:"/_next/static/media/sprite.2.1x.59e1b42b.d03bc999.png",revision:"d03bc999"},{url:"/_next/static/media/sprite.2.2x.368082c5.191a400b.png",revision:"191a400b"},{url:"/_next/static/media/sprite.3.1.5x.3bb24ab3.09828a92.png",revision:"09828a92"},{url:"/_next/static/media/sprite.3.1x.599cdda1.5e42f62e.png",revision:"5e42f62e"},{url:"/_next/static/media/sprite.3.2x.cd68b1e8.acc42e65.png",revision:"acc42e65"},{url:"/_next/static/media/sprite.4.1.5x.9ffee219.d246bc69.png",revision:"d246bc69"},{url:"/_next/static/media/sprite.4.1x.88737355.bc4dd4e6.png",revision:"bc4dd4e6"},{url:"/_next/static/media/sprite.4.2x.06dada3e.51f1220a.png",revision:"51f1220a"},{url:"/_next/static/media/sprite.5.1.5x.f1f419c2.b88c9165.png",revision:"b88c9165"},{url:"/_next/static/media/sprite.5.1x.7e4b0793.a051636f.png",revision:"a051636f"},{url:"/_next/static/media/sprite.5.2x.7061ab8d.4908e212.png",revision:"4908e212"},{url:"/_next/static/media/sprite.6.1.5x.5ae614a7.0b2874f4.png",revision:"0b2874f4"},{url:"/_next/static/media/sprite.6.1x.235d143f.704784a2.png",revision:"704784a2"},{url:"/_next/static/media/sprite.6.2x.b4e54df0.2fc2446e.png",revision:"2fc2446e"},{url:"/_next/static/media/sprite.7.1.5x.f248762f.c70707e9.png",revision:"c70707e9"},{url:"/_next/static/media/sprite.7.1x.d7a7343f.0ef0eae9.png",revision:"0ef0eae9"},{url:"/_next/static/media/sprite.7.2x.8f83c5e7.57a5eb46.png",revision:"57a5eb46"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/manifest.json",revision:"9b9e104918714c244e4f5e43ce7f0456"},{url:"/robots.txt",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));