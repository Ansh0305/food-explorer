import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const {
        product_name,
        brands,
        image_front_small_url,
        categories,
        ingredients_text,
        nutrition_grades,
        code,
    } = product;

    return (
        <Link
            to={`/product/${code}`}
            className="block border rounded-lg overflow-hidden bg-white hover:shadow-md transition"
        >
            <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                {image_front_small_url ? (
                    <img
                        src={image_front_small_url}
                        alt={product_name}
                        className="object-contain h-full w-full"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                )}
            </div>
            <div className="p-3 space-y-1">
                <h3 className="font-semibold line-clamp-2">
                    {product_name || "Unnamed product"}
                </h3>
                {brands && (
                    <p className="text-xs text-gray-500">Brand: {brands}</p>
                )}
                {categories && (
                    <p className="text-xs text-gray-500 line-clamp-1">
                        Category: {categories.split(",")[0]}
                    </p>
                )}
                {ingredients_text && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                        Ingredients: {ingredients_text}
                    </p>
                )}
                {nutrition_grades && (
                    <span className="inline-block mt-1 text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700">
                        Nutrition grade: {nutrition_grades.toUpperCase()}
                    </span>
                )}
            </div>
        </Link>
    );
}
