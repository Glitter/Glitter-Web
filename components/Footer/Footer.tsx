import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="pt-8 mt-auto">
      <div className=" border-t border-primary-500">
        <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl">
          <nav className="flex items-start justify-center flex-row flex-wrap py-4">
            <Link href="/legal/privacy-policy">
              <a className="mx-2 inline-block text-sm">Privacy Policy</a>
            </Link>
            <Link href="/legal/terms-and-conditions">
              <a className="mx-2 inline-block text-sm">Terms and Conditions</a>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
