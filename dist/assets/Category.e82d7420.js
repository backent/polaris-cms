import{d as V,a as u,i as b,r as A,c as E,o as T,b as n,e as h,f as j,w as t,g as e,h as v,j as m,u as l,t as B,_ as p}from"./index.ddde4bb0.js";import{D as I}from"./DataTable.010066b0.js";const P={class:"d-flex justify-space-between"},$={class:"action"},R=V({__name:"Category",setup(k){const r=u(()=>p(()=>import("./Form.d70e01ab.js"),["assets/Form.d70e01ab.js","assets/index.ddde4bb0.js","assets/index.5a3607b7.css","assets/Form.66ca7ef0.css"])),f=u(()=>p(()=>import("./Delete.f00bb03c.js"),["assets/Delete.f00bb03c.js","assets/index.ddde4bb0.js","assets/index.5a3607b7.css"])),_=b("categoriesAPI"),d=A([]),x=E(()=>[{text:"No",value:"no"},{text:"Name",value:"name"},{text:"Slug",value:"slug"},{text:"Actions",value:"action"}]);function s(){_==null||_.get().then(c=>{d.value=c.data})}return T(()=>{s()}),(c,o)=>{const g=n("v-card-title"),C=n("v-card-text"),y=n("v-card"),D=n("v-col"),w=n("v-row"),N=n("v-container");return h(),j(N,null,{default:t(()=>[e(w,null,{default:t(()=>[e(D,null,{default:t(()=>[e(y,null,{default:t(()=>[e(g,null,{default:t(()=>[v("div",P,[m(" Categories "),e(l(r),{onClose:o[0]||(o[0]=a=>s())})])]),_:1}),e(C,null,{default:t(()=>[e(I,{headers:l(x),items:d.value},{no:t(({item:a})=>[m(B(d.value.findIndex(i=>i.id===a.id)+1),1)]),action:t(({item:a})=>[v("div",$,[e(l(r),{mode:"edit",id:a.id,icon:"mdi-pencil","color-button":"orange",onClose:o[1]||(o[1]=i=>s())},null,8,["id"]),e(l(f),{id:a.id,onClose:o[2]||(o[2]=i=>s())},null,8,["id"])])]),_:1},8,["headers","items"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}});export{R as default};