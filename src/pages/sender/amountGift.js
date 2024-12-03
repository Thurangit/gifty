import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import gift from '../../composants/images/one_gift.png';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Snowfall from '../../modules/snowFall';

const AmountGift = () => {
    const [amount, setAmount] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [showError, setShowError] = useState(false);
    const [proverbText, setProverbText] = useState('');
    const Navigate = useNavigate();
    const proverbOriginal = "Un cadeau n'est pas mesuré par sa valeur, mais par l'amour et l'intention de faire plaisir qui l'accompagnent.";

    useEffect(() => {
        // Affiche directement le texte complet du proverbe
        setProverbText(proverbOriginal);
    }, []);

    useEffect(() => {
        // Ajout de la classe pour l'animation de couleur
        const timer = setTimeout(() => {
            let textElement = document.getElementById('proverb');
            let charIndex = 0;
            const animateLetters = () => {
                if (charIndex < textElement.children.length) {
                    textElement.children[charIndex].style.color = '#FF0000';
                    charIndex++;
                    setTimeout(animateLetters, 5);  // 3 seconds for the whole text
                }
            };
            animateLetters();
        }, 1000); // Start after the initial text has appeared
        return () => clearTimeout(timer);
    }, []);

    const handleAmountChange = (e) => {
        // Supprime tous les caractères non numériques et les décimales 
        const value = e.target.value.replace(/[^0-9]/g, '');
        setAmount(value);
        const numValue = parseInt(value);
        const isValidAmount = numValue >= 1000 && numValue <= 500000;
        setIsValid(isValidAmount);
        setShowError(!isValidAmount && value !== '');
    };

    const page = page => {
        if (isValid) {
            Navigate(page)
        }
    }

    // Page transition variants
    const pageVariants = {
        initial: {
            opacity: 0,
            scale: 0.95,
            x: '-100%'
        },
        in: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        },
        out: {
            opacity: 0,
            scale: 1.05,
            x: '100%',
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                className="min-h-screen bg-white flex items-center justify-center p-4 relative"
            >

                <div className="w-full max-w-md text-center">
                    {/* Gif de Noël */}
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2 }}
                        src={gift}
                        alt="Cadeau de Noël"
                        className="mx-auto mb-4 h-20 object-cover rounded-xl animate-bounce-slow"
                    />
                    {/* Proverbe animé */}
                    <p id="proverb" className="text-sm text-gray-600 mb-6 h-16 px-4">
                        {proverbText.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                style={{ opacity: 0.5, transition: 'color 3s' }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </p>
                    {/* Champ de saisie */}
                    <motion.input
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Montant du cadeau (1000 - 500000 XAF)"
                        className={`w-full p-3 rounded-xl text-center border-2 ${showError ? 'border-red-500 placeholder-red-500' : 'border-red-300'} focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300 ease-in-out`}
                    />
                    {/* Bouton de confirmation */}
                    {isValid && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => page(`/Select/Gift/${amount}`)}
                            className="mt-4 w-full bg-red-600 text-white p-3 rounded-xl flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 animate-fade-in"
                        >
                            Confirmer le montant <Gift className="ml-3" />
                        </motion.button>
                    )}

                    <Snowfall snowflakeCount={200} />
                </div>
                {/* Flocons de neige rouges à l'extérieur du formulaire */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                opacity: 0,
                                y: -10,
                                x: `${Math.random() * 100}%`
                            }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                y: '110vh',
                                rotate: 360
                            }}
                            transition={{
                                duration: 10,
                                delay: Math.random() * 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute bg-red-200 rounded-full"
                            style={{
                                width: `${Math.random() * 4}px`,
                                height: `${Math.random() * 4}px`
                            }}
                        />
                    ))}
                </div>
                {/* Styles personnalisés */}
                <style jsx>{` 
                    @keyframes snowfall { 
                        0% { transform: translateY(-10vh) rotate(0deg); } 
                        100% { transform: translateY(110vh) rotate(360deg); } 
                    } 
                    .animate-snow { animation: snowfall 10s linear infinite; } 
                    @keyframes fadeIn { 
                        from { opacity: 0; transform: scale(0.8); } 
                        to { opacity: 1; transform: scale(1); } 
                    } 
                    .animate-fade-in { animation: fadeIn 0.5s ease-out; } 
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
};

export default AmountGift;