import React, { useMemo, useState } from 'react';
import {
  Train,
  MapPin,
  Search,
  X,
  Navigation,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

import { METRO_LINES, ALL_STATIONS } from '../data/metroData';

export default function MetroMapView({
  onSelectPandalByName,
  language,
}) {
  const [selectedLine, setSelectedLine] = useState('all');
  const [selectedStationId, setSelectedStationId] = useState('shyambazar');
  const [search, setSearch] = useState('');

  /*
   * Station -> connected Puja pandals
   */
  const stationPandalMap = {
    Kalighat: [
      'Deshopriyo Park',
      'Badamtala Ashar Sangha',
      'Singhi Park Sarbojanin',
      'Chetla Agrani Club',
    ],

    Shyambazar: [
      'Tala Prattay',
      'Bagbazar Sarbojanin Durgotsav',
      'Kashi Bose Lane Durga Puja',
    ],

    'Sovabazar Sutanuti': [
      'Sovabazar Rajbari',
      'Ahiritola Sarbojanin',
    ],

    Central: [
      'College Square Sarbojanin',
    ],

    'Girish Park': [
      'Simla Byam Samiti',
    ],

    Sealdah: [
      'Santosh Mitra Square (Lebutala)',
    ],

    Belgachia: [
      'Sree Bhumi Sporting Club',
      'Dumdum Park Sarbojonin',
    ],

    'Rabindra Sarobar': [
      'Jodhpur Park',
      'Mudiali Club',
    ],

    Sakherbazar: [
      'Barisha Club',
    ],

    Karunamoyee: [
      'FD Block Sarbojanin, Salt Lake',
    ],

    Majerhat: [
      'Suruchi Sangha',
    ],

    'Salt Lake Sector V': [
      'FD Block Sarbojanin, Salt Lake',
    ],

    'Kavi Sukanta': [
      'Kavi Sukanta Puja',
    ],

    'Hemanta Mukhopadhyay': [
      'Ruby Park Durga Puja',
    ],
  };

  /*
   * Line colors
   */
  const lineColors = {
    'blue-line': '#2563eb',
    'green-line': '#10b981',
    'orange-line': '#f97316',
    'purple-line': '#a855f7',
    'yellow-line': '#eab308',
  };

  /*
   * Selected station
   */
  const selectedStation = useMemo(() => {
    return (
      ALL_STATIONS.find(
        (station) => station.id === selectedStationId
      ) || ALL_STATIONS[0]
    );
  }, [selectedStationId]);

  /*
   * Search + line filter
   */
  const filteredStations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return ALL_STATIONS.filter((station) => {
      const matchesLine =
        selectedLine === 'all' ||
        station.lineId === selectedLine;

      const matchesSearch =
        !query ||
        station.name.toLowerCase().includes(query) ||
        (station.bengali &&
          station.bengali.includes(query));

      return matchesLine && matchesSearch;
    });
  }, [selectedLine, search]);

  /*
   * Selected station pandals
   */
  const selectedPandals =
    stationPandalMap[selectedStation?.name] || [];

  /*
   * Select station
   */
  const handleStationSelect = (station) => {
    setSelectedStationId(station.id);
    setSelectedLine(station.lineId);
  };

  /*
   * Open pandal
   */
  const handlePandalClick = (pandalName) => {
    if (typeof onSelectPandalByName === 'function') {
      onSelectPandalByName(pandalName);
    }
  };

  /*
   * Line information
   */
  const getLine = (lineId) => {
    return METRO_LINES.find((line) => line.id === lineId);
  };

  /*
   * Build SVG coordinates for stations.
   * This creates a clean schematic metro map.
   */
  const stationCoordinates = useMemo(() => {
    const result = {};

    const grouped = {};

    ALL_STATIONS.forEach((station) => {
      if (!grouped[station.lineId]) {
        grouped[station.lineId] = [];
      }

      grouped[station.lineId].push(station);
    });

    Object.entries(grouped).forEach(
      ([lineId, stations]) => {
        if (lineId === 'blue-line') {
          stations.forEach((station, index) => {
            result[station.id] = {
              x: 250,
              y: 70 + index * 48,
            };
          });
        }

        if (lineId === 'green-line') {
          stations.forEach((station, index) => {
            result[station.id] = {
              x: 100 + index * 100,
              y: 310,
            };
          });
        }

        if (lineId === 'purple-line') {
          stations.forEach((station, index) => {
            result[station.id] = {
              x: 120 + index * 105,
              y: 520 - index * 45,
            };
          });
        }

        if (lineId === 'orange-line') {
          stations.forEach((station, index) => {
            result[station.id] = {
              x: 420 + index * 105,
              y: 520 - index * 55,
            };
          });
        }

        if (lineId === 'yellow-line') {
          stations.forEach((station, index) => {
            result[station.id] = {
              x: 700,
              y: 100 + index * 70,
            };
          });
        }
      }
    );

    return result;
  }, []);

  /*
   * Generate SVG points for every line
   */
  const linePaths = useMemo(() => {
    return METRO_LINES.map((line) => {
      const stations = ALL_STATIONS.filter(
        (station) => station.lineId === line.id
      );

      const points = stations
        .map((station) => {
          const position = stationCoordinates[station.id];

          if (!position) {
            return null;
          }

          return `${position.x},${position.y}`;
        })
        .filter(Boolean)
        .join(' ');

      return {
        ...line,
        points,
      };
    });
  }, [stationCoordinates]);

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-amber-400 mb-2">
            <Train size={15} />
            <span>Kolkata Metro Network</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                Metro Map
              </h1>

              <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
                Explore Kolkata Metro stations and discover
                nearby Durga Puja pandals, walking routes and
                festival hotspots.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-80">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search station..."
                className="w-full h-11 pl-11 pr-10 rounded-2xl bg-white/[0.06] border border-white/10 outline-none text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* LINE FILTERS */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <button
            type="button"
            onClick={() => setSelectedLine('all')}
            className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-bold border transition ${
              selectedLine === 'all'
                ? 'bg-white text-black border-white'
                : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
            }`}
          >
            All 5 Lines
          </button>

          {METRO_LINES.map((line) => (
            <button
              key={line.id}
              type="button"
              onClick={() => setSelectedLine(line.id)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-bold border transition flex items-center gap-2 ${
                selectedLine === line.id
                  ? 'text-white border-white/30'
                  : 'bg-white/[0.04] text-slate-300 border-white/10'
              }`}
              style={
                selectedLine === line.id
                  ? {
                      backgroundColor: line.color,
                    }
                  : undefined
              }
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: line.color }}
              />
              {line.name}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-5">

          {/* MAP */}
          <div className="rounded-3xl border border-white/10 bg-[#0d121f] shadow-2xl overflow-hidden">

            {/* MAP HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.025]">
              <div>
                <div className="text-sm font-bold">
                  Kolkata Metro Network
                </div>

                <div className="text-[11px] text-slate-500 mt-1">
                  Click any station to view Puja connections
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                Puja Hotspot

                <span className="w-2.5 h-2.5 rounded-full bg-white ml-2" />
                Station
              </div>
            </div>

            {/* SVG MAP */}
            <div className="overflow-auto">
              <div className="min-w-[900px] p-4 sm:p-7">

                <svg
                  viewBox="0 0 900 610"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Kolkata Metro schematic map"
                >
                  {/* MAP BACKGROUND */}
                  <rect
                    x="0"
                    y="0"
                    width="900"
                    height="610"
                    rx="24"
                    fill="#0a0f1a"
                  />

                  {/* GRID */}
                  <g opacity="0.08">
                    {Array.from({ length: 18 }).map(
                      (_, index) => (
                        <line
                          key={`v-${index}`}
                          x1={index * 50}
                          y1="0"
                          x2={index * 50}
                          y2="610"
                          stroke="#ffffff"
                        />
                      )
                    )}

                    {Array.from({ length: 13 }).map(
                      (_, index) => (
                        <line
                          key={`h-${index}`}
                          x1="0"
                          y1={index * 50}
                          x2="900"
                          y2={index * 50}
                          stroke="#ffffff"
                        />
                      )
                    )}
                  </g>

                  {/* RIVER */}
                  <path
                    d="M 20 220 C 160 180, 250 260, 370 210 C 500 155, 620 230, 880 160"
                    fill="none"
                    stroke="#172b47"
                    strokeWidth="55"
                    opacity="0.65"
                  />

                  <text
                    x="55"
                    y="205"
                    fill="#315274"
                    fontSize="11"
                    letterSpacing="3"
                  >
                    HOOGHLY RIVER
                  </text>

                  {/* LINE PATHS */}
                  {linePaths.map((line) => {
                    if (!line.points) {
                      return null;
                    }

                    const visible =
                      selectedLine === 'all' ||
                      selectedLine === line.id;

                    return (
                      <polyline
                        key={line.id}
                        points={line.points}
                        fill="none"
                        stroke={line.color}
                        strokeWidth={visible ? 9 : 5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={visible ? 1 : 0.16}
                      />
                    );
                  })}

                  {/* STATIONS */}
                  {ALL_STATIONS.map((station) => {
                    const position =
                      stationCoordinates[station.id];

                    if (!position) {
                      return null;
                    }

                    const visible =
                      selectedLine === 'all' ||
                      selectedLine === station.lineId;

                    const selected =
                      selectedStationId === station.id;

                    const color =
                      lineColors[station.lineId] ||
                      '#ffffff';

                    return (
                      <g
                        key={station.id}
                        onClick={() =>
                          handleStationSelect(station)
                        }
                        className="cursor-pointer"
                        opacity={visible ? 1 : 0.12}
                      >
                        {/* HOTSPOT */}
                        {station.hasHotspot && (
                          <circle
                            cx={position.x}
                            cy={position.y}
                            r="13"
                            fill="#ef4444"
                            opacity="0.18"
                          />
                        )}

                        {/* STATION */}
                        <circle
                          cx={position.x}
                          cy={position.y}
                          r={selected ? 10 : 7}
                          fill="#0a0f1a"
                          stroke={
                            selected
                              ? '#ffffff'
                              : color
                          }
                          strokeWidth={
                            selected ? 4 : 3
                          }
                        />

                        {station.hasHotspot && (
                          <circle
                            cx={position.x}
                            cy={position.y}
                            r="3"
                            fill="#ef4444"
                          />
                        )}

                        {/* LABEL */}
                        <text
                          x={position.x + 14}
                          y={position.y + 4}
                          fill={
                            selected
                              ? '#ffffff'
                              : '#94a3b8'
                          }
                          fontSize="11"
                          fontWeight={
                            selected ? '700' : '500'
                          }
                        >
                          {station.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* MAP TITLE */}
                  <text
                    x="35"
                    y="50"
                    fill="#ffffff"
                    fontSize="19"
                    fontWeight="800"
                  >
                    KOLKATA METRO
                  </text>

                  <text
                    x="35"
                    y="70"
                    fill="#64748b"
                    fontSize="10"
                  >
                    PUJA SPECIAL NETWORK
                  </text>
                </svg>
              </div>
            </div>

            {/* LEGEND */}
            <div className="px-5 py-4 border-t border-white/10 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-slate-400">
              {METRO_LINES.map((line) => (
                <div
                  key={line.id}
                  className="flex items-center gap-2"
                >
                  <span
                    className="w-6 h-1.5 rounded-full"
                    style={{
                      backgroundColor: line.color,
                    }}
                  />
                  {line.name}
                </div>
              ))}

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                Puja hotspot
              </div>
            </div>
          </div>

          {/* STATION PANEL */}
          <aside className="rounded-3xl border border-white/10 bg-[#0d121f] shadow-2xl overflow-hidden h-fit xl:sticky xl:top-24">

            <div className="px-5 py-5 border-b border-white/10">
              <div className="flex items-center gap-2 text-amber-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                <Navigation size={13} />
                Selected Station
              </div>

              <h2 className="mt-2 text-2xl font-black text-white">
                {selectedStation?.name ||
                  'Select a station'}
              </h2>

              {selectedStation?.bengali && (
                <div className="text-sm text-slate-500 mt-1">
                  {selectedStation.bengali}
                </div>
              )}
            </div>

            {/* LINE INFO */}
            {selectedStation && (
              <div className="p-5">

                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        lineColors[
                          selectedStation.lineId
                        ] || '#ffffff',
                    }}
                  />

                  <span className="text-sm font-bold">
                    {selectedStation.line} Line
                  </span>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-3 mb-5">

                  <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                    <div className="text-2xl font-black text-white">
                      {selectedStation.pandalsCount ||
                        0}
                    </div>

                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">
                      Nearby Pandals
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                    <div className="text-sm font-black text-white">
                      {selectedStation.walkTime ||
                        'Nearby'}
                    </div>

                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">
                      Walking
                    </div>
                  </div>
                </div>

                {/* HOTSPOT */}
                {selectedStation.hasHotspot && (
                  <div className="flex items-center gap-3 rounded-2xl bg-red-500/10 border border-red-500/20 px-4 py-3 mb-5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />

                    <div>
                      <div className="text-xs font-bold text-red-300">
                        Puja Hotspot
                      </div>

                      <div className="text-[10px] text-red-200/60 mt-0.5">
                        High-interest Durga Puja area
                      </div>
                    </div>
                  </div>
                )}

                {/* PANDALS */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Nearby Pandals
                    </span>

                    <span className="text-[10px] text-slate-600">
                      {selectedPandals.length}
                    </span>
                  </div>

                  {selectedPandals.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPandals.map(
                        (pandalName) => (
                          <button
                            key={pandalName}
                            type="button"
                            onClick={() =>
                              handlePandalClick(
                                pandalName
                              )
                            }
                            className="w-full flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.08] px-3.5 py-3 text-left transition group"
                          >
                            <div className="flex items-start gap-3">
                              <MapPin
                                size={15}
                                className="text-rose-400 mt-0.5 shrink-0"
                              />

                              <span className="text-xs text-slate-200 leading-relaxed">
                                {pandalName}
                              </span>
                            </div>

                            <ChevronRight
                              size={15}
                              className="text-slate-600 group-hover:text-white shrink-0"
                            />
                          </button>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-white/10 p-4 text-xs text-slate-500 text-center">
                      No mapped pandal for this station yet.
                    </div>
                  )}
                </div>

                {/* LINE DETAILS */}
                {getLine(selectedStation.lineId) && (
                  <div className="mt-5 pt-5 border-t border-white/10">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                      Route
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed">
                      {getLine(selectedStation.lineId)
                        ?.route}
                    </div>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>

        {/* SEARCH RESULTS */}
        {search && (
          <div className="mt-5 rounded-3xl border border-white/10 bg-[#0d121f] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-bold">
                  Search Results
                </div>

                <div className="text-[11px] text-slate-500 mt-1">
                  {filteredStations.length} station
                  {filteredStations.length !== 1
                    ? 's'
                    : ''}{' '}
                  found
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSearch('')}
                className="text-xs text-slate-500 hover:text-white"
              >
                Clear
              </button>
            </div>

            {filteredStations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredStations.map((station) => {
                  const color =
                    lineColors[station.lineId] ||
                    '#ffffff';

                  return (
                    <button
                      key={station.id}
                      type="button"
                      onClick={() =>
                        handleStationSelect(station)
                      }
                      className="text-left rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] p-4 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{
                            backgroundColor: color,
                          }}
                        />

                        <div>
                          <div className="text-sm font-bold text-white">
                            {station.name}
                          </div>

                          <div className="text-[10px] text-slate-500 mt-1">
                            {station.line} Line
                          </div>
                        </div>

                        <ArrowRight
                          size={15}
                          className="ml-auto text-slate-600"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-center text-sm text-slate-500">
                No metro station found.
              </div>
            )}
          </div>
        )}

        {/* BOTTOM INFO */}
        <div className="mt-5 rounded-3xl border border-amber-500/10 bg-gradient-to-r from-amber-500/[0.06] to-rose-500/[0.04] p-5">
          <div className="flex items-start gap-3">
            <Sparkles
              size={18}
              className="text-amber-400 mt-0.5 shrink-0"
            />

            <div>
              <div className="text-sm font-bold text-white">
                Puja Metro Guide
              </div>

              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Select a metro station on the map to see
                nearby Durga Puja pandals. Use the line
                filters above to focus on a specific metro
                corridor.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}