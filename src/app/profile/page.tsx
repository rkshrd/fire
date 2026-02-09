"use client";

import { motion } from "framer-motion";
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
import {
    Code,
    Terminal,
    Globe,
    Database,
    Monitor,
    Container,
    GitBranch,
    Server,
    Mountain,
    BookOpen,
    Gamepad2,
    Dumbbell,
    Crown,
    Telescope,
    Languages,
} from "lucide-react";

const skills = {
    langages: [
        { name: "Python", icon: Code },
        { name: "JavaScript", icon: Code },
        { name: "HTML/CSS", icon: Globe },
        { name: "Bash", icon: Terminal },
        { name: "SQL", icon: Database },
        { name: "PowerShell", icon: Terminal },
        { name: "PHP", icon: Code },
    ],
    outils: [
        { name: "Linux", icon: Monitor },
        { name: "Wireshark", icon: Monitor },
        { name: "Metasploit", icon: Monitor },
        { name: "Windows", icon: Monitor },
        { name: "Docker", icon: Container },
        { name: "Git", icon: GitBranch },
        { name: "VMware", icon: Server },
    ],
    certifications: [
        "CompTIA Security+",
        "Cisco CCNA 1",
        "EBios Risk",
        "FM: Sécurité des Réseaux",
        "Cisco: Intro Cybersécurité",
        "Cisco: Basiques Matériel",
        "CNIL: RGPD",
        "SecNum: Intro Cybersécurité",
    ],
    langues: [
        { name: "Anglais", level: "C1", icon: Languages },
        { name: "Espagnol", level: "B2", icon: Languages },
        { name: "Japonais", level: "A2", icon: Languages },
    ],
};

const timeline = [
    {
        date: "09.2025",
        type: "work",
        title: "Technicienne Informatique\n(Équipe Architecture) — Alternance",
        org: "SUEZ R&V",
        desc: "Valorisation des Produits IT ; automatisation ; référencements ; analyse et structuration de données",
    },
    {
        date: "09.2024 → 2026",
        type: "school",
        title: "BTS SIO — SISR",
        org: "ENSUP CAMPUS SQY (ENSITECH)",
        desc: "Spécialisation systèmes/réseaux et cybersécurité",
    },
    {
        date: "09.2024 → 08.2025",
        type: "work",
        title: "Technicienne Support Informatique — Alternance",
        org: "Clinique Privée de l'Europe, Le Port-Marly",
        desc: "Gestion/maintenance des infrastructures réseau, support N1&2",
    },
    {
        date: "02.2024 → 05.2024",
        type: "work",
        title: "Technicienne Support Informatique — Stage",
        org: "Clinique Privée de l'Europe, Le Port-Marly",
        desc: "Maintenance des infrastructures réseau, support N1&2 (7 semaines)",
    },
    {
        date: "09.2023 → 06.2024",
        type: "school",
        title: "BTS SIO SISR 1",
        org: "H3 Campus, Poissy",
        desc: "Première année de BTS SIO, spécialisation SISR",
    },
    {
        date: "2022 → 2023",
        type: "school",
        title: "Licence Sociologie",
        org: "Université Nanterre",
        desc: "Option anthropologie & ethnologie",
    },
    {
        date: "2021 → 2022",
        type: "school",
        title: "Licence Humanités",
        org: "Institut Catholique de Paris",
        desc: "Sociologie, Anthropologie, Théologie, Philosophie, Histoire, Grec ancien",
    },
    {
        date: "2017 → 2020",
        type: "school",
        title: "Baccalauréat Général — Littérature",
        org: "Candidate libre",
        desc: "Obtention sept. 2020 — Mention AB. Spé: Droits & grands enjeux du monde contemporain, Littérature Anglaise",
    },
];

const hobbies = [
    { name: "Escalade", icon: Mountain },
    { name: "Lecture", icon: BookOpen },
    { name: "Jeux vidéo", icon: Gamepad2 },
    { name: "Musculation", icon: Dumbbell },
    { name: "Échecs", icon: Crown },
    { name: "Astronomie", icon: Telescope },
];

export default function ProfilePage() {
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
                    <CodeBlock language="typescript">
                        <CodeLine lineNumber={1}>
                            <Keyword>interface</Keyword> <Type>Profile</Type> <Punct>{"{"}</Punct>
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
                                {"// Reconversion vers l'informatique par curiosité et challenge"}
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
                            {skills.langages.map((s) => {
                                const IconComponent = s.icon;
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
                            {skills.outils.map((s) => {
                                const IconComponent = s.icon;
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
                            {skills.certifications.map((c) => (
                                <span
                                    key={c}
                                    className="text-xs px-3 py-1.5 rounded-md bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                                >
                                    {">"} {c}
                                </span>
                            ))}
                        </div>
                    </TerminalWindow>

                    {/* Languages */}
                    <TerminalWindow title="languages_spoken.json">
                        <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-3">
                            {"> Langues"}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.langues.map((l) => {
                                const IconComponent = l.icon;
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
                        {timeline.map((entry, i) => (
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
                    {hobbies.map((h) => {
                        const IconComponent = h.icon;
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
        </div>
    );
}