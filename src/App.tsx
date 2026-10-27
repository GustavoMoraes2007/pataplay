import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Header, Footer } from './components/ui';
import { Home } from './pages/Home';
import { PetSelection } from './pages/PetSelection';
import { Studio } from './pages/Studio';
import { Result } from './pages/Result';
import { Shop } from './pages/Shop';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { History } from './pages/History';
import { useStore } from './state/Store';
const views = {home:Home,pet:PetSelection,studio:Studio,result:Result,shop:Shop,checkout:Checkout,success:Success,history:History};
export default function App() {
 const {state,warning}=useStore();
 const View=views[state.page];
 useEffect(()=>{
  const timer=window.setTimeout(()=>{window.scrollTo({top:0,behavior:'instant'});document.querySelector<HTMLHeadingElement>('main h1')?.focus({preventScroll:true});},200);
  return ()=>clearTimeout(timer);
 },[state.page]);
 return <><a href="#main-content" className="skip-link">Pular para o conteúdo</a><Header/>{warning&&<div className="storage-warning" role="alert"><AlertCircle size={18}/>{warning}</div>}<main id="main-content"><AnimatePresence mode="wait"><motion.div key={state.page} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.12}}><View/></motion.div></AnimatePresence></main><Footer/></>;
}

