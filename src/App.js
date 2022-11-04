import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Inventory from './components/Inventory';
import ViewEditMenu from './components/ViewEditMenu';
import ManagerSide from './components/ManagerSide';
import RestockReport from './components/RestockReport';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ManagerSide/>}/>
            <Route path='/Inventory' element={<Inventory/>}/>
            <Route path='/ViewEditMenu' element={<ViewEditMenu/>}/>
            <Route path='/RestockReport' element={<RestockReport/>}/>
          </Routes>
        </BrowserRouter>
      </>

    </div>
  );
}

export default App;
