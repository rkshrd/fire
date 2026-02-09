"use client";

import { useState } from "react";
import TypingEffect from "@/components/ui/TypingEffect";
import DraggableCandle from "@/components/draggable/DraggableCandle";
import CodeBlock, {
    CodeLine,
    Keyword,
    Str,
    Comment,
    Var,
    Punct,
    Type,
} from "@/components/terminal/CodeBlock";

export default function HomePage() {
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [showQuote, setShowQuote] = useState(false);
    const [showCode, setShowCode] = useState(false);

    return (
        <div className="relative dot-grid h-[calc(100vh-4.5rem-4rem)] flex flex-col items-center justify-center gap-12 px-4 overflow-hidden">
            {/* Hero section */}
            <section className="text-center px-4 max-w-3xl mx-auto relative z-10">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4">
                    <TypingEffect
                        text="Thaïs PARISOT"
                        speed={80}
                        delay={500}
                        className="text-[var(--color-text-primary)]"
                        onComplete={() => setShowSubtitle(true)}
                    />
                </h1>

                {showSubtitle && (
                    <p className="text-lg sm:text-xl mb-6">
                        <TypingEffect
                            text="Network, System & Cybersecurity's Student"
                            speed={40}
                            delay={200}
                            className="text-[var(--color-text-secondary)]"
                            onComplete={() => setShowQuote(true)}
                        />
                    </p>
                )}

                {showQuote && (
                    <p className="text-base">
                        <TypingEffect
                            text={'"Spark of Computing"'}
                            speed={60}
                            delay={300}
                            keepCursor
                            className="text-[var(--color-accent)] italic"
                            onComplete={() => setShowCode(true)}
                        />
                    </p>
                )}
            </section>

            {/* Code block info widget */}
            {showCode && (
                <div className="w-full max-w-xl mx-auto px-4 relative z-10 animate-[fadeInUp_0.6s_ease_forwards]">
                    <CodeBlock language="typescript">
                        <CodeLine>
                            <Keyword>const</Keyword> <Var>name</Var> <Punct>:</Punct>{" "}
                            <Type>string</Type> <Punct>=</Punct>{" "}
                            <Str>&quot;Thaïs PARISOT&quot;</Str>
                            <Punct>;</Punct>
                        </CodeLine>
                        <CodeLine>
                            <Comment>{"// BTS SIO SISR — Cybersécurité & Réseaux"}</Comment>
                        </CodeLine>
                        <CodeLine>
                            <Keyword>const</Keyword> <Var>school</Var> <Punct>:</Punct>{" "}
                            <Type>string</Type> <Punct>=</Punct> <Str>&quot;ENSITECH&quot;</Str>
                            <Punct>;</Punct>
                        </CodeLine>
                        <CodeLine>
                            <Keyword>const</Keyword> <Var>company</Var> <Punct>:</Punct>{" "}
                            <Type>string</Type> <Punct>=</Punct> <Str>&quot;SUEZ R&amp;V&quot;</Str>
                            <Punct>;</Punct>
                        </CodeLine>
                        <CodeLine>
                            <Keyword>const</Keyword> <Var>focus</Var> <Punct>:</Punct>{" "}
                            <Type>string[]</Type> <Punct>=</Punct> <Punct>[</Punct>
                            <Str>&quot;MFA&quot;</Str>
                            <Punct>,</Punct> <Str>&quot;ZTNA&quot;</Str>
                            <Punct>,</Punct> <Str>&quot;SIEM&quot;</Str>
                            <Punct>];</Punct>
                        </CodeLine>
                    </CodeBlock>
                </div>
            )}

            <DraggableCandle />

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