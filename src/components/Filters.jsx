export default function Filters({
    categories,
    selectedCategory,
    onCategoryChange,
}) {
    return (
        <div className="bg-white shadow rounded-lg p-4 w-full md:w-1/2 lg:w-1/3">
            <h2 className="font-semibold mb-2">Filter by Category</h2>
            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none focus:ring"
            >
                {/* Some useful defaults */}
                <option value="snacks">Snacks</option>
                <option value="beverages">Beverages</option>
                <option value="dairies">Dairy</option>

                {/* Dynamic categories from API */}
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name || cat.id}
                    </option>
                ))}
            </select>
        </div>
    );
}
  