import React from 'react';
import { X, Heart, MapPin, Trash2, ArrowRight } from 'lucide-react';

export default function FavoritesModal({
  favorites,
  pandals,
  onClose,
  onSelectPandal,
  onRemoveFavorite,
  onClearFavorites,
  language
}) {
  const favoritePandals = pandals.filter(p => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-[#0d121f] border border-white/10 rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart size={18} className="fill-rose-500 text-rose-500" />
            <h3 className="font-serif text-xl font-bold text-white">
              {language === 'bn' ? 'সংরক্ষিত প্যান্ডেল' : 'Saved Pandals'} ({favoritePandals.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {favoritePandals.length > 0 ? (
            favoritePandals.map((pandal) => (
              <div
                key={pandal.id}
                onClick={() => {
                  onSelectPandal(pandal);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-[#080b13] hover:bg-[#151c2e] border border-white/5 hover:border-amber-400/40 flex items-center justify-between gap-3 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={pandal.image}
                    alt={pandal.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 truncate">
                      {pandal.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {pandal.metroStation} • {pandal.walkTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(pandal.id);
                    }}
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 size={15} />
                  </button>
                  <ArrowRight size={15} className="text-slate-500 group-hover:text-white" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Heart size={36} className="mx-auto text-slate-600 mb-3" />
              <p className="text-sm font-medium">No saved pandals yet!</p>
              <p className="text-xs text-slate-500 mt-1">Tap the heart on any pandal card to bookmark it.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {favoritePandals.length > 0 && (
          <div className="p-4 bg-[#080b13] border-t border-white/10 flex items-center justify-between">
            <button
              onClick={onClearFavorites}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5"
            >
              <Trash2 size={13} />
              <span>Clear all</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-bold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
