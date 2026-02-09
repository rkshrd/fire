"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface DraggableContainerProps {
    children: ReactNode;
    title?: string;
    className?: string;
    defaultPosition?: { x: number; y: number };
}

export default function DraggableContainer({
    children,
    title,
    className = "",
    defaultPosition = { x: 0, y: 0 },
}: DraggableContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(defaultPosition);
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!isDragging) return;

        const onMouseMove = (e: MouseEvent) => {
            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y,
            });
        };

        const onMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [isDragging]);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        setPosition({
            x: rect.left,
            y: rect.top,
        });
        setIsDragging(true);
    };

    const isDefault = position.x === defaultPosition.x && position.y === defaultPosition.y;

    return (
        <div
            ref={containerRef}
            className={`${className} ${isDragging ? "z-50" : ""}`}
            style={
                !isDefault
                    ? {
                          position: "fixed",
                          left: `${position.x}px`,
                          top: `${position.y}px`,
                          zIndex: isDragging ? 9999 : 50,
                      }
                    : { position: "relative" }
            }
        >
            {/* Drag handle header */}
            <div
                className="flex items-center justify-between px-3 py-1.5 bg-[var(--color-bg-tertiary)] border border-b-0 border-[var(--color-border)] rounded-t-lg select-none"
                onMouseDown={onMouseDown}
                data-hoverable
                style={{ cursor: "grab" }}
            >
                <div className="flex items-center gap-2">
                    {title && (
                        <span className="text-xs font-mono text-[var(--color-text-secondary)]">
                            {title}
                        </span>
                    )}
                </div>
                <span className="w-4" />
            </div>
            <div className="border border-[var(--color-border)] rounded-b-lg overflow-hidden bg-[var(--color-bg-card)]">
                {children}
            </div>
        </div>
    );
}