import { useEffect, useState } from "react";
import TeamCard from "./TeamCard";

const Team = () => {
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/user/details")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTeamData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching team data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
                <div className="text-white text-lg">Loading team members...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our <span className="text-blue-400">Team</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Meet the dedicated members who drive innovation and excellence in technical education
                    </p>
                </div>

                {/* Team Grid */}
                {teamData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {teamData.map((t) => (
                            <TeamCard key={t._id} teamDetails={t} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-gray-400 text-xl mb-4">No team members found</div>
                        <p className="text-gray-500">Team information will be updated soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Team;