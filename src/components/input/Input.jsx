/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styles from './input.css';

export default function Input({
    id,
    type = 'text',
    name,
    value,
    placeholder = 'placeholder text',
    required = false,
    disabled,
    min,
    max,
    autoFocus,
    minLength,
    maxLength,
    autoComplete,
    onChange
}) {

    return (
        <div className={styles.form__div}>
            <input
                id={id}
                type={type}
                min={min}
                max={max}
                name={name}
                value={value}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                required={required}
                disabled={disabled}
                minLength={minLength}
                maxLength={maxLength}
                className={styles.form__input}
                placeholder=" "
                onChange={onChange}
            />
            <label
                className={styles.form__label}
            >
                {placeholder}
            </label>
        </div>
    );
}
