'use client';

export default function AboutPage() {
  return (
    <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 max-w-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
           <h2 className="text-xl font-light tracking-wide text-white/80">About Me</h2>
           <span className="text-xs text-white/40 font-mono">03 / 04</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-8">
          Problem solver. <br />
          <span className="text-white/40">Detail oriented.</span>
        </h1>
        <div className="space-y-4 text-lg text-white/60 leading-relaxed">
            <p>
                I'm a 20-year-old Creative Developer based in Monterrey, Mexico. 
                Currently a 3rd-year student at <span className="text-white">Tecnológico de Monterrey</span>.
            </p>
            <p>
                With a background in the arts, I approach software development with a keen eye for aesthetics.
                I love building software that solves complex problems in beautiful ways. 
                Whether it's optimizing code or admiring the aerodynamics of an F1 car, 
                I appreciate precision and design in everything I do.
            </p>
            <p className="text-green-400 text-base pt-2">
                Currently open to work and new opportunities.
            </p>
        </div>
    </section>
  );
}
