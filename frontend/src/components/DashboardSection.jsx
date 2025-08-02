import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const DashboardSection = (props) => {
    return(
        <div className="flex flex-col gap-2 items-center bg-blue-400 min-h-40 min-w-40 rounded-lg pt-4 text-white px-4 py-2 w-fit">
                <FontAwesomeIcon icon={props.icon} className="text-5xl" />
                <h2 className="text-2xl">{props.title}</h2>
                <button className="h-8 w-36 rounded-lg bg-green-500 hover:bg-green-700 duration-300 cursor-pointer"><Link to={props.link}>Check it out <FontAwesomeIcon icon={faRightToBracket} className="text-xl" /></Link></button>
            </div>
    );
}


export default DashboardSection;