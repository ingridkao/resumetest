"use strict";(self["webpackChunkresume202209"]=self["webpackChunkresume202209"]||[]).push([[682],{7682:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var r=a(3396),i=a(7139);const s=(0,r.Uk)(" 分頁 "),n=["onClick"],l={class:"container"},u=["src","alt"];function g(e,t,a,g,o,c){return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("header",null,[(0,r._)("div",null,[s,(0,r._)("ul",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(o.pagination,(e=>((0,r.wg)(),(0,r.iD)("li",{key:e,class:(0,i.C_)({active:e===o.currentPage}),onClick:t=>c.triggerPage(e)},(0,i.zw)(e),11,n)))),128))])])]),(0,r._)("main",l,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(o.sourceData,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id},[(0,r._)("h6",null,(0,i.zw)(e.first_name)+" "+(0,i.zw)(e.last_name),1),(0,r._)("p",null,(0,i.zw)(e.email),1),(0,r._)("img",{src:e.avatar,alt:e.first_name,style:{height:"6rem"}},null,8,u)])))),128))])],64)}a(7658);var o={data(){return{sourceData:[],currentPage:1,perPage:3,pagination:[],totalPages:10}},methods:{getSource(){this.sourceData=[],this.axios.get("https://reqres.in/api/users",{params:{page:this.currentPage,per_page:this.perPage}}).then((e=>{if(!e.data)return;const{data:t,total:a,total_pages:r}=e.data;this.sourceData=t,this.totalPages=r,this.updatePage()}))},triggerPage(e){this.currentPage=e,this.getSource()},updatePage(){this.pagination=[];let e=1,t=this.totalPages;for(let a=e;a<=t;a++)this.pagination.push(a)}},created(){this.getSource()}},c=a(89);const h=(0,c.Z)(o,[["render",g],["__scopeId","data-v-e3bab930"]]);var p=h}}]);
//# sourceMappingURL=682.77c0d9fb.js.map