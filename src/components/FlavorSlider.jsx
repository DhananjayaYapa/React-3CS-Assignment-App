import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const FlavorSlider = () => {
  const sliderRef = useRef();
  const [flippedCards, setFlippedCards] = useState({});
  const [showAllMobile, setShowAllMobile] = useState(false);

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const handleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // On mobile, show only 3 cards initially unless showAllMobile is true
  const displayedFlavors = isMobile && !showAllMobile
    ? flavorlists.slice(0, 3)
    : flavorlists;

  useGSAP(() => {
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(".flavor-section", {
        x: `-${scrollAmount + 1500}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {displayedFlavors.map((flavor, index) => (
          <div
            key={flavor.name}
            className={`relative z-30 lg:w-[50vw] w-72 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-64 flex-none ${flavor.rotation}`}
            style={{ perspective: "1000px" }}
          >
            <div
              className="flavor-card-inner"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transition: "transform 0.6s ease-in-out",
                transform: flippedCards[index] ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front of card */}
              <div
                className="flavor-card-front"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <img
                  src={`/images/${flavor.color}-bg.svg`}
                  alt=""
                  className="absolute bottom-0"
                />

                <img
                  src={`/images/${flavor.color}-drink.png`}
                  alt=""
                  className="drinks"
                />

                <img
                  src={`/images/${flavor.color}-elements.webp`}
                  alt=""
                  className="elements"
                />

                <h1>{flavor.name}</h1>

                <button
                  onClick={() => handleFlip(index)}
                  className="absolute bottom-3 right-3 md:bottom-10 md:right-10 bg-milk text-dark-brown px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm uppercase tracking-wide hover:bg-light-brown transition-colors cursor-pointer z-20"
                >
                  Read More +
                </button>
              </div>

              {/* Back of card */}
              <div
                className="flavor-card-back"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <img
                  src={`/images/${flavor.color}-bg.svg`}
                  alt=""
                  className="absolute bottom-0 w-full h-full object-cover"
                  style={{ zIndex: -1 }}
                />
                {/* Drink image as placeholder/icon */}
                <img
                  src={`/images/${flavor.color}-drink.png`}
                  alt={flavor.name}
                  className="absolute left-1/2 -translate-x-1/2 h-[60%] object-contain opacity-30"
                  style={{ zIndex: 0 }}
                />
                <h2 className="text-milk text-2xl md:text-5xl font-bold uppercase mb-3 md:mb-6 text-center relative z-10">
                  {flavor.name}
                </h2>
                <p className="text-milk font-paragraph text-center text-sm md:text-xl leading-relaxed max-w-md relative z-10">
                  {flavor.description}
                </p>
                <button
                  onClick={() => handleFlip(index)}
                  className="mt-4 md:mt-8 bg-milk text-dark-brown px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-wide hover:bg-light-brown transition-colors cursor-pointer relative z-10"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More button for mobile */}
      {isMobile && !showAllMobile && (
        <div className="flex justify-center mt-6 pb-8">
          <button
            onClick={() => setShowAllMobile(true)}
            className="bg-dark-brown text-milk px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-mid-brown transition-colors cursor-pointer"
          >
            View All Flavors ({flavorlists.length - 3} more)
          </button>
        </div>
      )}
    </div>
  );
};

export default FlavorSlider;
