import { useState } from 'react';
import SelectField from './sections/AdminCreateProduct/SelectField.jsx';
import ArrowBack from './../common/ArrowBack.jsx';
import InputField from './sections/AdminCreateProduct/InputField.jsx';
import { useProductContext } from '../lib/ProductProvider.jsx';

const CreateProduct = () => {
  
    const { postProductsAsync } = useProductContext();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        description: '',
        price: '',
        category: '',
        image: '',
    });
  


    const categories = ['T-Shirt', 'Underwear', 'Pants'];

    const isValidImageURL = (url) => {
        const onlineImagePattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg))$/i;
        const standaloneImagePattern = /^(?=.{1,})(?:.*[\\])?.+\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg)$/i;

        return onlineImagePattern.test(url) || standaloneImagePattern.test(url);
    };

    const validate = () => {
        const errors = {};
        if (!formData.brand) errors.brand = "Brand is required.";
        if (!formData.model) errors.model = "Model is required.";
        if (!formData.price) errors.price = "Price is required.";
        if (isNaN(formData.price) || formData.price <= 0) errors.price = "Price must be a positive number.";
        if (!formData.image) {
            errors.image = "Image URL is required.";
        } else if (!isValidImageURL(formData.image)) {
            errors.image = "Image URL must be a valid image format (JPEG, PNG, GIF, etc.).";
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log("Form submitted", formData);
            try {
                const result = await postProductsAsync(formData);
                if (result) {
                    console.log("Product successfully created:", result);
                    document.getElementById('successMessage').hidden = false
                    document.getElementById('failMessage').hidden = true
                }
                else {
                    document.getElementById('failMessage').hidden = false
                    document.getElementById('successMessage').hidden = true
                }
            } catch (error) {
                console.error("Error creating product:", error);
            }
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
            <form onSubmit={(e) => handleSubmit(e, formData)} className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <div className="flex items-center justify-between mb-6">
                <ArrowBack goBackTo="/admin" />
                <h2 className="text-xl sm:text-2xl text-center flex-grow text-gray-800">Create Product</h2>
                    <div className="sm:w-6"></div>
                </div>
                {/* Brand */}
                <InputField
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    error={errors.brand}
                />
                {/* Model */}
                <InputField
                    label="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    error={errors.model}
                />
                {/* Product Description */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full resize-none"
                        rows="3"
                    />
                </div>
                {/* Product Price */}
                <InputField
                    label="Price (SEK)*"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    error={errors.price}
                />
                {/* Product Category */}
                <SelectField
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={categories}
                />
                {/* Image URL */}
                <InputField
                    label="Image URL*"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    error={errors.image}
                />
                {/* Submit Button */}
                <button 
                    id="createButton"
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4">
                    Create Product
                </button>
                <div className="w-full text-green-500 p-2 rounded mt-4 text-center">
                    <p id="successMessage" hidden>
                        Product was successfully created!
                    </p>
                </div>
                <div className="w-full text-red-500 p-2 rounded mt-4 text-center">
                    <p id="failMessage" hidden>
                        Failed to create product.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;