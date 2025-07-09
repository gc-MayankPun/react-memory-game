import { useEffect, useRef } from "react";
import { useHighlighter } from "../../utils/highlightElement.utils"; // Custom util to position the highlight bar
import "../../stylesheets/option-highlighter.css";

// OptionHighlighter: A UI component for selecting options (e.g., difficulty or theme)
const OptionHighlighter = ({ label, options, value, setValue }) => {
  const containerRef = useRef(null); // Ref for the container holding all options
  const highlighterRef = useRef(null); // Ref for the highlighter element

  // When component mounts or window resizes, align highlighter
  useEffect(() => {
    handleResize(); // Initial alignment

    // Re-align highlighter on window resize
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handles the highlighting and value update when user clicks an option
  const handleHighter = (event) => {
    const selectedValue = event.target.textContent; // Get clicked text
    setValue(selectedValue); // Update the selected value in parent
    useHighlighter(containerRef, highlighterRef, event); // Animate highlighter to new position
  };

  // Ensures the highlighter aligns with the current `value` (even on resize)
  const handleResize = () => {
    if (!containerRef.current) return;

    // Find the <span> element that matches the current value
    const val = Array.from(containerRef.current.querySelectorAll("span")).find(
      (el) => el.textContent === value
    );

    if (!val) return;

    // Trigger highlighter positioning using a fake event object
    useHighlighter(containerRef, highlighterRef, { target: val });
  };

  return (
    <div className="option-highlighter-container">
      {/* Label for the option group (e.g., "Difficulty", "Theme") */}
      <p>{label}:</p>

      {/* Container that holds the options and the animated highlighter */}
      <p ref={containerRef} className="highlighter-container">
        {options.map((optionVal, indx) => {
          return (
            <span className="noselect" key={indx} onClick={handleHighter}>
              {optionVal}
            </span>
          );
        })}

        {/* Sliding highlighter element */}
        <span ref={highlighterRef} className="highlighter"></span>
      </p>
    </div>
  );
};

export default OptionHighlighter;
