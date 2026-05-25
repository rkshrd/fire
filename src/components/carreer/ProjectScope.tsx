"use client";

import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";

export default function ProjectScope({ scope, devops }: { scope: string[]; devops: string[] }) {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <TerminalWindow title="scope.md">
                    <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-3 font-mono">
                        {"> Périmètre"}
                    </h3>
                    <ul className="space-y-2">
                        {scope.map((item, i) => (
                            <li
                                key={i}
                                className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2"
                            >
                                <span className="text-[var(--color-green)] shrink-0">
                                    {"\u2713"}
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </TerminalWindow>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
            >
                <TerminalWindow title="azure_devops.md">
                    <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-3 font-mono">
                        {"> Azure DevOps — Archivage"}
                    </h3>
                    <ul className="space-y-2">
                        {devops.map((item, i) => (
                            <li
                                key={i}
                                className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2"
                            >
                                <span className="text-[var(--color-syntax-type)] shrink-0">
                                    {"\u2713"}
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </TerminalWindow>
            </motion.div>
        </div>
    );
}