
export default function ContactUs() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-700 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-700 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
              placeholder="Your Email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="border border-gray-700 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

