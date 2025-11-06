
import React, { useState } from 'react';
import { Promotion } from '../../types';
import PromotionFormModal from './PromotionFormModal';
import { PlusIcon, PencilIcon, TrashIcon } from '../icons/icons';

interface SettingsViewProps {
    promotions: Promotion[];
    setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;
    logActivity: (action: string) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ promotions, setPromotions, logActivity }) => {
    const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

    const handleSavePromotion = (promo: Promotion) => {
        if (selectedPromo) {
            setPromotions(promotions.map(p => p.id === promo.id ? promo : p));
            logActivity(`Updated promotion: ${promo.name}`);
        } else {
            const newPromo = { ...promo, id: `PROMO-${Date.now()}` };
            setPromotions([...promotions, newPromo]);
            logActivity(`Created new promotion: ${newPromo.name}`);
        }
        setIsPromoModalOpen(false);
        setSelectedPromo(null);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Settings</h1>
            
            <div className="bg-surface p-6 rounded-xl shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Promotions</h2>
                     <button onClick={() => { setSelectedPromo(null); setIsPromoModalOpen(true); }} className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg">
                        <PlusIcon className="w-5 h-5"/>
                        <span>New Promotion</span>
                    </button>
                </div>
                <ul className="divide-y">
                    {promotions.map(promo => (
                        <li key={promo.id} className="py-2 flex justify-between items-center">
                            <span>{promo.name} ({promo.type === 'percentage' ? `${promo.value}%` : `$${promo.value.toFixed(2)}`} off)</span>
                             <div className="space-x-2">
                                <button onClick={() => { setSelectedPromo(promo); setIsPromoModalOpen(true); }} className="text-primary p-2 hover:bg-gray-100 rounded-full"><PencilIcon className="w-5 h-5"/></button>
                                <button className="text-danger p-2 hover:bg-gray-100 rounded-full"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            {isPromoModalOpen && <PromotionFormModal promotion={selectedPromo} onClose={() => setIsPromoModalOpen(false)} onSave={handleSavePromotion} />}
        </div>
    );
};

export default SettingsView;
