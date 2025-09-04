import { useEffect, useState } from "react";
import TeamCard from "./TeamCard";

const Team = () =>{
    const [teamData, setTeamData] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/user/details")
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setTeamData(data);
        });
    },[])
    return(
        <div>
            {
                teamData.map((t)=>(
                    <TeamCard key={t._id} teamDetails={t} />
                ))
            }
        </div>
    )
}

export default Team;

