import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faRightToBracket , faPencil } from '@fortawesome/free-solid-svg-icons';

const PasswordComponent = (props) => {
    return(
        <div className="flex flex-col gap-3 items-center bg-gray-800 min-h-38 min-w-40 rounded-lg pt-4 text-white px-4 py-2 w-fit">
                <h2 className="text-2xl">{props.title}</h2>
                <button className="h-8 w-36 rounded-lg bg-green-500 hover:bg-green-700 duration-300 cursor-pointer"><Link to={props.link}>Watch <FontAwesomeIcon icon={faRightToBracket} className="text-xl" /></Link></button>

                <button className="h-8 w-36 rounded-lg bg-yellow-500 hover:bg-yellow-700 duration-300 cursor-pointer"><Link to={props.link}>Edit <FontAwesomeIcon icon={faPencil} className="text-xl" /></Link></button>
            </div>
    );
}


export default PasswordComponent;