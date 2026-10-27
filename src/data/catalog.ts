import type { Accessory, BreedId, Cut, Scent, Size } from '../types';
export const breeds: { id: BreedId; name: string; detail: string; size: Size; sizes: Size[]; cuts: Cut[]; color: string }[] = [
  { id: 'shih-tzu', name: 'Shih Tzu', detail: 'Pequeno no tamanho, gigante no charme.', size: 'small', sizes: ['small'], cuts: ['bath', 'puppy', 'scissors'], color: '#f6dfcb' },
  { id: 'poodle', name: 'Poodle', detail: 'Cachinhos cheios de personalidade.', size: 'small', sizes: ['small', 'medium', 'large'], cuts: ['bath', 'puppy', 'scissors'], color: '#efd9ca' },
  { id: 'golden', name: 'Golden Retriever', detail: 'Um coração enorme e muito pelo.', size: 'large', sizes: ['large'], cuts: ['bath', 'tidy'], color: '#ffe5a5' },
  { id: 'yorkshire', name: 'Yorkshire Terrier', detail: 'Elegância em uma versão pequenina.', size: 'small', sizes: ['small'], cuts: ['bath', 'puppy', 'scissors'], color: '#dde5ec' },
  { id: 'spitz', name: 'Spitz Alemão', detail: 'Uma nuvenzinha de alegria.', size: 'small', sizes: ['small', 'medium'], cuts: ['bath', 'tidy'], color: '#f7e8d2' },
];
export const cuts: { id: Cut; name: string; description: string; price: number; badge?: string }[] = [
  { id: 'bath', name: 'Banho e escovação', description: 'Limpeza delicada, secagem e pelos bem soltinhos.', price: 0 },
  { id: 'puppy', name: 'Tosa bebê', description: 'Pelagem mais curtinha e um rostinho arredondado.', price: 4500, badge: 'Queridinha' },
  { id: 'scissors', name: 'Tosa na tesoura', description: 'Contorno alinhado, leveza e acabamento caprichado.', price: 6000 },
  { id: 'tidy', name: 'Acabamento natural', description: 'Escovação e alinhamento leve das pontas, sem raspar.', price: 3000 },
];
export const accessories: { id: Accessory; name: string; price: number; description: string }[] = [
  { id: 'none', name: 'Sem acessório', price: 0, description: 'Charme natural.' },
  { id: 'bow', name: 'Laço', price: 800, description: 'Um toque de fofura.' },
  { id: 'bowtie', name: 'Gravata borboleta', price: 1200, description: 'Pronto para qualquer ocasião.' },
  { id: 'bandana', name: 'Bandana', price: 1500, description: 'Para os cheios de atitude.' },
  { id: 'double-bow', name: 'Lacinho duplo', price: 1200, description: 'Fofura em dose dupla.' },
];
export const colors = [{ value: '#8b5cf6', name: 'Lilás' }, { value: '#ec7899', name: 'Rosa' }, { value: '#52b9a2', name: 'Menta' }, { value: '#efb640', name: 'Amarelo' }, { value: '#5699df', name: 'Azul' }];
export const scents: { id: Scent; name: string; description: string; price: number; color: string }[] = [
  { id: 'neutral', name: 'Neutro, sem perfume', description: 'Só o frescor de um banho bem gostoso.', price: 0, color: '#b9cac3' },
  { id: 'baby', name: 'Cheirinho de bebê', description: 'Suave como um carinho.', price: 500, color: '#8fbfdc' },
  { id: 'lavender', name: 'Lavanda', description: 'Um toque floral delicado.', price: 700, color: '#a783d9' },
  { id: 'vanilla', name: 'Baunilha', description: 'Doce, leve e aconchegante.', price: 700, color: '#d9ac5e' },
  { id: 'floral', name: 'Floral', description: 'Um jardim de cheiros suaves.', price: 600, color: '#e58caa' },
];
export const sizes: Record<Size, { label: string; base: number; multiplier: number }> = {
  small: { label: 'Pequeno', base: 5500, multiplier: 1 },
  medium: { label: 'Médio', base: 7000, multiplier: 1.2 },
  large: { label: 'Grande', base: 9500, multiplier: 1.5 },
};
export const breedById = (id: BreedId) => breeds.find(b => b.id === id)!;

