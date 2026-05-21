export type WorkProject = {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  fullDetails?: string;
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "lumen",
    image: "/images/projects/lumen.png",
    imageAlt: "Lumen",
    title: "Lumen",
    subtitle: "ui/ux design, brand design, web development",
    fullDetails: "Lumen is an agile workspace for software teams: plan sprints, manage a backlog, assign and track tasks by status and priority, and keep the current iteration clear for everyone on the squad. Leads use a dashboard with burndown-style progress, per-member output, and live activity to spot blockers without juggling spreadsheets. Lumi, the in-app assistant, answers in plain language, list tasks, summarize the sprint, create work, or check workload, so routine updates stay in one place.\n\nThe app was built for Oracle as part of an OCI-focused challenge: a full-stack product on Spring Boot and React, backed by Oracle Autonomous Database, with deployment automated through OCI DevOps (build pipeline, container registry, and Kubernetes).",
  },
  {
    id: "caritas-mty",
    image: "/images/projects/caritas.png",
    imageAlt: "Caritas",
    title: "Cáritas de Monterrey",
    subtitle: "ui/ux design, swift development",
    fullDetails: "A mobile platform designed to digitalize and optimize the organization's fundraising efforts, enhancing community engagement and improving efficiency in donation management and transparency. Developed under the MVVM architecture to ensure a clean, modular, and scalable codebase, leveraging SwiftUI for modern layout declaration alongside UIKit components, and utilizing Supabase for secure, real-time data management.",
  },
  {
    id: "vantage",
    image: "/images/projects/vantage.png",
    imageAlt: "Vantage",
    title: "Vantage",
    subtitle: "ui/ux design, brand design, web development",
    fullDetails: "Vantage is a Next.js-powered digital agency focused on elevating brands through high-performance web development, reliable hosting, and strategic website redesigns. Operating primarily in Spanish, Vantage positions itself as a partner that builds \"digital salespeople\"—modern, conversion-optimized platforms designed to work 24/7. The agency offers comprehensive solutions ranging from immediate, professional landing pages to fully custom, complex platforms, ensuring businesses of all sizes have a premium, secure, and fast online presence."
  }
];
