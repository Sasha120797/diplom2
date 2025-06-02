import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    className = '',
}) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="popUp-overlay popUp--active" />
            <div className="popUp-content popUp--active">
                <div className="popUp-header">
                    <div className="popUp-title">{title}</div>
                    <svg
                        width={17}
                        height={17}
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="pop-close-btn"
                        onClick={onClose}
                    >
                        <path d="M1 1L15.737 15.737" stroke="black" strokeWidth={2} />
                        <path d="M1.2627 16L15.9997 1.26304" stroke="black" strokeWidth={2} />
                    </svg>
                </div>
                <div className="popUp-body">
                    {children}
                </div>
            </div>
        </>,
        document.body
    );
};

export default Modal;