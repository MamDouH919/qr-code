import clients from '@/clients';
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    params: { client: string }; // Next.js automatically passes dynamic params
}
type ClientKey = keyof typeof clients;

const Layout = ({ children, params }: LayoutProps) => {
    // const client = params.client as ClientKey;

    if (!clients['arab-clinic']) {
        return <div>Client not found</div>;
    }


    return (
        <div className="flex flex-col bg-black justify-between h-[100vdh]">
            {children}
            {/* footer */}
            <footer className="p-4 bg-gray-100 text-gray-600 mt-5">
                <p className="text-center text-sm">
                    © {new Date().getFullYear()} My Company, Inc.
                </p>
                <p className="text-center text-sm">
                    All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Layout;
