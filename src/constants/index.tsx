export const roomTypes = [
  { key: "living_room", label: "Living room", value: "Living room" },
  { key: "bedroom", label: "Bedroom", value: "Bedroom" },
  { key: "bath_room", label: "Bath room", value: "Bath room" },
  { key: "kitchen", label: "Kitchen", value: "Kitchen" },
  { key: "dining_room", label: "Dining room", value: "Dining room" },
  { key: "reception", label: "Reception", value: "Reception" },
  { key: "toilet", label: "Toilet", value: "Toilet" },
  { key: "dressing_room", label: "Dressing Room", value: "Dressing Room" },
  { key: "loft", label: "Loft", value: "Loft" },
  { key: "office", label: "Office", value: "Office" },
  { key: "home_office", label: "Home office", value: "Home office" },
  { key: "meeting_room", label: "Meeting room", value: "Meeting room" },
  { key: "coworking_space", label: "Coworking space", value: "Coworking space" },
  { key: "workshop", label: "Workshop", value: "Workshop" },
  { key: "study_room", label: "Study room", value: "Study room" },
  { key: "gaming_room", label: "Gaming room", value: "Gaming room" },
  { key: "coffee_shop", label: "Coffee shop", value: "Coffee shop" },
  { key: "restaurant", label: "Restaurant", value: "Restaurant" },
  { key: "hotel_lobby", label: "Hotel lobby", value: "Hotel lobby" },
  { key: "hotel_room", label: "Hotel room", value: "Hotel room" },
  { key: "hotel_bathroom", label: "Hotel bathroom", value: "Hotel bathroom" },
  { key: "auditorium", label: "Auditorium", value: "Auditorium" },
  { key: "classroom", label: "Classroom", value: "Classroom" },
  { key: "lecture_hall", label: "Lecture Hall", value: "Lecture Hall" },
  { key: "fitness_gym", label: "Fitness gym", value: "Fitness gym" },
  { key: "clothing_store", label: "Clothing store", value: "Clothing store" },
];

export const roomStyles = [
  { key: "modern", label: "Modern", value: "Modern" },
  { key: "neoclassic", label: "Neoclassic", value: "Neoclassic" },
  { key: "minimalist", label: "Minimalist", value: "Minimalist" },
  { key: "boho_chic", label: "Boho-chic", value: "Boho-chic" },
  { key: "art_deco", label: "Art Deco", value: "Art Deco" },
  { key: "biophilic", label: "Biophilic", value: "Biophilic" },
  { key: "industrial", label: "Industrial", value: "Industrial" },
  { key: "japandi", label: "Japandi", value: "Japandi" },
  { key: "luxurious", label: "Luxurious", value: "Luxurious" },
  { key: "art_nouveau", label: "Art Nouveau", value: "Art Nouveau" },
  { key: "ikea", label: "IKEA", value: "IKEA" },
  { key: "warm_cozy", label: "Warm & Cozy", value: "Warm & Cozy" },
  { key: "contemporary", label: "Contemporary", value: "Contemporary" },
  { key: "eclectic", label: "Eclectic", value: "Eclectic" },
  { key: "wabi_sabi", label: "Wabi-sabi", value: "Wabi-sabi" },
  { key: "zen", label: "Zen", value: "Zen" },
  { key: "coastal", label: "Coastal", value: "Coastal" },
  { key: "mediterranean", label: "Mediterranean", value: "Mediterranean" },
  { key: "shabby_chic", label: "Shabby Chic", value: "Shabby Chic" },
  { key: "bauhaus", label: "Bauhaus", value: "Bauhaus" },
  { key: "futuristic", label: "Futuristic", value: "Futuristic" },
  { key: "pharaonic", label: "Pharaonic", value: "Pharaonic" },
  { key: "tropical", label: "Tropical", value: "Tropical" },
];


export const getTemplateOptions = (roomType: string, stylePreset: string) => {
  return `Design a modern ${
    roomType ? roomType : "living room"
  } that feels intentional, sophisticated, and flawlessly finished. The space should embody a ${
    stylePreset ? stylePreset : "modern"
  } aesthetic, using a soft, neutral palette, premium materials, and clean, precision lines. Incorporate custom, built-in features, such as seamless storage or a bespoke focal point, that blend functionality with artful simplicity, ensuring every detail feels high-end and refined.`;
};