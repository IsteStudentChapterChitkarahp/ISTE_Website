import { useState } from "react";
import { UserPlus, User, Lock, Mail, Image, FileText, Users, CheckCircle, XCircle } from "lucide-react";

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
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({
          show: true,
          success: true,
          text: data.message || "Member added successfully!",
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
          text: data.message || "Failed to add member",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/70 to-gray-800/50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative w-full max-w-2xl bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent mb-4">
            Add Team Member
          </h2>
          <p className="text-gray-400 text-xl">Add a new member to your team</p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Username and Password Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <Lock className="w-5 h-5 mr-2 text-blue-400" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>
          </div>

          {/* First Name and Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Last Name
                <span className="ml-2 text-sm text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>
          </div>

          {/* Role and Photo URL Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 cursor-pointer"
              >
                <option value="" className="bg-gray-800 text-gray-100">Select Role</option>
                <option value="Faculty" className="bg-gray-800 text-gray-100">Faculty</option>
                <option value="Event Coordinator" className="bg-gray-800 text-gray-100">Event Coordinator</option>
                <option value="Technical Head" className="bg-gray-800 text-gray-100">Technical Head</option>
                <option value="General Secretary" className="bg-gray-800 text-gray-100">General Secretary</option>
                <option value="Joint Secretary" className="bg-gray-800 text-gray-100">Joint Secretary</option>
                <option value="Content Team" className="bg-gray-800 text-gray-100">Content Team</option>
                <option value="Social Media Team" className="bg-gray-800 text-gray-100">Social Media Team</option>
                <option value="Treasurer" className="bg-gray-800 text-gray-100">Treasurer</option>
                <option value="Membership Chair" className="bg-gray-800 text-gray-100">Membership Chair</option>
                <option value="Core" className="bg-gray-800 text-gray-100">Core</option>
              </select>
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
                placeholder="https://example.com/photo.jpg"
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
              <FileText className="w-5 h-5 mr-2 text-blue-400" />
              Description
              <span className="ml-2 text-sm text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description about the member..."
              rows="4"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-5 px-8 rounded-xl shadow-2xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-blue-500/30"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span className="text-lg">Adding Member...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <UserPlus className="w-6 h-6" />
                  <span className="text-lg">Add Member</span>
                </div>
              )}
            </button>
          </div>
        </div>
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

export default UpdateTeam;