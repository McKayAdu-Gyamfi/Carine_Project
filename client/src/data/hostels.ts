const images = import.meta.glob('../assets/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });

export const getImage = (filename: string): string => {
  return (images[`../assets/${filename}`] as string) || '';
};

export const MOST_POPULAR = [
  { 
    id: '1', 
    name: 'Dufie Annex', 
    location: 'Berekuso, Eastern Region', 
    distance: '1.2 km', 
    price: 7000, 
    priceFreq: 'per semester',
    image: getImage('Dufie_Annex_1.png'), 
    gallery: [
      getImage('Dufie_Annex_1.png'),
      getImage('Dufie_Annex_2.png')
    ],
    desc: "Experience the layout and natural lighting of your future home. This premium hostel offers a combination of aesthetics and state-of-the-art facilities including max security, 24/7 water supply, and unlimited WiFi." 
  },
  { 
    id: '2', 
    name: 'Dufie Platinum', 
    location: 'High Five', 
    distance: '0.5 km', 
    price: 380, 
    priceFreq: 'per month',
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800&h=400", 
    gallery: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800&h=400"
    ],
    desc: "Classic on-campus experience with modern facilities. Live right on campus where everything is close by." 
  }
];

export const NEARBY_PLACES = [
  { 
    id: '3', 
    name: 'Evandy Hostel', 
    location: 'Bomso Area', 
    price: 250, 
    priceFreq: 'per month',
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=400&h=400", 
    distance: '2.5 km',
    gallery: ["https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=400&h=400"],
    desc: "Cozy student living in the heart of Bomso. Perfect for students looking for affordability and peace." 
  },
  { 
    id: '4', 
    name: 'Gaza Hostel', 
    location: 'Kotei', 
    price: 200, 
    priceFreq: 'per month',
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400&h=400", 
    distance: '3.0 km',
    gallery: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400&h=400"],
    desc: "Basic hostel with great community vibes. A very vibrant student ecosystem." 
  }
];

export const ALL_HOSTELS = [...MOST_POPULAR, ...NEARBY_PLACES];
