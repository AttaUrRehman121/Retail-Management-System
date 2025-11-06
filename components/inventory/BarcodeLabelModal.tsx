import React from 'react';
import { Product } from '../../types';
import Modal from '../common/Modal';

interface BarcodeLabelModalProps {
    product: Product;
    onClose: () => void;
}

// A simple component to render a fake barcode
const FakeBarcode: React.FC<{ value: string }> = ({ value }) => {
    // Generate a sequence of divs to simulate a barcode
    const bars = value.split('').map((char, i) => {
        const width = (char.charCodeAt(0) % 4) + 1; // 1 to 4 px width
        return <div key={`${i}-${char}`} style={{ width: `${width}px`, height: '50px', backgroundColor: 'black' }} />;
    });

    return (
        <div className="flex items-end space-x-px h-[50px] overflow-hidden">
            {bars}
        </div>
    );
};


const BarcodeLabelModal: React.FC<BarcodeLabelModalProps> = ({ product, onClose }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Modal title="Generate Barcode Label" onClose={onClose} wrapperClassName="max-w-sm">
            <div className="printable-area text-center space-y-2 p-4 border border-dashed">
                <p className="font-bold text-lg">{product.name}</p>
                <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
                <div className="flex justify-center py-2">
                    <FakeBarcode value={product.sku || product.id} />
                </div>
                <p className="font-mono text-sm">{product.sku || product.id}</p>
            </div>
             <div className="mt-6 flex justify-end space-x-2 no-print">
                <button onClick={handlePrint} className="px-4 py-2 bg-gray-200 rounded-lg">Print Label</button>
                <button onClick={onClose} className="px-4 py-2 bg-primary text-white rounded-lg">Close</button>
            </div>
             <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .printable-area, .printable-area * {
                        visibility: visible;
                    }
                    .printable-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        border: none;
                    }
                    .no-print {
                        display: none;
                    }
                }
            `}</style>
        </Modal>
    );
};

export default BarcodeLabelModal;
