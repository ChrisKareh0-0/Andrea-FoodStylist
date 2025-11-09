const fs = require('fs');
const path = require('path');

// All keywords from your list
const keywordLines = `TVC, Videography, Chicken, Poultry, Fast Food, Restaurant, Storytelling
Social Media, Photography, Setup, Atayef, Dumplings, Maamoul, Product, Model
Social Media, Photography, On White, Isolated, Product, Ice Cream, Summer
Social Media, Photography, On White, Isolated, Product, Nuts, Mixed Nuts, Peanuts, Almond, Macademia, Walnut, Cashew
Social Media, Photography, Setup, Grill, Grilled Meat, Grilled Chicken, Meat, Chicken, Sandwich, Burger, Lebanese Cuisine, Menu Shoot
Social Media, Photography, Setup, Christmas, Pastry, Mouajanat
Social Media, Photography, Setup, Menu Shoot, Pastry, Mouajanat, Croissant, Pizza, Manakish, Donuts
TVC, Videography, Product, Ice Cream, Summer
Social Media, Photography, Setup, Menu Shoot, Isolated, Chocolate, Chocolate Syrup, Bonbons
Social Media, Videography, Product, Cheese, Cheese Wheel, Cheese Sandwich
Social Media, Photography, Setup, Menu Shoot, Fast Food, Industrial, Burger, Sandwich, Salad, Appetizers, Fries
Social Media, Photography, Lifestyle Shoot, Fine Dining, Sushi, Asian, Pizza Burger, Bar, Drinks, Model
Social Media, Photography, Setup, Product Shoot, Isolated, Colors, Mayonnaise, Mustard, Ketchup, Chilly, Sandwich, Spoon, Sauces
TVC, Videography, Chef, Product Shoot, Isolated, Colors, Mayonnaise, Mustard, Ketchup, Chilly, Sandwich, Spoon, Sauces, Salad
Social Media, Photography, Lifestyle Shoot, Fine Dining, Bar, Drinks, Mediterranean Cuisine
Social Media, Photography, Setup, Menu Shoot, Isolated, Colors, Desserts, Cakes, Slice, Cookie, Brownie, Tiramisu, Donuts, Coffee, Packaging, Lifestyle
Social Media, Photography, Setup, Product Shoot, Isolated, Colors, Coffee, Foam, Coffee Machine, Lifestyle
Social Media, Photography, Menu Shoot, Lifestyle, Packaging, Sandwich, Rolls, Salads, Pizza, Salmon, Desserts, Breakfast
Social Media, Photography, Setup, Menu Shoot, Fast Food, Burger, Sandwich, Salad, Appetizers, Fries, Desserts
Social Media, Photography, Setup, Lifestyle Shoot, Fast Food, Industrial, Burger, Sandwich, Boneless Chicken, Wings, Appetizers, Fries
Social Media, Photography, Setup, Menu Shoot, Fast Food, Industrial, Burger, Sandwich, Boneless Chicken, Wings, Appetizers, Fries, Packaging
Social Media, Photography, Setup, Menu Shoot, Fast Food, Burger, Sandwich, Boneless Chicken, Wings, Appetizers, Salads, Fries, Packaging
Social Media, Photography, Setup, Menu Shoot, Fast Food, Burger, Appetizers, Fries
Social Media, Photography, Setup, Lifestyle Shoot, Fast Food, Burger, Appetizers, Fries, Colors, Model
TVC, Videography, Fast Food, Chicken, Beef, Fries, VS
Social Media, Photography, Lifestyle Shoot, Fast Food, Chicken, Beef, Burger, Appetizers, Fries, Model
TVC, Videography, Food, Sea Food, Fish
Social Media, Photography, Lifestyle Shoot, Model, Fine Dining, Appetizers, Burger, Sandwich, Bar, Drinks
Social Media, Photography, Product, Nuts, Mixed Nuts, Christmas
Social Media, Photography, Lifestyle Shoot, Product, Nuts, Mixed Nuts, Peanuts, Almond, Macademia, Walnut, Cashew, Nuts Bar
Social Media, Photography, Setup, Menu Shoot, Fast Food, Burger, Sandwich, Toast Burger, Chicken, Wings, Appetizers, Fries, Salads, Desserts
Social Media, Photography, Setup, Menu Shoot, Pasta, Sandwiches, Salad
Social Media, Photography, Setup, Menu Shoot, Sandwiches, Salad
Social Media, Videography, Product, Cleaning Product, Vanilla, Orange Fresh, Laundry Detergent
Social Media, Photography, Isolated, Lifestyle Shoot, Product, Ice Cream, Summer, Model
Social Media, Videography, Product, Chicken, Frozen Chicken, Frozen Food
Social Media, Photography, Setup, Menu Shoot, Isolated, Fast Food, Burger, Sandwich, Chicken, Cheese, Appetizers, Fries, Model
Social Media, Videography, Product, Juice, Instant Drink, Flavours, Orange, Blackberry, Mango, Lemon, Ice Tea
Social Media, Photography, Setup, MoodShots, Desserts, Sweets, Chocolate, IceCream, Crepe, Waffle, Coffee, Milkshake
Social Media, Photography, Plat Du Jour, Grilled Meat, Grilled Chicken, Meat, Chicken, Shawarma, Sandwich, Cocktail Juice, Lebanese Cuisine
Social Media, Photography, Product, Set Up, Isolated Shoot, Milk, Beans, Eggs, Spread, Peanut Butter, Organic, Nuts, Pancake Mix, Pasta, Flower, Butter
Social Media, Photography, Setup, Menu Shoot, Isolated Shoot, Milk, Beans, Eggs, Spread, Peanut Butter, Organic, Nuts, Pancake Mix, Pasta, Flower, Butter
Social Media, Photography, Setup, Menu Shoot, Industrial, Sandwiches, Fast Food, Fries, MacnCheese, Chicken
Social Media, Photography, Lifestyle Shoot, Model, Appetizers, Salads, Sandwich
Social Media, Photography, Product, Soap, Shower Gel, Liquid Hand Wash, Exotic, Tropical, Rose, Milk, Honey, Coconut, Mango, Mint, Lime, Pine
Social Media, Photography, Setup, Menu Shoot, Sanwich, Mankoushe, Lebanese Cuisine
Social Media, Videography, Closeups, Burger, Beef, Chicken, Salmon, Sandwich
Social Media, Photography, Setup, Menu Shoot, Industrial, Sandwiches, Fast Food, Salad, Chicken, Fries, Wings, Burger, Sandwich, Beef, Salmon, Desserts, Kids Menu
Social Media, Photography, Christmas, Setup, Mankoushe, Dough, Wraps, Pizza, Salad, Fries, Chicken, Pasta, Appetizers, Desserts, Cake, Lebanese Cuisine
Social Media, Photography, Setup, Menu Shoot, Mankoushe, Dough, Wraps, Pizza, Salad, Fries, Chicken, Pasta, Appetizers, Lebanese Cuisine
Social Media, Photography, Setup, Flags, Wraps, Salad, Wings, Mankoushe, Fries, Appetizers, Cake
Social Media, Photography, Setup, Menu Shoot, Mankoushe, Dough, Wraps, Pizza, Salad, Fries, Chicken, Appetizers, Desserts, Lebanese Cuisine
Social Media, Photography, Setup, Lifestyle, Model, Mankoushe, Dough, Wraps, Pizza, Salad, Fries, Chicken, Pasta, Appetizers, Desserts, Lebanese Cuisine
Social Media, Photography, Summer, Lifestyle, Model, Mankoushe, Dough, Wraps, Pizza, Salad, Fries, Chicken, Pasta, Appetizers, Desserts, Juice, Lebanese Cuisine
Social Media, Photography, Product, Labneh, Cheese, Laban, Yogurt, Halloum, Double Creme, Shanklish, Goat Cheese, Kashkaval Goat, Cheese Wheel
Social Media, Photography, Healthy Meals, Salads, Healthy Desserts, Healthy Appetizers, Labneh, Hommus, Dips, Potato, Sandwiches, Wraps
Social Media, Photography, Product, Soda, Sparkles, Machine, Fruits
Social Media, Photography, Product, Cheese, Chees Cubes, Halloum, Burger Cheese, Labneh, Kashkawan
Social Media, Photography, Setup, Menu Shoot, Salad, Burger, Chicken, Wings, Tenders
Social Media, Photography, Isolated, Menu Shoot, Crepe, Chocolate, Oreo, Lotus, Kinder, Ice Cream, Strawberry, Mango, Vanilla, Shakes, Caramel, Vanilla, Smoothies, Coconut
Social Media, Photography, Menu Shoot, Burger, Sandwich, Chicken, Tenders
Social Media, Photography, Isolated, Menu Shoot, Salad, Sandwich, Healthy
Social Media, Photography, Isolated, Menu Shoot, Sandwich, Hommus, Nkhaat, Kraain, Grilled Meat, Salad, Lebanese Cuisine
TVC, Videography, Product, Cleaning Product, Dishwash, Stains, Dirty Dishes, Power Of Nature
Social Media, Photography, Isolated On Color, Jam, Strawberry, Blackberry, Orange, Red Pepper, Vinegar, Apple, Syrup, Apricot, Spices, Mouneh
Social Media, Photography, Lifestyle, Lebanese Cuisine, Beef, Tabbouleh, Mouajanat, Mtabal, Fattoush, Salad, Grilled Meat, Falafel, Drinks, Arabic Sweets, Desserts
Social Media, Photography, Lifestyle, Asian Cuisine, Sushi, Asian Salad
Social Media, Photography, Lifestyle, Asian Cuisine, Sushi, Asian Salad, Christmas
Social Media, Photography, Product, Labneh, Cheese, Laban, Yogurt, Halloum, Double Creme, Shanklish, Goat Cheese, Kashkaval Goat, Cheese Wheel
TVC, Videography, Kentucky Fried Chicken, Chicken, Wrap, Cheesy Wrap
Social Media, Photography, Videography, Kentucky Fried Chicken, Chicken, Cheetos, Crunchy Cheese, Crunchiness, ASMR
Social Media, Photography, Product, Drink, Soft Drinks, Cola, Soda, Lemon, Orange
Social Media, Photography, Isolated On Color, Lifestyle, Italian Cuisine, Pasta
Social Media, Photography, Set Up, Menu Shoot, Lifestyle, Italian Cuisine, Pasta, Pizza, Salad, MacnCheese
Social Media, Photography, Lifestyle, Lebanese Cuisine, Christmas, Chicken, Salad, Pastry, Mouajanat, Rosto, Fish, Chicken & Rice
TVC, Videography, Chicken Bruth, Vegetable Bruth, Flavor
Social Media, Photography, Videography, Arabic Cuisine, Arabic Sweets, Chef, Cooking Series, Recipes
Social Media, Photography, Set Up, Menu Shoot, Lebanese Cuisine, Beef, Chicken, Salads, Appetizers, Mtabal, Fattoush, Salad, Cold Mezze, Hot Mezze, Grilled Meat, Bar Tapas, Desserts
TVC, Videography, Delivery, Burger, Fries, Drink, Meal, Cashless
Social Media, Photography, Lifestyle, Lebanese Cuisine, Sea food Menu, Salad, Lebanese Mezze, Appetizers, Octupus, Arabic Sweets, Arabic Desserts
Social Media, Photography, Lifestyle, Fast Food, Wrap, Burger, Beef, Chicken, Nachos, Appetizers
Social Media, Photography, Set Up, Menu Shoot, Fast Food, Wrap, Burger, Beef, Chicken, Nachos, Appetizers
Social Media, Photography, Set Up, Menu Shoot, Salad, Sandwich, Burger, Beef, Chicken, Appetizers
Social Media, Photographyh, TVC, Videography, Mayonnaise, Chilli, Garlic, Pepper
Social Media, Photography, Lifestyle, Christmas, Cake, Buche, Cake Pops, Ice Cream, Ice Cream Sandwich
Social Media, Photography, Setup, Menu Shoot, Isolated, Chocolate, Bonbon, Pistachio, Strawberry, Dragon Fruit, Vanilla, Bonbon Box
Social Media, Photographyh, TVC, Videography, Product, Reusable Glass Bottle, Cap Prizes, Soft Drink
Social Media, Photography, Lifestyle, Appetizers, Edamame, Salads, Poke Bowl, Asian Cuisine, Burger
Social Media, Photography, Setup, Product Shoot, Isolated, Gum, Candies, Cherry, Menthol, Spearmint, Model, Game Set, Office Set, Football, Gym, Luggage
TVC, Videography, Mayonnaise
TVC, Videography, Butter, Recipe, Maamoul
Social Media, Photography, Lifestyle, Appetizers, Edamame, Salads, Poke Bowl, Asian Cuisine, Model
TVC, Videography, Product, Cheese, Cheese Pull, Pizza, Mozzarella, Cheddar
Social Media, Videography, Supermarket, Aisle, Cheese
Social Media, Videography, Supermarket, Aisle, Vegetables, Lettuce, Greenery
Social Media, Photography, Setup, Menu Shoot, Isolated, Black Set, Drink, Juice, Milkshake, Croissant, Salad, Dessert, Sandwich
TVC, Videography, Product, Sauce, Pasta Sauce, Ceasar Sauce, Chips Dip, Pizza Sauce, Ketchup, Mayonnaise
Social Media, Photography, Setup, Menu Shoot, Mankoushe, Dough, Pastry, Bakery, Lebanese Cuisine
Social Media, Photography, Setup, Menu Shoot, Fast Food, Macncheese, Salad, Chicken, Fries, Wings, Burger, Sandwich, Beef
Social Media, Photography, TVC, Videography, Summer, Lifestyle, Model, Wrap, Salad, Fries, Chicken, Beef
Social Media, Photography, Set Up, Menu Shoot, Pasta, Salad, Fajitas, Noodles, Dessert
Social Media, Photography, Setup, Menu Shoot, Mankoushe, Dough, Pastry, Bakery, Wrap, Soujouk, Chicken, Ham, Turkey, Thyme, Chocolate, Labneh
Social Media, Photography, Setup, Menu Shoot, Salad, Potatao, Healthy, Dessert, Browni
Social Media, Photography, Lifestyle, Table, Soup, Salad, Pasta, Pizza, Pasta Making, Bread
TVC, Videography, Product, Beans, Spices
Social Media, Photography, Lifestyle, Table, Lebanese Cuisine, Mezze, Grilled Meat, Grilled Chicken, Meat, Chicken, Shawarma, Moutabal
TVC, Videography, Product, Chicken, Frozen Chicken, Frozen Food
TVC, Videography, Product, Chips, Dip, Basketball Ad, Salsa Dip, Cheese Chips, Barbecue Chips
Social Media, Photography, Setup, Menu Shoot, Beef, Steak, Burger, Chicken, Barbecue
Social Media, Photography, Setup, Menu Shoot, Fast Food, Burger, Sandwich, Appetizer, Salad, Ramadan, Soup
Social Media, Photography, Setup, Isolated, Chocolate, Milk, Dark Chocolate, Chocolate Box, Christmas
TVC, Videography, Supermarket, Anniversary, Customer Experience
Social Media, Photography, Branding, Billboard, Fresh, Bold, Lettuce, Fish, Alcoholic Beverages, Beef, Bread
TVC, Videography, Supermarket, Healthy Lifestyle, Fruits
Social Media, Photography, Setup, Menu Shoot, Bakery, Cookies, Arabic Pastries, Kaak, Rice Pop
Social Media, Photography, Lifestyle, Coffeeshop, Coffee, Dessert, Breakfast, Cake, Sandwich
Social Media, Photography, Setup, Product Shoot, Hair Care, Shampoo, Conditioner, Leave In Conditioner, Art Direction
Social Media, Photography, Setup, Menu Shoot, Halloween, Cookie, Cupcake, Cake, Croissant
Social Media, Photography, Setup, Menu Shoot, Sweets, Crepe, Dessert, Cake, Chocolat Mou, Ice Cream, Kaak, Pizza Kaake, Cheese Kaake, Chocolate Kaake
TVC, Videography, Restaurant, New Opening
TVC, Videography, Cheese, Flavors, Rosemary, Olive, Oregano, Garlic, Basketball
Social Media, Photography, Lifestyle, Fine Dining, Alcoholic Beverage, Sea Food, Salmon, Pasta, Salad, Sandwich, Tacos, Dessert, Coffee
Social Media, Photography, Setup, Menu Shoot, Fast Food, Sandwich, Burger
Social Media, Photography, Lifestyle, Italian Cuisine, Fine Dining, Pasta, Pizza, Salad, Dough
Social Media, Photography, Setup, Product Shoot, Lifestyle, Lebanese Cuisine, Frozen Food, Dough, Pastry, Spring Rolls, Meat Kibbeh, Sambousek, Cheese Rolls, Chich Barak, Beans, Model, Dessert
Social Media, Photography, Setup, Product Shoot, Healthy, Stevia
Social Media, Photography, Setup, Product Shoot, Red Pepper Paste, Rose Water, Olive Oil, Jam, Pickles, Spices
Social Media, Photography, Lifestyle, Summer, International Cuisine
Social Media, Photography, Setup, Product Shoot, Vape, Smoke, Mint, Berry, Strawberry, Grape, Blueberry, Watermelon, Apple, Melon
Social Media, Photography, Setup, Menu Shoot, Smoothie, Strawberry, Coffee, Banana, Chocolate, Peach, Mango, Pineapple
Social Media, Photography, Setup, Product Shoot, Honey
Social Media, Photography, Setup, Menu Shoot, Fast Food, Burger, Wings, Cheese Balls, Corn
TVC, Videography, Chocolate Spread, Chocolate, Hazelnut
Social Media, Photography, Lifestyle, Italian Cuisine, Pizza
Social Media, Photography, Product, Lifestyle, Labneh, Chili, Zaatar, Olive Oil
Social Media, Photography, Product, Packaging, On White, Labneh, Chili, Zaatar, Olive Oil
Social Media, Photography, Lifestyle, Fine Dining, Alcoholic Beverage, Salad, Salmon, Burger
Social Media, Photography, Setup, Menu Shoot, Dessert, Sweets
Social Media, Photography, Setup, Menu Shoot, Model, Wrap, Chicken, Soujouk, Beef, Halloum
Social Media, Photography, TVC, Videography, Customers, Audience
TVC, Videography, Basketball, Snap & Win, Competition
Social Media, Photography, Setup, Menu Shoot, Wrap, Burger, Soujouk, Burrito, Ranch Chicken, Kabab, Halloumi, Garlic Chicken
Social Media, Photography, Lifestyle, Fine Dining, Alcoholic Beverage, Skewer, Salad, Sushi, Beef, Steak, Chicken, Salmon`;

