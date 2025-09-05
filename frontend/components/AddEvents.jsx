import { useState } from "react";

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
      const res = await fetch("http://localhost:5000/user/eventManager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ use cookies for auth
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({
          show: true,
          success: true,
          text: data.message || "Event created successfully!",
        });

        // Reset form after success
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-slate-900/40"></div>

      
      <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Create New Event
          </h2>
          <p className="text-gray-300">Add a new event to the ISTE calendar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-medium">Event Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter event name"
              required
              className="input w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
            />
          </div>

          {/* Venue and Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-medium">Venue</span>
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Event location"
                required
                className="input w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-medium">Event Date</span>
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="input w-full bg-white/10 border-white/20 text-white focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Time and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-medium">Time</span>
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g. 10:30 AM"
                required
                className="input w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-medium">Status</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select w-full bg-white/10 border-white/20 text-white focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
              >
                <option value="upcoming" className="bg-slate-800">Upcoming</option>
                <option value="completed" className="bg-slate-800">Completed</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-medium">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event..."
              required
              rows="4"
              className="textarea w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/20 transition-all duration-300 resize-none"
            />
          </div>

          {/* Speaker */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-medium">Speaker</span>
              <span className="label-text-alt text-gray-400">Optional</span>
            </label>
            <input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleChange}
              placeholder="Speaker name (if any)"
              className="input w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-medium">Registration Link</span>
                <span className="label-text-alt text-gray-400">Optional</span>
              </label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="Google Form link"
                className="input w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-medium">Photo URL</span>
                <span className="label-text-alt text-gray-400">Optional</span>
              </label>
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="Event image URL"
                className="input w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                Creating Event...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </div>
            )}
          </button>
        </form>
      </div>

      {/* Enhanced Toast Notifications */}
      {toast.show && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-right duration-300">
          <div
            className={`alert shadow-lg border-none backdrop-blur-lg ${
              toast.success 
                ? "bg-green-500/90 text-white" 
                : "bg-red-500/90 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.success ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{toast.text}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventForm;