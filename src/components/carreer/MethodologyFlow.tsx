"use client";

import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { MethodologyStep } from "@/types/companies";

export default function MethodologyFlow({ steps }: { steps: MethodologyStep[] }) {
    return (
        <TerminalWindow title="methodology.md">
            <p className="text-xs text-[var(--color-text-muted)] mb-6 font-mono">
                {"// Agile · Waterfall · Cycle en V · DevOps"}
            </p>
            {/* Desktop: horizontal */}
            <div className="hidden md:flex items-start justify-between gap-2">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex-1 flex flex-col items-center text-center"
                    >
                        <div className="relative flex items-center justify-center w-full mb-3">
                            {i > 0 && (
                                <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-full h-px bg-[var(--color-border)]" />
                            )}
                            <div className="relative z-10 w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-xs font-bold font-mono text-[var(--color-bg-primary)] hover:scale-105 transition-transform">
                                {i + 1}
                            </div>
                        </div>
                        <p className="text-xs font-bold text-[var(--color-text-primary)] font-mono">
                            {step.label}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </div>
            {/* Mobile: vertical */}
            <div className="md:hidden space-y-4">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-start gap-3"
                    >
                        <div className="shrink-0 w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-xs font-bold text-[var(--color-bg-primary)] font-mono">
                            {i + 1}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[var(--color-text-primary)] font-mono">
                                {step.label}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                {step.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </TerminalWindow>
    );
}