import React, { useState } from "react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl border border-gray-200">
        <div className="card-body space-y-6">
          {/* Header */}
          <h2 className="card-title text-2xl font-bold text-center text-gray-800">
            Change Updates
          </h2>

          {/* Type Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-900">
                Select Type
              </span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="logo"
                  checked={type === "logo"}
                  onChange={(e) => setType(e.target.value)}
                  className="radio radio-primary"
                  disabled={loading}
                />
                Logo
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="text"
                  checked={type === "text"}
                  onChange={(e) => setType(e.target.value)}
                  className="radio radio-primary "
                  disabled={loading}
                />
                Text
              </label>
            </div>
          </div>

          {/* Conditional Inputs */}
          {type === "logo" ? (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Logo Link</span>
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter logo link"
                className="input input-bordered w-full"
                disabled={loading}
              />
            </div>
          ) : (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Message</span>
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
                className="input input-bordered w-full"
                disabled={loading}
              />
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>

      {/* DaisyUI Toast */}
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

export default ChangeUpdate;
