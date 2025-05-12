
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">1. Introduction</h2>
            <p className="mb-4">
              At LegaLens, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">2. The Data We Collect About You</h2>
            <p className="mb-4">
              Personal data means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Identity Data includes first name, last name, username or similar identifier.</li>
              <li className="mb-2">Contact Data includes email address and telephone numbers.</li>
              <li className="mb-2">Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li className="mb-2">Usage Data includes information about how you use our website, products, and services.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">3. How We Use Your Personal Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li className="mb-2">Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li className="mb-2">Where we need to comply with a legal obligation.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">4. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p className="mb-4">
              <strong>Email:</strong> privacy@legalens.ai
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
