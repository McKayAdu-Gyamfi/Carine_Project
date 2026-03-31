const fs = require('fs');
const path = require('path');

const tables = ["HOSTEL", "ROOM", "BOOKING", "COMPLAINT", "REVIEW", "HOSTEL_IMAGE_URLS", "ROOM_IMAGE_URLS", "HOSTEL_AMENITY", "ROOM_AMENITY", "BANK_ACCOUNT", "USERS"];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  tables.forEach(table => {
    // Controller querying: .from("TABLE") or .from('TABLE')
    content = content.replace(new RegExp(`\\.from\\(["']${table}["']\\)`, 'g'), `.from("${table.toLowerCase()}")`);
    
    // Select nested syntax: TABLE!inner
    content = content.replace(new RegExp(`${table}!inner`, 'g'), `${table.toLowerCase()}!inner`);
    
    // Select nested syntax: TABLE (
    content = content.replace(new RegExp(`${table} \\(`, 'g'), `${table.toLowerCase()} (`);
    
    // SQL Schema specific mappings
    content = content.replace(new RegExp(`"${table}"`, 'g'), `"${table.toLowerCase()}"`);
  });

  // Specifically users -> user for better-auth collision logic
  content = content.replace(/"users"/g, '"user"');
  content = content.replace(/\.from\(['"]users['"]\)/g, '.from("user")');
  content = content.replace(/USERS:student_id/g, 'user:student_id');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

const dirs = [
  "src/modules/hostels", 
  "src/modules/rooms", 
  "src/modules/bookings", 
  "src/modules/complaints", 
  "src/modules/reviews", 
  "src/modules/users",
  "src/utils"
];

dirs.forEach(dir => {
  const fullDir = path.join(__dirname, dir);
  if (fs.existsSync(fullDir)) {
    fs.readdirSync(fullDir).forEach(file => {
      if (file.endsWith('.js') || file.endsWith('.sql')) {
        processFile(path.join(fullDir, file));
      }
    });
  }
});

// Also run on middlewares
const midPath = path.join(__dirname, "src/middlewares");
if (fs.existsSync(midPath)) {
    fs.readdirSync(midPath).forEach(file => {
      if (file.endsWith('.js')) {
        processFile(path.join(midPath, file));
      }
    });
}
