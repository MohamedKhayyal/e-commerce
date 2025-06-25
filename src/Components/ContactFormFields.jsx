import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faMessage } from "@fortawesome/free-solid-svg-icons";

export default function ContactFormFields({ form, setForm }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2 text-primary-600" />
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2 text-primary-600" />
            Your Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2 text-primary-600" />
          Your Phone
        </label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FontAwesomeIcon icon={faMessage} className="w-4 h-4 mr-2 text-primary-600" />
          Your Message
        </label>
        <textarea
          placeholder="Tell us about your inquiry..."
          rows="6"
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm resize-none"
        ></textarea>
      </div>
    </>
  );
}
