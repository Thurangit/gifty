import React, { useState, useEffect } from 'react';
import { Bell, Gift, Home, Mail, Send, User } from 'lucide-react';
import '../style/firstCss.css';
import gift from '../composants/images/one_gift.png';
import image from '../composants/images/R.png'
import { useNavigate } from 'react-router';
// Styles pour l'animation des flocons
const styles = `
  @keyframes verticalFall {
    from {
      transform: translateY(-10vh) rotate(0deg);
    }
    to {
      transform: translateY(110vh) rotate(360deg);
    }
  }
.snowflake {
    color: withe;
    filter: drop-shadow(0 0 2px rgba(0, 104, 255, 0.2)) 
            drop-shadow(0 0 1px rgba(0, 104, 255,  0.3));
    animation: verticalFall 8s linear infinite;
  }



  .snowflake:hover {
    filter: drop-shadow(0 0 3px rgba(0, 104, 255, , 0.3)) 
            drop-shadow(0 0 2px rgba(0, 104, 255,  0.2));
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .gift-spin {
    animation: spin 2s linear infinite;
  }
`;

const Snowflake = ({ style }) => {
  const snowflakeVariants = ['❄', '❅', '❆'];
  const randomSnowflake = snowflakeVariants[Math.floor(Math.random() * snowflakeVariants.length)];

  return (
    <div
      className="absolute text-white pointer-events-none snowflake"
      style={{
        ...style,
        willChange: 'transform',
      }}
    >
      {randomSnowflake}
    </div>
  );
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* <Gift className="w-6 h-6 text-red-500" /> */}
            <img src={gift} alt="Cadeau de Noël" className="mx-auto h-5 object-cover rounded-xl " />
            <span className="font-semibold text-xl">GIFT.CM</span>
          </div>

          {/* Menu burger pour mobile */}
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

          {/* Navigation desktop */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="flex items-center space-x-1 hover:text-red-500 transition-colors">
              {/* <Home className="w-4 h-4" /> */}
              <span>ACCUEIL</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-red-500 transition-colors">

              <span>GUIDE</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-red-500 transition-colors">

              <span>A PROPOS</span>
            </a>

          </div>

          {/* <button className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all">
            <User className="w-4 h-4" />
            <span>SIGN UP FREE</span>
          </button> */}
        </div>

        {/* Menu mobile */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
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
              <User className="w-4 h-4" />
              <span>SIGN UP FREE</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center transition-opacity duration-1000 z-50">
      <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
        <div className="">
          <img src={gift} alt="Cadeau de Noël" className="mx-auto mb-4 h-20 object-cover rounded-xl animate-bounce-slow" />

          {/*  <Gift className="w-12 h-12 text-red-500" /> */}
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {

  const Navigate = useNavigate();

  const sendGift = () => {
    Navigate("/Amount")
  }
  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between mt-32 mb-16 bg-rgb(225, 225, 225)">
      <div className="max-w-xl w-full md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 text-center md:text-left">
          LE CADEAU
          <br />
          <span className="text-indigo-900">PARFAIT 🎁💸</span>
          <br />
          CHAQUE FOIS
        </h1>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed text-center md:text-left">
          En cette période de Noël, éveillez la joie avec une nouvelle facçon de faire des cadeaux.
          Faites de ce Noël une fête mémorable en offrant exactement ce qu'ils désirent.
          Partagez la magie de Noël et regardez vos cadeaux illuminer vos proches.
          Avec nous, c'est rapide, facile et inoubliable !
        </p>
        <div className="flex justify-center md:justify-start" onClick={sendGift}>
          <button className="flex items-center space-x-2 px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl">
            <Gift className="w-5 h-5" />
            <span>Envoyer un cadeau</span>
          </button>
        </div>
      </div>
      <div className="flex-1 mt-8 md:mt-0 md:ml-16">
        <img
          src={image}
          alt="Red gift box with gold bow"
          className="w-full max-w-md mx-auto object-contain animate-bounce-slow"
        />
      </div>
    </div>
  );
};

const WelcomePage = () => {
  const [loading, setLoading] = useState(true);
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const generateSnowflake = () => ({
      id: Math.random(),
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.4 + 0.6,
      fontSize: `${Math.random() * 12 + 10}px`,
      rotation: Math.random() * 360,
    });

    const addSnowflake = () => {
      setSnowflakes(prev => [...prev, generateSnowflake()]);
    };

    const interval = setInterval(addSnowflake, 400);
    const cleanup = setInterval(() => {
      setSnowflakes(prev => prev.slice(-30));
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
        <Loader loading={loading} />

        {!loading && snowflakes.map(snowflake => (
          <Snowflake
            key={snowflake.id}
            style={{
              left: snowflake.left,
              animationDelay: snowflake.delay,
              opacity: snowflake.opacity,
              fontSize: snowflake.fontSize,
              transform: `rotate(${snowflake.rotation}deg)`,
            }}
          />
        ))}

        <Navigation />
        <HeroSection />
      </div>
    </>
  );
};

export default WelcomePage;