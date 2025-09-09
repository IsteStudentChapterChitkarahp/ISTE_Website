import React from 'react';
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Calendar, 
  Award, 
  BookOpen, 
  Lightbulb,
  Building,
  Star,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Zap,
  Globe,
  Shield
} from "lucide-react";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const objectives = [
    {
      icon: Target,
      title: "Educational Excellence",
      description: "Setting new standards in technical education with cutting-edge methodologies and industry-aligned curriculum"
    },
    {
      icon: Users,
      title: "Faculty Empowerment",
      description: "Developing world-class educators through comprehensive training programs and professional development initiatives"
    },
    {
      icon: Award,
      title: "Innovation Leadership",
      description: "Fostering a culture of innovation and excellence that drives technological advancement and research"
    },
    {
      icon: BookOpen,
      title: "Research Excellence",
      description: "Promoting groundbreaking research that bridges the gap between academic theory and practical application"
    },
    {
      icon: Building,
      title: "Industry Synergy",
      description: "Creating powerful partnerships between academic institutions and leading industry players"
    },
    {
      icon: Star,
      title: "Professional Network",
      description: "Building a strong professional community that spans across academia, industry, and research domains"
    }
  ];

  const activities = [
    { icon: Lightbulb, text: "Industry Expert Sessions & Keynote Lectures" },
    { icon: Zap, text: "Cutting-edge Technical Workshops" },
    { icon: Globe, text: "International Industrial Exposure Programs" },
    { icon: Award, text: "Innovation Competitions & Hackathons" },
    { icon: Shield, text: "Research Project Mentorship Programs" },
    { icon: Users, text: "Technical Festival Leadership Events" },
    { icon: Star, text: "Excellence Awards & Recognition Programs" },
    { icon: TrendingUp, text: "Career Development & Placement Support" }
  ];

  const achievements = [
    { number: "500+", label: "Active Members", icon: Users, gradient: "from-blue-400 to-cyan-400" },
    { number: "7+", label: "Years Excellence", icon: Calendar, gradient: "from-purple-400 to-pink-400" },
    { number: "150+", label: "Events Conducted", icon: Award, gradient: "from-green-400 to-emerald-400" },
    { number: "75+", label: "Industry Partners", icon: Building, gradient: "from-orange-400 to-red-400" }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <motion.div 
        className="relative z-10 pt-20 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-12"
          >
            <div className="relative w-40 h-40 mx-auto mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src="https://i.ytimg.com/vi/XlrYem8-3fM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA4ZL_oGVx3OZ5QPjfuTf-LPxdvVw" 
                alt="ISTE Logo"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              About 
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                ISTE Chitkara
              </span>
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-16 font-light"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Pioneering the future of technical education through <span className="text-blue-400 font-semibold">innovation</span>, 
            <span className="text-purple-400 font-semibold"> collaboration</span>, and 
            <span className="text-cyan-400 font-semibold"> excellence</span> since 2017
          </motion.p>

          {/* Achievement Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50"></div>
                <div className="relative z-10 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${achievement.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {achievement.number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">
                    {achievement.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        
        {/* About ISTE Section */}
        <motion.div 
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-blue-400">Legacy</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-800">
                  <div className="flex items-center mb-6">
                    <BookOpen className="w-8 h-8 text-blue-400 mr-4" />
                    <h3 className="text-2xl font-bold text-white">ISTE Foundation</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                    The <span className="text-white font-semibold">Indian Society for Technical Education (ISTE)</span> has been 
                    a cornerstone of technical excellence since <span className="text-blue-400 font-semibold">1941</span>. 
                    From its origins as the Association of Principals of Technical Institutions (ATPI) to its evolution 
                    into ISTE in 1967, we've consistently championed educational innovation.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    As a premier national professional society under the Societies Registration Act 1860, 
                    we unite <span className="text-purple-400 font-semibold">academicians</span>, 
                    <span className="text-cyan-400 font-semibold"> faculty</span>, and 
                    <span className="text-blue-400 font-semibold"> students</span> across India.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-800">
                  <div className="flex items-center mb-6">
                    <Building className="w-8 h-8 text-purple-400 mr-4" />
                    <h3 className="text-2xl font-bold text-white">Chitkara Chapter</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                    Since our establishment in <span className="text-purple-400 font-semibold">2017</span>, 
                    the ISTE Chitkara chapter has grown into a dynamic ecosystem of over 
                    <span className="text-cyan-400 font-semibold"> 500+ passionate members</span>.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    We serve as the vital bridge connecting academic excellence with industry innovation, 
                    preparing tomorrow's engineering leaders for global challenges.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-blue-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Founded 2017</span>
                    </div>
                    <div className="flex items-center text-cyan-400">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="font-semibold">500+ Members</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Objectives Section */}
        <motion.div 
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-purple-400">Objectives</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Driven by innovation and committed to excellence in technical education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-800 h-full group-hover:transform group-hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <objective.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {objective.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {objective.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activities Section */}
        <motion.div 
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-cyan-400">Activities</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Comprehensive programs bridging academic excellence and industry innovation
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-gray-900 rounded-3xl p-10 border border-gray-800">
              <div className="grid md:grid-cols-2 gap-6">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 group/item"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                      <activity.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors text-lg">
                      {activity.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Leadership <span className="text-blue-400">Team</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Visionary leaders driving innovation and excellence
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 rounded-3xl p-10 border border-gray-800 text-center group-hover:transform group-hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Faculty Coordinator</h3>
                <p className="text-2xl font-semibold text-blue-400 mb-2">Dr. Ashok Kumar</p>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Leading with vision, expertise, and unwavering commitment to educational excellence
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 rounded-3xl p-10 border border-gray-800 text-center group-hover:transform group-hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Student Coordinators</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-lg font-medium text-purple-400">Dr. Nisha Rana</p>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Empowering student communities and driving engagement through innovation
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="relative group max-w-4xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
            <div className="relative bg-gray-900 rounded-3xl p-12 border border-gray-800">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Revolution</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Ready to shape the future of technology? Join ISTE Chitkara and be part of an extraordinary journey 
                of innovation, learning, and professional growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <span className="text-lg">Chitkara University, Himachal Pradesh</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-6 h-6 text-purple-400" />
                  <span className="text-lg">iste@chitkarauniversity.edu.in</span>
                </div>
              </div>
              <button 
                onClick={() => window.open("https://paym.chitkara.edu.in/enrollment-for-student-chapter-25/", "_blank")}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <span className="mr-3">Join ISTE Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default About;