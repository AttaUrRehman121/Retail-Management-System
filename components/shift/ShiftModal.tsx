
import React, { useState } from 'react';
import Modal from '../common/Modal';
import ZReportModal from './ZReportModal';
import { Shift } from '../../types';

interface ShiftModalProps {
    onClose: () => void;
}

const ShiftModal: React.FC<ShiftModalProps> = ({ onClose }) => {
    const [activeShift, setActiveShift] = useState<Shift | null>(null);
    const [isZReportVisible, setIsZReportVisible] = useState(false);

    const startShift = () => {
        const startCash = parseFloat(prompt('Enter starting cash amount:') || '0');
        if (!isNaN(startCash)) {
            const newShift: Shift = {
                id: `SHIFT-${Date.now()}`,
                startTime: new Date().toISOString(),
                startCash: startCash,
                salesTotal: 0,
                refundsTotal: 0,
                cashPayments: 0,
                cardPayments: 0,
                cashAdded: 0,
                cashRemoved: 0,
            };
            setActiveShift(newShift);
        }
    };
    
    const endShift = () => {
        // In a real app, you'd calculate all the totals here
        // For now, we'll just show the Z-Report modal
        setIsZReportVisible(true);
    };

    return (
        <Modal title="Shift Management" onClose={onClose}>
            {!activeShift ? (
                <div>
                    <p className="mb-4">No active shift. Would you like to start one?</p>
                    <button onClick={startShift} className="w-full bg-primary text-white p-3 rounded-lg">Start New Shift</button>
                </div>
            ) : (
                <div className="space-y-4">
                    <p>Shift started at: {new Date(activeShift.startTime).toLocaleTimeString()}</p>
                    <p>Starting cash: ${activeShift.startCash.toFixed(2)}</p>
                    <button onClick={endShift} className="w-full bg-danger text-white p-3 rounded-lg">End Shift & View Z-Report</button>
                </div>
            )}
            {isZReportVisible && activeShift && <ZReportModal shift={activeShift} onClose={() => { setIsZReportVisible(false); setActiveShift(null); onClose(); }} />}
        </Modal>
    );
};

export default ShiftModal;
