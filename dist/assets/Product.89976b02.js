import{d as N,a as u,i as V,r as b,c as A,o as E,b as n,e as T,f as h,w as t,g as e,h as v,j as m,u as l,t as j,_ as p}from"./index.66e8f2fc.js";import{D as B}from"./DataTable.f4a6fd5f.js";const I={class:"d-flex justify-space-between"},$={class:"action"},R=N({__name:"Product",setup(k){const r=u(()=>p(()=>import("./Form.65e7c770.js"),["assets/Form.65e7c770.js","assets/index.66e8f2fc.js","assets/index.5a3607b7.css","assets/Form.c92f64ef.css"])),f=u(()=>p(()=>import("./Delete.1073178f.js"),["assets/Delete.1073178f.js","assets/index.66e8f2fc.js","assets/index.5a3607b7.css"])),d=V("productsAPI"),_=b([]),x=A(()=>[{text:"No",value:"no"},{text:"Name",value:"name"},{text:"Code",value:"code"},{text:"Slug",value:"slug"},{text:"Actions",value:"action"}]);function s(){d==null||d.get().then(i=>{_.value=i.data})}return E(()=>{s()}),(i,o)=>{const g=n("v-card-title"),C=n("v-card-text"),D=n("v-card"),P=n("v-col"),w=n("v-row"),y=n("v-container");return T(),h(y,null,{default:t(()=>[e(w,null,{default:t(()=>[e(P,null,{default:t(()=>[e(D,null,{default:t(()=>[e(g,null,{default:t(()=>[v("div",I,[m(" Products "),e(l(r),{onClose:o[0]||(o[0]=a=>s())})])]),_:1}),e(C,null,{default:t(()=>[e(B,{headers:l(x),items:_.value},{no:t(({item:a})=>[m(j(_.value.findIndex(c=>c.id===a.id)+1),1)]),action:t(({item:a})=>[v("div",$,[e(l(r),{mode:"edit",id:a.id,icon:"mdi-pencil","color-button":"orange",onClose:o[1]||(o[1]=c=>s())},null,8,["id"]),e(l(f),{id:a.id,onClose:o[2]||(o[2]=c=>s())},null,8,["id"])])]),_:1},8,["headers","items"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}});export{R as default};
