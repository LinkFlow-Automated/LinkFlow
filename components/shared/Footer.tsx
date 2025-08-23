import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary border-t rounded-sm">
      <div className="max-w-7xl mx-auto py-12">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div className="mb-10 md:mb-0 max-w-sm">
            <div className="mb-4">
              {/* Your Logo Here */}
              <Image
                alt="Linkflow-logo"
                src="/breezi-high-resolution-logo-transparent.png"
                width={100}
                height={100}
              />
            </div>
            <p className="text-gray-500 font-semibold select-none">
              Empowering creators and brands through seamless link integrations.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-5 mt-6 font text-xl">
              <FaFacebookF className="text-gray-900 hover:text-gray-500 cursor-pointer" />
              <FaInstagram className="text-gray-900 hover:text-gray-500 cursor-pointer" />
              <FaTiktok className="text-gray-900 hover:text-gray-500 cursor-pointer" />
              <FaXTwitter className="text-gray-900 hover:text-gray-500 cursor-pointer" />
              <Link
                href="https://github.com/LinkFlow-Automated"
                target="_blank"
              >
                <FaGithub className="text-gray-900 hover:text-gray-500 cursor-pointer" />
              </Link>
              <FaYoutube className="text-gray-900 hover:text-gray-500 cursor-pointer" />
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 select-none">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                Solutions
              </h4>
              <ul className="space-y-2 text-sm text-gray-500 cursor-pointer">
                <li>Marketing</li>
                <li>Analytics</li>
                <li>Automation</li>
                <li>Commerce</li>
                <li>Insights</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-gray-500 cursor-pointer">
                <li>Submit ticket</li>
                <li>Documentation</li>
                <li>Guides</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-500 cursor-pointer">
                <li>About</li>
                <li>Blog</li>
                <li>Jobs</li>
                <li>Press</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-500 cursor-pointer">
                <li>Terms of service</li>
                <li>Privacy policy</li>
                <li>License</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-6 flex justify-between items-center text-sm text-gray-400 select-none">
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-bold">
              &copy; 2025 Breezi. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
