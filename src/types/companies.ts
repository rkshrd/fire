export interface CompanyIdentity {
    type: string;
    sector: string;
    headquarters: string;
    employees: string;
    countries?: string;
}

export interface KPI {
    value: string;
    label: string;
}

export interface Mission {
    title: string;
    description: string;
    details?: string[];
    tools?: string[];
}

export interface TechCategory {
    category: string;
    tools: string[];
}

export interface ChecklistItem {
    feature: string;
    status: string;
    criticality: string;
}

export interface ProjectNode {
    id: string;
    label: string;
    x: number;
    y: number;
    color: string;
    w?: number;
    isCenter?: boolean;
}

export interface CompanyProject {
    title: string;
    description: string;
    type: "architecture" | "checklist";
    nodes?: ProjectNode[];
    edges?: [string, string][];
    items?: ChecklistItem[];
}

export interface MethodologyStep {
    label: string;
    description: string;
}

export interface RevenueDataPoint {
    year: string;
    value: number;
}

export interface RadarDataPoint {
    axis: string;
    value: number;
}

export interface GrowthDataPoint {
    year: string;
    value: number;
}

export interface ParcInfoDataPoint {
    name: string;
    value: number;
}

export interface RevenueBreakdownItem {
    label: string;
    value: string;
    detail: string;
}

export interface GrowthMultiplierDetail {
    year: string;
    growth: string;
    note: string;
}

export interface GrowthMultiplier {
    value: string;
    label: string;
    details: GrowthMultiplierDetail[];
}

export interface CompanyCharts {
    revenue?: RevenueDataPoint[];
    revenueUnit?: string;
    revenueNote?: string;
    revenueBreakdown?: RevenueBreakdownItem[];
    revenueHighlights?: string[];
    radar?: RadarDataPoint[];
    growth?: GrowthDataPoint[];
    growthLabel?: string;
    growthMultiplier?: GrowthMultiplier;
    parcInfo?: ParcInfoDataPoint[];
}

export interface GrandProject {
    title: string;
    description: string;
    tags: string[];
}

export interface LegalIdentityItem {
    label: string;
    value: string;
}

export interface TimelineEvent {
    year: string;
    text: string;
    accent?: string;
}

export interface ValuePillar {
    title: string;
    items: string[];
}

export interface ServiceTab {
    tab: string;
    items: string[];
}

export interface Facility {
    name: string;
    founded: string;
    practitioners: string;
    employees: string;
    emergency: string;
    address: string;
    phone: string;
    certifications: string[];
    population: string;
    specialties: string[];
    polesExcellence: string[];
}

export interface Conclusion {
    text: string;
    author: string;
    title: string;
}

export interface JobProfile {
    profile: string;
    apps: string;
}

export interface SourceLink {
    label: string;
    url?: string;
}