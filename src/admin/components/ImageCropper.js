import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';

export default function ImageCropper({ image, onCropConfirm, onCropCancel, setCroppedImage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropConfirm = async () => {
    if (croppedAreaPixels && image) {
      try {
        const croppedImg = await getCroppedImg(image, croppedAreaPixels);
        console.log("Imagen recortada generada:", croppedImg);
        setCroppedImage(croppedImg);
        onCropConfirm(croppedImg);
      } catch (error) {
        console.error("Error al generar la imagen recortada:", error);
      }
    }
  };
  
  

  if (!image) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recorta la Imagen</h2>
        <div className="relative h-64 w-full">
          <ReactCrop
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onCropCancel} className="py-2 px-4 bg-gray-300 text-gray-800 rounded mr-2">
            Cancelar
          </button>
          <button onClick={handleCropConfirm} className="py-2 px-4 bg-blue-500 text-white rounded">
            Confirmar Recorte
          </button>
        </div>
      </div>
    </div>
  );
}
