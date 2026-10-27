import { ArrowUpRight, Check, Heart, PawPrint, Scissors, ShieldCheck, Sparkles } from 'lucide-react';
import { Dog } from '../components/pet/Dog';
import { Button, Eyebrow, NextIcon } from '../components/ui';
import { useStore } from '../state/Store';
import { breeds } from '../data/catalog';

export function Home() {
 const { go, state, dispatch } = useStore();
 return <>
 <section className="home-hero">
  <div className="hero-copy">
   <Eyebrow>UM PET SHOP. INFINITAS POSSIBILIDADES.</Eyebrow>
   <h1 tabIndex={-1}>Seu pet,<br/>seu <span>estilo<svg viewBox="0 0 270 24" aria-hidden="true"><path d="M6 14Q128-2 260 12M22 22Q143 7 245 20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg></span><i>!</i></h1>
   <p>Um banho de carinho. Um toque de personalidade.<br className="desktop-break"/> Crie o visual do seu melhor amigo e deixe o resto<br className="desktop-break"/> com a gente.</p>
   <div className="hero-actions"><Button onClick={() => go('pet')}>Começar transformação <NextIcon/></Button>{state.pet.name && <button className="text-link" onClick={() => go('studio')}>Continuar com {state.pet.name}</button>}</div>
   <div className="hero-assurance"><span><Check size={15}/> Do jeitinho do seu pet</span><span><Heart size={14}/> Cuidado em cada detalhe</span></div>
  </div>
  <div className="hero-art">
   <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
   <span className="hero-star star-one">✦</span><span className="hero-star star-two">✧</span><span className="hero-star star-three">✦</span>
   <div className="hero-note"><span><Scissors size={20}/></span><div>Um novo visual,<strong>a mesma fofura.</strong></div></div>
   <div className="hero-dog"><Dog breed="shih-tzu" look={{ cut: 'puppy', hygiene: false, accessory: 'bandana', color: '#8b5cf6', scent: 'neutral' }} name="Pipoca"/></div>
   <div className="hero-bubble"><Heart size={16} fill="currentColor"/> 100% irresistível</div>
   <div className="hero-pet-tag"><span className="live-dot"/><div><strong>Oi, eu sou a Pipoca!</strong><small>Seu próximo antes & depois começa aqui.</small></div><PawPrint size={24}/></div>
   <div className="art-caption">mais carinho. mais estilo. mais rabinhos felizes.</div>
  </div>
 </section>
 <section className="benefit-strip" aria-label="Vantagens"><div><span><Scissors size={21}/></span><p><strong>Um visual só dele</strong><small>Você escolhe cada detalhe</small></p></div><div><span><Sparkles size={21}/></span><p><strong>A mágica acontece na hora</strong><small>Veja seu pet se transformar</small></p></div><div><span><ShieldCheck size={21}/></span><p><strong>Carinho sem surpresas</strong><small>Preços claros, do início ao fim</small></p></div></section>
 <section className="how-section" id="como-funciona">
  <div className="section-heading"><div><Eyebrow>SIMPLES, LEVE E DIVERTIDO</Eyebrow><h2>Do “au” ao “uau” em 3 passos.</h2></div><p>Uma experiência que é tão gostosa<br/>quanto um carinho atrás da orelha.</p></div>
  <div className="how-grid">{[
   {n:'01',icon:PawPrint,title:'Apresente seu melhor amigo',text:'Escolha a raça e conte como se chama a estrela desse cuidado.',color:'lavender'},
   {n:'02',icon:Scissors,title:'Solte a criatividade',text:'Combine banho, tosa, acessórios e um cheirinho especial.',color:'mint'},
   {n:'03',icon:Heart,title:'Prontinho para brilhar',text:'Confira cada detalhe e finalize seu pedido de carinho.',color:'peach'}
  ].map(s=><article className={`how-card ${s.color}`} key={s.n}><div className="how-card-top"><span className="how-icon"><s.icon size={26}/></span><span className="how-number">{s.n}</span></div><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>
 </section>
 <section className="breed-teaser"><div><Eyebrow>CADA FOCINHO, UMA PERSONALIDADE</Eyebrow><h2>Qual deles é o seu amor?</h2><p>Cinco raças, muitos jeitos de encantar.</p><button className="text-link" onClick={() => go('pet')}>Encontrar meu pet <ArrowUpRight size={18}/></button></div><div className="teaser-dogs">{breeds.slice(1,4).map(b=><button key={b.id} onClick={() => { dispatch({type:'PET',pet:{breed:b.id}}); go('pet'); }} aria-label={`Escolher ${b.name}`}><Dog breed={b.id} animated={false}/><span>{b.name}</span></button>)}</div></section>
 </>;
}


