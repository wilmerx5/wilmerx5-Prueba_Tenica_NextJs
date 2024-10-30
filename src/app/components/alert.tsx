import { FC, ReactNode } from 'react';

interface AlertProps {
    children: ReactNode;
}

const Alert: FC<AlertProps> = ({ children }) => {
    return (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg shadow-lg z-50" role="alert">
            <svg
                aria-hidden="true"
                className="w-5 h-5 inline mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 1a9 9 0 100 18 9 9 0 000-18zm1 14H9v-2h2v2zm0-4H9V7h2v4z" />
            </svg>
            <span>{children}</span>
        </div>
    );
};

export default Alert;