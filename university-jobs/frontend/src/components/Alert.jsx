import React from 'react';
import { createPortal } from 'react-dom';

export default function Alert({ type = 'success', message, onDismiss }) {
  const alertClasses = {
    success: 'alert alert-success alert-dismissible fade show',
    error: 'alert alert-danger alert-dismissible fade show',
    warning: 'alert alert-warning alert-dismissible fade show'
  };

  return createPortal(
    <div className={alertClasses[type]} role="alert">
      {message}
      <button 
        type="button" 
        className="btn-close" 
        onClick={onDismiss}
        aria-label="Close"
      />
    </div>,
    document.getElementById('alert-root')
  );
}