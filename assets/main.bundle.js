!function(e){function t(t){for(var a,r,o=t[0],s=t[1],c=t[2],d=0,u=[];d<o.length;d++)r=o[d],i[r]&&u.push(i[r][0]),i[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);for(h&&h(t);u.length;)u.shift()();return l.push.apply(l,c||[]),n()}function n(){for(var e,t=0;t<l.length;t++){for(var n,r=l[t],o=!0,s=1;s<r.length;s++)n=r[s],0!==i[n]&&(o=!1);o&&(l.splice(t--,1),e=a(a.s=r[0]))}return e}function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}var r={},i={1:0},l=[];a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/assets/";var o=window.webpackJsonp=window.webpackJsonp||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var h=s;l.push([269,0]),n()}({111:function(e,t,n){e.exports=n.p+"ram.png"},114:function(e,t,n){e.exports=n.p+"nagisa.png"},119:function(e,t,n){"use strict";function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t);var i=n(49),l=n.n(i),o=(n(280),n(1)),s=n.n(o),c=n(6),h=n(271),d=n(270),u=n(272),m=n(21),p=n.n(m),f=n(273),g=n(0),v=n.n(g);class y extends s.a.Component{constructor(...e){super(...e),a(this,"handleClick",({key:e})=>{this.props.history.push(e)})}render(){return s.a.createElement(p.a,{onClick:this.handleClick,theme:"dark",mode:"inline",selectedKeys:[location.pathname]},s.a.createElement(p.a.Item,{key:"/"},"Me"),s.a.createElement(p.a.Item,{key:"/cover"},"Cover"))}}a(y,"propTypes",{match:v.a.object.isRequired,location:v.a.object.isRequired,history:v.a.object.isRequired});var x=Object(f.a)(y),b=n(18),E=n.n(b),w=n(34),C=n.n(w),S=n(114),j=n.n(S),k=n(79),L=n.n(k),O=n(81),R=n.n(O),T=n(82),M=n.n(T),_=n(113),I=n.n(_),N=n(112);n(183);const P=M.a.Item,U='<svg xmlns="http://www.w3.org/2000/svg" width="102" height="120"> \n<path \nid="Aki-Logo" \nfill-rule="evenodd" \nfill="#fff" \nd="M1310,210L1258.75,90h-17L1293,210h17Zm-33.25-21.909-18.5,7.22-50.25-24.9,20-46.8,17.25-5.975-18.5,47.3Z" \ntransform="translate(-1208 -90)" \n/>\n</svg>';class B extends o.Component{constructor(e){super(e),r(this,"handleFile",e=>{0<e.target.files.length&&(this.setState({fileLoaded:!0}),this.props.onFile(e))}),r(this,"handleText",e=>{this.props.onText(e)}),r(this,"handleSave",()=>{this.props.onSave()}),this.state={fileLoaded:!1}}render(){return s.a.createElement(M.a,{className:"output form-cover"},s.a.createElement(P,null,s.a.createElement(R.a,{style:{height:"100%"},type:"file",ref:e=>e?this.file=e.refs.input:null,onChange:this.handleFile,className:"sharp",addonAfter:"Обложка"})),s.a.createElement(P,null,s.a.createElement(R.a,{type:"text",id:"name",placeholder:"Укажите тип",className:"sharp","aria-describedby":"basic-addon2",disabled:!this.state.fileLoaded,onChange:this.handleText,addonAfter:"Тип альбома"})),s.a.createElement(P,null,s.a.createElement(E.a,{type:"flex",justify:"center"},s.a.createElement(L.a,{disabled:!this.state.fileLoaded,onClick:this.handleSave},"Сохранить"))))}}var F=n(111),A=n.n(F);const{Sider:q,Content:K}=l.a;Object(c.render)(s.a.createElement(h.a,null,s.a.createElement(l.a,{className:"layout-center"},s.a.createElement(q,{collapsible:!0},s.a.createElement(x,null)),s.a.createElement(l.a,null,s.a.createElement(K,null,s.a.createElement(d.a,null,s.a.createElement(u.a,{path:"/",exact:!0,component:function(){return s.a.createElement(E.a,{type:"flex",justify:"center",align:"middle",style:{minHeight:"100vh"}},s.a.createElement(C.a,null,s.a.createElement("img",{src:j.a,className:"img-fluid"}),s.a.createElement(p.a,{mode:"horizontal",className:"no-border center-horizontal",selectedKeys:[]},s.a.createElement(p.a.Item,{key:"VK"},s.a.createElement("a",{target:"_blank",href:"https://vk.com/ga2mer_o_o"},"VK")),s.a.createElement(p.a.Item,{key:"Twitter"},s.a.createElement("a",{target:"_blank",href:"https://twitter.com/ga2mer_ru"},"Twitter")))))}}),s.a.createElement(u.a,{path:"/cover",component:class extends o.Component{constructor(...e){super(...e),r(this,"x",0),r(this,"y",0),r(this,"width",0),r(this,"height",0),r(this,"text",""),r(this,"fileLoaded",!1),r(this,"blobs",[]),r(this,"initCanvas",()=>{this.ctx=this.canvas.getContext("2d")}),r(this,"initCover",()=>{this.logo=new Image;const e=new Blob([U],{type:"image/svg+xml"}),t=URL.createObjectURL(e);this.logo.onload=(()=>{this.renderCover(),URL.revokeObjectURL(t)}),this.logo.src=t}),r(this,"onCrop",e=>{this.x=e.detail.x,this.y=e.detail.y,this.width=e.detail.width,this.height=e.detail.height,this.renderCover()}),r(this,"handleFile",e=>{if(0<e.target.files.length){let t=URL.createObjectURL(e.target.files[0]);this.blobs.push(t),this.img=document.createElement("img"),this.img.onload=(()=>{this.cropper.reset().replace(t),this.fileLoaded=!0}),this.img.src=t}}),r(this,"handleText",e=>{this.text=e.target.value,this.renderCover()}),r(this,"handleSave",()=>{this.canvas.toBlob(e=>{Object(N.saveAs)(e,"cover.png")})})}componentDidMount(){document.fonts.load('1pt "MonsterratBold"').then(document.fonts.load('1pt "MonsterratSemiBold"')).then(()=>{this.initCanvas(),this.initCover()})}componentWillUnmount(){this.blobs.forEach(e=>{URL.revokeObjectURL(e)})}renderCover(){this.ctx.clearRect(0,0,800,800),this.fileLoaded&&this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height,0,0,800,800);var e=this.ctx.createRadialGradient(750,-100,0,750,-100,500);e.addColorStop(0,"rgb(0, 0, 0, 0.25"),e.addColorStop(1,"transparent"),this.ctx.fillStyle=e,this.ctx.fillRect(0,0,800,800),this.ctx.drawImage(this.logo,690,51,59,69);const t=document.createElement("canvas");t.width=100,t.height=200;const n=t.getContext("2d");n.clearRect(0,0,800,800),n.rotate(67*Math.PI/180),n.font="10pt MonsterratSemiBold",n.fillStyle="#fff",n.letterSpacing=2,n.fillText("МУЗЫКА",5,0),this.ctx.drawImage(t,722,43),this.ctx.font="23pt MonsterratBold",this.ctx.fillStyle="#fff",this.ctx.textAlign="right",this.ctx.fillText(this.text,663,96)}render(){return s.a.createElement(E.a,{type:"flex",justify:"center",align:"middle",style:{minHeight:"100vh"}},s.a.createElement("div",{className:"container-fluid"},s.a.createElement(E.a,{gutter:32},s.a.createElement(C.a,{span:12,className:"cover"},s.a.createElement("canvas",{ref:e=>this.canvas=e,id:"canvas",width:"800",height:"800",style:{width:500}})),s.a.createElement(C.a,{span:12},s.a.createElement(I.a,{className:"cropper",ref:e=>this.cropper=e,aspectRatio:1,dragMode:"move",viewMode:1,zoomable:!1,guides:!1,crop:this.onCrop}))),s.a.createElement(E.a,{type:"flex",justify:"center"},s.a.createElement(B,{onFile:this.handleFile,onText:this.handleText,onSave:this.handleSave}))))}}}),s.a.createElement(u.a,{component:function(){return s.a.createElement(E.a,{type:"flex",justify:"center",align:"middle",style:{minHeight:"100vh"}},s.a.createElement("img",{src:A.a,className:"img-fluid"}))}})))))),document.querySelector("#root"))},183:function(){!function(){var e,t=[].slice;e=CanvasRenderingContext2D.prototype.fillText,CanvasRenderingContext2D.prototype.fillText=function(){var n,a,r,i,l,o=this;return r=arguments[0],i=arguments[1],l=arguments[2],n=4<=arguments.length?t.call(arguments,3):[],null==this.letterSpacing||0===this.letterSpacing?e.apply(this,arguments):(a=0,!1,r.split("").forEach(function(t){return e.apply(o,[t,i+a+o.letterSpacing,l].concat(n)),a+=o.measureText(t).width+o.letterSpacing,t}))}}()},268:function(e,t,n){n(119)},269:function(e,t,n){e.exports=n(268)},280:function(){}});