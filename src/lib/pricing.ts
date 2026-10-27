import { accessories, cuts, scents, sizes } from '../data/catalog';
import { products } from '../data/products';
import type { AppState, LineItem, Look, Pet } from '../types';
export const money = (cents: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
export const finishPrice = (pet: Pet, price: number) => Math.round(price * sizes[pet.size].multiplier);
export function serviceItems(pet: Pet, look: Look): LineItem[] {
 const cut = cuts.find(c => c.id === look.cut)!;
 const accessory = accessories.find(a => a.id === look.accessory)!;
 const scent = scents.find(s => s.id === look.scent)!;
 const line = (id: string, label: string, unitPrice: number): LineItem => ({ id, label, unitPrice, quantity: 1, kind: 'service' });
 return [
  line('bath', 'Banho e escovação · ' + sizes[pet.size].label.toLowerCase(), sizes[pet.size].base),
  ...(cut.price ? [line(cut.id, cut.name, finishPrice(pet, cut.price))] : []),
  ...(look.hygiene ? [line('hygiene-service', 'Tosa higiênica', finishPrice(pet, 2500))] : []),
  ...(accessory.id !== 'none' ? [line('accessory', accessory.name + ' · acessório do serviço', accessory.price)] : []),
  line('scent', scent.name, scent.price),
 ];
}
export function productItems(cart: Record<string, number>): LineItem[] {
 return products.filter(p => cart[p.id] > 0).map(p => ({ id: p.id, label: p.name, unitPrice: p.price, quantity: cart[p.id], kind: 'product' }));
}
export const sumItems = (items: LineItem[]) => items.reduce((total, i) => total + i.unitPrice * i.quantity, 0);
export function totals(state: Pick<AppState, 'pet' | 'look' | 'cart'>) {
 const services = serviceItems(state.pet, state.look);
 const items = productItems(state.cart);
 return { services, products: items, serviceTotal: sumItems(services), productTotal: sumItems(items), total: sumItems([...services, ...items]), quantity: items.reduce((n, i) => n + i.quantity, 0) };
}

