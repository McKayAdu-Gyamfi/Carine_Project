import dufie_annex_1 from "../assets/Dufie_Annex_1.png";

export const MOST_POPULAR = [
  { 
    id: '1', 
    name: 'Dufie Annex', 
    location: 'Ayeduase, Kumasi', 
    distance: '1.2 km', 
    price: 450, 
    priceFreq: 'per month',
    image: dufie_annex_1, 
    gallery: [
      dufie_annex_1,
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400&h=400",
      "https://images.unsplash.com/photo-1502672260266-1c1de2d9d0cb?auto=format&fit=crop&q=80&w=400&h=400",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=400&h=400"
    ],
    desc: "Experience the layout and natural lighting of your future home. This premium hostel offers a combination of aesthetics and state-of-the-art facilities including max security, 24/7 water supply, and unlimited WiFi." 
  },
  { 
    id: '2', 
    name: 'Independence Hall', 
    location: 'Main Campus', 
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
