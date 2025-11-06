
import React from 'react';
import { Shift } from '../../types';
import Modal from '../common/Modal';

interface ZReportModalProps {
    shift: Shift;
    onClose: () => void;
}

const ZReportModal: React.FC<ZReportModalProps> = ({ shift, onClose }) => {
    return (
        <Modal title="Z-Report (End of Shift)" onClose={onClose}>
            <div className="space-y-2">
                <h2 className="font-bold">Shift Summary</h2>
                <p><strong>Start Time:</strong> {new Date(shift.startTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date().toLocaleString()}</p>
                <div className="border-t pt-2 mt-2">
                    <p><strong>Starting Cash:</strong> ${shift.startCash.toFixed(2)}</p>
                    {/* Add more financial details here */}
                </div>
                <div className="flex justify-end pt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-primary text-white rounded-lg">Close Shift</button>
                </div>
            </div>
        </Modal>
    );
};

export default ZReportModal;
