export const METRO_LINES = [
  {
    id: 'blue-line',
    name: 'Blue Line',
    bengaliName: 'ব্লু লাইন (উত্তর-দক্ষিণ)',
    route: 'Dakshineswar ⇄ Kavi Subhash',
    color: '#1d64f2',
    bgBadge: 'bg-blue-600',
    totalStations: 26,
    connectedPandalsCount: 12,
    image: '/assets/metro-blue-line.jpg',
    fallbackImage: '/assets/metro-blue-line.jpg',
    description: 'The lifeline of Kolkata Durga Puja. Runs all through the night across North, Central, and South Kolkata heritage belts.',
    specialPujaSchedule: 'All Night Special Trains on Saptami, Ashtami & Nabami (Departures every 6-8 mins till 4:00 AM)',
  },
  {
    id: 'green-line',
    name: 'Green Line',
    bengaliName: 'গ্রিন লাইন (ইস্ট-ওয়েস্ট)',
    route: 'Howrah Maidan ⇄ Sector V (Underwater Tunnel)',
    color: '#16a34a',
    bgBadge: 'bg-emerald-600',
    totalStations: 12,
    connectedPandalsCount: 7,
    image: '/assets/metro-green-line.jpg',
    fallbackImage: '/assets/metro-green-line.jpg',
    description: 'Travel beneath the holy Hooghly river in India\'s first underwater metro! Directly bridges Howrah Railway terminus to Sealdah and Salt Lake.',
    specialPujaSchedule: 'Extended services till 2:00 AM between Howrah Maidan, Esplanade, Sealdah & Salt Lake Sector V',
  },
  {
    id: 'orange-line',
    name: 'Orange Line',
    bengaliName: 'অরেঞ্জ লাইন (ই এম বাইপাস)',
    route: 'Kavi Subhash ⇄ Beleghata (Hemanta...)',
    color: '#ea580c',
    bgBadge: 'bg-amber-600',
    totalStations: 9,
    connectedPandalsCount: 3,
    image: '/assets/media_1791194172487.png',
    fallbackImage: '/assets/media_1791193643148.png',
    description: 'EM Bypass corridor connecting South Kolkata and Ruby crossing directly to Kavi Subhash interchange.',
    specialPujaSchedule: 'Services every 15 mins till 11:30 PM',
  },
  {
    id: 'purple-line',
    name: 'Purple Line',
    bengaliName: 'পার্পল লাইন (জোকা - মাঝেরহাট)',
    route: 'Joka ⇄ Majerhat',
    color: '#9333ea',
    bgBadge: 'bg-purple-600',
    totalStations: 7,
    connectedPandalsCount: 7,
    image: '/assets/media_1791194172487.png',
    fallbackImage: '/assets/media_1791193643148.png',
    description: 'Fastest transit to South West Kolkata icons including Barisha Club, Behala clubs, and Suruchi Sangha via Majerhat.',
    specialPujaSchedule: 'Midnight frequency runs till 1:30 AM during festive days',
  },
  {
    id: 'yellow-line',
    name: 'Yellow Line',
    bengaliName: 'ইয়েলো লাইন (নোয়াপাড়া - বিমানবন্দর)',
    route: 'Noapara ⇄ Jaihind Metro',
    color: '#eab308',
    bgBadge: 'bg-yellow-600',
    totalStations: 4,
    connectedPandalsCount: 4,
    image: '/assets/media_1791194172487.png',
    fallbackImage: '/assets/media_1791193643148.png',
    description: 'Direct airport connectivity corridor linking VIP Road pujas with North Suburban railway network.',
    specialPujaSchedule: 'Festival shuttle trains between Noapara and Airport terminal',
  }
];

