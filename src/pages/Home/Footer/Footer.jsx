import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-background dark:bg-background text-text dark:text-text transition-colors duration-300 py-12 px-6">
      <div className=" grid md:grid-cols-4 gap-8 justify-around items-center text-sm">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">EduManage</h2>
          <p className="text-secondary dark:text-secondary text-sm">
            Empowering education with technology. Learn, teach, and grow with
            EduManage.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Quick Links
          </h3>
          <ul className="space-y-1 text-secondary dark:text-secondary">
            <li>
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/allClasses"
                className="hover:text-primary transition-colors"
              >
                Classes
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className="hover:text-primary transition-colors"
              >
                Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">Support</h3>
          <ul className="space-y-1 text-secondary dark:text-secondary">
            <li>
              <a href="/faq" className="hover:text-primary transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">Connect</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <a
              href="#"
              className="hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-red-600 transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-secondary dark:text-secondary text-xs border-t border-primary/20 pt-4">
        &copy; {new Date().getFullYear()} EduManage. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
