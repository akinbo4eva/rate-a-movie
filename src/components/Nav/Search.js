import { useEffect, useRef } from "react";
import { useEnterKey } from "../../Hooks/useEnterKey";

export default function Search({ query, setQuery }) {
  const useEl = useRef(null);

  useEnterKey("Enter", () => {
    if (document.activeElement === useEl.current) return;
    useEl.current.focus();
    setQuery("");
  });

  // useEffect(() => {
  //   function calback(e) {
  //     if (document.activeElement === useEl.current) return;
  //     if (e.code === "Enter") {
  //       useEl.current.focus();
  //       setQuery("");
  //     }
  //   }
  //   document.addEventListener("keydown", calback);
  //   return document.addEventListener("keydown", calback);
  // }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={useEl}
    />
  );
}
