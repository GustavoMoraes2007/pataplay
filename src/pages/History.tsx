import { ArrowRight, ClipboardList, Plus } from 'lucide-react';
import { Back, Button, PageTitle } from '../components/ui';
import { Dog } from '../components/pet/Dog';
import { useStore } from '../state/Store';
import { money } from '../lib/pricing';
export function History() {
 const {state,dispatch}=useStore();
 return <section className="page-shell history-page"><Back page="home"/><PageTitle eyebrow="MEMÓRIAS DE CARINHO" title="Seus pedidos, todos aqui." description="Histórico dos últimos 50 pedidos simulados, salvo apenas neste navegador."/>
 {state.orders.length ? <div className="history-list">{state.orders.map(order=><button className="history-card panel" key={order.id} onClick={()=>dispatch({type:'VIEW_ORDER',id:order.id})}><div className="history-dog"><Dog breed={order.pet.breed} look={order.look} animated={false}/></div><div className="history-detail"><strong>{order.pet.name}</strong><small>{new Date(order.createdAt).toLocaleDateString('pt-BR')} · {order.id.slice(0,11)}</small><span>{order.items.reduce((sum,i)=>sum+i.quantity,0)} itens · Pedido simulado</span></div><b>{money(order.total)}</b><ArrowRight size={19}/></button>)}</div> : <div className="empty-state panel"><ClipboardList size={44}/><h2>A primeira transformação ainda vem aí.</h2><p>Quando você finalizar um pedido, ele aparece aqui.</p></div>}
 <Button onClick={()=>dispatch({type:'RESET'})}><Plus size={18}/> Criar novo pedido</Button></section>;
}

