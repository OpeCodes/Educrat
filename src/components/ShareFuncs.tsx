
const openInAppOrNewTab = (url: string, appUrlScheme: string): void => {
    const userAgent: string = navigator.userAgent || navigator.vendor || "";
  
    // Check if the user is on a mobile device
    if (/android/i.test(userAgent)) {
      // For Android devices, try to open the app using an intent
      window.location.href = `intent://${appUrlScheme}#Intent;package=${appUrlScheme};scheme=${appUrlScheme};end`;
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      // For iOS devices, try to open the app using the custom URL scheme
      window.location.href = `${appUrlScheme}://`;
    } else {
      // Fallback: open in a new browser tab
      window.open(url, '_blank');
    }
  };
  
   export const shareOnFacebook = (url: string) => {
    const shareUrl: string = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    openInAppOrNewTab(shareUrl, 'fb://');
  };
  
  export const shareOnTwitter = (url: string)=> {
    const shareUrl: string = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    openInAppOrNewTab(shareUrl, 'twitter://');
  };
  
 export  const shareOnLinkedIn = (url: string) => {
    const shareUrl: string = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    openInAppOrNewTab(shareUrl, 'linkedin://');
  };
  
  export const shareOnInstagram = (url :string) => {
    const caption: string = encodeURIComponent(`Check out this link: ${url}`);
    const shareUrl: string = `https://www.instagram.com/create/caption/?caption=${caption}`;
    openInAppOrNewTab(shareUrl, 'instagram://');
  };

// export const shareOnFacebook = (url: string) => {
//     const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
//     window.open(shareUrl, '_blank');
//   };

//  export const shareOnTwitter = (url: string) => {
//     const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
//     window.open(shareUrl, '_blank');
//   };
//  export const shareOnLinkedIn = (url: string) => {
//     const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
//     window.open(shareUrl, '_blank');
//   };