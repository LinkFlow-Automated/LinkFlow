import "./LogoCloud.css";
import Image from "next/image";

const LogoClouds: React.FC = () => {
  const starCount = 5;
  const starKeys = Array.from({ length: starCount }, (_, i) => `star-${i + 1}`);

  return (
    <div className="logoclouds-container">
      <div className="bg-white py-24 sm:py-32 mt-[-25px]">
        {/* Profile images and stars section */}
        <div className="flex flex-col items-center gap-8 mb-16 mt-[-35px]">
          {" "}
          {/* Added gap and margin-bottom */}
          <div className="profile-images">
            <Image
              src="/user2.avif"
              alt="User 2"
              className="profile small"
              width={1000}
              height={1000}
            />
            <Image
              src="/user1.avif"
              alt="User 1"
              className="profile large"
              width={1000}
              height={1000}
            />
            <Image
              src="/user3.avif"
              alt="User 3"
              className="profile small"
              width={1000}
              height={1000}
            />
          </div>
          <div className="stars">
            {Array.from({ length: starCount }).map((_, index) => (
              <span key={starKeys[index]} className="star">
                ⭐
              </span>
            ))}
          </div>
        </div>

        {/* Company logos section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-gray-900 select-none">
            Trusted by the world's most innovative teams
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <Image
              alt="Transistor"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <Image
              alt="Reform"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <Image
              alt="Tuple"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <Image
              alt="SavvyCal"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
            <Image
              alt="Statamic"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
          </div>
        </div>
      </div>

      <div className="hidden sm:mb-8 sm:flex sm:justify-center mt-[-25px]">
        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Over 200 team use LinkFlow to better their productivity.{" "}
          <a href="/" className="font-semibold text-blue-600">
            <span aria-hidden="true" className="absolute inset-0" />
            Read more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogoClouds;