// Parse all keywords
const allKeywords = new Set();
keywordLines.split('\n').forEach(line => {
  line.split(',').forEach(keyword => {
    const trimmed = keyword.trim();
    if (trimmed) {
      allKeywords.add(trimmed);
    }
  });
});

// Convert to array and sort
const uniqueKeywords = Array.from(allKeywords).sort();

// Create categories array
const categories = uniqueKeywords.map(keyword => ({
  id: keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  label: keyword
}));

// Read existing categories
const categoriesPath = path.join(__dirname, 'data', 'categories.json');
let existingData = { categories: [] };
try {
  existingData = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
} catch (err) {
  // File might not exist
}

// Merge with existing (avoid duplicates)
const existingIds = new Set(existingData.categories.map(c => c.id));
const newCategories = categories.filter(c => !existingIds.has(c.id));

const finalCategories = [...existingData.categories, ...newCategories];

// Write back
fs.writeFileSync(
  categoriesPath,
  JSON.stringify({ categories: finalCategories }, null, 2),
  'utf-8'
);

console.log(`✅ Added ${newCategories.length} new categories`);
console.log(`📊 Total categories: ${finalCategories.length}`);
console.log('\nNew categories added:');
newCategories.slice(0, 20).forEach(c => console.log(`  - ${c.label} (${c.id})`));
if (newCategories.length > 20) {
  console.log(`  ... and ${newCategories.length - 20} more`);
}
