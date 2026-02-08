"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[100]">
            <div
                className="h-full bg-[var(--color-accent)] transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
