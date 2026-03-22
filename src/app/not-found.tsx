"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TypingEffect from "@/components/ui/TypingEffect";
import CodeBlock, {
    CodeLine,
    Keyword,
    Str,
    Comment,
    Func,
    Punct,
    Num,
} from "@/components/terminal/CodeBlock";

export default function NotFound() {
    const [showCode, setShowCode] = useState(false);
    const [showLink, setShowLink] = useState(false);

    useEffect(() => {
        if (showCode) {
            const timer = setTimeout(() => setShowLink(true), 600);
            return () => clearTimeout(timer);
        }
    }, [showCode]);

    return (
        <div className="relative dot-grid h-[calc(100vh-4.5rem-4rem)] flex flex-col items-center justify-center gap-10 px-4 overflow-hidden">
            <section className="text-center max-w-xl mx-auto relative z-10">
                <h1 className="text-6xl sm:text-8xl font-bold mb-4 text-[var(--color-accent)]">
                    404
                </h1>
                <p className="text-lg sm:text-xl">
                    <TypingEffect
                        text="Page not found — this route doesn't exist."
                        speed={40}
                        delay={300}
                        className="text-[var(--color-text-secondary)]"
                        onComplete={() => setShowCode(true)}
                    />
                </p>
            </section>

            {showCode && (
                <div className="w-full max-w-lg mx-auto px-4 relative z-10 animate-[fadeInUp_0.6s_ease_forwards]">
                    <CodeBlock language="typescript">
                        <CodeLine>
                            <Comment>{"// requested route"}</Comment>
                        </CodeLine>
                        <CodeLine>
                            <Keyword>throw</Keyword> <Keyword>new</Keyword> <Func>Error</Func>
                            <Punct>(</Punct>
                            <Str>&quot;PAGE_NOT_FOUND&quot;</Str>
                            <Punct>)</Punct>
                            <Punct>;</Punct>
                        </CodeLine>
                        <CodeLine>
                            <Comment>{"// status: "}</Comment>
                            <Num>404</Num>
                        </CodeLine>
                    </CodeBlock>
                </div>
            )}

            {showLink && (
                <Link
                    href="/"
                    className="relative z-10 font-mono text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors animate-[fadeInUp_0.4s_ease_forwards]"
                >
                    <span className="text-[var(--color-accent)] mr-2">&gt;</span>
                    return to home
                </Link>
            )}

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}