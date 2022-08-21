import './styles.css';
import { DEFAULT_USER_IMAGE } from "../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

export const Avatar = ({ isOnline, avatar }) => {
    return ( 
        <div className="avatar">
            <div className="avatar-img">
                <img src={avatar ?? DEFAULT_USER_IMAGE} alt="avatar" />
            </div>

            {isOnline ? 
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    className='fa-circle-check-icon'
                />
                : ''
            }
        </div>
    )
}