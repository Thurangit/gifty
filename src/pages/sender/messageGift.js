import React, { useState, useEffect, useCallback } from 'react';
import { Shuffle, Check, Phone, CreditCard, Users, Pencil, WrenchIcon, NotebookPen, PenBoxIcon, PenLineIcon, ArrowRightCircle, ArrowLeftCircle } from 'lucide-react';
import { predefinedTexts } from '../../modules/text';
import DOMPurify from 'dompurify';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import om from '../../composants/images/operators/om.avif'
import momo from '../../composants/images/operators/momo.jpeg'

import i1 from '../../composants/images/001.gif'
import i2 from '../../composants/images/002.png'
// ... (import other images as in the original code)
import i13 from '../../composants/images/013.gif'
import Snowfall from '../../modules/snowFall';

const MessageGift = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [textareaContent, setTextareaContent] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const { gift, amount } = useParams();
    const [formData, setFormData] = useState({
        message: '',
        phoneNumber: '',
        amount: amount,
        operator: '',
        gift_: gift,
    });

    const operators = [
        {
            id: 'orange',
            name: 'Orange',
            logo: om,
            color: 'bg-orange-500'
        },
        {
            id: 'mtn',
            name: 'MTN',
            logo: momo,
            color: 'bg-yellow-500'
        },
    ];

    // Page transition variants
    const pageVariants = {
        initial: { opacity: 0, x: "-100%" },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: "100%" }
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };

    // Gestion sécurisée de l'affichage du texte
    const sanitizeAndTruncateText = useCallback((text, maxLength = 200) => {
        const sanitizedText = DOMPurify.sanitize(text);
        return sanitizedText.length > maxLength
            ? sanitizedText.substring(0, maxLength) + '...'
            : sanitizedText;
    }, []);

    // Gestion de l'animation du texte
    useEffect(() => {
        const safeText = sanitizeAndTruncateText(textareaContent);

        let timer;
        if (safeText.length > displayedText.length) {
            timer = setTimeout(() => {
                setDisplayedText(safeText.slice(0, displayedText.length + 1));
            }, 50);
        } else if (safeText.length < displayedText.length) {
            timer = setTimeout(() => {
                setDisplayedText(safeText.slice(0, displayedText.length - 1));
            }, 50);
        }
        return () => clearTimeout(timer);
    }, [textareaContent, displayedText, sanitizeAndTruncateText]);

    // Validation du premier step
    const isFirstStepValid = () => {
        return textareaContent.trim().length > 10 && textareaContent.trim().length <= 200;
    };

    // Validation du deuxième step
    const isSecondStepValid = () => {
        const phoneRegex = /^\d{9}$/; // Exactly 9 digits
        const amountRegex = /^\d+$/; // Only positive integers

        return (
            phoneRegex.test(formData.phoneNumber) &&
            amountRegex.test(formData.amount) &&
            formData.amount !== '0' &&
            formData.operator !== ''
        );
    };

    // Gérer les changements du formulaire avec validation stricte
    const handleChange = (e, type) => {
        const { name, value } = e.target;

        if (type === 'message') {
            const sanitizedText = sanitizeAndTruncateText(value, 200);
            setTextareaContent(sanitizedText);
            setDisplayedText(sanitizedText);
        } else if (type === 'phone') {
            // Uniquement des chiffres, maximum 9 caractères
            const sanitizedPhone = value.replace(/[^\d]/g, '').slice(0, 9);
            setFormData(prev => ({
                ...prev,
                [name]: sanitizedPhone
            }));
        } else if (type === 'amount') {
            // Uniquement des entiers positifs
            const sanitizedAmount = value.replace(/[^\d]/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: sanitizedAmount
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Sélection de texte aléatoire
    const handleRandomText = () => {
        const randomText = predefinedTexts[Math.floor(Math.random() * predefinedTexts.length)];
        const safeRandomText = sanitizeAndTruncateText(randomText, 200);
        setTextareaContent(safeRandomText);
        setDisplayedText(safeRandomText);
    };

    // Navigation entre les étapes
    const goToNextStep = () => {
        if (isFirstStepValid()) {
            setFormData(prev => ({
                ...prev,
                message: sanitizeAndTruncateText(textareaContent, 200)
            }));
            setStep(2);
        }
    };

    // Sélection de l'opérateur
    const handleOperatorSelect = (operatorId) => {
        setFormData(prev => ({ ...prev, operator: operatorId }));
    };

    // Soumission du formulaire avec protection avancée
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSecondStepValid()) {
            // Protection contre les injections SQL et XSS
            const sanitizedData = {
                message: DOMPurify.sanitize(formData.message)
                    .replace(/[;'"\\%_]/g, ''),
                phoneNumber: formData.phoneNumber.replace(/[^\d]/g, ''),
                amount: parseInt(formData.amount, 10),
                operator: DOMPurify.sanitize(formData.operator)
                    .replace(/[;'"\\%_]/g, ''),
                gift_: gift,
            };

            // Préparation pour envoi sécurisé
            console.log('Données sécurisées:', sanitizedData);

            // Simulation d'envoi avec fetch (à adapter)
            // fetch('/api/secure-endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'X-CSRF-Token': 'your-csrf-token'
            //     },
            //     body: JSON.stringify(sanitizedData)
            // });
        }
    };

    // Fonction pour récupérer l'image correspondante
    const getGiftImage = (giftId) => {
        const imageMap = {
            "Gifty-App-Maker-CM-Ed-Val-Js-0001": i1,
            "Gifty-App-Maker-CM-Ed-Val-Js-0002": i2,
            // ... mappage des autres images
            "Gifty-App-Maker-CM-Ed-Val-Js-0013": i13
        };
        return imageMap[giftId] || i1; // Image par défaut si non trouvée
    };

    const page = (page) => {
        navigate(page);
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden"
        >
            <div className="w-full max-w-md text-center space-y-6">
                {/* Image de cadeau */}
                <img
                    src={getGiftImage(gift)}
                    alt="Gift Animation"
                    className="mx-auto mb-4 h-20 w-40 object-contain rounded-xl"
                />

                {/* Zone de texte animée avec troncature */}
                <div className="h-20 text-gray-600 mb-4 px-4 text-center overflow-hidden">
                    {displayedText}
                </div>

                <AnimatePresence>
                    <motion.form
                        key={step}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                    >
                        {step === 1 && (
                            <div className="space-y-4">
                                <textarea
                                    value={textareaContent}
                                    onChange={(e) => handleChange(e, 'message')}
                                    placeholder="Entrez votre message (10-200 caractères)"
                                    maxLength={200}
                                    className="w-full p-3 rounded-xl border-2 border-red-300 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300 h-40 resize-none"
                                />

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={handleRandomText}
                                        className="flex-1 bg-blue-500 text-white p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                                    >
                                        <PenLineIcon className="mr-2" /> Ecrire pour vous
                                    </button>

                                    <button
                                        type="button"
                                        onClick={goToNextStep}
                                        disabled={!isFirstStepValid()}
                                        className={`flex-1 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${isFirstStepValid()
                                            ? 'bg-green-500 hover:bg-green-600 cursor-pointer'
                                            : 'bg-gray-300 cursor-not-allowed'
                                            }`}
                                    >
                                        Suivant <ArrowRightCircle className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="space-y-4">
                                    {/* Logos des opérateurs */}
                                    <div className="flex justify-center space-x-4 mb-6">
                                        {operators.map((operator) => (
                                            <div
                                                key={operator.id}
                                                onClick={() => handleOperatorSelect(operator.id)}
                                                className={`
                                                    w-20 h-20 rounded-full flex items-center justify-center cursor-pointer
                                                    transition-all duration-300 ease-in-out
                                                    ${formData.operator === operator.id
                                                        ? `${operator.color} ring-4 ring-opacity-50 scale-110`
                                                        : 'bg-gray-200 hover:bg-gray-300'}
                                                `}
                                            >
                                                <img
                                                    src={operator.logo}
                                                    alt={`Logo ${operator.name}`}
                                                    className="w-2/3 h-2/3 object-contain"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={(e) => handleChange(e, 'phone')}
                                            placeholder="Numéro de téléphone (9 chiffres)"
                                            pattern="\d{9}"
                                            className="w-full p-3 pl-10 rounded-xl border-2 border-red-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                                        />
                                    </div>

                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={(e) => handleChange(e, 'amount')}
                                            placeholder="Montant"
                                            pattern="\d+"
                                            className="w-full p-3 pl-10 rounded-xl border-2 border-red-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 bg-red-500 text-white p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                                    >
                                        <ArrowLeftCircle className="mr-2" /> Retour
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={!isSecondStepValid()}
                                        onClick={() => page('/Share/Gift')}
                                        className={`flex-1 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${isSecondStepValid()
                                            ? 'bg-green-500 hover:bg-green-600 cursor-pointer'
                                            : 'bg-gray-300 cursor-not-allowed'
                                            }`}
                                    >
                                        Confirmer <Check className="ml-2" />
                                    </button>
                                </div>

                            </div>
                        )}
                    </motion.form>
                </AnimatePresence>

            </div>

            {/* Animation de neige */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-red-200 rounded-full animate-snow"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            width: `${Math.random * 4}px`,
                            height: `${Math.random() * 4}px`
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
                @keyframes snowfall { 
                    0% { transform: translateY(-10vh) rotate(0deg); } 
                    100% { transform: translateY(110vh) rotate(360deg); } 
                }
                .animate-snow { 
                    animation: snowfall 10s linear infinite; 
                }
                @keyframes bounceAnimation {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounceAnimation 2s ease-in-out infinite;
                }
            `}</style>
        </motion.div>
    );
};

export default MessageGift;