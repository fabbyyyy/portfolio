'use client';

export default function ContactPage() {
  return (
    <section className="space-y-6 h-full flex flex-col animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
           <h2 className="text-xl font-light tracking-wide text-white/80">Get in Touch</h2>
           <span className="text-xs text-white/40 font-mono">04 / 04</span>
        </div>
        
        <div className="flex flex-col space-y-8 pt-8">
             <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest">Email</h3>
                <a 
                    href="mailto:fabiangarzamx@gmail.com" 
                    className="text-2xl md:text-3xl font-light text-white hover:text-white/80 transition-colors block"
                >
                    fabiangarzamx@gmail.com
                </a>
             </div>
             
             <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest">Location</h3>
                <p className="text-xl font-light text-white/80">Monterrey, Mexico</p>
             </div>
        </div>
    </section>
  );
}
