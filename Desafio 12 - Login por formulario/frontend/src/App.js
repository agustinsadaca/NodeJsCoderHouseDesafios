import './App.css';
import React, { Fragment,useState } from 'react'
import ListOfProducts from './components/ListOfProducts/ListOfProducts';
import Cart from './components/Cart/Cart'
import Modal from './components/UI/Modal'
sessionStorage.setItem('admin', true);

function App() {

  const [logged, setLogged] = useState(false);

  const [cartVisibility, setcartVisibility] = useState(false)
  const allowCartVisibility = (params) => {
    setcartVisibility(true)
  }
  const hideCart = (params) => {
    setcartVisibility(false)
  }
  
  
  return (
    <div className="App App-header">
      <button className='cart' onClick={allowCartVisibility}>Carrito</button>
      {cartVisibility ?(
        <Modal onClose={hideCart}>
        <Cart>

        </Cart>
        </Modal>
      ):Fragment}
      <ListOfProducts className="App-header" ></ListOfProducts>

    </div>
  );
}

export default App;
