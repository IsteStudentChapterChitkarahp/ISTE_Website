import React, { useContext } from 'react';
import { UserContext } from '../utils/UserContext';
import { Mail, Award, Star, Crown, GraduationCap, Github, Linkedin } from 'lucide-react';

const TeamCard = ({ teamDetails }) => {
    const { firstName, photoUrl, role, username, description } = teamDetails;
    const { auth } = useContext(UserContext);

    const getRoleStyles = (role) => {
        const roleStr = role?.toLowerCase() || '';
        
        if (roleStr.includes('president') || roleStr.includes('chairperson')) {
            return {
                bg: 'bg-gradient-to-r from-yellow-500 to-amber-600',
                text: 'text-white',
                icon: Crown,
                glow: 'shadow-yellow-500/40'
            };
        }
        if (roleStr.includes('vice') || roleStr.includes('secretary') || roleStr.includes('treasurer')) {
            return {
                bg: 'bg-gradient-to-r from-orange-500 to-red-600',
                text: 'text-white',
                icon: Award,
                glow: 'shadow-orange-500/40'
            };
        }
        if (roleStr.includes('coordinator') || roleStr.includes('faculty') || roleStr.includes('professor') || roleStr.includes('dr.')) {
            return {
                bg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
                text: 'text-white',
                icon: GraduationCap,
                glow: 'shadow-emerald-500/40'
            };
        }
        return {
            bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
            text: 'text-white',
            icon: Star,
            glow: 'shadow-blue-500/40'
        };
    };

    const roleStyles = getRoleStyles(role);
    const IconComponent = roleStyles.icon;

    return (
        <div className="group relative w-full max-w-sm">
            {/* Card Container */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20">
                
                {/* Profile Image with Glow Effect */}
                <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-gray-600 group-hover:border-blue-400 transition-all duration-300 shadow-lg">
                            <img 
                                src={
                                    photoUrl || 
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                } 
                                alt={firstName} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        
                        {/* Blue glow effect behind image */}
                        <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150" />
                    </div>
                </div>

                {/* Member Name */}
                <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-blue-300 transition-colors duration-300">
                    {firstName}
                </h3>

                {/* Role Badge */}
                <div className="text-center mb-4">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${roleStyles.bg} ${roleStyles.text} shadow-lg ${roleStyles.glow}`}>
                        <IconComponent className="w-4 h-4 mr-2" />
                        {role}
                    </div>
                </div>

                {/* Description */}
                {description && (
                    <div className="mb-6">
                        <p className="text-gray-300 text-sm leading-relaxed text-center line-clamp-3">
                            {description}
                        </p>
                    </div>
                )}

                {/* Social Icons */}
                <div className="flex justify-center space-x-4">
                    {/* GitHub Icon */}
                    <div className="w-10 h-10 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-white/50 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20">
                        <Github className="w-5 h-5 text-gray-300 hover:text-white transition-colors duration-300" />
                    </div>
                    
                    {/* LinkedIn Icon */}
                    <div className="w-10 h-10 bg-gray-800 hover:bg-blue-600 border border-gray-600 hover:border-blue-400 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30">
                        <Linkedin className="w-5 h-5 text-gray-300 hover:text-blue-100 transition-colors duration-300" />
                    </div>

                    {/* Email Icon (only if logged in) */}
                    {auth && username && (
                        <div className="w-10 h-10 bg-gray-800 hover:bg-blue-500 border border-gray-600 hover:border-blue-400 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30" title={`Contact: ${username}`}>
                            <Mail className="w-5 h-5 text-gray-300 hover:text-blue-100 transition-colors duration-300" />
                        </div>
                    )}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Subtle Outer Blue Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110" />
        </div>
    );
};

export default TeamCard;