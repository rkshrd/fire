"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import ArticleCard from "@/components/veille/ArticleCard";
import PostIt from "@/components/veille/PostIt";
import veilleData from "@/data/veille.json";

type Veille = (typeof veilleData.veilles)[number];

export default function VeillePage() {
    const [activeTopicIndex, setActiveTopicIndex] = useState(0);
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const activeTopic: Veille = veilleData.veilles[activeTopicIndex];

    // Get all unique tags for current topic
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        activeTopic.articles.forEach((a) => a.tags.forEach((t) => tags.add(t)));
        return Array.from(tags).sort();
    }, [activeTopic]);

    // Filter articles
    const filteredArticles = useMemo(() => {
        return activeTopic.articles.filter((a) => {
            if (!a.title && !a.description) return false;
            if (!activeTag) return true;
            return a.tags.includes(activeTag);
        });
    }, [activeTopic, activeTag]);

    return (
        <div className="max-w-[1200px] mx-auto px-6 py-12">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl sm:text-5xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Veille Technologique
                </h1>
                <p className="text-[var(--color-text-secondary)] font-mono text-sm">
                    {"// Cybersécurité — MFA, ZTNA & SIEM"}
                </p>
            </motion.div>

            {/* Topic nav */}
            <div className="sticky top-14 z-30 glass rounded-lg p-2 mb-8 flex gap-2 justify-center flex-wrap">
                {veilleData.veilles.map((v, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setActiveTopicIndex(i);
                            setActiveTag(null);
                        }}
                        className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${
                            i === activeTopicIndex
                                ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold"
                                : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-hover)]"
                        }`}
                        data-hoverable
                    >
                        {v["sub-title"]}
                    </button>
                ))}
            </div>

            {/* Definition terminal */}
            <motion.div
                key={activeTopicIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
            >
                <TerminalWindow title={`${activeTopic["sub-title"].toLowerCase()}_definition.md`}>
                    <h2 className="text-lg font-bold text-[var(--color-accent)] mb-3">
                        {activeTopic.title}
                    </h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                        {activeTopic.definition}
                    </p>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                        {"> Fonctionnement"}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                        {activeTopic.fonctionnement}
                    </p>
                </TerminalWindow>
            </motion.div>

            {/* Prerequisites (post-its) */}
            {activeTopic.prerequis &&
                activeTopic.prerequis.length > 0 &&
                activeTopic.prerequis[0].title !== "Prerequis 1" && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                            {"// Prérequis & Méthodes"}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {activeTopic.prerequis.map((p, i) => (
                                <PostIt
                                    key={i}
                                    title={p.title}
                                    content={p.fonctionnement.substring(0, 120) + "..."}
                                    index={i}
                                />
                            ))}
                        </div>
                    </div>
                )}

            {/* Tag filter */}
            <div className="mb-6 flex flex-wrap gap-2">
                <button
                    onClick={() => setActiveTag(null)}
                    className={`text-xs font-mono px-3 py-1 rounded-full border transition-all ${
                        !activeTag
                            ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] border-[var(--color-accent)]"
                            : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
                    }`}
                    data-hoverable
                >
                    Tous ({filteredArticles.length})
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                        className={`text-xs font-mono px-3 py-1 rounded-full border transition-all ${
                            tag === activeTag
                                ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] border-[var(--color-accent)]"
                                : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
                        }`}
                        data-hoverable
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Articles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map((article, i) => (
                    <ArticleCard
                        key={`${activeTopicIndex}-${i}`}
                        title={article.title}
                        description={article.description}
                        date={article.date}
                        source={article.source}
                        tags={article.tags}
                        link={article["link"]}
                    />
                ))}
            </div>

            {filteredArticles.length === 0 && (
                <div className="text-center py-12 text-[var(--color-text-muted)] font-mono text-sm">
                    {"// Aucun article trouvé pour ce filtre"}
                </div>
            )}
        </div>
    );
}
