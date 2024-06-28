import React from 'react';
import Link from 'next/link';
import { Facebook , Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-16">
      <div className="container mx-auto flex justify-between items-center px-10">
        <div className="text-lg">
          <h2 className="font-bold">Contact Us</h2>
          <p className="mt-2">Email: info@crackacode.com</p>
          <p>Phone: +9123 456 7890</p>
        </div>
        <div>
          <h2 className="font-bold">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <Link href="https://facebook.com" aria-label="Facebook">
              <Facebook className="w-6 h-6 hover:text-blue-600" />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter">
              <Twitter className="w-6 h-6 hover:text-blue-400" />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram">
              <Instagram className="w-6 h-6 hover:text-pink-600" />
            </Link>
            <Link href="https://github.com" aria-label="Github">
              <Github className="w-6 h-6 hover:text-gray-500" />
            </Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold">About Us</h2>
          <p className="mt-2">
            Crack A Code provides a platform for coders to enhance their skills through challenges and contests.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
