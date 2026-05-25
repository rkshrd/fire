"use client";

import { useState, useEffect, useRef } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, PieChart, Pie } from "recharts";
import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type {
    RevenueDataPoint,
    RadarDataPoint,
    GrowthDataPoint,
    ParcInfoDataPoint,
    RevenueBreakdownItem,
    GrowthMultiplier,
    CompanyCharts,
} from "@/types/companies";

function useContainerSize<T extends HTMLElement = HTMLDivElement>() {
    const ref = useRef<T>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width: Math.floor(width), height: Math.floor(height) });
        });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return { ref, ...size };
}

// ─── Revenue Bar Chart (SVG inline) ───────────────────────────
function RevenueBarChart({
    data,
    unit = "Md€",
    note,
}: {
    data: RevenueDataPoint[];
    unit?: string;
    note?: string;
}) {
    const [animated, setAnimated] = useState(false);
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) setAnimated(true);
            },
            { threshold: 0.3 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const maxVal = Math.ceil(Math.max(...data.map((d) => d.value)) * 1.15);
    const barW = 52;
    const gap = 36;
    const chartH = 180;
    const offsetX = 45;
    const totalW = offsetX + data.length * (barW + gap) + 20;

    const gridLines = [];
    const step = maxVal <= 5 ? 0.5 : maxVal <= 12 ? 2 : 5;
    for (let v = 0; v <= maxVal; v += step) {
        gridLines.push(v);
    }

    return (
        <TerminalWindow title="revenue.sh">
            <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono">
                {"$ cat revenue --format=chart"}
            </p>
            <svg ref={ref} viewBox={`0 0 ${totalW} ${chartH + 50}`} className="w-full h-auto">
                {/* Grid lines */}
                {gridLines.map((v) => {
                    const y = chartH - (v / maxVal) * chartH + 15;
                    return (
                        <g key={v}>
                            <line
                                x1={offsetX - 5}
                                y1={y}
                                x2={totalW - 10}
                                y2={y}
                                stroke="var(--color-border)"
                                strokeWidth={0.8}
                            />
                            <text
                                x={offsetX - 10}
                                y={y + 4}
                                textAnchor="end"
                                fill="var(--color-text-muted)"
                                fontSize={9}
                                fontFamily="var(--font-mono)"
                            >
                                {v}
                            </text>
                        </g>
                    );
                })}

                {/* Bars */}
                {data.map((d, i) => {
                    const barH = (d.value / maxVal) * chartH;
                    const x = offsetX + i * (barW + gap) + gap / 2;
                    const y = chartH - barH + 15;
                    const opacity = 0.5 + (i / (data.length - 1)) * 0.5;

                    return (
                        <g key={i}>
                            <rect
                                x={x}
                                y={animated ? y : chartH + 15}
                                width={barW}
                                height={animated ? barH : 0}
                                rx={4}
                                fill="var(--color-accent)"
                                opacity={opacity}
                                style={{
                                    transition: `all 0.8s ease ${i * 0.12}s`,
                                }}
                            />
                            <text
                                x={x + barW / 2}
                                y={animated ? y - 6 : chartH + 10}
                                textAnchor="middle"
                                fill="var(--color-accent)"
                                fontSize={11}
                                fontWeight={700}
                                fontFamily="var(--font-mono)"
                                style={{
                                    transition: `all 0.8s ease ${i * 0.12}s`,
                                }}
                            >
                                {d.value} {unit}
                            </text>
                            <text
                                x={x + barW / 2}
                                y={chartH + 32}
                                textAnchor="middle"
                                fill="var(--color-text-muted)"
                                fontSize={10}
                                fontFamily="var(--font-mono)"
                            >
                                {d.year}
                            </text>
                        </g>
                    );
                })}
            </svg>
            {note && (
                <p className="text-[10px] text-[var(--color-text-muted)] mt-2 italic font-mono">
                    {note}
                </p>
            )}
        </TerminalWindow>
    );
}

