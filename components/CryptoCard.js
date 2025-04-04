'use client';

import Image from "next/image";
import { motion } from "framer-motion";

const CryptoCard = ({ name, price, change, imageUrl }) => {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image src={imageUrl} alt={name} width={400} height={250} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{name}</h2>
                <p className="text-sm text-gray-600">Price: ${price}</p>
                <p className={`text-sm font-bold ${change >= 0 ? "text-green-500" : "text-red-500"}`}>Change: {change}%</p>
            </div>
        </motion.div>
    );
};
export default CryptoCard;