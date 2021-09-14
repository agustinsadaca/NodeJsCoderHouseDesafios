import './App.css';
import ListOfProducts from './components/ListOfProducts/ListOfProducts';

sessionStorage.setItem('admin', true);

function App() {
  return (
    <div className="App App-header">
      <ListOfProducts className="App-header" ></ListOfProducts>

    </div>
  );
}

export default App;
