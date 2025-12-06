import { useEffect, useState } from "react";
import {
  searchProductsByName,
  fetchCategories,
  getProductsByCategory,
  getProductByBarcode,
} from "../api/openFoodFacts.js";
import ProductCard from "../components/ProductCard.jsx";
import Filters from "../components/Filters.jsx";
import SortControls from "../components/SortControls.jsx";
import LoadMore from "../components/LoadMore.jsx";

function sortProducts(list, sortBy, sortOrder) {
  const sorted = [...list];

  if (sortBy === "name") {
    sorted.sort((a, b) => {
      const n1 = (a.product_name || "").toLowerCase();
      const n2 = (b.product_name || "").toLowerCase();
      if (n1 < n2) return sortOrder === "asc" ? -1 : 1;
      if (n1 > n2) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  } else if (sortBy === "nutriscore") {
    const orderFactor = sortOrder === "asc" ? 1 : -1;
    const gradeVal = (g) => {
      if (!g) return 999;
      return g.toLowerCase().charCodeAt(0); // a < b < c...
    };
    sorted.sort(
      (a, b) => orderFactor * (gradeVal(a.nutrition_grades) - gradeVal(b.nutrition_grades))
    );
  }

  return sorted;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [barcodeQuery, setBarcodeQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("snacks");
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load categories once
  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await fetchCategories();
        setCategories(cats.slice(0, 50));
      } catch (err) {
        console.error(err);
      }
    }
    loadCategories();
  }, []);

  // Load products when page / filters / search change
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        let data;

        if (nameQuery) {
          data = await searchProductsByName({
            query: nameQuery,
            page,
            pageSize,
            category: selectedCategory,
          });
        } else {
          data = await getProductsByCategory({
            category: selectedCategory,
            page,
            pageSize,
          });
        }

        const pageProducts = data.products || [];
        const total = data.count || 0;
        setTotalCount(total);

        setProducts((prev) => {
          const merged = page === 1 ? pageProducts : [...prev, ...pageProducts];
          return sortProducts(merged, sortBy, sortOrder);
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page, selectedCategory, sortBy, sortOrder, nameQuery, pageSize]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setProducts([]);
    setNameQuery(nameInput.trim());
  };

  const handleBarcodeSubmit = async (e) => {
    e.preventDefault();
    if (!barcodeQuery.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await getProductByBarcode(barcodeQuery.trim());
      if (data.status === 1) {
        setProducts([data.product]);
        setTotalCount(1);
      } else {
        setProducts([]);
        setTotalCount(0);
        setError("Product not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product by barcode.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setPage(1);
    setProducts([]);
    setNameQuery("");
    setNameInput("");
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      {/* Search + Barcode section */}
      <section className="bg-white shadow rounded-lg p-4 space-y-3">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row gap-2"
        >
          <input
            type="text"
            placeholder="Search by product name..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2 outline-none focus:ring"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white font-semibold"
          >
            Search
          </button>
        </form>

        <form
          onSubmit={handleBarcodeSubmit}
          className="flex flex-col md:flex-row gap-2"
        >
          <input
            type="text"
            placeholder="Search by barcode..."
            value={barcodeQuery}
            onChange={(e) => setBarcodeQuery(e.target.value)}
            className="flex-1 border rounded px-3 py-2 outline-none focus:ring"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold"
          >
            Search by Barcode
          </button>
        </form>
      </section>

      {/* Filters + Sort */}
      <section className="flex flex-col md:flex-row gap-4 items-start">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <SortControls
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />
      </section>

      {/* Products list */}
      <section className="bg-white shadow rounded-lg p-4">
        {loading && (
          <p className="text-center text-gray-500">
            {page === 1 ? "Loading products..." : "Loading more products..."}
          </p>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500">No products to display.</p>
        )}

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id || product._id || product.code}
              product={product}
            />
          ))}
        </div>

        <LoadMore
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          onLoadMore={handleLoadMore}
        />
      </section>
    </div>
  );
}
