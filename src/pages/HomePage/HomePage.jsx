import CardList from "../../components/cardList/CardList";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Slider from "../../components/slider/Slider";



const HomePage = () => {
    return (
        <div>
            <div className="myContainer">
                <Navbar />
                <Slider />
                <CardList />

            </div>
            <Footer />
        </div>
    )
}

export default HomePage;