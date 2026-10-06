import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PandalsView from './components/PandalsView';
import MetroView from './components/MetroView';
import PlannerView from './components/PlannerView';
import MetroMapView from './components/MetroMapView';
import PandalModal from './components/PandalModal';
import FavoritesModal from './components/FavoritesModal';
import PwaBanner from './components/PwaBanner';
import FloatingBar from './components/FloatingBar';
import PujaHub from './components/PujaHub';

import { PANDALS_DATA } from './data/pandalsData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const [language, setLanguage] = useState('en');

  const [darkMode, setDarkMode] = useState(true);

  /* ============================================================
     FAVORITES STATE
  ============================================================ */

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(
        'pujosafar_favorites'
      );

      return saved
        ? JSON.parse(saved)
        : [
            'deshopriyo-park',
            'santosh-mitra-square',
            'tala-prattay',
          ];
    } catch (error) {
      return [
        'deshopriyo-park',
        'santosh-mitra-square',
      ];
    }
  });

  const [selectedPandal, setSelectedPandal] =
    useState(null);

  const [plannerList, setPlannerList] =
    useState([]);

  const [showFavoritesModal, setShowFavoritesModal] =
    useState(false);

  const [currentLocationName, setCurrentLocationName] =
    useState('Kolkata (South)');

  const [initialSearch, setInitialSearch] =
    useState('');

  const [pingToast, setPingToast] =
    useState(null);

  /* ============================================================
     SAVE FAVORITES
  ============================================================ */

  useEffect(() => {
    try {
      localStorage.setItem(
        'pujosafar_favorites',
        JSON.stringify(favorites)
      );
    } catch (error) {
      // Ignore localStorage errors
    }
  }, [favorites]);

  /* ============================================================
     TOGGLE FAVORITE
  ============================================================ */

  const handleToggleFavorite = (pandalId) => {
    setFavorites((previous) =>
      previous.includes(pandalId)
        ? previous.filter(
            (id) => id !== pandalId
          )
        : [...previous, pandalId]
    );
  };

  /* ============================================================
     TOAST
  ============================================================ */

  const showToast = (message) => {
    setPingToast(message);

    setTimeout(() => {
      setPingToast(null);
    }, 3000);
  };

  /* ============================================================
     PLANNER
  ============================================================ */

  const handleAddToPlanner = (pandal) => {
    if (
      !plannerList.some(
        (item) => item.id === pandal.id
      )
    ) {
      setPlannerList((previous) => [
        ...previous,
        pandal,
      ]);

      showToast(
        `Added ${pandal.name} to Itinerary!`
      );
    } else {
      setPlannerList((previous) =>
        previous.filter(
          (item) => item.id !== pandal.id
        )
      );

      showToast(
        `Removed ${pandal.name} from Itinerary`
      );
    }
  };

  /* ============================================================
     LOCATION
  ============================================================ */

  const handlePingLocation = () => {
    const locations = [
      'Kalighat, South Kolkata (0.3 km from Deshopriyo)',
      'Bowbazar, Central Kolkata (Near Sealdah Metro)',
      'Hatibagan, North Kolkata (Near Shyambazar)',
      'Park Street Crossing (Central Metro Corridor)',
      'Salt Lake Sector V (Near Karunamoyee)',
    ];

    const picked =
      locations[
        Math.floor(
          Math.random() * locations.length
        )
      ];

    setCurrentLocationName(
      picked.split(',')[0]
    );

    showToast(
      `📍 Live Location Detected: ${picked}`
    );
  };

  /* ============================================================
     HERO SEARCH
  ============================================================ */

  const handleHeroSearch = (query) => {
    setInitialSearch(query);
    setActiveTab('pandals');
  };

  /* ============================================================
     SELECT PANDAL FROM MAP
  ============================================================ */

  const handleSelectPandalByName = (
    pandalName
  ) => {
    if (!pandalName) return;

    const searchName =
      pandalName.toLowerCase();

    const found = PANDALS_DATA.find(
      (pandal) => {
        const pandalNameLower =
          pandal.name.toLowerCase();

        return (
          pandalNameLower.includes(
            searchName
          ) ||
          searchName.includes(
            pandalNameLower
          )
        );
      }
    );

    if (found) {
      setSelectedPandal(found);
    } else {
      setInitialSearch(pandalName);
      setActiveTab('pandals');
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div
      className={`
        min-h-screen
        flex
        flex-col
        relative
        overflow-x-hidden
        font-sans
        transition-colors
        duration-300

        ${
          darkMode
            ? 'bg-[#0d080a] text-slate-100'
            : 'bg-[#faf7f5] text-slate-900'
        }

        selection:bg-rose-600
        selection:text-white
      `}
    >

      {/* ======================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      {darkMode && (
        <>
          <div
            className="
              fixed
              inset-0
              pointer-events-none
              z-0
              bg-[radial-gradient(circle_at_50%_-10%,rgba(255,45,32,0.08),transparent_38%)]
            "
          />

          <div
            className="
              fixed
              top-0
              left-1/2
              -translate-x-1/2
              w-[700px]
              h-[300px]
              pointer-events-none
              z-0
              rounded-full
              blur-3xl
              bg-rose-950/10
            "
          />
        </>
      )}

      {/* ======================================================
          TOAST
      ====================================================== */}

      {pingToast && (
        <div
          className="
            fixed
            top-20
            left-1/2
            -translate-x-1/2
            z-[100]
            max-w-[calc(100%-2rem)]
            bg-[#171014]/95
            text-white
            border
            border-rose-500/30
            shadow-2xl
            shadow-black/50
            px-5
            py-3
            rounded-full
            text-xs
            font-bold
            backdrop-blur-xl
            animate-fadeIn
            flex
            items-center
            gap-2
          "
        >
          <span>{pingToast}</span>
        </div>
      )}

      {/* ======================================================
          NAVBAR
      ====================================================== */}

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}

        language={language}
        setLanguage={setLanguage}

        darkMode={darkMode}
        setDarkMode={setDarkMode}

        favoritesCount={favorites.length}

        onOpenFavorites={() =>
          setShowFavoritesModal(true)
        }

        onPingLocation={
          handlePingLocation
        }

        currentLocationName={
          currentLocationName
        }
      />

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="
          relative
          z-10
          flex-1
          pb-24
        "
      >

        {/* ====================================================
            HOME
        ==================================================== */}

        {activeTab === 'home' && (
          <>
            <Hero
              onExplorePandals={
                handleHeroSearch
              }

              onExploreMetro={() =>
                setActiveTab('metro')
              }

              onExplorePlanner={() =>
                setActiveTab('planner')
              }

              language={language}
            />

            {/* =================================================
                PANDAL DISCOVERY
            ================================================= */}

            <div
              className="
                border-t
                border-white/[0.06]
              "
            >
              <PandalsView
                pandals={PANDALS_DATA}

                favorites={favorites}

                onToggleFavorite={
                  handleToggleFavorite
                }

                onSelectPandal={
                  setSelectedPandal
                }

                language={language}

                initialSearch=""
              />
            </div>

            {/* =================================================
                PUJA SUPER HUB
            ================================================= */}

            <PujaHub
              pandals={PANDALS_DATA}

              favorites={favorites}

              onToggleFavorite={
                handleToggleFavorite
              }

              onSelectPandal={
                setSelectedPandal
              }
            />
          </>
        )}

        {/* ====================================================
            PANDALS
        ==================================================== */}

        {activeTab === 'pandals' && (
          <PandalsView
            pandals={PANDALS_DATA}

            favorites={favorites}

            onToggleFavorite={
              handleToggleFavorite
            }

            onSelectPandal={
              setSelectedPandal
            }

            language={language}

            initialSearch={
              initialSearch
            }
          />
        )}

        {/* ====================================================
            METRO
        ==================================================== */}

        {activeTab === 'metro' && (
          <MetroView
            pandals={PANDALS_DATA}

            onSelectPandal={
              setSelectedPandal
            }

            onOpenMetroMap={() =>
              setActiveTab('metro-map')
            }

            language={language}
          />
        )}

        {/* ====================================================
            PLANNER
        ==================================================== */}

        {activeTab === 'planner' && (
          <PlannerView
            pandals={PANDALS_DATA}

            language={language}

            onSelectPandal={
              setSelectedPandal
            }
          />
        )}

        {/* ====================================================
            METRO MAP
        ==================================================== */}

        {activeTab === 'metro-map' && (
          <MetroMapView
            onSelectPandalByName={
              handleSelectPandalByName
            }

            language={language}
          />
        )}

      </main>

      {/* ======================================================
          PANDAL MODAL
      ====================================================== */}

      {selectedPandal && (
        <PandalModal
          pandal={selectedPandal}

          onClose={() =>
            setSelectedPandal(null)
          }

          isFavorite={favorites.includes(
            selectedPandal.id
          )}

          onToggleFavorite={
            handleToggleFavorite
          }

          onAddToPlanner={
            handleAddToPlanner
          }

          isInPlanner={plannerList.some(
            (item) =>
              item.id === selectedPandal.id
          )}

          language={language}
        />
      )}

      {/* ======================================================
          FAVORITES MODAL
      ====================================================== */}

      {showFavoritesModal && (
        <FavoritesModal
          favorites={favorites}

          pandals={PANDALS_DATA}

          onClose={() =>
            setShowFavoritesModal(false)
          }

          onSelectPandal={
            setSelectedPandal
          }

          onRemoveFavorite={
            handleToggleFavorite
          }

          onClearFavorites={() =>
            setFavorites([])
          }

          language={language}
        />
      )}

      {/* ======================================================
          PWA BANNER
      ====================================================== */}

      <PwaBanner
        language={language}
      />

      {/* ======================================================
          FLOATING SUPPORT BAR
      ====================================================== */}

      <FloatingBar />

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer
        className="
          relative
          z-10
          w-full
          border-t
          border-white/[0.07]
          bg-[#090607]
          py-10
          px-4
          text-center
          text-xs
          text-slate-500
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
            text-slate-200
            font-serif
            font-bold
            text-base
          "
        >
          <span>Pandalé</span>

          <span className="text-rose-500">
            •
          </span>

          <span className="text-slate-400">
            Kolkata Durga Puja Guide 2026
          </span>
        </div>

        <p
          className="
            mt-3
            text-slate-500
            max-w-2xl
            mx-auto
          "
        >
          Discover Kolkata's iconic pandals,
          metro routes, crowd levels and
          festive routes — all in one place.
        </p>

        <p className="mt-4 text-[10px] text-slate-700">
          Made for the spirit of Sharadotsav.
        </p>
      </footer>

    </div>
  );
}