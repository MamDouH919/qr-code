"use client";

import { createContext, useContext, useState } from "react";

type CountryContextType = {
    country: string;
    setCountry: (c: string) => void;
};

const CountryContext = createContext<CountryContextType | null>(null);

export default function ClientProvider({
    country: initialCountry,
    children,
}: {
    country: string;
    children: React.ReactNode;
}) {
    const [country, setCountry] = useState(initialCountry);

    return (
        <CountryContext.Provider value={{ country, setCountry }}>
            {children}
        </CountryContext.Provider>
    );
}

export function useCountry() {
    const ctx = useContext(CountryContext);
    if (!ctx) throw new Error("useCountry must be used inside ClientProvider");
    return ctx;
}