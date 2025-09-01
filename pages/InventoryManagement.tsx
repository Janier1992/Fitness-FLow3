import React, { useState } from 'react';

interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    status: 'Disponible' | 'En Mantenimiento' | 'Fuera de Servicio';
}

const initialInventory: InventoryItem[] = [
    { id: 1, name: 'Mancuernas de 10kg', quantity: 8, status: 'Disponible' },
    { id: 2, name: 'Barra Olímpica', quantity: 4, status: 'Disponible' },
    { id: 3, name: 'Caminadora ProForm 500', quantity: 2, status: 'En Mantenimiento' },
    { id: 4, name: 'Banco de Press', quantity: 3, status: 'Disponible' },
    { id: 5, name: 'Pesa Rusa 16kg', quantity: 5, status: 'Disponible' },
];

const statusColors = {
    'Disponible': 'bg-green-100 text-green-800',
    'En Mantenimiento': 'bg-yellow-100 text-yellow-800',
    'Fuera de Servicio': 'bg-red-100 text-red-800',
};

export const InventoryManagement: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredInventory = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Gestión de Inventario</h1>
                    <p className="mt-2 text-lg text-slate-600">Administra el equipamiento de tu gimnasio en tiempo real.</p>
                </div>
                <button className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Añadir Equipo
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 mb-8">
                <input
                    type="text"
                    placeholder="Buscar equipo por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none"
                />
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-sm text-slate-600">
                            <tr>
                                <th className="p-4 font-semibold">ID</th>
                                <th className="p-4 font-semibold">Nombre del Equipo</th>
                                <th className="p-4 font-semibold text-center">Cantidad</th>
                                <th className="p-4 font-semibold text-center">Estado</th>
                                <th className="p-4 font-semibold text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map(item => (
                                <tr key={item.id} className="border-t border-slate-200">
                                    <td className="p-4 text-slate-500">{item.id}</td>
                                    <td className="p-4 font-medium text-slate-800">{item.name}</td>
                                    <td className="p-4 text-slate-700 text-center">{item.quantity}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[item.status]}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center space-x-2">
                                        <button className="text-slate-500 hover:text-brand-primary p-1">✏️</button>
                                        <button className="text-slate-500 hover:text-red-500 p-1">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};