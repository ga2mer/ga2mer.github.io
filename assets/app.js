webpackJsonp([0],{168:function(e,t,a){"use strict";(function(e){function t(e){return e&&e.__esModule?e:{"default":e}}function n(e){return l["default"].createElement("div",{className:"app"},l["default"].createElement(i["default"],{currentRoute:e.location.pathname}),e.children)}a(222);var r=a(4),l=t(r),s=a(243),o=a(135),u=a(171),i=t(u),c=a(172),d=t(c),f=a(170),m=t(f),p=a(169),h=t(p);e.Promise=a(179),(0,s.render)(l["default"].createElement(o.Router,{history:o.browserHistory},l["default"].createElement(o.Route,{path:"/",component:n},l["default"].createElement(o.IndexRoute,{component:d["default"]}),l["default"].createElement(o.Route,{path:"graffiti",component:m["default"]}),l["default"].createElement(o.Route,{path:"*",component:h["default"]}))),document.querySelector("#root"))}).call(t,a(167))},169:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(){return s["default"].createElement("div",{className:"container center-text",style:{maxWidth:"450px"}},s["default"].createElement("img",{src:u["default"],className:"img-fluid"}))}t.__esModule=!0,t["default"]=r;var l=a(4),s=n(l),o=a(331),u=n(o)},170:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var r=a(176),l=n(r),s=a(101),o=n(s),u=a(103),i=n(u),c=a(102),d=n(c),f=a(4),m=n(f),p=a(105),h=n(p),v=a(236),g=n(v),k=a(173),E=n(k),_=function(e){function t(a){(0,o["default"])(this,t);var n=(0,i["default"])(this,e.call(this,a));return n.parseJSON=function(e){return e.json()},n.handleChangeToken=function(e){n.setState({token:e.target.value,tokenValid:/access_token=(.+)&expires_in/.test(e.target.value)})},n.handleURL=function(e){n.setState({url:e.target.value})},n.setInfo=function(e,t){n.setState({info:{type:e,message:t}})},n.handleLink=function(){n.setInfo("","");var e=n.state.token,t=n.file;if(0==t.files.length&&0==n.state.url.length)return n.setInfo("error","Не выбран файл или не заполнено поле юрл"),!1;var a=/access_token=(.+)&expires_in/.exec(e),r=a[1],l=new FormData;l.append("file",t.files[0]);var s=/pu\.vk\.com\/c(\d+)\/upload\.php\?act=add_doc&mid=(\d+)&aid=0&gid=0&type=graffiti&hash=([a-z0-9]+)&rhash=([a-z0-9]+)&api=1/i,o=/cs(\d+)\.vk\.com\/upload\.php\?act=add_doc&mid=(\d+)&aid=0&gid=0&type=graffiti&hash=([a-z0-9]+)&rhash=([a-z0-9]+)/i;n.setInfo("message","Загрузка изображения, подождите"),(0,g["default"])("https://api.vk.com/method/docs.getUploadServer?v=5.54&access_token="+r+"&type=graffiti").then(n.checkStatusP).then(n.parseJSON).then(function(e){var a=s.test(e.response.upload_url),r=a&&s||o,u=r.exec(e.response.upload_url),i=u[1],c=u[2],d=u[3],f=u[4];return t.files.length>0?fetch("https://akigami.ru/vkgraffiti/upload_by_file?c="+i+"&mid="+c+"&hash="+d+"&rhash="+f,{method:"POST",body:l}).then(n.checkStatus).then(n.parseJSON):n.state.url?fetch("https://akigami.ru/vkgraffiti/upload_by_url?url="+n.state.url+"&c="+i+"&mid="+c+"&hash="+d+"&rhash="+f,{method:"POST"}).then(n.checkStatus).then(n.parseJSON):void 0}).then(function(e){return(0,g["default"])("https://api.vk.com/method/docs.save?v=5.54&access_token="+r+"&file="+e.file).then(n.parseJSON)}).then(function(e){var t=e.response[0],a="https://vk.com/doc"+t.owner_id+"_"+t.id;n.setInfo("link",a)})["catch"](function(e){return e instanceof E["default"]?n.setInfo("error",e.message):void n.setInfo("error",e.message)})},n.handleClearFile=function(){n.file.value=""},n.handleCopyLink=function(){n.linkInput.select(),document.execCommand("Copy")},n.state={token:"",tokenValid:!1,url:"",info:{type:"",message:""}},n}return(0,d["default"])(t,e),t.prototype.checkStatus=function(e){return e.status>=200&&e.status<300?e:e.json().then(function(e){var t;if(e.message)t="File too large"==e.message&&"Размер файла превышает 4мб"||e.message;else if(e.error&&e.error.error_code)return l["default"].reject(new E["default"](e.error.error_msg,e.error.error_code));return l["default"].reject(new Error(t))})},t.prototype.checkStatusP=function(e){return e.json().then(function(t){return t.response?e:t.error&&t.error.error_code?l["default"].reject(new E["default"](t.error.error_msg,t.error.error_code)):t.error?l["default"].reject(new Error(t.error.error_msg)):void 0})},t.prototype.handleGetToken=function(){window.open("https://oauth.vk.com/authorize?client_id=5553668&scope=docs&response_type=token")},t.prototype.handleSelectAll=function(e){e.target.setSelectionRange(0,e.target.value.length)},t.prototype.render=function(){var e=this;return m["default"].createElement("div",{className:"container middle-container"},m["default"].createElement("div",{className:"container center-text",style:{maxWidth:"450px"}},"Здесь когда-нибудь будет описание",m["default"].createElement("form",null,m["default"].createElement("label",{htmlFor:"token"},"Адрес с access_token"),m["default"].createElement("div",{className:"input-group"},m["default"].createElement("input",{id:"token",type:"text",className:"form-control sharp",value:this.state.token,onChange:this.handleChangeToken,placeholder:"https://oauth.vk.com/blank..."}),m["default"].createElement("span",{className:"input-group-btn"},m["default"].createElement("button",{className:"btn btn-primary sharp",type:"button",onClick:this.handleGetToken},"Получить"))),m["default"].createElement("label",{htmlFor:"file"},"Изображение в формате: png, jpg или gif"),m["default"].createElement("div",{className:"input-group"},m["default"].createElement("input",{id:"file",className:"form-control sharp",disabled:!this.state.tokenValid||this.state.url.length>0,ref:function(t){return e.file=t},type:"file"}),m["default"].createElement("span",{className:"input-group-btn"},m["default"].createElement("button",{className:"btn btn-primary sharp",type:"button",disabled:!this.state.tokenValid||this.state.url.length>0,onClick:this.handleClearFile},"Очистить"))),m["default"].createElement("div",{className:"strike"},m["default"].createElement("span",null,"или ссылку на изображение")),m["default"].createElement("input",{className:"form-control sharp",disabled:!this.state.tokenValid,type:"text",value:this.state.url,onKeyUp:this.handleURL,placeholder:"e.g. http://i.imgur.com/cPuty2U.png"}),m["default"].createElement("div",{className:"divider"}),m["default"].createElement("div",null,m["default"].createElement("button",{className:"btn btn-secondary sharp",type:"button",disabled:!this.state.tokenValid,onClick:this.handleLink},"Получить ссылку")),this.state.info.type&&m["default"].createElement("div",{className:"divider"}),this.state.info.type&&m["default"].createElement("div",{className:(0,h["default"])({alert:!0,"alert-danger":"error"==this.state.info.type,"alert-info":"message"==this.state.info.type,"alert-success":"link"==this.state.info.type}),role:"alert"},function(){return"link"==e.state.info.type?m["default"].createElement("div",{className:"input-group"},m["default"].createElement("input",{type:"text",ref:function(t){return e.linkInput=t},className:"form-control sharp",readOnly:!0,onClick:e.handleSelectAll,defaultValue:e.state.info.message}),m["default"].createElement("span",{className:"input-group-btn"},m["default"].createElement("button",{className:"btn btn-primary sharp",type:"button",onClick:e.handleCopyLink},"Скопировать"))):e.state.info.message}()))))},t}(f.Component);t["default"]=_},171:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e){var t=e.currentRoute;return s["default"].createElement("nav",{className:"navbar navbar-pills navbar-fixed-top",style:{background:"white"}},s["default"].createElement("ul",{className:"nav nav-pills navbar-nav"},s["default"].createElement("li",{className:(0,i["default"])({"nav-item":!0,active:"/"==t})},s["default"].createElement(o.Link,{className:"nav-link",to:"/"},"Me")),s["default"].createElement("li",{className:(0,i["default"])({"nav-item":!0,active:"/graffiti"==t})},s["default"].createElement(o.Link,{className:"nav-link",to:"/graffiti"},"Graffiti"))))}t.__esModule=!0,t["default"]=r;var l=a(4),s=n(l),o=a(135),u=a(105),i=n(u)},172:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(){return s["default"].createElement("div",{className:"vertical-center"},s["default"].createElement("div",{className:"container center-text"},s["default"].createElement("img",{src:u["default"],className:"img-fluid"}),s["default"].createElement("ul",{className:"links"},s["default"].createElement("li",null,s["default"].createElement("a",{href:"https://vk.com/ga2mer_o_o"},"VK")),s["default"].createElement("li",null,s["default"].createElement("a",{href:"https://twitter.com/ga2mer_ru"},"Twitter")))))}t.__esModule=!0,t["default"]=r;var l=a(4),s=n(l),o=a(330),u=n(o)},173:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var r=a(101),l=n(r),s=a(103),o=n(s),u=a(102),i=n(u),c=function(e){function t(a,n){(0,l["default"])(this,t);var r=(0,o["default"])(this,e.call(this));return r.name="VKError",r.message=a,r.error_code=n,r.stack=(new Error).stack,r}return(0,i["default"])(t,e),t}(Error);t["default"]=c},222:function(e,t){},330:function(e,t,a){e.exports=a.p+"nagisa.png"},331:function(e,t,a){e.exports=a.p+"ram.png"},332:function(e,t,a){e.exports=a(168)}},[332]);