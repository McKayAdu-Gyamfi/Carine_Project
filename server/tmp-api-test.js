import fs from 'fs';

const BASE_URL = 'http://localhost:3000';
let managerCookie = '';
let studentCookie = '';

let hostelId = '';
let roomId = '';
let bookingId = '';

const results = [];

function logResult(name, res, data) {
  results.push(`### ${name}\n- **Status**: ${res.status}\n- **Response**: \`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``);
  console.log(`[✓] Tested: ${name}`);
}

async function request(name, path, method = 'GET', authCookie = '', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (authCookie) {
    options.headers['Cookie'] = authCookie;
  }
  
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);
  let data;
  try {
    data = await res.json();
  } catch(e) {
    data = { error: "Could not parse JSON" };
  }
  
  logResult(name, res, data);
  return { res, data };
}

function extractCookies(res) {
  const setCookie = res.headers.get('set-cookie') || '';
  if (!setCookie) return '';
  // Node fetch merges set-cookie headers with commas. We extract the first part of each cookie and join with semicolons.
  return setCookie.split(', ')
    .map(c => c.split(';')[0])
    .filter(c => c.includes('='))
    .join('; ');
}

async function runTests() {
  console.log("Starting API Tests...");
  const timestamp = Date.now();
  
  // 1. Auth 
  const managerPayload = { email: `manager_${timestamp}@external.com`, password: "Password123!", name: "Test Manager" };
  const { res: resMgr } = await request('Sign Up Manager', '/api/auth/sign-up/email', 'POST', '', managerPayload);
  managerCookie = extractCookies(resMgr);

  const studentPayload = { email: `student_${timestamp}@ashesi.edu.gh`, password: "Password123!", name: "Test Student" };
  const { res: resStudent } = await request('Sign Up Student', '/api/auth/sign-up/email', 'POST', '', studentPayload);
  studentCookie = extractCookies(resStudent);

  // 2. Users (Student Profile Complete & ME)
  await request('PATCH Complete Student Profile', '/api/users/me/profile-complete', 'PATCH', studentCookie, { student_id: `ID_${timestamp}`, course: "Testing" });
  await request('GET Current User Profile', '/api/users/me', 'GET', studentCookie);

  // 3. Hostels
  const { data: hostelData } = await request('POST Create Hostel', '/api/hostels', 'POST', managerCookie, {
    hostel_name: `Lodge ${timestamp}`, location: "Test Loc", total_rooms: 10, available_rooms: 10
  });
  if (hostelData.data && hostelData.data.id) {
    hostelId = hostelData.data.id;
    await request('POST Add Hostel Amenities (Bulk)', `/api/hostels/${hostelId}/amenities`, 'POST', managerCookie, { amenities: ["WIFI", "TV"] });
    await request('GET All Hostels', '/api/hostels', 'GET');
    await request('GET Hostel By ID', `/api/hostels/${hostelId}`, 'GET');
  } else {
    console.log("Failed to create hostel, skipping rooms/bookings dependent on hostelId");
  }

  // 4. Rooms
  if (hostelId) {
    const { data: roomData } = await request('POST Create Room', '/api/rooms', 'POST', managerCookie, {
      room_number: `101_${timestamp}`, room_type: "SINGLE", price_per_bed: 100, capacity: 1, hostel_id: hostelId
    });
    if (roomData.data && roomData.data.id) {
      roomId = roomData.data.id;
      await request('POST Add Room Amenities (Bulk)', `/api/rooms/${roomId}/amenities`, 'POST', managerCookie, { amenities: ["AIR_CONDITIONING"] });
      await request('GET All Rooms', '/api/rooms', 'GET');
      await request('GET Room By ID', `/api/rooms/${roomId}`, 'GET');
    }
  }

  // 5. Bookings
  if (roomId) {
    const { data: bookingData } = await request('POST Create Booking', '/api/bookings', 'POST', studentCookie, {
      check_in_date: "2026-09-01T12:00:00Z", check_out_date: "2027-05-30T12:00:00Z", room_id: roomId
    });
    if (bookingData.data && bookingData.data.id) {
      bookingId = bookingData.data.id;
      // Change status to CONFIRMED using Manager
      await request('PATCH Update Booking Status (Confirm)', `/api/bookings/${bookingId}`, 'PATCH', managerCookie, { status: "CONFIRMED" });
      await request('GET All Bookings (Manager View)', '/api/bookings', 'GET', managerCookie);
      await request('GET My Bookings (Student View)', '/api/bookings', 'GET', studentCookie);
    }
  }

  // 6. Complaints
  if (hostelId) {
    await request('POST Create Complaint', '/api/complaints', 'POST', studentCookie, { content: "Test complaint", hostel_id: hostelId });
    await request('GET All Complaints', '/api/complaints', 'GET', managerCookie);
  }

  // 7. Reviews
  if (hostelId) {
    await request('POST Create Review', '/api/reviews', 'POST', studentCookie, { rating: 5, comment: "Test review", hostel_id: hostelId });
    await request('GET All Reviews', '/api/reviews', 'GET', studentCookie);
  }

  fs.writeFileSync('test-results.md', `# Automated API Run Results\n\n${results.join('\n\n--- \n\n')}`);
  console.log("Done! Results written to test-results.md");
}

runTests();
