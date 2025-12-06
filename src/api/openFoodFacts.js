import axios from "axios";

const BASE_URL = "https://world.openfoodfacts.org";

// Search products by name (optionally filter by category)
export async function searchProductsByName({
  query,
  page = 1,
  pageSize = 20,
  category,
}) {
  const params = {
    search_terms: query,
    search_simple: 1,
    action: "process",
    json: 1,
    page,
    page_size: pageSize,
  };

  if (category) {
    params.tagtype_0 = "categories";
    params.tag_contains_0 = "contains";
    params.tag_0 = category;
  }

  const res = await axios.get(`${BASE_URL}/cgi/search.pl`, { params });
  return res.data; // { products, count, page, page_size }
}

// Get list of categories
export async function fetchCategories() {
  const res = await axios.get(`${BASE_URL}/categories.json`);
  return res.data.tags || [];
}

// Get products by category (for default listing)
export async function getProductsByCategory({
  category = "snacks",
  page = 1,
  pageSize = 20,
}) {
  const res = await axios.get(
    `https://world.openfoodfacts.org/category/${encodeURIComponent(category)}.json`,
    {
      params: {
        page,
        page_size: pageSize,
        // ask only for the fields we actually use → faster
        fields: "product_name,brands,image_front_small_url,categories,ingredients_text,nutrition_grades,code",
      },
      timeout: 10000, // 10s timeout so it won't hang forever
    }
  );
  return res.data; // { products, count, page, page_size }
}

// Get single product by barcode
export async function getProductByBarcode(barcode) {
  const res = await axios.get(`${BASE_URL}/api/v0/product/${barcode}.json`);
  return res.data; // { status, product }
}
