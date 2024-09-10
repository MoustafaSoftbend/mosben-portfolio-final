
import { useEffect, useRef } from "react"; // Assuming React integration

// Type definition for a typed character element
interface TypedCharacter extends HTMLElement {
  textContent: string; // Restrict content to single character
}

export const typer = () => {
  const charListRef = useRef<TypedCharacter[]>([]); // Initialize with an empty array

  useEffect(() => {
    const nodeList = document.querySelectorAll(
      ".nav-body h1.nav-title span.typed-char",
    );
    const charList = Array.from(nodeList) as TypedCharacter[]; // Convert NodeList to array and assert type

    charListRef.current = charList;

    charList.forEach((char) => {
      char.style.display = "inline-block";
    });

    // Potential animation or dynamic typing logic here
    // ...

    return () => {
      // Cleanup logic if needed (e.g., animation cleanup)
    };
  }, []); // Empty dependency array for initial effect only

  return null; // No JSX return for utility function
};
