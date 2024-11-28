import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import gift from '../../composants/images/one_gift.png';
import { useNavigate } from 'react-router';
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

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
            <div className="w-full max-w-md text-center">
                {/* Gif de Noël */}
                <img src={gift} alt="Cadeau de Noël" className="mx-auto mb-4 h-20 object-cover rounded-xl animate-bounce-slow" />
                {/* Proverbe animé */}
                <p id="proverb" className="text-sm text-gray-600 mb-6 h-16 px-4">
                    {proverbText.split('').map((char, index) => (
                        <span key={index} style={{ opacity: 0.5, transition: 'color 3s' }}>{char}</span>
                    ))}
                </p>
                {/* Champ de saisie */}
                <input type="text" value={amount} onChange={handleAmountChange} placeholder="Montant du cadeau (1000 - 500000 XAF)" className={`w-full p-3 rounded-xl text-center border-2 ${showError ? 'border-red-500 placeholder-red-500' : 'border-red-300'} focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300 ease-in-out`} />
                {/* Bouton de confirmation */}
                {isValid && (
                    <button onClick={() => page('/Select/Gift')} className="mt-4 w-full bg-red-600 text-white p-3 rounded-xl flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 animate-fade-in" >
                        Confirmer le montant <Gift className="ml-3" />
                    </button>
                )}
            </div>
            {/* Flocons de neige rouges à l'extérieur du formulaire */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(50)].map((_, i) => (
                    <div key={i} className="absolute bg-red-200 rounded-full animate-snow" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 10}s`, width: `${Math.random() * 4}px`, height: `${Math.random() * 4}px` }} />
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
        </div>
    );
};

export default AmountGift;
