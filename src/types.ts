export type BreedId = 'shih-tzu' | 'poodle' | 'golden' | 'yorkshire' | 'spitz';
export type Size = 'small' | 'medium' | 'large';
export type Cut = 'bath' | 'puppy' | 'scissors' | 'tidy';
export type Accessory = 'none' | 'bow' | 'bowtie' | 'bandana' | 'double-bow';
export type Scent = 'neutral' | 'baby' | 'lavender' | 'vanilla' | 'floral';
export type Page = 'home' | 'pet' | 'studio' | 'result' | 'shop' | 'checkout' | 'success' | 'history';
export interface Pet { breed: BreedId; name: string; size: Size }
export interface Look { cut: Cut; hygiene: boolean; accessory: Accessory; color: string; scent: Scent }
export interface Customer { name: string; phone: string; email: string; notes: string; payment: 'pix' | 'card' | 'cash' }
export interface Product { id: string; name: string; description: string; price: number; category: 'Passeio' | 'Brinquedos' | 'Cuidados' | 'Petiscos'; color: string }
export interface LineItem { id: string; label: string; quantity: number; unitPrice: number; kind: 'service' | 'product' }
export interface Order { id: string; createdAt: string; pet: Pet; look: Look; customer: Customer; items: LineItem[]; total: number }
export interface AppState { version: 1; page: Page; pet: Pet; look: Look; cart: Record<string, number>; customer: Customer; orders: Order[]; lastOrderId: string | null }

