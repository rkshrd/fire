"use client";

import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { LegalIdentityItem } from "@/types/companies";

export default function LegalIdentity({ items }: { items: LegalIdentityItem[] }) {
    return (
        <TerminalWindow title="identity.json">
            <p className="text-xs text-[var(--color-text-muted)] mb-3 font-mono">
                {"$ cat /etc/company/identity.json"}
            </p>
            <div className="space-y-0">
                {items.map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.04 * i }}
                        className="flex items-start gap-2 py-2 border-b border-[var(--color-border)] last:border-0"
                    >
                        <span className="text-xs text-[var(--color-text-muted)] font-mono shrink-0 w-[140px]">
                            {item.label}
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)] font-mono">
                            {item.value}
                        </span>
                    </motion.div>
                ))}
            </div>
        </TerminalWindow>
    );
}