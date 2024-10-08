import React from "react";
import { useEffect, useState } from "react"



function Typewriter() {
  const [text, setText] = useState('');
  const fullText = "Let’s build something amazing together!!";
  const typingSpeed = 100; // Adjust typing speed (in milliseconds)

  useEffect(() => {
    let index = 0;
    const type = () => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1)); // Set the text directly without appending
        index++;
        setTimeout(type, typingSpeed);
      }
    };
    type();
  }, []);

  return (
    <div className="typewriter-container">
  <span id="typewriter">{text}</span>
</div>
  );
}

export default Typewriter;
