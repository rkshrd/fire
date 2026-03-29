"use client";

import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { KPI } from "@/types/companies";

export default function KPIDashboard({ kpis }: { kpis: KPI[] }) {
    return (
        <TerminalWindow title="system_status.sh">
            <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono">
                {"$ ./status --overview"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 * i }}
                        className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-center hover:border-[var(--color-accent)] transition-colors"
                    >
                        <div className="text-xl font-bold text-[var(--color-accent)] font-mono">
                            {kpi.value}
                        </div>
                        <div className="text-[10px] text-[var(--color-text-muted)] mt-1 uppercase">
                            {kpi.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </TerminalWindow>
    );
}