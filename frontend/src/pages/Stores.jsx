import React from "react";
import { stores } from "../data/stores";

export const Stores = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Stores</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((s) => (
            <article
              key={s._id}
              className="bg-card rounded-lg overflow-hidden shadow-sm"
            >
              <div className="h-36 bg-secondary overflow-hidden flex items-center justify-center">
                {s.bannerUrl ? (
                  <img
                    src={s.bannerUrl}
                    alt={s.storeName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-card-foreground">No banner</div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={s.logoUrl}
                    alt={s.storeName}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-card-foreground">
                      {s.storeName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Rating:{" "}
                    <strong className="text-primary">
                      {s.rating?.average ?? "—"}
                    </strong>{" "}
                    ({s.rating?.count ?? 0})
                  </div>
                  <div>
                    <a
                      className="icon-button-primary px-3 py-1 rounded-md"
                      href={`/${s.slug}`}
                    >
                      Visit
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stores;
