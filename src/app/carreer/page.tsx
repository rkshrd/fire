"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import { CodeLine, Keyword, Type, Str, Var, Punct } from "@/components/terminal/CodeBlock";

interface Mission {
    title: string;
    description: string;
}

interface Company {
    name: string;
    role: string;
    period: string;
    location: string;
    team: string;
    description: string;
    missions: Mission[];
}

const companies: Company[] = [
    {
        name: "SUEZ R&V",
        role: "Technicien Système et Réseau — Équipe Architecture",
        period: "Sept 2024 — Aujourd'hui",
        location: "Île-de-France",
        team: "Équipe Architecture",
        description:
            "Intégré à l'équipe Architecture du Département Technique, j'interviens sur le design, le déploiement et le maintien des infrastructures réseau et système de l'entreprise. Je participe à des projets d'envergure nationale impliquant switchs, firewalls, VPN et supervision.",
        missions: [
            {
                title: "Architecture Réseau & Switchs",
                description:
                    "Design et déploiement de nouvelles architectures réseau, configuration de switchs managés avec VLANs, spanning-tree et sécurisation des ports.",
            },
            {
                title: "Firewall & VPN",
                description:
                    "Configuration et maintien de règles firewall, mise en place de tunnels VPN site-to-site et client-to-site pour sécuriser les communications inter-sites.",
            },
            {
                title: "Supervision & Monitoring",
                description:
                    "Déploiement et administration de solutions de monitoring réseau (SNMP, syslog) pour garantir la disponibilité des équipements critiques.",
            },
            {
                title: "Référentiel & Documentation",
                description:
                    "Création et maintien d'un référentiel technique complet : schémas réseau, procédures d'exploitation et documentations techniques.",
            },
            {
                title: "Support N2/N3",
                description:
                    "Prise en charge des incidents réseau escaladés, analyse des logs, diagnostic et résolution de problèmes complexes sur l'infrastructure.",
            },
            {
                title: "Projets Transverses",
                description:
                    "Participation à des projets transverses : migration d'équipements, standardisation des configurations et amélioration continue des processus.",
            },
        ],
    },
    {
        name: "Vivalto Santé / CHPE",
        role: "Technicien Support IT",
        period: "Sept 2023 — Sept 2024",
        location: "Île-de-France",
        team: "Service Informatique",
        description:
            "Au sein du service informatique du Centre Hospitalier Paul Eismein, j'ai assuré le support utilisateur, la gestion du parc informatique et piloté le projet de migration Windows 11 avec renouvellement du matériel.",
        missions: [
            {
                title: "Migration Windows 11",
                description:
                    "Pilotage de la migration vers Windows 11 : inventaire du parc, planification par service, masterisation, déploiement et accompagnement des utilisateurs.",
            },
            {
                title: "Gestion du Parc IT",
                description:
                    "Administration du parc informatique via GLPI et OCS Inventory : suivi des actifs, gestion des licences et cycle de vie du matériel.",
            },
            {
                title: "Support Utilisateur",
                description:
                    "Support de proximité N1/N2 pour les professionnels de santé : dépannage, installation, configuration et formation aux outils métier.",
            },
            {
                title: "Onboarding & Offboarding",
                description:
                    "Gestion des arrivées et départs : création de comptes AD, messagerie, attribution de matériel et récupération à la sortie.",
            },
            {
                title: "Infrastructure Imprimantes",
                description:
                    "Déploiement et maintenance de la flotte d'imprimantes réseau, création de référentiels et guides d'utilisation.",
            },
            {
                title: "Contrôle d'Accès",
                description:
                    "Installation et configuration de dispositifs de contrôle d'accès physique pour sécuriser les zones sensibles de l'établissement.",
            },
        ],
    },
];

export default function CarreerPage() {
    const [activeCompany, setActiveCompany] = useState(0);
    const company = companies[activeCompany];

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
                {companies.map((c, i) => (
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