import { Check, Heart } from 'lucide-react';
import { breeds, breedById, sizes } from '../data/catalog';
import { Dog } from '../components/pet/Dog';
import { Back, Button, NextIcon, PageTitle } from '../components/ui';
import { useStore } from '../state/Store';
import type { FormEvent } from 'react';
export function PetSelection() {
 const { state, dispatch, go } = useStore();
 const breed = breedById(state.pet.breed);
 const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (state.pet.name.trim()) { dispatch({type:'PET',pet:{name:state.pet.name.trim()}}); go('studio'); } };
 return <section className="page-shell pet-page"><Back page="home"/><PageTitle eyebrow="PASSO 01 · VAMOS NOS CONHECER" title="Quem vai ganhar um dia de carinho?" description="Escolha a raça do seu melhor amigo. A gente cuida de cada particularidade."/>
  <div className="breed-grid" role="group" aria-label="Escolha a raça">{breeds.map(b=><button key={b.id} className={`breed-card ${state.pet.breed === b.id ? 'selected' : ''}`} aria-pressed={state.pet.breed === b.id} onClick={() => dispatch({type:'PET',pet:{breed:b.id}})}>
   <span className="selection-check">{state.pet.breed === b.id && <Check size={15}/>}</span><div className="breed-portrait" style={{background:b.color}}><Dog breed={b.id} animated={false}/></div><h3>{b.name}</h3><p>{b.detail}</p>
  </button>)}</div>
  <form onSubmit={submit} className="pet-form panel"><div className="pet-form-heading"><span className="round-icon"><Heart size={23}/></span><div><h2>Como se chama seu melhor amigo?</h2><p>O protagonista dessa história merece ser chamado pelo nome.</p></div></div><div className="pet-form-fields"><label className="field">Nome do pet<input autoComplete="off" name="petName" placeholder="Ex.: Thor, Mel, Pipoca..." maxLength={40} required pattern=".*\S.*" value={state.pet.name} onChange={e => dispatch({type:'PET',pet:{name:e.target.value}})}/></label><label className="field">Porte<select aria-label="Porte" value={state.pet.size} onChange={e=>dispatch({type:'PET',pet:{size:e.target.value as typeof state.pet.size}})}>{breed.sizes.map(size=><option key={size} value={size}>{sizes[size].label}</option>)}</select></label><Button type="submit" disabled={!state.pet.name.trim()}>Entrar no estúdio <NextIcon/></Button></div><small>Os valores do banho e do acabamento variam conforme o porte.</small></form>
 </section>;
}

