import{d as ne,i as D,r as p,y as ie,z as ue,k as de,o as se,b as u,e as F,f as L,w as a,j as V,t as z,u as y,A as re,g as l,h as b,l as $,F as me,m as ce,s as _e,v as ve,p as pe}from"./index.8f44272c.js";const K=v=>(_e("data-v-a0d36ac0"),v=v(),ve(),v),fe=K(()=>b("h3",null,"Details",-1)),ge=K(()=>b("h3",null,"Dimension",-1)),he=K(()=>b("h3",null,"Seat",-1)),Ve=["index"],ye={class:"tooltip"},be=ne({__name:"Form",props:{mode:{type:String,default:"create"},icon:{type:String,default:"mdi-pencil"},colorButton:{type:String,default:"orange"},id:{type:Number,default:0}},emits:["close"],setup(v,{emit:H}){const f=v,U=D("categoriesAPI"),c=D("productsAPI"),N=D("tempMediaAPI"),S=p(!1),j=p(null),E=p(null),w=p();let B=[];const s=p({name:[o=>!!o||"Name is required!"],category_id:[o=>!!o||"Category is required!"],code:[],id_description:[],en_description:[],features:[],premium_material:[],dimension_height:[],dimension_length:[],dimension_width:[],seat_width:[],seat_height:[],seat_length:[]}),P={name:"",category_id:null,id_description:"",en_description:"",features:"",premium_material:"",dimension_height:0,dimension_length:0,seat_width:0,seat_height:0,seat_length:0,dimension_width:0,code:"",files:[],removedFiles:[]},t=p({...P}),_=p([]);function I(){H("close"),S.value=!1}async function q(){var o;return(o=E.value)==null?void 0:o.validate()}async function W(){const o=await q();if(!(o!=null&&o.valid))return;let e;const d={...t.value,files:t.value.files.map(r=>r.id)};return f.mode==="create"?e=c==null?void 0:c.post(d):e=c==null?void 0:c.put(t.value.id,d),e==null?void 0:e.then(()=>{I()}).catch(r=>{throw r})}ie(t,q,{deep:!0}),ue(()=>{var o,e;t.value.category_id=(e=(o=w.value)==null?void 0:o.id)!=null?e:0});const k=de(()=>{const o={variant:void 0,icon:void 0,size:void 0,color:"primary"},e={variant:"plain",icon:f.icon,size:"x-small",color:f.colorButton};return f.mode==="create"?o:e});se(()=>{U==null||U.get().then(o=>{B=o.data})});function T(){t.value={name:"",category_id:null,id_description:"",en_description:"",features:"",premium_material:"",dimension_height:0,dimension_length:0,seat_width:0,seat_height:0,seat_length:0,dimension_width:0,code:"",files:[],removedFiles:[]},_.value=[]}async function A(){T(),f.mode!=="create"&&(c==null||c.show(f.id).then(o=>{const{images:e,...d}=o.data;t.value={...P,...d},w.value=B.find(r=>r.id===t.value.category_id),Q(e)}))}function G(){var o;(o=j.value)==null||o.click()}async function J(o){const e=o.target.files,d=[];for(let r=0;r<e.length;r++){const i=e.item(r),m=new FormData;m.append("file",i),d.push(N==null?void 0:N.post(m))}await Promise.all(d).then(r=>{t.value.files=[...t.value.files,...r.reduce((i,m,M)=>(i.push({id:m.data,file:e.item(M)}),i),[])]}),_.value=[..._.value,...o.target.files]}function O(o){try{o.id?(t.value.removedFiles=[...t.value.removedFiles,o.id],_.value=_.value.filter(e=>{var d;return((d=e==null?void 0:e.id)!=null?d:0)!==o.id})):(_.value=_.value.filter(e=>e!==o),t.value.files=t.value.files.filter(e=>e.file!==o))}catch(e){throw console.log("Error while deleting file"),e}}function g(o){const e=["0","1","2","3","4","5","6","7","8","9","."],d=o.key;e.includes(d)||o.preventDefault()}function Q(o){_.value=o.map(e=>({...e,name:e.original_name}))}return(o,e)=>{const d=u("v-icon"),r=u("v-card-title"),i=u("v-col"),m=u("v-text-field"),M=u("v-autocomplete"),h=u("v-row"),x=u("v-textarea"),C=u("v-btn"),R=u("v-chip"),X=u("v-container"),Y=u("v-form"),Z=u("v-card-text"),ee=u("v-spacer"),le=u("v-card-actions"),te=u("v-card"),oe=u("v-dialog");return F(),L(C,{variant:y(k).variant,size:y(k).size,color:y(k).color,onClick:A},{default:a(()=>[V(z(v.mode==="create"?"Add New":"")+" ",1),v.mode!=="create"?(F(),L(d,{key:0,icon:y(k).icon},null,8,["icon"])):re("",!0),l(oe,{modelValue:S.value,"onUpdate:modelValue":e[14]||(e[14]=n=>S.value=n),activator:"parent","max-width":"800"},{default:a(()=>[l(te,null,{default:a(()=>[l(r,null,{default:a(()=>[V(" Form ")]),_:1}),l(Z,null,{default:a(()=>[l(Y,{ref_key:"formProduct",ref:E},{default:a(()=>[l(X,null,{default:a(()=>[l(h,null,{default:a(()=>[l(i,{md:"12"},{default:a(()=>[fe]),_:1}),l(i,{md:"6"},{default:a(()=>[l(m,{modelValue:t.value.name,"onUpdate:modelValue":e[0]||(e[0]=n=>t.value.name=n),rules:s.value.name,label:"Product Name"},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"6"},{default:a(()=>[l(M,{modelValue:w.value,"onUpdate:modelValue":e[1]||(e[1]=n=>w.value=n),rules:s.value.category_id,items:y(B),label:"Category","item-title":"name","return-object":""},null,8,["modelValue","rules","items"])]),_:1}),l(i,{md:"6"},{default:a(()=>[l(m,{modelValue:t.value.code,"onUpdate:modelValue":e[2]||(e[2]=n=>t.value.code=n),rules:s.value.code,label:"Code"},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(h,null,{default:a(()=>[l(i,{md:"12"},{default:a(()=>[l(x,{modelValue:t.value.en_description,"onUpdate:modelValue":e[3]||(e[3]=n=>t.value.en_description=n),rules:s.value.en_description,label:"Description (English)",counter:""},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"12"},{default:a(()=>[l(x,{modelValue:t.value.id_description,"onUpdate:modelValue":e[4]||(e[4]=n=>t.value.id_description=n),rules:s.value.id_description,label:"Description (Bahasa)",counter:""},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(h,null,{default:a(()=>[l(i,{md:"12"},{default:a(()=>[l(x,{modelValue:t.value.features,"onUpdate:modelValue":e[5]||(e[5]=n=>t.value.features=n),rules:s.value.features,label:"Features",counter:""},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"12"},{default:a(()=>[l(x,{modelValue:t.value.premium_material,"onUpdate:modelValue":e[6]||(e[6]=n=>t.value.premium_material=n),rules:s.value.premium_material,label:"Premium Material",counter:""},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(h,null,{default:a(()=>[l(i,{md:"12"},{default:a(()=>[ge]),_:1}),l(i,{md:"4"},{default:a(()=>[l(m,{modelValue:t.value.dimension_width,"onUpdate:modelValue":e[7]||(e[7]=n=>t.value.dimension_width=n),modelModifiers:{number:!0},rules:s.value.dimension_width,onKeypress:g,label:"Width"},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"4"},{default:a(()=>[l(m,{modelValue:t.value.dimension_length,"onUpdate:modelValue":e[8]||(e[8]=n=>t.value.dimension_length=n),modelModifiers:{number:!0},rules:s.value.dimension_length,onKeypress:g,label:"Length"},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"4"},{default:a(()=>[l(m,{modelValue:t.value.dimension_height,"onUpdate:modelValue":e[9]||(e[9]=n=>t.value.dimension_height=n),modelModifiers:{number:!0},rules:s.value.dimension_height,onKeypress:g,label:"Height"},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(h,null,{default:a(()=>[l(i,{md:"12"},{default:a(()=>[he]),_:1}),l(i,{md:"4"},{default:a(()=>[l(m,{modelValue:t.value.seat_width,"onUpdate:modelValue":e[10]||(e[10]=n=>t.value.seat_width=n),modelModifiers:{number:!0},rules:s.value.seat_width,onKeypress:g,label:"Width"},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"4"},{default:a(()=>[l(m,{modelValue:t.value.seat_length,"onUpdate:modelValue":e[11]||(e[11]=n=>t.value.seat_length=n),modelModifiers:{number:!0},rules:s.value.seat_length,onKeypress:g,label:"Length"},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"4"},{default:a(()=>[l(m,{modelValue:t.value.seat_height,"onUpdate:modelValue":e[12]||(e[12]=n=>t.value.seat_height=n),modelModifiers:{number:!0},rules:s.value.seat_height,onKeypress:g,label:"Height"},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(h,null,{default:a(()=>[l(i,{md:"3",style:{height:"40px"}},{default:a(()=>[l(C,{onClick:e[13]||(e[13]=n=>G())},{default:a(()=>[V(" Add Image ")]),_:1}),b("input",{ref_key:"file",ref:j,type:"file",accept:".png,.jpg,.jpeg",multiple:"",style:{visibility:"hidden"},onInput:J},null,544)]),_:1}),l(i,{md:"12",class:"files"},{default:a(()=>[(F(!0),$(me,null,ce(_.value,(n,ae)=>(F(),$("div",{index:ae,class:"chip-container"},[l(R,{"prepend-icon":"mdi-file-image"},{default:a(()=>[V(z(o.$ellipsis(n.name,20))+" ",1),l(d,{icon:"mdi-trash-can-outline",color:"pink",style:{"margin-left":"5px"},onClick:we=>O(n)},null,8,["onClick"])]),_:2},1024),b("div",ye,z(n.name),1)],8,Ve))),256))]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1}),l(le,{class:"footer-form"},{default:a(()=>[l(ee),l(C,{color:"primary",onClick:W},{default:a(()=>[V("Save")]),_:1}),l(C,{color:"orange",onClick:I},{default:a(()=>[V("Close")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["variant","size","color"])}}});const xe=pe(be,[["__scopeId","data-v-a0d36ac0"]]);export{xe as default};
