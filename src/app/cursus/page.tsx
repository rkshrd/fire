"use client";

import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import { Server, ArrowRightLeft } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function CursusPage() {
    return (
        <div className="max-w-[1100px] mx-auto px-6 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-3xl sm:text-5xl font-bold mb-2 text-[var(--color-text-primary)]">
                    BTS SIO
                    <span className="inline-block ml-2 text-[var(--color-accent)] animate-[blink_1s_infinite]">
                        _
                    </span>
                </h1>
                <p className="text-[var(--color-text-secondary)] font-mono text-sm">
                    Services Informatiques aux Organisations
                </p>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
                {/* BTS SIO Explanation */}
                <motion.div variants={item}>
                    <TerminalWindow
                        title="about_bts_sio.md"
                        tag="open in new tab ↗"
                        onClick={() => window.open("https://www.ensitech.eu/niveau/bts/", "_blank")}
                    >
                        <p className="text-[var(--color-text-muted)] text-xs mb-3">
                            {"// Qu'est-ce que le BTS SIO ?"}
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                            Le Brevet de Technicien Supérieur Services Informatiques aux
                            Organisations est un diplôme de niveau Bac+2 préparant aux métiers de
                            l&apos;informatique, sur deux années de formation.
                        </p>

                        <h2 className="text-[var(--color-accent)] font-semibold text-sm mb-4">
                            {"> Les deux options du BTS SIO"}
                        </h2>

                        {/* SISR vs SLAM */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {/* SISR */}
                            <div className="border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-bg-primary)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <Server size={20} className="text-[var(--color-accent)]" />
                                    <div>
                                        <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                                            SISR
                                        </h3>
                                        <p className="text-[10px] text-[var(--color-accent)]">
                                            Solutions d&apos;Infrastructure, Systèmes et Réseaux
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-[var(--color-green)] mb-2 font-semibold">
                                    {`// L'option que j'ai choisie`}
                                </p>
                                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                                    <li>{">"} Administration des systèmes et des réseaux</li>
                                    <li>{">"} Cybersécurité et protection des données</li>
                                    <li>{">"} Maintenance et supervision des infrastructures</li>
                                    <li>{">"} Solutions de virtualisation et de cloud</li>
                                    <li>{">"} Support et assistance aux utilisateurs</li>
                                </ul>
                                <p className="mt-3 text-[10px] text-[var(--color-text-muted)]">
                                    <span className="text-[var(--color-accent)]">Débouchés:</span>{" "}
                                    Admin systèmes & réseaux, technicien support, expert
                                    cybersécurité
                                </p>
                            </div>

                            {/* SLAM */}
                            <div className="border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-bg-primary)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <ArrowRightLeft size={20} className="text-[var(--color-cyan)]" />
                                    <div>
                                        <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                                            SLAM
                                        </h3>
                                        <p className="text-[10px] text-[var(--color-cyan)]">
                                            Solutions Logicielles et Applications Métiers
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-[var(--color-text-muted)] mb-2">
                                    {"// Option orientée développement"}
                                </p>
                                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                                    <li>{">"} Développement d&apos;applications web et mobiles</li>
                                    <li>{">"} Programmation et bases de données</li>
                                    <li>{">"} Conception de solutions applicatives</li>
                                    <li>{">"} Gestion de projets informatiques</li>
                                    <li>{">"} Maintenance évolutive et corrective</li>
                                </ul>
                                <p className="mt-3 text-[10px] text-[var(--color-text-muted)]">
                                    <span className="text-[var(--color-accent)]">Débouchés:</span>{" "}
                                    Dev web/mobile, analyste-programmeur, chef de projet
                                </p>
                            </div>
                        </div>

                        {/* Programme commun */}
                        <h2 className="text-[var(--color-accent)] font-semibold text-sm mb-3">
                            {"> Programme commun"}
                        </h2>
                        <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 mb-6">
                            <li>{">"} Culture générale et expression</li>
                            <li>{">"} Expression et communication en langue anglaise</li>
                            <li>{">"} Mathématiques pour l&apos;informatique</li>
                            <li>{">"} Culture économique, juridique et managériale</li>
                            <li>{">"} Analyse des services informatiques dans les organisations</li>
                        </ul>

                        {/* Stages */}
                        <h2 className="text-[var(--color-accent)] font-semibold text-sm mb-3">
                            {"> Stages en entreprise"}
                        </h2>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                            La formation comprend{" "}
                            <span className="text-[var(--color-text-primary)] font-semibold">
                                12 semaines de stage
                            </span>{" "}
                            réparties sur les deux années :
                        </p>
                        <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                            <li>{">"} 1ère année : 5 semaines de stage</li>
                            <li>{">"} 2ème année : 7 semaines de stage</li>
                        </ul>
                    </TerminalWindow>
                </motion.div>

                {/* BTS CIEL */}
                <motion.div variants={item}>
                    <TerminalWindow
                        title="bts_ciel.md"
                        tag="open in new tab ↗"
                        onClick={() =>
                            window.open(
                                "https://www.ensitech.eu/bts-ciel-option-informatique-et-reseaux/",
                                "_blank"
                            )
                        }
                    >
                        <h2 className="text-[var(--color-accent)] font-semibold text-sm mb-3">
                            {"> BTS CIEL"}
                        </h2>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                            Le BTS Cybersécurité, Informatique et réseaux, Électronique (CIEL) est
                            un diplôme qui forme aux compétences en sécurité informatique, gestion
                            des réseaux et systèmes électroniques.
                        </p>
                        <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                            <li>
                                {">"} Axes majeurs : Développement & Innovation, Sécurité, Systèmes
                                & Réseaux
                            </li>
                        </ul>
                    </TerminalWindow>
                </motion.div>

                {/* Bachelor */}
                <motion.div variants={item}>
                    <TerminalWindow
                        title="bachelor_1_2.md"
                        tag="open in new tab ↗"
                        onClick={() =>
                            window.open(
                                "https://www.ensitech.eu/bachelor-1-2-informatique-cybersecurite-developpement/",
                                "_blank"
                            )
                        }
                    >
                        <h2 className="text-[var(--color-accent)] font-semibold text-sm mb-3">
                            {"> Bachelor 1 & 2"}
                        </h2>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                            Formation post-bac en informatique, cybersécurité et développement sur
                            deux ans, avec une pédagogie axée sur la pratique et les projets
                            professionnels.
                        </p>
                        <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                            <li>
                                {">"} Axes majeurs : Développement & Innovation, Sécurité, Systèmes
                                & Réseaux
                            </li>
                        </ul>
                    </TerminalWindow>
                </motion.div>

                {/* ENSITECH */}
                <motion.div variants={item}>
                    <TerminalWindow
                        title="school_ensitech.md"
                        tag="open in new tab ↗"
                        onClick={() => window.open("https://www.ensitech.eu/", "_blank")}
                    >
                        <h2 className="text-[var(--color-accent)] font-semibold text-sm mb-3">
                            {"> ENSITECH – IT Innovation School"}
                        </h2>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                            ENSITECH est une école supérieure d&apos;informatique et de
                            cybersécurité, du{" "}
                            <span className="text-[var(--color-text-primary)] font-semibold">
                                Bac+2 au Bac+5
                            </span>
                            , proposant des cursus en alternance ou en initial.
                        </p>
                        <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 mb-4">
                            <li>
                                {">"} Axes majeurs : Développement & Innovation, Sécurité, Systèmes
                                & Réseaux
                            </li>
                            <li>
                                {">"} Diplômes reconnus par l&apos;État et titres certifiés au RNCP
                            </li>
                            <li>
                                {">"} Réseau solide d&apos;entreprises partenaires pour
                                l&apos;alternance
                            </li>
                            <li>
                                {">"} Accompagnement personnalisé (coaching, job dating, ateliers
                                CV…)
                            </li>
                            <li>
                                {">"} Campus : Cergy, Saint-Quentin-en-Yvelines, Marseille, Nantes…
                            </li>
                        </ul>
                        <a
                            href="https://www.ensitech.eu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs font-mono text-[var(--color-accent)] hover:underline"
                            data-hoverable
                            onClick={(e) => e.stopPropagation()}
                        >
                            {"→ Découvrir le site d'ENSITECH"}
                        </a>
                    </TerminalWindow>
                </motion.div>
            </motion.div>
        </div>
    );
}
