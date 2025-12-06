import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductByBarcode } from "../api/openFoodFacts.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
    const { barcode } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { items, addToCart, removeFromCart } = useCart();

    useEffect(() => {
        async function loadProduct() {
            setLoading(true);
            setError("");
            try {
                const data = await getProductByBarcode(barcode);
                if (data.status === 1) {
                    setProduct(data.product);
                } else {
                    setError("Product not found.");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [barcode]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;
    if (!product) return null;

    const {
        product_name,
        brands,
        image_front_url,
        ingredients_text,
        nutriments = {},
        labels,
        countries,
        allergens,
        nutrition_grades,
        code,
    } = product;

    const inCart = items.some((item) => item.code === code);

    return (
        <div className="bg-white shadow rounded-lg p-4 space-y-4">
            <Link to="/" className="text-sm text-blue-600 hover:underline">
                &larr; Back to products
            </Link>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 flex justify-center">
                    {image_front_url ? (
                        <img
                            src={image_front_url}
                            alt={product_name}
                            className="object-contain max-h-64"
                        />
                    ) : (
                        <div className="h-64 w-full bg-gray-100 flex items-center justify-center text-gray-400">
                            No image
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-2">
                    <h2 className="text-2xl font-bold">{product_name}</h2>
                    {brands && <p className="text-gray-700">Brand: {brands}</p>}
                    {countries && (
                        <p className="text-gray-600 text-sm">Countries: {countries}</p>
                    )}
                    {nutrition_grades && (
                        <p className="text-sm font-semibold">
                            Nutrition grade:{" "}
                            <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700">
                                {nutrition_grades.toUpperCase()}
                            </span>
                        </p>
                    )}
                    {labels && (
                        <p className="text-sm">
                            Labels: <span className="text-gray-700">{labels}</span>
                        </p>
                    )}
                    {allergens && (
                        <p className="text-sm text-red-600">Allergens: {allergens}</p>
                    )}

                    <button
                        onClick={() =>
                            inCart ? removeFromCart(code) : addToCart(product)
                        }
                        className={`mt-3 px-4 py-2 rounded font-semibold text-white ${inCart ? "bg-red-500 hover:bg-red-600" : "bg-orange-500 hover:bg-orange-600"
                            }`}
                    >
                        {inCart ? "Remove from cart" : "Add to cart"}
                    </button>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-1">Ingredients</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                    {ingredients_text || "Ingredients not available."}
                </p>
            </div>

            <div>
                <h3 className="font-semibold mb-1">Nutritional values (per 100g)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <Nutrient label="Energy (kcal)" value={nutriments["energy-kcal_100g"]} />
                    <Nutrient label="Fat (g)" value={nutriments.fat_100g} />
                    <Nutrient
                        label="Saturated fat (g)"
                        value={nutriments["saturated-fat_100g"]}
                    />
                    <Nutrient
                        label="Carbohydrates (g)"
                        value={nutriments.carbohydrates_100g}
                    />
                    <Nutrient label="Sugars (g)" value={nutriments.sugars_100g} />
                    <Nutrient label="Proteins (g)" value={nutriments.proteins_100g} />
                    <Nutrient label="Salt (g)" value={nutriments.salt_100g} />
                    <Nutrient label="Fiber (g)" value={nutriments.fiber_100g} />
                </div>
            </div>
        </div>
    );
}

function Nutrient({ label, value }) {
    return (
        <div className="border rounded px-2 py-1 flex justify-between bg-gray-50">
            <span>{label}</span>
            <span className="font-semibold">{value ?? "-"}</span>
        </div>
    );
}