export const ALL_STATIONS = [
  { id: 'dakshineswar', name: 'Dakshineswar', bengali: 'দক্ষিণেশ্বর', line: 'Blue', lineId: 'blue-line', pandalsCount: 3, walkTime: '24 min • 2.0 km', hasHotspot: false },
  { id: 'baranagar', name: 'Baranagar', bengali: 'বরাহনগর', line: 'Blue', lineId: 'blue-line', pandalsCount: 4, walkTime: '4 min • 297m', hasHotspot: false },
  { id: 'noapara', name: 'Noapara', bengali: 'নোয়াপাড়া', line: 'Blue', lineId: 'blue-line', pandalsCount: 3, walkTime: '3 min • 288m', hasHotspot: true },
  { id: 'dum-dum', name: 'Dum Dum', bengali: 'দমদম', line: 'Blue', lineId: 'blue-line', pandalsCount: 14, walkTime: '14 min • 1.2 km', hasHotspot: false },
  { id: 'belgachia', name: 'Belgachia', bengali: 'বেলগাছিয়া', line: 'Blue', lineId: 'blue-line', pandalsCount: 12, walkTime: '15 min • 1.4 km', hasHotspot: false },
  { id: 'shyambazar', name: 'Shyambazar', bengali: 'শ্যামবাজার', line: 'Blue', lineId: 'blue-line', pandalsCount: 18, walkTime: '2 min • 186m', hasHotspot: true },
  { id: 'shovabazar-sutanuti', name: 'Shovabazar Sutanuti', bengali: 'শোভাবাজার সুতানুটি', line: 'Blue', lineId: 'blue-line', pandalsCount: 9, walkTime: '5 min • 400m', hasHotspot: false },
  { id: 'girish-park', name: 'Girish Park', bengali: 'গিরিশ পার্ক', line: 'Blue', lineId: 'blue-line', pandalsCount: 6, walkTime: '7 min • 550m', hasHotspot: false },
  { id: 'mahatma-gandhi-road', name: 'Mahatma Gandhi Road', bengali: 'এম জি রোড', line: 'Blue', lineId: 'blue-line', pandalsCount: 8, walkTime: '4 min • 300m', hasHotspot: false },
  { id: 'central', name: 'Central', bengali: 'সেন্ট্রাল', line: 'Blue', lineId: 'blue-line', pandalsCount: 7, walkTime: '6 min • 500m', hasHotspot: false },
  { id: 'chandni-chowk', name: 'Chandni Chowk', bengali: 'চাঁদনি চক', line: 'Blue', lineId: 'blue-line', pandalsCount: 3, walkTime: '8 min • 650m', hasHotspot: false },
  { id: 'esplanade', name: 'Esplanade', bengali: 'এসপ্ল্যানেড', line: 'Blue', lineId: 'blue-line', pandalsCount: 5, walkTime: '5 min • 400m', hasHotspot: false },
  { id: 'park-street', name: 'Park Street', bengali: 'পার্ক স্ট্রিট', line: 'Blue', lineId: 'blue-line', pandalsCount: 4, walkTime: '6 min • 480m', hasHotspot: false },
  { id: 'maidan', name: 'Maidan', bengali: 'ময়দান', line: 'Blue', lineId: 'blue-line', pandalsCount: 2, walkTime: '12 min • 950m', hasHotspot: false },
  { id: 'rabindra-sadan', name: 'Rabindra Sadan', bengali: 'রবীন্দ্র সদন', line: 'Blue', lineId: 'blue-line', pandalsCount: 5, walkTime: '7 min • 550m', hasHotspot: false },
  { id: 'netaji-bhavan', name: 'Netaji Bhavan', bengali: 'নেতাজি ভবন', line: 'Blue', lineId: 'blue-line', pandalsCount: 8, walkTime: '6 min • 490m', hasHotspot: false },
  { id: 'jatin-das-park', name: 'Jatin Das Park', bengali: 'যতীন দাস পার্ক', line: 'Blue', lineId: 'blue-line', pandalsCount: 9, walkTime: '5 min • 420m', hasHotspot: false },
  { id: 'kalighat', name: 'Kalighat', bengali: 'কালীঘাট', line: 'Blue', lineId: 'blue-line', pandalsCount: 16, walkTime: '4 min • 350m', hasHotspot: true },
  { id: 'rabindra-sarobar', name: 'Rabindra Sarobar', bengali: 'রবীন্দ্র সরোবর', line: 'Blue', lineId: 'blue-line', pandalsCount: 11, walkTime: '6 min • 500m', hasHotspot: false },
  { id: 'mahanayak-uttam-kumar', name: 'Mahanayak Uttam Kumar', bengali: 'মহানায়ক উত্তম কুমার', line: 'Blue', lineId: 'blue-line', pandalsCount: 6, walkTime: '9 min • 750m', hasHotspot: false },
  { id: 'netaji', name: 'Netaji', bengali: 'নেতাজি', line: 'Blue', lineId: 'blue-line', pandalsCount: 4, walkTime: '8 min • 650m', hasHotspot: false },
  { id: 'masterda-surya-sen', name: 'Masterda Surya Sen', bengali: 'মাস্টারদা সূর্য সেন', line: 'Blue', lineId: 'blue-line', pandalsCount: 5, walkTime: '7 min • 580m', hasHotspot: false },
  { id: 'gitanjali', name: 'Gitanjali', bengali: 'গীতাঞ্জলি', line: 'Blue', lineId: 'blue-line', pandalsCount: 7, walkTime: '5 min • 420m', hasHotspot: false },
  { id: 'kavi-nazrul', name: 'Kavi Nazrul', bengali: 'কবি নজরুল', line: 'Blue', lineId: 'blue-line', pandalsCount: 5, walkTime: '8 min • 640m', hasHotspot: false },
  { id: 'shahid-khudiram', name: 'Shahid Khudiram', bengali: 'শহিদ ক্ষুদিরাম', line: 'Blue', lineId: 'blue-line', pandalsCount: 4, walkTime: '10 min • 800m', hasHotspot: false },
  { id: 'kavi-subhash', name: 'Kavi Subhash', bengali: 'কবি সুভাষ', line: 'Blue', lineId: 'blue-line', pandalsCount: 5, walkTime: '6 min • 500m', hasHotspot: false },

  // Green Line
  { id: 'howrah-maidan', name: 'Howrah Maidan', bengali: 'হাওড়া ময়দান', line: 'Green', lineId: 'green-line', pandalsCount: 5, walkTime: '5 min • 400m', hasHotspot: false },
  { id: 'howrah-station', name: 'Howrah Station', bengali: 'হাওড়া স্টেশন', line: 'Green', lineId: 'green-line', pandalsCount: 4, walkTime: '6 min • 480m', hasHotspot: false },
  { id: 'mahakaran', name: 'Mahakaran', bengali: 'মহাকরণ', line: 'Green', lineId: 'green-line', pandalsCount: 3, walkTime: '7 min • 550m', hasHotspot: false },
  { id: 'sealdah', name: 'Sealdah', bengali: 'শিয়ালদহ', line: 'Green', lineId: 'green-line', pandalsCount: 9, walkTime: '7 min • 550m', hasHotspot: true },
  { id: 'phoolbagan', name: 'Phoolbagan', bengali: 'ফুলবাগান', line: 'Green', lineId: 'green-line', pandalsCount: 6, walkTime: '6 min • 500m', hasHotspot: false },
  { id: 'salt-lake-stadium', name: 'Salt Lake Stadium', bengali: 'সল্টলেক স্টেডিয়াম', line: 'Green', lineId: 'green-line', pandalsCount: 4, walkTime: '8 min • 650m', hasHotspot: false },
  { id: 'bengal-chemical', name: 'Bengal Chemical', bengali: 'বেঙ্গল কেমিক্যাল', line: 'Green', lineId: 'green-line', pandalsCount: 3, walkTime: '9 min • 700m', hasHotspot: false },
  { id: 'city-centre', name: 'City Centre', bengali: 'সিটি সেন্টার', line: 'Green', lineId: 'green-line', pandalsCount: 5, walkTime: '6 min • 480m', hasHotspot: false },
  { id: 'central-park', name: 'Central Park', bengali: 'সেন্ট্রাল পার্ক', line: 'Green', lineId: 'green-line', pandalsCount: 4, walkTime: '7 min • 550m', hasHotspot: false },
  { id: 'karunamoyee', name: 'Karunamoyee', bengali: 'করুণাময়ী', line: 'Green', lineId: 'green-line', pandalsCount: 6, walkTime: '6 min • 500m', hasHotspot: false },
  { id: 'salt-lake-sector-v', name: 'Salt Lake Sector V', bengali: 'সল্টলেক সেক্টর ৫', line: 'Green', lineId: 'green-line', pandalsCount: 4, walkTime: '8 min • 650m', hasHotspot: false },

  // Purple Line
  { id: 'majerhat', name: 'Majerhat', bengali: 'মাঝেরহাট', line: 'Purple', lineId: 'purple-line', pandalsCount: 4, walkTime: '10 min • 800m', hasHotspot: false },
  { id: 'taratala', name: 'Taratala', bengali: 'তারাতলা', line: 'Purple', lineId: 'purple-line', pandalsCount: 5, walkTime: '7 min • 550m', hasHotspot: false },
  { id: 'behala-bazar', name: 'Behala Bazar', bengali: 'বেহালা বাজার', line: 'Purple', lineId: 'purple-line', pandalsCount: 6, walkTime: '5 min • 420m', hasHotspot: false },
  { id: 'behala-chowrasta', name: 'Behala Chowrasta', bengali: 'বেহালা চৌরাস্তা', line: 'Purple', lineId: 'purple-line', pandalsCount: 8, walkTime: '4 min • 320m', hasHotspot: true },
  { id: 'sakherbazar', name: 'Sakherbazar', bengali: 'সখেরবাজার', line: 'Purple', lineId: 'purple-line', pandalsCount: 7, walkTime: '8 min • 650m', hasHotspot: false },
  { id: 'thakurpukur', name: 'Thakurpukur', bengali: 'ঠাকুরপুকুর', line: 'Purple', lineId: 'purple-line', pandalsCount: 4, walkTime: '9 min • 700m', hasHotspot: false },
  { id: 'joka', name: 'Joka', bengali: 'জোকা', line: 'Purple', lineId: 'purple-line', pandalsCount: 3, walkTime: '11 min • 850m', hasHotspot: false },

  // Orange Line
  { id: 'satyajit-ray', name: 'Satyajit Ray', bengali: 'সত্যজিৎ রায়', line: 'Orange', lineId: 'orange-line', pandalsCount: 3, walkTime: '8 min • 620m', hasHotspot: false },
  { id: 'jyotirindra-nandi', name: 'Jyotirindra Nandi', bengali: 'জ্যোতিরিন্দ্র নন্দী', line: 'Orange', lineId: 'orange-line', pandalsCount: 3, walkTime: '9 min • 700m', hasHotspot: false },
  { id: 'kavi-sukanta', name: 'Kavi Sukanta', bengali: 'কবি সুকান্ত', line: 'Orange', lineId: 'orange-line', pandalsCount: 2, walkTime: '10 min • 780m', hasHotspot: false },
  { id: 'hemanta-mukhopadhyay', name: 'Hemanta Mukhopadhyay', bengali: 'হেমন্ত মুখোপাধ্যায়', line: 'Orange', lineId: 'orange-line', pandalsCount: 5, walkTime: '7 min • 540m', hasHotspot: false }
];

