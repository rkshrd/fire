"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { ValuePillar, ServiceTab } from "@/types/companies";

export default function CompanyValues({
    values,
    missionStatement,
    engagements,
    services,
    servicesObjective,
}: {
    values: ValuePillar[];
    missionStatement?: string;
    engagements?: string[];
    services?: ServiceTab[];
    servicesObjective?: string;
}) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="space-y-4">
            {/* Mission statement */}
            {missionStatement && (
                <TerminalWindow title="mission.md">
                    <p className="text-xs text-[var(--color-text-muted)] mb-3 font-mono">
                        {"$ cat mission.md"}
                    </p>
                    <blockquote className="border-l-2 border-[var(--color-accent)] pl-3 text-xs text-[var(--color-text-secondary)] italic leading-relaxed">
                        {`"${missionStatement}"`}
                    </blockquote>
                </TerminalWindow>
            )}

            {/* Values pillars */}
            <div className="grid md:grid-cols-3 gap-4">
                {values.map((pillar, i) => (
                    <motion.div
                        key={pillar.title}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 * i }}
                    >
                        <TerminalWindow title={`value_${i + 1}.md`}>
                            <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-2 font-mono">
                                {"> " + pillar.title}
                            </h3>
                            <ul className="space-y-1.5">
                                {pillar.items.map((item, j) => (
                                    <li
                                        key={j}
                                        className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2"
                                    >
                                        <span className="text-[var(--color-green)] shrink-0">
                                            +
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </TerminalWindow>
                    </motion.div>
                ))}
            </div>

            {/* Engagements */}
            {engagements && engagements.length > 0 && (
                <TerminalWindow title="engagements.md">
                    <p className="text-xs text-[var(--color-text-muted)] mb-3 font-mono">
                        {"$ cat engagements --numbered"}
                    </p>
                    <div className="grid md:grid-cols-2 gap-2">
                        {engagements.map((eng, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -5 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 * i }}
                                className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]"
                            >
                                <span className="text-[var(--color-accent)] font-bold font-mono shrink-0">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                {eng}
                            </motion.div>
                        ))}
                    </div>
                </TerminalWindow>
            )}

            {/* Services tabs */}
            {services && services.length > 0 && (
                <TerminalWindow title="services.sh">
                    <p className="text-xs text-[var(--color-text-muted)] mb-3 font-mono">
                        {"$ ./services --list"}
                    </p>
                    <div className="flex gap-1.5 mb-4 flex-wrap">
                        {services.map((svc, i) => (
                            <button
                                key={svc.tab}
                                onClick={() => setActiveTab(i)}
                                className={`text-[10px] font-mono px-3 py-1.5 rounded-md border transition-all ${
                                    i === activeTab
                                        ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] border-[var(--color-accent)]"
                                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
                                }`}
                                data-hoverable
                            >
                                {svc.tab}
                            </button>
                        ))}
                    </div>
                    <ul className="space-y-1.5">
                        {services[activeTab].items.map((item, j) => (
                            <motion.li
                                key={`${activeTab}-${j}`}
                                initial={{ opacity: 0, x: 5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.04 * j }}
                                className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2"
                            >
                                <span className="text-[var(--color-accent)] shrink-0">
                                    {"\u2192"}
                                </span>
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                    {servicesObjective && (
                        <p className="text-xs text-[var(--color-accent)] italic font-mono mt-2">
                            {servicesObjective}
                        </p>
                    )}
                </TerminalWindow>
            )}
        </div>
    );
}