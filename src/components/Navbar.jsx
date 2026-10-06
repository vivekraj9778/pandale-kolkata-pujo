import React, { useState } from 'react';
import {
  Home,
  Compass,
  Train,
  MapPin,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  Route,
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  favoritesCount,
  onOpenFavorites,
  onPingLocation,
  currentLocationName,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'home',
      labelEn: 'Home',
      labelBn: 'হোম',
      icon: Home,
    },
    {
      id: 'pandals',
      labelEn: 'Pandals',
      labelBn: 'প্যান্ডেল',
      icon: Compass,
    },
    {
      id: 'metro',
      labelEn: 'Metro',
      labelBn: 'মেট্রো',
      icon: Train,
    },
    {
      id: 'planner',
      labelEn: 'Planner',
      labelBn: 'পরিকল্পনা',
      icon: Route,
    },
    {
      id: 'metro-map',
      labelEn: 'Metro Map',
      labelBn: 'মেট্রো ম্যাপ',
      icon: MapPin,
    },
  ];

  const handleNavigation = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* =========================================================
          DESKTOP / MAIN FLOATING NAVBAR
      ========================================================= */}
      <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-[1450px] mx-auto flex items-center justify-between gap-3">

          {/* =====================================================
              LEFT - KOLKATA LOCATION
          ===================================================== */}
          <div className="pointer-events-auto flex items-center min-w-0">
            <button
              onClick={onPingLocation}
              title="Click to pin your live location"
              className="flex items-center gap-2.5 sm:gap-3 text-left group"
            >
              {/* Location Icon */}
              <div className="relative shrink-0">
                <MapPin
                  size={36}
                  strokeWidth={2.4}
                  className="text-red-500 transition-transform duration-300 group-hover:scale-110"
                />

                {/* Yellow location dot */}
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#171214] shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
              </div>

              {/* Location Text */}
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[19px] sm:text-[22px] font-bold leading-none text-white tracking-tight">
                    {currentLocationName || 'Kolkata'}
                  </span>

                  <span className="text-stone-400 text-sm sm:text-base transition-transform duration-200 group-hover:translate-y-0.5">
                    ⌄
                  </span>
                </div>

                <p className="mt-1 text-[10px] sm:text-[11px] text-stone-400 whitespace-nowrap">
                  Tap to pin live location
                  <span className="ml-1">📍</span>
                </p>
              </div>
            </button>
          </div>

          {/* =====================================================
              CENTER - FLOATING NAVIGATION
          ===================================================== */}
          <nav className="pointer-events-auto hidden md:flex items-center bg-[#181516]/95 border border-white/10 rounded-full p-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`
                    flex items-center gap-2
                    px-4 lg:px-5
                    py-2
                    rounded-full
                    text-xs lg:text-sm
                    font-semibold
                    whitespace-nowrap
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-[#ff2d20] text-white shadow-[0_5px_20px_rgba(255,45,32,0.35)]'
                        : 'text-stone-300 hover:text-white hover:bg-white/[0.07]'
                    }
                  `}
                >
                  <Icon
                    size={15}
                    strokeWidth={2}
                    className={
                      isActive ? 'text-white' : 'text-stone-400'
                    }
                  />

                  <span>
                    {language === 'bn' ? item.labelBn : item.labelEn}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* =====================================================
              RIGHT - ACTION BUTTONS
          ===================================================== */}
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">

            {/* -------------------------------------------------
                FAVORITES
            ------------------------------------------------- */}
            <button
              onClick={onOpenFavorites}
              className="
                relative
                w-10 h-10 sm:w-12 sm:h-12
                rounded-full
                flex items-center justify-center
                bg-[#171515]/95
                hover:bg-[#242020]
                text-white
                border border-white/10
                hover:border-white/20
                backdrop-blur-xl
                shadow-lg
                transition-all duration-200
                hover:scale-105
              "
              title="Saved Pandals"
              aria-label="Favorites"
            >
              <Heart
                size={19}
                strokeWidth={2}
                className={
                  favoritesCount > 0
                    ? 'fill-red-500 text-red-500'
                    : 'text-white'
                }
              />

              {/* Favorites Counter */}
              {favoritesCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    min-w-[18px]
                    h-[18px]
                    px-1
                    rounded-full
                    bg-[#ff2d20]
                    text-white
                    text-[9px]
                    font-bold
                    flex items-center justify-center
                    border-2 border-[#171214]
                  "
                >
                  {favoritesCount > 99 ? '99+' : favoritesCount}
                </span>
              )}
            </button>

            {/* -------------------------------------------------
                THEME TOGGLE
            ------------------------------------------------- */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="
                w-10 h-10 sm:w-12 sm:h-12
                rounded-full
                flex items-center justify-center
                bg-[#171515]/95
                hover:bg-[#242020]
                text-white
                border border-white/10
                hover:border-white/20
                backdrop-blur-xl
                shadow-lg
                transition-all duration-200
                hover:scale-105
              "
              title={
                darkMode
                  ? 'Switch to Festive Light'
                  : 'Switch to Midnight Theme'
              }
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <Sun
                  size={19}
                  strokeWidth={2}
                  className="text-amber-400"
                />
              ) : (
                <Moon
                  size={19}
                  strokeWidth={2}
                  className="text-white"
                />
              )}
            </button>

            {/* -------------------------------------------------
                LANGUAGE SWITCHER
            ------------------------------------------------- */}
            <div
              className="
                hidden sm:flex
                items-center
                bg-[#171515]/95
                border border-white/10
                rounded-full
                p-1
                backdrop-blur-xl
                shadow-lg
              "
            >
              {/* English */}
              <button
                onClick={() => setLanguage('en')}
                className={`
                  px-3
                  py-1.5
                  rounded-full
                  text-[11px]
                  font-bold
                  transition-all duration-200
                  ${
                    language === 'en'
                      ? 'bg-[#ff2d20] text-white shadow-md'
                      : 'text-stone-400 hover:text-white'
                  }
                `}
              >
                EN
              </button>

              {/* Bengali */}
              <button
                onClick={() => setLanguage('bn')}
                className={`
                  px-3
                  py-1.5
                  rounded-full
                  text-[11px]
                  font-bold
                  font-bengali
                  transition-all duration-200
                  ${
                    language === 'bn'
                      ? 'bg-[#ff2d20] text-white shadow-md'
                      : 'text-stone-400 hover:text-white'
                  }
                `}
              >
                বাংলা
              </button>
            </div>

            {/* -------------------------------------------------
                MOBILE MENU
            ------------------------------------------------- */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                md:hidden
                w-10 h-10
                rounded-full
                flex items-center justify-center
                bg-[#171515]/95
                text-white
                border border-white/10
                backdrop-blur-xl
                shadow-lg
              "
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ===================================================== */}
        {mobileMenuOpen && (
          <div
            className="
              pointer-events-auto
              md:hidden
              mt-3
              max-w-[1450px]
              mx-auto
              bg-[#171214]/98
              border border-white/10
              rounded-2xl
              p-2
              shadow-[0_20px_50px_rgba(0,0,0,0.55)]
              backdrop-blur-2xl
              animate-fadeIn
            "
          >
            {/* Mobile Location */}
            <button
              onClick={() => {
                onPingLocation();
                setMobileMenuOpen(false);
              }}
              className="
                w-full
                flex items-center gap-3
                px-4 py-3
                mb-1
                rounded-xl
                text-left
                bg-white/[0.03]
                border border-white/[0.06]
              "
            >
              <div className="relative">
                <MapPin
                  size={22}
                  className="text-red-500"
                />

                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {currentLocationName || 'Kolkata'}
                </p>

                <p className="text-[10px] text-stone-500">
                  Tap to pin live location
                </p>
              </div>
            </button>

            {/* Mobile Navigation Items */}
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`
                      w-full
                      flex items-center justify-between
                      px-4 py-3
                      rounded-xl
                      text-sm
                      font-semibold
                      transition-all duration-200
                      ${
                        isActive
                          ? 'bg-[#ff2d20] text-white shadow-lg shadow-red-900/30'
                          : 'text-stone-300 hover:bg-white/[0.06] hover:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={17} />

                      <span>
                        {language === 'bn'
                          ? item.labelBn
                          : item.labelEn}
                      </span>
                    </div>

                    {isActive && (
                      <span className="text-[9px] uppercase tracking-wider bg-black/20 px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Language */}
            <div className="mt-2 pt-2 border-t border-white/[0.08] flex items-center justify-between px-2">
              <span className="text-xs text-stone-500">
                Language
              </span>

              <div className="flex items-center bg-black/30 rounded-full p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`
                    px-3 py-1.5
                    rounded-full
                    text-[11px]
                    font-bold
                    ${
                      language === 'en'
                        ? 'bg-[#ff2d20] text-white'
                        : 'text-stone-400'
                    }
                  `}
                >
                  EN
                </button>

                <button
                  onClick={() => setLanguage('bn')}
                  className={`
                    px-3 py-1.5
                    rounded-full
                    text-[11px]
                    font-bold
                    font-bengali
                    ${
                      language === 'bn'
                        ? 'bg-[#ff2d20] text-white'
                        : 'text-stone-400'
                    }
                  `}
                >
                  বাংলা
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}