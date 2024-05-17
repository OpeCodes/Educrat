

export const shareOnFacebook = (url: string) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

 export const shareOnTwitter = (url: string) => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };
 export const shareOnLinkedIn = (url: string) => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };
   export const shareOnInstagram = (url:  string) => {
    const caption = encodeURIComponent(`Check out this link: ${url}`);
    const shareUrl = `https://www.instagram.com/create/caption/?caption=${caption}`;
    window.open(shareUrl, '_blank');
  };
  