import { createContext, useContext, useState, type ReactNode } from "react";

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
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "status" | "date">) => void;
  approveBooking: (id: string) => void;
  declineBooking: (id: string) => void;
  cancelBooking: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Initial state populated with a few static mock bookings for display purposes
const initialBookings: Booking[] = [];

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const addBooking = (newBookingData: Omit<Booking, "id" | "status" | "date">) => {
    const newBooking: Booking = {
      ...newBookingData,
      id: `b-${Date.now()}`,
      status: "Pending",
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const approveBooking = (id: string) => {
    setBookings((prev) => 
      prev.map(b => b.id === id ? { ...b, status: "Approved" } : b)
    );
  };

  const declineBooking = (id: string) => {
    setBookings((prev) => 
      prev.map(b => b.id === id ? { ...b, status: "Declined" } : b)
    );
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.filter(b => b.id !== id));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, approveBooking, declineBooking, cancelBooking }}>
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
