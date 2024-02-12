import{n as ve,s as ot,o as Ee,t as ke}from"../chunks/scheduler.f395afe0.js";import{a as it,b as B}from"../chunks/paths.e4e6758b.js";function st(e,n){return e==="/"||n==="ignore"?e:n==="never"?e.endsWith("/")?e.slice(0,-1):e:n==="always"&&!e.endsWith("/")?e+"/":e}function ct(e){return e.split("%25").map(decodeURI).join("%25")}function lt(e){for(const n in e)e[n]=decodeURIComponent(e[n]);return e}const ft=["href","pathname","search","searchParams","toString","toJSON"];function ut(e,n){const i=new URL(e);for(const o of ft)Object.defineProperty(i,o,{get(){return n(),e[o]},enumerable:!0,configurable:!0});return dt(i),i}function dt(e){Object.defineProperty(e,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const pt="/__data.json";function ht(e){return e.replace(/\/$/,"")+pt}function gt(...e){let n=5381;for(const i of e)if(typeof i=="string"){let o=i.length;for(;o;)n=n*33^i.charCodeAt(--o)}else if(ArrayBuffer.isView(i)){const o=new Uint8Array(i.buffer,i.byteOffset,i.byteLength);let u=o.length;for(;u;)n=n*33^o[--u]}else throw new TypeError("value must be a string or TypedArray");return(n>>>0).toString(36)}const Xe=window.fetch;window.fetch=(e,n)=>((e instanceof Request?e.method:(n==null?void 0:n.method)||"GET")!=="GET"&&oe.delete(Le(e)),Xe(e,n));const oe=new Map;function mt(e,n){const i=Le(e,n),o=document.querySelector(i);if(o!=null&&o.textContent){const{body:u,...f}=JSON.parse(o.textContent),_=o.getAttribute("data-ttl");return _&&oe.set(i,{body:u,init:f,ttl:1e3*Number(_)}),Promise.resolve(new Response(u,f))}return window.fetch(e,n)}function _t(e,n,i){if(oe.size>0){const o=Le(e,i),u=oe.get(o);if(u){if(performance.now()<u.ttl&&["default","force-cache","only-if-cached",void 0].includes(i==null?void 0:i.cache))return new Response(u.body,u.init);oe.delete(o)}}return window.fetch(n,i)}function Le(e,n){let o=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if(n!=null&&n.headers||n!=null&&n.body){const u=[];n.headers&&u.push([...new Headers(n.headers)].join(",")),n.body&&(typeof n.body=="string"||ArrayBuffer.isView(n.body))&&u.push(n.body),o+=`[data-hash="${gt(...u)}"]`}return o}const wt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function yt(e){const n=[];return{pattern:e==="/"?/^\/$/:new RegExp(`^${vt(e).map(o=>{const u=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(o);if(u)return n.push({name:u[1],matcher:u[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const f=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(o);if(f)return n.push({name:f[1],matcher:f[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!o)return;const _=o.split(/\[(.+?)\](?!\])/);return"/"+_.map((p,h)=>{if(h%2){if(p.startsWith("x+"))return Se(String.fromCharCode(parseInt(p.slice(2),16)));if(p.startsWith("u+"))return Se(String.fromCharCode(...p.slice(2).split("-").map(x=>parseInt(x,16))));const g=wt.exec(p);if(!g)throw new Error(`Invalid param: ${p}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,N,$,R,D]=g;return n.push({name:R,matcher:D,optional:!!N,rest:!!$,chained:$?h===1&&_[0]==="":!1}),$?"(.*?)":N?"([^/]*)?":"([^/]+?)"}return Se(p)}).join("")}).join("")}/?$`),params:n}}function bt(e){return!/^\([^)]+\)$/.test(e)}function vt(e){return e.slice(1).split("/").filter(bt)}function Et(e,n,i){const o={},u=e.slice(1),f=u.filter(s=>s!==void 0);let _=0;for(let s=0;s<n.length;s+=1){const p=n[s];let h=u[s-_];if(p.chained&&p.rest&&_&&(h=u.slice(s-_,s+1).filter(g=>g).join("/"),_=0),h===void 0){p.rest&&(o[p.name]="");continue}if(!p.matcher||i[p.matcher](h)){o[p.name]=h;const g=n[s+1],N=u[s+1];g&&!g.rest&&g.optional&&N&&p.chained&&(_=0),!g&&!N&&Object.keys(o).length===f.length&&(_=0);continue}if(p.optional&&p.chained){_++;continue}return}if(!_)return o}function Se(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function kt({nodes:e,server_loads:n,dictionary:i,matchers:o}){const u=new Set(n);return Object.entries(i).map(([s,[p,h,g]])=>{const{pattern:N,params:$}=yt(s),R={id:s,exec:D=>{const x=N.exec(D);if(x)return Et(x,$,o)},errors:[1,...g||[]].map(D=>e[D]),layouts:[0,...h||[]].map(_),leaf:f(p)};return R.errors.length=R.layouts.length=Math.max(R.errors.length,R.layouts.length),R});function f(s){const p=s<0;return p&&(s=~s),[p,e[s]]}function _(s){return s===void 0?s:[u.has(s),e[s]]}}function Ze(e){try{return JSON.parse(sessionStorage[e])}catch{}}function Ge(e,n){const i=JSON.stringify(n);try{sessionStorage[e]=i}catch{}}const Y=[];function Oe(e,n=ve){let i;const o=new Set;function u(s){if(ot(e,s)&&(e=s,i)){const p=!Y.length;for(const h of o)h[1](),Y.push(h,e);if(p){for(let h=0;h<Y.length;h+=2)Y[h][0](Y[h+1]);Y.length=0}}}function f(s){u(s(e))}function _(s,p=ve){const h=[s,p];return o.add(h),o.size===1&&(i=n(u,f)||ve),s(e),()=>{o.delete(h),o.size===0&&i&&(i(),i=null)}}return{set:u,update:f,subscribe:_}}const St="1707759024769",Qe="sveltekit:snapshot",et="sveltekit:scroll",q="sveltekit:index",pe={tap:1,hover:2,viewport:3,eager:4,off:-1},he=location.origin;function ze(e){let n=e.baseURI;if(!n){const i=e.getElementsByTagName("base");n=i.length?i[0].href:e.URL}return n}function ae(){return{x:pageXOffset,y:pageYOffset}}function X(e,n){return e.getAttribute(`data-sveltekit-${n}`)}const Be={...pe,"":pe.hover};function tt(e){let n=e.assignedSlot??e.parentNode;return(n==null?void 0:n.nodeType)===11&&(n=n.host),n}function He(e,n){for(;e&&e!==n;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=tt(e)}}function Re(e,n){let i;try{i=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const o=e instanceof SVGAElement?e.target.baseVal:e.target,u=!i||!!o||de(i,n)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),f=(i==null?void 0:i.origin)===he&&e.hasAttribute("download");return{url:i,external:u,target:o,download:f}}function ue(e){let n=null,i=null,o=null,u=null,f=null,_=null,s=e;for(;s&&s!==document.documentElement;)o===null&&(o=X(s,"preload-code")),u===null&&(u=X(s,"preload-data")),n===null&&(n=X(s,"keepfocus")),i===null&&(i=X(s,"noscroll")),f===null&&(f=X(s,"reload")),_===null&&(_=X(s,"replacestate")),s=tt(s);function p(h){switch(h){case"":case"true":return!0;case"off":case"false":return!1;default:return null}}return{preload_code:Be[o??"off"],preload_data:Be[u??"off"],keep_focus:p(n),noscroll:p(i),reload:p(f),replace_state:p(_)}}function Je(e){const n=Oe(e);let i=!0;function o(){i=!0,n.update(_=>_)}function u(_){i=!1,n.set(_)}function f(_){let s;return n.subscribe(p=>{(s===void 0||i&&p!==s)&&_(s=p)})}return{notify:o,set:u,subscribe:f}}function Rt(){const{set:e,subscribe:n}=Oe(!1);let i;async function o(){clearTimeout(i);try{const u=await fetch(`${it}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!u.ok)return!1;const _=(await u.json()).version!==St;return _&&(e(!0),clearTimeout(i)),_}catch{return!1}}return{subscribe:n,check:o}}function de(e,n){return e.origin!==he||!e.pathname.startsWith(n)}const At=-1,It=-2,Lt=-3,Ot=-4,Ut=-5,Pt=-6;function xt(e,n){if(typeof e=="number")return u(e,!0);if(!Array.isArray(e)||e.length===0)throw new Error("Invalid input");const i=e,o=Array(i.length);function u(f,_=!1){if(f===At)return;if(f===Lt)return NaN;if(f===Ot)return 1/0;if(f===Ut)return-1/0;if(f===Pt)return-0;if(_)throw new Error("Invalid input");if(f in o)return o[f];const s=i[f];if(!s||typeof s!="object")o[f]=s;else if(Array.isArray(s))if(typeof s[0]=="string"){const p=s[0],h=n==null?void 0:n[p];if(h)return o[f]=h(u(s[1]));switch(p){case"Date":o[f]=new Date(s[1]);break;case"Set":const g=new Set;o[f]=g;for(let R=1;R<s.length;R+=1)g.add(u(s[R]));break;case"Map":const N=new Map;o[f]=N;for(let R=1;R<s.length;R+=2)N.set(u(s[R]),u(s[R+1]));break;case"RegExp":o[f]=new RegExp(s[1],s[2]);break;case"Object":o[f]=Object(s[1]);break;case"BigInt":o[f]=BigInt(s[1]);break;case"null":const $=Object.create(null);o[f]=$;for(let R=1;R<s.length;R+=2)$[s[R]]=u(s[R+1]);break;default:throw new Error(`Unknown type ${p}`)}}else{const p=new Array(s.length);o[f]=p;for(let h=0;h<s.length;h+=1){const g=s[h];g!==It&&(p[h]=u(g))}}else{const p={};o[f]=p;for(const h in s){const g=s[h];p[h]=u(g)}}return o[f]}return u(0)}function Nt(e){return e.filter(n=>n!=null)}const nt=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...nt];const jt=new Set([...nt]);[...jt];async function Tt(e){var n;for(const i in e)if(typeof((n=e[i])==null?void 0:n.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(e).map(async([o,u])=>[o,await u])));return e}class re{constructor(n,i){this.status=n,typeof i=="string"?this.body={message:i}:i?this.body=i:this.body={message:`Error: ${n}`}}toString(){return JSON.stringify(this.body)}}class Ke{constructor(n,i){this.status=n,this.location=i}}const $t="x-sveltekit-invalidated",Ct="x-sveltekit-trailing-slash";function Dt(e){e.client}const G={url:Je({}),page:Je({}),navigating:Oe(null),updated:Rt()},H=Ze(et)??{},ne=Ze(Qe)??{};function Ae(e){H[e]=ae()}function J(e){return location.href=e.href,new Promise(()=>{})}function Vt(e,n){var qe;const i=kt(e),o=e.nodes[0],u=e.nodes[1];o(),u();const f=document.documentElement,_=[],s=[];let p=null;const h={before_navigate:[],on_navigate:[],after_navigate:[]};let g={branch:[],error:null,url:null},N=!1,$=!1,R=!0,D=!1,x=!1,C=!1,K=!1,M,P=(qe=history.state)==null?void 0:qe[q];P||(P=Date.now(),history.replaceState({...history.state,[q]:P},"",location.href));const ge=H[P];ge&&(history.scrollRestoration="manual",scrollTo(ge.x,ge.y));let F,W,Z;async function Ue(){if(Z=Z||Promise.resolve(),await Z,!Z)return;Z=null;const t=new URL(location.href),l=ee(t,!0);p=null;const a=W={},c=l&&await we(l);if(a===W&&c){if(c.type==="redirect")return ie(new URL(c.location,t).href,{},1,a);c.props.page!==void 0&&(F=c.props.page),M.$set(c.props)}}function Pe(t){s.some(l=>l==null?void 0:l.snapshot)&&(ne[t]=s.map(l=>{var a;return(a=l==null?void 0:l.snapshot)==null?void 0:a.capture()}))}function xe(t){var l;(l=ne[t])==null||l.forEach((a,c)=>{var r,d;(d=(r=s[c])==null?void 0:r.snapshot)==null||d.restore(a)})}function Ne(){Ae(P),Ge(et,H),Pe(P),Ge(Qe,ne)}async function ie(t,{noScroll:l=!1,replaceState:a=!1,keepFocus:c=!1,state:r={},invalidateAll:d=!1},m,v){return typeof t=="string"&&(t=new URL(t,ze(document))),fe({url:t,scroll:l?ae():null,keepfocus:c,redirect_count:m,details:{state:r,replaceState:a},nav_token:v,accepted:()=>{d&&(K=!0)},blocked:()=>{},type:"goto"})}async function je(t){return p={id:t.id,promise:we(t).then(l=>(l.type==="loaded"&&l.state.error&&(p=null),l))},p.promise}async function se(...t){const a=i.filter(c=>t.some(r=>c.exec(r))).map(c=>Promise.all([...c.layouts,c.leaf].map(r=>r==null?void 0:r[1]())));await Promise.all(a)}function Te(t){var c;g=t.state;const l=document.querySelector("style[data-sveltekit]");l&&l.remove(),F=t.props.page,M=new e.root({target:n,props:{...t.props,stores:G,components:s},hydrate:!0}),xe(P);const a={from:null,to:{params:g.params,route:{id:((c=g.route)==null?void 0:c.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};h.after_navigate.forEach(r=>r(a)),$=!0}async function Q({url:t,params:l,branch:a,status:c,error:r,route:d,form:m}){let v="never";for(const y of a)(y==null?void 0:y.slash)!==void 0&&(v=y.slash);t.pathname=st(t.pathname,v),t.search=t.search;const E={type:"loaded",state:{url:t,params:l,branch:a,error:r,route:d},props:{constructors:Nt(a).map(y=>y.node.component)}};m!==void 0&&(E.props.form=m);let b={},L=!F,A=0;for(let y=0;y<Math.max(a.length,g.branch.length);y+=1){const w=a[y],U=g.branch[y];(w==null?void 0:w.data)!==(U==null?void 0:U.data)&&(L=!0),w&&(b={...b,...w.data},L&&(E.props[`data_${A}`]=b),A+=1)}return(!g.url||t.href!==g.url.href||g.error!==r||m!==void 0&&m!==F.form||L)&&(E.props.page={error:r,params:l,route:{id:(d==null?void 0:d.id)??null},status:c,url:new URL(t),form:m??null,data:L?b:F.data}),E}async function me({loader:t,parent:l,url:a,params:c,route:r,server_data_node:d}){var b,L,A;let m=null;const v={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},E=await t();if((b=E.universal)!=null&&b.load){let O=function(...w){for(const U of w){const{href:j}=new URL(U,a);v.dependencies.add(j)}};const y={route:new Proxy(r,{get:(w,U)=>(v.route=!0,w[U])}),params:new Proxy(c,{get:(w,U)=>(v.params.add(U),w[U])}),data:(d==null?void 0:d.data)??null,url:ut(a,()=>{v.url=!0}),async fetch(w,U){let j;w instanceof Request?(j=w.url,U={body:w.method==="GET"||w.method==="HEAD"?void 0:await w.blob(),cache:w.cache,credentials:w.credentials,headers:w.headers,integrity:w.integrity,keepalive:w.keepalive,method:w.method,mode:w.mode,redirect:w.redirect,referrer:w.referrer,referrerPolicy:w.referrerPolicy,signal:w.signal,...U}):j=w;const V=new URL(j,a);return O(V.href),V.origin===a.origin&&(j=V.href.slice(a.origin.length)),$?_t(j,V.href,U):mt(j,U)},setHeaders:()=>{},depends:O,parent(){return v.parent=!0,l()}};m=await E.universal.load.call(null,y)??null,m=m?await Tt(m):null}return{node:E,loader:t,server:d,universal:(L=E.universal)!=null&&L.load?{type:"data",data:m,uses:v}:null,data:m??(d==null?void 0:d.data)??null,slash:((A=E.universal)==null?void 0:A.trailingSlash)??(d==null?void 0:d.slash)}}function $e(t,l,a,c,r){if(K)return!0;if(!c)return!1;if(c.parent&&t||c.route&&l||c.url&&a)return!0;for(const d of c.params)if(r[d]!==g.params[d])return!0;for(const d of c.dependencies)if(_.some(m=>m(new URL(d))))return!0;return!1}function _e(t,l){return(t==null?void 0:t.type)==="data"?t:(t==null?void 0:t.type)==="skip"?l??null:null}async function we({id:t,invalidating:l,url:a,params:c,route:r}){if((p==null?void 0:p.id)===t)return p.promise;const{errors:d,layouts:m,leaf:v}=r,E=[...m,v];d.forEach(k=>k==null?void 0:k().catch(()=>{})),E.forEach(k=>k==null?void 0:k[1]().catch(()=>{}));let b=null;const L=g.url?t!==g.url.pathname+g.url.search:!1,A=g.route?r.id!==g.route.id:!1;let O=!1;const y=E.map((k,I)=>{var z;const S=g.branch[I],T=!!(k!=null&&k[0])&&((S==null?void 0:S.loader)!==k[1]||$e(O,A,L,(z=S.server)==null?void 0:z.uses,c));return T&&(O=!0),T});if(y.some(Boolean)){try{b=await We(a,y)}catch(k){return ce({status:k instanceof re?k.status:500,error:await te(k,{url:a,params:c,route:{id:r.id}}),url:a,route:r})}if(b.type==="redirect")return b}const w=b==null?void 0:b.nodes;let U=!1;const j=E.map(async(k,I)=>{var ye;if(!k)return;const S=g.branch[I],T=w==null?void 0:w[I];if((!T||T.type==="skip")&&k[1]===(S==null?void 0:S.loader)&&!$e(U,A,L,(ye=S.universal)==null?void 0:ye.uses,c))return S;if(U=!0,(T==null?void 0:T.type)==="error")throw T;return me({loader:k[1],url:a,params:c,route:r,parent:async()=>{var Fe;const Me={};for(let be=0;be<I;be+=1)Object.assign(Me,(Fe=await j[be])==null?void 0:Fe.data);return Me},server_data_node:_e(T===void 0&&k[0]?{type:"skip"}:T??null,k[0]?S==null?void 0:S.server:void 0)})});for(const k of j)k.catch(()=>{});const V=[];for(let k=0;k<E.length;k+=1)if(E[k])try{V.push(await j[k])}catch(I){if(I instanceof Ke)return{type:"redirect",location:I.location};let S=500,T;if(w!=null&&w.includes(I))S=I.status??S,T=I.error;else if(I instanceof re)S=I.status,T=I.body;else{if(await G.updated.check())return await J(a);T=await te(I,{params:c,url:a,route:{id:r.id}})}const z=await Ce(k,V,d);return z?await Q({url:a,params:c,branch:V.slice(0,z.idx).concat(z.node),status:S,error:T,route:r}):await Ve(a,{id:r.id},T,S)}else V.push(void 0);return await Q({url:a,params:c,branch:V,status:200,error:null,route:r,form:l?void 0:null})}async function Ce(t,l,a){for(;t--;)if(a[t]){let c=t;for(;!l[c];)c-=1;try{return{idx:c+1,node:{node:await a[t](),loader:a[t],data:{},server:null,universal:null}}}catch{continue}}}async function ce({status:t,error:l,url:a,route:c}){const r={};let d=null;if(e.server_loads[0]===0)try{const b=await We(a,[!0]);if(b.type!=="data"||b.nodes[0]&&b.nodes[0].type!=="data")throw 0;d=b.nodes[0]??null}catch{(a.origin!==he||a.pathname!==location.pathname||N)&&await J(a)}const v=await me({loader:o,url:a,params:r,route:c,parent:()=>Promise.resolve({}),server_data_node:_e(d)}),E={node:await u(),loader:u,universal:null,server:null,data:null};return await Q({url:a,params:r,branch:[v,E],status:t,error:l,route:null})}function ee(t,l){if(de(t,B))return;const a=le(t);for(const c of i){const r=c.exec(a);if(r)return{id:t.pathname+t.search,invalidating:l,route:c,params:lt(r),url:t}}}function le(t){return ct(t.pathname.slice(B.length)||"/")}function De({url:t,type:l,intent:a,delta:c}){let r=!1;const d=Ye(g,a,t,l);c!==void 0&&(d.navigation.delta=c);const m={...d.navigation,cancel:()=>{r=!0,d.reject(new Error("navigation was cancelled"))}};return x||h.before_navigate.forEach(v=>v(m)),r?null:d}async function fe({url:t,scroll:l,keepfocus:a,redirect_count:c,details:r,type:d,delta:m,nav_token:v={},accepted:E,blocked:b}){var j,V,k;const L=ee(t,!1),A=De({url:t,type:d,delta:m,intent:L});if(!A){b();return}const O=P;E(),x=!0,$&&G.navigating.set(A.navigation),W=v;let y=L&&await we(L);if(!y){if(de(t,B))return await J(t);y=await Ve(t,{id:null},await te(new Error(`Not found: ${t.pathname}`),{url:t,params:{},route:{id:null}}),404)}if(t=(L==null?void 0:L.url)||t,W!==v)return A.reject(new Error("navigation was aborted")),!1;if(y.type==="redirect")if(c>=20)y=await ce({status:500,error:await te(new Error("Redirect loop"),{url:t,params:{},route:{id:null}}),url:t,route:{id:null}});else return ie(new URL(y.location,t).href,{},c+1,v),!1;else((j=y.props.page)==null?void 0:j.status)>=400&&await G.updated.check()&&await J(t);if(_.length=0,K=!1,D=!0,Ae(O),Pe(O),(V=y.props.page)!=null&&V.url&&y.props.page.url.pathname!==t.pathname&&(t.pathname=(k=y.props.page)==null?void 0:k.url.pathname),r){const I=r.replaceState?0:1;if(r.state[q]=P+=I,history[r.replaceState?"replaceState":"pushState"](r.state,"",t),!r.replaceState){let S=P+1;for(;ne[S]||H[S];)delete ne[S],delete H[S],S+=1}}if(p=null,$){g=y.state,y.props.page&&(y.props.page.url=t);const I=(await Promise.all(h.on_navigate.map(S=>S(A.navigation)))).filter(S=>typeof S=="function");if(I.length>0){let S=function(){h.after_navigate=h.after_navigate.filter(T=>!I.includes(T))};I.push(S),h.after_navigate.push(...I)}M.$set(y.props)}else Te(y);const{activeElement:w}=document;if(await ke(),R){const I=t.hash&&document.getElementById(decodeURIComponent(t.hash.slice(1)));l?scrollTo(l.x,l.y):I?I.scrollIntoView():scrollTo(0,0)}const U=document.activeElement!==w&&document.activeElement!==document.body;!a&&!U&&Ie(),R=!0,y.props.page&&(F=y.props.page),x=!1,d==="popstate"&&xe(P),A.fulfil(void 0),h.after_navigate.forEach(I=>I(A.navigation)),G.navigating.set(null),D=!1}async function Ve(t,l,a,c){return t.origin===he&&t.pathname===location.pathname&&!N?await ce({status:c,error:a,url:t,route:l}):await J(t)}function rt(){let t;f.addEventListener("mousemove",d=>{const m=d.target;clearTimeout(t),t=setTimeout(()=>{c(m,2)},20)});function l(d){c(d.composedPath()[0],1)}f.addEventListener("mousedown",l),f.addEventListener("touchstart",l,{passive:!0});const a=new IntersectionObserver(d=>{for(const m of d)m.isIntersecting&&(se(le(new URL(m.target.href))),a.unobserve(m.target))},{threshold:0});function c(d,m){const v=He(d,f);if(!v)return;const{url:E,external:b,download:L}=Re(v,B);if(b||L)return;const A=ue(v);if(!A.reload)if(m<=A.preload_data){const O=ee(E,!1);O&&je(O)}else m<=A.preload_code&&se(le(E))}function r(){a.disconnect();for(const d of f.querySelectorAll("a")){const{url:m,external:v,download:E}=Re(d,B);if(v||E)continue;const b=ue(d);b.reload||(b.preload_code===pe.viewport&&a.observe(d),b.preload_code===pe.eager&&se(le(m)))}}h.after_navigate.push(r),r()}function te(t,l){return t instanceof re?t.body:e.hooks.handleError({error:t,event:l})??{message:l.route.id!=null?"Internal Error":"Not Found"}}return{after_navigate:t=>{Ee(()=>(h.after_navigate.push(t),()=>{const l=h.after_navigate.indexOf(t);h.after_navigate.splice(l,1)}))},before_navigate:t=>{Ee(()=>(h.before_navigate.push(t),()=>{const l=h.before_navigate.indexOf(t);h.before_navigate.splice(l,1)}))},on_navigate:t=>{Ee(()=>(h.on_navigate.push(t),()=>{const l=h.on_navigate.indexOf(t);h.on_navigate.splice(l,1)}))},disable_scroll_handling:()=>{(D||!$)&&(R=!1)},goto:(t,l={})=>ie(t,l,0),invalidate:t=>{if(typeof t=="function")_.push(t);else{const{href:l}=new URL(t,location.href);_.push(a=>a.href===l)}return Ue()},invalidate_all:()=>(K=!0,Ue()),preload_data:async t=>{const l=new URL(t,ze(document)),a=ee(l,!1);if(!a)throw new Error(`Attempted to preload a URL that does not belong to this app: ${l}`);await je(a)},preload_code:se,apply_action:async t=>{if(t.type==="error"){const l=new URL(location.href),{branch:a,route:c}=g;if(!c)return;const r=await Ce(g.branch.length,a,c.errors);if(r){const d=await Q({url:l,params:g.params,branch:a.slice(0,r.idx).concat(r.node),status:t.status??500,error:t.error,route:c});g=d.state,M.$set(d.props),ke().then(Ie)}}else t.type==="redirect"?ie(t.location,{invalidateAll:!0},0):(M.$set({form:null,page:{...F,form:t.data,status:t.status}}),await ke(),M.$set({form:t.data}),t.type==="success"&&Ie())},_start_router:()=>{var l;history.scrollRestoration="manual",addEventListener("beforeunload",a=>{let c=!1;if(Ne(),!x){const r=Ye(g,void 0,null,"leave"),d={...r.navigation,cancel:()=>{c=!0,r.reject(new Error("navigation was cancelled"))}};h.before_navigate.forEach(m=>m(d))}c?(a.preventDefault(),a.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ne()}),(l=navigator.connection)!=null&&l.saveData||rt(),f.addEventListener("click",a=>{var O;if(a.button||a.which!==1||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey||a.defaultPrevented)return;const c=He(a.composedPath()[0],f);if(!c)return;const{url:r,external:d,target:m,download:v}=Re(c,B);if(!r)return;if(m==="_parent"||m==="_top"){if(window.parent!==window)return}else if(m&&m!=="_self")return;const E=ue(c);if(!(c instanceof SVGAElement)&&r.protocol!==location.protocol&&!(r.protocol==="https:"||r.protocol==="http:")||v)return;if(d||E.reload){De({url:r,type:"link"})?x=!0:a.preventDefault();return}const[L,A]=r.href.split("#");if(A!==void 0&&L===location.href.split("#")[0]){if(g.url.hash===r.hash){a.preventDefault(),(O=c.ownerDocument.getElementById(A))==null||O.scrollIntoView();return}if(C=!0,Ae(P),t(r),!E.replace_state)return;C=!1,a.preventDefault()}fe({url:r,scroll:E.noscroll?ae():null,keepfocus:E.keep_focus??!1,redirect_count:0,details:{state:{},replaceState:E.replace_state??r.href===location.href},accepted:()=>a.preventDefault(),blocked:()=>a.preventDefault(),type:"link"})}),f.addEventListener("submit",a=>{if(a.defaultPrevented)return;const c=HTMLFormElement.prototype.cloneNode.call(a.target),r=a.submitter;if(((r==null?void 0:r.formMethod)||c.method)!=="get")return;const m=new URL((r==null?void 0:r.hasAttribute("formaction"))&&(r==null?void 0:r.formAction)||c.action);if(de(m,B))return;const v=a.target,{keep_focus:E,noscroll:b,reload:L,replace_state:A}=ue(v);if(L)return;a.preventDefault(),a.stopPropagation();const O=new FormData(v),y=r==null?void 0:r.getAttribute("name");y&&O.append(y,(r==null?void 0:r.getAttribute("value"))??""),m.search=new URLSearchParams(O).toString(),fe({url:m,scroll:b?ae():null,keepfocus:E??!1,redirect_count:0,details:{state:{},replaceState:A??m.href===location.href},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",async a=>{var c;if(W={},(c=a.state)!=null&&c[q]){if(a.state[q]===P)return;const r=H[a.state[q]],d=new URL(location.href);if(g.url.href.split("#")[0]===location.href.split("#")[0]){t(d),H[P]=ae(),P=a.state[q],scrollTo(r.x,r.y);return}const m=a.state[q]-P;await fe({url:d,scroll:r,keepfocus:!1,redirect_count:0,details:null,accepted:()=>{P=a.state[q]},blocked:()=>{history.go(-m)},type:"popstate",delta:m,nav_token:W})}else if(!C){const r=new URL(location.href);t(r)}}),addEventListener("hashchange",()=>{C&&(C=!1,history.replaceState({...history.state,[q]:++P},"",location.href))});for(const a of document.querySelectorAll("link"))a.rel==="icon"&&(a.href=a.href);addEventListener("pageshow",a=>{a.persisted&&G.navigating.set(null)});function t(a){g.url=a,G.page.set({...F,url:a}),G.page.notify()}},_hydrate:async({status:t=200,error:l,node_ids:a,params:c,route:r,data:d,form:m})=>{N=!0;const v=new URL(location.href);({params:c={},route:r={id:null}}=ee(v,!1)||{});let E;try{const b=a.map(async(O,y)=>{const w=d[y];return w!=null&&w.uses&&(w.uses=at(w.uses)),me({loader:e.nodes[O],url:v,params:c,route:r,parent:async()=>{const U={};for(let j=0;j<y;j+=1)Object.assign(U,(await b[j]).data);return U},server_data_node:_e(w)})}),L=await Promise.all(b),A=i.find(({id:O})=>O===r.id);if(A){const O=A.layouts;for(let y=0;y<O.length;y++)O[y]||L.splice(y,0,void 0)}E=await Q({url:v,params:c,branch:L,status:t,error:l,form:m,route:A??null})}catch(b){if(b instanceof Ke){await J(new URL(b.location,location.href));return}E=await ce({status:b instanceof re?b.status:500,error:await te(b,{url:v,params:c,route:r}),url:v,route:r})}Te(E)}}}async function We(e,n){var u;const i=new URL(e);i.pathname=ht(e.pathname),e.pathname.endsWith("/")&&i.searchParams.append(Ct,"1"),i.searchParams.append($t,n.map(f=>f?"1":"0").join(""));const o=await Xe(i.href);if((u=o.headers.get("content-type"))!=null&&u.includes("text/html")&&await J(e),!o.ok)throw new re(o.status,await o.json());return new Promise(async f=>{var N;const _=new Map,s=o.body.getReader(),p=new TextDecoder;function h($){return xt($,{Promise:R=>new Promise((D,x)=>{_.set(R,{fulfil:D,reject:x})})})}let g="";for(;;){const{done:$,value:R}=await s.read();if($&&!g)break;for(g+=!R&&g?`
`:p.decode(R);;){const D=g.indexOf(`
`);if(D===-1)break;const x=JSON.parse(g.slice(0,D));if(g=g.slice(D+1),x.type==="redirect")return f(x);if(x.type==="data")(N=x.nodes)==null||N.forEach(C=>{(C==null?void 0:C.type)==="data"&&(C.uses=at(C.uses),C.data=h(C.data))}),f(x);else if(x.type==="chunk"){const{id:C,data:K,error:M}=x,P=_.get(C);_.delete(C),M?P.reject(h(M)):P.fulfil(h(K))}}}})}function at(e){return{dependencies:new Set((e==null?void 0:e.dependencies)??[]),params:new Set((e==null?void 0:e.params)??[]),parent:!!(e!=null&&e.parent),route:!!(e!=null&&e.route),url:!!(e!=null&&e.url)}}function Ie(){const e=document.querySelector("[autofocus]");if(e)e.focus();else{const n=document.body,i=n.getAttribute("tabindex");n.tabIndex=-1,n.focus({preventScroll:!0,focusVisible:!1}),i!==null?n.setAttribute("tabindex",i):n.removeAttribute("tabindex");const o=getSelection();if(o&&o.type!=="None"){const u=[];for(let f=0;f<o.rangeCount;f+=1)u.push(o.getRangeAt(f));setTimeout(()=>{if(o.rangeCount===u.length){for(let f=0;f<o.rangeCount;f+=1){const _=u[f],s=o.getRangeAt(f);if(_.commonAncestorContainer!==s.commonAncestorContainer||_.startContainer!==s.startContainer||_.endContainer!==s.endContainer||_.startOffset!==s.startOffset||_.endOffset!==s.endOffset)return}o.removeAllRanges()}})}}}function Ye(e,n,i,o){var p,h;let u,f;const _=new Promise((g,N)=>{u=g,f=N});return _.catch(()=>{}),{navigation:{from:{params:e.params,route:{id:((p=e.route)==null?void 0:p.id)??null},url:e.url},to:i&&{params:(n==null?void 0:n.params)??null,route:{id:((h=n==null?void 0:n.route)==null?void 0:h.id)??null},url:i},willUnload:!n,type:o,complete:_},fulfil:u,reject:f}}async function Ft(e,n,i){const o=Vt(e,n);Dt({client:o}),i?await o._hydrate(i):o.goto(location.href,{replaceState:!0}),o._start_router()}export{Ft as start};
