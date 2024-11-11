import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ImageCropper from './components/ImageCropper';
import useAlert from './utils/useAlert';
import { fetchProductData, handleAddOrUpdateProduct, handleDeleteProduct } from './services/firebaseService';

export default function ProductPage() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productList, setProductList] = useState([]);
  const [imageToCrop, setImageToCrop] = useState(null); // Estado para la imagen a recortar
  const [croppedImage, setCroppedImage] = useState(null); // Imagen final recortada
  const [cropping, setCropping] = useState(false); // Estado para controlar si se está recortando
  const [editingProduct, setEditingProduct] = useState(null); // Producto que se está editando
  const { confirmDelete } = useAlert();

  useEffect(() => {
    fetchProductData(setCategories, setBrands, setProductList);
  }, []);

  const handleEditProduct = (product) => setEditingProduct(product);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Convertir la imagen a URL para pasarla al modal
      setImageToCrop(imageUrl); // Establecer la URL de la imagen a recortar
      setCropping(true); // Abrir el modal de recorte
    }
  };

  const handleConfirmCrop = (croppedImg) => {
    console.log("Recorte confirmado, imagen recortada:", croppedImg);
    setCroppedImage(croppedImg);
    setCropping(false);
  };
  

  const handleRemoveImage = () => {
    setCroppedImage(null); // Elimina la imagen recortada
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestión de Productos</h1>
      
      <ProductForm
        categories={categories}
        brands={brands}
        onImageChange={handleImageChange}
        onAddOrUpdateProduct={(data) => 
          handleAddOrUpdateProduct(data, setProductList, editingProduct, setEditingProduct, setCroppedImage, toast)
        }
        editingProduct={editingProduct}
        croppedImage={croppedImage} // Pasa la imagen recortada al formulario
        handleRemoveImage={handleRemoveImage} // Pasar la función para eliminar imagen
      />

      {cropping && (
        <ImageCropper
          image={imageToCrop}
          onCropConfirm={handleConfirmCrop}
          onCropCancel={() => setCropping(false)}
          setCroppedImage={setCroppedImage}
        />
      )}

      <h2 className="text-xl font-semibold text-gray-900 mb-4">Productos Existentes</h2>
      <ProductList
        productList={productList}
        onEditProduct={handleEditProduct}
        onDeleteProduct={(productId, imageUrl) => 
          handleDeleteProduct(productId, imageUrl, confirmDelete, setProductList, toast)
        }
      />
    </div>
  );
}
