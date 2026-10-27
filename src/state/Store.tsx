import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import type { Dispatch, ReactNode } from 'react';
import type { AppState, Page } from '../types';
import { initialState, pages, reducer, safePage } from '../lib/state';
import type { Action } from '../lib/state';
import { loadState, saveState } from '../lib/storage';
import { MotionConfig } from 'framer-motion';

const Context = createContext<{ state: AppState; dispatch: Dispatch<Action>; go: (page: Page) => void; warning: string } | null>(null);
function bootstrap() {
 try { return loadState(window.localStorage); } catch { return { state: initialState, warning: 'O armazenamento local está indisponível neste navegador.' }; }
}
export function Store({ children }: { children: ReactNode }) {
 const [boot] = useState(bootstrap);
 const [state, dispatch] = useReducer(reducer, boot.state);
 const [warning, setWarning] = useState(boot.warning);
 const go = (page: Page) => dispatch({ type: 'NAV', page });
 useEffect(() => {
  try { const error = saveState(window.localStorage, state); if (error) setWarning(error); } catch { setWarning('Não foi possível salvar neste navegador.'); }
  const hash = '#' + state.page;
  if (window.location.hash !== hash) window.history.pushState({}, '', hash);
 }, [state]);
 useEffect(() => {
  const navigate = () => {
   const page = pages.find(p => '#' + p === window.location.hash) ?? 'home';
   dispatch({ type: 'NAV', page });
  };
  const initialPage = pages.find(p => '#' + p === window.location.hash);
  if (initialPage) dispatch({ type: 'NAV', page: safePage(initialPage, boot.state) });
  window.addEventListener('popstate', navigate);
  return () => window.removeEventListener('popstate', navigate);
 }, [boot.state]);
 return <Context.Provider value={{ state, dispatch, go, warning }}><MotionConfig reducedMotion="user">{children}</MotionConfig></Context.Provider>;
}
export function useStore() { const ctx = useContext(Context); if (!ctx) throw new Error('Store ausente.'); return ctx; }

