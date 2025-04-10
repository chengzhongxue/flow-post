(function(rt){"use strict";var $t;const xt='*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color, #e5e7eb)}:before,:after{--un-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}';/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis,V=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),st=new WeakMap;let it=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(V&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=st.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&st.set(e,t))}return t}toString(){return this.cssText}};const nt=i=>new it(typeof i=="string"?i:i+"",void 0,Y),N=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((r,s,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1],i[0]);return new it(e,i,Y)},_t=(i,t)=>{if(V)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),s=H.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}},ot=V?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return nt(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:At,defineProperty:kt,getOwnPropertyDescriptor:Et,getOwnPropertyNames:St,getOwnPropertySymbols:Ct,getPrototypeOf:Pt}=Object,g=globalThis,at=g.trustedTypes,Ut=at?at.emptyScript:"",q=g.reactiveElementPolyfillSupport,C=(i,t)=>i,R={toAttribute(i,t){switch(t){case Boolean:i=i?Ut:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},W=(i,t)=>!At(i,t),lt={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:W};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);class A extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&kt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){const{get:s,set:n}=Et(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const l=s==null?void 0:s.call(this);n.call(this,o),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=Pt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,r=[...St(e),...Ct(e)];for(const s of r)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const s of r)e.unshift(ot(s))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _t(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EC(t,e){var n;const r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){const o=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:R).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){var n;const r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const o=r.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:R;this._$Em=s,this[s]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){if(r??(r=this.constructor.getPropertyOptions(t)),!(r.hasChanged??W)(this[t],e))return;this.P(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,r){this._$AL.has(t)||this._$AL.set(t,e),r.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(r=this._$EO)==null||r.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[C("elementProperties")]=new Map,A[C("finalized")]=new Map,q==null||q({ReactiveElement:A}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,B=P.trustedTypes,ct=B?B.createPolicy("lit-html",{createHTML:i=>i}):void 0,dt="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,ht="?"+b,Tt=`<${ht}>`,y=document,U=()=>y.createComment(""),T=i=>i===null||typeof i!="object"&&typeof i!="function",Z=Array.isArray,zt=i=>Z(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",F=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,pt=/>/g,w=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,gt=/"/g,bt=/^(?:script|style|textarea|title)$/i,Mt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),$=Mt(1),x=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),mt=new WeakMap,_=y.createTreeWalker(y,129);function vt(i,t){if(!Z(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}const Ot=(i,t)=>{const e=i.length-1,r=[];let s,n=t===2?"<svg>":t===3?"<math>":"",o=z;for(let l=0;l<e;l++){const a=i[l];let h,u,c=-1,f=0;for(;f<a.length&&(o.lastIndex=f,u=o.exec(a),u!==null);)f=o.lastIndex,o===z?u[1]==="!--"?o=ut:u[1]!==void 0?o=pt:u[2]!==void 0?(bt.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=w):u[3]!==void 0&&(o=w):o===w?u[0]===">"?(o=s??z,c=-1):u[1]===void 0?c=-2:(c=o.lastIndex-u[2].length,h=u[1],o=u[3]===void 0?w:u[3]==='"'?gt:ft):o===gt||o===ft?o=w:o===ut||o===pt?o=z:(o=w,s=void 0);const v=o===w&&i[l+1].startsWith("/>")?" ":"";n+=o===z?a+Tt:c>=0?(r.push(h),a.slice(0,c)+dt+a.slice(c)+b+v):a+b+(c===-2?l:v)}return[vt(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class M{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[h,u]=Ot(t,e);if(this.el=M.createElement(h,r),_.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=_.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(dt)){const f=u[o++],v=s.getAttribute(c).split(b),I=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:I[2],strings:v,ctor:I[1]==="."?Ht:I[1]==="?"?Nt:I[1]==="@"?Rt:D}),s.removeAttribute(c)}else c.startsWith(b)&&(a.push({type:6,index:n}),s.removeAttribute(c));if(bt.test(s.tagName)){const c=s.textContent.split(b),f=c.length-1;if(f>0){s.textContent=B?B.emptyScript:"";for(let v=0;v<f;v++)s.append(c[v],U()),_.nextNode(),a.push({type:2,index:++n});s.append(c[f],U())}}}else if(s.nodeType===8)if(s.data===ht)a.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(b,c+1))!==-1;)a.push({type:7,index:n}),c+=b.length-1}n++}}static createElement(t,e){const r=y.createElement("template");return r.innerHTML=t,r}}function k(i,t,e=i,r){var o,l;if(t===x)return t;let s=r!==void 0?(o=e._$Co)==null?void 0:o[r]:e._$Cl;const n=T(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),n===void 0?s=void 0:(s=new n(i),s._$AT(i,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=s:e._$Cl=s),s!==void 0&&(t=k(i,s._$AS(i,t.values),s,r)),t}class jt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,s=((t==null?void 0:t.creationScope)??y).importNode(e,!0);_.currentNode=s;let n=_.nextNode(),o=0,l=0,a=r[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new O(n,n.nextSibling,this,t):a.type===1?h=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(h=new Bt(n,this,t)),this._$AV.push(h),a=r[++l]}o!==(a==null?void 0:a.index)&&(n=_.nextNode(),o++)}return _.currentNode=y,s}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class O{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),T(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==x&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(y.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=M.createElement(vt(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(e);else{const o=new jt(s,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=mt.get(t.strings);return e===void 0&&mt.set(t.strings,e=new M(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,s=0;for(const n of t)s===e.length?e.push(r=new O(this.O(U()),this.O(U()),this,this.options)):r=e[s],r._$AI(n),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class D{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=d}_$AI(t,e=this,r,s){const n=this.strings;let o=!1;if(n===void 0)t=k(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==x,o&&(this._$AH=t);else{const l=t;let a,h;for(t=n[0],a=0;a<n.length-1;a++)h=k(this,l[r+a],e,a),h===x&&(h=this._$AH[a]),o||(o=!T(h)||h!==this._$AH[a]),h===d?t=d:t!==d&&(t+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ht extends D{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class Nt extends D{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Rt extends D{constructor(t,e,r,s,n){super(t,e,r,s,n),this.type=5}_$AI(t,e=this){if((t=k(this,t,e,0)??d)===x)return;const r=this._$AH,s=t===d&&r!==d||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==d&&(r===d||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Bt{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}}const X=P.litHtmlPolyfillSupport;X==null||X(M,O),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.2.1");const Dt=(i,t,e)=>{const r=(e==null?void 0:e.renderBefore)??t;let s=r._$litPart$;if(s===void 0){const n=(e==null?void 0:e.renderBefore)??null;r._$litPart$=s=new O(t.insertBefore(U(),n),n,void 0,e??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let m=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Dt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return x}};m._$litElement$=!0,m.finalized=!0,($t=globalThis.litElementHydrateSupport)==null||$t.call(globalThis,{LitElement:m});const J=globalThis.litElementPolyfillSupport;J==null||J({LitElement:m}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:W},It=(i=Lt,t,e)=>{const{kind:r,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(e.name,i),r==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,i)},init(l){return l!==void 0&&this.P(o,void 0,i),l}}}if(r==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,i)}}throw Error("Unsupported decorator location: "+r)};function E(i){return(t,e)=>typeof e=="object"?It(i,t,e):((r,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,o?{...r,wrapped:!0}:r),o?Object.getOwnPropertyDescriptor(s,n):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function yt(i){return E({...i,state:!0,attribute:!1})}const G=class G extends m{render(){return $`<svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle
        style="opacity: 0.25;"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        style="opacity: 0.75;"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      ></path>
    </svg>`}};G.styles=N`
    :host {
      display: inline-flex;
    }
    svg {
      height: 1.25em;
      width: 1.25em;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;let K=G;customElements.get("icon-loading")||customElements.define("icon-loading",K);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vt={ATTRIBUTE:1},Yt=i=>(...t)=>({_$litDirective$:i,values:t});class qt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=Yt(class extends qt{constructor(i){var t;if(super(i),i.type!==Vt.ATTRIBUTE||i.name!=="class"||((t=i.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){var r,s;if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in t)t[n]&&!((r=this.nt)!=null&&r.has(n))&&this.st.add(n);return this.render(t)}const e=i.element.classList;for(const n of this.st)n in t||(e.remove(n),this.st.delete(n));for(const n in t){const o=!!t[n];o===this.st.has(n)||(s=this.nt)!=null&&s.has(n)||(o?(e.add(n),this.st.add(n)):(e.remove(n),this.st.delete(n)))}return x}});var Zt=Object.defineProperty,wt=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&Zt(t,e,s),s};const Q=class Q extends m{constructor(){super(...arguments),this.message="",this.type="success"}render(){return $`<div
      class="toast ${Wt({"toast--error":this.type==="error","toast--success":this.type==="success","toast--warn":this.type==="warn"})}"
    >
      ${this.type==="success"?$`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
              <path d="m9 12l2 2l4-4" />
            </g>
          </svg>`:$`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9-3v4m0 3v.01"
            />
          </svg>`} <span>${this.message}</span>
    </div>`}};Q.styles=[N`
      .toast {
        border-radius: 0.4rem;
        font-size: 0.875em;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em 0.625em;
        justify-content: space-between;
        overflow: hidden;
        color: #fff;
        gap: 0.5em;
        box-shadow:
          0 0 #0000,
          0 0 #0000,
          0 1px 3px 0 rgb(0 0 0 / 0.1),
          0 1px 2px -1px rgb(0 0 0 / 0.1);

        animation: slideInDown 0.3s ease-out forwards;
      }

      .toast--exit {
        animation: slideOutUp 0.3s ease-in forwards;
      }

      .toast--error {
        background-color: #d71d1d;
      }

      .toast--success {
        background-color: #4ccba0;
      }

      .toast--warn {
        background-color: #f5a623;
      }

      @keyframes slideInDown {
        from {
          transform: translateY(0);
          opacity: 0;
        }
        to {
          transform: translateY(100%);
          opacity: 1;
        }
      }

      @keyframes slideOutUp {
        from {
          transform: translateY(100%);
          opacity: 1;
        }
        to {
          transform: translateY(0);
          opacity: 0;
        }
      }
    `];let S=Q;wt([E({type:String})],S.prototype,"message"),wt([E({type:String})],S.prototype,"type");const tt=class tt extends m{render(){return $`<slot></slot>`}};tt.styles=[N`
      :host {
        position: fixed;
        top: 1em;
        z-index: 1000;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.5em;
      }
    `];let L=tt;customElements.get("follow-toast")||customElements.define("follow-toast",S),customElements.get("follow-toast-container")||customElements.define("follow-toast-container",L);class Ft{constructor(){this.body=document.body;const t=this.body.querySelector("follow-toast-container");t?this.toastContainer=t:(this.toastContainer=new L,this.body.appendChild(this.toastContainer))}show(t,e){const r=new S;r.message=t,r.type=e,this.toastContainer.appendChild(r),setTimeout(()=>{r.classList.add("toast--exit"),setTimeout(()=>{var s;(s=this.toastContainer)==null||s.removeChild(r)},300)},3e3)}success(t){this.show(t,"success")}error(t){this.show(t,"error")}warn(t){this.show(t,"warn")}}var Xt=Object.defineProperty,j=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&Xt(t,e,s),s};const et=class et extends m{constructor(){super(...arguments),this.textAlign="right",this.showTitle="true",this.titleText="订阅最新内容推送",this.submitting=!1,this.toastManager=new Ft}async onSubmit(t){t.preventDefault(),this.submitting=!0;const e=t.target,r=new FormData(e),s=Object.fromEntries(r.entries());try{const n=await fetch("/apis/api.flow.post.kunkunyu.com/v1alpha1/follows/-/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s.email})});if(!n.ok){const{detail:o}=await n.json();this.toastManager.error(o);return}this.toastManager.success("提交成功，收到邮件请确认是否订阅"),this.dispatchEvent(new CustomEvent("reload"))}catch(n){n instanceof Error&&this.toastManager.error(n.message)}finally{this.submitting=!1}}render(){const t={left:"justify-start",center:"justify-center",right:"justify-end"}[this.textAlign];return $`
          <div class="flex items-center ${t}">
              <form @submit=${this.onSubmit} class="w-full max-w-[600px]">
                  <div class="subscribe-card w-full card-padding rounded-card backdrop-blur-sm bg-card">
                      ${this.showTitle=="true"?$`
                      <div class="text-center mb-6 sm:mb-8">
                          <h1 class="text-xl sm:text-2xl font-semibold text-title mb-2">${this.titleText}</h1>
                      </div>
                      `:""}
                      <div class="flex flex-col sm:flex-row gap-4">
                          <div class="input-wrapper flex-1">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-description">
                                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                              </svg>
                              <input type="email"
                                     name="email"
                                     required
                                     class="w-full px-12 py-3 sm:py-3.5 border border-input rounded-input text-title placeholder:text-description bg-input"
                                     placeholder="输入您的电子邮箱">
                          </div>
                          <button
                                  .disabled=${this.submitting}
                                  class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-button text-button rounded-button whitespace-nowrap flex items-center justify-center gap-3 shadow-lg">
                              立即订阅
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                  <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                              </svg>
                          </button>
                      </div>
                  </div>
              </form>
          </div>
    `}};et.styles=[nt(xt),N`
      :host {
        display: inline-block;
        width: 100%;
      }
        .subscribe-card {
            background: white;
            box-shadow: var(--follow-card-shadow, 0 10px 30px -5px rgba(0, 0, 0, 0.08));
            backdrop-filter: blur(10px);
            border: var(--follow-card-border, 1px solid rgba(255, 255, 255, 0.2));
        }

        .input-wrapper {
            position: relative;
        }

        .input-wrapper svg {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #94A3B8;
            transition: color 0.2s ease;
            width: 16px;
            height: 16px;
        }

        .input-wrapper:focus-within svg {
            color: #4F7BEF;
        }

        input {
            transition: all 0.2s ease;
        }

        input:focus {
            outline: none;
            border-color: #4F7BEF;
            box-shadow: 0 0 0 4px rgba(79, 123, 239, 0.1);
        }

        button {
            transition: all 0.2s ease;
        }

        button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(79, 123, 239, 0.2);
        }

        button:active {
            transform: translateY(0);
        }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: shortcuts */
.border-input{border-color:var(--follow-input-border,#e2e8f0);}
.rounded-button{border-radius:var(--follow-button-radius,0.5rem);}
.rounded-card{border-radius:var(--follow-card-radius,0.75rem);}
.rounded-input{border-radius:var(--follow-input-radius,0.5rem);}
.bg-button{background-color:var(--follow-button-bg,#4F7BEF);}
.bg-card{background-color:var(--follow-bg-color,#ffffff);}
.bg-input{background-color:var(--follow-input-bg,#f8fafc);}
.card-padding{padding:var(--follow-card-padding-sm,1.5rem);}
.text-button{color:var(--follow-button-text,#ffffff);}
.text-description{color:var(--follow-description-color,#71717a);}
.text-title{color:var(--follow-title-color,#18181b);}
.placeholder\\:text-description::placeholder{color:var(--follow-description-color,#71717a);}
@media (min-width: 640px){
.card-padding{padding:var(--follow-card-padding-md,2rem);}
}
@media (min-width: 768px){
.card-padding{padding:var(--follow-card-padding-lg,3rem);}
}
/* layer: default */
.absolute{position:absolute;}
.relative{position:relative;}
.static{position:static;}
.mb-2{margin-bottom:0.5rem;}
.mb-6{margin-bottom:1.5rem;}
.inline-block{display:inline-block;}
.h-4{height:1rem;}
.max-w-\\[600px\\]{max-width:600px;}
.w-4{width:1rem;}
.w-full{width:100%;}
.flex{display:flex;}
.flex-1{flex:1 1 0%;}
.flex-col{flex-direction:column;}
.transform{transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));}
.items-center{align-items:center;}
.justify-start{justify-content:flex-start;}
.justify-end{justify-content:flex-end;}
.justify-center{justify-content:center;}
.gap-3{gap:0.75rem;}
.gap-4{gap:1rem;}
.whitespace-nowrap{white-space:nowrap;}
.border{border-width:1px;}
.px-12{padding-left:3rem;padding-right:3rem;}
.px-6{padding-left:1.5rem;padding-right:1.5rem;}
.py-3{padding-top:0.75rem;padding-bottom:0.75rem;}
.text-center{text-align:center;}
.text-xl{font-size:1.25rem;line-height:1.75rem;}
.font-semibold{font-weight:600;}
.shadow-lg{--un-shadow:var(--un-shadow-inset) 0 10px 15px -3px var(--un-shadow-color, rgb(0 0 0 / 0.1)),var(--un-shadow-inset) 0 4px 6px -4px var(--un-shadow-color, rgb(0 0 0 / 0.1));box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}
.outline{outline-style:solid;}
.backdrop-blur-sm{--un-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia);backdrop-filter:var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia);}
.backdrop-filter{-webkit-backdrop-filter:var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia);backdrop-filter:var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia);}
.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}
.ease{transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);}
@media (min-width: 640px){
.sm\\:mb-8{margin-bottom:2rem;}
.sm\\:w-auto{width:auto;}
.sm\\:flex-row{flex-direction:row;}
.sm\\:px-8{padding-left:2rem;padding-right:2rem;}
.sm\\:py-3\\.5{padding-top:0.875rem;padding-bottom:0.875rem;}
.sm\\:text-2xl{font-size:1.5rem;line-height:2rem;}
};
    `];let p=et;j([E({type:String,attribute:"text-align"})],p.prototype,"textAlign"),j([E({type:String,attribute:"show-title"})],p.prototype,"showTitle"),j([E({type:String,attribute:"title-text"})],p.prototype,"titleText"),j([yt()],p.prototype,"submitting"),j([yt()],p.prototype,"toastManager"),customElements.get("follow-card")||customElements.define("follow-card",p),rt.FollowCard=p,Object.defineProperty(rt,Symbol.toStringTag,{value:"Module"})})(this["follow-card"]=this["follow-card"]||{});
