import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Inventory from './components/Inventory';
import ViewEditMenu from './components/ViewEditMenu';
import ManagerSide from './components/ManagerSide';
import ServerSide from './components/ServerSide';
import Login from './components/Login';
import RestockReport from './components/RestockReport';
import ExcessReport from './components/ExcessReport';
import PairSales from './components/PairSales';
import SalesReport from './components/SalesReport';
import CustomerSide from './components/CustomerSide';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<CustomerSide/>}/>
            <Route path = '/ManagerSide' element ={<ManagerSide/>}/>
            <Route path='/Inventory' element={<Inventory/>}/>
            <Route path='/ViewEditMenu' element={<ViewEditMenu/>}/>
            <Route path='/ServerSide' element={<ServerSide/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/RestockReport' element={<RestockReport/>}/>
            <Route path='/ExcessReport' element={<ExcessReport/>}/>
            <Route path='/PairSales' element={<PairSales/>}/>
            <Route path='/SalesReport' element={<SalesReport/>}/>
            <Route path='/CustomerSide' element = {<CustomerSide/>}/>
          </Routes>
        </BrowserRouter>
      </>

    </div>
  );
}

export default App;
