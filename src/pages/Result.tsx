import { Check, Pencil, Sparkles } from 'lucide-react';
import { Dog } from '../components/pet/Dog';
import { Button, Eyebrow, NextIcon, PriceSummary } from '../components/ui';
import { breedById } from '../data/catalog';
import { useStore } from '../state/Store';
export function Result() {
 const { state, go } = useStore();
 return <section className="page-shell result-page"><div className="result-heading"><Eyebrow>TRANSFORMAÇÃO COMPLETA</Eyebrow><h1 tabIndex={-1}>Uau! {state.pet.name} está<br/>pronto para <span className="purple">arrasar!</span></h1><p>O mesmo melhor amigo. Uma dose extra de charme.</p></div><div className="result-layout"><div className="result-portrait"><div className="celebration-star c-one">✦</div><div className="celebration-star c-two">✧</div><div className="celebration-star c-three">✦</div><div className="result-badge"><Check size={15}/> Visual aprovado pela fofura</div><Dog breed={state.pet.breed} look={state.look} name={state.pet.name}/><h2>{state.pet.name}</h2><span>{breedById(state.pet.breed).name}</span><button className="text-link" onClick={()=>go('studio')}><Pencil size={15}/> Editar visual</button></div><div className="result-summary panel"><div className="summary-eyebrow"><Sparkles size={18}/> Cada detalhe escolhido por você</div><PriceSummary products={false}/><Button className="w-full" onClick={()=>go('shop')}>Continuar para a lojinha <NextIcon/></Button><button className="text-link centered" onClick={()=>go('checkout')}>Ir direto para o checkout</button><p className="fine-print">Os valores são fictícios nesta experiência beta.</p></div></div></section>;
}

