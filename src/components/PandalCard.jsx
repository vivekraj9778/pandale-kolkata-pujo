import React from 'react';
import {
  Heart,
  MapPin,
  Users,
  ArrowRight,
  Clock,
} from 'lucide-react';

export default function PandalCard({
  pandal,
  isFavorite,
  onToggleFavorite,
  onSelectPandal,
  language,
}) {
  /* ============================================================
     GOOGLE MAPS
  ============================================================ */

  const handleMapClick = (e) => {
    e.stopPropagation();

    if (pandal.googleMapsUrl) {
      window.open(
        pandal.googleMapsUrl,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  /* ============================================================
     FAVORITE
  ============================================================ */

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(pandal.id);
  };

  /* ============================================================
     CARD CLICK
  ============================================================ */

  const handleCardClick = () => {
    onSelectPandal(pandal);
  };

  /* ============================================================
     IMAGE FALLBACK
  ============================================================ */

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      '/assets/pandals/fallback.jpg';
  };

  return (
    <article
      onClick={handleCardClick}
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        bg-[#171014]
        border
        border-white/[0.08]
        cursor-pointer
        shadow-[0_10px_35px_rgba(0,0,0,0.22)]
        hover:border-white/[0.15]
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.4)]
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* ========================================================
          IMAGE
      ======================================================== */}

      <div
        className="
          relative
          w-full
          h-[235px]
          sm:h-[245px]
          overflow-hidden
          bg-[#0e0a0c]
        "
      >
        <img
          src={pandal.image}
          alt={pandal.name}
          onError={handleImageError}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.06]
          "
          loading="lazy"
        />

        {/* Dark gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#120c0f]
            via-black/10
            to-black/50
            pointer-events-none
          "
        />

        {/* ======================================================
            TOP LEFT - ZONE
        ====================================================== */}

        <div className="absolute top-4 left-4 z-10">
          <span
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-full
              bg-black/55
              backdrop-blur-xl
              border
              border-white/15
              text-white
              text-[10px]
              sm:text-[11px]
              font-semibold
              shadow-lg
            "
          >
            <span
              className="
                w-1.5
                h-1.5
                rounded-full
                bg-red-500
                shadow-[0_0_8px_rgba(239,68,68,0.9)]
              "
            />

            <span>
              {language === 'bn'
                ? pandal.zoneBengali || pandal.zone
                : pandal.zone}
            </span>
          </span>
        </div>

        {/* ======================================================
            TOP RIGHT - FAVORITE + MAP
        ====================================================== */}

        <div
          className="
            absolute
            top-4
            right-4
            z-10
            flex
            items-center
            gap-2
          "
        >
          {/* Favorite */}

          <button
            onClick={handleFavoriteClick}
            className={`
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              backdrop-blur-xl
              border
              transition-all
              duration-200
              hover:scale-110
              ${
                isFavorite
                  ? 'bg-red-600 text-white border-red-400 shadow-[0_0_18px_rgba(239,68,68,0.35)]'
                  : 'bg-black/55 text-white border-white/15 hover:bg-black/80 hover:text-red-400'
              }
            `}
            title={
              isFavorite
                ? 'Remove from wishlist'
                : 'Save Pandal'
            }
            aria-label="Toggle favorite"
          >
            <Heart
              size={16}
              strokeWidth={2}
              className={
                isFavorite
                  ? 'fill-white'
                  : ''
              }
            />
          </button>

          {/* Google Maps */}

          <button
            onClick={handleMapClick}
            className="
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              bg-black/55
              hover:bg-black/85
              text-white
              hover:text-amber-400
              backdrop-blur-xl
              border
              border-white/15
              transition-all
              duration-200
              hover:scale-110
            "
            title="Open in Google Maps"
            aria-label="View on map"
          >
            <MapPin size={16} />
          </button>
        </div>

        {/* ======================================================
            BOTTOM LEFT - FIRE RATING
        ====================================================== */}

        <div
          className="
            absolute
            bottom-4
            left-4
            z-10
            flex
            items-center
            gap-0.5
            px-3
            py-1.5
            rounded-full
            bg-black/60
            backdrop-blur-xl
            border
            border-white/10
          "
        >
          {Array.from({
            length: Math.min(
              pandal.heatRating || 3,
              5
            ),
          }).map((_, index) => (
            <span
              key={index}
              className="text-sm leading-none"
              role="img"
              aria-label="Fire rating"
            >
              🔥
            </span>
          ))}
        </div>

        {/* ======================================================
            BOTTOM RIGHT - TRENDING
        ====================================================== */}

        {pandal.trending && (
          <div
            className="
              absolute
              bottom-4
              right-4
              z-10
              px-2.5
              py-1
              rounded-full
              bg-red-600/90
              text-white
              text-[9px]
              font-bold
              uppercase
              tracking-wider
              shadow-lg
            "
          >
            Trending
          </div>
        )}
      </div>

      {/* ========================================================
          CONTENT
      ======================================================== */}

      <div
        className="
          p-4
          sm:p-5
          flex
          flex-col
        "
      >
        {/* ======================================================
            LOCATION
        ====================================================== */}

        <p
          className="
            text-[9px]
            sm:text-[10px]
            font-bold
            tracking-[0.16em]
            uppercase
            text-amber-400
            mb-1.5
            line-clamp-1
          "
        >
          {pandal.subLocation}
        </p>

        {/* ======================================================
            TITLE
        ====================================================== */}

        <h3
          className="
            font-serif
            text-xl
            sm:text-[22px]
            font-bold
            text-white
            leading-tight
            line-clamp-2
            min-h-[52px]
            group-hover:text-amber-300
            transition-colors
            duration-200
          "
        >
          {language === 'bn'
            ? pandal.nameBengali ||
              pandal.name
            : pandal.name}
        </h3>

        {/* ======================================================
            METRO BOX
        ====================================================== */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-3
            bg-[#100b0e]
            border
            border-white/[0.07]
            rounded-2xl
            px-3
            py-3
            group-hover:border-white/[0.12]
            transition-colors
          "
        >
          {/* Metro */}

          <div
            className="
              flex
              items-center
              gap-2.5
              min-w-0
            "
          >
            {/* Metro M */}

            <div
              className="
                w-7
                h-7
                rounded-lg
                bg-[#2563eb]
                text-white
                flex
                items-center
                justify-center
                font-black
                text-xs
                shrink-0
                shadow-[0_4px_12px_rgba(37,99,235,0.25)]
              "
            >
              M
            </div>

            <div className="min-w-0">
              <p className="text-[9px] text-stone-500 uppercase tracking-wider">
                Metro
              </p>

              <p
                className="
                  text-xs
                  font-semibold
                  text-stone-200
                  truncate
                "
              >
                {language === 'bn'
                  ? pandal.metroStationBengali ||
                    pandal.metroStation
                  : pandal.metroStation}
              </p>
            </div>
          </div>

          {/* Walking */}

          <div
            className="
              flex
              items-center
              gap-1.5
              shrink-0
              text-rose-400
            "
          >
            <Clock size={13} />

            <span className="text-xs font-bold">
              {pandal.walkTime}
            </span>
          </div>
        </div>

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            mt-4
            pt-4
            border-t
            border-white/[0.07]
          "
        >
          {/* Crowd */}

          <div
            className="
              flex
              items-center
              gap-2
              min-w-0
            "
          >
            <Users
              size={15}
              className="text-amber-400 shrink-0"
            />

            <span
              className="
                text-[11px]
                sm:text-xs
                text-stone-300
                truncate
              "
            >
              {language === 'bn'
                ? pandal.crowdLevelBengali ||
                  pandal.crowdLevel
                : pandal.crowdLevel}
            </span>
          </div>

          {/* Explore */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectPandal(pandal);
            }}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-[#ff2d20]
              hover:bg-[#f1261c]
              text-white
              text-xs
              font-bold
              shadow-[0_6px_20px_rgba(255,45,32,0.22)]
              transition-all
              duration-200
              group-hover:shadow-[0_8px_25px_rgba(255,45,32,0.35)]
              hover:scale-105
              shrink-0
            "
          >
            <span>
              {language === 'bn'
                ? 'বিস্তারিত'
                : 'Explore'}
            </span>

            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}