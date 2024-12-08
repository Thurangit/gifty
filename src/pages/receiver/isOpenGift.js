import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer } from 'vaul';

// Logos (remplacez par vos propres liens)
const LOGOS = {
    orange: 'https://example.com/orange-logo.png',
    mtn: 'https://example.com/mtn-logo.png',
    creditCard: 'https://example.com/credit-card-logo.png',
    paypal: 'https://example.com/paypal-logo.png'
};

const IsOpenGift = () => {
    // État pour le montant du cadeau reçu
    const [giftAmount, setGiftAmount] = useState(25000); // Montant du cadeau par défaut

    const [proverbText, setProverbText] = useState('');
    const [textColor, setTextColor] = useState('');
    const [amountColor, setAmountColor] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [formData, setFormData] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const proverbOriginal = "Un cadeau n'est pas mesuré par sa valeur, mais par l'amour et l'intention de faire plaisir qui l'accompagnent.";

    // Couleurs aléatoires pour l'animation de texte
    const randomColors = ['text-red-500', 'text-blue-500', 'text-pink-500'];

    useEffect(() => {
        // Définir le texte et choisir une couleur aléatoire
        setProverbText(proverbOriginal);
        setTextColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
        setAmountColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
    }, []);

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Préparer les données du formulaire
        const submissionData = {
            giftAmount,
            paymentMethod: selectedPaymentMethod,
            ...formData
        };

        // Afficher les données dans la console
        console.log('Données de soumission:', submissionData);

        try {
            // Simulation d'envoi sécurisé 
            const response = await fetch('/api/gift-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': 'votre-token-csrf-ici'
                },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                setIsSubmitted(true);
                setShowSuccessMessage(true);

                // Faire disparaître le message après 3 secondes
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Transaction failed', error);
        }
    };

    const renderPaymentForm = () => {
        return (
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
            >
                {/* Champ de montant non modifiable */}
                <div className="w-full p-3 rounded-xl border bg-gray-100 text-center">
                    Montant du cadeau: {giftAmount} XAF
                </div>

                {/* Formulaires spécifiques aux méthodes de paiement */}
                {selectedPaymentMethod === 'orange' && (
                    <input
                        type="tel"
                        placeholder="Numéro Orange Money"
                        className="w-full p-3 rounded-xl border"
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                )}

                {selectedPaymentMethod === 'mtn' && (
                    <input
                        type="tel"
                        placeholder="Numéro MTN Mobile Money"
                        className="w-full p-3 rounded-xl border"
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                )}

                {selectedPaymentMethod === 'creditCard' && (
                    <>
                        <input
                            type="text"
                            placeholder="Nom sur la carte"
                            className="w-full p-3 rounded-xl border"
                            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Numéro de carte"
                            className="w-full p-3 rounded-xl border"
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        />
                    </>
                )}

                {selectedPaymentMethod === 'paypal' && (
                    <input
                        type="email"
                        placeholder="Email PayPal"
                        className="w-full p-3 rounded-xl border"
                        onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
                    />
                )}
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md text-center space-y-6">
                {/* Vidéo ou Image */}
                <video
                    autoPlay
                    muted
                    loop
                    className="mx-auto mb-4 w-40 h-40 object-cover rounded-xl"
                >
                    <source src="votre-lien-video.mp4" type="video/mp4" />
                </video>

                {/* Texte du proverbe */}
                <p
                    id="proverb"
                    className={`text-lg font-serif ${textColor} mb-2`}
                >
                    {proverbText.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </p>

                {/* Montant du cadeau */}
                <p
                    className={`text-2xl font-bold ${textColor}`}
                >
                    {`${giftAmount} XAF`.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </p>

                {/* Bouton d'ouverture des options de paiement */}
                <Drawer.Root>
                    <Drawer.Trigger
                        className="w-full p-3 rounded-xl bg-red-500 text-white"
                    >
                        Choisir un mode de paiement
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                        <Drawer.Content className="bg-white/90 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                            <div className="p-4 bg-white/90 rounded-t-[10px]">
                                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4" />
                                <div className="max-w-md mx-auto">
                                    <h2 className="text-xl font-bold mb-4">Choisissez votre mode de paiement</h2>

                                    {/* Boutons de méthodes de paiement */}
                                    <div className="flex justify-between space-x-2 mb-4">
                                        {Object.keys(LOGOS).map(method => (
                                            <button
                                                key={method}
                                                onClick={() => handlePaymentMethodSelect(method)}
                                                className={`flex flex-col items-center p-2 rounded-xl ${selectedPaymentMethod === method ? 'bg-red-100' : 'bg-gray-100'}`}
                                            >
                                                <img
                                                    src={LOGOS[method]}
                                                    alt={method}
                                                    className="w-12 h-12 object-contain"
                                                />
                                                <span className="text-xs mt-2 capitalize">{method}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Formulaire de la méthode sélectionnée */}
                                    <AnimatePresence>
                                        {selectedPaymentMethod && (
                                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                                {renderPaymentForm()}
                                                <button
                                                    type="submit"
                                                    className="w-full bg-red-500 text-white p-3 rounded-xl"
                                                >
                                                    Recevoir le Cadeau
                                                </button>
                                            </form>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>

                {/* Message de succès */}
                <AnimatePresence>
                    {showSuccessMessage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="fixed inset-0 bg-white/90 flex items-center justify-center z-50"
                        >
                            <div className="text-center">
                                <motion.h2
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl font-bold text-red-500"
                                >
                                    Félicitations !
                                </motion.h2>
                                <motion.p
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-xl"
                                >
                                    Votre cadeau de {giftAmount} XAF a été reçu avec succès
                                </motion.p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default IsOpenGift;