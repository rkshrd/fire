"use client";

import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { Facility, JobProfile } from "@/types/companies";

export default function FacilityInfo({
    facility,
    jobProfiles,
}: {
    facility: Facility;
    jobProfiles?: JobProfile[];
}) {
    return (
        <div className="space-y-4">
            {/* Facility KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { value: facility.founded, label: "Création" },
                    { value: facility.practitioners, label: "Praticiens" },
                    { value: facility.employees, label: "Salariés" },
                    { value: facility.emergency, label: "Urgences" },
                ].map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.06 * i }}
                        className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] text-center"
                    >
                        <div className="text-lg font-bold text-[var(--color-accent)] font-mono">
                            {kpi.value}
                        </div>
                        <div className="text-[10px] text-[var(--color-text-muted)] mt-1 uppercase">
                            {kpi.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Facility details + Pôles d'excellence */}
            <div className="grid md:grid-cols-2 gap-4">
                <TerminalWindow title="facility.json">
                    <p className="text-xs text-[var(--color-text-muted)] mb-3 font-mono">
                        {"$ cat facility.json"}
                    </p>
                    <div className="space-y-0">
                        {[
                            { label: "Adresse", value: facility.address },
                            { label: "Téléphone", value: facility.phone },
                            { label: "Population", value: facility.population },
                            ...facility.certifications.map((c) => ({
                                label: "Certification",
                                value: c,
                            })),
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-2 py-1.5 border-b border-[var(--color-border)] last:border-0"
                            >
                                <span className="text-[10px] text-[var(--color-text-muted)] font-mono shrink-0 w-[90px]">
                                    {item.label}
                                </span>
                                <span className="text-xs text-[var(--color-text-secondary)] font-mono">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </TerminalWindow>

                <TerminalWindow title="poles_excellence.md">
                    <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-3 font-mono">
                        {"> Pôles d'excellence"}
                    </h3>
                    <ul className="space-y-2">
                        {facility.polesExcellence.map((pole, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -5 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 * i }}
                                className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2"
                            >
                                <span className="text-[var(--color-accent)] shrink-0">
                                    {"\u2605"}
                                </span>
                                {pole}
                            </motion.li>
                        ))}
                    </ul>
                </TerminalWindow>
            </div>

            {/* Specialties */}
            <TerminalWindow title="specialties.json">
                <p className="text-xs text-[var(--color-text-muted)] mb-3 font-mono">
                    {"$ jq '.specialties[]' facility.json"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {facility.specialties.map((spec) => (
                        <span
                            key={spec}
                            className="text-[10px] px-2 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors font-mono"
                        >
                            {spec}
                        </span>
                    ))}
                </div>
            </TerminalWindow>

            {/* Job Profiles */}
            {jobProfiles && jobProfiles.length > 0 && (
                <TerminalWindow title="job_profiles.csv">
                    <p className="text-xs text-[var(--color-text-muted)] mb-3 font-mono">
                        {"$ cat job_profiles.csv | column -t -s ','"}
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs font-mono">
                            <thead>
                                <tr className="border-b border-[var(--color-border)]">
                                    <th className="text-left py-1.5 text-[var(--color-accent)] font-semibold pr-4">
                                        Profil
                                    </th>
                                    <th className="text-left py-1.5 text-[var(--color-accent)] font-semibold">
                                        Applications / Config
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobProfiles.map((jp, i) => (
                                    <motion.tr
                                        key={jp.profile}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.03 * i }}
                                        className="border-b border-[var(--color-border)] last:border-0"
                                    >
                                        <td className="py-1.5 text-[var(--color-text-primary)] pr-4 whitespace-nowrap">
                                            {jp.profile}
                                        </td>
                                        <td className="py-1.5 text-[var(--color-text-secondary)]">
                                            {jp.apps}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TerminalWindow>
            )}
        </div>
    );
}