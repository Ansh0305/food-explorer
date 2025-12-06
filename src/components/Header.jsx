import { useCart } from "../context/CartContext.jsx";

export default function Header() {
    const { totalItems } = useCart();

    return (
        <header className="bg-white shadow sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold text-green-600">
                    Food Product Explorer
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Powered by OpenFoodFacts</span>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                        Cart: {totalItems}
                    </span>
                </div>
            </div>
        </header>
    );
}
