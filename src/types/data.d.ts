// TypeScript declarations for JSON data imports
// veille.json and projects.json should be located in src/data/
declare module "@/data/veille.json" {
    interface Article {
        date?: string;
        title?: string;
        image?: string;
        link?: string;
        tags: string[];
        description?: string;
        source: string;
    }

    interface Prerequis {
        title: string;
        fonctionnement: string;
        protocole: string;
        environnement: string;
        link?: string;
    }

    interface Veille {
        slug: string;
        title: string;
        "sub-title": string;
        definition: string;
        fonctionnement: string;
        prerequis: Prerequis[];
        articles: Article[];
        sources?: string[];
        image?: string;
    }

    interface VeilleData {
        veilles: Veille[];
    }

    const value: VeilleData;
    export default value;
}

declare module "@/data/projects.json" {
    interface Project {
        id: number;
        title: string;
        tag: string;
        description: string;
        source: string;
        download: string;
        languages: string[];
    }

    interface ProjectsData {
        projects: Project[];
    }

    const value: ProjectsData;
    export default value;
}

declare module "@/data/skills.json" {
    interface Langage {
        name: string;
        icon: string;
    }

    interface Outil {
        name: string;
        icon: string;
    }

    interface Certification {
        name: string;
        url: string;
        src: string;
    }

    interface Langue {
        name: string;
        level: string;
        icon: string;
    }

    interface SkillsData {
        langages: Langage[];
        outils: Outil[];
        certifications: Certification[];
        langues: Langue[];
    }

    const value: SkillsData;
    export default value;
}

declare module "@/data/companies.json" {
    import type {
        CompanyIdentity,
        KPI,
        Mission,
        TechCategory,
        CompanyProject,
        MethodologyStep,
        CompanyCharts,
        GrandProject,
        LegalIdentityItem,
        TimelineEvent,
        ValuePillar,
        ServiceTab,
        Facility,
        Conclusion,
        JobProfile,
        SourceLink,
    } from "@/types/companies";

    interface Company {
        slug: string;
        name: string;
        role: string;
        period: string;
        location: string;
        team: string;
        description: string;
        identity: CompanyIdentity;
        kpis: KPI[];
        missions: Mission[];
        techStack: TechCategory[];
        project: CompanyProject;
        charts?: CompanyCharts;
        grandsProjects?: GrandProject[];
        legalIdentity?: LegalIdentityItem[];
        timeline?: TimelineEvent[];
        values?: ValuePillar[];
        services?: ServiceTab[];
        missionStatement?: string;
        engagements?: string[];
        projectScope?: string[];
        projectDevOps?: string[];
        facility?: Facility;
        jobProfiles?: JobProfile[];
        servicesObjective?: string;
        conclusion?: Conclusion;
        sources?: SourceLink[];
        methodology: MethodologyStep[];
    }

    interface CompaniesData {
        companies: Company[];
    }

    const value: CompaniesData;
    export default value;
}

declare module "@/data/timeline.json" {
    interface TimelineEntry {
        date: string;
        type: string;
        title: string;
        org: string;
        desc: string;
    }

    interface Hobby {
        name: string;
        icon: string;
    }

    interface TimelineData {
        timeline: TimelineEntry[];
        hobbies: Hobby[];
    }

    const value: TimelineData;
    export default value;
}