import { useState, useCallback, useEffect } from 'react';
const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }, []);
  useEffect(() => {
    if (isCopied) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
      return () => clearTimeout(id);
    }
  }, [isCopied]);
  return [isCopied, copyToClipboard];
};
export default useCopyToClipboard;