// ─── Radar Chart (SVG inline) ─────────────────────────────────
function RadarChart({ data }: { data: RadarDataPoint[] }) {
    const cx = 150,
        cy = 150,
        r = 110;
    const angleStep = (2 * Math.PI) / data.length;

    const getPoint = (i: number, scale = 1) => ({
        x: +(cx + r * scale * Math.sin(i * angleStep)).toFixed(2),
        y: +(cy - r * scale * Math.cos(i * angleStep)).toFixed(2),
    });

    const polygonPoints = data
        .map((d, i) => {
            const p = getPoint(i, d.value);
            return `${p.x},${p.y}`;
        })
        .join(" ");

    return (
        <TerminalWindow title="positioning.svg">
            <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono">
                {"$ render positioning --axes=6"}
            </p>
            <div className="flex justify-center">
                <svg viewBox="0 0 300 300" className="w-full max-w-[300px] h-auto">
                    {/* Grid polygons */}
                    {[0.25, 0.5, 0.75, 1].map((scale) => (
                        <polygon
                            key={scale}
                            points={data
                                .map((_, i) => {
                                    const p = getPoint(i, scale);
                                    return `${p.x},${p.y}`;
                                })
                                .join(" ")}
                            fill="none"
                            stroke="var(--color-border)"
                            strokeWidth={0.8}
                        />
                    ))}

                    {/* Spokes */}
                    {data.map((_, i) => {
                        const p = getPoint(i, 1);
                        return (
                            <line
                                key={i}
                                x1={cx}
                                y1={cy}
                                x2={p.x}
                                y2={p.y}
                                stroke="var(--color-border)"
                                strokeWidth={0.5}
                            />
                        );
                    })}

                    {/* Data polygon */}
                    <polygon
                        points={polygonPoints}
                        fill="var(--color-accent)"
                        fillOpacity={0.15}
                        stroke="var(--color-accent)"
                        strokeWidth={2}
                    />

                    {/* Data points */}
                    {data.map((d, i) => {
                        const p = getPoint(i, d.value);
                        return (
                            <circle
                                key={i}
                                cx={p.x}
                                cy={p.y}
                                r={4}
                                fill="var(--color-bg-card)"
                                stroke="var(--color-accent)"
                                strokeWidth={2}
                            />
                        );
                    })}

                    {/* Labels */}
                    {data.map((d, i) => {
                        const p = getPoint(i, 1.18);
                        return (
                            <text
                                key={i}
                                x={p.x}
                                y={p.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="var(--color-text-secondary)"
                                fontSize={10}
                                fontWeight={600}
                                fontFamily="var(--font-mono)"
                            >
                                {d.axis}
                            </text>
                        );
                    })}
                </svg>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] text-center mt-3 italic font-mono">
                Positionnement stratégique sur les {data.length} axes de valeur
            </p>
        </TerminalWindow>
    );
}

