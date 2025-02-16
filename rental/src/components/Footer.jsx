import React from 'react'
import { Link } from 'react-scroll'

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white ">
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">About Us</h3>
        <p>
          We provide reliable and affordable car rental services in Lahore,
          Pakistan. Experience comfort and convenience with our wide range of
          vehicles.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <ul className="space-y-2">
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:alimahmoodrana82@gmail.com" className="text-blue-400">
              alimahmoodrana82@gmail.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:03174104283" className="text-blue-400">
              0317-4104283
            </a>
          </li>
          <li>
            <strong>Address:</strong> Lahore, Pakistan
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <a href="/" className="text-blue-400 hover:text-white">
              Home
            </a>
          </li>
          <li>
            <Link to="about" className="text-blue-400 hover:text-white cursor-pointer">
              About Us
            </Link>
          </li>
          <li>
            <Link to="contact" className="text-blue-400 hover:text-white cursor-pointer">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <hr className="border-gray-700 my-6" />

    <div className="text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Car Rental Service. All rights
        reserved.
      </p>
    </div>
  </div>
</footer>
  )
}

export default Footer
