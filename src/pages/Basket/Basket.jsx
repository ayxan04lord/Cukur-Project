import Footer from "../../components/footer/Footer";
import BasketItems from "../../components/items/basket_items/BasketItems";
import Navbar from "../../components/navbar/Navbar";

const Baskets = () => {
    return (
        <div>
            <Navbar />
            <main className="basket">
                <h1>BASKET</h1>
                <BasketItems/>
            </main>
            <Footer />
        </div>
    )
}

export default Baskets;