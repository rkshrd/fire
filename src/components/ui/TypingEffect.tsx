"use client";

import { useEffect, useState, useRef } from "react";

interface TypingEffectProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    showCursor?: boolean;
    keepCursor?: boolean;
    onComplete?: () => void;
}

export default function TypingEffect({
    text,
    speed = 50,
    delay = 0,
    className = "",
    showCursor = true,
    keepCursor = false,
    onComplete,
}: TypingEffectProps) {
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showBlinkCursor, setShowBlinkCursor] = useState(false);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setIsTyping(true);
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(text.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(interval);
                    setIsTyping(false);
                    setShowBlinkCursor(true);
                    onCompleteRef.current?.();
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(delayTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <span className={className}>
            {displayText}
            {showCursor && (isTyping || (showBlinkCursor && keepCursor)) && (
                <span
                    className="inline-block ml-0.5 text-[var(--color-accent)]"
                    style={{
                        animation: showBlinkCursor ? "blink 1s infinite" : "none",
                    }}
                >
                    _
                </span>
            )}
        </span>
    );
}