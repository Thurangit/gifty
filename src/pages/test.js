import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
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
import { Copy, Check } from 'lucide-react';

const LinkSharingApp = () => {
    const [url, setUrl] = useState('https://exemple.com/mon-super-lien-a-partager');
    const [animationComplete, setAnimationComplete] = useState(false);
    const [copied, setCopied] = useState(false);

    // Configuration de l'application
    const appConfig = {
        logo: '/path/to/logo.png', // Remplacez par votre logo
        logoSize: 150, // Taille du logo configurable
        slogan: 'Partagez vos liens en un clic !',
        shareUrl: 'https://exemple.com/mon-super-lien-a-partager' // URL par défaut à partager
    };

    useEffect(() => {
        // Animation d'ouverture
        const animationTimer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1000);

        return () => clearTimeout(animationTimer);
    }, []);

    // Fonction pour copier l'URL
    const copyUrlToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Réinitialise après 2 secondes
        });
    };

    // Fonctions de partage précédentes (SMS, Instagram, etc.) restent identiques

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
                {/* Logo (reste identique) */}
                <div className={`
          flex justify-center mb-4 
          transition-all duration-1000 
          ${animationComplete ? 'translate-y-0' : '-translate-y-10'}
        `}>
                    <img
                        src={appConfig.logo}
                        alt="Logo"
                        className="rounded-full shadow-lg"
                        style={{
                            width: `${appConfig.logoSize}px`,
                            height: `${appConfig.logoSize}px`
                        }}
                    />
                </div>

                {/* Slogan (reste identique) */}
                <h1 className={`
          text-2xl font-bold mb-6 text-gray-800
          transition-all duration-1000
          ${animationComplete ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
        `}>
                    {appConfig.slogan}
                </h1>

                {/* QR Code (reste identique) */}
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

                {/* Boutons de partage (reste identique) */}
                <div className={`
          flex justify-center space-x-4 
          transition-all duration-1000
          ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}>
                    {/* ... (boutons de partage précédents) ... */}
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
        </div>
    );
};

export default LinkSharingApp;