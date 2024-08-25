import CardList from './components/cardList/CardList';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Slider from './components/slider/Slider';
import Footer from './components/footer/Footer';

function App() {
  return (
   
    <div>
      
      <Navbar/>
      <Slider/>
      <CardList/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
