import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Store } from './state/Store';
import './styles.css';
import './styles/home.css';
import './styles/pages.css';
import './styles/responsive.css';
class ErrorBoundary extends React.Component<{children:React.ReactNode},{failed:boolean}> {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){if(this.state.failed)return <main className="error-page"><h1>Vamos tentar mais uma vez?</h1><p>Ocorreu um problema ao abrir o PataPlay. Recarregue para recuperar suas escolhas salvas.</p><button className="btn btn-primary" onClick={()=>window.location.reload()}>Recarregar aplicativo</button></main>;return this.props.children;}
}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><ErrorBoundary><Store><App/></Store></ErrorBoundary></React.StrictMode>);


