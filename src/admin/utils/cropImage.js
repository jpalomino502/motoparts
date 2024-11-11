import imageCompression from 'browser-image-compression';

export const getCroppedImg = async (imageSrc, pixelCrop, quality = 0.7) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality));

  const compressedBlob = await imageCompression(blob, {
    maxSizeMB: 0.25,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  });

  const compressedUrl = URL.createObjectURL(compressedBlob);
  return compressedUrl;
};

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
}
