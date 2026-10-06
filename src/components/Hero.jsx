import React, { useState } from 'react';
import {
  Search,
  Compass,
  Train,
  Route,
  MapPin,
  Sparkles,
  ArrowDown,
  Flame
} from 'lucide-react';

export default function Hero({
  onExplorePandals,
  onExploreMetro,
  onExplorePlanner,
  language
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      onExplorePandals(searchQuery.trim());
    } else {
      onExplorePandals('');
    }
  };

  const popularPandals = [
    'Maddox Square',
    'Sree Bhumi',
    'Tala Prattay',
    'College Square',
    'Deshopriyo Park'
  ];

  return (
    <section
      className="
        relative
        min-h-[92vh]
        flex
        flex-col
        items-center
        justify-between
        overflow-hidden

        bg-[#0d080a]

        text-center

        px-4
        pt-28
        sm:pt-32
        pb-8
      "
    >

      {/* ======================================================
          HERO BACKGROUND IMAGE
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          pointer-events-none

          opacity-[0.48]

          scale-105

          transition-transform
          duration-[2000ms]
        "
        style={{
          backgroundImage:
            "url('/assets/durga_hero_bg.jpg')",
          filter:
            'contrast(1.12) brightness(0.72) saturate(1.15)'
        }}
      />


      {/* ======================================================
          DARK OVERLAY
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none

          bg-gradient-to-b
          from-[#090506]/80
          via-[#0d080a]/35
          to-[#0d080a]
        "
      />


      {/* ======================================================
          RED / GOLD ATMOSPHERIC GLOW
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
        "
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(220,38,38,0.20) 0%, rgba(245,158,11,0.07) 32%, rgba(13,8,10,0.92) 78%)'
        }}
      />


      {/* ======================================================
          DECORATIVE TOP GLOW
      ====================================================== */}

      <div
        className="
          absolute
          top-[-160px]
          left-1/2
          -translate-x-1/2

          w-[520px]
          h-[300px]

          rounded-full
          bg-red-700/10

          blur-[100px]

          pointer-events-none
        "
      />


      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10

          w-full
          max-w-5xl

          mx-auto

          flex
          flex-col
          items-center

          my-auto
        "
      >

        {/* ====================================================
            SACRED EMBLEM
        ==================================================== */}

        <div
          className="
            mb-5

            group

            cursor-default

            transition-transform
            duration-500

            hover:scale-105
          "
        >
          <div
            className="
              relative

              w-[68px]
              h-[68px]

              sm:w-[78px]
              sm:h-[78px]

              rounded-[24px]

              p-[1.5px]

              bg-gradient-to-br
              from-amber-300
              via-red-500
              to-rose-800

              shadow-glow-red
            "
          >
            <div
              className="
                w-full
                h-full

                rounded-[23px]

                bg-[#13090b]

                border
                border-white/[0.06]

                flex
                items-center
                justify-center
              "
            >
              <span
                className="
                  text-3xl
                  sm:text-4xl

                  drop-shadow-[0_0_15px_rgba(245,158,11,0.35)]
                "
                role="img"
                aria-label="Sacred Trishul"
              >
                🔱
              </span>
            </div>
          </div>
        </div>


        {/* ====================================================
            BRAND
        ==================================================== */}

        <h1
          className="
            font-serif

            text-[52px]
            sm:text-7xl
            md:text-8xl

            leading-[0.95]

            font-black

            tracking-[-0.04em]

            text-white

            drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]

            select-none
          "
        >
          Pandal
          <span
            className="
              italic
              font-normal
              text-amber-400

              drop-shadow-[0_0_20px_rgba(245,158,11,0.25)]
            "
          >
            é
          </span>
        </h1>


        {/* ====================================================
            DECORATIVE TITLE LINE
        ==================================================== */}

        <div
          className="
            flex
            items-center

            gap-3

            w-full
            max-w-2xl

            justify-center

            mt-5
          "
        >
          <div
            className="
              h-px
              flex-1

              bg-gradient-to-r
              from-transparent
              via-red-500/30
              to-amber-400/80
            "
          />

          <div
            className="
              flex
              items-center
              gap-2

              text-[9px]
              sm:text-[11px]

              uppercase

              tracking-[0.25em]

              font-semibold

              text-amber-200/90

              whitespace-nowrap
            "
          >
            <Sparkles
              size={11}
              className="text-amber-400"
            />

            <span>
              {language === 'bn'
                ? 'কলকাতা দুর্গাপূজা ও মেট্রো নির্দেশিকা'
                : 'KOLKATA DURGA PUJA & METRO GUIDE'}
            </span>

            <Sparkles
              size={11}
              className="text-amber-400"
            />
          </div>

          <div
            className="
              h-px
              flex-1

              bg-gradient-to-l
              from-transparent
              via-red-500/30
              to-amber-400/80
            "
          />
        </div>


        {/* ====================================================
            ORNAMENT
        ==================================================== */}

        <div
          className="
            flex
            items-center
            gap-2

            mt-4

            text-amber-400/80

            text-xs
          "
        >
          <span>✦</span>
          <span className="text-red-400">✤</span>
          <span>✦</span>
        </div>


        {/* ====================================================
            DESCRIPTION
        ==================================================== */}

        <p
          className="
            mt-4

            max-w-2xl

            px-3

            text-sm
            sm:text-base

            leading-7

            text-stone-200/90

            drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]
          "
        >
          {language === 'bn'
            ? 'যানজট এড়িয়ে মেট্রোর গতিতে ঘুরে দেখুন কলকাতার বিখ্যাত সব পুজো প্যান্ডেল, লাইভ ভিড় ও হাঁটার সঠিক দূরত্ব।'
            : 'Skip the traffic gridlock. Discover Kolkata’s grandest pandals with metro walking distances, crowd levels and smart festive routes.'}
        </p>


        {/* ====================================================
            SEARCH
        ==================================================== */}

        <form
          onSubmit={handleSearchSubmit}
          className="
            w-full
            max-w-2xl

            mt-8

            relative
            group
          "
        >
          <div
            className="
              relative

              flex
              items-center

              p-1.5

              rounded-full

              bg-[#140b0d]/90

              backdrop-blur-2xl

              border
              border-white/[0.12]

              shadow-[0_20px_60px_rgba(0,0,0,0.5)]

              transition-all
              duration-300

              group-focus-within:border-amber-400/60

              group-focus-within:shadow-[0_0_35px_rgba(245,158,11,0.10)]
            "
          >

            {/* Search icon */}

            <div
              className="
                pl-4
                text-amber-400
                shrink-0
              "
            >
              <Search size={19} />
            </div>


            {/* Input */}

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder={
                language === 'bn'
                  ? 'প্যান্ডেল বা মেট্রো স্টেশন খুঁজুন...'
                  : 'Search pandal or metro station...'
              }
              className="
                w-full

                bg-transparent

                px-3
                py-3

                text-sm
                sm:text-base

                text-white

                placeholder:text-stone-500

                focus:outline-none
              "
            />


            {/* Search Button */}

            <button
              type="submit"
              className="
                shrink-0

                flex
                items-center
                gap-2

                px-5
                sm:px-7

                py-3

                rounded-full

                bg-gradient-to-r
                from-red-600
                to-amber-600

                hover:from-red-500
                hover:to-amber-500

                text-white

                text-xs
                sm:text-sm

                font-bold

                shadow-lg
                shadow-red-950/50

                transition-all
                duration-200

                hover:-translate-y-0.5
              "
            >
              <span>
                {language === 'bn'
                  ? 'খুঁজুন'
                  : 'Search'}
              </span>
            </button>

          </div>
        </form>


        {/* ====================================================
            QUICK ACTIONS
        ==================================================== */}

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center

            gap-2.5

            mt-6

            max-w-3xl
          "
        >

          {/* Explore Pandals */}

          <button
            onClick={() =>
              onExplorePandals('')
            }
            className="
              group

              flex
              items-center
              gap-2

              px-5
              py-2.5

              rounded-full

              bg-gradient-to-r
              from-red-600
              via-red-700
              to-amber-600

              hover:from-red-500
              hover:to-amber-500

              text-white

              text-xs
              font-bold

              border
              border-red-400/30

              shadow-lg
              shadow-red-950/50

              hover:-translate-y-0.5

              transition-all
            "
          >
            <Compass
              size={15}
              className="
                text-amber-200
                group-hover:rotate-12
                transition-transform
              "
            />

            <span>
              {language === 'bn'
                ? 'প্যান্ডেল তালিকা দেখুন'
                : 'Explore All Pandals'}
            </span>
          </button>


          {/* Metro */}

          <button
            onClick={onExploreMetro}
            className="
              group

              flex
              items-center
              gap-2

              px-5
              py-2.5

              rounded-full

              bg-white/[0.06]
              hover:bg-white/[0.10]

              backdrop-blur-md

              text-slate-200

              text-xs
              font-bold

              border
              border-white/[0.12]

              hover:border-blue-400/40

              shadow-lg

              hover:-translate-y-0.5

              transition-all
            "
          >
            <Train
              size={15}
              className="
                text-blue-400
              "
            />

            <span>
              {language === 'bn'
                ? 'মেট্রো রুট ও স্টেশন'
                : 'Explore by Metro'}
            </span>
          </button>


          {/* Planner */}

          <button
            onClick={onExplorePlanner}
            className="
              group

              flex
              items-center
              gap-2

              px-5
              py-2.5

              rounded-full

              bg-amber-500/[0.07]
              hover:bg-amber-500/[0.13]

              backdrop-blur-md

              text-amber-200

              text-xs
              font-bold

              border
              border-amber-500/25

              hover:border-amber-400/50

              shadow-lg

              hover:-translate-y-0.5

              transition-all
            "
          >
            <Route
              size={15}
              className="
                text-amber-400
              "
            />

            <span>
              {language === 'bn'
                ? 'পরিক্রমা রুট তৈরি করুন'
                : 'Smart Route Planner'}
            </span>
          </button>

        </div>


        {/* ====================================================
            POPULAR PANDALS
        ==================================================== */}

        <div
          className="
            flex
            flex-wrap

            items-center
            justify-center

            gap-2

            mt-5

            text-[11px]
          "
        >
          <div
            className="
              flex
              items-center
              gap-1.5

              text-stone-500

              mr-1
            "
          >
            <Flame
              size={12}
              className="text-rose-400"
            />

            <span>
              {language === 'bn'
                ? 'জনপ্রিয়'
                : 'Popular'}
            </span>
          </div>


          {popularPandals.map((name) => (
            <button
              key={name}
              onClick={() =>
                onExplorePandals(name)
              }
              className="
                px-3
                py-1

                rounded-full

                bg-black/35

                border
                border-white/[0.08]

                text-stone-400

                hover:text-amber-300
                hover:border-amber-400/30
                hover:bg-amber-500/[0.06]

                transition-all
              "
            >
              {name}
            </button>
          ))}

        </div>

      </div>


      {/* ======================================================
          BOTTOM INFORMATION BAR
      ====================================================== */}

      <div
        className="
          relative
          z-10

          w-full
          max-w-7xl

          flex
          items-center
          justify-between

          pt-5
          mt-8

          border-t
          border-white/[0.08]

          text-xs
        "
      >

        {/* Location / Festival */}

        <div
          className="
            flex
            items-center
            gap-2

            bg-black/45

            border
            border-white/[0.08]

            backdrop-blur-md

            rounded-full

            px-3.5
            py-1.5

            text-stone-300
          "
        >
          <span
            className="
              w-1.5
              h-1.5

              rounded-full

              bg-rose-500

              shadow-[0_0_8px_rgba(244,63,94,0.7)]

              animate-pulse
            "
          />

          <MapPin
            size={11}
            className="text-amber-400"
          />

          <span
            className="
              font-semibold
              text-[10px]
              sm:text-[11px]
            "
          >
            Durga Puja 2026 • Kolkata
          </span>
        </div>


        {/* Scroll indicator */}

        <button
          onClick={() =>
            onExplorePandals('')
          }
          className="
            flex
            flex-col
            items-center
            gap-1

            text-[9px]

            tracking-[0.2em]

            text-stone-500

            hover:text-amber-300

            transition-colors
          "
        >
          <div
            className="
              w-5
              h-8

              border
              border-stone-600

              hover:border-amber-400

              rounded-full

              flex
              justify-center

              pt-1.5

              transition-colors
            "
          >
            <span
              className="
                w-1
                h-1.5

                rounded-full

                bg-stone-500

                animate-bounce
              "
            />
          </div>

          <span className="hidden sm:block">
            SCROLL
          </span>
        </button>


        {/* Right info */}

        <div
          className="
            hidden
            sm:flex

            items-center
            gap-2

            text-[10px]

            text-stone-500
          "
        >
          <span>
            5 Metro Lines
          </span>

          <span className="text-rose-500">
            •
          </span>

          <span>
            Zero Traffic Gridlock
          </span>
        </div>

      </div>

    </section>
  );
}