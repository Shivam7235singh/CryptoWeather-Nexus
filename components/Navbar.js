'use client'

import { CgCloseR, CgMenu } from "react-icons/cg";
import Link from "next/link";
import { useState, useEffect } from "react";


const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold">CryptoWeather Nexus</h1>
                <div className="hidden md:flex space-x-4">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/weather" className="hover:underline">Weather</Link>
                    <Link href="/crypto" className="hover:underline">Crypto</Link>
                    <Link href="/news" className="hover:underline">Crypto News</Link>
                </div>
                <div className="md:hidden flex items-center">
                    <CgMenu className="text-2xl cursor-pointer" onClick={() => setOpenMenu(true)} />
                </div>
            </div>
            {openMenu && (
                <div className="absolute top-0 left-0 w-full bg-gray-900 text-white p-6 flex flex-col space-y-4">
                    <CgCloseR className="text-2xl cursor-pointer self-end" onClick={() => setOpenMenu(false)} />
                    <Link href="/" className="hover:underline" onClick={() => setOpenMenu(false)}>Home</Link>
                    <Link href="/weather" className="hover:underline" onClick={() => setOpenMenu(false)}>Weather</Link>
                    <Link href="/crypto" className="hover:underline" onClick={() => setOpenMenu(false)}>Crypto</Link>
                    <Link href="/news" className="hover:underline" onClick={() => setOpenMenu(false)}>Trending News</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;