import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { breeds } from '../data/catalog';
import { Dog, naturalLook } from '../components/pet/Dog';
import { money, totals } from './pricing';
import { createOrder, hydrate, initialState, reducer, validateCustomer } from './state';
import { loadState, saveState, STORAGE_KEY } from './storage';
import type { StoragePort } from './storage';

function thor() {
 let s = reducer(initialState, {type:'PET',pet:{name:'Thor'}});
 s = reducer(s,{type:'LOOK',look:{cut:'puppy',accessory:'bandana',scent:'lavender'}});
 return s;
}
const customer={name:'Pessoa de Teste',phone:'11999999999',email:'teste@example.com',notes:'Pedido fictício',payment:'pix' as const};
describe('preços em centavos',()=>{
 it('calcula o cenário Thor sem divergências entre serviço e carrinho',()=>{
  const s=reducer(thor(),{type:'CART',id:'ball',delta:1});
  const result=totals(s);
  expect(result.serviceTotal).toBe(12200);
  expect(result.productTotal).toBe(2490);
  expect(result.total).toBe(14690);
  expect(money(result.total)).toMatch(/146,90/);
 });
 it('acumula higiene, substitui acabamento e mantém uma única essência',()=>{
  let s=reducer(thor(),{type:'LOOK',look:{hygiene:true,cut:'scissors',scent:'baby'}});
  expect(totals(s).serviceTotal).toBe(16000);
  s=reducer(s,{type:'LOOK',look:{scent:'neutral',accessory:'none'}});
  expect(totals(s).serviceTotal).toBe(14000);
  expect(totals(s).services.filter(i=>i.id==='scent')).toHaveLength(1);
 });
 it('ajusta banho e acabamento pelo porte sem multiplicar os acessórios',()=>{
  let s=reducer(thor(),{type:'PET',pet:{breed:'poodle'}});
  s=reducer(s,{type:'PET',pet:{size:'large'}});
  expect(totals(s).serviceTotal).toBe(18450);
 });
});
describe('personalização',()=>{
 it('troca raça e remove cortes incompatíveis',()=>{
  const s=reducer(thor(),{type:'PET',pet:{breed:'golden'}});
  expect(s.pet.size).toBe('large');
  expect(s.look.cut).toBe('bath');
  expect(reducer(s,{type:'LOOK',look:{cut:'puppy'}}).look.cut).toBe('bath');
  expect(s.look.accessory).toBe('bandana');
 });
 it('preserva escolhas e nome ao navegar para trás',()=>{
  const s=reducer(reducer(thor(),{type:'NAV',page:'result'}),{type:'NAV',page:'pet'});
  expect(s.look).toEqual(thor().look);
  expect(s.pet.name).toBe('Thor');
 });
 it('impede avançar sem nome',()=>{
  expect(reducer(initialState,{type:'NAV',page:'checkout'}).page).toBe('pet');
 });
 it.each(breeds)('oferece variações vetoriais distintas para $name',breed=>{
  const before=renderToStaticMarkup(createElement(Dog,{breed:breed.id,look:naturalLook}));
  const after=renderToStaticMarkup(createElement(Dog,{breed:breed.id,look:{...naturalLook,cut:breed.cuts[1]}}));
  const paths=(svg:string)=>[...svg.matchAll(/ d="([^"]*)"/g)].map(m=>m[1]);
  expect(paths(before)).not.toEqual(paths(after));
 });
 it('altera SVG do acessório e a cor e mostra partículas da essência',()=>{
  const html=renderToStaticMarkup(createElement(Dog,{breed:'shih-tzu',look:{...thor().look,color:'#ec7899'}}));
  expect(html).toContain('data-accessory="bandana"');
  expect(html).toContain('fill="#ec7899"');
  expect(html).toContain('data-scent="lavender"');
 });
});
describe('carrinho e persistência',()=>{
 it('incrementa por ID sem duplicar e remove a última unidade',()=>{
  let s=reducer(initialState,{type:'CART',id:'ball',delta:1});
  s=reducer(s,{type:'CART',id:'ball',delta:1});
  expect(s.cart).toEqual({ball:2});
  expect(totals(s).products).toHaveLength(1);
  s=reducer(s,{type:'CART',id:'ball',delta:-2});
  expect(s.cart).toEqual({});
 });
 it('ignora produtos inexistentes e limita quantidades',()=>{
  expect(reducer(initialState,{type:'CART',id:'invalid',delta:1})).toBe(initialState);
  expect(reducer(initialState,{type:'CART',id:'ball',delta:99}).cart.ball).toBe(20);
  expect(reducer(initialState,{type:'CART',id:'ball',delta:-1}).cart).toEqual({});
 });
 it('restaura estado completo após serialização',()=>{
  const s=reducer(thor(),{type:'CART',id:'ball',delta:2});
  const map=new Map<string,string>();
  const storage:StoragePort={getItem:k=>map.get(k)??null,setItem:(k,v)=>{map.set(k,v);}};
  expect(saveState(storage,s)).toBe('');
  expect(map.has(STORAGE_KEY)).toBe(true);
  expect(loadState(storage).state).toEqual(s);
 });
 it('recupera com aviso quando JSON é corrompido',()=>{
  const storage:StoragePort={getItem:()=>'{invalid',setItem:()=>{}};
  expect(loadState(storage).state).toEqual(initialState);
  expect(loadState(storage).warning).not.toBe('');
 });
 it('trata bloqueio e quota de armazenamento sem derrubar o app',()=>{
  const storage:StoragePort={getItem:()=>{throw new Error('denied');},setItem:()=>{throw new Error('quota');}};
  expect(loadState(storage).warning).not.toBe('');
  expect(saveState(storage,thor())).not.toBe('');
 });
 it('normaliza dados antigos ou inválidos',()=>{
  const s=hydrate(JSON.stringify({...initialState,pet:{breed:'golden',size:'small',name:'Thor'},look:{cut:'puppy',accessory:'wrong',color:'wrong',scent:'wrong'},cart:{ball:-2,unknown:10,collar:999}}));
  expect(s.pet.size).toBe('large');
  expect(s.look).toEqual(naturalLook);
  expect(s.cart).toEqual({collar:20});
 });
});
describe('checkout fictício',()=>{
 it('valida nome, telefone e e-mail',()=>{
  expect(Object.keys(validateCustomer(initialState.customer))).toHaveLength(3);
  expect(validateCustomer(customer)).toEqual({});
  expect(()=>createOrder(thor())).toThrow();
 });
 it('cria snapshot, persiste histórico e preserva confirmação ao recarregar',()=>{
  let s=reducer(thor(),{type:'CUSTOMER',customer});
  s=reducer(s,{type:'CART',id:'ball',delta:1});
  const order=createOrder(s,'fixed-id','2026-10-26T12:00:00.000Z');
  expect(order.total).toBe(14690);
  s=reducer(s,{type:'ORDER',order});
  expect(s.page).toBe('success');
  expect(hydrate(JSON.stringify(s)).orders[0]).toEqual(order);
  expect(hydrate(JSON.stringify(s)).page).toBe('success');
  s=reducer(s,{type:'LOOK',look:{accessory:'none'}});
  expect(s.orders[0].look.accessory).toBe('bandana');
  expect(s.orders[0].total).toBe(14690);
  expect(reducer(s,{type:'ORDER',order}).orders).toHaveLength(1);
  const reset=reducer(s,{type:'RESET'});
  expect(reset.orders).toHaveLength(1);
  expect(reset.pet.name).toBe('');
  expect(reset.cart).toEqual({});
 });
 it('gera identificadores únicos',()=>{
  const s=reducer(thor(),{type:'CUSTOMER',customer});
  expect(createOrder(s).id).not.toBe(createOrder(s).id);
 });
});

