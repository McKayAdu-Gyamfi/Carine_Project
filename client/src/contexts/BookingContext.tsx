import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { api } from "@/lib/api";
import { useAuth } from "./AuthContext";

export type BookingStatus = "Pending" | "Approved" | "Declined";

export interface Booking {
  id: string;
  studentName: string;
  hostelName: string;
  roomLabel: string;
  roomNumber: string;
  price: number;
  date: string;
  status: BookingStatus;
  image: string;
  location: string;
  // Raw ids for manager logic
  roomId?: string;
  hostelId?: string;
}

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  refreshBookings: () => Promise<void>;
  addBooking: (payload: { check_in: string; check_out: string; room_id: string }) => Promise<void>;
  approveBooking: (id: string) => Promise<void>;
  declineBooking: (id: string) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const refreshBookings = useCallback(async () => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get<{ success: boolean; data: any[] }>('/bookings');
      if (res.success) {
        const mapped = res.data.map(transformBooking);
        setBookings(mapped);
      }
    } catch (err: any) {
      console.error("Failed to refresh bookings:", err);
      setError(err.message || 'Failed to fetch bookings');
      // Fallback for demo if DB is completely empty or errors
      setBookings([]); 
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  const addBooking = async (payload: { check_in: string; check_out: string; room_id: string }) => {
    // API requires check_in_date, check_out_date, room_id, student_id
    await api.post('/bookings', {
      check_in_date: payload.check_in,
      check_out_date: payload.check_out,
      room_id: payload.room_id,
      student_id: user?.id,
    });
    await refreshBookings();
  };

  const approveBooking = async (id: string) => {
    await api.patch(`/bookings/${id}`, { status: "CONFIRMED" });
    await refreshBookings();
  };

  const declineBooking = async (id: string) => {
    await api.patch(`/bookings/${id}`, { status: "DECLINED" }); // Using server enum DECLINED/CANCELLED
    await refreshBookings();
  };

  const cancelBooking = async (id: string) => {
    await api.patch(`/bookings/${id}`, { status: "CANCELLED" });
    await refreshBookings();
  };

  return (
    <BookingContext.Provider value={{ bookings, loading, error, refreshBookings, addBooking, approveBooking, declineBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
}

function transformBooking(dbBooking: any): Booking {
  // DB enums: PENDING, CONFIRMED, CANCELLED, CHECKED_OUT
  let status: BookingStatus = "Pending";
  if (dbBooking.status === "CONFIRMED") status = "Approved";
  if (dbBooking.status === "CANCELLED" || dbBooking.status === "DECLINED") status = "Declined";

  // Use optional chaining carefully since the JOIN might fail if data is bad
  const room = dbBooking.ROOM || {};
  const hostel = room.HOSTEL || {};
  const users = dbBooking.USERS || {};

  return {
    id: dbBooking.id,
    studentName: users.email || "Student", // Name not exposed in this specific payload, standard email used
    hostelName: hostel.hostel_name || "Unknown Hostel",
    roomLabel: `${room.capacity || 1} in a room`,
    roomNumber: room.room_number || "TBD",
    price: room.price_per_semester || 0,
    date: new Date(dbBooking.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
    status,
    image: "/images/Dufie_Annex_1.png", // Fallback, booking payload doesn't embed hostel images
    location: "Campus Area",
    roomId: dbBooking.room_id,
    hostelId: room.hostel_id,
  };
}
