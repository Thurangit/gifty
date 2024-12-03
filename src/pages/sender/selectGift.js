import React, { useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import i1 from '../../composants/images/001.gif'
import i2 from '../../composants/images/002.png'
import i3 from '../../composants/images/003.gif'
import i4 from '../../composants/images/004.png'
import i5 from '../../composants/images/005.png'
import i6 from '../../composants/images/006.gif'
import i7 from '../../composants/images/007.gif'
import i8 from '../../composants/images/008.gif'
import i9 from '../../composants/images/009.gif'
import i10 from '../../composants/images/010.gif'
import i11 from '../../composants/images/011.gif'
import i12 from '../../composants/images/012.gif'
import i13 from '../../composants/images/013.gif'

import Snowfall from '../../modules/snowFall';
import { useNavigate, useParams } from 'react-router';

const SelectGift = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);
  const Navigate = useNavigate();
  const { amount } = useParams();

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    setSelectedImage(uploadedImage);
    setSelectedGift(null);
  };

  const handleGiftSelect = (page) => {
    Navigate(page);
  };

  const giftItems = [
    {
      name: 'Upload Your Own Gift Image',
      image: selectedImage ? URL.createObjectURL(selectedImage) : null,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0000'
    },
    {
      name: 'Gift\'s Name',
      image: i1,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0001'
    },
    {
      name: 'Gift\'s Name',
      image: i2,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0002'
    },
    {
      name: 'Gift\'s Name',
      image: i3,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0003'
    },
    {
      name: 'Gift\'s Name',
      image: i4,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0004'
    },
    {
      name: 'Gift\'s Name',
      image: i5,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0005'
    },
    {
      name: 'Gift\'s Name',
      image: i6,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0006'
    },
    {
      name: 'Gift\'s Name',
      image: i7,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0007'
    },
    {
      name: 'Gift\'s Name',
      image: i8,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0008'
    },
    {
      name: 'Gift\'s Name',
      image: i9,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0009'
    },
    {
      name: 'Gift\'s Name',
      image: i10,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0010'
    },
    {
      name: 'Gift\'s Name',
      image: i11,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0011'
    },
    {
      name: 'Gift\'s Name',
      image: i12,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0012'
    },
    {
      name: 'Gift\'s Name',
      image: i13,
      id: 'Gifty-App-Maker-CM-Ed-Val-Js-0013'
    },
  ];

  // Simple fade and slide transition
  const pageTransition = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageTransition}
      className="bg-gray-100 min-h-screen py-8 relative overflow-hidden"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        CHOISISSEZ UN <strong>MINE</strong> POUR VOTRE CADEAU
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {/* Custom Upload Option */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="h-48 flex items-center justify-center"
        >
          <label htmlFor="image-upload" className="cursor-pointer h-full">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded Gift"
                className="h-full w-full object-contain transition-all duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <UploadCloud className="w-12 h-12 text-gray-400" />
                <span className="text-gray-500 mt-2">Upload Your Own</span>
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
        </motion.div>

        {/* Gift GIFs */}
        {giftItems.slice(1).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
                delay: index * 0.1
              }
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleGiftSelect(`/Message/Gift/${item.id}/${amount}`)}
            className="h-48 cursor-pointer"
          >
            <img
              src={item.image}
              alt={`Gift option ${index + 1}`}
              className="h-full w-full object-contain transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>

      <Snowfall snowflakeCount={150} />
    </motion.div>
  );
};

export default SelectGift;