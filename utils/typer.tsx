import { useEffect, useRef } from "react"; // Assuming React integration

// Type definition for a typed character element
interface TypedCharacter extends HTMLElement {
  textContent: string; // Restrict content to single character
}

export const typer = () => {
  const charListRef = useRef<TypedCharacter[]>(null);

  useEffect(() => {
    const charList = document.querySelectorAll(
      ".nav-body h1.nav-title span.typed-char",
    ) as TypedCharacter[]; // Type assertion (if structure is guaranteed)

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
