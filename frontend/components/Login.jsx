import { API_URL } from '../src/api';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock, CheckCircle, XCircle } from "lucide-react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (message === "Signin Successfully") {
                // Reload the page first to update any auth context
                window.location.reload();
                // Then navigate to homepage
                setTimeout(() => {
                    navigate("/");
                }, 100);
            } else if (message) {
                // Clear other messages after 3 seconds
                setMessage("");
            }
        }, 2000); 
        
        return () => clearTimeout(timer);
    }, [message, navigate]);

    const handleLogin = async() => {
        if (!username.trim() || !password.trim()) {
            setMessage("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/user/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({username, password})
            });

            const data = await res.json();
            setMessage(data.message);
            
            // If login successful, trigger page reload and navigation
            if (data.message === "Signin Successfully") {
                // Small delay to show success message
                setTimeout(() => {
                    window.location.href = "/"; // This will reload and navigate
                }, 1500);
            }
        } catch(err) {
            setMessage("Connection failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            {/* Main Login Container */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400 to-blue-500 rounded-full translate-y-12 -translate-x-12 opacity-10"></div>
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Please sign in to your account</p>
                </div>

                {/* Login Form */}
                <div className="space-y-6">
                    {/* Username Field */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full text-gray-500 pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Enter your username"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full text-gray-500 pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        disabled={isLoading || !username.trim() || !password.trim()}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                {message === "Signin Successfully" ? "Redirecting..." : "Signing in..."}
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                    
                </div>
            </div>

            {/* Toast Messages */}
            {message && (
                <div className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ${
                    message === "Signin Successfully" ? 'translate-x-0' : 'translate-x-0'
                }`}>
                    {message === "Signin Successfully" ? (
                        <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-80">
                            <CheckCircle className="w-6 h-6 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Success!</h4>
                                <p className="text-sm opacity-90">Login successful, redirecting...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-80">
                            <XCircle className="w-6 h-6 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Error</h4>
                                <p className="text-sm opacity-90">{message}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Login