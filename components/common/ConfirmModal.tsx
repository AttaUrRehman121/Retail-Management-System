
import React from 'react';
import Modal from './Modal';

interface ConfirmModalProps {
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, message, onClose, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
    return (
        <Modal title={title} onClose={onClose}>
            <div>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">{cancelText}</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-danger text-white rounded-lg">{confirmText}</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
