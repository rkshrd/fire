// This file tells TypeScript to allow importing .json files
// The actual veille.json should be copied from the root project to src/data/
declare module "@/data/veille.json" {
    interface Article {
        date: string;
        title: string;
        image: string;
        link: string;
        tags: string[];
        description: string;
        source: string;
    }

    interface Prerequis {
        title: string;
        fonctionnement: string;
        protocole: string;
        environnement: string;
        link: string;
    }

    interface Veille {
        title: string;
        "sub-title": string;
        definition: string;
        fonctionnement: string;
        prerequis: Prerequis[];
        articles: Article[];
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
