import { hydrate, initialState } from './state';
import type { AppState } from '../types';
export const STORAGE_KEY = 'pataplay:v1';
export interface StoragePort { getItem(key: string): string | null; setItem(key: string, value: string): void }
export function loadState(storage: StoragePort): { state: AppState; warning: string } {
 try { return { state: hydrate(storage.getItem(STORAGE_KEY)), warning: '' }; }
 catch { return { state: initialState, warning: 'Não foi possível recuperar os dados salvos. Você pode começar um novo pedido.' }; }
}
export function saveState(storage: StoragePort, state: AppState): string {
 try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); return ''; }
 catch { return 'Não foi possível salvar neste navegador. Suas escolhas serão mantidas apenas enquanto esta página estiver aberta.'; }
}

