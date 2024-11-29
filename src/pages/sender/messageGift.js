import React, { useState, useEffect } from 'react';
import { Gift, Shuffle, Check } from 'lucide-react';
import { predefinedTexts } from '../../modules/text';

const MessageGift = () => {
    // List of predefined texts to choose from randomly
   
    const [textareaContent, setTextareaContent] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [isValid, setIsValid] = useState(false);

    // Handle textarea input - animate text display
    useEffect(() => {
        let timer;
        if (textareaContent.length > displayedText.length) {
            timer = setTimeout(() => {
                setDisplayedText(textareaContent.slice(0, displayedText.length + 1));
            }, 50);
        }
        return () => clearTimeout(timer);
    }, [textareaContent, displayedText]);

    // Handle textarea change
    const handleTextChange = (e) => {
        setTextareaContent(e.target.value);
        setIsValid(e.target.value.trim().length > 10);
    };

    // Random text selection
    const handleRandomText = () => {
        const randomText = predefinedTexts[Math.floor(Math.random() * predefinedTexts.length)];
        setTextareaContent(randomText);
        setDisplayedText('');
    };

    // Confirm form submission (placeholder function)
    const handleConfirm = () => {
        if (isValid) {
            alert(`Texte confirmé: ${textareaContent}`);
            // Add your navigation or further processing logic here
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
            <div className="w-full max-w-md text-center space-y-6">
                {/* Animated GIF at the top */}
                <img 
                    src="/api/placeholder/300/200" 
                    alt="Gift Animation" 
                    className="mx-auto mb-4 h-10 w-40 object-cover rounded-xl"
                />

                {/* Animated Display Text */}
                <div className="h-20 text-gray-600 mb-4 px-4 text-center">
                    {displayedText}
                </div>

                {/* Textarea for Text Input */}
                <textarea 
                    value={textareaContent}
                    onChange={handleTextChange}
                    placeholder="Entrez votre message (minimum 10 caractères)"
                    className="w-full p-3 rounded-xl border-2 border-red-300 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300 h-40 resize-none"
                />

                {/* Button Container */}
                <div className="flex space-x-4">
                    {/* Random Text Button */}
                    <button 
                        onClick={handleRandomText}
                        className="flex-1 bg-red-500 text-white p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                    >
                        <Shuffle className="mr-2" /> Texte Aléatoire
                    </button>

                    {/* Confirm Button */}
                    <button 
                        onClick={handleConfirm}
                        disabled={!isValid}
                        className={`flex-1 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                            isValid 
                            ? 'bg-green-500 hover:bg-green-600 cursor-pointer' 
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        <Check className="mr-2" /> Confirmer
                    </button>
                </div>
            </div>

            {/* Snowfall Animation */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(100)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute bg-red-200 rounded-full animate-snow" 
                        style={{ 
                            left: `${Math.random() * 100}%`, 
                            animationDelay: `${Math.random() * 10}s`, 
                            width: `${Math.random() * 4}px`, 
                            height: `${Math.random() * 4}px` 
                        }} 
                    />
                ))}
            </div>

            {/* Custom Styles for Animations */}
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
        </div>
    );
};

export default MessageGift;