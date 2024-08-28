import './Slider.css';
import sezon1 from '../../img/Cukur_SEZON1.jpg';
import sezon2 from '../../img/Çukur_2._sezon.jpg';
import sezon3 from '../../img/Çukur.jpg';
import sezon4 from '../../img/sezon4.webp';

const Slider = () => {
    return (
        <div id="demo" className="carousel slide custom-carousel" data-bs-ride="carousel">
            {/* Indicators/dots */}
            <div className="carousel-indicators custom-indicators">
                <button
                    type="button"
                    data-bs-target="#demo"
                    data-bs-slide-to={0}
                    className="active"
                />
                <button type="button" data-bs-target="#demo" data-bs-slide-to={1} />
                <button type="button" data-bs-target="#demo" data-bs-slide-to={2} />
                <button type="button" data-bs-target="#demo" data-bs-slide-to={3} />
            </div>

            {/* The slideshow/carousel */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="image-container">
                        <img
                            src={sezon1}
                            alt="Sezon_4"
                            className="d-block custom-image"
                        />
                        <div className="text-overlay">SEZON 1</div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="image-container">
                        <img
                            src={sezon2}
                            alt="Sezon_2"
                            className="d-block custom-image"
                        />
                        <div className="text-overlay">SEZON 2</div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="image-container">
                        <img
                            src={sezon3}
                            alt="Sezon_3"
                            className="d-block custom-image"
                        />
                        <div className="text-overlay">SEZON 3</div>
                    </div>
                </div>
                <div className="carousel-item">

                    <div className="image-container">
                        <img
                            src={sezon4}
                            alt="Sezon_4"
                            className="d-block custom-image"
                        />
                        <div className="text-overlay">SEZON 4</div>
                    </div>

                </div>
            </div>

            {/* Left and right controls/icons */}
            <button
                className="carousel-control-prev custom-control"
                type="button"
                data-bs-target="#demo"
                data-bs-slide="prev"
            >
                <span className="custom-control-icon">&lsaquo;</span>
            </button>
            <button
                className="carousel-control-next custom-control"
                type="button"
                data-bs-target="#demo"
                data-bs-slide="next"
            >
                <span className="custom-control-icon">&rsaquo;</span>
            </button>
        </div>
    );
};

export default Slider;
