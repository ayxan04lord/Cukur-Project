import './Slider.css';

// import sezon1 from '../../../public/img/Cukur_SEZON1.jpg';


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
                        <a href="https://youtube.com/playlist?list=PLAKgawc7H3oYIRuQcxomjlUOPCvZjg7YI&si=zhgxyCk5Zwo7M1CM" target="_blank" rel="noopener noreferrer">
                        <img
                            src={'./img/Cukur_SEZON1.jpg'}
                            alt="Sezon_4"
                            className="d-block custom-image"
                        />
                        </a>
                        
                        <div className="text-overlay">SEZON 1</div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="image-container">
                        <a href="https://youtube.com/playlist?list=PL7h02KuJlP_H4M2cekyoJANr5mMqlCN3T&si=7QVuw74Oa05P7iTT" target="_blank" rel="noopener noreferrer">
                        <img
                            src={'./img/Çukur_2._sezon.jpg'}
                            alt="Sezon_2"
                            className="d-block custom-image"
                        />
                        </a>
                        
                        <div className="text-overlay">SEZON 2</div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="image-container">
                        <a href="https://youtube.com/playlist?list=PLN7aJACZDHx47GizuD1dZmG0_XJpktEic&si=wgJGWzQ8dcADB3GV" target="_blank" rel="noopener noreferrer">
                        <img
                            src={"./img/sezon_3.jpg"}
                            alt="Sezon_3"
                            className="d-block custom-image"
                        />
                        </a>
                        
                        <div className="text-overlay">SEZON 3</div>
                    </div>
                </div>
                <div className="carousel-item">

                    <div className="image-container">
                        <a href="https://youtube.com/playlist?list=PLN7aJACZDHx7O-3c2g1YQn1YTJfQrbKNI&si=wEAN9v4CRtjQUbBV" target="_blank" rel="noopener noreferrer">
                        <img
                            src={"./img/sezon4.webp"}
                            alt="Sezon_4"
                            className="d-block custom-image"
                        />
                        </a>
                        
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
