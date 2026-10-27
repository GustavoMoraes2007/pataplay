import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { products } from '../data/products';
import { ProductArt } from '../components/ProductArt';
import { Back, Button, NextIcon, PageTitle } from '../components/ui';
import { money, totals } from '../lib/pricing';
import { useStore } from '../state/Store';
export function Shop() {
 const { state, dispatch, go } = useStore();
 const [category,setCategory] = useState('Todos');
 const [notice,setNotice] = useState('');
 const price = totals(state);
 const change=(id:string,delta:number)=>{dispatch({type:'CART',id,delta});setNotice(delta>0?'Produto adicionado ao carrinho.':'Carrinho atualizado.');};
 return <section className="page-shell shop-page"><Back page="result">Voltar ao visual</Back><PageTitle eyebrow="PASSO 03 · UM MIMO A MAIS" title="Porque carinho nunca é demais." description="Pequenos presentes para deixar o dia ainda mais especial. Só se você quiser."/>
 <div className="shop-toolbar"><div className="filters" role="group" aria-label="Filtrar produtos">{['Todos','Brinquedos','Passeio','Cuidados','Petiscos'].map(c=><button key={c} className={category===c?'active':''} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div><button className="text-link" onClick={()=>go('checkout')}>Pular lojinha <NextIcon/></button></div>
 <div className="product-grid">{products.filter(p=>category==='Todos'||p.category===category).map(p=><article className="product-card" key={p.id}><div className="product-image" style={{background:p.color}}><span>{p.category}</span><ProductArt id={p.id}/></div><div className="product-info"><h2>{p.name}</h2><p>{p.description}</p><div className="product-bottom"><strong>{money(p.price)}</strong>{state.cart[p.id]?<div className="quantity-control"><button aria-label={`Remover uma unidade de ${p.name}`} onClick={()=>change(p.id,-1)}>{state.cart[p.id]===1?<Trash2 size={15}/>:<Minus size={15}/>}</button><span aria-label={`Quantidade de ${p.name}`}>{state.cart[p.id]}</span><button aria-label={`Adicionar uma unidade de ${p.name}`} disabled={state.cart[p.id]>=20} onClick={()=>change(p.id,1)}><Plus size={15}/></button></div>:<button className="add-product" onClick={()=>change(p.id,1)} aria-label={`Adicionar ${p.name}`}><Plus size={16}/> Adicionar</button>}</div></div></article>)}</div>
 <p className="sr-only" role="status">{notice}</p>
 <div className="shop-cart-bar panel"><span className="round-icon"><ShoppingBag size={24}/></span><div className="shop-cart-info"><strong>{price.quantity ? price.quantity+' mimo'+(price.quantity>1?'s':'')+' no carrinho':'Seu carrinho de mimos está vazio'}</strong><small>Cuidados {money(price.serviceTotal)} <span>+ produtos {money(price.productTotal)}</span></small></div><div className="shop-cart-total"><small>Total geral</small><strong aria-live="polite">{money(price.total)}</strong></div><Button onClick={()=>go('checkout')}>Continuar <NextIcon/></Button></div>
 <p className="fine-print">Até 20 unidades por produto. “Pular lojinha” mantém os itens já escolhidos; para retirá-los, use o controle de quantidade.</p>
 </section>;
}

