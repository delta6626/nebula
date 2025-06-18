import { useEffect, useRef, useState } from "react";

function FadeInAnimation({ children }) {
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
      className={`fadeInAnimation ${isVisible ? "isVisible" : ""}`}
    >
      {children}
    </div>
  );
}

export default FadeInAnimation;
