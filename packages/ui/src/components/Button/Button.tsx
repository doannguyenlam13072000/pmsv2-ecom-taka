import React from 'react';

export interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    variant = 'primary',
    disabled = false,
}) => {
    const getButtonStyle = (): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.7 : 1,
        };

        switch (variant) {
            case 'primary':
                return {
                    ...baseStyle,
                    backgroundColor: '#1976d2',
                    color: 'white',
                };
            case 'secondary':
                return {
                    ...baseStyle,
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    border: '1px solid #ddd',
                };
            case 'danger':
                return {
                    ...baseStyle,
                    backgroundColor: '#d32f2f',
                    color: 'white',
                };
            default:
                return baseStyle;
        }
    };

    return (
        <button
            style={getButtonStyle()}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};