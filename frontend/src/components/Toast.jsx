import React from 'react';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  const { msg, type } = toastMessage;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        background: '#111827',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(99, 102, 241, 0.25)',
        borderRadius: '12px',
        color: '#f8fafc',
        maxWidth: '380px',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {type === 'error' ? (
        <AlertCircle size={20} color="#f43f5e" />
      ) : type === 'info' ? (
        <Info size={20} color="#38bdf8" />
      ) : (
        <CheckCircle2 size={20} color="#10b981" />
      )}
      <span style={{ fontSize: '0.92rem', fontWeight: 500, lineHeight: 1.4 }}>
        {msg}
      </span>
    </div>
  );
};

export default Toast;
