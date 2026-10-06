import React from 'react';
import { X, Heart, MapPin, Train, Clock, Utensils, Sparkles, Navigation, Calendar, Check, Share2 } from 'lucide-react';

export default function PandalModal({
  pandal,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToPlanner,
  isInPlanner,
  language
}) {
  if (!pandal) return null;

  const handleShare = () => {
    const text = `Explore ${pandal.name} (${pandal.subLocation}) on PujoSafar! Nearest Metro: ${pandal.metroStation} (${pandal.walkTime}).`;
    if (navigator.share) {
      navigator.share({ title: pandal.name, text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      alert('Pandal details copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0d121f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image Banner */}
        <div className="relative w-full h-56 sm:h-64 bg-[#0a0d16] shrink-0">
          <img
            src={pandal.image}
            alt={pandal.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-black/40 to-black/60" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center border border-white/20 transition-all"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow">
              {language === 'bn' ? pandal.zoneBengali : pandal.zone}
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-black/60 border border-white/20 text-amber-300">
              Est. {pandal.yearStarted}
            </span>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
              {pandal.subLocation}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white drop-shadow-md">
              {language === 'bn' ? pandal.nameBengali : pandal.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          {/* Theme Banner Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-amber-950/20 to-indigo-950/40 border border-rose-500/25">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>{language === 'bn' ? '২০২৬ সালের থিম' : 'Puja Theme 2026'}</span>
            </div>
            <p className="text-base font-serif font-bold text-amber-200">
              {pandal.theme2026}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {pandal.description}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Metro Proximity */}
            <div className="p-3.5 rounded-2xl bg-[#080b13] border border-white/10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white font-black text-sm flex items-center justify-center shrink-0">
                M
              </div>
              <div>
                <p className="text-slate-400 font-medium">Nearest Metro Station</p>
                <p className="font-bold text-white text-sm">
                  {language === 'bn' ? pandal.metroStationBengali : pandal.metroStation}
                </p>
                <p className="text-rose-400 font-semibold mt-0.5">
                  ⏱️ {pandal.walkTime} walking distance
                </p>
              </div>
            </div>

            {/* Aarti & Bhog Timings */}
            <div className="p-3.5 rounded-2xl bg-[#080b13] border border-white/10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Clock size={16} />
              </div>
              <div>
                <p className="text-slate-400 font-medium">Aarti & Anjali Schedule</p>
                <p className="font-semibold text-slate-200 text-xs leading-snug">
                  {pandal.aartiTiming}
                </p>
              </div>
            </div>

            {/* Best Time to Visit */}
            <div className="p-3.5 rounded-2xl bg-[#080b13] border border-white/10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Calendar size={16} />
              </div>
              <div>
                <p className="text-slate-400 font-medium">Best Time to Beat Queues</p>
                <p className="font-semibold text-slate-200 text-xs">
                  {pandal.bestTimeToVisit}
                </p>
              </div>
            </div>

            {/* Legendary Street Food */}
            <div className="p-3.5 rounded-2xl bg-[#080b13] border border-white/10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                <Utensils size={16} />
              </div>
              <div>
                <p className="text-slate-400 font-medium">Nearby Famous Bites</p>
                <p className="font-semibold text-amber-300 text-xs">
                  {pandal.nearestFood}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights List */}
          {pandal.highlights && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {language === 'bn' ? 'প্রধান আকর্ষণ' : 'Highlights & What Not to Miss'}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {pandal.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 bg-[#080b13] p-2.5 rounded-xl border border-white/5">
                    <span className="text-amber-400">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 bg-[#080b13] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {/* Toggle Favorite */}
            <button
              onClick={() => onToggleFavorite(pandal.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold border transition-all ${
                isFavorite
                  ? 'bg-rose-600 text-white border-rose-500 shadow-glow-primary'
                  : 'bg-[#111726] text-slate-300 border-white/10 hover:border-rose-500/50'
              }`}
            >
              <Heart size={14} className={isFavorite ? 'fill-white' : ''} />
              <span>{isFavorite ? 'Saved in Favorites' : 'Add to Favorites'}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2.5 rounded-2xl bg-[#111726] text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="Share Pandal"
            >
              <Share2 size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Add to Planner */}
            <button
              onClick={() => onAddToPlanner(pandal)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold border transition-all ${
                isInPlanner
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
            >
              {isInPlanner ? <Check size={14} /> : <Calendar size={14} />}
              <span>{isInPlanner ? 'In Your Itinerary' : 'Add to Itinerary'}</span>
            </button>

            {/* Google Maps Navigate */}
            <a
              href={pandal.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-lg shadow-rose-950/60"
            >
              <Navigation size={14} />
              <span>{language === 'bn' ? 'ম্যাপে পথ দেখুন' : 'Get Directions'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
