"use strict";(self["webpackChunkresume202209"]=self["webpackChunkresume202209"]||[]).push([[341],{3341:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var r=a(3396),i=a(7139);const n=(0,r.Uk)(" 分頁 "),s=["onClick"],g={class:"container"},l=["src","alt"];function u(e,t,a,u,c,o){return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("header",null,[(0,r._)("div",null,[n,(0,r._)("ul",null,[1!==c.currentPage?((0,r.wg)(),(0,r.iD)("li",{key:0,onClick:t[0]||(t[0]=e=>o.triggerPage(c.currentPage-1))},"prev")):(0,r.kq)("",!0),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(c.pagination,(e=>((0,r.wg)(),(0,r.iD)("li",{key:e,class:(0,i.C_)({active:e===c.currentPage}),onClick:t=>o.triggerPage(e)},(0,i.zw)(e),11,s)))),128)),c.currentPage!==c.totalPages?((0,r.wg)(),(0,r.iD)("li",{key:1,onClick:t[1]||(t[1]=e=>o.triggerPage(c.currentPage+1))},"next")):(0,r.kq)("",!0)])])]),(0,r._)("main",g,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(c.sourceData,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id},[(0,r._)("h6",null,(0,i.zw)(e.first_name)+" "+(0,i.zw)(e.last_name),1),(0,r._)("p",null,(0,i.zw)(e.email),1),(0,r._)("img",{src:e.avatar,alt:e.first_name,style:{height:"6rem"}},null,8,l)])))),128))])],64)}a(7658);var c={data(){return{sourceData:[],currentPage:1,perPage:3,pagination:[],totalPages:10}},methods:{getSource(){this.sourceData=[],this.axios.get("https://reqres.in/api/users",{params:{page:this.currentPage,per_page:this.perPage}}).then((e=>{if(!e.data)return;const{data:t,total:a,total_pages:r}=e.data;this.sourceData=t,this.totalPages=r,this.updatePage()}))},triggerPage(e){this.currentPage=e,this.getSource()},updatePage(){let e=1,t=this.totalPages;this.pagination=[];for(let a=e;a<=t;a++)this.pagination.push(a)}},created(){this.getSource()}},o=a(89);const h=(0,o.Z)(c,[["render",u],["__scopeId","data-v-2cf039f8"]]);var p=h}}]);
//# sourceMappingURL=341.4ba720f7.js.map