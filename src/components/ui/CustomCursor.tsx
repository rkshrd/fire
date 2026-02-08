"use client";

import { useLayoutEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(() => typeof window !== 'undefined' ? window.matchMedia("(pointer: coarse)").matches : false);

    useLayoutEffect(() => {
        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        const trail = trailRef.current;
        if (!cursor || !trail) return;

        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            setIsVisible(true);
            cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        };

        const onMouseEnter = () => setIsVisible(true);
        const onMouseLeave = () => setIsVisible(false);

        // Trail animation loop
        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            if (trail) {
                trail.style.transform = `translate(${trailX - 16}px, ${trailY - 16}px)`;
            }
            requestAnimationFrame(animateTrail);
        };

        // Detect hoverable elements
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[data-hoverable]") ||
                target.closest('[role="button"]')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseover", onMouseOver);
        animateTrail();

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseover", onMouseOver);
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
            >
                <div
                    className="rounded-full bg-[var(--color-accent)]"
                    style={{
                        width: isHovering ? "12px" : "8px",
                        height: isHovering ? "12px" : "8px",
                        transition: "width 0.2s ease, height 0.2s ease",
                    }}
                />
            </div>
            {/* Trail / glow ring */}
            <div
                ref={trailRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
            >
                <div
                    className="rounded-full border border-[var(--color-accent)]"
                    style={{
                        width: isHovering ? "48px" : "32px",
                        height: isHovering ? "48px" : "32px",
                        opacity: isHovering ? 0.6 : 0.3,
                        transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
                        boxShadow: isHovering ? "0 0 15px var(--color-accent-glow)" : "none",
                    }}
                />
            </div>
        </>
    );
}
