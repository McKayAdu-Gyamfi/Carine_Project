# Application API Endpoints

This document lists all active API endpoints identified in the project, organized by module. It includes the required authentication protections applied to each endpoint.

## 🏢 Hostels (`/api/hostels`)
- `GET /` : Get all hostels **(Public)**
- `GET /:id` : Get details for a specific hostel **(Public)**
- `POST /` : Create a new hostel **(Requires Auth, Role: ADMIN)**
- `PATCH /:id` : Update hostel details **(Requires Auth, Hostel Owner)**
- `PUT /:id/amenities` : Bulk update amenities **(Requires Auth, Hostel Owner)**
- `POST /:id/amenities` : Add single amenity **(Requires Auth, Hostel Owner)**
- `DELETE /:id/amenities/:amenityId` : Delete amenity **(Requires Auth, Hostel Owner)**
- `POST /:id/images` : Upload hostel images to Supabase (up to 10) **(Requires Auth, Hostel Owner)**

## 🛏️ Rooms (`/api/rooms`)
- `GET /` : Get all rooms **(Public)**
- `GET /:id` : Get details for a specific room **(Public)**
- `POST /` : Create a new room **(Requires Auth, Role: HOSTEL_MANAGER)**
- `PATCH /:id` : Update room details **(Requires Auth, Room Owner)**
- `PUT /:id/amenities` : Bulk update room amenities **(Requires Auth, Room Owner)**
- `POST /:id/amenities` : Add single room amenity **(Requires Auth, Room Owner)**
- `DELETE /:id/amenities/:amenityId` : Delete room amenity **(Requires Auth, Room Owner)**
- `POST /:id/images` : Upload room images to Supabase (up to 10) **(Requires Auth, Room Owner)**
- `POST /:id/tours` : Store a room tour scene (dynamically links panoramas for Frontend merging) **(Requires Auth, Room Owner)**
- `DELETE /:id/tours/:sceneId` : Delete a room tour scene **(Requires Auth, Room Owner)**

## 📅 Bookings (`/api/bookings`)
- `GET /` : View all bookings (Filtered automatically for Students) **(Requires Auth)**
- `GET /:id` : Get specific booking details **(Requires Auth)**
- `POST /` : Create a booking **(Requires Auth)**
- `PATCH /:id` : Update a booking status **(Requires Auth)**

## 💬 Complaints (`/api/complaints`)
- `GET /` : View complaints **(Requires Auth)**
- `GET /:id` : Get specific complaint details **(Requires Auth)**
- `POST /` : Submit a new complaint **(Requires Auth)**
- `PATCH /:id` : Update a complaint status **(Requires Auth)**

## ⭐ Reviews (`/api/reviews`)
- `GET /` : Get reviews **(Public)**
- `POST /` : Submit a review **(Requires Auth)**

## 👤 Users (`/api/users`)
- `GET /me` : View current user profile **(Requires Auth)**
- `PATCH /me` : Update current user profile **(Requires Auth)**
- `PATCH /me/profile-complete` : Provide student details (ID & course) **(Requires Auth, Role: STUDENT)**
- `GET /me/hostels` : View hostels managed by user **(Requires Auth, Role: HOSTEL_MANAGER)**
- `GET /` : View all users **(Requires Auth, Role: ADMIN)**
- `POST /` : Explicitly create an admin user **(Requires Auth, Role: ADMIN)**
- `GET /:id` : View specific user details **(Requires Auth, Role: ADMIN)**
- `PATCH /:id` : Admin manual override update for a user **(Requires Auth, Role: ADMIN)**

## 🔐 Auth (`/api/auth/*`)
Handled by the **BetterAuth** module. Consists of standard Email & Password functionality for robust and unified authentication (`/api/auth/sign-in`, `/api/auth/sign-up`). Microsoft SSO has been officially removed; all users now leverage local email authentication dynamically resolving user roles (`STUDENT`, `HOSTEL_MANAGER`, `ADMIN`).
