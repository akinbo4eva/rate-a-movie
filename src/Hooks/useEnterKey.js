import { useEffect } from "react";

export function useEnterKey(key, action) {
  useEffect(() => {
    function calback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", calback);
    return document.addEventListener("keydown", calback);
  }, [key, action]);
}
