import React, { useMemo, useState } from 'react';

import {
  POPULAR_ROUTES,
  SHYAMBAZAR_CIRCUIT,
  ALL_STATIONS,
} from '../data/metroData';

import {
  Route,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Check,
  Copy,
  Train,
} from 'lucide-react';

import confetti from 'canvas-confetti';

export default function PlannerView({
  pandals = [],
  language,
  onSelectPandal,
}) {
  const [selectedMetroLine, setSelectedMetroLine] =
    useState('Blue');

  const [selectedStation, setSelectedStation] =
    useState('Shyambazar');

  const [selectedRouteCard, setSelectedRouteCard] =
    useState('north-kolkata');

  const [currentPage, setCurrentPage] = useState(1);

  const [routeOffset, setRouteOffset] = useState(0);

  const [copied, setCopied] = useState(false);

  const [checkedItems, setCheckedItems] = useState({});

  const stationsPerPage = 13;

  /* =========================================================
     COLORS
  ========================================================= */

  const lineColors = {
    Blue: '#2563eb',
    Green: '#10b981',
    Orange: '#f97316',
    Purple: '#a855f7',
  };

  /* =========================================================
     AREA HUBS
  ========================================================= */

  const areaHubs = [
    {
      name: 'Lake Town',
      subtitle: 'VIP Road & Lake Town',
      pandals: [
        'Lake Town Adhibasi Brinda',
        'Sreebhumi Sporting Club',
      ],
    },
    {
      name: 'Behala',
      subtitle: 'South-West Kolkata',
      pandals: [
        'Behala Nutan Sangha',
        'Barisha Club',
      ],
    },
    {
      name: 'Kasba',
      subtitle: 'South-East Kolkata',
      pandals: [
        'Bosepukur Sitala Mandir',
        'Rajdanga Naba Uday Sangha',
      ],
    },
    {
      name: 'Hatibagan',
      subtitle: 'North Kolkata',
      pandals: [
        'Hatibagan Sarbojanin',
        'Nalin Sarkar Street',
      ],
    },
    {
      name: 'Salt Lake',
      subtitle: 'East Kolkata',
      pandals: [
        'FD Block Sarbojanin',
        'BJ Block Durga Puja',
      ],
    },
    {
      name: 'Tollygunge',
      subtitle: 'South Kolkata',
      pandals: [
        'Naktala Udayan Sangha',
        'Mudiali Club',
      ],
    },
  ];

  /* =========================================================
     GET STATIONS
  ========================================================= */

  const lineStations = useMemo(() => {
    if (selectedMetroLine === 'Areas') {
      return areaHubs;
    }

    return ALL_STATIONS.filter(
      (station) => station.line === selectedMetroLine
    );
  }, [selectedMetroLine]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(lineStations.length / stationsPerPage)
  );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const visibleStations = useMemo(() => {
    const start =
      (safePage - 1) * stationsPerPage;

    return lineStations.slice(
      start,
      start + stationsPerPage
    );
  }, [lineStations, safePage]);

  /* =========================================================
     CHANGE LINE
  ========================================================= */

  const handleLineChange = (lineName) => {
    setSelectedMetroLine(lineName);
    setCurrentPage(1);

    if (lineName === 'Areas') {
      setSelectedStation(
        areaHubs[0]?.name || 'Lake Town'
      );
      return;
    }

    const firstStation = ALL_STATIONS.find(
      (station) => station.line === lineName
    );

    if (firstStation) {
      setSelectedStation(firstStation.name);
    }
  };

  /* =========================================================
     SELECT STATION
  ========================================================= */

  const handleStationSelect = (station) => {
    setSelectedStation(station.name);
  };

  /* =========================================================
     NORMALIZE STATION
  ========================================================= */

  const normalizeStation = (value = '') => {
    return value
      .replace(/\s+Metro\s+Station$/i, '')
      .replace(/\s+Metro$/i, '')
      .trim()
      .toLowerCase();
  };

  /* =========================================================
     FIND PANDALS
  ========================================================= */

  const getStationPandals = (stationName) => {
    const normalized =
      normalizeStation(stationName);

    if (!normalized || !Array.isArray(pandals)) {
      return [];
    }

    return pandals.filter((pandal) => {
      const metroName = normalizeStation(
        pandal?.metroStation || ''
      );

      return metroName === normalized;
    });
  };

  /* =========================================================
     SELECTED AREA
  ========================================================= */

  const selectedArea = areaHubs.find(
    (area) => area.name === selectedStation
  );

  /* =========================================================
     ITINERARY
  ========================================================= */

  const itinerary = useMemo(() => {
    if (selectedMetroLine === 'Areas') {
      if (!selectedArea) {
        return [];
      }

      return selectedArea.pandals.map(
        (name, index) => ({
          step: String(index + 1).padStart(2, '0'),
          name,
          location: `${selectedArea.name}, Kolkata`,
          metro: 'Area Hub',
          transitText:
            index === 0
              ? 'Starting point'
              : 'Nearby • walk',
          flames: index === 0 ? 2 : 0,
        })
      );
    }

    const stationPandals =
      getStationPandals(selectedStation);

    if (stationPandals.length > 0) {
      return stationPandals
        .slice(0, 8)
        .map((pandal, index) => ({
          step: String(index + 1).padStart(2, '0'),

          name:
            pandal.name ||
            pandal.title ||
            'Durga Puja Pandal',

          location:
            pandal.location ||
            `${selectedStation}, Kolkata`,

          metro:
            pandal.metroStation ||
            `${selectedStation} Metro Station`,

          transitText:
            index === 0
              ? 'Starting point'
              : `${index * 40 + 30} m • ~${Math.max(
                  1,
                  Math.round(
                    (index * 40 + 30) / 100
                  )
                )} min walk`,

          flames: 0,

          pandal,
        }));
    }

    if (
      selectedStation === 'Shyambazar' &&
      SHYAMBAZAR_CIRCUIT
    ) {
      return SHYAMBAZAR_CIRCUIT;
    }

    return [
      {
        step: '01',
        name: `${selectedStation} Puja Circuit`,
        location: `${selectedStation}, Kolkata`,
        metro: `${selectedStation} Metro Station`,
        transitText: 'Nearby pandals • walking route',
        flames: 1,
      },
    ];
  }, [
    selectedStation,
    selectedMetroLine,
    selectedArea,
    pandals,
  ]);

  /* =========================================================
     CHECK
  ========================================================= */

  const handleToggleCheck = (step) => {
    setCheckedItems((previous) => ({
      ...previous,
      [step]: !previous[step],
    }));
  };

  /* =========================================================
     COPY
  ========================================================= */

  const handleCopyItinerary = async () => {
    const text = itinerary
      .map(
        (item) =>
          `${item.step}. ${item.name} (${item.location}) - Nearest: ${item.metro}`
      )
      .join('\n');

    const finalText =
      `✨ My Kolkata Durga Puja Itinerary (${selectedStation})\n\n` +
      text +
      '\n\nPlanned on Pandalé!';

    try {
      await navigator.clipboard.writeText(
        finalText
      );

      setCopied(true);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.error(
        'Unable to copy itinerary:',
        error
      );
    }
  };

  /* =========================================================
     ROUTE CARD
  ========================================================= */

  const handleRouteCard = (route) => {
    setSelectedRouteCard(route.id);
    setSelectedStation(route.hubStation);

    const station = ALL_STATIONS.find(
      (item) => item.name === route.hubStation
    );

    if (station) {
      setSelectedMetroLine(station.line);
      setCurrentPage(1);
    }
  };

  /* =========================================================
     ROUTE SLIDER
  ========================================================= */

  const routeCount = POPULAR_ROUTES.length;

  const visibleRoutes = useMemo(() => {
    if (routeCount <= 4) {
      return POPULAR_ROUTES;
    }

    const result = [];

    for (let i = 0; i < 4; i += 1) {
      result.push(
        POPULAR_ROUTES[
          (routeOffset + i) % routeCount
        ]
      );
    }

    return result;
  }, [routeOffset, routeCount]);

  const moveRouteLeft = () => {
    if (routeCount <= 1) return;

    setRouteOffset((current) =>
      current === 0
        ? routeCount - 1
        : current - 1
    );
  };

  const moveRouteRight = () => {
    if (routeCount <= 1) return;

    setRouteOffset(
      (current) =>
        (current + 1) % routeCount
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 text-left">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="space-y-3 max-w-4xl">

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
          <Route size={14} />

          <span>
            Smart Pujo Route Planner 2026
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
          Plan My Pujo Itinerary
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Build your step-by-step Kolkata pandal
          hopping route with Metro connectivity,
          walking estimates, and seamless
          multi-stop Google Maps navigation.
        </p>

      </div>

      {/* =====================================================
          POPULAR ROUTES
      ===================================================== */}

      <div className="space-y-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">

            <Sparkles size={14} />

            <span>
              POPULAR PANDAL ROUTES{' '}
              <span className="text-slate-400 font-normal">
                (SWIPE / SLIDE)
              </span>
            </span>

          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={moveRouteLeft}
              className="w-10 h-10 rounded-full bg-[#111726] border border-white/10 text-slate-400 hover:text-white hover:border-white/25 flex items-center justify-center transition-all"
              aria-label="Previous routes"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={moveRouteRight}
              className="w-10 h-10 rounded-full bg-[#111726] border border-white/10 text-slate-400 hover:text-white hover:border-white/25 flex items-center justify-center transition-all"
              aria-label="Next routes"
            >
              <ChevronRight size={18} />
            </button>

          </div>

        </div>

        {/* ROUTE CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {visibleRoutes.map((route) => {

            const isSelected =
              selectedRouteCard === route.id;

            return (
              <button
                key={route.id}
                type="button"
                onClick={() =>
                  handleRouteCard(route)
                }
                className={`group text-left p-4 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1a233a] border-amber-400 shadow-xl ring-1 ring-amber-400/40'
                    : 'bg-[#111726] border-white/10 hover:border-white/25 hover:-translate-y-1'
                }`}
              >

                <div>

                  {/* TITLE */}

                  <h3 className="font-serif text-lg font-bold text-white mb-0.5">
                    {route.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 truncate mb-3">
                    {route.subtitle}
                  </p>

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden mb-3 bg-[#0a0d16]">

                    <img
                      src={route.image}
                      alt={`${route.title} Durga Puja`}
                      loading="eager"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      onError={(event) => {
                        const image =
                          event.currentTarget;

                        console.error(
                          'Route image not found:',
                          route.image
                        );

                        image.style.display =
                          'none';

                        const parent =
                          image.parentElement;

                        if (parent) {
                          parent.style.background =
                            'linear-gradient(135deg, #182238, #0b1020)';
                        }
                      }}
                    />

                    {/* LIGHT OVERLAY ONLY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                    {/* PANDAL COUNT */}

                    <div className="absolute bottom-3 left-3 z-10">

                      <span className="inline-flex px-3 py-1.5 rounded-full text-[10px] font-extrabold bg-white text-slate-950 shadow-xl">
                        {route.pandalsCount} Iconic Pandals
                      </span>

                    </div>

                  </div>

                </div>

                {/* CARD FOOTER */}

                <div className="space-y-1 text-xs">

                  <p className="font-bold text-white truncate">
                    {route.keyLocations}
                  </p>

                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] truncate">

                    <span className="text-[#2563eb]">
                      🚇
                    </span>

                    <span className="truncate">
                      {route.metroTag}
                    </span>

                  </div>

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* =====================================================
          DESTINATION
      ===================================================== */}

      <div
        className="bg-[#111726]/90 border border-white/10 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6 backdrop-blur-md"
        id="planner-destination"
      >

        <div>

          <div className="flex items-center gap-2 mb-1">

            <span className="w-5 h-5 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 text-white flex items-center justify-center text-xs">
              📍
            </span>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Select Destination Metro or Area Hub
            </h2>

          </div>

          <p className="text-xs text-slate-400">
            Choose a Metro line or Non-Metro area
            hub to automatically generate a
            sequential itinerary ordered by
            proximity.
          </p>

        </div>

        {/* LINE BUTTONS */}

        <div className="flex flex-wrap items-center gap-2.5">

          {[
            'Blue',
            'Green',
            'Orange',
            'Purple',
          ].map((lineName) => {

            const isSelected =
              selectedMetroLine === lineName;

            const color =
              lineColors[lineName];

            return (
              <button
                key={lineName}
                type="button"
                onClick={() =>
                  handleLineChange(lineName)
                }
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                  isSelected
                    ? 'text-white shadow-md border-transparent'
                    : 'bg-[#0a0d16] text-slate-300 hover:text-white border-white/10'
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: color,
                      }
                    : undefined
                }
              >

                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: color,
                  }}
                />

                <span>
                  {lineName}
                </span>

              </button>
            );
          })}

          <button
            type="button"
            onClick={() =>
              handleLineChange('Areas')
            }
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all border ${
              selectedMetroLine === 'Areas'
                ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white border-transparent shadow-md'
                : 'bg-[#0a0d16] text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <span>📍</span>
            <span>Areas</span>
          </button>

        </div>

        {/* STATIONS */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

          {visibleStations.map((station) => {

            const isSelected =
              selectedStation === station.name;

            const stationColor =
              selectedMetroLine === 'Areas'
                ? '#e11d48'
                : lineColors[
                    station.line
                  ] || '#2563eb';

            return (
              <button
                key={station.name}
                type="button"
                onClick={() =>
                  handleStationSelect(station)
                }
                className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-[#1a233a] border-amber-400 shadow-md ring-1 ring-amber-400'
                    : 'bg-[#0a0d16] hover:bg-[#151c2e] border-white/10 text-slate-300'
                }`}
              >

                <div className="flex items-center gap-2 min-w-0">

                  <div
                    className="w-6 h-6 rounded-full text-white text-[10px] font-black flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor:
                        stationColor,
                    }}
                  >
                    {selectedMetroLine ===
                    'Areas'
                      ? '📍'
                      : 'M'}
                  </div>

                  <div className="min-w-0">

                    <span className="text-xs font-bold truncate text-white block">
                      {station.name}
                    </span>

                    {selectedMetroLine ===
                      'Areas' &&
                      station.subtitle && (
                        <span className="text-[9px] text-slate-500 block truncate mt-0.5">
                          {station.subtitle}
                        </span>
                      )}

                  </div>

                </div>

                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] shrink-0">
                    <Check size={12} />
                  </span>
                )}

              </button>
            );
          })}

        </div>

        {/* PAGINATION */}

        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400">

          <span>
            {selectedMetroLine === 'Areas'
              ? `Area Hubs (${lineStations.length})`
              : `${selectedMetroLine} Line (${lineStations.length})`}
          </span>

          <div className="flex items-center gap-1.5">

            <button
              type="button"
              disabled={safePage === 1}
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.max(1, page - 1)
                )
              }
              className="w-7 h-7 rounded-lg bg-[#0a0d16] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={13} />
            </button>

            {Array.from({
              length: totalPages,
            }).map((_, index) => {

              const page = index + 1;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    safePage === page
                      ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white'
                      : 'bg-[#0a0d16] border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              disabled={
                safePage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                )
              }
              className="w-7 h-7 rounded-lg bg-[#0a0d16] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={13} />
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          ITINERARY
      ===================================================== */}

      <div className="space-y-5">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          <div className="flex items-center gap-2">

            <span className="text-amber-400 font-bold">
              ✦
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Your Itinerary Path
            </h2>

          </div>

          <div className="flex items-center gap-3 flex-wrap">

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#111726] border border-white/10 text-slate-300">
              <span>🚶</span>

              <span>
                {selectedStation}:{' '}
                {itinerary.length * 60} m • ~
                {Math.max(
                  2,
                  itinerary.length * 2
                )}{' '}
                mins
              </span>

            </div>

            <button
              type="button"
              onClick={handleCopyItinerary}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#111726] hover:bg-[#1a233a] text-slate-200 border border-white/10 transition-colors"
            >
              {copied ? (
                <Check
                  size={13}
                  className="text-emerald-400"
                />
              ) : (
                <Copy size={13} />
              )}

              <span>
                {copied
                  ? 'Copied!'
                  : 'Copy Plan'}
              </span>
            </button>

          </div>

        </div>

        {/* SELECTED DESTINATION */}

        <div className="rounded-2xl border border-white/10 bg-[#111726]/70 p-4 flex items-center gap-3">

          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
            style={{
              backgroundColor:
                selectedMetroLine === 'Areas'
                  ? '#e11d48'
                  : lineColors[
                      selectedMetroLine
                    ] || '#2563eb',
            }}
          >
            {selectedMetroLine ===
            'Areas' ? (
              <Navigation size={16} />
            ) : (
              <Train size={17} />
            )}
          </div>

          <div>

            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
              Selected Destination
            </div>

            <div className="text-sm font-bold text-white mt-0.5">
              {selectedStation}
            </div>

          </div>

        </div>

        {/* ITINERARY ITEMS */}

        <div className="space-y-3">

          {itinerary.map(
            (item, index) => {

              const isChecked =
                !!checkedItems[item.step];

              return (
                <div
                  key={`${item.step}-${item.name}`}
                  className="space-y-2"
                >

                  {index > 0 && (
                    <div className="flex items-center gap-3 pl-4 sm:pl-5 py-0.5">

                      <div className="w-0.5 h-4 bg-slate-700" />

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#111726] text-slate-300 border border-white/10">

                        <div className="w-3.5 h-3.5 rounded bg-[#2563eb] text-white text-[8px] font-black flex items-center justify-center">
                          M
                        </div>

                        <span>
                          {item.transitText}
                        </span>

                      </div>

                    </div>
                  )}

                  <div
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'bg-[#0f172a] border-emerald-500/60 opacity-80'
                        : 'bg-[#111726]/80 hover:bg-[#172033] border-white/10 hover:border-white/20'
                    }`}
                  >

                    <div className="flex items-center gap-3 min-w-0">

                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-600 to-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                        {item.step}
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <button
                            type="button"
                            onClick={() => {
                              if (
                                item.pandal &&
                                typeof onSelectPandal ===
                                  'function'
                              ) {
                                onSelectPandal(
                                  item.pandal
                                );
                              }
                            }}
                            className="font-serif text-base sm:text-lg font-bold text-white hover:text-amber-300 transition-colors truncate text-left"
                          >
                            {item.name}
                          </button>

                          {item.flames > 0 && (
                            <div className="flex items-center">
                              {Array.from({
                                length:
                                  item.flames,
                              }).map(
                                (_, flameIndex) => (
                                  <span
                                    key={
                                      flameIndex
                                    }
                                    className="text-xs"
                                  >
                                    🔥
                                  </span>
                                )
                              )}
                            </div>
                          )}

                          <span className="text-slate-500 text-xs hidden sm:inline">
                            •
                          </span>

                          <div className="flex items-center gap-1 text-xs text-slate-400 truncate">

                            <MapPin
                              size={11}
                              className="text-rose-400 shrink-0"
                            />

                            <span className="truncate">
                              {item.location}
                            </span>

                          </div>

                        </div>

                        <div className="flex items-center gap-1.5 mt-1">

                          <div className="w-3.5 h-3.5 rounded bg-[#2563eb] text-white text-[8px] font-black flex items-center justify-center">
                            M
                          </div>

                          <span className="text-[11px] text-slate-300 font-medium">
                            {item.metro}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="flex items-center gap-2 shrink-0">

                      <button
                        type="button"
                        onClick={() =>
                          window.open(
                            `https://maps.google.com/?q=${encodeURIComponent(
                              `${item.name} Durga Puja Kolkata`
                            )}`,
                            '_blank'
                          )
                        }
                        className="w-8 h-8 rounded-xl bg-[#0a0d16] hover:bg-[#151c2e] text-slate-400 hover:text-rose-400 flex items-center justify-center border border-white/10 transition-colors"
                        title="Open in Maps"
                      >
                        <MapPin
                          size={14}
                          className="text-rose-500"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleToggleCheck(
                            item.step
                          )
                        }
                        className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-[#0a0d16] border-white/10 text-slate-500 hover:border-white/20'
                        }`}
                        title={
                          isChecked
                            ? 'Visited'
                            : 'Mark as Visited'
                        }
                      >
                        {isChecked && (
                          <Check size={14} />
                        )}
                      </button>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}