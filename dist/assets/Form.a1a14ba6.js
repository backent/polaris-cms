import{d as ae,i as N,r as v,y as ie,z as ue,k as se,o as de,b as u,e as C,f as L,w as n,j as h,t as B,u as V,A as re,g as l,h as y,l as $,F as me,m as ce,s as _e,v as ve,p as pe}from"./index.a1c9e8e4.js";const M=c=>(_e("data-v-80957576"),c=c(),ve(),c),fe=M(()=>y("h3",null,"Details",-1)),ge=M(()=>y("h3",null,"Dimension",-1)),he=M(()=>y("h3",null,"Seat",-1)),Ve=["index"],ye={class:"tooltip"},be=ae({__name:"Form",props:{mode:{type:String,default:"create"},icon:{type:String,default:"mdi-pencil"},colorButton:{type:String,default:"orange"},id:{type:Number,default:0}},emits:["close"],setup(c,{emit:H}){const p=c,F=N("categoriesAPI"),r=N("productsAPI"),U=N("tempMediaAPI"),S=v(!1),z=v(null),K=v(null),b=v();let D=[];const s=v({name:[t=>!!t||"Name is required!"],category_id:[t=>!!t||"Category is required!"],group:[],id_description:[],en_description:[],features:[],dimension_height:[t=>!!t||"Dimension height is required"],dimension_length:[t=>!!t||"Dimension length is required"],dimension_width:[t=>!!t||"Dimension width is required"],seat_width:[t=>!!t||"Seat width is required"],seat_height:[t=>!!t||"Seat height is required"],seat_length:[t=>!!t||"Seat length is required"]}),j={name:"",category_id:null,id_description:"",en_description:"",features:"",dimension_height:0,dimension_length:0,seat_width:0,seat_height:0,seat_length:0,dimension_width:0,group:"",files:[]},o=v({...j}),w=v([]);function E(){H("close"),S.value=!1}async function P(){var t;return(t=K.value)==null?void 0:t.validate()}async function W(){const t=await P();if(!(t!=null&&t.valid))return;let e;return p.mode==="create"?e=r==null?void 0:r.post(o.value):e=r==null?void 0:r.put(o.value.id,o.value),e==null?void 0:e.then(()=>{E()}).catch(m=>{throw m})}ie(o,P,{deep:!0}),ue(()=>{var t,e;o.value.category_id=(e=(t=b.value)==null?void 0:t.id)!=null?e:0});const k=se(()=>{const t={variant:void 0,icon:void 0,size:void 0,color:"primary"},e={variant:"plain",icon:p.icon,size:"x-small",color:p.colorButton};return p.mode==="create"?t:e});de(()=>{F==null||F.get().then(t=>{D=t.data})});function G(){o.value={name:"",category_id:null,id_description:"",en_description:"",features:"",dimension_height:0,dimension_length:0,seat_width:0,seat_height:0,seat_length:0,dimension_width:0,group:"",files:[]},w.value=[]}async function T(){G(),p.mode!=="create"&&(r==null||r.show(p.id).then(t=>{o.value={...j,...t.data},b.value=D.find(e=>e.id===o.value.category_id)}))}function A(){var t;(t=z.value)==null||t.click()}async function J(t){const e=t.target.files,m=[];for(let _=0;_<e.length;_++){const i=e.item(_),d=new FormData;d.append("file",i),m.push(U==null?void 0:U.post(d))}await Promise.all(m).then(_=>{o.value.files=[...o.value.files,..._.map(i=>i.data)]}),w.value=[...w.value,...t.target.files]}function O(t){try{o.value.files=o.value.files.filter(e=>e!==o.value.files[t])}catch(e){throw console.log("Error while deleting file"),e}}function f(t){const e=["0","1","2","3","4","5","6","7","8","9","."],m=t.key;e.includes(m)||t.preventDefault()}return(t,e)=>{const m=u("v-icon"),_=u("v-card-title"),i=u("v-col"),d=u("v-text-field"),Q=u("v-autocomplete"),R=u("v-combobox"),g=u("v-row"),q=u("v-textarea"),x=u("v-btn"),X=u("v-chip"),Y=u("v-container"),Z=u("v-form"),ee=u("v-card-text"),le=u("v-spacer"),te=u("v-card-actions"),oe=u("v-card"),ne=u("v-dialog");return C(),L(x,{variant:V(k).variant,size:V(k).size,color:V(k).color,onClick:T},{default:n(()=>[h(B(c.mode==="create"?"Add New":"")+" ",1),c.mode!=="create"?(C(),L(m,{key:0,icon:V(k).icon},null,8,["icon"])):re("",!0),l(ne,{modelValue:S.value,"onUpdate:modelValue":e[13]||(e[13]=a=>S.value=a),activator:"parent","max-width":"800"},{default:n(()=>[l(oe,null,{default:n(()=>[l(_,null,{default:n(()=>[h(" Form ")]),_:1}),l(ee,null,{default:n(()=>[l(Z,{ref_key:"formProduct",ref:K},{default:n(()=>[l(Y,null,{default:n(()=>[l(g,null,{default:n(()=>[l(i,{md:"12"},{default:n(()=>[fe]),_:1}),l(i,{md:"6"},{default:n(()=>[l(d,{modelValue:o.value.name,"onUpdate:modelValue":e[0]||(e[0]=a=>o.value.name=a),rules:s.value.name,label:"Product Name"},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"6"},{default:n(()=>[l(Q,{modelValue:b.value,"onUpdate:modelValue":e[1]||(e[1]=a=>b.value=a),rules:s.value.category_id,items:V(D),label:"Category","item-title":"name","return-object":""},null,8,["modelValue","rules","items"])]),_:1}),l(i,{md:"6"},{default:n(()=>[l(R,{modelValue:o.value.group,"onUpdate:modelValue":e[2]||(e[2]=a=>o.value.group=a),rules:s.value.group,items:[],label:"Group"},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(g,null,{default:n(()=>[l(i,{md:"12"},{default:n(()=>[l(q,{modelValue:o.value.en_description,"onUpdate:modelValue":e[3]||(e[3]=a=>o.value.en_description=a),rules:s.value.en_description,label:"Description (English)",counter:""},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"12"},{default:n(()=>[l(q,{modelValue:o.value.id_description,"onUpdate:modelValue":e[4]||(e[4]=a=>o.value.id_description=a),rules:s.value.id_description,label:"Description (Bahasa)",counter:""},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(g,null,{default:n(()=>[l(i,{md:"12"},{default:n(()=>[l(q,{modelValue:o.value.features,"onUpdate:modelValue":e[5]||(e[5]=a=>o.value.features=a),rules:s.value.features,label:"Features",counter:""},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(g,null,{default:n(()=>[l(i,{md:"12"},{default:n(()=>[ge]),_:1}),l(i,{md:"4"},{default:n(()=>[l(d,{modelValue:o.value.dimension_width,"onUpdate:modelValue":e[6]||(e[6]=a=>o.value.dimension_width=a),modelModifiers:{number:!0},rules:s.value.dimension_width,onKeypress:f,label:"Width"},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"4"},{default:n(()=>[l(d,{modelValue:o.value.dimension_length,"onUpdate:modelValue":e[7]||(e[7]=a=>o.value.dimension_length=a),modelModifiers:{number:!0},rules:s.value.dimension_length,onKeypress:f,label:"Length"},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"4"},{default:n(()=>[l(d,{modelValue:o.value.dimension_height,"onUpdate:modelValue":e[8]||(e[8]=a=>o.value.dimension_height=a),modelModifiers:{number:!0},rules:s.value.dimension_height,onKeypress:f,label:"Height"},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(g,null,{default:n(()=>[l(i,{md:"12"},{default:n(()=>[he]),_:1}),l(i,{md:"4"},{default:n(()=>[l(d,{modelValue:o.value.seat_width,"onUpdate:modelValue":e[9]||(e[9]=a=>o.value.seat_width=a),modelModifiers:{number:!0},rules:s.value.seat_width,onKeypress:f,label:"Width"},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"4"},{default:n(()=>[l(d,{modelValue:o.value.seat_length,"onUpdate:modelValue":e[10]||(e[10]=a=>o.value.seat_length=a),modelModifiers:{number:!0},rules:s.value.seat_length,onKeypress:f,label:"Length"},null,8,["modelValue","rules"])]),_:1}),l(i,{md:"4"},{default:n(()=>[l(d,{modelValue:o.value.seat_height,"onUpdate:modelValue":e[11]||(e[11]=a=>o.value.seat_height=a),modelModifiers:{number:!0},rules:s.value.seat_height,onKeypress:f,label:"Height"},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(g,null,{default:n(()=>[l(i,{md:"3",style:{height:"40px"}},{default:n(()=>[l(x,{onClick:e[12]||(e[12]=a=>A())},{default:n(()=>[h(" Add Image ")]),_:1}),y("input",{ref_key:"file",ref:z,type:"file",accept:".png,.jpg,.jpeg",multiple:"",style:{visibility:"hidden"},onInput:J},null,544)]),_:1}),l(i,{md:"12",class:"files"},{default:n(()=>[(C(!0),$(me,null,ce(w.value,(a,I)=>(C(),$("div",{index:I,class:"chip-container"},[l(X,{"prepend-icon":"mdi-file-image"},{default:n(()=>[h(B(t.$ellipsis(a.name,20))+" ",1),l(m,{icon:"mdi-trash-can-outline",color:"pink",style:{"margin-left":"5px"},onClick:we=>O(I)},null,8,["onClick"])]),_:2},1024),y("div",ye,B(a.name),1)],8,Ve))),256))]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1}),l(te,{class:"footer-form"},{default:n(()=>[l(le),l(x,{color:"primary",onClick:W},{default:n(()=>[h("Save")]),_:1}),l(x,{color:"orange",onClick:E},{default:n(()=>[h("Close")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["variant","size","color"])}}});const xe=pe(be,[["__scopeId","data-v-80957576"]]);export{xe as default};
