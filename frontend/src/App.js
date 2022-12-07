import './global.css';
import { BrowserRouter as Routes } from 'react-router-dom';
import Router from './routes';
import { Header } from './components/Header';
import { StudentsProvider } from './context/StudentsContext';
import { TeachersProvider } from './context/TeachersContext';
function App() {
  return (
    <>
       <Header/>
   <TeachersProvider>
   <StudentsProvider>
       <Routes>
        <Router />
      </Routes>
   </StudentsProvider>
   </TeachersProvider>
    </>
  );
}

export default App;
