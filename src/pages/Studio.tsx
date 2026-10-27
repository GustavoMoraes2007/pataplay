import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CircleHelp, Droplets, Eye, Heart, Scissors, Sparkles } from 'lucide-react';
import { accessories, breedById, colors, cuts, scents, sizes } from '../data/catalog';
import { Dog, naturalLook } from '../components/pet/Dog';
import { Back, Button, NextIcon } from '../components/ui';
import { finishPrice, money, totals } from '../lib/pricing';
import { useStore } from '../state/Store';
import { AccessoryLayer } from '../components/pet/AccessoryLayer';

const tabs = [{title:'Banho e tosa',icon:Scissors},{title:'Acessórios',icon:Heart},{title:'Essências',icon:Sparkles}];
export function Studio() {
 const { state, dispatch, go } = useStore();
 const [tab, setTab] = useState(0);
 const [before, setBefore] = useState(false);
 const breed = breedById(state.pet.breed);
 const price = totals(state);
 const scent = scents.find(s=>s.id === state.look.scent)!;
 const update = (look: Parameters<typeof dispatch>[0] & {type:'LOOK'}) => { setBefore(false); dispatch(look); };
 return <section className="page-shell studio-page"><Back page="pet">Trocar ou editar pet</Back>
  <div className="studio-heading"><div><div className="eyebrow"><Sparkles size={14}/> O ESTÚDIO DE TRANSFORMAÇÃO</div><h1 tabIndex={-1}>Hoje é dia de brilhar, {state.pet.name}<span className="purple">!</span></h1><p>Um pouquinho de estilo. Um montão de carinho.</p></div><span className="soft-badge"><span className="live-dot"/> Prévia em tempo real</span></div>
  <div className="studio-layout">
   <div className="studio-preview"><div className="preview-stage"><div className="stage-top"><span>{breed.name} <i>·</i> {sizes[state.pet.size].label}</span><button className={`before-button ${before ? 'active' : ''}`} aria-pressed={before} onClick={()=>setBefore(!before)}><Eye size={16}/>{before ? 'Ver depois' : 'Antes e depois'}</button></div><div className="stage-ring"/><div className="stage-sparkle sparkle-left">✦</div><div className="stage-sparkle sparkle-right">✧</div><motion.div className="studio-dog" key={state.look.accessory + state.look.cut} initial={{scale:.97}} animate={{scale:1}} transition={{type:'spring',stiffness:230,damping:17}}><Dog breed={state.pet.breed} look={before ? naturalLook : state.look} name={state.pet.name}/></motion.div><div className="pet-name-pill"><PawHeart/> {state.pet.name}</div><div className="preview-caption">{before ? 'Antes · pelagem natural, sem adicionais' : 'Depois · um visual com a sua assinatura'}</div></div>
    <div className="preview-note"><span><Sparkles size={19}/></span><p>{before ? 'Um amor em todas as versões.' : state.look.scent !== 'neutral' ? `Toque final: ${scent.name.toLowerCase()}.` : 'Cada escolha deixa esse momento ainda mais especial.'}<small>Ilustração aproximada. O acabamento real é avaliado pelo profissional.</small></p></div>
   </div>
   <div className="studio-controls"><div className="customization-tabs" role="tablist" aria-label="Categorias de personalização">{tabs.map((t,i)=><button key={t.title} role="tab" id={'tab-'+i} aria-selected={tab===i} aria-controls="customization-panel" onClick={()=>setTab(i)} className={tab===i?'active':''}><t.icon size={18}/><span>{t.title}</span>{i<tab && <Check size={12}/>}</button>)}</div>
    <div className="customization-content" id="customization-panel" role="tabpanel" aria-labelledby={'tab-'+tab}>
    <AnimatePresence mode="wait"><motion.div key={tab} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.16}}>
     <div className="control-heading"><div><h2>{['Cuidado da cabeça às patinhas.','O charme está nos detalhes.','Um cheirinho de felicidade.'][tab]}</h2><p>{['Escolha um acabamento. O banho já está incluído.','Escolha um acessório para finalizar o serviço.','Escolha só uma essência, ou prefira sem perfume.'][tab]}</p></div><span className="step-fraction">0{tab+1}<i>/03</i></span></div>
     {tab===0 && <><div className="included-bath"><Droplets size={17}/><span>Banho base · porte {sizes[state.pet.size].label.toLowerCase()}</span><strong>{money(sizes[state.pet.size].base)}</strong></div><div className="option-stack">{cuts.filter(c=>breed.cuts.includes(c.id)).map(c=><button key={c.id} className={`choice-card ${state.look.cut===c.id?'selected':''}`} aria-pressed={state.look.cut===c.id} onClick={()=>update({type:'LOOK',look:{cut:c.id}})}><span className="choice-icon"><Scissors size={21}/></span><span className="choice-copy"><strong>{c.name}{c.badge && <em>{c.badge}</em>}</strong><small>{c.description}</small></span><span className="choice-price">{c.price ? '+ '+money(finishPrice(state.pet,c.price)):'Incluído'}</span><span className="radio-circle">{state.look.cut===c.id&&<Check size={12}/>}</span></button>)}</div><label className="hygiene-option"><input type="checkbox" checked={state.look.hygiene} onChange={e=>update({type:'LOOK',look:{hygiene:e.target.checked}})}/><span><strong>Adicionar tosa higiênica</strong><small>Cuidado extra nas áreas de higiene.</small></span><b>+ {money(finishPrice(state.pet,2500))}</b></label>{(state.pet.breed==='golden'||state.pet.breed==='spitz')&&<p className="info-note"><CircleHelp size={16}/>Para esta pelagem dupla, oferecemos banho e alinhamento leve, preservando o volume natural. Sem tosa bebê ou raspagem.</p>}</>}
     {tab===1 && <><div className="accessory-grid">{accessories.map(a=><button key={a.id} className={`accessory-option ${state.look.accessory===a.id?'selected':''}`} aria-pressed={state.look.accessory===a.id} onClick={()=>update({type:'LOOK',look:{accessory:a.id}})}><span className="mini-accessory">{a.id==='none'?<Heart size={27}/>:<svg viewBox={a.id==='bow'?'210 80 95 95':a.id==='double-bow'?'100 95 200 65':'130 235 160 90'} aria-hidden="true"><AccessoryLayer accessory={a.id} color={state.look.color}/></svg>}</span><strong>{a.name}</strong><small>{a.price?'+ '+money(a.price):'Sem adicional'}</small>{state.look.accessory===a.id&&<Check className="accessory-check" size={14}/>}</button>)}</div>{state.look.accessory!=='none' && <fieldset className="color-picker"><legend>Qual cor combina com {state.pet.name}?</legend>{colors.map(c=><button key={c.value} type="button" aria-label={c.name} aria-pressed={state.look.color===c.value} style={{background:c.value}} onClick={()=>update({type:'LOOK',look:{color:c.value}})}>{state.look.color===c.value&&<Check size={18}/>}</button>)}</fieldset>}<p className="info-note"><CircleHelp size={16}/>Este acessório faz parte do serviço. Os produtos da lojinha são itens separados, adicionados só se você quiser.</p></>}
     {tab===2 && <div className="option-stack">{scents.map(s=><button key={s.id} className={`choice-card ${state.look.scent===s.id?'selected':''}`} aria-pressed={state.look.scent===s.id} onClick={()=>update({type:'LOOK',look:{scent:s.id}})}><span className="choice-icon scent-icon" style={{color:s.color}}><Sparkles size={22}/></span><span className="choice-copy"><strong>{s.name}</strong><small>{s.description}</small></span><span className="choice-price">{s.price?'+ '+money(s.price):'Grátis'}</span><span className="radio-circle">{state.look.scent===s.id&&<Check size={12}/>}</span></button>)}</div>}
    </motion.div></AnimatePresence>
    </div>
    <div className="studio-bottom"><div className="studio-progress"><span>{['Vamos começar pelo cuidado.','Que charme! Agora escolha a cor.','Tudo pronto para o grande momento.'][tab]}</span><b>{tab+1} de 3</b><div><i style={{width:(tab+1)/3*100+'%'}}/></div></div><div className="studio-price-row"><div><small>Total dos cuidados</small><strong aria-live="polite" data-testid="studio-total">{money(price.serviceTotal)}</strong></div><Button onClick={()=>tab<2?setTab(tab+1):go('result')}>{tab<2?'Próximo detalhe':'Ver transformação'}<NextIcon/></Button></div></div>
   </div>
  </div>
 </section>;
}
function PawHeart() { return <Heart size={15} fill="currentColor"/>; }

