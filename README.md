# Food Product Explorer

A responsive React web application that lets users search, filter, sort and explore food products using the **OpenFoodFacts** public API.

> This project is built purely for evaluation/learning purposes.  
> It does not use or reference any production systems or brand code.

---

## 🔍 Features (Mapping to Assignment)

### 1. Homepage – Product Listing
- Fetches products from **OpenFoodFacts** by category.
- Displays key information for each product:
  - Product name  
  - Image  
  - Category  
  - Ingredients (when available)  
  - Nutrition grade (A–E)  
- Products are shown in a responsive grid layout.

### 2. Search by Product Name
- Search bar on the homepage.
- Filters products by name using the endpoint:  
  `https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&json=true`
- Works together with category filter and sorting.

### 3. Search by Barcode
- Separate barcode search input.
- Uses the API:  
  `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`
- If found, shows that single product in the list.  
- If not found, displays a user-friendly “Product not found” message.

### 4. Category Filter
- Category dropdown on the homepage.
- Default examples: **Snacks, Beverages, Dairy**.
- Dynamically fetches additional categories from:  
  `https://world.openfoodfacts.org/categories.json`
- Uses category endpoint to fetch products:
  `https://world.openfoodfacts.org/category/{category}.json`

### 5. Sort Functionality
- Sort dropdowns for:
  - **Product name** (A–Z, Z–A)
  - **Nutrition grade** (ascending / descending)
- Sorting is done **client-side** for performance and flexibility.

### 6. Product Detail Page
- Clicking a product opens a detail page route: `/product/:barcode`.
- Detail page displays:
  - Larger product image  
  - Full product name and brand  
  - Full ingredients text  
  - Nutritional values (per 100g):
    - Energy (kcal), Fat, Saturated fat, Carbohydrates, Sugars, Proteins, Salt, Fiber  
  - Labels (e.g. vegan, gluten-free, etc)  
  - Allergens (if available)

### 7. Pagination – “Load More”
- Implements **“Load more” pagination** instead of classic page numbers.
- Initially loads the first page of products.
- Clicking **Load more**:
  - Fetches the next page from API.
  - Appends products to the existing list (infinite-like experience).
- Shows how many products are currently displayed vs total count.

### 8. Bonus – Cart Functionality with Global State
- Implements a simple **Cart** using **React Context API**:
  - Global `CartContext` wrapping the app.
  - `Add to cart` / `Remove from cart` button on the product detail page.
  - Cart badge in the header showing the **total number of items**.
- Demonstrates state management for application-wide data (global store behaviour).

---

## 🧠 Tech Stack

- **Front-end:** React + Vite
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management (Bonus):** React Context API (for cart)

---

## 🗂 Project Structure

```bash
src/
  api/
    openFoodFacts.js        # All API calls to OpenFoodFacts
  components/
    Header.jsx              # Top bar with title + cart count
    ProductCard.jsx         # Single product card in grid
    Filters.jsx             # Category filter dropdown
    SortControls.jsx        # Sort by name / nutrition grade
    LoadMore.jsx            # "Load more" pagination component
  context/
    CartContext.jsx         # Global cart state using React Context
  pages/
    Home.jsx                # Homepage: listing, search, filters, sort, load more
    ProductDetail.jsx       # Detailed view for a single product
  App.jsx                   # Routes and layout
  main.jsx                  # React entry point
  index.css                 # Tailwind setup + base styles
