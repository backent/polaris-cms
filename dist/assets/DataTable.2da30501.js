import{d as D,r as y,k as v,l as I,b,e as n,m as l,g as h,w as L,h as _,F as f,n as m,u as x,t as k,p as T,j,q as N}from"./index.c30b73a3.js";const S={class:"table-container"},A=D({__name:"DataTable",props:{headers:{type:Array,default:()=>[]},items:{type:Array,default:()=>[]},filterBy:{type:Object,default:()=>({})}},setup(i){const g=i,s=y(1),u=10,V=y(4),d=v(()=>{let t=[...g.items];return Object.entries(g.filterBy).forEach(([e,r])=>{r&&(t=t.filter(o=>typeof o[e]=="number"?o[e]===parseInt(r,10):String(o[e]).toLowerCase().includes(r.toLowerCase())))}),t});I(d,()=>{s.value=1});const w=v(()=>{const t=u*s.value-u,e=u*s.value;return d.value.slice(t,e)}),B=v(()=>Math.ceil(d.value.length/u));return(t,e)=>{const r=b("v-table"),o=b("v-pagination");return n(),l("div",S,[h(r,null,{default:L(()=>[_("thead",null,[_("tr",null,[(n(!0),l(f,null,m(i.headers,(a,c)=>(n(),l("td",{key:c},k(a.text),1))),128))])]),_("tbody",null,[(n(!0),l(f,null,m(x(w),(a,c)=>(n(),l("tr",{key:c},[(n(!0),l(f,null,m(i.headers,(p,C)=>(n(),l("td",{key:C},[T(t.$slots,p.value,{value:a[p.value],item:a,currentIndex:c},()=>[j(k(a[p.value]),1)],!0)]))),128))]))),128))])]),_:3}),h(o,{class:"pagination",modelValue:s.value,"onUpdate:modelValue":e[0]||(e[0]=a=>s.value=a),length:x(B),"total-visible":V.value},null,8,["modelValue","length","total-visible"])])}}});const F=N(A,[["__scopeId","data-v-0261fe14"]]);export{F as D};
