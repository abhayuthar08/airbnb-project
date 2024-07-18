const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Malibu",
    country: "United States"
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "New York City",
    country: "United States"
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1000,
    location: "Aspen",
    country: "United States"
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Florence",
    country: "Italy"
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 800,
    location: "Portland",
    country: "United States"
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Cancun",
    country: "Mexico"
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 900,
    location: "Lake Tahoe",
    country: "United States"
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Los Angeles",
    country: "United States"
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Verbier",
    country: "Switzerland"
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania"
  },
  {
    title: "Historic Canal House",
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands"
  },
  {
    title: "Private Island Retreat",
    description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 10000,
    location: "Fiji",
    country: "Fiji"
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description: "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Cotswolds",
    country: "United Kingdom"
  },
   {
    title: "Beachfront Retreat in Hawaii",
    description:
      "Relax on the pristine beaches of Hawaii in this luxurious beachfront retreat with stunning ocean views.",
    image: "https://images.unsplash.com/photo-1566833155114-2a45f11b8c8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGhhd2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 2800,
    location: "Maui",
    country: "United States",
  },
  {
    title: "Scenic Lakeside Cabin in Switzerland",
    description:
      "Enjoy breathtaking views of the Swiss Alps from this charming lakeside cabin, perfect for a peaceful getaway.",
    image: "https://images.unsplash.com/photo-1587722306543-632e3d3eaf8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGxha2VzaWRlJTIwY2FiaW58ZW58MHx8MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Lucerne",
    country: "Switzerland",
  },
  {
    title: "Oceanfront Villa in the Bahamas",
    description:
      "Escape to paradise in this luxurious oceanfront villa in the Bahamas. Enjoy private beach access and stunning sunsets.",
    image: "https://images.unsplash.com/photo-1616601900248-b085b2665ee3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJhaGFtYXN8ZW58MHx8MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Nassau",
    country: "Bahamas",
  },
  {
    title: "Riverside Cabin in New Zealand",
    description:
      "Experience the tranquility of New Zealand's wilderness in this cozy riverside cabin surrounded by native forests.",
    image: "https://images.unsplash.com/photo-1578635108207-3094645ee3c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG5ldyUyMnpvb21hfGVufDB8fDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "Queenstown",
    country: "New Zealand",
  },
  {
    title: "Historic Riad in Marrakech",
    description:
      "Immerse yourself in Moroccan culture in this beautifully restored historic riad in the heart of Marrakech.",
    image: "https://images.unsplash.com/photo-1601406860150-16acda0aae94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHJpYWQlMjBtYXJya2VjaGxpc3R8ZW58MHx8MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Marrakech",
    country: "Morocco",
  },
  {
    title: "Lakeside Villa in Italy",
    description:
      "Live la dolce vita in this elegant lakeside villa in Italy. Enjoy stunning lake views and Italian hospitality.",
    image: "https://images.unsplash.com/photo-1598517482787-9245a13a9f15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGxha2VzaWRlJTIwdmlsbGF8ZW58MHx8MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Lake Como",
    country: "Italy",
  },
  {
    title: "Private Island in the Philippines",
    description:
      "Escape to your own private island in the Philippines, surrounded by crystal-clear waters and pristine beaches.",
    image: "https://images.unsplash.com/photo-1552210265-74bc0e1da00a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHBob3RvJTIwaWxhbmQlMjBwaWxlfGVufDB8fDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 5000,
    location: "Palawan",
    country: "Philippines",
  },
  {
    title: "Countryside Cottage in France",
    description:
      "Experience French countryside charm in this quaint cottage surrounded by vineyards and rolling hills.",
    image: "https://images.unsplash.com/photo-1583399953045-2b9fc4e77ea2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNvdW50cnlzaWRlJTIwY290dHN3aWRlfGVufDB8fDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 1400,
    location: "Burgundy",
    country: "France",
  },
  {
    title: "Urban Loft in Berlin",
    description:
      "Stay in style in this modern urban loft in the vibrant city of Berlin, known for its art and nightlife.",
    image: "https://images.unsplash.com/photo-1612217634127-e309c15e36e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGJlcmxpbmclMjBsb2Z0fGVufDB8fDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Berlin",
    country: "Germany",
  },
  {
    title: "Sunny Villa in Santorini",
    description:
      "Enjoy breathtaking sunsets from this beautiful villa perched on the cliffs of Santorini, overlooking the Aegean Sea.",
    image: "https://images.unsplash.com/photo-1606780474101-5e6d7271d1eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHNhbml0aW9ufGVufDB8fDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 2800,
    location: "Santorini",
    country: "Greece",
  },
  {
    title: "Mountain Lodge in Colorado",
    description:
      "Escape to the Rocky Mountains in this cozy mountain lodge with panoramic views of Colorado's natural beauty.",
    image: "https://images.unsplash.com/photo-1518144591383-9d8dff3e9b07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG1vdW50YWluJTIwbG9kZ2V8ZW58MHx8MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Tropical Villa in Bali",
    description:
      "Indulge in luxury at this tropical villa in Bali, featuring private pools, lush gardens, and Balinese hospitality.",
    image: "https://images.unsplash.com/photo-1576471757802-54d4da940d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGJhbGl8ZW58MHx8MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Ubud",
    country: "Indonesia",
  },
  {
    title: "Secluded Cabin in Norway",
    description:
      "Find peace in this secluded cabin in Norway, nestled among fjords and forests with stunning natural views.",
    image: "https://images.unsplash.com/photo-1616451185654-e8ab8b60f63a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fG5vcndheSUyMGNhYmluJTIwZm9yZXN0JTIwZm9yZHxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Bergen",
    country: "Norway",
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the heart of the desert at this oasis in Dubai, featuring modern amenities and Arabian hospitality.",
    image: "https://images.unsplash.com/photo-1554351769-3f79a6359d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGR1YmFpJTIwZGVzZXJ0JTIwb3hc2lzfGVufDB8fDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Rainforest Retreat in Costa Rica",
    description:
      "Immerse yourself in nature at this rainforest retreat in Costa Rica, surrounded by exotic wildlife and lush greenery.",
    image: "https://images.unsplash.com/photo-1559138943-29ab3ca0372a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGNvc3RhJTIwcmljYSUyMHJhaW5mb3Jlc3QlMjByZXRyZWF0fGVufDB8fDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 2300,
    location: "Monteverde",
    country: "Costa Rica",
  },
  {
    title: "Historic Mansion in Spain",
    description:
      "Stay in this historic mansion in Spain, offering elegant interiors and a glimpse into the country's rich heritage.",
    image: "https://images.unsplash.com/photo-1542351926-d9196fa3b051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHNwYWluJTIwbWFuc2lvbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
    price: 2700,
    location: "Seville",
    country: "Spain",
  },
  {
    title: "Luxury Apartment in Tokyo",
    description:
      "Experience the vibrant city life in Tokyo from this luxury apartment, featuring modern design and top-notch amenities.",
    image: "https://images.unsplash.com/photo-1543966880-e9eb4f96f120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHRva3lvJTIwYXBhcnRtZW50JTIwbHV4dXJ5fGVufDB8fDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Cozy Cottage in Canada",
    description:
      "Enjoy a serene escape in this cozy cottage in Canada, surrounded by nature and perfect for a relaxing getaway.",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNvdHRhZ2UlMjBjYW5hZGF8ZW58MHx8MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Charming Bungalow in Thailand",
    description:
      "Stay in this charming bungalow in Thailand, offering a unique blend of traditional Thai architecture and modern comforts.",
    image: "https://images.unsplash.com/photo-1567266569955-d0cc75cf0505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHRoYWlsYW5kJTIwYnVuZ2Fsb3d8ZW58MHx8MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 1900,
    location: "Chiang Mai",
    country: "Thailand",
  },
  {
    title: "Mountain Cabin in Austria",
    description:
      "Experience the Austrian Alps from this cozy mountain cabin, perfect for skiing and outdoor adventures.",
    image: "https://images.unsplash.com/photo-1580217747733-8e5e5c680e4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGF1c3RyaWElMjBjYWJpbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
    price: 2100,
    location: "Innsbruck",
    country: "Austria",
  },
  {
    title: "Seaside Villa in Portugal",
    description:
      "Relax in this seaside villa in Portugal, offering stunning views of the Atlantic Ocean and luxurious amenities.",
    image: "https://images.unsplash.com/photo-1523666630223-9b0b0e427b5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fHNlYXNpZGUlMjB2aWxsYSUyMHBvcnR1Z2FsfGVufDB8fDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 2600,
    location: "Algarve",
    country: "Portugal",
  },
  {
    title: "Rustic Lodge in Montana",
    description:
      "Experience the rugged beauty of Montana in this rustic lodge, surrounded by mountains and wide-open spaces.",
    image: "https://images.unsplash.com/photo-1588420340148-2991f38a4bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fG1vbnRhbmElMjBsb2RnZXxlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60",
    price: 1700,
    location: "Bozeman",
    country: "United States",
  },
  {
    title: "Eco Lodge in South Africa",
    description:
      "Stay at this eco-friendly lodge in South Africa, offering luxury accommodations and stunning views of the African savannah.",
    image: "https://images.unsplash.com/photo-1594745562212-93d3894a3300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNvdXRoJTIwYWZyaWNhJTIwbG9kZ2V8ZW58MHx8MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 3100,
    location: "Kruger National Park",
    country: "South Africa",
  }
];

module.exports = { data: sampleListings };