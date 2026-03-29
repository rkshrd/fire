"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { ProjectNode, ChecklistItem, CompanyProject } from "@/types/companies";

function ArchitectureDiagram({
    nodes,
    edges,
}: {
    nodes: ProjectNode[];
    edges: [string, string][];
}) {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const center = nodes.find((n) => n.isCenter);
    const peripherals = nodes.filter((n) => !n.isCenter);

    const cx = 320;
    const cy = 200;
    const rx = 230;
    const ry = 130;

    const positions = new Map<string, { x: number; y: number }>();
    if (center) positions.set(center.id, { x: cx, y: cy });

    peripherals.forEach((node, i) => {
        const angle = (2 * Math.PI * i) / peripherals.length - Math.PI / 2;
        positions.set(node.id, {
            x: cx + rx * Math.cos(angle),
            y: cy + ry * Math.sin(angle),
        });
    });

    return (
        <svg viewBox="0 0 640 400" className="w-full h-auto">
            {/* Edges */}
            {edges.map(([from, to], i) => {
                const p1 = positions.get(from);
                const p2 = positions.get(to);
                if (!p1 || !p2) return null;
                const isHighlighted = hoveredNode === from || hoveredNode === to;
                return (
                    <line
                        key={i}
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke={isHighlighted ? "var(--color-accent)" : "var(--color-border)"}
                        strokeWidth={isHighlighted ? 2 : 1}
                        strokeDasharray="6 4"
                        style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                    />
                );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
                const pos = positions.get(node.id);
                if (!pos) return null;
                const isCenter = !!node.isCenter;
                const isHighlighted = hoveredNode === node.id;
                const w = isCenter ? 140 : 100;
                const h = isCenter ? 36 : 28;

                return (
                    <g
                        key={node.id}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        style={{ cursor: "default" }}
                    >
                        <rect
                            x={pos.x - w / 2}
                            y={pos.y - h / 2}
                            width={w}
                            height={h}
                            rx={6}
                            fill={isCenter ? "var(--color-accent)" : "var(--color-bg-card)"}
                            stroke={
                                isCenter
                                    ? "var(--color-accent)"
                                    : isHighlighted
                                      ? "var(--color-accent)"
                                      : "var(--color-border)"
                            }
                            strokeWidth={1.5}
                            style={{ transition: "stroke 0.2s" }}
                        />
                        <text
                            x={pos.x}
                            y={pos.y + 1}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={
                                isCenter
                                    ? "var(--color-bg-primary)"
                                    : isHighlighted
                                      ? "var(--color-accent)"
                                      : "var(--color-text-secondary)"
                            }
                            fontSize={isCenter ? 12 : 10}
                            fontWeight={isCenter ? 700 : 500}
                            fontFamily="var(--font-mono)"
                            style={{ transition: "fill 0.2s" }}
                        >
                            {node.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

function ChecklistTable({ items }: { items: ChecklistItem[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
                <thead>
                    <tr className="border-b border-[var(--color-border)]">
                        <th className="text-left text-[var(--color-text-muted)] text-xs py-2 pr-4">
                            Fonctionnalité
                        </th>
                        <th className="text-center text-[var(--color-text-muted)] text-xs py-2 px-4">
                            Statut
                        </th>
                        <th className="text-center text-[var(--color-text-muted)] text-xs py-2 pl-4">
                            Criticité
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <motion.tr
                            key={item.feature}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 * i }}
                            className="border-b border-[var(--color-border)] last:border-0"
                        >
                            <td className="py-2.5 pr-4 text-xs text-[var(--color-text-secondary)]">
                                <span className="text-[var(--color-green)] mr-2">✓</span>
                                {item.feature}
                            </td>
                            <td className="py-2.5 px-4 text-center">
                                <span
                                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border inline-block text-center min-w-[85px] ${
                                        item.status === "Obligatoire"
                                            ? "border-[var(--color-red)] text-[var(--color-red)]"
                                            : "border-[var(--color-yellow-dot)] text-[var(--color-yellow-dot)]"
                                    }`}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="py-2.5 pl-4 text-center">
                                <span
                                    className={`text-[10px] font-bold uppercase ${
                                        item.criticality === "CRITIQUE"
                                            ? "text-[var(--color-red)]"
                                            : "text-[var(--color-yellow-dot)]"
                                    }`}
                                >
                                    {item.criticality}
                                </span>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function ProjectHighlight({ project }: { project: CompanyProject }) {
    const terminalTitle = project.type === "architecture" ? "architecture.svg" : "requirements.md";

    return (
        <div>
            <TerminalWindow title={terminalTitle}>
                <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-2">
                    {"> " + project.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                    {project.description}
                </p>
                {project.type === "architecture" && project.nodes && project.edges && (
                    <ArchitectureDiagram nodes={project.nodes} edges={project.edges} />
                )}
                {project.type === "checklist" && project.items && (
                    <ChecklistTable items={project.items} />
                )}
            </TerminalWindow>
        </div>
    );
}