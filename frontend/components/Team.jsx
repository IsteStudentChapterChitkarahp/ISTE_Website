import { API_URL } from '../src/api';
import { useContext, useEffect, useState } from "react";
import { Users, GraduationCap, Crown, Star, Search } from "lucide-react";
import TeamCard from "./TeamCard";
import { UserContext } from "../utils/UserContext";

const Team = () => {
  const { role } = useContext(UserContext);
  const [teamData, setTeamData] = useState([]);
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [yearFilter, setYearFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [idFilter, setIdFilter] =("");

  const categorizeMember = (member) => {
    const role = member.role?.toLowerCase() || "";
    const name = member.firstName?.toLowerCase() || "";

    if (role.includes("faculty") || name.includes("dr.")) return "faculty";

    const executiveRoles = [
      "president",
      "vice president",
      "general secretary",
      "treasurer",
      "technical head",
      "joint secretary",
      "content team",
      "social media team",
      "event coordinator",
      "membership chair",
    ];
    if (executiveRoles.some((execRole) => role.includes(execRole))) {
      return "executive";
    }

    return "member";
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "faculty":
        return <GraduationCap className="w-8 h-8" />;
      case "executive":
        return <Crown className="w-8 h-8" />;
      default:
        return <Star className="w-8 h-8" />;
    }
  };

  const getCategoryTitle = (category) => {
    switch (category) {
      case "faculty":
        return "Faculty Coordinators";
      case "executive":
        return "Executive Team";
      default:
        return "Team Members";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "faculty":
        return "text-emerald-400";
      case "executive":
        return "text-yellow-400";
      default:
        return "text-blue-400";
    }
  };

  const getCategoryGradient = (category) => {
    switch (category) {
      case "faculty":
        return "from-emerald-400 to-teal-400";
      case "executive":
        return "from-yellow-400 to-orange-400";
      default:
        return "from-blue-400 to-purple-400";
    }
  };

  // Function to get appropriate grid classes based on number of items
  const getGridClasses = (itemCount, category) => {
    const baseClasses = "grid gap-8 justify-items-center";
    
    if (category === "faculty") {
      // For faculty, use flex layout to center when few items
      if (itemCount <= 3) {
        return "flex flex-wrap justify-center gap-8";
      }
    }
    
    // Default grid layout for other categories or when many items
    return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res1 = await fetch(`${API_URL}/user/details`);
        let userData = await res1.json();

        let membersRes = [];
        if (role) {
          const res2 = await fetch(`${API_URL}/members`);
          membersRes = await res2.json();
        }

        let membersData = Array.isArray(membersRes)
          ? membersRes
          : membersRes.data || [];

        let facultyData = Array.isArray(userData)
          ? userData
          : userData.data || [];

        facultyData = facultyData.map((u) => ({
          ...u,
          role: u.role ? u.role.toLowerCase() : "member",
        }));

        membersData = membersData.map((m) => ({
          ...m,
          role: "member",
        }));

        let combined = [...facultyData, ...membersData];
        if (role === "member") {
          combined = membersData;
        }

        setTeamData(combined);
        setFilteredTeam(combined);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  useEffect(() => {
    let filtered = teamData;

    if (roleFilter !== "all") {
      filtered = filtered.filter(
        (member) => categorizeMember(member) === roleFilter
      );
    }

    if (yearFilter !== "all") {
      filtered = filtered.filter((member) => member.year === yearFilter);
    }

    if (sectionFilter !== "all") {
      filtered = filtered.filter((member) => member.section === sectionFilter);
    }

    if (idFilter) {
      const idNumber = Number(idFilter);
      if (!isNaN(idNumber)) {
        filtered = filtered.filter((member) => member.studentId === idNumber);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTeam(filtered);
    setCurrentPage(1);
  }, [teamData, searchTerm, roleFilter, yearFilter, sectionFilter, idFilter]);

  const groupedMembers = {
    faculty: filteredTeam.filter(
      (member) => categorizeMember(member) === "faculty"
    ),
    executive: filteredTeam.filter(
      (member) => categorizeMember(member) === "executive"
    ),
    member: filteredTeam.filter(
      (member) => categorizeMember(member) === "member"
    ),
  };

  const paginateMembers = (members) => {
    if (itemsPerPage === "all") return members;
    const start = (currentPage - 1) * itemsPerPage;
    return members.slice(start, start + itemsPerPage);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-white text-lg flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <span>Loading team members...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Team
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto mb-6">
            Meet all the dedicated members who drive innovation and excellence
            in technical education
          </p>
          <div className="text-blue-400 font-semibold text-lg">
            {filteredTeam.length}{" "}
            {filteredTeam.length === 1 ? "member" : "members"} found
          </div>
        </div>

        <div className="mb-12 max-w-6xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search members by name, role, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              >
                <option value="all">All Members</option>
                <option value="faculty">Faculty</option>
                <option value="executive">Executive Team</option>
                <option value="member">Team Members</option>
              </select>

              {/* Year Filter */}
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              >
                <option value="all">All Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>

              {/* Section Filter */}
              <select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              >
                <option value="all">All Sections</option>
                {["A","B","C","D","E","F","G","H","I","J","K","L"].map(s => (
                  <option key={s} value={s}>Section {s}</option>
                ))}
              </select>

              {/* ID Filter */}
              <input
                type="text"
                placeholder="Filter by ID..."
                value={idFilter}
                onChange={(e) => setIdFilter(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        {/* Team Sections */}
        {filteredTeam.length > 0 ? (
          <div className="space-y-20">
            {Object.entries(groupedMembers).map(([category, members]) => {
              if (category === "member" && (!role || role === "member")) return null;

              const displayedMembers =
                category === "member" ? paginateMembers(members) : members;

              return (
                members.length > 0 && (
                  <div key={category} className="space-y-12">
                    <div className="text-center">
                      <div className={`flex items-center justify-center mb-6 ${getCategoryColor(category)}`}>
                        {getCategoryIcon(category)}
                        <h2 className="text-4xl font-bold ml-4">{getCategoryTitle(category)}</h2>
                      </div>
                      <div className={`w-32 h-1 bg-gradient-to-r ${getCategoryGradient(category)} mx-auto rounded-full`}></div>
                    </div>

                    <div className={getGridClasses(displayedMembers.length, category)}>
                      {displayedMembers.map((member) => (
                        <TeamCard key={member._id} teamDetails={member} />
                      ))}
                    </div>

                    {category === "member" && members.length > itemsPerPage && (
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50"
                        >
                          Prev
                        </button>

                        <span className="text-white">
                          Page {currentPage} of {Math.ceil(members.length / itemsPerPage)}
                        </span>

                        <button
                          disabled={currentPage === Math.ceil(members.length / itemsPerPage)}
                          onClick={() => setCurrentPage(prev => prev + 1)}
                          className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50"
                        >
                          Next
                        </button>

                        <button
                          onClick={() => setItemsPerPage(itemsPerPage === "all" ? 10 : "all")}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                          {itemsPerPage === "all" ? "Show 10" : "Show All"}
                        </button>
                      </div>
                    )}
                  </div>
                )
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Users className="w-20 h-20 text-slate-500 mx-auto mb-6" />
            <div className="text-slate-300 text-2xl mb-4">
              {searchTerm || roleFilter !== "all"
                ? "No matching members found"
                : "No team members found"}
            </div>
            <p className="text-slate-400 text-lg">
              {searchTerm || roleFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Team information will be updated soon!"}
            </p>
            {(searchTerm || roleFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                  setYearFilter("all");
                  setSectionFilter("all");
                  setIdFilter("");
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;