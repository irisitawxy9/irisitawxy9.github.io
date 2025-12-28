import React, { useEffect, useState, useRef } from "react";
import "./TextType.css";

/**
 * Typewriter component that matches the hero title styling.
 */
export default function TextType({
  text = ["Happy"],
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: typing, -1: deleting
  const timerRef = useRef();

  useEffect(() => {
    const current = text[index % text.length];

    if (direction === 1 && displayedText === current) {
      timerRef.current = setTimeout(() => setDirection(-1), pauseDuration);
      return () => clearTimeout(timerRef.current);
    }
    if (direction === -1 && displayedText === "") {
      setDirection(1);
      setIndex((v) => (v + 1) % text.length);
      return;
    }
    timerRef.current = setTimeout(() => {
      const next = displayedText.length + direction;
      setDisplayedText(current.slice(0, Math.max(0, next)));
    }, typingSpeed);

    return () => clearTimeout(timerRef.current);
  }, [displayedText, direction, index, text, typingSpeed, pauseDuration]);

  return (
    <span className="text-type-hero">
      {displayedText}
      {showCursor && <span className="text-type-cursor">{cursorCharacter}</span>}
    </span>
  );
}
