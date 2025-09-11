import { API_URL } from '../src/api';
import { useState } from "react";
import { Plus, Calendar, MapPin, Clock, User, Link, Image, FileText, CheckCircle, XCircle } from "lucide-react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    description: "",
    speaker: "",
    status: "upcoming",
    photoUrl: "",
    eventDate: "",
    time: "",
    registrationLink: ""
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, success: true, text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
  const res = await fetch(`${API_URL}/user/eventManager`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({
          show: true,
          success: true,
          text: data.message || "Event created successfully!",
        });

        setFormData({
          name: "",
          venue: "",
          description: "",
          speaker: "",
          status: "upcoming",
          photoUrl: "",
          eventDate: "",
          time: "",
          registrationLink: "",
        });
      } else {
        setToast({
          show: true,
          success: false,
          text: data.message || "Failed to create event.",
        });
      }
    } catch (err) {
      setToast({ show: true, success: false, text: "Server error!" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ show: false, success: true, text: "" }), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/70 to-gray-800/50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative w-full max-w-4xl bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
            <Plus className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent mb-4">
            Create New Event
          </h2>
          <p className="text-gray-400 text-xl">Add a new event to the ISTE calendar</p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Name */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
              <Calendar className="w-5 h-5 mr-2 text-blue-400" />
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter event name"
              required
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
            />
          </div>

          {/* Venue and Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                Venue
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Event location"
                required
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>
          </div>

          {/* Time and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Time
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g. 10:30 AM"
                required
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-400" />
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 cursor-pointer"
              >
                <option value="upcoming" className="bg-gray-800 text-gray-100">Upcoming</option>
                <option value="completed" className="bg-gray-800 text-gray-100">Completed</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
              <FileText className="w-5 h-5 mr-2 text-blue-400" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event in detail..."
              required
              rows="5"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 resize-none"
            />
          </div>

          {/* Speaker */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
              <User className="w-5 h-5 mr-2 text-blue-400" />
              Speaker
              <span className="ml-2 text-sm text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleChange}
              placeholder="Speaker name (if any)"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <Link className="w-5 h-5 mr-2 text-blue-400" />
                Registration Link
                <span className="ml-2 text-sm text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="https://forms.google.com/..."
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <Image className="w-5 h-5 mr-2 text-blue-400" />
                Photo URL
                <span className="ml-2 text-sm text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-5 px-8 rounded-xl shadow-2xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-blue-500/30"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span className="text-lg">Creating Event...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Plus className="w-6 h-6" />
                  <span className="text-lg">Create Event</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Enhanced Toast Notifications */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right duration-300">
          <div
            className={`flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border ${
              toast.success 
                ? "bg-green-600/90 text-white border-green-500/50" 
                : "bg-red-600/90 text-white border-red-500/50"
            }`}
          >
            <div className="flex-shrink-0">
              {toast.success ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <XCircle className="w-6 h-6" />
              )}
            </div>
            <div>
              <h4 className="font-bold text-lg">
                {toast.success ? "Success!" : "Error"}
              </h4>
              <p className="text-sm opacity-90">{toast.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventForm;