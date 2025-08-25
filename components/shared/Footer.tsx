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
  const solutions = [
    "Marketing",
    "Analytics",
    "Automation",
    "Commerce",
    "Insight",
  ];
  const support = ["Submit ticket", "Documentation", "Guides"];
  const company = ["About", "Jobs", "Press"];
  const legal = ["Terms of services", "Privacy policy", "License"];
  return (
    <footer className="border-t rounded-sm bg-background px-2 md:px-0">
      <div className="max-w-7xl mx-auto py-12">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div className="mb-10 md:mb-0 max-w-sm">
            <div className="mb-4 w-32 md:w-64">
              {/* Your Logo Here */}
              <Image
                className="dark:hidden flex"
                alt="Linkflow-logo"
                src="/breezi-high-resolution-logo-transparent.png"
                width={1000}
                height={1000}
              />
              <Image
                className="dark:flex hidden"
                alt="Linkflow-logo"
                src="/logo-light.png"
                width={1000}
                height={1000}
              />
            </div>
            <p className="font-semibold select-none">
              Empowering creators and brands through seamless link integrations.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-5 mt-6 font text-xl">
              <FaFacebookF className="text-primary/90 hover:text-foreground cursor-pointer" />
              <FaInstagram className="text-primary/90 hover:text-foreground cursor-pointer" />
              <FaTiktok className="text-primary/90 hover:text-foreground cursor-pointer" />
              <FaXTwitter className="text-primary/90 hover:text-foreground cursor-pointer" />
              <Link
                href="https://github.com/LinkFlow-Automated"
                target="_blank"
              >
                <FaGithub className="text-primary/90 hover:text-foreground cursor-pointer" />
              </Link>
              <FaYoutube className="text-primary/90 hover:text-foreground cursor-pointer" />
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 select-none">
            <div>
              <h4 className="text-sm font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm cursor-pointer">
                {solutions.map((sol) => (
                  <li
                    className="text-primary/90 hover:text-foreground"
                    key={sol}
                  >
                    {sol}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm cursor-pointer">
                {support.map((sup) => (
                  <li
                    className="text-primary/90 hover:text-foreground"
                    key={sup}
                  >
                    {sup}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm cursor-pointer">
                {company.map((com) => (
                  <li
                    className="text-primary/90 hover:text-foreground"
                    key={com}
                  >
                    {com}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm cursor-pointer">
                {legal.map((leg) => (
                  <li
                    key={leg}
                    className="text-primary/90 hover:text-foreground"
                  >
                    {leg}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-6 flex justify-between items-center text-sm select-none">
          <div className="flex items-center gap-2">
            <span className=" font-bold">
              &copy; 2025 Breezi. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
