import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "framer-motion";
import Image from "next/image";

const NewsCard = ({ title, description, imageUrl, link }) => {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image src={imageUrl} alt={title} width={400} height={250} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p className="text-sm  mb-4">{description}</p>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read More</a>
            </div>
        </motion.div>
    );
};

export default NewsCard;