// ─── Growth Area Chart (recharts) ─────────────────────────────
function GrowthAreaChart({ data, label = "Valeur" }: { data: GrowthDataPoint[]; label?: string }) {
    const { ref, width, height } = useContainerSize<HTMLDivElement>();

    return (
        <TerminalWindow title="growth.sh">
            <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono">
                {`$ plot growth --metric="${label}"`}
            </p>
            <div ref={ref} className="h-56 [&_*]:outline-none">
                {width > 0 && height > 0 && (
                    <AreaChart data={data} width={width} height={height}>
                        <defs>
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#28d27a" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#28d27a" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--color-border)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="year"
                            tick={{ fill: "var(--color-text-muted)", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: "var(--color-text-muted)", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            formatter={(v) => [`${v} ${label.toLowerCase()}`, label]}
                            contentStyle={{
                                background: "var(--color-bg-card)",
                                border: "1px solid var(--color-border)",
                                borderRadius: 8,
                                fontSize: 12,
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#28d27a"
                            strokeWidth={2.5}
                            fill="url(#areaGrad)"
                            dot={{
                                r: 4,
                                fill: "var(--color-bg-card)",
                                stroke: "#28d27a",
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                )}
            </div>
        </TerminalWindow>
    );
}

// ─── Parc Info Pie Chart (recharts) ───────────────────────────
const pieColors = ["#28d27a", "#4ec9b0", "#1a8a5c", "#6b7280"];

function ParcPieChart({ data }: { data: ParcInfoDataPoint[] }) {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const { ref, width, height } = useContainerSize<HTMLDivElement>();

    const coloredData = data.map((d, i) => ({
        ...d,
        fill: pieColors[i % pieColors.length],
    }));

    return (
        <TerminalWindow title="parc_info.sh">
            <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono">
                {"$ inventory --summary --chart"}
            </p>
            <div ref={ref} className="h-56 relative [&_*]:outline-none">
                {width > 0 && height > 0 && (
                    <PieChart width={width} height={height}>
                        <Pie
                            data={coloredData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="none"
                        />
                        <Tooltip
                            formatter={(v, name) => [`${v} postes`, name]}
                            contentStyle={{
                                background: "var(--color-bg-card)",
                                border: "1px solid var(--color-border)",
                                borderRadius: 8,
                                fontSize: 12,
                            }}
                        />
                    </PieChart>
                )}
                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div>
                        <div className="text-lg font-bold text-[var(--color-accent)] font-mono">
                            {total}
                        </div>
                        <div className="text-[10px] text-[var(--color-text-muted)]">postes</div>
                    </div>
                </div>
            </div>
        </TerminalWindow>
    );
}

// ─── Revenue Breakdown Cards (SUEZ) ──────────────────────────
function RevenueBreakdown({
    items,
    highlights,
}: {
    items: RevenueBreakdownItem[];
    highlights?: string[];
}) {
    return (
        <TerminalWindow title="breakdown.sh">
            <p className="text-xs text-[var(--color-text-muted)] mb-3 font-mono">
                {"$ revenue --breakdown"}
            </p>
            <div className="space-y-3">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)]"
                    >
                        <p className="text-[10px] text-[var(--color-text-muted)] mb-1 font-mono">
                            {item.label}
                        </p>
                        <p className="text-lg font-bold text-[var(--color-accent)] font-mono">
                            {item.value}
                        </p>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-1 font-mono">
                            {item.detail}
                        </p>
                    </div>
                ))}
            </div>
            {highlights && highlights.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {highlights.map((h) => (
                        <span
                            key={h}
                            className="text-[10px] px-2 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] font-mono flex items-center gap-1"
                        >
                            <span className="text-[var(--color-green)]">{"\u2713"}</span> {h}
                        </span>
                    ))}
                </div>
            )}
        </TerminalWindow>
    );
}

// ─── Growth Multiplier Cards (Vivalto) ────────────────────────
function GrowthMultiplierCard({ data }: { data: GrowthMultiplier }) {
    return (
        <TerminalWindow title="growth_rate.sh">
            <p className="text-xs text-[var(--color-text-muted)] mb-3 font-mono">
                {"$ growth --rate --yearly"}
            </p>
            <div className="text-center mb-4">
                <div className="text-3xl font-bold text-[var(--color-accent)] font-mono">
                    {data.value}
                </div>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{data.label}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {data.details.map((d) => (
                    <div
                        key={d.year}
                        className="p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)]"
                    >
                        <div className="text-[10px] text-[var(--color-text-muted)] font-mono">
                            {d.year}
                        </div>
                        <div className="text-sm font-bold text-[var(--color-accent)] font-mono">
                            {d.growth}
                        </div>
                        <div className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                            {d.note}
                        </div>
                    </div>
                ))}
            </div>
        </TerminalWindow>
    );
}

// ─── Main Component ───────────────────────────────────────────
export default function CompanyCharts({ charts }: { charts: CompanyCharts }) {
    const hasRevenue = charts.revenue && charts.revenue.length > 0;
    const hasRadar = charts.radar && charts.radar.length > 0;
    const hasGrowth = charts.growth && charts.growth.length > 0;
    const hasParcInfo = charts.parcInfo && charts.parcInfo.length > 0;
    const hasBreakdown = charts.revenueBreakdown && charts.revenueBreakdown.length > 0;
    const hasMultiplier = !!charts.growthMultiplier;

    const chartCount =
        (hasRevenue ? 1 : 0) +
        (hasRadar ? 1 : 0) +
        (hasGrowth ? 1 : 0) +
        (hasParcInfo ? 1 : 0) +
        (hasBreakdown ? 1 : 0) +
        (hasMultiplier ? 1 : 0);

    if (chartCount === 0) return null;

    return (
        <div className={chartCount >= 2 ? "grid md:grid-cols-2 gap-4" : ""}>
            {hasRevenue && (
                <motion.div
                    className="min-w-0"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <RevenueBarChart
                        data={charts.revenue!}
                        unit={charts.revenueUnit}
                        note={charts.revenueNote}
                    />
                </motion.div>
            )}
            {hasBreakdown && (
                <motion.div
                    className="min-w-0"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <RevenueBreakdown
                        items={charts.revenueBreakdown!}
                        highlights={charts.revenueHighlights}
                    />
                </motion.div>
            )}
            {hasRadar && (
                <motion.div
                    className="min-w-0"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <RadarChart data={charts.radar!} />
                </motion.div>
            )}
            {hasMultiplier && (
                <motion.div
                    className="min-w-0"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <GrowthMultiplierCard data={charts.growthMultiplier!} />
                </motion.div>
            )}
            {hasGrowth && (
                <motion.div
                    className="min-w-0"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <GrowthAreaChart data={charts.growth!} label={charts.growthLabel} />
                </motion.div>
            )}
            {hasParcInfo && (
                <motion.div
                    className="min-w-0"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <ParcPieChart data={charts.parcInfo!} />
                </motion.div>
            )}
        </div>
    );
}