"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import ArticleCard from "@/components/veille/ArticleCard";
import PostIt from "@/components/veille/PostIt";
import SourceLinks from "@/components/veille/SourceLinks";
import veilleData from "@/data/veille.json";

type Veille = (typeof veilleData.veilles)[number];

export default function VeillePage() {
    const [activeTopicIndex, setActiveTopicIndex] = useState(0);
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [lightbox, setLightbox] = useState<string | null>(null);

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
                className="text-center mb-4"
            >
                <h1 className="text-3xl sm:text-5xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Veille Technologique
                </h1>
                <p className="text-[var(--color-text-secondary)] font-mono text-sm">
                    {"// Cybersécurité — MFA, ZTNA & SIEM"}
                </p>
            </motion.div>

            {/* Topic nav */}
            <div className="sticky top-0 z-50 py-4.5 px-2 flex gap-2 justify-center flex-wrap">
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

            {/* Definition terminal + illustration */}
            <motion.div
                key={activeTopicIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-10 ${activeTopic.image ? `flex flex-col ${activeTopicIndex % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-6 items-start` : ""}`}
            >
                <div className={activeTopic.image ? "flex-1 min-w-0" : ""}>
                    <TerminalWindow
                        title={`${activeTopic["sub-title"].toLowerCase()}_definition.md`}
                    >
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
                </div>
                {activeTopic.image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="lg:w-1/3 shrink-0 flex justify-center lg:self-stretch overflow-hidden"
                    >
                        <Image
                            src={activeTopic.image}
                            alt={`Illustration ${activeTopic["sub-title"]}`}
                            width={800}
                            height={1100}
                            unoptimized
                            onClick={() => setLightbox(activeTopic.image!)}
                            className="rounded-lg border border-[var(--color-border)] h-full w-full object-cover cursor-zoom-in"
                        />
                    </motion.div>
                )}
            </motion.div>

            {/* Prerequisites (post-its) */}
            {activeTopic.prerequis && activeTopic.prerequis.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                        {"// Prérequis & Méthodes"}
                    </h2>
                    <div className="flex gap-6">
                        <div
                            className={`grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1 ${activeTopic["sub-title"] !== "ZTNA" ? "md:grid-cols-4 lg:grid-cols-5" : ""}`}
                        >
                            {activeTopic.prerequis.map((p, i) => (
                                <PostIt
                                    key={i}
                                    title={p.title}
                                    content={p.fonctionnement.substring(0, 120) + "..."}
                                    index={i}
                                />
                            ))}
                        </div>
                        {activeTopic["sub-title"] === "ZTNA" && (
                            <div className="hidden lg:flex shrink-0 w-1/4">
                                <Image
                                    src="/veille/thrust.jpg"
                                    alt="How Zero Trust Security Works"
                                    width={600}
                                    height={800}
                                    unoptimized
                                    onClick={() => setLightbox("/veille/thrust.jpg")}
                                    className="rounded-lg border border-[var(--color-border)] w-full h-full object-cover cursor-zoom-in"
                                />
                            </div>
                        )}
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

            {activeTopic.sources && activeTopic.sources.length > 0 && (
                <SourceLinks sources={activeTopic.sources} />
            )}

            {filteredArticles.length === 0 && (
                <div className="text-center py-12 text-[var(--color-text-muted)] font-mono text-sm">
                    {"// Aucun article trouvé pour ce filtre"}
                </div>
            )}

            {/* Lightbox */}
            {lightbox && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setLightbox(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out p-8"
                >
                    <Image
                        src={lightbox}
                        alt="Illustration en grand"
                        width={800}
                        height={1100}
                        unoptimized
                        className="max-h-[90vh] max-w-[90vw] w-auto h-auto rounded-lg object-contain"
                    />
                </motion.div>
            )}
        </div>
    );
}