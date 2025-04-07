import React, { useEffect, useRef } from "react";
import { useHighlighter } from "../../utils/highlightElement.utils";
import "../../stylesheets/option-highlighter.css";

const OptionHighlighter = ({ label, options, value, setValue }) => {
  const containerRef = useRef(null);
  const highlighterRef = useRef(null);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleHighter = (event) => {
    const selectedValue = event.target.textContent;

    setValue(selectedValue);

    useHighlighter(containerRef, highlighterRef, event);
  };

  const handleResize = () => {
    if (!containerRef.current) return;

    const val = Array.from(containerRef.current.querySelectorAll("span")).find(
      (el) => el.textContent === value
    );

    if (!val) return;

    useHighlighter(containerRef, highlighterRef, { target: val });
  };

  return (
    <div className="option-highlighter-container">
      <p>{label}:</p>
      <p ref={containerRef} className="highlighter-container">
        {options.map((optionVal, indx) => {
          return (
            <span key={indx} onClick={handleHighter}>
              {optionVal}
            </span>
          );
        })}
        <span ref={highlighterRef} className="highlighter"></span>
      </p>
    </div>
  );
};

export default OptionHighlighter;
