import React, { useState, useMemo } from 'react';
import PandalCard from './PandalCard';
import { PUJA_ZONES } from '../data/pandalsData';

import {
  Search,
  SlidersHorizontal,
  Train,
  Heart,
  X,
  Sparkles,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export default function PandalsView({
  pandals,
  favorites,
  onToggleFavorite,
  onSelectPandal,
  language,
  initialSearch = '',
}) {
  const [selectedZone, setSelectedZone] =
    useState('All Zones');

  const [searchQuery, setSearchQuery] =
    useState(initialSearch);

  const [activeChip, setActiveChip] =
    useState('all');

  const [sortBy, setSortBy] =
    useState('trending');

  /* ============================================================
     FILTER + SORT
  ============================================================ */

  const filteredPandals = useMemo(() => {
    return pandals
      .filter((p) => {
        /* ---------------- Zone ---------------- */

        if (selectedZone !== 'All Zones') {
          const zonePrefix =
            selectedZone.split(' ')[0];

          if (!p.zone?.includes(zonePrefix)) {
            return false;
          }
        }

        /* ---------------- Quick Filters ---------------- */

        if (
          activeChip === 'near-metro' &&
          p.walkMinutes > 10
        ) {
          return false;
        }

        if (
          activeChip === 'less-crowded' &&
          p.crowdLevel === 'Heavy Crowd'
        ) {
          return false;
        }

        if (
          activeChip === 'wishlist' &&
          !favorites.includes(p.id)
        ) {
          return false;
        }

        if (
          activeChip === 'must-visit' &&
          (p.heatRating || 0) < 3
        ) {
          return false;
        }

        /* ---------------- Search ---------------- */

        if (searchQuery.trim()) {
          const query =
            searchQuery.toLowerCase().trim();

          const matchesName =
            p.name
              ?.toLowerCase()
              .includes(query) ||
            p.nameBengali?.includes(query);

          const matchesLocation =
            p.subLocation
              ?.toLowerCase()
              .includes(query);

          const matchesMetro =
            p.metroStation
              ?.toLowerCase()
              .includes(query) ||
            p.metroStationBengali?.includes(query);

          const matchesTheme =
            p.theme2026
              ?.toLowerCase()
              .includes(query);

          return (
            matchesName ||
            matchesLocation ||
            matchesMetro ||
            matchesTheme
          );
        }

        return true;
      })
      .sort((a, b) => {
        /* Nearest Metro */

        if (sortBy === 'walk') {
          return (
            (a.walkMinutes || 999) -
            (b.walkMinutes || 999)
          );
        }

        /* Alphabetical */

        if (sortBy === 'az') {
          return a.name.localeCompare(b.name);
        }

        /* Default - Heat Rating */

        return (
          (b.heatRating || 3) -
          (a.heatRating || 3)
        );
      });
  }, [
    pandals,
    selectedZone,
    searchQuery,
    activeChip,
    sortBy,
    favorites,
  ]);

  /* ============================================================
     HELPERS
  ============================================================ */

  const toggleChip = (chip) => {
    setActiveChip(
      activeChip === chip ? 'all' : chip
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedZone('All Zones');
    setActiveChip('all');
    setSortBy('trending');
  };

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <section
      className="
        max-w-[1450px]
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        pt-28
        pb-16
        text-left
      "
    >

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-7
        "
      >

        {/* LEFT */}

        <div>
          <p
            className="
              text-[10px]
              sm:text-xs
              font-bold
              uppercase
              tracking-[0.25em]
              text-amber-400
              font-mono
              mb-2
            "
          >
            DISCOVERY CATALOG
          </p>

          <h1
            className="
              font-serif
              text-4xl
              sm:text-5xl
              lg:text-[52px]
              leading-none
              font-black
              text-white
              tracking-tight
            "
          >
            Kolkata Pandal Guide
          </h1>

          <p
            className="
              text-sm
              sm:text-base
              text-stone-400
              mt-2
            "
          >
            {pandals.length || 244}
            <span className="ml-1">
              pandals
            </span>

            <span className="mx-2">
              •
            </span>

            Durga Puja 2026
          </p>
        </div>

        {/* FAMOUS PANDALS */}

        <button
          onClick={() =>
            toggleChip('must-visit')
          }
          className="
            self-start
            lg:self-center
            flex
            items-center
            gap-3
            px-5
            py-3
            rounded-2xl
            bg-[#e51f16]
            hover:bg-[#f1261c]
            border
            border-red-400/30
            text-white
            shadow-[0_10px_30px_rgba(229,31,22,0.25)]
            transition-all
            duration-200
            hover:-translate-y-0.5
          "
        >
          <span
            className="
              w-9
              h-9
              rounded-xl
              bg-white/15
              flex
              items-center
              justify-center
              text-lg
            "
          >
            🔥
          </span>

          <div className="text-left">
            <div className="text-sm font-bold">
              Famous Pandals
            </div>

            <div
              className="
                text-[9px]
                uppercase
                tracking-wider
                text-white/70
              "
            >
              TOP 48
            </div>
          </div>

          <ArrowRight size={17} />
        </button>
      </div>

      {/* ========================================================
          SEARCH
      ======================================================== */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          items-stretch
          gap-2
          mb-5
        "
      >

        {/* SEARCH BOX */}

        <div
          className="
            relative
            flex
            items-center
            flex-1
            min-w-0
            bg-[#171014]
            border
            border-white/[0.08]
            rounded-2xl
            px-4
            py-1
            shadow-[0_8px_30px_rgba(0,0,0,0.2)]
            focus-within:border-red-500/60
            transition-all
          "
        >
          <Search
            size={19}
            className="
              text-stone-500
              shrink-0
            "
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search pandals by name, metro station, theme, or locality..."
            className="
              w-full
              bg-transparent
              px-3
              py-3
              text-sm
              text-white
              placeholder-stone-500
              focus:outline-none
            "
          />

          {searchQuery && (
            <button
              onClick={() =>
                setSearchQuery('')
              }
              className="
                p-1.5
                rounded-full
                text-stone-500
                hover:text-white
                hover:bg-white/10
                transition
              "
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* NEAR ME */}

        <button
          onClick={() =>
            toggleChip('near-metro')
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            px-5
            py-3
            rounded-2xl
            bg-[#171014]
            hover:bg-[#24171b]
            border
            border-white/[0.08]
            text-white
            text-sm
            font-semibold
            whitespace-nowrap
            transition-all
          "
        >
          <MapPin
            size={16}
            className="text-red-500"
          />

          <span>
            Near Me
          </span>
        </button>

        {/* FILTERS */}

        <button
          onClick={() => {
            setSelectedZone('All Zones');
            setActiveChip('all');
          }}
          className="
            flex
            items-center
            justify-center
            gap-2
            px-5
            py-3
            rounded-2xl
            bg-[#171014]
            hover:bg-[#24171b]
            border
            border-white/[0.08]
            text-white
            text-sm
            font-semibold
            whitespace-nowrap
            transition-all
          "
        >
          <SlidersHorizontal
            size={16}
            className="text-amber-400"
          />

          <span>
            Filters
          </span>
        </button>
      </div>

      {/* ========================================================
          ZONE FILTERS
      ======================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
          overflow-x-auto
          pb-2
          scrollbar-none
          mb-4
        "
      >
        {PUJA_ZONES.map((zone) => {
          const isActive =
            selectedZone === zone;

          return (
            <button
              key={zone}
              onClick={() =>
                setSelectedZone(zone)
              }
              className={`
                px-4
                py-2
                rounded-full
                text-xs
                sm:text-sm
                font-semibold
                whitespace-nowrap
                transition-all
                duration-200
                border
                ${
                  isActive
                    ? `
                      bg-[#ff2d20]
                      text-white
                      border-red-400/30
                      shadow-[0_5px_20px_rgba(255,45,32,0.2)]
                    `
                    : `
                      bg-[#171014]
                      text-stone-300
                      border-white/[0.07]
                      hover:text-white
                      hover:bg-[#21171a]
                    `
                }
              `}
            >
              {zone}
            </button>
          );
        })}
      </div>

      {/* ========================================================
          QUICK FILTERS
      ======================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
          overflow-x-auto
          pb-2
          scrollbar-none
          mb-5
        "
      >

        {/* NEAR METRO */}

        <button
          onClick={() =>
            toggleChip('near-metro')
          }
          className={`
            flex
            items-center
            gap-2
            px-3.5
            py-2
            rounded-xl
            text-xs
            font-semibold
            whitespace-nowrap
            border
            transition-all
            ${
              activeChip === 'near-metro'
                ? `
                  bg-blue-600
                  text-white
                  border-blue-500
                `
                : `
                  bg-[#171014]
                  text-stone-300
                  border-white/[0.07]
                  hover:text-white
                `
            }
          `}
        >
          <Train size={13} />

          <span>
            Near Metro (&lt;10m walk)
          </span>
        </button>

        {/* MUST VISIT */}

        <button
          onClick={() =>
            toggleChip('must-visit')
          }
          className={`
            flex
            items-center
            gap-2
            px-3.5
            py-2
            rounded-xl
            text-xs
            font-semibold
            whitespace-nowrap
            border
            transition-all
            ${
              activeChip === 'must-visit'
                ? `
                  bg-amber-500
                  text-black
                  border-amber-400
                `
                : `
                  bg-[#171014]
                  text-stone-300
                  border-white/[0.07]
                  hover:text-white
                `
            }
          `}
        >
          <Sparkles size={13} />

          <span>
            Must Visit
          </span>
        </button>

        {/* LESS CROWDED */}

        <button
          onClick={() =>
            toggleChip('less-crowded')
          }
          className={`
            flex
            items-center
            gap-2
            px-3.5
            py-2
            rounded-xl
            text-xs
            font-semibold
            whitespace-nowrap
            border
            transition-all
            ${
              activeChip === 'less-crowded'
                ? `
                  bg-emerald-600
                  text-white
                  border-emerald-500
                `
                : `
                  bg-[#171014]
                  text-stone-300
                  border-white/[0.07]
                  hover:text-white
                `
            }
          `}
        >
          <span
            className="
              w-2
              h-2
              rounded-full
              bg-emerald-400
            "
          />

          <span>
            Less Crowded
          </span>
        </button>

        {/* WISHLIST */}

        <button
          onClick={() =>
            toggleChip('wishlist')
          }
          className={`
            flex
            items-center
            gap-2
            px-3.5
            py-2
            rounded-xl
            text-xs
            font-semibold
            whitespace-nowrap
            border
            transition-all
            ${
              activeChip === 'wishlist'
                ? `
                  bg-rose-600
                  text-white
                  border-rose-500
                `
                : `
                  bg-[#171014]
                  text-stone-300
                  border-white/[0.07]
                  hover:text-white
                `
            }
          `}
        >
          <Heart
            size={13}
            className={
              activeChip === 'wishlist'
                ? 'fill-white'
                : ''
            }
          />

          <span>
            My Wishlist ({favorites.length})
          </span>
        </button>
      </div>

      {/* ========================================================
          SORT + RESULT COUNT
      ======================================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
          border-t
          border-white/[0.07]
          pt-4
          mb-5
        "
      >
        <div
          className="
            text-xs
            text-stone-500
          "
        >
          Showing{' '}

          <span
            className="
              text-stone-300
              font-semibold
            "
          >
            {filteredPandals.length}
          </span>

          {' '}pandals
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            self-start
            sm:self-auto
          "
        >
          <span
            className="
              text-xs
              text-stone-500
            "
          >
            Sort by:
          </span>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="
              bg-[#171014]
              border
              border-white/[0.08]
              text-stone-200
              text-xs
              rounded-xl
              px-3
              py-2
              focus:outline-none
              focus:border-red-500/60
              font-semibold
              cursor-pointer
            "
          >
            <option value="trending">
              🔥 Trending
            </option>

            <option value="walk">
              🚇 Nearest to Metro
            </option>

            <option value="az">
              A-Z Alphabetical
            </option>
          </select>
        </div>
      </div>

      {/* ========================================================
          PANDAL CARDS
      ======================================================== */}

      {filteredPandals.length > 0 ? (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-5
            lg:gap-6
          "
        >
          {filteredPandals.map((pandal) => (
            <PandalCard
              key={pandal.id}
              pandal={pandal}
              isFavorite={favorites.includes(
                pandal.id
              )}
              onToggleFavorite={
                onToggleFavorite
              }
              onSelectPandal={
                onSelectPandal
              }
              language={language}
            />
          ))}
        </div>
      ) : (
        /* ======================================================
           EMPTY STATE
        ====================================================== */

        <div
          className="
            text-center
            py-20
            px-5
            bg-[#171014]
            border
            border-white/[0.08]
            rounded-3xl
            max-w-xl
            mx-auto
          "
        >
          <div
            className="
              w-16
              h-16
              rounded-full
              bg-red-950/40
              text-red-400
              flex
              items-center
              justify-center
              mx-auto
              mb-5
            "
          >
            <Search size={25} />
          </div>

          <h3
            className="
              font-serif
              text-2xl
              font-bold
              text-white
              mb-2
            "
          >
            No pandals found
          </h3>

          <p
            className="
              text-sm
              text-stone-500
              mb-6
            "
          >
            Try changing your search or
            resetting the filters.
          </p>

          <button
            onClick={resetFilters}
            className="
              px-5
              py-2.5
              rounded-full
              bg-[#ff2d20]
              hover:bg-[#f1261c]
              text-white
              text-xs
              font-bold
              shadow-lg
              shadow-red-900/20
              transition-all
            "
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ========================================================
          BOTTOM INFO
      ======================================================== */}

      {filteredPandals.length > 0 && (
        <div
          className="
            text-center
            mt-10
            text-[11px]
            text-stone-600
          "
        >
          Showing {filteredPandals.length} of{' '}
          {pandals.length} pandals
        </div>
      )}
    </section>
  );
}