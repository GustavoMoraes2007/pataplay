import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Banknote, CreditCard, LockKeyhole, QrCode, ShieldCheck } from 'lucide-react';
import { Back, Button, NextIcon, PageTitle, PriceSummary } from '../components/ui';
import { Dog } from '../components/pet/Dog';
import { useStore } from '../state/Store';
import { createOrder, validateCustomer } from '../lib/state';
import { breedById } from '../data/catalog';
import type { Customer } from '../types';

export function Checkout() {
 const { state, dispatch, go } = useStore();
 const [errors,setErrors] = useState<Partial<Record<keyof Customer,string>>>({});
 const [failure,setFailure] = useState('');
 const submitted = useRef(false);
 const update = (key:keyof Customer,value:string) => {dispatch({type:'CUSTOMER',customer:{[key]:value}});setErrors(old=>({...old,[key]:undefined}));};
 const submit = (event:FormEvent) => {
  event.preventDefault();
  if(submitted.current) return;
  const nextErrors=validateCustomer(state.customer);
  setErrors(nextErrors);
  if(Object.keys(nextErrors).length){document.getElementById('customer-'+Object.keys(nextErrors)[0])?.focus();return;}
  try{const order=createOrder(state);submitted.current=true;dispatch({type:'ORDER',order});}
  catch(error){setFailure(error instanceof Error?error.message:'Não foi possível criar o pedido. Tente novamente.');}
 };
 return <section className="page-shell checkout-page"><Back page="shop">Voltar à lojinha</Back><PageTitle eyebrow="PASSO 04 · QUASE NA HORA DO CARINHO" title="Tudo pronto para um dia especial." description="Confira suas escolhas e finalize seu pedido demonstrativo."/>
 <div className="simulation-banner"><ShieldCheck size={21}/><div><strong>Você está em uma experiência de demonstração.</strong><span>Nenhuma cobrança ou reserva será realizada. Não pedimos dados de cartão ou bancários.</span></div></div>
 <div className="checkout-layout"><form className="checkout-form panel" noValidate onSubmit={submit}><h2>Quem acompanha essa fofura?</h2><p>Dados do responsável para compor o pedido simulado.</p>
 <div className="form-fields">{([{key:'name',label:'Nome completo',placeholder:'Seu nome e sobrenome',type:'text',auto:'name',max:100},{key:'phone',label:'Telefone com DDD',placeholder:'(11) 99999-9999',type:'tel',auto:'tel',max:25},{key:'email',label:'E-mail',placeholder:'voce@exemplo.com',type:'email',auto:'email',max:150}] as const).map(field=><label className={`field ${field.key==='name'?'full-field':''}`} key={field.key} htmlFor={'customer-'+field.key}>{field.label}<input aria-label={field.label} id={'customer-'+field.key} name={field.key} type={field.type} autoComplete={field.auto} placeholder={field.placeholder} maxLength={field.max} value={state.customer[field.key]} required aria-invalid={!!errors[field.key]} aria-describedby={errors[field.key]?'error-'+field.key:undefined} onChange={e=>update(field.key,e.target.value)}/>{errors[field.key]&&<span className="field-error" id={'error-'+field.key}>{errors[field.key]}</span>}</label>)}
 <label className="field full-field" htmlFor="customer-notes">Algo que devemos saber? <span className="optional">Opcional</span><textarea id="customer-notes" rows={3} maxLength={1000} placeholder="Conte sobre preferências ou cuidados especiais do seu pet." value={state.customer.notes} onChange={e=>update('notes',e.target.value)}/></label></div>
 <fieldset className="payment-methods"><legend>Como seria o pagamento?</legend><p>Escolha ilustrativa · todas as opções são simulações.</p><div>{([{id:'pix',name:'Pix',icon:QrCode},{id:'card',name:'Cartão',icon:CreditCard},{id:'cash',name:'No estabelecimento',icon:Banknote}] as const).map(p=><label key={p.id} className={state.customer.payment===p.id?'selected':''}><input type="radio" name="payment" value={p.id} checked={state.customer.payment===p.id} onChange={()=>update('payment',p.id)}/><p.icon size={23}/><strong>{p.name}</strong><small>Simulação</small></label>)}</div></fieldset>
 <p className="privacy-note"><LockKeyhole size={14}/> Os dados ficam neste navegador. Você pode usar dados fictícios.</p>{failure&&<p role="alert" className="field-error">{failure}</p>}<Button className="w-full checkout-submit" type="submit">Finalizar pedido fictício <NextIcon/></Button>
 </form><aside className="checkout-summary panel"><div className="checkout-pet"><div><Dog breed={state.pet.breed} look={state.look} animated={false}/></div><span><strong>{state.pet.name}</strong><small>{breedById(state.pet.breed).name}</small></span><button className="text-link" onClick={()=>go('studio')}>Editar</button></div><PriceSummary/><button className="text-link centered" onClick={()=>go('shop')}>Editar produtos do carrinho</button><p className="fine-print">Valores em reais. Sem frete ou taxas adicionais nesta simulação.</p></aside></div>
 </section>;
}


