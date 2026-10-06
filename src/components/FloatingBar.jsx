import React, { useState } from 'react';
import { Coffee, Heart } from 'lucide-react';

export default function FloatingBar() {
  const [coffeeModal, setCoffeeModal] = useState(false);

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hi! Check out PujoSafar - Kolkata Durga Puja & Metro Guide: ' + window.location.href);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <>
      <div className="fixed bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-40 flex items-center gap-2.5">
        {/* Support Floating Pill */}
        <button
          onClick={() => setCoffeeModal(true)}
          className="flex items-center gap-2 bg-[#111726]/90 hover:bg-[#1a233a] text-white border border-white/10 hover:border-amber-400/40 rounded-full px-4 py-2 shadow-2xl backdrop-blur-xl transition-all duration-200 group text-xs font-bold"
        >
          {/* Emerald Status Pulsing Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 group-hover:text-white">
            Support PujoSafar ☕ <span className="text-slate-400 font-normal hidden md:inline">• Made with love for Kolkata</span>
          </span>
        </button>

        {/* Floating WhatsApp Action Button */}
        <button
          onClick={handleWhatsApp}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] hover:brightness-110 text-white flex items-center justify-center shadow-2xl shadow-green-950/70 transform hover:scale-110 active:scale-95 transition-all duration-200 shrink-0"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29" />
          </svg>
        </button>
      </div>

      {/* Support Modal */}
      {coffeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0d121f] border border-amber-500/40 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              ☕
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Support PujoSafar 💖
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              PujoSafar is an open community guide built with devotion for every Durga Puja devotee and traveler in Kolkata!
            </p>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {['₹51', '₹101', '₹251'].map((amt) => (
                <button
                  key={amt}
                  onClick={() => alert(`Thank you so much for choosing ${amt}! Payment gateway simulation.`)}
                  className="py-2.5 rounded-xl bg-[#172033] hover:bg-rose-600 text-white text-xs font-bold border border-white/10 transition-colors"
                >
                  {amt}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCoffeeModal(false)}
              className="w-full py-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
