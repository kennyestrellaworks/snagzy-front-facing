import { Link } from "react-router-dom";
import {
  socialLinks,
  footerCompanyLinks,
  footerCustomerServiceLinks,
  footerHelpLinks,
} from "../data/system";
import { useData } from "../context/DataContext";
import { SubscribeInput } from "./SubscribeInput";
import logo from "../assets/images/logo.svg";
import appIcon from "../assets/images/app-icon.svg";
import appStoreButton from "../assets/images/app-store-button.svg";
import googlePlayButton from "../assets/images/google-play-button.svg";

export const Footer = () => {
  const { getTopLevelCategories } = useData();
  // console.log("getTopLevelCategories", getTopLevelCategories);

  return (
    <section className="relative hero-section text-foreground py-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Flex  */}
        <div className="flex gap-4">
          <div className="box-1 p-4 text-center text-md w-1/3">
            <div className="flex items-center gap-6">
              <Link to="/">
                <img src={logo} alt="Snagzy logo" className="h-[2rem]" />
              </Link>
            </div>
            <p className="text-slate-800 mb-4 mt-4">
              Snagzy is a versatile and scalable e-commerce platform designed
              for modern retail. Its core strength lies in its multi-store
              capability, allowing users to launch, manage, and scale several
              independent online storefronts from a single, centralized
              administration panel.
            </p>
            <div className="flex gap-4 items-center">
              <a className="flex" href="/" target="_blank">
                <img src={appIcon} alt="Snagzy logo" className="h-[6rem]" />
              </a>
              <div className="flex flex-col">
                <h1 className="font-semibold text-left text-[26px]">
                  Download the app
                </h1>
                <div className="flex mt-2 gap-2">
                  <a href="#">
                    <img
                      src={appStoreButton}
                      alt="App store button"
                      className="h-[2rem]"
                    />
                  </a>
                  <a href="#">
                    <img
                      src={googlePlayButton}
                      alt="Google play button"
                      className="h-[2rem]"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    className={`w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center transition-all duration-300 ${social.color} text-slate-900 hover:text-white hover:scale-110 hover:shadow-lg`}
                  >
                    <Icon className="w-6 h-6 " />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="box-2 p-4 text-left flex-1">
                <h4 className="text-lg font-semibold mb-4">Categories</h4>
                <ul className="space-y-2">
                  {getTopLevelCategories.map((item, index) => (
                    <li key={item.name}>
                      <a
                        key={index}
                        href="#"
                        target="_blank"
                        className="text-gray-500 hover:text-slate-900 hover:underline transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="box-3 p-4 text-left flex-1">
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  {footerCompanyLinks.map((item, index) => {
                    return (
                      <li key={item.name}>
                        <a
                          key={index}
                          href="#"
                          target="_blank"
                          className="text-gray-500 hover:text-slate-900 hover:underline transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="box-4 p-4 text-left flex-1">
                <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
                <ul className="space-y-2">
                  {footerCustomerServiceLinks.map((item, index) => {
                    return (
                      <li key={item.name}>
                        <a
                          key={index}
                          href="#"
                          target="_blank"
                          className="text-gray-500 hover:text-slate-900 hover:underline transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="box-5 p-4 text-left flex-1">
                <h4 className="text-lg font-semibold mb-4">Help</h4>
                <ul className="space-y-2">
                  {footerHelpLinks.map((item, index) => {
                    return (
                      <li key={item.name}>
                        <a
                          key={index}
                          href="#"
                          target="_blank"
                          className="text-gray-500 hover:text-slate-900 hover:underline transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="box-6 p-4 text-left w-[70%]">
                <SubscribeInput />
              </div>
              <div className="box-7 flex p-4 text-left w-[30%] items-center">
                &copy; {new Date().getFullYear()} Snagzy. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
