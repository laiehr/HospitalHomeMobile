(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userInfo/userInfo"],{1255:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return u})},be29:function(t,e,n){"use strict";n.r(e);var r=n("e7fe"),u=n.n(r);for(var c in r)"default"!==c&&function(t){n.d(e,t,function(){return r[t]})}(c);e["default"]=u.a},c023:function(t,e,n){},ca73:function(t,e,n){"use strict";n.r(e);var r=n("1255"),u=n("be29");for(var c in u)"default"!==c&&function(t){n.d(e,t,function(){return u[t]})}(c);n("d067");var a=n("2877"),i=Object(a["a"])(u["default"],r["a"],r["b"],!1,null,null,null);e["default"]=i.exports},d067:function(t,e,n){"use strict";var r=n("c023"),u=n.n(r);u.a},e7fe:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={onLoad:function(){var e=this;t.getStorage({key:"currentUserGuid",success:function(t){e.currentUserGuid=t.data}})},onShow:function(){this.GetInfor()},data:function(){return{divheight:this.StatusBar,currentUserGuid:"",userInfo:{},imgsrc:""}},methods:{GetInfor:function(){var e=this;t.request({url:"http://hh.ricebird.cn/uc/GetUserInfo",method:"POST",data:{currentUserGuid:this.currentUserGuid},success:function(n){e.userInfo=n.data.data,e.imgsrc="http://hh.ricebird.cn"+n.data.data.Avatar,t.setStorage({key:"userInfo",data:n.data.data})},fail:function(){},complete:function(){}})},logout:function(){t.request({url:"http://hh.ricebird.cn/api/security/logout",method:"POST",data:{currentUserGuid:this.currentUserGuid},success:function(t){},fail:function(){},complete:function(){t.clearStorage()}}),t.reLaunch({url:"../login/login"})}}};e.default=n}).call(this,n("6e42")["default"])}},[["3269","common/runtime","common/vendor"]]]);