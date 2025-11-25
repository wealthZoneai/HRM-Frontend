import { toast, Bounce } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

// Custom toast configuration
const defaultToastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
};

// Success toast for login
export const showLoginSuccess = (userName?: string) => {
    toast.success(
        userName
            ? `Welcome back, ${userName}! 🎉`
            : 'Login successful! Welcome back! 🎉',
        {
            ...defaultToastConfig,
            className: 'toast-success-custom',
            progressClassName: 'toast-progress-success',
        }
    );
};

// Error toast for login failure
export const showLoginError = (message?: string) => {
    toast.error(
        message || 'Login failed. Please check your credentials and try again.',
        {
            ...defaultToastConfig,
            className: 'toast-error-custom',
            progressClassName: 'toast-progress-error',
        }
    );
};

// Generic success toast
export const showSuccess = (message: string) => {
    toast.success(message, {
        ...defaultToastConfig,
        className: 'toast-success-custom',
        progressClassName: 'toast-progress-success',
    });
};

// Generic error toast
export const showError = (message: string) => {
    toast.error(message, {
        ...defaultToastConfig,
        className: 'toast-error-custom',
        progressClassName: 'toast-progress-error',
    });
};

// Info toast
export const showInfo = (message: string) => {
    toast.info(message, {
        ...defaultToastConfig,
        className: 'toast-info-custom',
        progressClassName: 'toast-progress-info',
    });
};

// Warning toast
export const showWarning = (message: string) => {
    toast.warning(message, {
        ...defaultToastConfig,
        className: 'toast-warning-custom',
        progressClassName: 'toast-progress-warning',
    });
};
