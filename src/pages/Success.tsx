import { Check, History, PawPrint } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui';
import { Dog } from '../components/pet/Dog';
import { useStore } from '../state/Store';
import { money } from '../lib/pricing';
const payments = {pix:'Pix',card:'Cartão',cash:'Dinheiro no estabelecimento'};
export function Success() {
 const {state,dispatch,go}=useStore();
 const order=state.orders.find(o=>o.id===state.lastOrderId);
 if(!order)return <section className="page-shell"><h1 tabIndex={-1}>Pedido não encontrado</h1><Button onClick={()=>go('history')}>Ver meus pedidos</Button></section>;
 return <section className="page-shell success-page"><motion.div className="success-icon" initial={{scale:.6}} animate={{scale:1}} transition={{type:'spring',stiffness:170,damping:12}}><Check size={35}/></motion.div><div className="eyebrow">PEDIDO SIMULADO CRIADO COM SUCESSO</div><h1 tabIndex={-1}>Um dia de carinho<br/>espera por {order.pet.name}<span className="purple">.</span></h1><p>{order.customer.name}, seu pedido demonstrativo está prontinho!</p><div className="order-receipt panel"><div className="receipt-top"><div><span className="eyebrow">SEU PEDIDO</span><strong className="order-id">{order.id}</strong><small>{new Date(order.createdAt).toLocaleString('pt-BR')}</small></div><div className="receipt-dog"><Dog breed={order.pet.breed} look={order.look} animated={false}/></div></div><div className="receipt-items">{order.items.map(i=><div className="price-line" key={i.kind+i.id}><span>{i.quantity}× {i.label}</span><b>{money(i.unitPrice*i.quantity)}</b></div>)}</div><div className="summary-total"><span>Total simulado</span><strong>{money(order.total)}</strong></div><div className="receipt-payment"><span>{payments[order.customer.payment]} · simulação</span><span><Check size={14}/> Salvo no histórico local</span></div></div><p className="success-disclaimer"><strong>Esta é uma demonstração.</strong> Nenhum pagamento ou agendamento real foi realizado.</p><div className="success-actions"><Button onClick={()=>dispatch({type:'RESET'})}><PawPrint size={18}/> Iniciar novo pedido</Button><Button variant="secondary" onClick={()=>go('history')}><History size={18}/> Meus pedidos</Button></div></section>;
}

