import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import LoginModal from '../loginModal/loginModal';
import { closeModal } from '../../store/modal/modal';
import GiveAHintModal from '../giveAhint/giveAHint';
import CartModal from '../cartModal/cartModal';

const ModalManager: React.FC = () => {
    const modals = useSelector((state: RootState) => state.modal.modals);
    const dispatch = useDispatch();

    return (
        <>
            {Object.entries(modals).map(([modalId, { isOpen, modalProps }]) => {
                switch (modalId) {
                    case 'loginModal':
                        return (
                            <LoginModal
                                key={modalId}
                                isOpen={isOpen}
                                onClose={() => dispatch(closeModal({ modalId }))}
                                {...modalProps}
                            />
                        );
                    case 'giveAHintModal':
                        return (
                            <GiveAHintModal
                                key={modalId}
                                isOpen={isOpen}
                                onClose={() => dispatch(closeModal({ modalId }))}
                                {...modalProps}
                            />
                        );
                    case 'cartModal':
                        return (
                            <CartModal
                                key={modalId}
                                isOpen={isOpen}
                                onClose={() => dispatch(closeModal({ modalId }))}
                                {...modalProps}
                            />
                        )
                    default:
                        return null;
                }
            })}
        </>
    );
};

export default ModalManager;