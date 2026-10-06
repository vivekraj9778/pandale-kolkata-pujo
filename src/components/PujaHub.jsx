import React, { useMemo, useState } from 'react';
import {
  Bot,
  Sparkles,
  Users,
  Train,
  Camera,
  Heart,
  Utensils,
  Moon,
  MapPin,
  ArrowRight,
  Search,
  Star,
  Navigation,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function PujaHub({
  pandals = [],
  favorites = [],
  onToggleFavorite,
  onSelectPandal,
}) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const getName = (pandal) =>
    pandal?.name || pandal?.title || 'Unknown Pandal';

  const getLocation = (pandal) =>
    pandal?.location ||
    pandal?.area ||
    pandal?.address ||
    'Kolkata';

  const getCrowd = (pandal) => {
    const value =
      pandal?.crowdLevel ||
      pandal?.crowd ||
      pandal?.crowdStatus ||
      '';

    return String(value).toLowerCase();
  };

  const getMetro = (pandal) =>
    pandal?.metroStation ||
    pandal?.nearestMetro ||
    pandal?.metro ||
    'Metro nearby';

  const getTheme = (pandal) =>
    pandal?.theme ||
    pandal?.category ||
    'Traditional Puja';

  const crowdScore = (pandal) => {
    const crowd = getCrowd(pandal);

    if (
      crowd.includes('low') ||
      crowd.includes('light') ||
      crowd.includes('less')
    ) {
      return 25;
    }

    if (
      crowd.includes('medium') ||
      crowd.includes('moderate')
    ) {
      return 55;
    }

    if (
      crowd.includes('high') ||
      crowd.includes('heavy')
    ) {
      return 85;
    }

    return 50;
  };

  const crowdLabel = (pandal) => {
    const score = crowdScore(pandal);

    if (score <= 30) return 'Low Crowd';
    if (score <= 60) return 'Moderate';
    return 'High Crowd';
  };

  const sortedByCrowd = useMemo(() => {
    return [...pandals]
      .sort((a, b) => crowdScore(a) - crowdScore(b))
      .slice(0, 6);
  }, [pandals]);

  const metroPicks = useMemo(() => {
    return pandals
      .filter((pandal) => {
        const metro = String(getMetro(pandal)).toLowerCase();

        return (
          metro &&
          metro !== 'metro nearby' &&
          metro !== 'n/a' &&
          metro !== 'none'
        );
      })
      .slice(0, 6);
  }, [pandals]);

  const tonightPicks = useMemo(() => {
    return [...pandals]
      .sort((a, b) => crowdScore(a) - crowdScore(b))
      .slice(0, 4);
  }, [pandals]);

  const photographyPicks = useMemo(() => {
    return pandals.slice(0, 6);
  }, [pandals]);

  const familyPicks = useMemo(() => {
    return pandals.slice(0, 6);
  }, [pandals]);

  const askAI = () => {
    const q = question.toLowerCase().trim();

    if (!q) {
      setAnswer(
        'Ask me something like “Which pandals are less crowded?”, “Best pandals for family?” or “Which pandals are metro friendly?”'
      );
      return;
    }

    if (
      q.includes('less crowded') ||
      q.includes('less crowd') ||
      q.includes('peaceful')
    ) {
      const names = sortedByCrowd
        .slice(0, 4)
        .map(getName)
        .join(', ');

      setAnswer(
        `For a less-crowded Puja experience, start with ${names}. These are currently among the lower-crowd options in your Pandalé dataset.`
      );
      return;
    }

    if (
      q.includes('metro') ||
      q.includes('train')
    ) {
      const names = metroPicks
        .slice(0, 4)
        .map(
          (p) => `${getName(p)} (${getMetro(p)})`
        )
        .join(', ');

      setAnswer(
        `Metro-friendly picks: ${names || 'Metro-connected pandals are available in the Metro section.'}`
      );
      return;
    }

    if (
      q.includes('family') ||
      q.includes('children') ||
      q.includes('kids')
    ) {
      const names = familyPicks
        .slice(0, 4)
        .map(getName)
        .join(', ');

      setAnswer(
        `For a family outing, consider ${names}. These are good starting points for planning a comfortable Puja route.`
      );
      return;
    }

    if (
      q.includes('photo') ||
      q.includes('photography') ||
      q.includes('instagram')
    ) {
      const names = photographyPicks
        .slice(0, 4)
        .map(getName)
        .join(', ');

      setAnswer(
        `Photography picks from your dataset: ${names}. Try visiting during evening blue hour for better lighting.`
      );
      return;
    }

    if (
      q.includes('food') ||
      q.includes('eat') ||
      q.includes('restaurant')
    ) {
      setAnswer(
        'Use Food Finder on any selected pandal to discover restaurants, cafes and street-food options around that location.'
      );
      setActiveTab('food');
      return;
    }

    if (
      q.includes('best') ||
      q.includes('top') ||
      q.includes('recommend')
    ) {
      const names = pandals
        .slice(0, 5)
        .map(getName)
        .join(', ');

      setAnswer(
        `My current Pandalé picks are: ${names}. Open any card to see its details and add it to your Puja plan.`
      );
      return;
    }

    setAnswer(
      `I can help you find less-crowded pandals, metro-friendly routes, family picks, photography spots and food around pandals. Try one of those questions.`
    );
  };

  const quickQuestion = (text) => {
    setQuestion(text);
    setTimeout(() => {
      const q = text.toLowerCase();

      if (q.includes('crowded')) {
        const names = sortedByCrowd
          .slice(0, 4)
          .map(getName)
          .join(', ');

        setAnswer(
          `Less-crowded picks: ${names}.`
        );
      }

      if (q.includes('metro')) {
        const names = metroPicks
          .slice(0, 4)
          .map((p) => `${getName(p)} — ${getMetro(p)}`)
          .join(', ');

        setAnswer(
          `Metro-friendly picks: ${names}.`
        );
      }

      if (q.includes('family')) {
        setAnswer(
          `Family picks: ${familyPicks
            .slice(0, 4)
            .map(getName)
            .join(', ')}.`
        );
      }

      if (q.includes('food')) {
        setAnswer(
          'Select a pandal and use Food Finder to explore nearby restaurants, cafes and street food.'
        );
      }

      if (q.includes('best')) {
        setAnswer(
          `Top picks: ${pandals
            .slice(0, 5)
            .map(getName)
            .join(', ')}.`
        );
      }
    }, 50);
  };

  const openMaps = (pandal) => {
    const query = encodeURIComponent(
      `${getName(pandal)}, ${getLocation(pandal)}, Kolkata`
    );

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">

        {/* MAIN AI PANEL */}
        <div className="rounded-[28px] border border-white/10 bg-[#101623] shadow-2xl shadow-black/30 overflow-hidden">

          {/* HEADER */}
          <div className="p-6 sm:p-8 border-b border-white/[0.07]">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-950/30">
                  <Bot className="w-7 h-7 text-white" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      Pandalé AI
                    </h2>

                    <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
                      SMART GUIDE
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 mt-1">
                    Your personal Puja planning assistant
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Sparkles className="w-4 h-4 text-orange-400" />
                Powered by your Pandalé dataset
              </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-7">

              <Stat
                icon={<MapPin />}
                value={`${pandals.length}+`}
                label="Pandals"
              />

              <Stat
                icon={<Train />}
                value="5"
                label="Metro Lines"
              />

              <Stat
                icon={<Users />}
                value="Live"
                label="Crowd Guide"
              />

              <Stat
                icon={<Zap />}
                value="24/7"
                label="Puja Assistant"
              />

            </div>

          </div>

          {/* TABS */}
          <div className="px-6 sm:px-8 pt-5 overflow-x-auto">
            <div className="flex gap-2 min-w-max">

              {[
                ['overview', 'Overview'],
                ['ai', 'Ask AI'],
                ['crowd', 'Crowd'],
                ['metro', 'Metro'],
                ['family', 'Family'],
                ['photo', 'Photography'],
                ['food', 'Food'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition ${
                    activeTab === id
                      ? 'bg-rose-600 border-rose-500 text-white'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {label}
                </button>
              ))}

            </div>
          </div>

          {/* CONTENT */}
          <div className="p-6 sm:p-8">

            {activeTab === 'overview' && (
              <Overview
                tonightPicks={tonightPicks}
                metroPicks={metroPicks}
                familyPicks={familyPicks}
                onSelectPandal={onSelectPandal}
                openMaps={openMaps}
                crowdLabel={crowdLabel}
                getMetro={getMetro}
                getName={getName}
                getLocation={getLocation}
              />
            )}

            {activeTab === 'ai' && (
              <AIBox
                question={question}
                setQuestion={setQuestion}
                answer={answer}
                askAI={askAI}
                quickQuestion={quickQuestion}
              />
            )}

            {activeTab === 'crowd' && (
              <PandalGrid
                title="Lower Crowd Picks"
                subtitle="Good options when you want a more relaxed Puja experience."
                pandals={sortedByCrowd}
                onSelectPandal={onSelectPandal}
                crowdLabel={crowdLabel}
                getName={getName}
                getLocation={getLocation}
              />
            )}

            {activeTab === 'metro' && (
              <PandalGrid
                title="Metro Friendly Pandals"
                subtitle="Plan your Puja route around Kolkata Metro stations."
                pandals={metroPicks}
                onSelectPandal={onSelectPandal}
                crowdLabel={crowdLabel}
                getName={getName}
                getLocation={getLocation}
                getMetro={getMetro}
              />
            )}

            {activeTab === 'family' && (
              <PandalGrid
                title="Family Friendly Picks"
                subtitle="Easy choices for a comfortable family outing."
                pandals={familyPicks}
                onSelectPandal={onSelectPandal}
                crowdLabel={crowdLabel}
                getName={getName}
                getLocation={getLocation}
              />
            )}

            {activeTab === 'photo' && (
              <PandalGrid
                title="Photography Picks"
                subtitle="Pandals worth adding to your evening photography route."
                pandals={photographyPicks}
                onSelectPandal={onSelectPandal}
                crowdLabel={crowdLabel}
                getName={getName}
                getLocation={getLocation}
              />
            )}

            {activeTab === 'food' && (
              <FoodFinder
                pandals={pandals}
                getName={getName}
                getLocation={getLocation}
                openMaps={openMaps}
              />
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STAT ---------------- */

function Stat({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1019] p-4">

      <div className="flex items-center gap-3">

        <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center text-rose-400">
          {React.cloneElement(icon, {
            className: 'w-4 h-4',
          })}
        </div>

        <div>
          <div className="text-lg font-bold text-white">
            {value}
          </div>

          <div className="text-[11px] text-slate-500">
            {label}
          </div>
        </div>

      </div>

    </div>
  );
}

/* ---------------- OVERVIEW ---------------- */

function Overview({
  tonightPicks,
  metroPicks,
  familyPicks,
  onSelectPandal,
  openMaps,
  crowdLabel,
  getMetro,
  getName,
  getLocation,
}) {
  return (
    <div className="space-y-8">

      <div>
        <div className="flex items-center justify-between mb-4">

          <div>
            <h3 className="text-xl font-bold text-white">
              Pujo Tonight
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Smart picks for your evening route
            </p>
          </div>

          <Moon className="w-5 h-5 text-orange-400" />

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {tonightPicks.map((pandal) => (
            <MiniCard
              key={pandal.id || getName(pandal)}
              pandal={pandal}
              onSelectPandal={onSelectPandal}
              openMaps={openMaps}
              crowdLabel={crowdLabel}
              getName={getName}
              getLocation={getLocation}
            />
          ))}

        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">

        <InsightCard
          icon={<Train />}
          title="Metro Friendly"
          subtitle={`${metroPicks.length} pandals have metro information`}
          items={metroPicks.slice(0, 4)}
          getName={getName}
          getMetro={getMetro}
          onSelectPandal={onSelectPandal}
        />

        <InsightCard
          icon={<Heart />}
          title="Family Picks"
          subtitle="Comfortable options for group outings"
          items={familyPicks.slice(0, 4)}
          getName={getName}
          onSelectPandal={onSelectPandal}
        />

      </div>

    </div>
  );
}

/* ---------------- AI ---------------- */

function AIBox({
  question,
  setQuestion,
  answer,
  askAI,
  quickQuestion,
}) {
  return (
    <div className="max-w-4xl">

      <div className="mb-6">

        <h3 className="text-xl font-bold text-white">
          Ask Pandalé AI
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Get quick recommendations from your Puja dataset.
        </p>

      </div>

      <div className="flex flex-col sm:flex-row gap-3">

        <div className="flex-1 relative">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') askAI();
            }}
            placeholder="Ask about pandals, crowd, metro, family, food..."
            className="w-full bg-[#090d15] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white outline-none focus:border-rose-500/50"
          />

        </div>

        <button
          onClick={askAI}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold text-sm hover:opacity-90 transition"
        >
          Ask AI
        </button>

      </div>

      <div className="flex flex-wrap gap-2 mt-4">

        {[
          'Best pandals?',
          'Less crowded?',
          'Metro friendly?',
          'Family friendly?',
          'Photography spots?',
          'What about food?',
        ].map((text) => (
          <button
            key={text}
            onClick={() => quickQuestion(text)}
            className="px-3 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-400 hover:text-white hover:bg-white/[0.07] transition"
          >
            {text}
          </button>
        ))}

      </div>

      {answer && (
        <div className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-500/[0.05] p-5">

          <div className="flex gap-3">

            <div className="w-9 h-9 rounded-xl bg-rose-500/15 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-rose-400" />
            </div>

            <div>
              <p className="text-xs font-bold text-rose-400 mb-1">
                Pandalé AI
              </p>

              <p className="text-sm leading-6 text-slate-300">
                {answer}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* ---------------- GRID ---------------- */

function PandalGrid({
  title,
  subtitle,
  pandals,
  onSelectPandal,
  crowdLabel,
  getName,
  getLocation,
  getMetro,
}) {
  return (
    <div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>

        <p className="text-xs text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>

      {pandals.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0b1019] p-10 text-center text-sm text-slate-500">
          No matching pandals found in the current dataset.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {pandals.map((pandal) => (
            <MiniCard
              key={pandal.id || getName(pandal)}
              pandal={pandal}
              onSelectPandal={onSelectPandal}
              crowdLabel={crowdLabel}
              getName={getName}
              getLocation={getLocation}
              getMetro={getMetro}
            />
          ))}

        </div>
      )}

    </div>
  );
}

/* ---------------- MINI CARD ---------------- */

function MiniCard({
  pandal,
  onSelectPandal,
  openMaps,
  crowdLabel,
  getName,
  getLocation,
  getMetro,
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#0b1019] overflow-hidden hover:border-rose-500/30 transition">

      {pandal.image && (
        <div className="h-32 overflow-hidden">

          <img
            src={pandal.image}
            alt={getName(pandal)}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

        </div>
      )}

      <div className="p-4">

        <div className="flex items-start justify-between gap-3">

          <div>
            <h4 className="font-bold text-sm text-white">
              {getName(pandal)}
            </h4>

            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {getLocation(pandal)}
            </p>
          </div>

          <Star className="w-4 h-4 text-orange-400 flex-shrink-0" />

        </div>

        <div className="flex flex-wrap gap-2 mt-3">

          <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
            {crowdLabel(pandal)}
          </span>

          {getMetro && (
            <span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold">
              {getMetro(pandal)}
            </span>
          )}

        </div>

        <button
          onClick={() => onSelectPandal?.(pandal)}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-white/[0.05] hover:bg-rose-600 text-slate-300 hover:text-white py-2.5 text-xs font-bold transition"
        >
          Explore Pandal
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {openMaps && (
          <button
            onClick={() => openMaps(pandal)}
            className="mt-2 w-full flex items-center justify-center gap-2 text-[11px] text-slate-500 hover:text-white"
          >
            <Navigation className="w-3 h-3" />
            Navigate
          </button>
        )}

      </div>

    </div>
  );
}

/* ---------------- INSIGHT CARD ---------------- */

function InsightCard({
  icon,
  title,
  subtitle,
  items,
  getName,
  getMetro,
  onSelectPandal,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1019] p-5">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
          {React.cloneElement(icon, {
            className: 'w-5 h-5',
          })}
        </div>

        <div>
          <h4 className="font-bold text-white">
            {title}
          </h4>

          <p className="text-[11px] text-slate-500">
            {subtitle}
          </p>
        </div>

      </div>

      <div className="mt-5 space-y-2">

        {items.map((pandal) => (
          <button
            key={pandal.id || getName(pandal)}
            onClick={() => onSelectPandal?.(pandal)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.025] hover:bg-white/[0.06] transition text-left"
          >

            <span className="text-xs font-semibold text-slate-300">
              {getName(pandal)}
            </span>

            <span className="text-[10px] text-slate-500">
              {getMetro ? getMetro(pandal) : 'Explore'}
            </span>

          </button>
        ))}

      </div>

    </div>
  );
}

/* ---------------- FOOD ---------------- */

function FoodFinder({
  pandals,
  getName,
  getLocation,
  openMaps,
}) {
  return (
    <div>

      <div className="flex items-center gap-3 mb-6">

        <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">
          <Utensils className="w-5 h-5 text-orange-400" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">
            Puja Food Finder
          </h3>

          <p className="text-xs text-slate-500">
            Find food around your selected pandal.
          </p>
        </div>

      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {pandals.slice(0, 6).map((pandal) => (
          <div
            key={pandal.id || getName(pandal)}
            className="rounded-2xl border border-white/10 bg-[#0b1019] p-4"
          >

            <h4 className="text-sm font-bold text-white">
              {getName(pandal)}
            </h4>

            <p className="text-xs text-slate-500 mt-1">
              {getLocation(pandal)}
            </p>

            <button
              onClick={() => openMaps(pandal)}
              className="mt-4 w-full py-2.5 rounded-xl bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white text-xs font-bold transition"
            >
              Find Food Nearby
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}