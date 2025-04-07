import gsap from "gsap";

export const useHighlighter = (containerRef, highlighterRef, event) => {
  if (!containerRef.current || !highlighterRef.current) return;

  const containerLeft = containerRef.current.getBoundingClientRect().left;
  const targetLeft = event.target.getBoundingClientRect().left;
  const targetWidth = event.target.getBoundingClientRect().width;

  const relativeLeft = targetLeft - containerLeft;

  gsap.to(highlighterRef.current, {
    width: targetWidth,
    left: relativeLeft,
    duration: 0.6,
    ease: "power2.out",
  });
};
