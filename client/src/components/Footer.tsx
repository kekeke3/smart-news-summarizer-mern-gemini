const Footer = () => {
  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">SmartNews Summarizer</h3>
            <p className="text-gray-400">
              AI-powered news summaries for busy people
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-accent transition">
              Terms
            </a>
            <a href="#" className="hover:text-accent transition">
              Privacy
            </a>
            <a href="#" className="hover:text-accent transition">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} SmartNews Summarizer. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
