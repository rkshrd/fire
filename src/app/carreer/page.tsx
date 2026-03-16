"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import companiesData from "@/data/companies.json";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import { CodeLine, Keyword, Type, Str, Var, Punct } from "@/components/terminal/CodeBlock";

export default function CarreerPage() {
    const [activeCompany, setActiveCompany] = useState(0);
    const company = companiesData.companies[activeCompany];

    return (
        <div className="max-w-[1200px] mx-auto px-6 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h1 className="text-3xl sm:text-5xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Carreer
                </h1>
                <p className="text-[var(--color-text-secondary)] font-mono text-sm">
                    {"// Expériences professionnelles en alternance"}
                </p>
            </motion.div>

            {/* Company selector */}
            <div className="flex gap-2 mb-8 flex-wrap">
                {companiesData.companies.map((c, i) => (
                    <button
                        key={c.name}
                        onClick={() => setActiveCompany(i)}
                        className={`text-sm font-mono px-5 py-2.5 rounded-md border transition-all ${
                            i === activeCompany
                                ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] border-[var(--color-accent)]"
                                : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
                        }`}
                        data-hoverable
                    >
                        {c.name}
                    </button>
                ))}
            </div>

            {/* Company details */}
            <motion.div
                key={company.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Info header as code */}
                <TerminalWindow title={`${company.name.toLowerCase().replace(/\s+/g, "_")}.ts`}>
                    <CodeLine lineNumber={1}>
                        <Keyword>interface</Keyword> <Type>Experience</Type> <Punct>{"{"}</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={2} indent={1}>
                        <Var>company</Var>
                        <Punct>:</Punct> <Type>string</Type>
                        <Punct>;</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={3} indent={1}>
                        <Var>role</Var>
                        <Punct>:</Punct> <Type>string</Type>
                        <Punct>;</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={4} indent={1}>
                        <Var>period</Var>
                        <Punct>:</Punct> <Type>string</Type>
                        <Punct>;</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={5} indent={1}>
                        <Var>team</Var>
                        <Punct>:</Punct> <Type>string</Type>
                        <Punct>;</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={6}>
                        <Punct>{"}"}</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={7}>&nbsp;</CodeLine>
                    <CodeLine lineNumber={8}>
                        <Keyword>const</Keyword> <Var>experience</Var>
                        <Punct>:</Punct> <Type>Experience</Type> <Punct>=</Punct>{" "}
                        <Punct>{"{"}</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={9} indent={1}>
                        <Var>company</Var>
                        <Punct>:</Punct> <Str>{`"${company.name}"`}</Str>
                        <Punct>,</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={10} indent={1}>
                        <Var>role</Var>
                        <Punct>:</Punct> <Str>{`"${company.role}"`}</Str>
                        <Punct>,</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={11} indent={1}>
                        <Var>period</Var>
                        <Punct>:</Punct> <Str>{`"${company.period}"`}</Str>
                        <Punct>,</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={12} indent={1}>
                        <Var>team</Var>
                        <Punct>:</Punct> <Str>{`"${company.team}"`}</Str>
                        <Punct>,</Punct>
                    </CodeLine>
                    <CodeLine lineNumber={13}>
                        <Punct>{"}"}</Punct>
                        <Punct>;</Punct>
                    </CodeLine>
                </TerminalWindow>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 mb-8 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)]"
                >
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {company.description}
                    </p>
                </motion.div>

                {/* Missions */}
                <h2 className="text-lg font-bold font-mono text-[var(--color-text-primary)] mb-4">
                    <span className="text-[var(--color-accent)]">{">"}</span> Missions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {company.missions.map((mission, i) => (
                        <motion.div
                            key={mission.title}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                        >
                            <TerminalWindow title={`mission_${i + 1}.md`}>
                                <h3 className="text-sm font-bold text-[var(--color-accent)] mb-2">
                                    {mission.title}
                                </h3>
                                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                    {mission.description}
                                </p>
                            </TerminalWindow>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}