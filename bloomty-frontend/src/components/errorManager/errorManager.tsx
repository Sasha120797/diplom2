import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { removeError } from '../../store/errors/errors';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ErrorCard = styled.div`
  background: #8B0000; /* Бордовый цвет */
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 300px;
  animation: slideIn 0.3s ease-out;
  position: relative;
  overflow: hidden;
  opacity: 0.9;

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    animation: progress 5s linear forwards;
  }

  @keyframes progress {
    from { width: 100%; }
    to { width: 0%; }
  }
`;

const ErrorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ErrorCode = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

const ErrorPath = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 9px;
`;

const ErrorMessage = styled.div`
  font-size: 14px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const ErrorNotification: React.FC = () => {
    const dispatch = useAppDispatch();
    const errors = useAppSelector((state) => state.errors.errors);

    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];

        errors.forEach((error) => {
            const timer = setTimeout(() => {
                dispatch(removeError(error.id));
            }, 5000);
            timers.push(timer);
        });

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, [errors, dispatch]);

    const handleClose = (id: string) => {
        dispatch(removeError(id));
    };

    if (errors.length === 0) return null;

    return (
        <ErrorContainer>
            {errors.map((error) => (
                <ErrorCard key={error.id}>
                    <ErrorHeader>
                        <ErrorCode>Ошибка {error.code}</ErrorCode>
                        <CloseButton onClick={() => handleClose(error.id)}>×</CloseButton>
                    </ErrorHeader>
                    <ErrorPath>{error.path}</ErrorPath>
                    <ErrorMessage>{error.message}</ErrorMessage>
                </ErrorCard>
            ))}
        </ErrorContainer>
    );
};

export default ErrorNotification;