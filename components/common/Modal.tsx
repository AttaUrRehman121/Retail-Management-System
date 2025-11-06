import React from 'react';
import { XIcon } from '../icons/icons';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    wrapperClassName?: string;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, wrapperClassName = '' }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
            <div className={`bg-surface rounded-lg shadow-xl w-full max-w-md ${wrapperClassName}`} onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b flex justify-between items-center no-print">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-on-surface-variant hover:bg-gray-200 p-1 rounded-full">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;