import React from "react";

interface FileDownloadButtonProps {
  fileUrl: string;
  fileName: string;
}

const VideoDownloadButton: React.FC<FileDownloadButtonProps> = ({
  fileUrl,
  fileName,
}) => {
  const handleDownload = () => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(anchor);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };
  return (
    <>
      <a onClick={handleDownload}> {fileName}</a>
    </>
  );
};

export default VideoDownloadButton;
