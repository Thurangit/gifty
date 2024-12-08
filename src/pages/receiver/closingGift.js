import React, { useState, useEffect } from 'react';
import Snowfall from '../../modules/snowFall';
import gift from '../../composants/images/one_gift.png';
import { useNavigate } from 'react-router';
const ClosingGift = ({
    imageUrl = gift,
    imageSize = "w-20 h-20"
}) => {
    const [isOpening, setIsOpening] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const openingTimer = setTimeout(() => {
            setIsOpening(false);
            const revealTimer = setTimeout(() => {
                setIsOpen(true);
            }, 600);
            return () => clearTimeout(revealTimer);
        }, 10000);

        return () => clearTimeout(openingTimer);
    }, []);

    const page = (page) => {
        navigate(page)
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4" onClick={() => page("/The/Gift")}>
            <div className="w-full max-w-md text-center">
                {isOpening ? (
                    <div className="animate-pulse text-3xl font-['Dancing_Script'] text-gray-800 
            sm:text-4xl md:text-5xl transition-all duration-500">
                        Un cadeau pour toi...
                    </div>
                ) : (
                    <div className={`
            transition-all duration-1000 transform
            ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
            flex flex-col items-center justify-center
          `}>
                        <div className={`mb-6 mx-auto animate-bounce ${imageSize}`}>
                            <img
                                src={imageUrl}
                                alt="Gift"
                                className={`w-full h-full`}
                            />
                        </div>

                        <p className="text-lg sm:text-xl md:text-2xl font-['Dancing_Script'] text-gray-600 
              max-w-full px-4 leading-relaxed">
                            Vous avez reçu un cadeau de Junior Thuran ! Quelque chose de spécial t'attend. Clic pour l'ouvrir...!
                        </p>
                    </div>
                )}
            </div>
            <Snowfall snowflakeCount={200} />
        </div>
    );
};

export default ClosingGift;