# Fabian's Portfolio

A modern, immersive portfolio website built with Next.js 15, Three.js, and TypeScript.

## 🚀 Features

- **Immersive 3D Background**: High-fidelity F1 model rendered using `@react-three/fiber` and `@react-three/drei`.
- **State-Based Animations**: The 3D model intelligently reacts to navigation:
  - **Home View**: Interactive parallax effect that responds to mouse movement.
  - **Content View**: Smooth transition to a "profile" view with locked positioning for readability.
- **Persistent Layout**: Custom `MainLayout` ensures the 3D scene captures attention without reloading during page navigation.
- **Next.js App Router**: Fully typed routing architecture (`/projects`, `/skills`, `/about`, `/contact`).
- **Responsive Design**: Mobile-first approach using Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**:
  - [Three.js](https://threejs.org/)
  - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
  - [Drei](https://github.com/pmndrs/drei) (Helpers)
- **Deployment**: Vercel

## 📂 Project Structure

```bash
src/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (Empty state)
│   ├── projects/          # Projects page
│   ├── skills/            # Skills & Technologies page
│   ├── about/             # About Me page
│   └── contact/           # Contact page
├── components/
│   ├── layout/            # Layout components
│   │   ├── MainLayout.tsx # Persistent shell & Scene wrapper
│   │   └── OrbitalShell/  # UI Chrome (Nav, Identity, Footer)
│   ├── scene/             # 3D components
│   │   └── Scene3D.tsx    # Main scene & animation logic
│   └── ui/                # Shared UI elements
└── ../public/             # Static assets (3D models, SVGs)
```

## 🏎️ Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/fabbyyyy/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Design Philosophy

The design focuses on "Negative Space" and "Motion". The heavy use of dark backgrounds (`#181818`) combined with a large-scale, detailed 3D model creates depth. Typography is kept clean and bold to ensure readability against the complex background.

---

Built by [Fabian Garza](https://twitter.com/fabiangarzag)
