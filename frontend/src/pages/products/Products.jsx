import { useMemo } from "react";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { TiStar } from "react-icons/ti";
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // query params: q (search text), category (category slug)
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const filtered = useMemo(() => {
    let list = products.slice();

    if (q) {
      const ql = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(ql) ||
          p.description.toLowerCase().includes(ql) ||
          (p.slug && p.slug.toLowerCase().includes(ql))
      );
    }

    if (category) {
      // category is a slug — find its _id
      const cat = categories.find((c) => c.slug === category);
      if (cat) {
        list = list.filter((p) => p.categories?.includes(cat._id));
      } else {
        // if slug unknown, no results
        list = [];
      }
    }

    return list;
  }, [q, category]);

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams);
    if (!value) params.delete(key);
    else params.set(key, value);
    // update URL without reloading
    setSearchParams(params);
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Products
        </h2>

        {/* Filters: search + category */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              aria-label="Search products"
              placeholder="Search products..."
              value={q}
              onChange={(e) => updateParam("q", e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-md navbar-search-input"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={category}
              onChange={(e) => updateParam("category", e.target.value)}
              className="px-3 py-2 rounded-md navbar-search-input"
            >
              <option value="">All categories</option>
              {categories
                .filter((c) => c.isActive)
                .map((c) => (
                  <option key={c._id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
            </select>
            {q || category ? (
              <button
                onClick={() => {
                  setSearchParams({});
                }}
                className="px-3 py-2 rounded-md icon-button-primary"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-muted-foreground">
              No products found.
            </div>
          ) : (
            filtered.map((p) => (
              <article
                key={p._id}
                className="bg-card rounded-lg overflow-hidden shadow-sm transition-colors duration-200"
              >
                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                  <img
                    src={p.gallery?.[0]}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 text-card-foreground">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {p.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        ${p.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {p.stock} in stock
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="icon-button-primary px-3 py-1 rounded-md">
                        Buy
                      </button>
                      <button className="icon-button-primary-outline px-2 py-1 rounded-md">
                        <TiStar className="inline-block align-middle" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
