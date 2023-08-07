import aboutImage from "../assets/images/about-image.png";

export const About = () => {
  return (
    <div className="bg-white">
      <div className="p-24 grid grid-cols-2">
        <div className="">
          <h2 className="text-2xl font-medium">About Us</h2>
          <p className="text-lg">
            KJTFood is an online and mobile food ordering system which we have
            developed for restaurant owners and food lovers. Through Foodchow we
            are helping customers to discover the best restaurants in city. If
            you are restaurant owner, you can easily register your restaurant
            and upload restaurant menu to start receiving online orders through
            this fast growing portal without any cost.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={aboutImage}
            alt=""
            className="w-[400px] h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};
