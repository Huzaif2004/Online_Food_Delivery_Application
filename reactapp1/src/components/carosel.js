import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Carosel = () => {
  return (
    <div id="carouselExample" className="carousel slide" style={{ margin: "30px" }} data-bs-ride="carousel" data-bs-interval="5000">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row">
            <div className="col" style={{ padding: "8px" }}>
              <img style={{ height: "23vh", width: "400px", borderRadius: "8px" }} src="https://carousels-ads.swiggy.com/images/slider/3.jpg" className="d-block" alt="..." />
            </div>
            <div className="col" style={{ padding: "8px" }}>
              <img style={{ height: "23vh", width: "400px", borderRadius: "8px" }} src="https://carousels-ads.swiggy.com/images/slider/6.jpg" className="d-block" alt="..." />
            </div>
            <div className="col" style={{ padding: "8px" }}>
              <img style={{ height: "23vh", width: "400px", borderRadius: "8px" }} src="https://carousels-ads.swiggy.com/images/slider/2.jpg" className="d-block" alt="..." />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row">
            <div className="col" style={{ padding: "8px" }}>
              <img style={{ height: "23vh", width: "400px", borderRadius: "8px" }} src="https://carousels-ads.swiggy.com/images/slider/1.jpg" className="d-block" alt="..." />
            </div>
            <div className="col" style={{ padding: "8px" }}>
              <img style={{ height: "23vh", width: "400px", borderRadius: "8px" }} src="https://carousels-ads.swiggy.com/images/slider/4.jpg" className="d-block" alt="..." />
            </div>
            <div className="col" style={{ padding: "8px" }}>
              <img style={{ height: "23vh", width: "400px", borderRadius: "8px" }} src="https://carousels-ads.swiggy.com/images/02%2001.png" className="d-block" alt="..." />
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carosel;
