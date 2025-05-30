import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    // Getting the Previous Document Title
    const prevTitle = document.title;
    // Setting the Title to the Current Document Title
    document.title = title;
    // Cleanup => Restore the Previous Title on Unmount
    return () => (document.title = prevTitle);
  }, [title]);
};

export default useTitle;
