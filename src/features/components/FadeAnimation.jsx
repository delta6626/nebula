import { useEffect, useRef, useState } from "react";

function FadeAnimation({ applyMinimumHeight, from, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsVisible(entry.isIntersecting);
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`${applyMinimumHeight ? "grid min-h-[100%]" : ""} ${from === "top" ? "topFadeInAnimation" : "bottomFadeInAnimation"} ${isVisible ? "isVisible" : ""}`}
    >
      {children}
    </div>
  );
}

export default FadeAnimation;