export const POPULAR_ROUTES = [
  {
    id: 'north-kolkata',
    title: 'North Kolkata',
    subtitle: 'Heritage, Sabeki & River Ghats',
    image: '/assets/pandals/route-north.jpg',
    pandalsCount: 7,
    keyLocations: 'Shyambazar • Hatibagan • ...',
    metroTag: 'Shyambazar & Shovabazar (3...',
    hubStation: 'Shyambazar'
  },
  {
    id: 'south-kolkata',
    title: 'South Kolkata',
    subtitle: 'Theme Powerhouses & Night A...',
    image: '/assets/pandals/route-south.jpg',
    pandalsCount: 6,
    keyLocations: 'Maddox Square • Suruchi • ...',
    metroTag: 'Blue Line (Kalighat & Netaji Bh...',
    hubStation: 'Kalighat'
  },
  {
    id: 'central-kolkata',
    title: 'Central Kolkata',
    subtitle: 'Lakeside Lights & Heritage Squ...',
    image: '/assets/pandals/route-central.jpg',
    pandalsCount: 4,
    keyLocations: 'College Square • Lebutala ...',
    metroTag: 'Blue & Green (Central / MG R...',
    hubStation: 'Central'
  },
  {
    id: 'east-kolkata',
    title: 'East Kolkata',
    subtitle: 'Salt Lake & Tech Corridors',
    image: '/assets/pandals/route-east.jpg',
    pandalsCount: 4,
    keyLocations: 'Salt Lake FD Block • BJ Bloc...',
    metroTag: 'Green Line (City Centre / Karu...',
    hubStation: 'Karunamoyee'
  }
];

