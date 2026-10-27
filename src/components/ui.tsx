import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, PawPrint, ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '../state/Store';
import { totals, money } from '../lib/pricing';
import type { Page } from '../types';
export function Button({ children, variant = 'primary', className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
 return <button className={`btn btn-${variant} ${className}`} {...props}>{children}</button>;
}
export function Back({ page, children = 'Voltar' }: { page: Page; children?: ReactNode }) {
 const { go } = useStore();
 return <button className="back-link" onClick={() => go(page)}><ArrowLeft size={16}/>{children}</button>;
}
const stages = [{page:'pet',name:'Seu pet'}, {page:'studio',name:'Estúdio'}, {page:'shop',name:'Lojinha'}, {page:'checkout',name:'Finalizar'}] as const;
export function Header() {
 const { state, go } = useStore();
 const price = totals(state);
 const step = state.page === 'result' ? 1 : state.page === 'success' ? 4 : stages.findIndex(s => s.page === state.page);
 return <header className="site-header"><div className="header-inner">
  <button className="logo" aria-label="PataPlay, página inicial" onClick={() => go('home')}><span className="logo-icon"><PawPrint size={25} fill="currentColor"/></span><span>Pata<span className="logo-play">Play</span><span className="logo-dot">.</span></span></button>
  {state.page === 'home' || state.page === 'history' ? <nav className="main-nav" aria-label="Navegação principal"><a href="#como-funciona" onClick={e => { if(state.page !== 'home'){ e.preventDefault(); go('home'); } }}>Como funciona</a><button onClick={() => go(state.pet.name ? 'studio' : 'pet')}>O estúdio</button><button onClick={() => go('history')}>Meus pedidos</button></nav> : <nav className="step-nav" aria-label="Etapas do pedido">{stages.map((s,i)=><button key={s.page} className={i === step ? 'active' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined} disabled={!state.pet.name.trim() && i > 0} onClick={() => go(s.page)}><span>{i < step ? <Check size={13}/> : i+1}</span><b>{s.name}</b>{i < 3 && <i/>}</button>)}</nav>}
  <button className="cart-button" aria-label={`Carrinho com ${price.quantity} produtos`} onClick={() => go(state.pet.name ? 'checkout' : 'pet')}><ShoppingBag size={20}/><span className="cart-label">Meu carrinho</span><span className="cart-count">{price.quantity}</span></button>
 </div></header>;
}
export function Footer() { return <footer className="site-footer"><span><PawPrint size={14}/> Feito para quem ama de quatro patas.</span><span>PataPlay · Beta demonstrativo</span></footer>; }
export function Eyebrow({ children }: { children: ReactNode }) { return <div className="eyebrow"><Sparkles size={14}/>{children}</div>; }
export function PageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
 return <div className="page-title"><Eyebrow>{eyebrow}</Eyebrow><h1 tabIndex={-1}>{title}</h1><p>{description}</p></div>;
}
export function PriceSummary({ products = true }: { products?: boolean }) {
 const { state } = useStore();
 const price = totals(state);
 return <div className="price-summary">
  <h3>Um cuidado, cada detalhe.</h3>
  {price.services.map(i=><div className="price-line" key={i.id}><span>{i.label}</span><b>{i.unitPrice ? money(i.unitPrice) : 'Incluído'}</b></div>)}
  {products && price.products.length > 0 && <><div className="summary-divider"/><h4>Da lojinha</h4>{price.products.map(i=><div className="price-line" key={i.id}><span>{i.quantity}× {i.label}</span><b>{money(i.unitPrice * i.quantity)}</b></div>)}</>}
  <div className="summary-total"><span>{products ? 'Total do pedido' : 'Total dos cuidados'}</span><strong data-testid="summary-total">{money(products ? price.total : price.serviceTotal)}</strong></div>
 </div>;
}
export function NextIcon() { return <ArrowRight size={18}/>; }

