import './App.css';
import Inventory from './components/Inventory';
import ViewEditMenu from './components/ViewEditMenu';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Inventory/>}/> {/*The path is the url you want the page to be linked to '/' is the home page */}
            <Route path='/ViewEditMenu' element={<ViewEditMenu/>}/>
          </Routes>
        </BrowserRouter>

      </>

    </div>
  );
}

export default App;
