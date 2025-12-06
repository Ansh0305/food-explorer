export default function LoadMore({ page, pageSize, totalCount, onLoadMore }) {
    if (!totalCount) return null;

    const shown = Math.min(page * pageSize, totalCount);
    const hasMore = shown < totalCount;

    return (
        <div className="flex flex-col items-center gap-2 mt-4 text-sm">
            <span>
                Showing {shown} of {totalCount} products
            </span>
            {hasMore && (
                <button
                    onClick={onLoadMore}
                    className="px-4 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-black"
                >
                    Load more
                </button>
            )}
            {!hasMore && (
                <span className="text-gray-400 text-xs">No more products to load.</span>
            )}
        </div>
    );
}
  