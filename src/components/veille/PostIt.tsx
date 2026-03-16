"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const colors = [
    "bg-[#feff9c]", // yellow
    "bg-[#ff7eb9]", // pink
    "bg-[#7afcff]", // cyan
    "bg-[#a8ff7e]", // green
    "bg-[#e0b0ff]", // purple
];

interface PostItProps {
    title: string;
    content: string;
    index: number;
}

export default function PostIt({ title, content, index }: PostItProps) {
    const rotation = (index % 2 === 0 ? 1 : -1) * (2 + (index % 3));
    const colorClass = colors[index % colors.length];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
            whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className={`${colorClass} p-4 rounded shadow-md min-h-[140px] relative`}
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            {/* Pin */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <MapPin size={16} fill="#e74c3c" stroke="#c0392b" />
            </div>

            <h4 className="text-xs font-bold text-gray-800 mt-2 mb-2 font-mono">{title}</h4>
            <p className="text-[10px] text-gray-700 leading-relaxed font-sans">{content}</p>
        </motion.div>
    );
}