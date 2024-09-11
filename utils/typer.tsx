import { useEffect, useRef } from "react";

// Type definition for a typed character element
interface TypedCharacter extends HTMLElement {
  textContent: string; // Restrict content to single character
}

// Custom hook to handle typing animation or logic
export const Typer = () => {
  const charListRef = useRef<TypedCharacter[]>([]);

    const nodeList = document.querySelectorAll(
      ".nav-body h1.nav-title span.typed-char"
    );
    const charList = Array.from(nodeList) as TypedCharacter[]; // Convert NodeList to array and assert type

    charListRef.current = charList;

    charList.forEach((char) => {
      char.style.display = "inline-block";
    });

    // Potential animation or dynamic typing logic here
    // ...

};
