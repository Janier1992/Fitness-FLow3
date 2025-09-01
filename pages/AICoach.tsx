import React, { useState, useRef, useEffect } from 'react';
import { getAICoachResponse } from '../services/geminiService';
import { type ChatMessage } from '../types';

const AiIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
        AI
    </div>
);

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
        TÚ
    </div>
);

const AIMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex gap-3 my-4">
        <AiIcon />
        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-slate-200 max-w-lg">
            <p className="text-slate-700 whitespace-pre-wrap">{text}</p>
        </div>
    </div>
);

const UserMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex gap-3 my-4 justify-end">
        <div className="bg-brand-primary text-white p-3 rounded-lg rounded-br-none shadow-sm max-w-lg">
            <p className="whitespace-pre-wrap">{text}</p>
        </div>
        <UserIcon />
    </div>
);


export const AICoach: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            sender: 'ai',
            text: '¡Hola, Janier! 👋 Soy tu AI Coach personal de FitnessFlow.\n\nEstoy aquí para ayudarte a:\n• 💪 Optimizar tus entrenamientos\n• 📈 Analizar tu progreso\n• 🎯 Ajustar tus objetivos\n• 💡 Darte consejos personalizados\n\n¿En qué puedo ayudarte hoy?',
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await getAICoachResponse(input);
            const aiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { sender: 'ai', text: 'Lo siento, hubo un error al procesar tu solicitud.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">AI Coach Personal</h1>
                <p className="mt-2 text-lg text-slate-600 max-w-2xl">Tu asistente virtual para alcanzar tus objetivos fitness</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chat Column */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[70vh]">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                                <span className="text-white text-xl">🧠</span>
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-800">AI Coach FitnessFlow ✨</h2>
                                <p className="text-sm text-green-600 font-semibold">En línea</p>
                            </div>
                        </div>
                    </div>
                    {/* Messages */}
                    <div className="flex-grow p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            msg.sender === 'ai' ? <AIMessage key={index} text={msg.text} /> : <UserMessage key={index} text={msg.text} />
                        ))}
                        {isLoading && (
                            <div className="flex gap-3 my-4">
                                <AiIcon />
                                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    {/* Input */}
                    <div className="p-4 border-t border-slate-200">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Escribe tu pregunta sobre fitness..."
                                className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded-full focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading} className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-white bg-brand-primary rounded-full hover:bg-brand-secondary disabled:bg-slate-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                 <div className="space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-3">💡 Recomendaciones</h3>
                        <div className="text-center text-slate-500 py-6">
                            <p>No hay recomendaciones activas</p>
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-3">🤔 Pregúntame sobre...</h3>
                        <ul className="space-y-2 text-sm">
                            {['¿Cómo mejorar mi técnica de sentadillas?', 'Rutina para ganar masa muscular', 'Consejos de nutrición post-entrenamiento', '¿Cuánto descanso necesito?'].map(q => (
                                <li key={q} onClick={() => handleSuggestionClick(q)} className="cursor-pointer text-slate-600 hover:text-brand-primary transition-colors">{q}</li>
                            ))}
                        </ul>
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-3">📈 Tu Progreso</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                           <li className="flex justify-between"><span>Consultas este mes</span> <span className="font-bold text-slate-800">12</span></li>
                           <li className="flex justify-between"><span>Objetivos alcanzados</span> <span className="font-bold text-slate-800">3</span></li>
                           <li className="flex justify-between"><span>Días con AI Coach</span> <span className="font-bold text-slate-800">7</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};