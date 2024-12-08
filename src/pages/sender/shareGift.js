import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import gift from '../../composants/images/one_gift.png';
import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon
} from 'react-share';
import { Check, Copy } from 'lucide-react';
import Snowfall from '../../modules/snowFall';
import { motion, AnimatePresence } from 'framer-motion';
import { urlApp } from '../../modules/urlApp';
const ShareGift = () => {// URL à partager
    const [animationComplete, setAnimationComplete] = useState(false);
    const [copied, setCopied] = useState(false);
    // Configuration de l'application
    const url = `${urlApp}/Open/The/Gift`;
    const appConfig = {
        logo: gift, // Remplacez par votre logo
        logoSize: 50, // Taille du logo configurable
        slogan: 'Scannez pour recevoir le cadeau !',
        shareUrl: `${urlApp}/Open/The/Gift` // URL par défaut à partager
    };

    useEffect(() => {
        // Animation d'ouverture
        const animationTimer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1000);

        return () => clearTimeout(animationTimer);
    }, []);

    // Fonction pour partage SMS (comportement natif du navigateur/appareil)
    const shareSMS = () => {
        const smsUrl = `sms:?body=${encodeURIComponent(appConfig.shareUrl)}`;
        window.location.href = smsUrl;
    };

    // Fonction pour partage Instagram (via lien web)
    const shareInstagram = () => {
        const instagramUrl = `https://www.instagram.com/create/select/?caption=${encodeURIComponent(appConfig.shareUrl)}`;
        window.open(instagramUrl, '_blank');
    };

    const copyUrlToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Réinitialise après 2 secondes
        });
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white overflow-hidden">
            {/* Animation de fleurs tombantes (à remplacer par votre animation) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                {/* Votre animation de fleurs */}
            </div>

            {/* Conteneur principal d'animation */}
            <div className={`
        w-full max-w-md p-6 text-center 
        transform transition-all duration-1000 
        ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}>
                {/* Logo */}
                <div className={`
          flex justify-center mb-4 
          transition-all duration-1000 
          ${animationComplete ? 'translate-y-0' : '-translate-y-10'}
        `}>

                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2 }}
                        src={gift}
                        alt="Cadeau de Noël"
                        style={{
                            width: `${appConfig.logoSize}px`,
                            height: `${appConfig.logoSize}px`
                        }}
                        className="mx-auto mb-4 h-20 object-cover rounded-xl animate-bounce-slow"
                    />
                </div>



                {/* Slogan */}
                <h1 className={`
          text-2xl font-bold mb-6 text-gray-800
          transition-all duration-1000
          ${animationComplete ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
        `}>
                    {appConfig.slogan}
                </h1>

                {/* QR Code */}
                <div className={`
          flex justify-center mb-6 z-50 relative
          transition-all duration-1000 
          ${animationComplete ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
        `}>
                    <QRCodeSVG
                        value={appConfig.shareUrl}
                        size={250}
                        className="shadow-xl rounded-xl"
                    />
                </div>

                {/* Boutons de partage */}
                <div className={`
          flex justify-center space-x-4 
          transition-all duration-1000
          ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}>
                    <WhatsappShareButton url={appConfig.shareUrl}>
                        <WhatsappIcon size={50} round />
                    </WhatsappShareButton>

                    <FacebookShareButton url={appConfig.shareUrl}>
                        <FacebookIcon size={50} round />
                    </FacebookShareButton>

                    <TelegramShareButton url={appConfig.shareUrl}>
                        <TelegramIcon size={50} round />
                    </TelegramShareButton>

                    <TwitterShareButton url={appConfig.shareUrl}>
                        <TwitterIcon size={50} round />
                    </TwitterShareButton>

                    {/* Boutons personnalisés pour SMS et Instagram */}
                    <button
                        onClick={shareSMS}
                        className="bg-green-500 rounded-full p-2 flex items-center justify-center"
                        title="Partager par SMS"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="white"
                        >
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                        </svg>
                    </button>

                    <button
                        onClick={shareInstagram}
                        className="bg-pink-500 rounded-full p-2 flex items-center justify-center"
                        title="Partager sur Instagram"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="white"
                        >
                            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 1.25 1.25A1.25 1.25 0 0 1 17.25 5.5M12 7a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3a3 3 0 0 0-3-3z" />
                        </svg>
                    </button>
                </div>

                {/* Nouveau composant de copie d'URL */}
                <div className="mt-6 flex items-center justify-center space-x-2">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            value={url}
                            readOnly
                            className="w-full p-2 pr-10 border rounded-md text-center bg-gray-100"
                        />
                        <button
                            onClick={copyUrlToClipboard}
                            className={`
                absolute right-2 top-1/2 -translate-y-1/2 
                transition-all duration-300 
                ${copied ? 'text-green-500' : 'text-gray-500 hover:text-blue-500'}
              `}
                        >
                            {copied ? (
                                <Check
                                    className="animate-ping absolute"
                                    size={24}
                                />
                            ) : (
                                <Copy size={24} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Animation de confirmation de copie */}
                {copied && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
                            Lien copié avec succès !
                        </div>
                    </div>
                )}


            </div>
            <Snowfall snowflakeCount={200} />
        </div>
    );
};

export default ShareGift;