import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LinkCardProps {
    name: string;
    link: string;
    icon: React.ReactNode;
    color: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ name, link, icon, color }) => {
    return (
        <Link href={link} target="_blank" rel="noopener noreferrer" className="flex w-full">
            <div className="flex items-center justify-between rounded-2xl bg-neutral-800 px-4 py-3 shadow-md w-full">
                {/* Left Section (icon + text) */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700">
                        {icon}
                    </div>
                    <div>
                        <p className="text-base font-medium text-white">{name}</p>
                    </div>
                </div>

                {/* Right Button */}
                <button
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-[${color}] transition`}
                    style={{ backgroundColor: color }}
                >
                    <ArrowRight className="h-5 w-5 text-white" />
                </button>
            </div>
        </Link>
    );
};

export default LinkCard;
