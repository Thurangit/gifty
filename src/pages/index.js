import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/firstCss.css';
import gift from '../composants/images/one_gift.png';
import image from '../composants/images/R.png'
import { useNavigate } from 'react-router';
import Snowfall from '../modules/snowFall';
import Copyright from '../modules/copyright';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="p-4 bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm"
    >
      <nav className="p-4 bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={gift} alt="Cadeau de Noël" className="mx-auto h-5 object-cover rounded-xl " />
              <span className="font-semibold text-xl">BLISS MONEY</span>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-2">
                <span className="block w-8 h-0.5 bg-gray-600"></span>
                <span className="block w-8 h-0.5 bg-gray-600"></span>
                <span className="block w-8 h-0.5 bg-gray-600"></span>
              </div>
            </button>

            <div className="hidden md:flex space-x-8">
              <a href="#" className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                <span>ACCUEIL</span>
              </a>
              <a href="#" className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                <span>GUIDE</span>
              </a>
              <a href="#" className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                <span>A PROPOS</span>
              </a>
            </div>

            <div className="md:hidden">
              <div className={`${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
                <div className="flex flex-col space-y-4">
                  <a href="#" className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                    <span>ACCUEIL</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                    <span>GUIDE</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                    <span>A PROPOS</span>
                  </a>
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all w-full justify-center">

                    <span>SIGN UP FREE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Snowfall snowflakeCount={250} />
      </nav>
    </motion.nav>
  );
};

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 bg-white flex items-center justify-center transition-opacity duration-1000 z-50"
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{
          scale: [0.7, 1.1, 1],
          transition: { duration: 1, ease: "easeInOut" }
        }}
        className="w-32 h-32 bg-white rounded-lg flex items-center justify-center"
      >
        <div>
          <img
            src={gift}
            alt="Cadeau de Noël"
            className="mx-auto mb-4 h-20 object-cover rounded-xl animate-bounce-slow"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};


const HeroSection = () => {
  const Navigate = useNavigate();

  const sendGift = () => {
    Navigate("/Amount")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between mt-32 mb-16"
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="max-w-xl w-full md:w-1/2"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 text-center md:text-left"
        >
          LE CADEAU
          <br />
          <span className="text-indigo-900">PARFAIT 🎁💸</span>
          <br />
          CHAQUE FOIS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-gray-600 mb-8 text-lg leading-relaxed text-center md:text-left"
        >
          En cette période de fin d'année, éveillez la joie avec une nouvelle façon de faire des cadeaux.
          Créez des suprises mémorable en offrant exactement ce qu'ils désirent.
          Avec nous partagez la magie et regardez vos cadeaux illuminer vos proches.
          C'est rapide, facile et inoubliable !
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          onClick={sendGift}
          className="flex justify-center md:justify-start"
        >
          <button className="flex items-center space-x-2 px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl">
            <Gift className="w-5 h-5" />
            <span>Envoyer un cadeau</span>
          </button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="flex-1 mt-6 md:mt-0 md:ml-16"
      >
        <motion.img
          src={image}
          alt="Red gift box with gold bow"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full max-w-md mx-auto object-contain animate-zoom-in-out"
        />
      </motion.div>
    </motion.div>
  );
};

const WelcomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <Loader loading={loading} />
      <Snowfall snowflakeCount={150} />
      {!loading && (
        <>
          <Navigation />
          <HeroSection />
          <Copyright />
        </>
      )}
    </div>
  );
};

export default WelcomePage;