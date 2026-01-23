import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function GallerySlider() {
    const settings = {
     

        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",

        speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: false
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
        ],
    
 
      
    }

    
//   <div className="gallery-carousel">
  const images = [
    "02ad07b3e22140cd.png",
    "1c9ffc0c-e054-4aed-8c3d-8f05a0b6408d.png",
    "3d2c2c5d-c533-4a06-be81-4301e7f95258.png",
    "84748801e9744300.png",
    "9e6837ae32584dfe.png",
    "d23087cd-896c-4499-ac22-c128f9fc2f31.png",
    "d3193158-5c2c-41b9-a508-7bd8fcf1ff81.png",
    "eec683f85fe24cbc.png",
    "f34a7f1107e54830.png",
    "f938c2b500204470.png",
  ];

    return (
      
        <section className="py-16">
        <div className="mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Spaces designed with <span className="">Ventics AI</span>
            </h2>
          </div>


                    <div className="slider-container">
                        
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-2">
            <div className="w-full h-72 rounded-xl overflow-hidden">
              <img
                src={`/images/gallery/${image}`}
                alt="AI Generated Room Design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
      
                    </div>
                    
                    </div>
                    </section>
  );
}
