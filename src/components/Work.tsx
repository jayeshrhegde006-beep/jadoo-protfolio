import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const flex = document.querySelector(".work-flex") as HTMLElement;
      if (!flex) return;

      // Calculate total width of all boxes including gaps/padding
      const boxes = document.querySelectorAll(".work-box");
      let totalWidth = 0;
      boxes.forEach((box) => {
        totalWidth += (box as HTMLElement).offsetWidth;
      });

      const viewportWidth = window.innerWidth;
      // We need to scroll the total width minus what's already visible (one viewport)
      // Plus some padding for the end
      translateX = totalWidth - viewportWidth + (viewportWidth * 0.05);
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${translateX}`, // Use function for dynamic end
        scrub: true,
        pin: true,
        id: "work",
        invalidateOnRefresh: true, // Refresh on resize
        pinnedContainer: "#smooth-content", // Essential for ScrollSmoother
      },
    });

    timeline.to(".work-flex", {
      x: () => -translateX, // Use function for dynamic x
      ease: "none",
    });

    const refreshHandler = () => {
      setTranslateX();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", refreshHandler);

    return () => {
      window.removeEventListener("resize", refreshHandler);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              title: "E-Commerce Website",
              category: "Web Application",
              tools: "Next.js 16, React 19, Tailwind CSS 4, Shadcn/UI, Framer Motion, WhatsApp API",
              image: "/ALFACELLPOINT.png",
              link: "https://alfacellpoint.vercel.app/",
            },
            {
              title: "R&R (Roast And Reveal)",
              category: "Coffee Experience Platform",
              tools: "Frontend: HTML5/CSS3 (Glassmorphism), Vanilla JS | 3D: Three.js (Interactive Globe & Bean) | Animations: GSAP, Lucide Icons | Desktop/DB: Python (Tkinter), SQLite | Features: Brewing Timer, Marketplace, Tasting Journal",
              image: "/R&R.png",
              link: "https://roast-reveal.vercel.app/",
            },
            {
              title: "Quiz Battle Royal",
              category: "AI-Powered Quiz Platform",
              tools: "React, Next.js, Tailwind CSS, Zustand, Node.js, Next.js API Routes, JSON (questions.json), Cohere AI (Command Model)",
              image: "/quizbattleroyal.png",
              link: "https://quiz-battle-royal.vercel.app/",
            },
            {
              title: "Future Projects",
              category: "Currently in Development",
              tools: "Coming Soon - Stay tuned for more creative experiments and full-stack solutions.",
              image: "/images/placeholder.webp",
              link: "",
            },
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  data-cursor="disable"
                >
                  Visit Site: {project.link}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
