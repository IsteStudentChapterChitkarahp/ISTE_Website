import React, { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import {
  Mail,
  Phone,
  IdCard,
  Users,
  Crown,
  GraduationCap,
  Star,
} from "lucide-react";

const TeamCard = ({ teamDetails }) => {
  const {
    firstName,
    lastName,
    photoUrl,
    role,
    email,
    phoneNumber,
    section,
    year,
    studentId,
    description,
  } = teamDetails;

  const { auth } = useContext(UserContext);

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  const getRoleStyles = (role) => {
    const roleStr = role?.toLowerCase() || "";

    if (roleStr.includes("president") || roleStr.includes("chairperson")) {
      return {
        bg: "bg-gradient-to-r from-yellow-500 to-amber-600",
        icon: Crown,
      };
    }
    if (
      roleStr.includes("vice") ||
      roleStr.includes("secretary") ||
      roleStr.includes("treasurer")
    ) {
      return {
        bg: "bg-gradient-to-r from-orange-500 to-red-600",
        icon: Users,
      };
    }
    if (
      roleStr.includes("coordinator") ||
      roleStr.includes("faculty") ||
      roleStr.includes("professor") ||
      roleStr.includes("dr.")
    ) {
      return {
        bg: "bg-gradient-to-r from-emerald-500 to-teal-600",
        icon: GraduationCap,
      };
    }
    return {
      bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
      icon: Star,
    };
  };

  const roleStyles = getRoleStyles(role);
  const IconComponent = roleStyles.icon;

  // Member card layout
  if (!role || role.toLowerCase() === "member") {
    return (
      <div className="w-full max-w-sm bg-gray-900/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
        <div className="flex flex-col items-center">
          <img
            src={
              photoUrl ||
              "https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-man-570x570.png"
            }
            alt={fullName}
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-600 mb-4"
          />

          <h3 className="text-xl font-bold text-white mb-2">{fullName}</h3>

          <div className="text-slate-300 text-sm space-y-1 text-center">
            <p>
              <IdCard className="inline w-4 h-4 mr-1 text-blue-400" />
              ID: {studentId}
            </p>
            <p>
              Year: {year} | Section: {section}
            </p>
            <p>
              <Phone className="inline w-4 h-4 mr-1 text-green-400" />
              {phoneNumber}
            </p>
            <p>
              <Mail className="inline w-4 h-4 mr-1 text-pink-400" />
              {email}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Faculty/Executive styled card
  return (
    <div className="group relative w-full max-w-sm">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
        {/* Profile */}
        <div className="flex justify-center mb-6">
          <img
            src={photoUrl}
            alt={fullName}
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-600"
          />
        </div>

        <h3 className="text-xl font-bold text-white text-center mb-3">
          {fullName}
        </h3>

        {/* Role badge */}
        <div className="flex justify-center mb-4">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${roleStyles.bg} text-white`}
          >
            <IconComponent className="w-4 h-4 mr-2" />
            {role}
          </div>
        </div>

        {/* Optional description */}
        {description && (
          <p className="text-gray-300 text-sm leading-relaxed text-center mb-4">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
