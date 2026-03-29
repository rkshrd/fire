"use client";

import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { TechCategory } from "@/types/companies";

export default function TechStackSection({ techStack }: { techStack: TechCategory[] }) {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            {techStack.map((cat, i) => (
                <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.05 * i }}
                >
                    <TerminalWindow
                        title={`${cat.category.toLowerCase().replace(/[\s&]/g, "_")}.json`}
                    >
                        <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-3">
                            {"> " + cat.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {cat.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="text-xs px-3 py-1.5 rounded-md bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </TerminalWindow>
                </motion.div>
            ))}
        </div>
    );
}