import CardList from "../../components/cardList/CardList";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Slider from "../../components/slider/Slider";



const Home = () => {
    return (
        <div>
            <Navbar/>
            <Slider/>
            <CardList/>
            <Footer/>
        </div>
    )
}

export default Home;