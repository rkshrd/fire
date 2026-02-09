"use client";

import { ReactNode } from "react";

interface TerminalWindowProps {
    title?: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    tag?: string;
}

export default function TerminalWindow({
    title = "terminal",
    children,
    className = "",
    onClick,
    tag,
}: TerminalWindowProps) {
    return (
        <div
            className={`rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-lg hover:shadow-[var(--color-accent-glow)] ${
                onClick ? "cursor-pointer" : ""
            } ${className}`}
            onClick={onClick}
            data-hoverable={onClick ? true : undefined}
        >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border)]">
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[var(--color-red)]" />
                    <span className="w-3 h-3 rounded-full bg-[var(--color-yellow-dot)]" />
                    <span className="w-3 h-3 rounded-full bg-[var(--color-green-dot)]" />
                </div>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{title}</span>
                {tag ? (
                    <span className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                        {tag}
                    </span>
                ) : (
                    <span className="w-16" />
                )}
            </div>

            {/* Body */}
            <div className="font-mono text-sm px-5 py-4">{children}</div>
        </div>
    );
}