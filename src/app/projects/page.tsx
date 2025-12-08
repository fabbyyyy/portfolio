'use client';

export default function ProjectsPage() {
  return (
    <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
           <h2 className="text-xl font-light tracking-wide text-white/80">Selected Work</h2>
           <span className="text-xs text-white/40 font-mono">01 / 04</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Project Card 1 */}
           <div className="group relative aspect-video bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden cursor-pointer hover:bg-white/[0.05] transition-colors">
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                 <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-lg font-medium text-white mb-1">Cáritas de Monterrey</h3>
                    <p className="text-sm text-white/40 line-clamp-2 mb-4">A modern native iOS app meant for donations.</p>
                    <div className="flex gap-2">
                       <span className="px-2 py-1 text-[10px] bg-white/5 rounded text-white/60">Swift</span>
                       <span className="px-2 py-1 text-[10px] bg-white/5 rounded text-white/60">SwiftUI</span>
                       <span className="px-2 py-1 text-[10px] bg-white/5 rounded text-white/60">PostgreSQL</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Project Card 2 */}
           <div className="group relative aspect-video bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden cursor-pointer hover:bg-white/[0.05] transition-colors">
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                 <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-lg font-medium text-white mb-1">StartUp Journal</h3>
                    <p className="text-sm text-white/40 line-clamp-2 mb-4">A modern native iOS app, and website meant for tracking your startup or ideas progress.</p>
                     <div className="flex gap-2">
                       <span className="px-2 py-1 text-[10px] bg-white/5 rounded text-white/60">Angular</span>
                       <span className="px-2 py-1 text-[10px] bg-white/5 rounded text-white/60">SwiftData</span>
                       <span className="px-2 py-1 text-[10px] bg-white/5 rounded text-white/60">SwiftUI</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
    </section>
  );
}
