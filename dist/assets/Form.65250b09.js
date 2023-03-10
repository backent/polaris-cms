import{d as O,i as N,r as d,z as Q,A as R,B as W,k as X,o as Y,b as n,e as h,f as z,w as a,j as _,t as Z,u as i,C as $,g as o,D as A,p as I}from"./index.88802885.js";const ee=O({__name:"Form",props:{mode:{type:String,default:"create"},icon:{type:String,default:"mdi-pencil"},colorButton:{type:String,default:"orange"},id:{type:Number,default:0}},emits:["close"],setup(v,{emit:B}){const r=v,p=N("typesAPI"),c=N("categoriesAPI"),f=d(!1),C={name:"",type_id:null},l=d({...C}),s=d({id:0,name:""}),F=d({name:[e=>!!e||"Name is required!"],category:[e=>!!e&&e>0||"Category is required!"]});let y=Q([]);const b=d(null);function S(){l.value={...C}}function w(){B("close"),f.value=!1}function V(){var e;return(e=b.value)==null?void 0:e.validate()}async function T(){const e=await V();if(!(e!=null&&e.valid))return;let t;return r.mode==="create"?t=c==null?void 0:c.post(l.value):t=c==null?void 0:c.put(l.value.id,l.value),t==null?void 0:t.then(()=>{w()}).catch(g=>{throw g})}R(l,V,{deep:!0}),W(()=>{var e,t;l.value.type_id=(t=(e=s.value)==null?void 0:e.id)!=null?t:0});const m=X(()=>{const e={variant:void 0,icon:void 0,size:void 0,color:"primary"},t={variant:"plain",icon:r.icon,size:"x-small",color:r.colorButton};return r.mode==="create"?e:t});async function j(){S(),await A(),r.mode==="edit"&&(c==null||c.show(r.id).then(e=>{l.value={...e.data},s.value=y.find(t=>t.id===l.value.type_id)}).catch(e=>{console.log(e)}))}return Y(()=>{p==null||p.get().then(e=>{y=e.data})}),(e,t)=>{const g=n("v-icon"),U=n("v-card-title"),q=n("v-text-field"),k=n("v-col"),D=n("v-autocomplete"),E=n("v-row"),M=n("v-container"),P=n("v-form"),G=n("v-card-text"),H=n("v-spacer"),x=n("v-btn"),J=n("v-card-actions"),K=n("v-card"),L=n("v-dialog");return h(),z(x,{variant:i(m).variant,size:i(m).size,color:i(m).color,onClick:j},{default:a(()=>[_(Z(v.mode==="create"?"Add New":"")+" ",1),v.mode!=="create"?(h(),z(g,{key:0,icon:i(m).icon},null,8,["icon"])):$("",!0),o(L,{modelValue:f.value,"onUpdate:modelValue":t[2]||(t[2]=u=>f.value=u),activator:"parent","max-width":"800"},{default:a(()=>[o(K,null,{default:a(()=>[o(U,null,{default:a(()=>[_(" Form ")]),_:1}),o(G,null,{default:a(()=>[o(P,{ref_key:"formProduct",ref:b},{default:a(()=>[o(M,null,{default:a(()=>[o(E,null,{default:a(()=>[o(k,{md:"6"},{default:a(()=>[o(q,{modelValue:l.value.name,"onUpdate:modelValue":t[0]||(t[0]=u=>l.value.name=u),rules:F.value.name,label:"Category Name"},null,8,["modelValue","rules"])]),_:1}),o(k,{md:"6"},{default:a(()=>[o(D,{modelValue:s.value,"onUpdate:modelValue":t[1]||(t[1]=u=>s.value=u),label:"Type",items:i(y),"item-title":"name","return-object":""},null,8,["modelValue","items"])]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1}),o(J,{class:"footer-form"},{default:a(()=>[o(H),o(x,{color:"primary",onClick:T},{default:a(()=>[_("Save")]),_:1}),o(x,{color:"orange",onClick:w},{default:a(()=>[_("Close")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["variant","size","color"])}}});const oe=I(ee,[["__scopeId","data-v-f20f4048"]]);export{oe as default};