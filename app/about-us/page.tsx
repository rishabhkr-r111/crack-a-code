
export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-white">About Us</h1>
          <p className="mt-4 text-center text-lg text-gray-400">
            We are a team of passionate individuals dedicated to providing the best services and solutions to our clients.
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="mt-2 text-gray-400">
              Our mission is to deliver high-quality products that combine performance with value pricing while establishing a successful relationship with our customers and suppliers.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Our Values</h2>
            <p className="mt-2 text-gray-400">
              We believe in treating our customers with respect and faith. We grow through creativity, invention, and innovation. We integrate honesty, integrity, and business ethics into all aspects of our business functioning.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Our Team</h2>
            <p className="mt-2 text-gray-400">
              Our team consists of experienced professionals who are passionate about their work and committed to achieving excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
