import ImageWithPlaceholder from "../components/ImageWithPlaceholder";

const FooterSection = () => {

  return (
    <section id="contact" className="footer-section">
      <ImageWithPlaceholder
        src="/images/footer-dip.png"
        alt=""
        className="w-full object-cover -translate-y-1"
      />

      <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
        <div className="overflow-hidden z-10">
          <h1 className="general-title text-center text-milk py-5">
            #LANKANCOOL
          </h1>
        </div>

        <video
          src="/videos/splash.mp4"
          autoPlay
          playsInline
          muted
          loop
          className="absolute top-0 object-contain mix-blend-lighten pointer-events-none"
        />

        <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
          <div className="social-btn">
            <ImageWithPlaceholder src="./images/yt.svg" alt="YouTube" className="w-6 h-6" />
          </div>
          <div className="social-btn">
            <ImageWithPlaceholder src="./images/insta.svg" alt="Instagram" className="w-6 h-6" />
          </div>
          <div className="social-btn">
            <ImageWithPlaceholder src="./images/tiktok.svg" alt="TikTok" className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium relative z-20">
          <div className="flex items-center md:gap-16 gap-5">
          </div>

          <div className="md:max-w-lg">
            <p>
              Get Exclusive Early Access and Stay Informed About Product
              Updates, Events, and More!
            </p>
            <div className="flex justify-between items-center border-b border-[#D9D9D9] py-5 md:mt-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-milk outline-none placeholder:font-sans placeholder:text-[#999999] focus:ring-0"
              />
              <ImageWithPlaceholder src="/images/arrow.svg" alt="arrow" className="w-6 h-6 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="copyright-box">
          {/* The final row with copyright and legal links. */}
          <div className="flex items-center gap-7">
            <p>Privacy Policy</p>
            <p>Terms of Sеrvice</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
