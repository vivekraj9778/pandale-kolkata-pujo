import React, { useMemo, useState } from 'react';

import {
  METRO_LINES,
  ALL_STATIONS,
} from '../data/metroData';

import {
  Train,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Search,
  ChevronRight,
  ExternalLink,
  Check,
} from 'lucide-react';

export default function MetroView({
  pandals = [],
  onSelectPandal,
  onOpenMetroMap,
  language,
}) {
  /* ============================================================
     STATE
  ============================================================ */

  const [selectedLineId, setSelectedLineId] =
    useState('blue-line');

  const [stationSearch, setStationSearch] =
    useState('');

  const [startingStationFilter, setStartingStationFilter] =
    useState('all');

  const [selectedStationId, setSelectedStationId] =
    useState(null);

  const [filterMode, setFilterMode] =
    useState('metro');

  /* ============================================================
     HELPERS
  ============================================================ */

  const normalizeStationName = (value = '') => {
    return value
      .replace(/\s+Metro\s+Station$/i, '')
      .replace(/\s+Metro$/i, '')
      .trim()
      .toLowerCase();
  };

  const getStationPandals = (stationName) => {
    const normalizedStation =
      normalizeStationName(stationName);

    if (
      !normalizedStation ||
      !Array.isArray(pandals)
    ) {
      return [];
    }

    return pandals.filter((pandal) => {
      const pandalMetro =
        normalizeStationName(
          pandal?.metroStation || ''
        );

      return (
        pandalMetro === normalizedStation
      );
    });
  };

  const getLineColor = (lineId) => {
    const line = METRO_LINES.find(
      (item) => item.id === lineId
    );

    return line?.color || '#ef4444';
  };

  const getLineBadgeClass = (lineId) => {
    switch (lineId) {
      case 'blue-line':
        return 'bg-blue-600';

      case 'green-line':
        return 'bg-emerald-600';

      case 'orange-line':
        return 'bg-orange-600';

      case 'purple-line':
        return 'bg-purple-600';

      case 'yellow-line':
        return 'bg-yellow-500 text-slate-950';

      default:
        return 'bg-rose-600';
    }
  };

  /* ============================================================
     CURRENT LINE
  ============================================================ */

  const selectedLine = useMemo(() => {
    return METRO_LINES.find(
      (line) => line.id === selectedLineId
    );
  }, [selectedLineId]);

  /* ============================================================
     ONLY STATIONS OF SELECTED LINE
     THIS IS THE MAIN FIX
  ============================================================ */

  const selectedLineStations = useMemo(() => {
    return ALL_STATIONS.filter(
      (station) =>
        station.lineId === selectedLineId
    );
  }, [selectedLineId]);

  /* ============================================================
     FILTERED STATIONS
  ============================================================ */

  const filteredStations = useMemo(() => {
    if (filterMode !== 'metro') {
      return [];
    }

    const query =
      stationSearch.trim().toLowerCase();

    return selectedLineStations.filter(
      (station) => {
        const matchesSearch =
          !query ||
          station.name
            .toLowerCase()
            .includes(query) ||
          (
            station.bengali &&
            station.bengali
              .toLowerCase()
              .includes(query)
          );

        const matchesStartingStation =
          startingStationFilter === 'all' ||
          station.name ===
            startingStationFilter;

        return (
          matchesSearch &&
          matchesStartingStation
        );
      }
    );
  }, [
    selectedLineStations,
    stationSearch,
    startingStationFilter,
    filterMode,
  ]);

  /* ============================================================
     SELECTED STATION
  ============================================================ */

  const selectedStation = useMemo(() => {
    if (!selectedStationId) {
      return null;
    }

    return ALL_STATIONS.find(
      (station) =>
        station.id === selectedStationId
    );
  }, [selectedStationId]);

  /* ============================================================
     SELECTED STATION PANDALS
  ============================================================ */

  const selectedStationPandals = useMemo(() => {
    if (!selectedStation) {
      return [];
    }

    return getStationPandals(
      selectedStation.name
    );
  }, [
    selectedStation,
    pandals,
  ]);

  /* ============================================================
     SCROLL TO STATIONS
  ============================================================ */

  const scrollToStations = () => {
    window.requestAnimationFrame(() => {
      const section =
        document.getElementById(
          'metro-stations'
        );

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  };

  /* ============================================================
     SELECT LINE
  ============================================================ */

  const handleLineSelect = (lineId) => {
    setSelectedLineId(lineId);

    /*
      Clear old station filters.
      This makes sure that when we move from
      Blue -> Green, an old Blue station doesn't
      hide all Green stations.
    */
    setStationSearch('');
    setStartingStationFilter('all');
    setFilterMode('metro');

    /*
      Select first station of new line.
    */
    const firstStation =
      ALL_STATIONS.find(
        (station) =>
          station.lineId === lineId
      );

    setSelectedStationId(
      firstStation?.id || null
    );

    scrollToStations();
  };

  /* ============================================================
     TOP RIGHT ARROW
  ============================================================ */

  const handleLineArrowClick = (
    event,
    lineId
  ) => {
    event.preventDefault();
    event.stopPropagation();

    handleLineSelect(lineId);
  };

  /* ============================================================
     SELECT STATION
  ============================================================ */

  const handleStationSelect = (station) => {
    setSelectedStationId(station.id);

    /*
      Safety:
      If somehow a station from another line
      is selected, switch line too.
    */
    if (
      station.lineId &&
      station.lineId !== selectedLineId
    ) {
      setSelectedLineId(station.lineId);
      setStartingStationFilter('all');
    }
  };

  /* ============================================================
     STATION ARROW
  ============================================================ */

  const handleStationArrowClick = (
    event,
    station
  ) => {
    event.preventDefault();
    event.stopPropagation();

    handleStationSelect(station);

    const stationPandals =
      getStationPandals(
        station.name
      );

    /*
      If this station has pandals,
      open the first one.
    */
    if (
      stationPandals.length > 0 &&
      typeof onSelectPandal ===
        'function'
    ) {
      onSelectPandal(
        stationPandals[0]
      );
    }
  };

  /* ============================================================
     OPEN PANDAL
  ============================================================ */

  const handleOpenPandal = (pandal) => {
    if (
      typeof onSelectPandal ===
      'function'
    ) {
      onSelectPandal(pandal);
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 text-left">

      {/* ======================================================
          HERO
      ====================================================== */}

      <div className="space-y-4 max-w-4xl">

        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
          <Train size={15} />

          <span>
            {language === 'bn'
              ? 'কলকাতা মেট্রো পুজো গাইড'
              : 'KOLKATA METRO PUJA GUIDE'}
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.95]">
          {language === 'bn'
            ? 'মেট্রোতে কলকাতার পুজো ঘুরুন'
            : 'Explore Kolkata Pujo by Metro'}

          <span className="text-rose-500 font-sans ml-2">
            〰
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {language === 'bn'
            ? 'শহরের যানজট এড়িয়ে মেট্রো স্টেশন থেকে কাছাকাছি বিখ্যাত পুজো প্যান্ডেল খুঁজে নিন। হাঁটার দূরত্ব ও স্টেশন তথ্য একসাথে দেখুন।'
            : 'Skip city traffic completely. Select a Metro line or station to discover nearby iconic pandals, walking distance, crowd hubs, and direct routes.'}
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={onOpenMetroMap}
            className="
              inline-flex
              items-center
              gap-2.5
              px-6
              py-3
              rounded-full
              bg-gradient-to-r
              from-rose-600
              via-rose-700
              to-amber-600
              hover:from-rose-500
              hover:to-amber-500
              text-white
              font-bold
              text-xs
              sm:text-sm
              shadow-xl
              shadow-rose-950/60
              hover:-translate-y-0.5
              transition-all
            "
          >
            <Train size={16} />

            <span>
              {language === 'bn'
                ? 'মেট্রো ম্যাপ দেখুন • ৫ লাইন'
                : 'Explore Metro Map • 5 Lines'}
            </span>

            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ======================================================
          LINE HEADER
      ====================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/10">

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
          <Sparkles size={14} />

          <span>
            {language === 'bn'
              ? 'মেট্রো লাইন করিডোর'
              : 'METRO LINE CORRIDORS'}
          </span>
        </div>

        <div className="flex items-center bg-[#111726] border border-white/10 rounded-full p-1 text-xs font-bold w-fit">

          <button
            type="button"
            onClick={() =>
              setFilterMode('metro')
            }
            className={`
              px-4
              py-1.5
              rounded-full
              transition-all
              ${
                filterMode === 'metro'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }
            `}
          >
            Metro
          </button>

          <button
            type="button"
            onClick={() =>
              setFilterMode('no-metro')
            }
            className={`
              px-4
              py-1.5
              rounded-full
              transition-all
              ${
                filterMode === 'no-metro'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }
            `}
          >
            No Metro
          </button>

        </div>
      </div>

      {/* ======================================================
          SELECTED LINE INFO
      ====================================================== */}

      {selectedLine && (
        <div className="flex items-center gap-2 -mt-5">

          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor:
                selectedLine.color,
              boxShadow:
                `0 0 10px ${selectedLine.color}`,
            }}
          />

          <span className="text-xs font-bold text-slate-300">
            {selectedLine.name}
          </span>

          <span className="text-slate-600">
            •
          </span>

          <span className="text-xs text-slate-500">
            {selectedLineStations.length}{' '}
            stations
          </span>
        </div>
      )}

      {/* ======================================================
          METRO LINE CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {METRO_LINES.map((line) => {
          const isSelected =
            selectedLineId === line.id;

          return (
            <div
              key={line.id}
              onClick={() =>
                handleLineSelect(line.id)
              }
              className={`
                relative
                rounded-3xl
                overflow-hidden
                border
                cursor-pointer
                transition-all
                duration-300
                group
                bg-[#111726]

                ${
                  isSelected
                    ? 'border-amber-400 shadow-2xl ring-2 ring-amber-400/30'
                    : 'border-white/10 hover:border-white/30 hover:-translate-y-1'
                }
              `}
            >

              {/* IMAGE */}

              <div className="relative h-48 sm:h-52 w-full bg-[#0a0d16] overflow-hidden">

                <img
                  src={line.image}
                  alt={`${line.name} Kolkata Metro`}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-700
                  "
                  onError={(event) => {
                    const img =
                      event.currentTarget;

                    if (
                      line.fallbackImage &&
                      !img.dataset.fallbackUsed
                    ) {
                      img.dataset.fallbackUsed =
                        'true';

                      img.src =
                        line.fallbackImage;
                    }
                  }}
                />

                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#111726]
                  via-black/30
                  to-black/35
                  pointer-events-none
                " />

                {/* LINE COLOR */}

                <div
                  className="
                    absolute
                    left-0
                    right-0
                    bottom-0
                    h-1
                    z-10
                  "
                  style={{
                    backgroundColor:
                      line.color,
                    boxShadow:
                      `0 0 15px ${line.color}`,
                  }}
                />

                {/* LINE BADGE */}

                <div className="
                  absolute
                  top-3.5
                  left-3.5
                  z-30
                ">
                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      px-3
                      py-1.5
                      rounded-full
                      text-[10px]
                      sm:text-[11px]
                      font-bold
                      text-white
                      shadow-lg
                      backdrop-blur-md
                      border
                      border-white/20
                      ${getLineBadgeClass(line.id)}
                    `}
                  >
                    <Train size={12} />

                    {line.name}
                  </span>
                </div>

                {/* SELECTED CHECK */}

                {isSelected && (
                  <div
                    className="
                      absolute
                      top-3.5
                      right-3.5
                      z-30
                      w-10
                      h-10
                      rounded-full
                      bg-red-600
                      border-2
                      border-white/80
                      flex
                      items-center
                      justify-center
                      text-white
                      shadow-xl
                    "
                  >
                    <Check
                      size={21}
                      strokeWidth={3}
                    />
                  </div>
                )}

                {/* ARROW */}

                <button
                  type="button"
                  aria-label={`View ${line.name} stations`}
                  title={`View ${line.name} stations`}
                  onClick={(event) =>
                    handleLineArrowClick(
                      event,
                      line.id
                    )
                  }
                  className="
                    absolute
                    top-3.5
                    right-3.5
                    z-40
                    w-10
                    h-10
                    rounded-full
                    bg-black/65
                    backdrop-blur-md
                    border
                    border-white/20
                    flex
                    items-center
                    justify-center
                    text-white
                    shadow-xl
                    hover:bg-rose-600
                    hover:border-rose-400
                    hover:scale-110
                    active:scale-95
                    transition-all
                  "
                >
                  <ArrowRight size={17} />
                </button>

                {/* STATS */}

                <div className="
                  absolute
                  bottom-3
                  left-3
                  right-3
                  z-20
                  flex
                  items-center
                  justify-between
                  gap-2
                ">

                  <span className="
                    px-2.5
                    py-1
                    rounded-lg
                    text-[10px]
                    font-bold
                    bg-black/75
                    backdrop-blur-sm
                    text-slate-200
                    border
                    border-white/10
                  ">
                    {line.totalStations}{' '}
                    Stns
                  </span>

                  <span className="
                    px-2.5
                    py-1
                    rounded-lg
                    text-[10px]
                    font-bold
                    bg-rose-600
                    text-white
                    shadow-lg
                  ">
                    {line.connectedPandalsCount}{' '}
                    Pandals
                  </span>

                </div>
              </div>

              {/* CARD CONTENT */}

              <div className="p-4 sm:p-5 bg-[#111726]">

                <div className="flex items-center gap-2 mb-1.5">

                  <span
                    className="
                      w-2.5
                      h-2.5
                      rounded-full
                      shrink-0
                    "
                    style={{
                      backgroundColor:
                        line.color,
                      boxShadow:
                        `0 0 10px ${line.color}`,
                    }}
                  />

                  <h3 className="
                    font-serif
                    text-lg
                    font-bold
                    text-white
                    group-hover:text-amber-300
                    transition-colors
                  ">
                    {line.name}
                  </h3>
                </div>

                <p className="
                  text-xs
                  text-slate-400
                  truncate
                ">
                  {line.route}
                </p>

                {line.description && (
                  <p className="
                    text-[11px]
                    text-slate-500
                    leading-relaxed
                    mt-3
                    line-clamp-2
                  ">
                    {line.description}
                  </p>
                )}

                {line.specialPujaSchedule && (
                  <div className="
                    flex
                    items-start
                    gap-2
                    mt-3
                    pt-3
                    border-t
                    border-white/5
                  ">
                    <Clock
                      size={12}
                      className="
                        text-amber-400
                        mt-0.5
                        shrink-0
                      "
                    />

                    <p className="
                      text-[10px]
                      text-slate-400
                      leading-relaxed
                    ">
                      {line.specialPujaSchedule}
                    </p>
                  </div>
                )}

              </div>
            </div>
          );
        })}

      </div>

      {/* ======================================================
          LINE INDICATORS
      ====================================================== */}

      <div className="
        flex
        items-center
        justify-center
      ">
        {METRO_LINES.map((line) => {
          const isSelected =
            selectedLineId === line.id;

          return (
            <button
              key={line.id}
              type="button"
              onClick={() =>
                handleLineSelect(line.id)
              }
              aria-label={`Select ${line.name}`}
              className={`
                mx-1.5
                h-1.5
                rounded-full
                transition-all
                duration-300
                ${
                  isSelected
                    ? 'w-8'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }
              `}
              style={
                isSelected
                  ? {
                      backgroundColor:
                        line.color,
                      boxShadow:
                        `0 0 10px ${line.color}`,
                    }
                  : undefined
              }
            />
          );
        })}
      </div>

      {/* ======================================================
          STATIONS
      ====================================================== */}

      <div
        id="metro-stations"
        className="
          bg-[#111726]/90
          border
          border-white/10
          rounded-3xl
          p-5
          sm:p-7
          shadow-2xl
          space-y-6
          backdrop-blur-md
          scroll-mt-28
        "
      >

        {/* HEADER */}

        <div className="
          flex
          flex-col
          gap-4
          pb-4
          border-b
          border-white/10
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div
              className="
                w-12
                h-12
                rounded-2xl
                flex
                items-center
                justify-center
                shrink-0
                border
              "
              style={{
                backgroundColor:
                  `${getLineColor(selectedLineId)}18`,
                borderColor:
                  `${getLineColor(selectedLineId)}55`,
                color:
                  getLineColor(selectedLineId),
              }}
            >
              <Train size={23} />
            </div>

            <div>

              <h2 className="
                font-serif
                text-2xl
                sm:text-3xl
                font-bold
                text-white
              ">
                {language === 'bn'
                  ? `স্টেশন (${filteredStations.length})`
                  : `Stations (${filteredStations.length})`}
              </h2>

              <p className="
                text-xs
                sm:text-sm
                text-slate-400
              ">
                {selectedLine
                  ? `${selectedLine.name} • `
                  : ''}

                {language === 'bn'
                  ? 'কাছাকাছি প্যান্ডেল দেখতে একটি স্টেশন নির্বাচন করুন'
                  : 'Select a station to explore nearby pandals'}
              </p>

            </div>
          </div>

          {/* CONTROLS */}

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-3
          ">

            {/* STARTING STATION */}

            <div className="relative">

              <MapPin
                size={16}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-rose-400
                  pointer-events-none
                "
              />

              <select
                value={startingStationFilter}
                onChange={(event) =>
                  setStartingStationFilter(
                    event.target.value
                  )
                }
                className="
                  w-full
                  bg-[#0a0d16]
                  border
                  border-white/10
                  text-slate-200
                  text-sm
                  rounded-2xl
                  px-10
                  py-3
                  appearance-none
                  focus:outline-none
                  focus:border-rose-500
                  cursor-pointer
                "
              >
                <option value="all">
                  Select Starting Station
                </option>

                {selectedLineStations.map(
                  (station) => (
                    <option
                      key={station.id}
                      value={station.name}
                    >
                      {station.name}
                    </option>
                  )
                )}
              </select>

              <span className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                pointer-events-none
              ">
                ⌄
              </span>
            </div>

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={17}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={stationSearch}
                onChange={(event) =>
                  setStationSearch(
                    event.target.value
                  )
                }
                placeholder="Search station..."
                className="
                  w-full
                  bg-[#0a0d16]
                  border
                  border-white/10
                  text-slate-200
                  text-sm
                  rounded-2xl
                  pl-10
                  pr-4
                  py-3
                  focus:outline-none
                  focus:border-rose-500
                  placeholder-slate-500
                "
              />
            </div>

          </div>
        </div>

        {/* ====================================================
            STATION LIST
        ==================================================== */}

        {filterMode !== 'metro' ? (

          <div className="
            py-12
            text-center
          ">

            <Train
              size={28}
              className="
                mx-auto
                text-slate-600
              "
            />

            <h3 className="
              mt-4
              text-white
              font-bold
            ">
              Metro stations hidden
            </h3>

            <p className="
              text-xs
              text-slate-500
              mt-1
            ">
              Select Metro to view stations.
            </p>

            <button
              type="button"
              onClick={() =>
                setFilterMode('metro')
              }
              className="
                mt-4
                px-5
                py-2.5
                rounded-full
                bg-rose-600
                hover:bg-rose-500
                text-white
                text-xs
                font-bold
              "
            >
              Show Metro Stations
            </button>
          </div>

        ) : filteredStations.length === 0 ? (

          <div className="
            py-12
            text-center
          ">

            <Search
              size={28}
              className="
                mx-auto
                text-slate-600
              "
            />

            <h3 className="
              mt-4
              text-white
              font-bold
            ">
              No stations found
            </h3>

            <p className="
              text-xs
              text-slate-500
              mt-1
            ">
              Try another station or clear the filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setStationSearch('');
                setStartingStationFilter(
                  'all'
                );
              }}
              className="
                mt-4
                px-5
                py-2.5
                rounded-full
                bg-white/5
                border
                border-white/10
                text-slate-300
                text-xs
                font-bold
              "
            >
              Clear Filters
            </button>
          </div>

        ) : (

          <div className="divide-y divide-white/[0.06]">

            {filteredStations.map(
              (station) => {

                const isSelected =
                  selectedStationId ===
                  station.id;

                const lineColor =
                  getLineColor(
                    station.lineId
                  );

                return (
                  <div
                    key={station.id}
                    onClick={() =>
                      handleStationSelect(
                        station
                      )
                    }
                    className="
                      py-5
                      first:pt-2
                      last:pb-2
                      flex
                      items-center
                      justify-between
                      gap-4
                      cursor-pointer
                      group
                    "
                  >

                    {/* LEFT */}

                    <div className="
                      flex
                      items-center
                      gap-4
                      min-w-0
                    ">

                      {/* METRO CIRCLE */}

                      <div
                        className="
                          w-12
                          h-12
                          sm:w-14
                          sm:h-14
                          rounded-full
                          flex
                          items-center
                          justify-center
                          text-white
                          font-bold
                          shrink-0
                          transition-all
                        "
                        style={{
                          backgroundColor:
                            lineColor,
                          boxShadow:
                            isSelected
                              ? `0 0 20px ${lineColor}66`
                              : 'none',
                        }}
                      >
                        M
                      </div>

                      {/* NAME */}

                      <div className="min-w-0">

                        <h3 className="
                          font-serif
                          text-lg
                          sm:text-xl
                          font-bold
                          text-white
                          truncate
                        ">
                          {station.name}
                        </h3>

                        <div className="
                          flex
                          items-center
                          gap-2
                          mt-1.5
                          flex-wrap
                        ">

                          <span className="
                            px-3
                            py-1
                            rounded-full
                            text-[10px]
                            sm:text-xs
                            font-bold
                            bg-rose-950/70
                            border
                            border-rose-800/60
                            text-rose-300
                          ">
                            {station.pandalsCount}{' '}
                            Pandals
                          </span>

                          {station.hasHotspot && (
                            <span className="
                              px-2
                              py-1
                              rounded-full
                              text-[9px]
                              font-bold
                              bg-amber-500/10
                              border
                              border-amber-500/20
                              text-amber-400
                            ">
                              HOTSPOT
                            </span>
                          )}

                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div className="
                      flex
                      items-center
                      gap-3
                      shrink-0
                    ">

                      {/* WALK INFO */}

                      <div className="
                        hidden
                        sm:flex
                        items-center
                        gap-2
                        text-slate-300
                        text-sm
                      ">

                        <Clock
                          size={17}
                          className="text-red-500"
                        />

                        <span className="font-semibold">
                          {station.walkTime}
                        </span>

                        <span className="
                          text-slate-600
                        ">
                          •
                        </span>

                        <span className="
                          text-slate-400
                        ">
                          {station.distance ||
                            station.walkDistance ||
                            ''}
                        </span>
                      </div>

                      {/* ARROW */}

                      <button
                        type="button"
                        aria-label={`Open ${station.name}`}
                        title={`Open ${station.name}`}
                        onClick={(event) =>
                          handleStationArrowClick(
                            event,
                            station
                          )
                        }
                        className="
                          w-11
                          h-11
                          rounded-full
                          bg-white/5
                          border
                          border-white/5
                          flex
                          items-center
                          justify-center
                          text-slate-300
                          group-hover:bg-rose-600
                          group-hover:text-white
                          group-hover:border-rose-500
                          transition-all
                        "
                      >
                        <ChevronRight
                          size={20}
                        />
                      </button>

                    </div>
                  </div>
                );
              }
            )}

          </div>
        )}

        {/* ====================================================
            SELECTED STATION PANDALS
        ==================================================== */}

        {selectedStation && (
          <div className="
            pt-5
            border-t
            border-white/10
          ">

            <div className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              justify-between
              gap-3
              mb-4
            ">

              <div>

                <p className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-amber-400
                  font-bold
                ">
                  SELECTED STATION
                </p>

                <h3 className="
                  font-serif
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-white
                ">
                  {selectedStation.name}
                </h3>

              </div>

              <span className="
                text-xs
                px-3
                py-1.5
                rounded-full
                bg-rose-950/70
                border
                border-rose-800/60
                text-rose-300
                font-bold
                w-fit
              ">
                {selectedStationPandals.length}{' '}
                linked pandals
              </span>

            </div>

            {selectedStationPandals.length >
            0 ? (

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
              ">

                {selectedStationPandals.map(
                  (pandal) => (
                    <button
                      key={pandal.id}
                      type="button"
                      onClick={() =>
                        handleOpenPandal(
                          pandal
                        )
                      }
                      className="
                        text-left
                        p-4
                        rounded-2xl
                        bg-[#0a0d16]/80
                        border
                        border-white/10
                        hover:border-rose-500/60
                        hover:bg-[#151c2e]
                        transition-all
                        group
                      "
                    >

                      <div className="
                        flex
                        items-start
                        justify-between
                        gap-3
                      ">

                        <div className="min-w-0">

                          <h4 className="
                            text-sm
                            font-bold
                            text-white
                            group-hover:text-amber-300
                            truncate
                          ">
                            {pandal.name}
                          </h4>

                          {pandal.subLocation && (
                            <p className="
                              text-[11px]
                              text-slate-500
                              mt-1
                              truncate
                            ">
                              {pandal.subLocation}
                            </p>
                          )}

                        </div>

                        <ExternalLink
                          size={15}
                          className="
                            text-rose-400
                            shrink-0
                          "
                        />

                      </div>

                      <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        mt-3
                      ">

                        {pandal.walkMinutes !==
                          undefined && (
                          <span className="
                            text-[10px]
                            px-2
                            py-1
                            rounded-lg
                            bg-white/5
                            text-slate-400
                          ">
                            🚶{' '}
                            {pandal.walkMinutes}{' '}
                            min
                          </span>
                        )}

                        {pandal.crowdLevel && (
                          <span className="
                            text-[10px]
                            px-2
                            py-1
                            rounded-lg
                            bg-rose-950/60
                            text-rose-300
                          ">
                            {pandal.crowdLevel}
                          </span>
                        )}

                      </div>
                    </button>
                  )
                )}

              </div>

            ) : (

              <div className="
                rounded-2xl
                border
                border-white/10
                bg-[#0a0d16]/60
                p-5
                text-center
              ">

                <div className="text-2xl mb-2">
                  🚇
                </div>

                <p className="
                  text-sm
                  text-slate-300
                ">
                  No direct pandal data is linked to this station yet.
                </p>

                <p className="
                  text-[11px]
                  text-slate-500
                  mt-1
                ">
                  Try another nearby station.
                </p>

              </div>
            )}

          </div>
        )}

      </div>

      {/* ======================================================
          INFO CARDS
      ====================================================== */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
      ">

        <div className="
          rounded-2xl
          border
          border-white/10
          bg-[#111726]/80
          p-5
        ">

          <div className="
            w-9
            h-9
            rounded-xl
            bg-blue-500/10
            border
            border-blue-500/20
            text-blue-400
            flex
            items-center
            justify-center
            mb-3
          ">
            <Train size={17} />
          </div>

          <h3 className="
            text-white
            font-bold
            text-sm
          ">
            5 Metro Lines
          </h3>

          <p className="
            text-xs
            text-slate-500
            mt-1
            leading-relaxed
          ">
            Blue, Green, Orange, Purple and Yellow corridors.
          </p>

        </div>

        <div className="
          rounded-2xl
          border
          border-white/10
          bg-[#111726]/80
          p-5
        ">

          <div className="
            w-9
            h-9
            rounded-xl
            bg-rose-500/10
            border
            border-rose-500/20
            text-rose-400
            flex
            items-center
            justify-center
            mb-3
          ">
            <MapPin size={17} />
          </div>

          <h3 className="
            text-white
            font-bold
            text-sm
          ">
            Puja Hotspots
          </h3>

          <p className="
            text-xs
            text-slate-500
            mt-1
            leading-relaxed
          ">
            Find stations with multiple famous pandals nearby.
          </p>

        </div>

        <div className="
          rounded-2xl
          border
          border-white/10
          bg-[#111726]/80
          p-5
        ">

          <div className="
            w-9
            h-9
            rounded-xl
            bg-amber-500/10
            border
            border-amber-500/20
            text-amber-400
            flex
            items-center
            justify-center
            mb-3
          ">
            <Clock size={17} />
          </div>

          <h3 className="
            text-white
            font-bold
            text-sm
          ">
            Walking Distance
          </h3>

          <p className="
            text-xs
            text-slate-500
            mt-1
            leading-relaxed
          ">
            Check estimated walking time from each Metro station.
          </p>

        </div>

      </div>

      {/* ======================================================
          VIEW STATIONS BUTTON
      ====================================================== */}

      <div className="
        flex
        justify-center
        pb-4
      ">
        <button
          type="button"
          onClick={scrollToStations}
          className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2.5
            rounded-full
            border
            border-white/10
            bg-white/5
            text-slate-300
            text-xs
            font-bold
            hover:bg-rose-600
            hover:text-white
            hover:border-rose-500
            transition-all
          "
        >
          <Train size={14} />

          View Stations

          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}