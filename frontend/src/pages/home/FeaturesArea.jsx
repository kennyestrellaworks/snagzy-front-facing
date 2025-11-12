import { features } from "../../data/system";

export const FeaturesArea = () => {
  return (
    <section className="relative bg-white-full text-foreground pt-20 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-4 min-h-[300px] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 h-full flex flex-col items-center text-center border border-slate-100 hover:-translate-y-2">
                  {/* Icon Container */}
                  <div
                    className={`${item.bgColor} rounded-2xl p-4 mb-6 relative overflow-hidden group-hover:rotate-3 transition-transform duration-300`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <Icon
                      className={`w-8 h-8 ${item.iconColor} relative z-10`}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative element */}
                  <div
                    className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
