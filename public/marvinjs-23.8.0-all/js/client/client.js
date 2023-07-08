(()=>{"use strict";var e,t,n,r,o,s;(s=e||(e={})).Call="call",s.Reply="reply",s.Syn="syn",s.SynAck="synAck",s.Ack="ack",function(e){e.Fulfilled="fulfilled",e.Rejected="rejected"}(t||(t={})),function(e){e.ConnectionDestroyed="ConnectionDestroyed",e.ConnectionTimeout="ConnectionTimeout",e.NoIframeSrc="NoIframeSrc"}(n||(n={})),function(e){e.DataCloneError="DataCloneError"}(r||(r={})),(o||(o={})).Message="message";const i={"http:":"80","https:":"443"},a=/^(https?:)?\/\/([^/:]+)?(:(\d+))?/,c=["file:","data:"],l=({name:e,message:t,stack:n})=>({name:e,message:t,stack:n});let d=0;const u=()=>++d,f=e=>e?e.split("."):[],h=(e,t,n)=>{const r=f(t);return r.reduce(((e,t,o)=>(void 0===e[t]&&(e[t]={}),o===r.length-1&&(e[t]=n),e[t])),e),e},g=(e,t)=>{const n={};return Object.keys(e).forEach((r=>{const o=e[r],s=((e,t)=>{const n=f(t||"");return n.push(e),(e=>e.join("."))(n)})(r,t);"object"==typeof o&&Object.assign(n,g(o,s)),"function"==typeof o&&(n[s]=o)})),n},m=(r,s,i,a,c)=>{const{localName:l,local:d,remote:f,originForSending:g,originForReceiving:m}=s;let y=!1;c(`${l}: Connecting call sender`);const p=i.reduce(((r,s)=>{return r[s]=(i=s,(...r)=>{let s;c(`${l}: Sending ${i}() call`);try{f.closed&&(s=!0)}catch(e){s=!0}if(s&&a(),y){const e=new Error(`Unable to send ${i}() call due to destroyed connection`);throw e.code=n.ConnectionDestroyed,e}return new Promise(((n,s)=>{const a=u(),h=r=>{if(r.source!==f||r.data.penpal!==e.Reply||r.data.id!==a)return;if("*"!==m&&r.origin!==m)return void c(`${l} received message from origin ${r.origin} which did not match expected origin ${m}`);const u=r.data;c(`${l}: Received ${i}() reply`),d.removeEventListener(o.Message,h);let g=u.returnValue;u.returnValueIsError&&(g=(e=>{const t=new Error;return Object.keys(e).forEach((n=>t[n]=e[n])),t})(g)),(u.resolution===t.Fulfilled?n:s)(g)};d.addEventListener(o.Message,h);const y={penpal:e.Call,id:a,methodName:i,args:r};f.postMessage(y,g)}))}),r;var i}),{});return Object.assign(r,(e=>{const t={};for(const n in e)h(t,n,e[n]);return t})(p)),()=>{y=!0}},y=s=>{let{iframe:d,methods:u={},childOrigin:f,timeout:h,debug:y=!1}=s;const p=(e=>(...t)=>{e&&console.log("[Penpal]",...t)})(y),b=((e,t)=>{const n=[];let r=!1;return{destroy(e){r||(r=!0,t("Parent: Destroying connection"),n.forEach((t=>{t(e)})))},onDestroy(e){r?e():n.push(e)}}})(0,p),{onDestroy:w,destroy:v}=b;f||((e=>{if(!e.src&&!e.srcdoc){const e=new Error("Iframe must have src or srcdoc property defined.");throw e.code=n.NoIframeSrc,e}})(d),f=(e=>{if(e&&c.find((t=>e.startsWith(t))))return"null";const t=document.location,n=a.exec(e);let r,o,s;return n?(r=n[1]?n[1]:t.protocol,o=n[2],s=n[4]):(r=t.protocol,o=t.hostname,s=t.port),`${r}//${o}${s&&s!==i[r]?`:${s}`:""}`})(d.src));const E="null"===f?"*":f,S=g(u),$=((t,n,r,o)=>s=>{if(!s.source)return;if("*"!==r&&s.origin!==r)return void t(`Parent: Handshake - Received SYN message from origin ${s.origin} which did not match expected origin ${r}`);t("Parent: Handshake - Received SYN, responding with SYN-ACK");const i={penpal:e.SynAck,methodNames:Object.keys(n)};s.source.postMessage(i,o)})(p,S,f,E),A=((n,s,i,a,c)=>{const{destroy:d,onDestroy:u}=a;let f,h;const g={};return a=>{if("*"!==s&&a.origin!==s)return void c(`Parent: Handshake - Received ACK message from origin ${a.origin} which did not match expected origin ${s}`);c("Parent: Handshake - Received ACK");const y={localName:"Parent",local:window,remote:a.source,originForSending:i,originForReceiving:s};f&&f(),f=((n,s,i)=>{const{localName:a,local:c,remote:d,originForSending:u,originForReceiving:f}=n;let h=!1;const g=n=>{if(n.source!==d||n.data.penpal!==e.Call)return;if("*"!==f&&n.origin!==f)return void i(`${a} received message from origin ${n.origin} which did not match expected origin ${f}`);const o=n.data,{methodName:c,args:g,id:m}=o;i(`${a}: Received ${c}() call`);const y=n=>o=>{if(i(`${a}: Sending ${c}() reply`),h)return void i(`${a}: Unable to send ${c}() reply due to destroyed connection`);const s={penpal:e.Reply,id:m,resolution:n,returnValue:o};n===t.Rejected&&o instanceof Error&&(s.returnValue=l(o),s.returnValueIsError=!0);try{d.postMessage(s,u)}catch(n){if(n.name===r.DataCloneError){const r={penpal:e.Reply,id:m,resolution:t.Rejected,returnValue:l(n),returnValueIsError:!0};d.postMessage(r,u)}throw n}};new Promise((e=>e(s[c].apply(s,g)))).then(y(t.Fulfilled),y(t.Rejected))};return c.addEventListener(o.Message,g),()=>{h=!0,c.removeEventListener(o.Message,g)}})(y,n,c),u(f),h&&h.forEach((e=>{delete g[e]})),h=a.data.methodNames;const p=m(g,y,h,d,c);return u(p),g}})(S,f,E,b,p),D=new Promise(((t,r)=>{const s=((e,t)=>{let r;return void 0!==e&&(r=window.setTimeout((()=>{const r=new Error(`Connection timed out after ${e}ms`);r.code=n.ConnectionTimeout,t(r)}),e)),()=>{clearTimeout(r)}})(h,v),i=n=>{if(n.source===d.contentWindow&&n.data)if(n.data.penpal!==e.Syn)if(n.data.penpal!==e.Ack);else{const e=A(n);e&&(s(),t(e))}else $(n)};window.addEventListener(o.Message,i),p("Parent: Awaiting handshake"),((e,t)=>{const{destroy:n,onDestroy:r}=t,o=setInterval((()=>{e.isConnected||(clearInterval(o),n())}),6e4);r((()=>{clearInterval(o)}))})(d,b),w((e=>{window.removeEventListener(o.Message,i),e&&r(e)}))}));return{promise:D,destroy(){v()}}},p=new WeakMap,b=new WeakMap,w=new WeakMap,v=Symbol("anyProducer"),E=Promise.resolve(),S=Symbol("listenerAdded"),$=Symbol("listenerRemoved");let A=!1,D=!1;function j(e){if("string"!=typeof e&&"symbol"!=typeof e&&"number"!=typeof e)throw new TypeError("`eventName` must be a string, symbol, or number")}function P(e){if("function"!=typeof e)throw new TypeError("listener must be a function")}function k(e,t){const n=b.get(e);if(n.has(t))return n.get(t)}function N(e,t){const n="string"==typeof t||"symbol"==typeof t||"number"==typeof t?t:v,r=w.get(e);if(r.has(n))return r.get(n)}function R(e,t){t=Array.isArray(t)?t:[t];let n=!1,r=()=>{},o=[];const s={enqueue(e){o.push(e),r()},finish(){n=!0,r()}};for(const n of t){let t=N(e,n);t||(t=new Set,w.get(e).set(n,t)),t.add(s)}return{async next(){return o?0===o.length?n?(o=void 0,this.next()):(await new Promise((e=>{r=e})),this.next()):{done:!1,value:await o.shift()}:{done:!0}},async return(n){o=void 0;for(const n of t){const t=N(e,n);t&&(t.delete(s),0===t.size)&&w.get(e).delete(n)}return r(),arguments.length>0?{done:!0,value:await n}:{done:!0}},[Symbol.asyncIterator](){return this}}}function C(e){if(void 0===e)return O;if(!Array.isArray(e))throw new TypeError("`methodNames` must be an array of strings");for(const t of e)if(!O.includes(t)){if("string"!=typeof t)throw new TypeError("`methodNames` element must be a string");throw new Error(`${t} is not Emittery method`)}return e}const M=e=>e===S||e===$;function I(e,t,n){if(M(t))try{A=!0,e.emit(t,n)}finally{A=!1}}class T{static mixin(e,t){return t=C(t),n=>{if("function"!=typeof n)throw new TypeError("`target` must be function");for(const e of t)if(void 0!==n.prototype[e])throw new Error(`The property \`${e}\` already exists on \`target\``);Object.defineProperty(n.prototype,e,{enumerable:!1,get:function(){return Object.defineProperty(this,e,{enumerable:!1,value:new T}),this[e]}});const r=t=>function(...n){return this[e][t](...n)};for(const e of t)Object.defineProperty(n.prototype,e,{enumerable:!1,value:r(e)});return n}}static get isDebugEnabled(){if("object"!=typeof globalThis.process)return D;const{env:e}=globalThis.process||{env:{}};return"emittery"===e.DEBUG||"*"===e.DEBUG||D}static set isDebugEnabled(e){D=e}constructor(e={}){p.set(this,new Set),b.set(this,new Map),w.set(this,new Map),w.get(this).set(v,new Set),this.debug=e.debug||{},void 0===this.debug.enabled&&(this.debug.enabled=!1),this.debug.logger||(this.debug.logger=(e,t,n,r)=>{try{r=JSON.stringify(r)}catch{r=`Object with the following keys failed to stringify: ${Object.keys(r).join(",")}`}"symbol"!=typeof n&&"number"!=typeof n||(n=n.toString());const o=new Date,s=`${o.getHours()}:${o.getMinutes()}:${o.getSeconds()}.${o.getMilliseconds()}`;console.log(`[${s}][emittery:${e}][${t}] Event Name: ${n}\n\tdata: ${r}`)})}logIfDebugEnabled(e,t,n){(T.isDebugEnabled||this.debug.enabled)&&this.debug.logger(e,this.debug.name,t,n)}on(e,t){P(t),e=Array.isArray(e)?e:[e];for(const n of e){j(n);let e=k(this,n);e||(e=new Set,b.get(this).set(n,e)),e.add(t),this.logIfDebugEnabled("subscribe",n,void 0),M(n)||I(this,S,{eventName:n,listener:t})}return this.off.bind(this,e,t)}off(e,t){P(t),e=Array.isArray(e)?e:[e];for(const n of e){j(n);const e=k(this,n);e&&(e.delete(t),0===e.size)&&b.get(this).delete(n),this.logIfDebugEnabled("unsubscribe",n,void 0),M(n)||I(this,$,{eventName:n,listener:t})}}once(e){let t;const n=new Promise((n=>{t=this.on(e,(e=>{t(),n(e)}))}));return n.off=t,n}events(e){e=Array.isArray(e)?e:[e];for(const t of e)j(t);return R(this,e)}async emit(e,t){if(j(e),M(e)&&!A)throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");this.logIfDebugEnabled("emit",e,t),function(e,t,n){const r=w.get(e);if(r.has(t))for(const e of r.get(t))e.enqueue(n);if(r.has(v)){const e=Promise.all([t,n]);for(const t of r.get(v))t.enqueue(e)}}(this,e,t);const n=k(this,e)||new Set,r=p.get(this),o=[...n],s=M(e)?[]:[...r];await E,await Promise.all([...o.map((async e=>{if(n.has(e))return e(t)})),...s.map((async n=>{if(r.has(n))return n(e,t)}))])}async emitSerial(e,t){if(j(e),M(e)&&!A)throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");this.logIfDebugEnabled("emitSerial",e,t);const n=k(this,e)||new Set,r=p.get(this),o=[...n],s=[...r];await E;for(const e of o)n.has(e)&&await e(t);for(const n of s)r.has(n)&&await n(e,t)}onAny(e){return P(e),this.logIfDebugEnabled("subscribeAny",void 0,void 0),p.get(this).add(e),I(this,S,{listener:e}),this.offAny.bind(this,e)}anyEvent(){return R(this)}offAny(e){P(e),this.logIfDebugEnabled("unsubscribeAny",void 0,void 0),I(this,$,{listener:e}),p.get(this).delete(e)}clearListeners(e){e=Array.isArray(e)?e:[e];for(const t of e)if(this.logIfDebugEnabled("clear",t,void 0),"string"==typeof t||"symbol"==typeof t||"number"==typeof t){const e=k(this,t);e&&e.clear();const n=N(this,t);if(n){for(const e of n)e.finish();n.clear()}}else{p.get(this).clear();for(const[e,t]of b.get(this).entries())t.clear(),b.get(this).delete(e);for(const[e,t]of w.get(this).entries()){for(const e of t)e.finish();t.clear(),w.get(this).delete(e)}}}listenerCount(e){e=Array.isArray(e)?e:[e];let t=0;for(const n of e)if("string"!=typeof n){void 0!==n&&j(n),t+=p.get(this).size;for(const e of b.get(this).values())t+=e.size;for(const e of w.get(this).values())t+=e.size}else t+=p.get(this).size+(k(this,n)||new Set).size+(N(this,n)||new Set).size+(N(this)||new Set).size;return t}bindMethods(e,t){if("object"!=typeof e||null===e)throw new TypeError("`target` must be an object");t=C(t);for(const n of t){if(void 0!==e[n])throw new Error(`The property \`${n}\` already exists on \`target\``);Object.defineProperty(e,n,{enumerable:!1,value:this[n].bind(this)})}}}const O=Object.getOwnPropertyNames(T.prototype).filter((e=>"constructor"!==e));Object.defineProperty(T,"listenerAdded",{value:S,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(T,"listenerRemoved",{value:$,writable:!1,enumerable:!0,configurable:!1});class x{constructor(){this.events=new Map,this.register=e=>!(!(e=>["molchange","selectionchange","undo","redo"].includes(e))(e)||this.hasEvent(e)||(this.events.set(e),0)),this.hasEvent=e=>this.events.has(e)}}const L=(e,t)=>{if("string"==typeof e){let n=null;try{n=t?new URL(e,document.location):new URL(e)}catch(e){}if(null!=n&&null!=n.origin&&("http:"==n.protocol||"https:"==n.protocol))return n}return null};class z{constructor(e,t){let n=e,r=t;this.getDisplaySettings=()=>new Promise(((e,t)=>{n.getDisplaySettings().then(e,t)})),this.exportStructure=(e,t)=>n.exportStructure(e,t),this.importStructure=(e,t,r)=>n.importStructure(e,t,r),this.pasteStructure=(e,t,r)=>n.pasteStructure(e,t,r),this.setDisplaySettings=e=>n.setDisplaySettings(e),this.isEmpty=()=>n.isEmpty(),this.clear=()=>n.clear(),this.on=(e,t)=>{n.on(e),r.on(e,t)}}}class F{constructor(){this.events=new x,this.emitter=new T({debug:{name:"SketchEmitter",enabled:!0}})}on(e,t){this.events.register(e),this.events.hasEvent(e)&&this.emitter.on(e,t)}fire(e){this.events.hasEvent(e)&&this.emitter.emit(e)}}window.ChemaxonMarvinJs=class{static createEditor(e,t,n){const r=document.createElement("iframe");let o=null;if(t&&(o=L(t,!1)||L(t,!0),void 0===o||null==o))return Promise.reject("The given url is not valid string");const s=o?o.toString()+"/js/client/":"";for(prop in r.src=s+"editor-plugin.html",r.width=500,r.height=450,n)r.setAttribute("data-"+prop,n[prop]);var i=document.getElementById(e);i?i.appendChild(r):document.body.appendChild(r);let a=null,c=new F;return y({iframe:r,debug:!1,timeout:1e4,methods:{fire(e){c.fire(e)},onSketchLoaded(){"function"==typeof a&&(a(),a=null)}}}).promise.then((e=>new Promise((function(t){a=()=>{t(new z(e,c))}}))))}}})();
//# sourceMappingURL=client.js.map