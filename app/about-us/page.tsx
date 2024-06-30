export default function About() {
  return (
    // Changed background to gradient
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Added bg-opacity and hover effect */}
      <div className="max-w-3xl w-full space-y-8 bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <header>
          <h1 className="text-center text-4xl font-extrabold text-white">About Us</h1>
          <p className="mt-4 text-center text-lg text-gray-400">
            We are a team of passionate individuals dedicated to providing the best services and solutions to our clients.
          </p>
        </header>
        <section className="space-y-6">
          <div>
            {/* Added SVG icon */}
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-2 8H5a2 2 0 01-2-2V6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2h-4"></path></svg>
              Our Mission
            </h2>
            <p className="mt-2 text-gray-400">
              Our mission is to deliver high-quality products that combine performance with value pricing while establishing a successful relationship with our customers and suppliers.
            </p>
          </div>
          <div>
            {/* Added SVG icon */}
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18"></path></svg>
              Our Values
            </h2>
            <p className="mt-2 text-gray-400">
              We believe in treating our customers with respect and faith. We grow through creativity, invention, and innovation. We integrate honesty, integrity, and business ethics into all aspects of our business functioning.
            </p>
          </div>
          <div>
            {/* Added SVG icon */}
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"></path></svg>
              Our Team
            </h2>
            <p className="mt-2 text-gray-400">
              Our team consists of experienced professionals who are passionate about their work and committed to achieving excellence.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
