import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard,
    Wallet,
    Gift,
    Send,
    CheckCircle2,
    XCircle
} from 'lucide-react';

// Simulation d'un composant Snowfall (à remplacer par votre implémentation réelle)
const Snowfall = ({ snowflakeCount = 200 }) => {
    const generateSnowflakes = () => {
        return Array.from({ length: snowflakeCount }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 20 + 10}s`,
            size: `${Math.random() * 3 + 1}px`
        }));
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {generateSnowflakes().map((flake) => (
                <div
                    key={flake.id}
                    className="absolute bg-white rounded-full opacity-70"
                    style={{
                        left: flake.left,
                        top: '-10px',
                        width: flake.size,
                        height: flake.size,
                        animation: `fall ${flake.animationDuration} linear infinite`,
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
};

// Logos des méthodes de paiement (comme dans l'exemple précédent)
const OrangeLogo = () => (2);
const MTNLogo = () => (2);
const PayPalLogo = () => (2);
const BankCardLogo = () => (2);

const IsOpenGift = ({
    imageUrl = '/path/to/default/gift-image.png', // Image par défaut
    imageSize = "w-20 h-20"
}) => {
    const [isOpening, setIsOpening] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [withdrawalMethod, setWithdrawalMethod] = useState(null);
    const [formFields, setFormFields] = useState({});
    const [isWithdrawalComplete, setIsWithdrawalComplete] = useState(false);

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

    // Méthodes dynamiques pour gérer les champs de formulaire (comme précédemment)
    const handleFieldChange = (method, field, value) => {
        setFormFields(prev => ({
            ...prev,
            [method]: {
                ...prev[method],
                [field]: value
            }
        }));
    };

    // Configuration des champs par méthode de paiement (comme précédemment)
    const paymentMethodFields = {/* ... comme dans l'exemple précédent */ };

    const renderPaymentMethodFields = () => {/* ... comme dans l'exemple précédent */ };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4 relative">
            <Snowfall snowflakeCount={200} />

            <div className="w-full max-w-md text-center z-10">
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
                        {/* Contenu principal similaire à l'exemple précédent */}
                        <div className={`mb-6 mx-auto animate-bounce ${imageSize}`}>
                            <img
                                src={imageUrl}
                                alt="Gift"
                                className={`w-full h-full`}
                            />
                        </div>

                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-['Dancing_Script'] text-gray-800 mb-4">
                            Surprise!
                        </h3>

                        <p className="text-lg sm:text-xl md:text-2xl font-['Dancing_Script'] text-gray-600 
              max-w-full px-4 leading-relaxed text-center">
                            Vous avez reçu un cadeau spécial ! Quelque chose de spécial t'attend.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setIsWithdrawModalOpen(true);
                            }}
                            className={`
                mt-6 w-full py-3 rounded-lg text-white font-bold transition-all 
                ${isWithdrawalComplete
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                }
              `}
                        >
                            {isWithdrawalComplete ? 'Cadeau Envoyé' : 'Retirer le Cadeau'}
                        </motion.button>
                    </div>
                )}

                {/* Modal de retrait (similaire à l'exemple précédent) */}
                <AnimatePresence>
                    {isWithdrawModalOpen && !isWithdrawalComplete && (
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween" }}
                            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl p-6 z-50 overflow-y-auto"
                        >
                            {/* Méthodes de paiement et champs (comme précédemment) */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default IsOpenGift;