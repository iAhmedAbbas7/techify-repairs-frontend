import { useState, useEffect } from "react";

const usePersist = () => {
  // Retrieves the Initial Persist Value from Local Storage if Exists otherwise False
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  // Updating the Local Storage Every Time Persists Changes
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);
  return [persist, setPersist];
};

export default usePersist;
