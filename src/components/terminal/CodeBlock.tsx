"use client";

import { ReactNode } from "react";

interface CodeBlockProps {
    children: ReactNode;
    language?: string;
    className?: string;
}

export function CodeLine({
    children,
    lineNumber,
    indent = 0,
}: {
    children: ReactNode;
    lineNumber?: number;
    indent?: number;
}) {
    return (
        <div className="flex gap-4 hover:bg-[var(--color-bg-hover)] rounded transition-colors px-1 py-0.5 leading-relaxed">
            {lineNumber !== undefined && (
                <span className="text-[var(--color-text-muted)] select-none w-6 text-right flex-shrink-0 text-xs leading-relaxed">
                    {lineNumber}
                </span>
            )}
            <span style={{ paddingLeft: `${indent * 16}px` }} className="flex-1">
                {children}
            </span>
        </div>
    );
}

// Syntax highlight helpers
export function Keyword({ children }: { children: ReactNode }) {
    return <span style={{ color: "var(--color-syntax-keyword)" }}>{children}</span>;
}

export function Type({ children }: { children: ReactNode }) {
    return <span style={{ color: "var(--color-syntax-type)" }}>{children}</span>;
}

export function Str({ children }: { children: ReactNode }) {
    return <span style={{ color: "var(--color-syntax-string)" }}>{children}</span>;
}

export function Comment({ children }: { children: ReactNode }) {
    return (
        <span className="italic" style={{ color: "var(--color-text-muted)" }}>
            {children}
        </span>
    );
}

export function Var({ children }: { children: ReactNode }) {
    return <span style={{ color: "var(--color-syntax-var)" }}>{children}</span>;
}

export function Func({ children }: { children: ReactNode }) {
    return <span style={{ color: "var(--color-syntax-func)" }}>{children}</span>;
}

export function Num({ children }: { children: ReactNode }) {
    return <span style={{ color: "var(--color-syntax-num)" }}>{children}</span>;
}

export function Punct({ children }: { children: ReactNode }) {
    return <span style={{ color: "var(--color-text-secondary)" }}>{children}</span>;
}

export default function CodeBlock({
    children,
    language = "typescript",
    className = "",
}: CodeBlockProps) {
    return (
        <div
            className={`rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] overflow-hidden ${className}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border)]">
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[var(--color-red)]" />
                    <span className="w-3 h-3 rounded-full bg-[var(--color-yellow-dot)]" />
                    <span className="w-3 h-3 rounded-full bg-[var(--color-green-dot)]" />
                </div>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{language}</span>
                <span className="w-12" />
            </div>

            {/* Code */}
            <div className="font-mono text-sm overflow-x-auto px-5 py-4">{children}</div>
        </div>
    );
}
