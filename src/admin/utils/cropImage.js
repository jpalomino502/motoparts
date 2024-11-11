export const getCroppedImg = (imageSrc, pixelCrop) => {
  const canvas = document.createElement('canvas');
  const image = new Image();
  image.src = imageSrc;
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const ctx = canvas.getContext('2d');
      const cropWidth = pixelCrop.width;
      const cropHeight = pixelCrop.height;
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );
      resolve(canvas.toDataURL('image/jpeg'));
    };
    image.onerror = (err) => reject(err);
  });
};
