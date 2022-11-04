import './App.css';
import Inventory from './components/Inventory';
import ViewEditMenu from './components/ViewEditMenu';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ManagerSide from './components/ManagerSide';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ManagerSide/>}/>
            <Route path='/Inventory' element={<Inventory/>}/>
            <Route path='/ViewEditMenu' element={<ViewEditMenu/>}/>
          </Routes>
        </BrowserRouter>
      </>

    </div>
  );
}

export default App;
