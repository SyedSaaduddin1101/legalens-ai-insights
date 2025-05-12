
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">1. Agreement to Terms</h2>
            <p className="mb-4">
              These Terms of Service constitute a legally binding agreement made between you and LegaLens, concerning your access to and use of our website and services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Terms of Service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">2. Intellectual Property Rights</h2>
            <p className="mb-4">
              Unless otherwise indicated, the Services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Services (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">3. User Representations</h2>
            <p className="mb-4">
              By using the Services, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">All registration information you submit will be true, accurate, current, and complete.</li>
              <li className="mb-2">You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li className="mb-2">You have the legal capacity and you agree to comply with these Terms of Service.</li>
              <li className="mb-2">You are not a minor in the jurisdiction in which you reside.</li>
              <li className="mb-2">You will not access the Services through automated or non-human means, whether through a bot, script or otherwise.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">4. Prohibited Activities</h2>
            <p className="mb-4">
              You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">5. Contact Us</h2>
            <p className="mb-4">
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
            </p>
            <p className="mb-4">
              <strong>Email:</strong> legal@legalens.ai
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
