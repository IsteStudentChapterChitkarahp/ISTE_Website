import React, { useState } from "react";
import { User, Mail, Phone, Calendar, Hash, Image, Users } from "lucide-react";

const AddMemberForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    photoUrl: "",
    phoneNumber: "",
    section: "",
    year: "",
    studentId: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/addmembers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          studentId: Number(formData.studentId),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Member added successfully!");
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          photoUrl: "",
          phoneNumber: "",
          section: "",
          year: "",
          studentId: "",
        });
      } else {
        setMessage(`❌ Error: ${JSON.stringify(data.error)}`);
      }
    } catch (err) {
      setMessage("❌ Failed to connect to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: "email", type: "email", placeholder: "Enter email address", icon: Mail, required: true },
    { name: "firstName", type: "text", placeholder: "Enter first name", icon: User, required: true },
    { name: "lastName", type: "text", placeholder: "Enter last name", icon: User, required: false },
    { name: "photoUrl", type: "url", placeholder: "Profile photo URL (optional)", icon: Image, required: false },
    { name: "phoneNumber", type: "text", placeholder: "Enter phone number", icon: Phone, required: true },
    { name: "section", type: "text", placeholder: "Enter section", icon: Users, required: true },
    { name: "year", type: "text", placeholder: "Enter academic year", icon: Calendar, required: true },
    { name: "studentId", type: "number", placeholder: "Enter student ID", icon: Hash, required: true },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Add New Member</h1>
          <p className="text-gray-400">Fill in the details to add a new team member</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border ${
              message.includes('✅') 
                ? 'bg-green-900/20 border-green-700/50 text-green-400' 
                : 'bg-red-900/20 border-red-700/50 text-red-400'
            }`}>
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <div className="space-y-6">
            {inputFields.map((field) => {
              const IconComponent = field.icon;
              return (
                <div key={field.name} className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                    {field.name === 'photoUrl' ? 'Photo URL' : 
                     field.name === 'firstName' ? 'First Name' :
                     field.name === 'lastName' ? 'Last Name' :
                     field.name === 'phoneNumber' ? 'Phone Number' :
                     field.name === 'studentId' ? 'Student ID' :
                     field.name}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconComponent className="w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
                    />
                  </div>
                </div>
              );
            })}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Adding Member...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <User className="w-5 h-5 mr-2" />
                  Add Member
                </div>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-center text-sm text-gray-500">
              All required fields must be filled to add a member
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberForm;