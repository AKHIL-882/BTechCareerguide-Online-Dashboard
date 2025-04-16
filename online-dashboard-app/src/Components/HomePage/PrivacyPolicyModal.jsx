import React from "react";
import { FaTimes } from "react-icons/fa";

const PrivacyPolicyModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-3xl w-full relative max-h-[90vh] flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="bg-white px-6 md:px-10 py-4 md:py-6 border-b border-gray-200 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-display font-semibold text-violet-800">Privacy Policy</h2>
            <button
              onClick={onClose}
              className="text-xl font-bold text-gray-500 hover:text-red-500"
            >
              <FaTimes/>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 md:px-10 py-4 space-y-4 text-sm text-gray-700">
          <p>
            <strong className="font-sans">Effective Date:</strong> 2025
          </p>
          <p>
            We respect your privacy and are committed to protecting any personal information you provide while using our services.
          </p>

          <h3 className="font-semibold text-gray-800 font-sans">Information We Collect</h3>
          <ul className="list-disc ml-5">
            <li>Name and contact details (such as email address)</li>
            <li>Usage data (such as pages visited, clicks, and time spent)</li>
            <li>Any data you provide while using our forms or services</li>
          </ul>

          <h3 className="font-semibold text-gray-800 font-sans">How We Use Your Information</h3>
          <ul className="list-disc ml-5">
            <li>Provide and improve our services</li>
            <li>Respond to your queries or requests</li>
            <li>Send updates related to your account or services</li>
            <li>Monitor usage and enhance user experience</li>
          </ul>

          <h3 className="font-semibold text-gray-800 font-sans">Data Security</h3>
          <p>
            We implement reasonable security measures to protect your data. However, no method of transmission over the internet is 100% secure.
          </p>

          <h3 className="font-semibold text-gray-800 font-sans">Third-Party Services</h3>
          <p>
            We do not share your personal information with third parties, except to comply with legal obligations or improve our service via trusted service providers.
          </p>

          <h3 className="font-semibold text-gray-800 font-sans">Your Rights</h3>
          <p>
            You can request access to, update, or delete your personal data at any time by contacting us.
          </p>

          <h3 className="font-semibold text-gray-800 font-sans">Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page.
          </p>

          <h3 className="font-semibold text-gray-800 font-sans">Contact Us</h3>
          <p>
            If you have any questions regarding this Privacy Policy, please reach out at <span className="text-violet-900">btechcareerguide@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
