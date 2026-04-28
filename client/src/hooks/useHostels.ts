import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export interface Hostel {
  id: string;
  name: string;
  location: string;
  distance: string;
  price: number;
  startingPrice: number;
  priceFreq: string;
  rating: number;
  availability: string;
  amenities: string[];
  image: string;
  gallery: string[];
  desc: string;
}

export function useHostels(searchQuery?: string, maxDistance?: number) {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHostels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (maxDistance) params.append('max_distance', maxDistance.toString());

      // Use the api utility
      const res = await api.get<{ success: boolean; data: any[] }>(`/hostels?${params.toString()}`);
      
      if (!res.success) {
        throw new Error('Failed to fetch hostels');
      }

      // Map the server records (HOSTEL) into the UI domain object (Hostel)
      const mapped = res.data.map(transformHostel);
      setHostels(mapped);
    } catch (err: any) {
      console.error('Error fetching hostels:', err);
      setError(err.message || 'Failed to load static data fallback');
      setHostels([]); 
    } finally {
      setLoading(false);
    }
  }, [searchQuery, maxDistance]);

  useEffect(() => {
    fetchHostels();
  }, [fetchHostels]);

  return { hostels, loading, error, refetch: fetchHostels };
}

/** Helper to convert Supabase DB structure to Frontend UI structure */
export function transformHostel(dbHostel: any): Hostel {
  // If the server doesn't provide an image array, fallback to a placeholder
  const gallery = dbHostel.HOSTEL_IMAGE_URLS?.map((img: any) => img.image_url) || [];
  const imageUrl = gallery[0] || '/images/Dufie_Annex_1.png'; // Fallback
  
  // Transform amenities
  const amenities = dbHostel.HOSTEL_AMENITY?.map((a: any) => a.amenity_name) || ["WiFi", "Security"];

  // Calculate generic availability based on DB columns
  let availability = "AVAILABLE";
  if (dbHostel.available_rooms === 0) availability = "FULL";
  else if (dbHostel.available_rooms < 5) availability = "FEW ROOMS LEFT";

  return {
    id: dbHostel.id,
    name: dbHostel.hostel_name,
    location: dbHostel.location,
    distance: `${dbHostel.distance_from_campus || 0.5} km`,
    price: 8000, // TODO: server doesn't return starting price yet, mock for UI
    startingPrice: 6000, 
    priceFreq: "per semester",
    rating: 4.8, // Mocked rating until implemented on server
    availability,
    amenities,
    image: imageUrl,
    gallery: gallery.length > 0 ? gallery : [imageUrl],
    desc: dbHostel.description || "Experience the layout and natural lighting of your future home. This premium hostel offers a combination of aesthetics and state-of-the-art facilities.",
  };
}
