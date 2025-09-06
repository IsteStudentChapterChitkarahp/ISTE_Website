import { useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import { Users, GraduationCap, Crown, Star, Search, Filter } from 'lucide-react';

const Team = () => {
    const [teamData, setTeamData] = useState([]);
    const [filteredTeam, setFilteredTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    // Function to categorize members
    const categorizeMember = (member) => {
        const role = member.role?.toLowerCase() || '';
        const name = member.firstName?.toLowerCase() || '';
        
        // Faculty check
        const facultyRoles = ['faculty coordinator', 'coordinator', 'professor', 'faculty', 'advisor', 'mentor'];
        if (facultyRoles.some(facultyRole => role.includes(facultyRole)) || name.includes('dr.')) {
            return 'faculty';
        }
        
        // Executive positions
        const executiveRoles = ['president', 'chairperson', 'vice president', 'vice-president', 'secretary', 'treasurer'];
        if (executiveRoles.some(execRole => role.includes(execRole))) {
            return 'executive';
        }
        
        // Regular members
        return 'member';
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'faculty':
                return <GraduationCap className="w-6 h-6" />;
            case 'executive':
                return <Crown className="w-6 h-6" />;
            default:
                return <Star className="w-6 h-6" />;
        }
    };

    const getCategoryTitle = (category) => {
        switch (category) {
            case 'faculty':
                return 'Faculty Coordinators';
            case 'executive':
                return 'Executive Team';
            default:
                return 'Team Members';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'faculty':
                return 'text-yellow-400';
            case 'executive':
                return 'text-purple-400';
            default:
                return 'text-blue-400';
        }
    };

    useEffect(() => {
        fetch("http://localhost:5000/user/details")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTeamData(data);
                setFilteredTeam(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching team data:", error);
                setLoading(false);
            });
    }, []);

    // Filter and search functionality
    useEffect(() => {
        let filtered = teamData;

        // Filter by role category
        if (roleFilter !== 'all') {
            filtered = filtered.filter(member => categorizeMember(member) === roleFilter);
        }

        // Search by name or role
        if (searchTerm) {
            filtered = filtered.filter(member => 
                member.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredTeam(filtered);
    }, [teamData, searchTerm, roleFilter]);

    // Group members by category
    const groupedMembers = {
        faculty: filteredTeam.filter(member => categorizeMember(member) === 'faculty'),
        executive: filteredTeam.filter(member => categorizeMember(member) === 'executive'),
        member: filteredTeam.filter(member => categorizeMember(member) === 'member')
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <Users className="w-10 h-10 text-blue-400 mr-3" />
                        <h1 className="text-4xl md:text-6xl font-bold text-white">
                            Our <span className="text-blue-400">Team</span>
                        </h1>
                    </div>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Meet all the dedicated members who drive innovation and excellence in technical education
                    </p>
                    <div className="text-blue-400 font-medium mt-2">
                        {filteredTeam.length} {filteredTeam.length === 1 ? 'member' : 'members'} found
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-12 max-w-4xl mx-auto">
                    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search members by name, role, or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            {/* Role Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="pl-12 pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-48"
                                >
                                    <option value="all">All Members</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="executive">Executive Team</option>
                                    <option value="member">Team Members</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Sections */}
                {filteredTeam.length > 0 ? (
                    <div className="space-y-16">
                        {Object.entries(groupedMembers).map(([category, members]) => (
                            members.length > 0 && (
                                <div key={category} className="space-y-8">
                                    {/* Section Header */}
                                    <div className="text-center">
                                        <div className={`flex items-center justify-center mb-4 ${getCategoryColor(category)}`}>
                                            {getCategoryIcon(category)}
                                            <h2 className="text-3xl font-bold ml-3">
                                                {getCategoryTitle(category)}
                                            </h2>
                                        </div>
                                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                                    </div>

                                    {/* Members Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                                        {members.map((member) => (
                                            <TeamCard key={member._id} teamDetails={member} />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <Users className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                        <div className="text-gray-400 text-2xl mb-4">
                            {searchTerm || roleFilter !== 'all' ? 'No matching members found' : 'No team members found'}
                        </div>
                        <p className="text-gray-500 text-lg">
                            {searchTerm || roleFilter !== 'all' 
                                ? 'Try adjusting your search or filter criteria' 
                                : 'Team information will be updated soon!'
                            }
                        </p>
                        {(searchTerm || roleFilter !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setRoleFilter('all');
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