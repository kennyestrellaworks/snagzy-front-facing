import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineStar } from "react-icons/md";
import { useData } from "../context/DataContext";

export const StoreProfileCard = ({ stores }) => {
  const { getUserData } = useData();
  return (
    <div className="grid md:grid-cols-4 mt-12 gap-2 items-center">
      {stores.map((item, index) => {
        const user = getUserData(item.ownerId);
        // console.log("user", user);
        // console.log("item.ownerId", item.ownerId);

        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg h-[470px] bg-card border hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="h-32 w-full flex-shrink-0">
              <img
                className="object-cover w-full h-full"
                src={item.bannerUrl}
                alt={`${item.bannerUrl} Cover`}
              />
            </div>

            <div className="flex-1 p-6 pt-0 flex flex-col">
              <div className="flex justify-center -mt-14 mb-4 flex-shrink-0">
                <img
                  className="h-24 w-24 object-cover rounded-full border-4 border-white shadow-lg"
                  src={item.logoUrl}
                  alt={`${item.logoUrl} Profile`}
                />
              </div>

              <div className="text-center overflow-y-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                  {item.storeName}
                </h2>
                <div className="flex justify-center items-center gap-2 mb-2">
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600">
                    {`${user.firstName} ${user.lastName}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 my-3"></div>
                <p className="text-gray-600 text-sm mb-4 italic">
                  "{item.description}"
                </p>
                <div className="flex justify-center items-center text-sm font-semibold mb-6">
                  <div className="flex items-center gap-1">
                    <MdOutlineStar
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-yellow-400 text-yellow-400 w-4 h-4"
                    />
                    <span>4.8</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground ml-3">
                    <BsBoxSeam className="text-slate-600" />
                    <span>156</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex-shrink-0">
              <button
                data-slot="button"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out shadow-md"
              >
                Visit Store
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
