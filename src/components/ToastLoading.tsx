import { useEffect, useState } from 'react';

// Custom hook for managing loading toast
const ToastLoading = (isPending: boolean, toast: any) => {
  const [loadingToastId, setLoadingToastId] = useState<string | number | null>(null);

  useEffect(() => {
    if (isPending && !loadingToastId) {
      // Display a loading toast message and store its ID
      const toastId = toast({
        title: 'Loading...',
        // description: 'Please wait',        
        status: 'loading',
        duration: null, // Toast will persist until you manually close it or until the request completes
        isClosable: false, // Disables the close button on the toast
      });
      setLoadingToastId(toastId);
    } else if (!isPending && loadingToastId) {
      // If not pending anymore, close the loading toast
      toast.close(loadingToastId);
      setLoadingToastId(null);
    }
  }, [isPending, toast, loadingToastId]);

  return loadingToastId; // You can return the toast ID if needed
};

export default ToastLoading;
