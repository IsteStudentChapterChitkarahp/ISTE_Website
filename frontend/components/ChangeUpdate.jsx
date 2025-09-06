import React, { useState } from "react";
import { Settings, Link, FileText, CheckCircle, XCircle } from "lucide-react";

const ChangeUpdate = () => {
  const [type, setType] = useState("logo"); // default type
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, success: true, text: "" });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/user/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type,
          ...(type === "text" ? { message } : { link }),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setToast({
          show: true,
          success: true,
          text: data.message || "Update successful",
        });
        // clear form after success
        setLink("");
        setMessage("");
      } else {
        const errMsg =
          data.error?.[0]?.message || data.message || "Update failed";
        setToast({ show: true, success: false, text: errMsg });
      }
    } catch (err) {
      setToast({ show: true, success: false, text: "Connection error!" });
    } finally {
      setLoading(false);
      setTimeout(
        () => setToast({ show: false, success: true, text: "" }),
        2000
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/70 to-gray-800/50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative w-full max-w-lg bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent mb-2">
            Change Updates
          </h2>
          <p className="text-gray-400 text-lg">Update your content settings</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-6">
          {/* Type Selection */}
          <div className="space-y-4">
            <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
              <Settings className="w-5 h-5 mr-2 text-blue-400" />
              Select Type
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="type"
                    value="logo"
                    checked={type === "logo"}
                    onChange={(e) => setType(e.target.value)}
                    disabled={loading}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    type === "logo" 
                      ? "border-blue-500 bg-blue-500" 
                      : "border-gray-500 group-hover:border-blue-400"
                  }`}>
                    {type === "logo" && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-200 font-medium">Logo</span>
                </div>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="type"
                    value="text"
                    checked={type === "text"}
                    onChange={(e) => setType(e.target.value)}
                    disabled={loading}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    type === "text" 
                      ? "border-blue-500 bg-blue-500" 
                      : "border-gray-500 group-hover:border-blue-400"
                  }`}>
                    {type === "text" && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-200 font-medium">Text</span>
                </div>
              </label>
            </div>
          </div>

          {/* Conditional Inputs */}
          {type === "logo" ? (
            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <Link className="w-5 h-5 mr-2 text-blue-400" />
                Logo Link
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter logo link (e.g., https://example.com/logo.png)"
                disabled={loading}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 disabled:opacity-50"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="flex items-center text-gray-200 font-semibold text-lg mb-3">
                <FileText className="w-5 h-5 mr-2 text-blue-400" />
                Message
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                disabled={loading}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 text-gray-100 placeholder:text-gray-400 focus:border-blue-500/70 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 disabled:opacity-50"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl shadow-2xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-blue-500/30"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="text-lg">Updating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span className="text-lg">Update</span>
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

export default ChangeUpdate;