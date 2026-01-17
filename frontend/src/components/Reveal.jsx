import React from "react";

import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}