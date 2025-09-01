import React, { useState, useEffect } from 'react';

type PaymentStep = 'form' | 'processing' | 'success';

export const PSEPaymentModal: React.FC<{ onClose: () => void; onPaymentSuccess: () => void }> = ({ onClose, onPaymentSuccess }) => {
    const [step, setStep] = useState<PaymentStep>('form');

    useEffect(() => {
        if (step === 'processing') {
            const timer = setTimeout(() => {
                setStep('success');
            }, 3000);
            return () => clearTimeout(timer);
        }
        if (step === 'success') {
            const timer = setTimeout(() => {
                onPaymentSuccess();
                // onClose will be handled by the parent component after state update
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [step, onPaymentSuccess]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                {step === 'form' && (
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-slate-800">Pago con PSE</h2>
                            <p className="text-sm text-slate-500">Serás redirigido a la pasarela de pagos.</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label htmlFor="bank" className="block text-sm font-medium text-slate-700 mb-1">Selecciona tu banco</label>
                                <select id="bank" className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-primary">
                                    <option>Bancolombia</option>
                                    <option>Davivienda</option>
                                    <option>BBVA</option>
                                    <option>Banco de Bogotá</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="docType" className="block text-sm font-medium text-slate-700 mb-1">Tipo de documento</label>
                                <select id="docType" className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-primary">
                                    <option>Cédula de Ciudadanía</option>
                                    <option>Cédula de Extranjería</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="docNumber" className="block text-sm font-medium text-slate-700 mb-1">Número de documento</label>
                                <input type="text" id="docNumber" className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary" placeholder="123456789"/>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancelar</button>
                            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-brand-primary rounded-lg hover:bg-brand-secondary">Pagar con PSE</button>
                        </div>
                    </form>
                )}
                {step === 'processing' && (
                    <div className="p-12 flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 border-4 border-brand-primary border-solid border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-600 font-semibold">Procesando tu pago...</p>
                        <p className="text-slate-500 text-sm">Por favor espera un momento.</p>
                    </div>
                )}
                {step === 'success' && (
                     <div className="p-12 flex flex-col items-center justify-center gap-4 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">¡Pago Exitoso!</h3>
                        <p className="text-slate-600">Tu suscripción ha sido activada. ¡Gracias!</p>
                    </div>
                )}
            </div>
        </div>
    );
};