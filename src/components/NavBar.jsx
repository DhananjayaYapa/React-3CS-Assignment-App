import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  useGSAP(() => {
    // Create scroll triggers for each section to update active nav link
    const sections = [
      { id: "#hero", link: "home" },
      { id: "#flavors", link: "flavors" },
      { id: "#reviews", link: "reviews" },
      { id: "#contact", link: "contact" },
    ];

    sections.forEach(({ id, link }) => {
      ScrollTrigger.create({
        trigger: id,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveLink(link),
        onEnterBack: () => setActiveLink(link),
      });
    });
  });

  // Animate menu when it opens
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: "circle(0% at 100% 0%)" },
        { clipPath: "circle(150% at 100% 0%)", duration: 0.6, ease: "power3.inOut" }
      );
      gsap.fromTo(
        menuItemsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, [isMenuOpen]);

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      clipPath: "circle(0% at 100% 0%)",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => setIsMenuOpen(false),
    });
  };

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    } else {
      closeMenu();
    }
  };

  const handleNavClick = (e, link, targetId) => {
    e.preventDefault();
    setActiveLink(link);

    // Close mobile menu if open
    if (isMenuOpen) {
      closeMenu();
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetElement,
          offsetY: 0,
        },
        ease: "power2.inOut",
      });
    }
  };

  const navLinks = [
    { link: "home", targetId: "#hero", label: "Home" },
    { link: "flavors", targetId: "#flavors", label: "Flavors" },
    { link: "reviews", targetId: "#reviews", label: "Reviews" },
    { link: "contact", targetId: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 md:py-5 md:px-9 py-2 px-3 flex items-center justify-between">
        <ImageWithPlaceholder src="/images/nav-logo.png" alt="nav-logo" className="md:w-40 w-30 -mt-1" />

        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-1 items-center justify-center gap-32">
          {navLinks.map(({ link, targetId, label }) => (
            <li key={link}>
              <a
                href={targetId}
                className={`nav-link ${activeLink === link ? "nav-link-active" : ""}`}
                onClick={(e) => handleNavClick(e, link, targetId)}
              >{label}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[60] cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-dark-brown transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-dark-brown transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-dark-brown transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[55] bg-gradient-to-br from-milk to-milk-yellow flex flex-col items-center justify-center"
          style={{ clipPath: "circle(0% at 100% 0%)" }}
        >
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map(({ link, targetId, label }, index) => (
              <li
                key={link}
                ref={(el) => (menuItemsRef.current[index] = el)}
                className="overflow-hidden"
                style={{ opacity: 0 }}
              >
                <a
                  href={targetId}
                  className={`text-4xl font-bold uppercase tracking-wider transition-colors duration-300 ${activeLink === link
                      ? "text-mid-brown"
                      : "text-dark-brown hover:text-mid-brown"
                    }`}
                  onClick={(e) => handleNavClick(e, link, targetId)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Decorative element */}
          <div className="absolute bottom-10 text-dark-brown/30 font-bold text-sm uppercase tracking-widest">
            LANKAN COOL
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
