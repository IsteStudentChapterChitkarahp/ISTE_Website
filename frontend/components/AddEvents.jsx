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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="card w-full max-w-lg bg-white shadow-xl rounded-2xl border border-gray-200">
        <div className="card-body space-y-4">
          <h2 className="text-2xl font-bold text-center">Create Event</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Event Name"
              required
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Venue"
              required
              className="input input-bordered w-full"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              rows="3"
              className="textarea textarea-bordered w-full"
            />

            <input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleChange}
              placeholder="Speaker (optional)"
              className="input input-bordered w-full"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>

            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Time (e.g. 10:30 AM)"
              required
              className="input input-bordered w-full"
            />

            <input
              type="url"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleChange}
              placeholder="Google Form Link (optional)"
              className="input input-bordered w-full"
            />

            <input
              type="url"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Create Event"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ DaisyUI Toast */}
      {toast.show && (
        <div className="toast toast-top toast-end z-50">
          <div
            className={`alert ${toast.success ? "alert-success" : "alert-error"}`}
          >
            <span>{toast.text}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventForm;
