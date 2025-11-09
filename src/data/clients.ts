// Client data structure with logo information
// Add logo filenames as you obtain them from clients or official sources

export interface Client {
  name: string;
  logo?: string; // Optional logo filename (stored in /public/assets/img/client-logos/)
  description?: string;
  category?: 'restaurant' | 'fast-food' | 'cafe' | 'bakery' | 'food-brand' | 'ice-cream' | 'chocolate';
}

export const clients: Client[] = [
  // Fast Food Chains (International)
  { name: 'Burger King', category: 'fast-food', description: 'Premium food styling for global fast-food campaigns' },
  { name: 'KFC', category: 'fast-food', description: 'Mouth-watering chicken presentations' },
  { name: 'Mcdonalds', category: 'fast-food', description: 'High-quality food styling for menu launches' },

  // Lebanese Restaurants & Chains
  { name: 'Zaatar W Zeit', category: 'restaurant', description: 'Authentic Lebanese cuisine presentation' },
  { name: 'Roadster', category: 'restaurant', description: 'American diner experience styling' },
  { name: 'Casper & Gambinis', category: 'cafe', description: 'Casual dining and cafe presentations' },
  { name: 'Mayrig', category: 'restaurant', description: 'Armenian cuisine food styling' },
  { name: 'Burj Al Hamam', category: 'restaurant', description: 'Fine Lebanese dining presentations' },

  // Chocolate & Confectionery
  { name: 'Patchi', category: 'chocolate', description: 'Elegant chocolate and confectionery styling' },

  // Ice Cream
  { name: 'Al Saudia Ice Cream', category: 'ice-cream', description: 'Traditional ice cream presentations' },
  { name: 'Hi Cream', category: 'ice-cream', description: 'Artisanal ice cream styling' },
  { name: 'Oh My Gelato', category: 'ice-cream', description: 'Gelato and frozen desserts' },

  // Bakeries
  { name: 'Al Abdallah', category: 'bakery' },
  { name: 'Al Baker', category: 'bakery' },
  { name: 'Al Hallab', category: 'bakery' },
  { name: 'Furn Beaino', category: 'bakery' },
  { name: 'St Georges Bakery', category: 'bakery' },

  // Food Brands
  { name: 'Pepsi', category: 'food-brand', description: 'Beverage photography and styling' },
  { name: 'Maggi', category: 'food-brand', description: 'Food products and recipe styling' },
  { name: 'Castania', category: 'food-brand', description: 'Nuts and snacks presentation' },
  { name: 'President', category: 'food-brand', description: 'Dairy products styling' },
  { name: 'Swiss Butter', category: 'food-brand', description: 'Butter and dairy presentations' },
  { name: 'Truvia', category: 'food-brand', description: 'Sweetener products styling' },
  { name: 'Gulf Soda', category: 'food-brand', description: 'Beverage styling' },
  { name: 'Noor Mayonnaise', category: 'food-brand', description: 'Condiments presentation' },
  { name: 'WonderSpread', category: 'food-brand', description: 'Spread products styling' },

  // Restaurants & Cafes
  { name: 'Al Kanater', category: 'restaurant' },
  { name: 'Al Kazzi', category: 'restaurant' },
  { name: 'Al Massoud', category: 'restaurant' },
  { name: 'Al Mouajanati', category: 'restaurant' },
  { name: 'Amici', category: 'restaurant' },
  { name: 'Amour', category: 'cafe' },
  { name: 'Anthony\'s', category: 'restaurant' },
  { name: 'Antika', category: 'restaurant' },
  { name: 'Aromate', category: 'cafe' },
  { name: 'Arthaus', category: 'cafe' },
  { name: 'Bakerloo', category: 'bakery' },
  { name: 'Barista', category: 'cafe' },
  { name: 'Bartartine', category: 'bakery' },
  { name: 'Billy Boys', category: 'restaurant' },
  { name: 'Bonless', category: 'restaurant' },
  { name: 'Boneless 28', category: 'restaurant' },
  { name: 'Burger Basics', category: 'fast-food' },
  { name: 'Chick N Fish', category: 'fast-food' },
  { name: 'Cibo', category: 'restaurant' },
  { name: 'City Canteen', category: 'restaurant' },
  { name: 'Classic Sandwich', category: 'fast-food' },
  { name: 'Coby Nammoura', category: 'bakery' },
  { name: 'Comfort', category: 'restaurant' },
  { name: 'Cortina', category: 'restaurant' },
  { name: 'Coucou', category: 'restaurant' },
  { name: 'Crunchyz', category: 'fast-food' },
  { name: 'Darina', category: 'restaurant' },
  { name: 'Dipndip', category: 'cafe' },
  { name: 'Diqan El Hachem', category: 'restaurant' },
  { name: 'Earth Goods', category: 'cafe' },
  { name: 'Eddy\'s Street Food', category: 'fast-food' },
  { name: 'El Comandante', category: 'restaurant' },
  { name: 'El Sada', category: 'restaurant' },
  { name: 'French Canteen', category: 'restaurant' },
  { name: 'Frunch Eatery', category: 'restaurant' },
  { name: 'Gro&Greens', category: 'cafe' },
  { name: 'Hajdu', category: 'restaurant' },
  { name: 'Hawa Chicken', category: 'fast-food' },
  { name: 'Husk', category: 'restaurant' },
  { name: 'Insalata', category: 'restaurant' },
  { name: 'Jabbour', category: 'bakery' },
  { name: 'Jif', category: 'fast-food' },
  { name: 'Judi', category: 'restaurant' },
  { name: 'Kalita', category: 'cafe' },
  { name: 'Kammi', category: 'restaurant' },
  { name: 'Sapori', category: 'restaurant' },
  { name: 'Kaval', category: 'restaurant' },
  { name: 'Kinza', category: 'restaurant' },
  { name: 'La pasta', category: 'restaurant' },
  { name: 'Lakkis Farm', category: 'food-brand' },
  { name: 'Maharat Arabia', category: 'restaurant' },
  { name: 'Merchak Al Baher', category: 'restaurant' },
  { name: 'Midnight Munchies', category: 'fast-food' },
  { name: 'Miniguette', category: 'bakery' },
  { name: 'Pick A Poke', category: 'restaurant' },
  { name: 'Pix', category: 'cafe' },
  { name: 'Plein Soliel', category: 'restaurant' },
  { name: 'Poke Bol', category: 'restaurant' },
  { name: 'Promarche', category: 'restaurant' },
  { name: 'Prunelle', category: 'restaurant' },
  { name: 'Puidor', category: 'restaurant' },
  { name: 'Rashat Semsom', category: 'restaurant' },
  { name: 'Richeese', category: 'fast-food' },
  { name: 'Sage&Savvy', category: 'cafe' },
  { name: 'Saj Nation', category: 'fast-food' },
  { name: 'Salata', category: 'restaurant' },
  { name: 'Second House', category: 'cafe' },
  { name: 'Shellelet Nabeh Merched', category: 'restaurant' },
  { name: 'Siblou', category: 'bakery' },
  { name: 'Sitos', category: 'restaurant' },
  { name: 'Smoak', category: 'restaurant' },
  { name: 'Snack Aal Lebnene', category: 'fast-food' },
  { name: 'Souchet', category: 'restaurant' },
  { name: 'Spinneys', category: 'food-brand' },
  { name: 'Stories', category: 'cafe' },
  { name: 'Suabelle', category: 'restaurant' },
  { name: 'Sweet Bar', category: 'bakery' },
  { name: 'Tartina', category: 'bakery' },
  { name: 'The Cask & Barrel', category: 'restaurant' },
  { name: 'Tigers', category: 'fast-food' },
  { name: 'Tom &b Mutz', category: 'restaurant' },
  { name: 'Tony\'s Food', category: 'restaurant' },
  { name: 'Turab', category: 'restaurant' },
  { name: 'Vaia', category: 'restaurant' },
  { name: 'Vape Done', category: 'restaurant' },
  { name: 'Watertown', category: 'cafe' },
  { name: 'Well Miel', category: 'cafe' },
  { name: 'Wingmen', category: 'fast-food' },
  { name: 'Yamama', category: 'restaurant' },
  { name: 'Yaza', category: 'restaurant' },
  { name: 'Yazz', category: 'restaurant' },
  { name: 'Zephyr', category: 'restaurant' },
];

// Helper function to get logo path
export const getClientLogo = (clientName: string): string | null => {
  const client = clients.find(c => c.name === clientName);
  return client?.logo ? `/assets/img/client-logos/${client.logo}` : null;
};

// Helper function to get client by name
export const getClient = (clientName: string): Client | undefined => {
  return clients.find(c => c.name === clientName);
};

// Get all client names
export const getClientNames = (): string[] => {
  return clients.map(c => c.name);
};
