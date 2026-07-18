export const SCHOOLS = [
  { id: "ashesi", name: "Ashesi University", domain: "@ashesi.edu.gh" },
  { id: "ug", name: "University of Ghana", domain: "@ug.edu.gh" },
  { id: "knust", name: "Kwame Nkrumah University of Science and Technology", domain: "@st.knust.edu.gh" }
];

export const getSchoolById = (id) => SCHOOLS.find(school => school.id === id);
export const getSchoolByDomain = (domain) => SCHOOLS.find(school => school.domain === domain);
