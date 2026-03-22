-- Enums
CREATE TYPE user_type AS ENUM ('STUDENT', 'HOSTEL_MANAGER', 'ADMIN');
CREATE TYPE auth_provider AS ENUM ('LOCAL', 'MICROSOFT');
CREATE TYPE room_type AS ENUM ('SINGLE', 'DOUBLE', 'SUITE');
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'CHECKED_OUT');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'FAILED');
CREATE TYPE complaint_status AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED');

-- Extended User Table (Assuming Better Auth handles core 'user', we extend or rename it based on setup)
CREATE TABLE IF NOT EXISTS "USERS" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_type user_type NOT NULL DEFAULT 'STUDENT',
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR, -- Nullable if using OAuth
    auth_provider auth_provider NOT NULL DEFAULT 'LOCAL',
    provider_id VARCHAR, -- E.g., Azure AD ID
    profile_complete BOOLEAN DEFAULT FALSE,
    student_id VARCHAR, -- University issued ID
    course VARCHAR,
    current_room_id UUID, -- Nullable until assigned
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Hostel Table (Managed by a HOSTEL_MANAGER or ADMIN)
CREATE TABLE IF NOT EXISTS "HOSTEL" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hostel_name VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    total_rooms INT NOT NULL DEFAULT 0,
    manager_id UUID REFERENCES "USERS"(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Hostel Images Table
CREATE TABLE IF NOT EXISTS "HOSTEL_IMAGE_URLS" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hostel_id UUID REFERENCES "HOSTEL"(id) ON DELETE CASCADE,
    image_url VARCHAR NOT NULL
);

-- Amenity Table (Lookup for general amenities)
CREATE TABLE IF NOT EXISTS "AMENITY" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    hostel_id UUID REFERENCES "HOSTEL"(id) ON DELETE CASCADE
);

-- Bank Account Table for Hostels
CREATE TABLE IF NOT EXISTS "BANK_ACCOUNT" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_number VARCHAR NOT NULL,
    bank_name VARCHAR NOT NULL,
    manager_id UUID REFERENCES "USERS"(id) ON DELETE CASCADE,
    hostel_id UUID REFERENCES "HOSTEL"(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Room Table
CREATE TABLE IF NOT EXISTS "ROOM" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_number VARCHAR NOT NULL,
    room_type room_type NOT NULL,
    price_per_bed DECIMAL(10,2) NOT NULL,
    capacity INT NOT NULL,
    current_occupancy INT DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    hostel_id UUID REFERENCES "HOSTEL"(id) ON DELETE CASCADE,
    length DECIMAL(6,2),
    width DECIMAL(6,2),
    height DECIMAL(6,2),
    tour_url VARCHAR, -- URL to Pano2VR panoramic tour
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add ForeignKey for User's current room now that ROOM exists
ALTER TABLE "USERS" ADD CONSTRAINT fk_current_room FOREIGN KEY (current_room_id) REFERENCES "ROOM"(id) ON DELETE SET NULL;

-- Room Images Table
CREATE TABLE IF NOT EXISTS "ROOM_IMAGE_URLS" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID REFERENCES "ROOM"(id) ON DELETE CASCADE,
    image_url VARCHAR NOT NULL
);

-- Room Amenities Mapping Table
CREATE TABLE IF NOT EXISTS "ROOM_AMENITY" (
    room_id UUID REFERENCES "ROOM"(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES "AMENITY"(id) ON DELETE CASCADE,
    PRIMARY KEY (room_id, amenity_id)
);

-- Review Table
CREATE TABLE IF NOT EXISTS "REVIEW" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rating INT CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    student_id UUID REFERENCES "USERS"(id) ON DELETE SET NULL,
    hostel_id UUID REFERENCES "HOSTEL"(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Booking Table
CREATE TABLE IF NOT EXISTS "BOOKING" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    check_in_date TIMESTAMP WITH TIME ZONE NOT NULL,
    check_out_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status booking_status NOT NULL DEFAULT 'PENDING',
    total_amount DECIMAL(10,2) NOT NULL,
    student_id UUID REFERENCES "USERS"(id) ON DELETE CASCADE,
    room_id UUID REFERENCES "ROOM"(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payment Table
CREATE TABLE IF NOT EXISTS "PAYMENT" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paystack_reference VARCHAR UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status payment_status NOT NULL DEFAULT 'PENDING',
    booking_id UUID REFERENCES "BOOKING"(id) ON DELETE CASCADE UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Complaint Table
CREATE TABLE IF NOT EXISTS "COMPLAINT" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    status complaint_status NOT NULL DEFAULT 'OPEN',
    student_id UUID REFERENCES "USERS"(id) ON DELETE CASCADE,
    hostel_manager_id UUID REFERENCES "USERS"(id) ON DELETE SET NULL,
    hostel_id UUID REFERENCES "HOSTEL"(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

