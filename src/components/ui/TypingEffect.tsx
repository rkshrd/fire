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
    const textRef = useRef(text);
    const speedRef = useRef(speed);
    const delayRef = useRef(delay);

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setIsTyping(true);
            let i = 0;
            const interval = setInterval(() => {
                if (i < textRef.current.length) {
                    setDisplayText(textRef.current.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(interval);
                    setIsTyping(false);
                    setShowBlinkCursor(true);
                    onCompleteRef.current?.();
                }
            }, speedRef.current);
            return () => clearInterval(interval);
        }, delayRef.current);

        return () => clearTimeout(delayTimer);
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