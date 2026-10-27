import { accessories, breedById, breeds, colors, cuts, scents } from '../data/catalog';
import { products } from '../data/products';
import { totals } from './pricing';
import type { AppState, Customer, Look, Order, Page, Pet } from '../types';

export const initialState: AppState = { version: 1, page: 'home', pet: { breed: 'shih-tzu', name: '', size: 'small' }, look: { cut: 'bath', hygiene: false, accessory: 'none', color: '#8b5cf6', scent: 'neutral' }, cart: {}, customer: { name: '', phone: '', email: '', notes: '', payment: 'pix' }, orders: [], lastOrderId: null };
export const pages: Page[] = ['home', 'pet', 'studio', 'result', 'shop', 'checkout', 'success', 'history'];
export type Action =
 | { type: 'NAV'; page: Page }
 | { type: 'PET'; pet: Partial<Pet> }
 | { type: 'LOOK'; look: Partial<Look> }
 | { type: 'CART'; id: string; delta: number }
 | { type: 'CUSTOMER'; customer: Partial<Customer> }
 | { type: 'ORDER'; order: Order }
 | { type: 'VIEW_ORDER'; id: string }
 | { type: 'RESET' };
export function safePage(page: Page, state: AppState): Page {
 if (page === 'success' && !state.orders.some(o => o.id === state.lastOrderId)) return 'home';
 if (['studio', 'result', 'shop', 'checkout'].includes(page) && !state.pet.name.trim()) return 'pet';
 return page;
}
export function reducer(state: AppState, action: Action): AppState {
 switch (action.type) {
  case 'NAV': return { ...state, page: safePage(action.page, state) };
  case 'PET': {
   const breed = breedById(action.pet.breed ?? state.pet.breed);
   const changed = breed.id !== state.pet.breed;
   const pet = { ...state.pet, ...action.pet, ...(changed ? { size: breed.size } : {}) };
   if (!breed.sizes.includes(pet.size)) pet.size = breed.size;
   return { ...state, pet, look: { ...state.look, cut: breed.cuts.includes(state.look.cut) ? state.look.cut : 'bath' } };
  }
  case 'LOOK': {
   const look = { ...state.look, ...action.look };
   if (!breedById(state.pet.breed).cuts.includes(look.cut)) look.cut = 'bath';
   return { ...state, look };
  }
  case 'CART': {
   if (!products.some(p => p.id === action.id) || !Number.isInteger(action.delta)) return state;
   const cart = { ...state.cart };
   const quantity = Math.max(0, Math.min(20, (cart[action.id] || 0) + action.delta));
   if (quantity) cart[action.id] = quantity; else delete cart[action.id];
   return { ...state, cart };
  }
  case 'CUSTOMER': return { ...state, customer: { ...state.customer, ...action.customer } };
  case 'ORDER':
   if (state.orders.some(o => o.id === action.order.id)) return state;
   return { ...state, orders: [action.order, ...state.orders].slice(0, 50), lastOrderId: action.order.id, page: 'success' };
  case 'VIEW_ORDER': return state.orders.some(o => o.id === action.id) ? { ...state, lastOrderId: action.id, page: 'success' } : state;
  case 'RESET': return { ...initialState, orders: state.orders };
 }
}
export function validateCustomer(customer: Customer): Partial<Record<keyof Customer, string>> {
 const errors: Partial<Record<keyof Customer, string>> = {};
 if (customer.name.trim().split(/\s+/).length < 2 || customer.name.trim().length < 5) errors.name = 'Informe seu nome e sobrenome.';
 const phone = customer.phone.replace(/\D/g, '');
 if (!/^\d{10,11}$/.test(phone)) errors.phone = 'Informe DDD e telefone com 10 ou 11 dígitos.';
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customer.email.trim())) errors.email = 'Informe um e-mail válido.';
 if (!['pix', 'card', 'cash'].includes(customer.payment)) errors.payment = 'Escolha uma forma de pagamento.';
 return errors;
}
export function createOrder(state: AppState, id: string = crypto.randomUUID(), createdAt = new Date().toISOString()): Order {
 if (!state.pet.name.trim()) throw new Error('Informe o nome do pet.');
 if (Object.keys(validateCustomer(state.customer)).length) throw new Error('Confira os dados do responsável.');
 const price = totals(state);
 return { id: 'PP-' + id, createdAt, pet: { ...state.pet, name: state.pet.name.trim() }, look: { ...state.look }, customer: { ...state.customer, name: state.customer.name.trim(), email: state.customer.email.trim() }, items: [...price.services, ...price.products], total: price.total };
}
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const text = (value: unknown, fallback = '', limit = 500) => typeof value === 'string' ? value.slice(0, limit) : fallback;
function readPet(value: unknown): Pet {
 const p = object(value) ? value : {};
 const breed = breeds.find(b => b.id === p.breed) ?? breeds[0];
 return { breed: breed.id, name: text(p.name, '', 40), size: breed.sizes.find(s => s === p.size) ?? breed.size };
}
function readLook(value: unknown, pet: Pet): Look {
 const l = object(value) ? value : {};
 const cut = cuts.find(c => c.id === l.cut && breedById(pet.breed).cuts.includes(c.id))?.id ?? 'bath';
 return { cut, hygiene: l.hygiene === true, accessory: accessories.find(a => a.id === l.accessory)?.id ?? 'none', color: colors.find(c => c.value === l.color)?.value ?? colors[0].value, scent: scents.find(s => s.id === l.scent)?.id ?? 'neutral' };
}
function readCustomer(value: unknown): Customer {
 const c = object(value) ? value : {};
 return { name: text(c.name, '', 100), phone: text(c.phone, '', 25), email: text(c.email, '', 150), notes: text(c.notes, '', 1000), payment: c.payment === 'card' || c.payment === 'cash' ? c.payment : 'pix' };
}
function validOrder(value: unknown): value is Order {
 if (!object(value) || typeof value.id !== 'string' || typeof value.createdAt !== 'string' || !Number.isFinite(Date.parse(value.createdAt)) || !object(value.pet) || !object(value.look) || !object(value.customer) || !Array.isArray(value.items) || !value.items.length) return false;
 if (!breeds.some(b => b.id === (value.pet as Record<string, unknown>).breed) || !text(value.pet.name).trim()) return false;
 if (!value.items.every(i => object(i) && typeof i.id === 'string' && typeof i.label === 'string' && (i.kind === 'service' || i.kind === 'product') && Number.isInteger(i.unitPrice) && Number(i.unitPrice) >= 0 && Number.isInteger(i.quantity) && Number(i.quantity) > 0 && Number(i.quantity) <= 20)) return false;
 return value.total === value.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}
export function hydrate(raw: string | null): AppState {
 if (!raw) return initialState;
 const saved: unknown = JSON.parse(raw);
 if (!object(saved) || saved.version !== 1) throw new Error('Versão de dados não reconhecida.');
 const pet = readPet(saved.pet);
 const cart: Record<string, number> = {};
 if (object(saved.cart)) for (const p of products) {
  const q = saved.cart[p.id];
  if (typeof q === 'number' && Number.isInteger(q) && q > 0) cart[p.id] = Math.min(q, 20);
 }
 const orders = Array.isArray(saved.orders) ? saved.orders.filter(validOrder).slice(0, 50).map(o => ({ ...o, pet: readPet(o.pet), look: readLook(o.look, readPet(o.pet)), customer: readCustomer(o.customer) })) : [];
 const state: AppState = { version: 1, pet, look: readLook(saved.look, pet), cart, customer: readCustomer(saved.customer), orders, page: pages.find(p => p === saved.page) ?? 'home', lastOrderId: typeof saved.lastOrderId === 'string' ? saved.lastOrderId : null };
 state.page = safePage(state.page, state);
 return state;
}


