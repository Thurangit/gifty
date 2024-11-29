import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import i1 from '../../composants/images/001.gif'
import i2 from '../../composants/images/002.gif'
import i3 from '../../composants/images/003.gif'
import i4 from '../../composants/images/004.png'
import Snowfall from '../../modules/snowFall';
const SelectGift = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const giftItems = [
    {
      name: 'Upload Your Own Gift Image',
      image: selectedImage ? URL.createObjectURL(selectedImage) : null,
      price: '',
      deliveryDate: ''
    },
    {
      name: 'Gift\'s Name',
      image: i1,
      price: '$12.95 - $147.56',
      deliveryDate: 'Earliest Delivery From 27 Nov'
    },
    {
      name: 'Gift\'s Name',
      image: i2,
      price: '$12.95 - $147.56',
      deliveryDate: 'Earliest Delivery From 27 Nov'
    },
    {
      name: 'Gift\'s Name',
      image: i3,
      price: '$12.95 - $147.56',
      deliveryDate: 'Earliest Delivery From 27 Nov'
    },
    {
        name: 'Gift\'s Name',
        image: i4,
        price: '$12.95 - $147.56',
        deliveryDate: 'Earliest Delivery From 27 Nov'
      }
  ];

  return (
    <div className="bg-gray-100 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">CHOISISSEZ UN <strong>MINE</strong> POUR VOTRE CADEAU</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden relative flex items-center justify-center">
          <label htmlFor="image-upload" className="block h-40 cursor-pointer flex items-center justify-center">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded Gift"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center">
                <UploadCloud className="w-12 h-12 text-gray-400" />
                <span className="text-gray-500 mt-2">Upload Your Own Gift Image</span>
              </div>
            )}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        {giftItems.slice(1).map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden relative"
          >
            <div className="h-40 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="p-4">
              <div className="font-bold">{item.name}</div>
              <div className="text-gray-500 mb-2">{item.price}</div>
              <div className="text-gray-500">{item.deliveryDate}</div>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mt-4">
                CHOISIR
              </button>
            </div>
          </div>
        ))}
      </div>
      <Snowfall snowflakeCount={60} />
    </div>
  );
};

export default SelectGift;