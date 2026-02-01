import { useRef, useState } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TestimonialSection = () => {
  const vdRef = useRef([]);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

  useGSAP(() => {
    gsap.set(".testimonials-section", {
      marginTop: "-140vh",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "200% top",
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 70,
    })
      .to(
        ".testimonials-section .sec-title",
        {
          xPercent: 25,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -50,
        },
        "<"
      );

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "200% top",
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from(".vd-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  });

  const handlePlay = (index) => {
    const video = vdRef.current[index];
    video.play();
  };

  const handlePause = (index) => {
    const video = vdRef.current[index];
    video.pause();
  };

  const handleFullscreen = (index) => {
    setFullscreenVideo(index);
    const video = vdRef.current[index];
    if (video) {
      video.muted = false;
      video.currentTime = 0;
      video.play();
    }
  };

  const closeFullscreen = () => {
    if (fullscreenVideo !== null) {
      const video = vdRef.current[fullscreenVideo];
      if (video) {
        video.muted = true;
        video.pause();
      }
    }
    setFullscreenVideo(null);
  };

  return (
    <section id="reviews" className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-black first-title">What's</h1>
        <h1 className="text-light-brown sec-title">Everyone</h1>
        <h1 className="text-black third-title">Talking</h1>
      </div>

      <div className="pin-box">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation} ${card.rotation}`}
            onMouseEnter={() => handlePlay(index)}
            onMouseLeave={() => handlePause(index)}
          >
            <video
              ref={(el) => (vdRef.current[index] = el)}
              src={card.src}
              playsInline
              muted
              loop
              className="size-full object-cover"
            />

            {/* Glass-style play button */}
            <button
              onClick={() => handleFullscreen(index)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         px-5 py-3 rounded-full flex items-center gap-2
                         bg-white/20 backdrop-blur-md border border-white/30
                         hover:bg-white/30 hover:scale-110 transition-all duration-300
                         cursor-pointer z-10"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-white font-bold text-sm uppercase tracking-wide">
                Play Video
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Modal */}
      {fullscreenVideo !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-8 right-8 w-12 h-12 rounded-full 
                       bg-white/10 backdrop-blur-md border border-white/20
                       flex items-center justify-center hover:bg-white/20 
                       transition-colors cursor-pointer z-10"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <video
            src={cards[fullscreenVideo].src}
            autoPlay
            loop
            controls
            className="max-w-[90vw] max-h-[90vh] rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default TestimonialSection;
