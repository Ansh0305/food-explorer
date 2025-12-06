export default function SortControls({
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
}) {
    return (
        <div className="bg-white shadow rounded-lg p-4 flex-1">
            <h2 className="font-semibold mb-2">Sort Products</h2>
            <div className="flex flex-col md:flex-row gap-2">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-3 py-2 outline-none focus:ring"
                >
                    <option value="name">Product name</option>
                    <option value="nutriscore">Nutrition grade</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border rounded px-3 py-2 outline-none focus:ring"
                >
                    <option value="asc">Ascending (A → Z / A → E)</option>
                    <option value="desc">Descending (Z → A / E → A)</option>
                </select>
            </div>
        </div>
    );
}
  