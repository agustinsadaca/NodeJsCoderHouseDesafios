import './App.css';
import React, { Fragment,useState } from 'react'
import ListOfProducts from './components/ListOfProducts/ListOfProducts';
import Cart from './components/Cart/Cart'
import Modal from './components/UI/Modal'
import Login from './components/Login/Login'

sessionStorage.setItem('admin', true);

function App() {
  const [cartVisibility, setcartVisibility] = useState(false)
  const [logged, setLogged] = useState(false)
  const allowCartVisibility = (params) => {
    setcartVisibility(true)
  }
  const hideCart = (params) => {
    setcartVisibility(false)
  }
  const cartVisible = () => {
    if(cartVisibility){
      return (<Modal onClose={hideCart}><Cart/></Modal>)
    }else{
      return Fragment
    }
  }
  const Islogged = () => {
    if (logged) {
      return (<div><button className='cart' onClick={allowCartVisibility}>Carrito</button>
      {cartVisible}
      <ListOfProducts className="App-header"/></div>)
    }else{
      return <Login/>
    }
  }

  return (
    <div className="App App-header">
       {Islogged()}
    </div>
  )
}

export default App;
