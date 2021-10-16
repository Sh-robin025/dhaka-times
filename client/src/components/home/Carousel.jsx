import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const Carousel = () => {
  return (
    <div className="container mx-auto mt-5">
      <Slider {...settings} className="w-2/4 mx-auto">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8KX6rs-DuSk29mEieEnnFMiW3ous_C-h9uvWvRGXnOxa7lvpnxPYnSS-aCfk7y6tOGE&usqp=CAU"
            alt=""
            className="w-full h-32"
          />
        </div>
        <div>
          <img
            src="https://insites-consulting.com/media/2020/08/Lifebuoy-1024x425.jpg"
            alt=""
            className="w-full h-32"
          />
        </div>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgu3wsQh29VQnr8hYlQX23sG5kcLXcuenW8Q&usqp=CAU"
            alt=""
            className="w-full h-32"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
