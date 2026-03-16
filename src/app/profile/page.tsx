"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import skillsData from "@/data/skills.json";
import timelineData from "@/data/timeline.json";
import { getIcon } from "@/lib/iconMap";
import profilePic from "@/data/pics/profile.jpg";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import CodeBlock, {
    CodeLine,
    Keyword,
    Str,
    Comment,
    Var,
    Punct,
    Type,
} from "@/components/terminal/CodeBlock";

export default function ProfilePage() {
    const [hoveredCert, setHoveredCert] = useState<{ src: string; x: number; y: number } | null>(
        null
    );

    return (
        <div className="max-w-[1100px] mx-auto px-6 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-3xl sm:text-5xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Profile
                </h1>
                <p className="text-[var(--color-text-secondary)] font-mono text-sm">
                    {"// whoami"}
                </p>
            </motion.div>

            {/* Bio section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
            >
                <div className="p-5 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-card)]">
                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                        <div className="w-full md:w-80 flex-shrink-0 relative overflow-hidden rounded-lg border border-[var(--color-border)] aspect-[3/4] md:aspect-auto">
                            <Image
                                src={profilePic}
                                alt="Thaïs Parisot"
                                fill
                                className="object-cover"
                                placeholder="blur"
                                sizes="(max-width: 768px) 100vw, 256px"
                                priority
                            />
                        </div>
                        <div className="flex-1">
                            <CodeBlock language="typescript">
                                <CodeLine lineNumber={1}>
                                    <Keyword>interface</Keyword> <Type>Profile</Type>{" "}
                                    <Punct>{"{"}</Punct>
                                </CodeLine>
                                <CodeLine lineNumber={2} indent={1}>
                                    <Var>name</Var>
                                    <Punct>:</Punct> <Type>string</Type>
                                    <Punct>;</Punct>
                                </CodeLine>
                                <CodeLine lineNumber={3} indent={1}>
                                    <Var>background</Var>
                                    <Punct>:</Punct> <Type>string[]</Type>
                                    <Punct>;</Punct>
                                </CodeLine>
                                <CodeLine lineNumber={4} indent={1}>
                                    <Var>focus</Var>
                                    <Punct>:</Punct> <Type>string[]</Type>
                                    <Punct>;</Punct>
                                </CodeLine>
                                <CodeLine lineNumber={5} indent={1}>
                                    <Var>goal</Var>
                                    <Punct>:</Punct> <Type>string</Type>
                                    <Punct>;</Punct>
                                </CodeLine>
                                <CodeLine lineNumber={6}>
                                    <Punct>{"}"}</Punct>
                                </CodeLine>
                                <CodeLine lineNumber={7}>&nbsp;</CodeLine>
                                <CodeLine lineNumber={8}>
                                    <Keyword>const</Keyword> <Var>thais</Var>
                                    <Punct>:</Punct> <Type>Profile</Type> <Punct>=</Punct>{" "}
                                    <Punct>{"{"}</Punct>
                                </CodeLine>
                                <CodeLine lineNumber={9} indent={1}>
                                    <Var>name</Var>
                                    <Punct>:</Punct> <Str>&quot;Thaïs PARISOT&quot;</Str>
                                    <Punct>,</Punct>
                                </CodeLine>
                                <CodeLine lineNumber={10} indent={1}>
                                    <Var>background</Var>
                                    <Punct>:</Punct> <Punct>[</Punct>
                                    <Str>&quot;Littérature&quot;</Str>
                                    <Punct>,</Punct> <Str>&quot;Sociologie&quot;</Str>
                                    <Punct>,</Punct> <Str>&quot;Philosophie&quot;</Str>
                                    <Punct>],</Punct>
                                </CodeLine>
                                <CodeLine lineNumber={11} indent={1}>
                                    <Comment>
                                        {
                                            "// Reconversion vers l'informatique par curiosité et challenge"
                                        }
                                    </Comment>
                                </CodeLine>
                                <CodeLine lineNumber={12} indent={1}>
                                    <Var>focus</Var>
                                    <Punct>:</Punct> <Punct>[</Punct>
                                    <Str>&quot;Cybersécurité&quot;</Str>
                                    <Punct>,</Punct> <Str>&quot;Réseaux&quot;</Str>
                                    <Punct>,</Punct> <Str>&quot;Admin Système&quot;</Str>
                                    <Punct>],</Punct>
                                </CodeLine>
                                <CodeLine lineNumber={13} indent={1}>
                                    <Var>goal</Var>
                                    <Punct>:</Punct>{" "}
                                    <Str>&quot;Sécuriser les infrastructures OIV&quot;</Str>
                                </CodeLine>
                                <CodeLine lineNumber={14}>
                                    <Punct>{"}"}</Punct>
                                    <Punct>;</Punct>
                                </CodeLine>
                            </CodeBlock>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Skills */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                    {"// Compétences"}
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* Languages */}
                    <TerminalWindow title="languages.json">
                        <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-3">
                            {"> Langages"}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skillsData.langages.map((s) => {
                                const IconComponent = getIcon(s.icon);
                                return (
                                    <span
                                        key={s.name}
                                        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        <IconComponent size={14} />
                                        {s.name}
                                    </span>
                                );
                            })}
                        </div>
                    </TerminalWindow>

                    {/* Tools */}
                    <TerminalWindow title="tools.json">
                        <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-3">
                            {"> Outils"}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skillsData.outils.map((s) => {
                                const IconComponent = getIcon(s.icon);
                                return (
                                    <span
                                        key={s.name}
                                        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        <IconComponent size={14} />
                                        {s.name}
                                    </span>
                                );
                            })}
                        </div>
                    </TerminalWindow>

                    {/* Certifications */}
                    <TerminalWindow title="certifications.json">
                        <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-3">
                            {"> Certifications"}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skillsData.certifications.map((c) => (
                                <a
                                    key={c.name}
                                    className={`text-xs px-3 py-1.5 rounded-md bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 ${hoveredCert && hoveredCert.src !== c.src ? "blur-[2px] opacity-50" : ""}`}
                                    href={c.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={(e) => {
                                        if (!c.src) return;
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        setHoveredCert({
                                            src: c.src,
                                            x: rect.left + rect.width / 2,
                                            y: rect.top,
                                        });
                                    }}
                                    onMouseLeave={() => setHoveredCert(null)}
                                >
                                    {">"} {c.name}
                                </a>
                            ))}
                        </div>
                    </TerminalWindow>

                    {/* Languages */}
                    <TerminalWindow title="languages_spoken.json">
                        <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-3">
                            {"> Langues"}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skillsData.langues.map((l) => {
                                const IconComponent = getIcon(l.icon);
                                return (
                                    <span
                                        key={l.name}
                                        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        <IconComponent size={14} />
                                        {l.name} — {l.level}
                                    </span>
                                );
                            })}
                        </div>
                    </TerminalWindow>
                </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-8 font-mono">
                    {"// Expériences & Formation"}
                </h2>

                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] hidden md:block" />

                    <div className="space-y-6">
                        {timelineData.timeline.map((entry, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className={`flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
                            >
                                <div
                                    className={`w-full md:w-[45%] border rounded-lg p-4 bg-[var(--color-bg-card)] transition-all hover:shadow-lg ${
                                        entry.type === "work"
                                            ? "border-[var(--color-green)] hover:shadow-[var(--color-green)]/10"
                                            : "border-[var(--color-cyan)] hover:shadow-[var(--color-cyan)]/10"
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                                entry.type === "work"
                                                    ? "bg-[var(--color-green)]/10 text-[var(--color-green)]"
                                                    : "bg-[var(--color-cyan)]/10 text-[var(--color-cyan)]"
                                            }`}
                                        >
                                            {entry.date}
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 whitespace-pre-line">
                                        {entry.title}
                                    </h3>
                                    <h4 className="text-xs text-[var(--color-accent)] mb-2">
                                        {entry.org}
                                    </h4>
                                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                        {entry.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Hobbies */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                    {"// Hobbies"}
                </h2>
                <div className="flex flex-wrap gap-3">
                    {timelineData.hobbies.map((h) => {
                        const IconComponent = getIcon(h.icon);
                        return (
                            <span
                                key={h.name}
                                className="flex items-center text-sm px-4 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all hover:-translate-y-0.5 gap-2"
                            >
                                <IconComponent size={16} />
                                <span>{h.name}</span>
                            </span>
                        );
                    })}
                </div>
            </motion.div>

            {hoveredCert && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-lg p-2"
                    style={{ left: hoveredCert.x, top: hoveredCert.y - 8 }}
                >
                    <Image
                        src={hoveredCert.src}
                        alt=""
                        width={112}
                        height={112}
                        className="w-28 h-auto rounded"
                        unoptimized
                    />
                </motion.div>
            )}
        </div>
    );
}