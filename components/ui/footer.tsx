import Link from "next/link";
import Image from "next/image";

const Footer = () => (
    <footer className="w-full py-8 px-4 bg-neutral-900 text-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <Image src="/assets/linkflow-logo-trans.png" alt="LinkFlow Logo" className="h-6 w-6" />
                <span className="font-bold text-lg">LinkFlow</span>
            </div>
            <div className="flex gap-6">
                {/* links */}
            </div>
            <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
                    <Image src="/assets/insta.png" alt="Instagram" className="h-7 w-7 grayscale hover:grayscale-0 transition" />
                </a>
                <img src="/assets/linkflow-logo-trans.png" alt="LinkFlow Logo" className="h-6 w-6" />
                <span className="font-bold text-lg">LinkFlow</span>
            </div>
            <div className="flex gap-6">
                {/* links */}
            </div>
            <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
                    <img src="/assets/insta.png" alt="Instagram" className="h-7 w-7 grayscale hover:grayscale-0 transition" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">
                    <img src="/assets/youtube.png" alt="YouTube" className="h-7 w-7 grayscale hover:grayscale-0 transition" />
                </a>
            </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4 flex flex-col items-center">
            <hr className="border-gray-700 w-lg my-4" />
            © {new Date().getFullYear()} LinkFlow. All rights reserved.
        </div>
    </footer>
);

export default Footer;
