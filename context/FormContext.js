"use client"
import { createContext, useContext, useState } from 'react';

export const FormContext = createContext();

export function FormProvider({ children }) {
    const [formData, setFormData] = useState({
        employeeRange: '',
        location: '',
        industry: null,
        socialMediaExp: 3,
        socialPlatforms: {
            facebook: false,
            linkedin: false,
            whatsapp: false,
            instagram: false,
            tiktok: false
        },
        businessDesc: ''
    });

    const updateFormData = (newData) => {
        setFormData(newData);
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
}

export const useFormData = () => useContext(FormContext);