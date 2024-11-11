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
  const [imageToCrop, setImageToCrop] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { confirmDelete } = useAlert();

  useEffect(() => {
    fetchProductData(setCategories, setBrands, setProductList);
  }, []);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setCroppedImage(product.imageUrl || null); // Cargar la imagen existente del producto si está disponible
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageToCrop(imageUrl);
      setCropping(true);
    }
  };

  const handleConfirmCrop = (croppedImg) => {
    setCroppedImage(croppedImg);
    setCropping(false);
  };

  const handleRemoveImage = () => {
    setCroppedImage(null);
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
        croppedImage={croppedImage}
        handleRemoveImage={handleRemoveImage}
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
