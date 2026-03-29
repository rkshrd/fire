"use client";

import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { TimelineEvent } from "@/types/companies";

export default function CompanyTimeline({ events }: { events: TimelineEvent[] }) {
    return (
        <TerminalWindow title="history.log">
            <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono">
                {"$ git log --oneline --reverse"}
            </p>
            <div className="space-y-0">
                {events.map((event, i) => (
                    <motion.div
                        key={event.year}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * i }}
                        className="flex items-start gap-3 relative"
                    >
                        {/* Vertical line */}
                        {i < events.length - 1 && (
                            <div className="absolute left-[6px] top-[18px] w-px h-full bg-[var(--color-border)]" />
                        )}
                        {/* Dot */}
                        <div className="shrink-0 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-card)] relative z-10" />
                        {/* Content */}
                        <div className="pb-4 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-[var(--color-accent)] font-mono">
                                    {event.year}
                                </span>
                                {event.accent && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-mono font-bold">
                                        {event.accent}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">
                                {event.text}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </TerminalWindow>
    );
}