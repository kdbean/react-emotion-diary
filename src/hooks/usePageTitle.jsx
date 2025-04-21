import { useEffect } from "react";

/**
 * @function usePageTitle
 * Custom React hook sets the document's page title when the component is mounted or updated.
 *
 * @param {string} title - The desired page title to set in the browser tab.
 */
const usePageTitle = (title) => {
  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title;
  }, [title]);
};

export default usePageTitle;
