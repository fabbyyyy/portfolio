export type WorkProject = {
  id: string;
  logo: string;
  title: string;
  subtitle: string;
  summary: string;
  stack: string;
  fullDetails?: string;
  screenshots?: ProjectScreenshot[];
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "lumen",
    logo: "/images/projects/lumen/lumen.svg",
    title: "Lumen",
    subtitle: "ui/ux design, brand design, web development",
    summary: "Sprint planning and task tracking for software teams.",
    stack: "React · Spring Boot · Oracle Cloud Infrastructure",
    screenshots: [
      {
        src: "/images/projects/lumen/screenshots/1.png",
        alt: "Lumen landing page introducing sprint planning",
        width: 3378,
        height: 2130,
      },
      {
        src: "/images/projects/lumen/screenshots/2.png",
        alt: "Lumen feature overview for developers and team leads",
        width: 3374,
        height: 1980,
      },
      {
        src: "/images/projects/lumen/screenshots/3.png",
        alt: "Sprint workspace with the backlog and schedule",
        width: 3404,
        height: 2122,
      },
      {
        src: "/images/projects/lumen/screenshots/4.png",
        alt: "Ask Lumi assistant input",
        width: 798,
        height: 154,
      },
      {
        src: "/images/projects/lumen/screenshots/5.png",
        alt: "Project dashboard with active teams and progress",
        width: 3406,
        height: 2102,
      },
      {
        src: "/images/projects/lumen/screenshots/6.png",
        alt: "Team analytics showing sprint quality and delivery trends",
        width: 3410,
        height: 2118,
      },
    ],
    fullDetails: "Lumen is an agile workspace for software teams: plan sprints, manage a backlog, assign and track tasks by status and priority, and keep the current iteration clear for everyone on the squad. Leads use a dashboard with burndown-style progress, per-member output, and live activity to spot blockers without juggling spreadsheets. Lumi, the in-app assistant, answers in plain language, list tasks, summarize the sprint, create work, or check workload, so routine updates stay in one place.\n\nThe app was built for Oracle as part of an OCI-focused challenge: a full-stack product on Spring Boot and React, backed by Oracle Autonomous Database, with deployment automated through OCI DevOps (build pipeline, container registry, and Kubernetes).",
  },
  {
    id: "caritas-mty",
    logo: "/images/projects/caritas/caritas.svg",
    title: "Cáritas de Monterrey",
    subtitle: "ui/ux design, swift development",
    summary: "An iOS app for fundraising and managing donations.",
    stack: "SwiftUI · UIKit · Supabase",
    fullDetails: "A mobile platform designed to digitalize and optimize the organization's fundraising efforts, enhancing community engagement and improving efficiency in donation management and transparency. Developed under the MVVM architecture to ensure a clean, modular, and scalable codebase, leveraging SwiftUI for modern layout declaration alongside UIKit components, and utilizing Supabase for secure, real-time data management.",
  },
  {
    id: "bustillos-barragan",
    logo: "/images/projects/bustillosbarragan/bb-h.svg",
    title: "Bustillos Barragán",
    subtitle: "ui/ux design, web development",
    summary: "A law firm website and internal app for managing matters and clients.",
    stack: "Next.js · Tailwind CSS · Supabase",
    fullDetails: "I built a public website to strengthen the firm's digital presence and help prospective clients find its attorneys, practice areas, and publications.\n\nI also built an internal web app for the firm to manage legal matters, client records, and the day-to-day work that goes with them.",
    screenshots: [
      {
        src: "/images/projects/bustillosbarragan/screenshots/bb1.png",
        alt: "Bustillos Barragán homepage with a featured firm announcement",
        width: 3456,
        height: 1952,
      },
      {
        src: "/images/projects/bustillosbarragan/screenshots/bb2.png",
        alt: "Recent Insights section with legal news and publications",
        width: 3456,
        height: 1952,
      },
      {
        src: "/images/projects/bustillosbarragan/screenshots/bb3.png",
        alt: "Firm website links for finding offices and attorneys",
        width: 3456,
        height: 1952,
      },
    ],
  }
];
type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};
