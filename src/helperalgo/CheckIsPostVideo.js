export default function isVideoLink(link) {
    // Convert the link to lowercase for case-insensitive matching
    const lowercaseLink = link.toLowerCase();
  
    // Check if the link contains the word "video"
    return lowercaseLink.includes("video");
  }