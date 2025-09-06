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

    return (
        <div className="group relative w-full max-w-sm">
            {/* Card Container */}
            <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-slate-700/50 hover:border-slate-600/70 hover:bg-slate-800/95">
                
                {/* Profile Image - Circular */}
                <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-600/50 group-hover:border-slate-500/70 transition-all duration-500">
                            <img 
                                src={
                                    photoUrl || 
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                } 
                                alt={firstName} 
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            />
                        </div>
                        
                        {/* Glow effect behind image */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150" />
                    </div>
                </div>

                {/* Member Name */}
                <h3 className="text-2xl font-bold text-white mb-2 text-center group-hover:text-blue-300 transition-colors duration-300">
                    {firstName}
                </h3>

                {/* Role */}
                <div className="text-center mb-6">
                    <span className="text-slate-400 text-lg font-medium">
                        {role}
                    </span>
                </div>

                {/* Description */}
                {description && (
                    <div className="mb-6">
                        <p className="text-slate-300 text-sm leading-relaxed text-center line-clamp-3">
                            {description}
                        </p>
                    </div>
                )}

                {/* Social Icons */}
                <div className="flex justify-center space-x-4">
                    {/* GitHub Icon */}
                    <div className="w-10 h-10 bg-slate-700/50 hover:bg-slate-600/70 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-slate-500/30">
                        <Github className="w-5 h-5 text-slate-300 hover:text-white transition-colors duration-300" />
                    </div>
                    
                    {/* LinkedIn Icon */}
                    <div className="w-10 h-10 bg-slate-700/50 hover:bg-blue-600/70 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30">
                        <Linkedin className="w-5 h-5 text-slate-300 hover:text-blue-300 transition-colors duration-300" />
                    </div>

                    {/* Email Icon (only if logged in) */}
                    {auth && username && (
                        <div className="w-10 h-10 bg-slate-700/50 hover:bg-emerald-600/70 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/30" title={`Contact: ${username}`}>
                            <Mail className="w-5 h-5 text-slate-300 hover:text-emerald-300 transition-colors duration-300" />
                        </div>
                    )}
                </div>
            </div>

            {/* Subtle Outer Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/15 via-orange-600/10 to-yellow-600/15 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110" />
        </div>
    );
};

export default TeamCard;