export const SHYAMBAZAR_CIRCUIT = [
  { step: '01', name: 'North Tridhara', flames: 3, location: 'Shyambazar, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'Transit: 24 m • ~3m walk' },
  { step: '02', name: 'Kabitog Bagan', flames: 0, location: 'Shyambazar, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'Transit: 43 m • ~3m walk' },
  { step: '03', name: 'Nalin Sarkar Street', flames: 0, location: 'Shyambazar, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'Transit: 31 m • ~3m walk' },
  { step: '04', name: 'Tala Prattay', flames: 3, location: 'Tala, Shyambazar, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'Transit: 55 m • ~4m walk' },
  { step: '05', name: 'Bagbazar Sarbojanin Durgotsav', flames: 3, location: 'Bagbazar, Circular Canal Bank', metro: 'Shyambazar Metro Station', transitText: 'Transit: 33 m • ~3m walk' },
  { step: '06', name: 'Kashibose Lane', flames: 0, location: 'Shyambazar, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'Transit: 69 m • ~3m walk' },
  { step: '07', name: 'Hatibagan Sarbojanin', flames: 0, location: 'Hatibagan, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'Transit: 53 m • ~3m walk' },
  { step: '08', name: 'Hatibagan Nabin Pally', flames: 0, location: 'Hatibagan, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'Transit: 188 m • ~3m walk' },
  { step: '09', name: 'Hatibagan Sarbojanin Durgotsav', flames: 3, location: 'Hatibagan, Shyambazar, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'Transit: 206 m • ~3m walk' },
  { step: '10', name: 'Gouribari Sarbojanin', flames: 3, location: 'Shyambazar, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'Transit: 39 m • ~3m walk' },
  { step: '11', name: 'Sikdar Bagan', flames: 0, location: 'Sikdar Bagan, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'Transit: 65 m • ~3m walk' },
  { step: '12', name: 'Bidhan Sarani Atlas', flames: 0, location: 'Bidhan Sarani, North Kolkata', metro: 'Shyambazar Metro Station', transitText: 'End of circuit • ~5m to Shyambazar Metro' }
];

export const METRO_TIPS = [
  {
    title: 'Buy Tourist Smart Cards',
    desc: 'Get unlimited Kolkata Metro rides with Tourist Smart Cards (₹250 for 3 days or ₹500 for 5 days) to bypass long token queues during Puja rush.'
  },
  {
    title: 'Midnight All-Night Trains',
    desc: 'Blue Line runs trains 24x7 from Saptami afternoon through Vijaya Dashami night. Intervals are 7-10 minutes between 10 PM and 5 AM.'
  },
  {
    title: 'Underwater Ganga Transit',
    desc: 'Green Line connects Howrah Railway Station to Sealdah in under 11 minutes beneath the river, bypassing Howrah Bridge gridlocks completely!'
  },
  {
    title: 'Top Station Hubs for Pujo Hopping',
    desc: 'Kalighat (5 major pandals within 10m walk), Shyambazar (4 major pandals within 8m walk), and Sovabazar (aristocratic Bonedi Bari circuit).'
  }
];
