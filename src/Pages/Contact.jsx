import { useState } from 'react';
import { FcManager } from 'react-icons/fc';

export const Contact = () => {
  const dealers = [
    { id: 1, name: 'Jagadeesh', contact: '7981199667', icon: <FcManager /> },
    { id: 2, name: 'Vijay', contact: '8309329444', icon: <FcManager /> },
    { id: 3, name: 'Suresh', contact: '8970834996', icon: <FcManager /> },
  ];

  const [showContacts, setShowContacts] = useState(false);

  const handleContactClick = (contact, name) => {
    const message = `Hello, I would like to inquire about your services. (Contact: ${name})`;
    window.open(`https://wa.me/${contact}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleMapClick = () => {
    window.open('https://www.google.com/maps/place/14.715416685784678,76.84678617510842', '_blank');
  };
  

  return (
    <div className="p-6 bg-gray-100">
      {/* Google Maps Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center mb-4">Our Location</h2>
        <div onClick={handleMapClick} className="cursor-pointer">
          <iframe
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3858.95003964242!2d76.84678617510842!3d14.715416685784678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDQyJzU1LjUiTiA3NsKwNTAnNTcuNyJF!5e0!3m2!1sen!2sin!4v1735526341242!5m2!1sen!2sin" // Replace with your Google Maps Embed URL
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-md"
          ></iframe>
        </div>
      </div>

      {/* Dealer Contact Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center mb-4">Our Dealers</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {dealers.map((dealer) => (
            <div
              key={dealer.id}
              className="w-48 bg-white shadow-md rounded-md p-4 text-center"
            >
              <h3 className="text-2xl mb-2 gap-3 font-medium flex justify-center items-center">
                {dealer.name} {dealer.icon}
              </h3>
              <p className="text-gray-600">{dealer.contact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="text-center mb-4">
        <button
          onClick={() => setShowContacts(!showContacts)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" // WhatsApp icon URL
            alt="WhatsApp"
            className="w-6 h-6"
          />
          <span>Contact Us on WhatsApp</span>
        </button>
      </div>

      {/* Dealer Selection for WhatsApp */}
      {showContacts && (
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Select a Dealer to Contact:</h3>
          <div className="flex flex-col items-center gap-2">
            {dealers.map((dealer) => (
              <button
                key={dealer.id}
                onClick={() => handleContactClick(dealer.contact, dealer.name)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
              >
                Contact {dealer.name} ({dealer.contact})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
