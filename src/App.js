import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Inventory from './components/Inventory';
import ViewEditMenu from './components/ViewEditMenu';
import ManagerSide from './components/ManagerSide';
import RestockReport from './components/RestockReport';
import ServerSide from './components/ServerSide';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path = '/ManagerSide' element ={<ManagerSide/>}/>
            <Route path='/Inventory' element={<Inventory/>}/>
            <Route path='/ViewEditMenu' element={<ViewEditMenu/>}/>
            <Route path='/ServerSide' element={<ServerSide/>}/>
          </Routes>
        </BrowserRouter>
      </>

    </div>
  );
}

export default App;
