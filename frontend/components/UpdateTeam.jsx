import { useState } from "react";

const UpdateTeam = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
    description: "",
    photoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, success: true, text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ since using cookies
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({
          show: true,
          success: true,
          text: data.message || "Signup successful",
        });
        setFormData({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          role: "",
          photoUrl:"",
          description: "",
        });
      } else {
        setToast({
          show: true,
          success: false,
          text: data.message || "Signup failed",
        });
      }
    } catch (err) {
      setToast({ show: true, success: false, text: "Connection error!" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ show: false, success: true, text: "" }), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl border border-gray-200">
        <div className="card-body space-y-6">
          <h2 className="card-title text-2xl font-bold text-center text-gray-800">
           Add Member
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="input input-bordered w-full"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="input input-bordered w-full"
            />

            <input
          type="text"
          name="photoUrl"
          placeholder="Profile Photo URL"
          value={formData.photoUrl}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select Role</option>
              <option value="Faculty">Faculty</option>
              <option value="Event Coordinator">Event Coordinator</option>
              <option value="Technical Head">Technical Head</option>
              <option value="General Secretary">General Secretary</option>
              <option value="Joint Secretary">Joint Secretary</option>
              <option value="Content Team">Content Team</option>
              <option value="Social Media Team">Social Media Team</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Membership Chair">Membership Chair</option>
              <option value="Core">Core</option>
            </select>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Add"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ DaisyUI Toast */}
      {toast.show && (
        <div className="toast toast-top toast-end z-50">
          <div
            className={`alert ${
              toast.success ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toast.text}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTeam;
