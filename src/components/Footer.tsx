export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} Q5 - NASA Explorer. All rights reserved.</p>
          <p>
            Data provided by{" "}
            <a
              href="https://api.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              NASA Open APIs
            </a>
          </p>
        </div>
      </footer>
    );
  }
  