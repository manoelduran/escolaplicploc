import './global.css';
import { BrowserRouter as Routes } from 'react-router-dom';
import Router from './routes';
import { Header } from './components/Header';
function App() {
  return (
    <>
    <Header/>
       <Routes>
        <Router />
      </Routes>

    </>
  );
}

export default App;
