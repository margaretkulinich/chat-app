import './styles.css';
import { Avatar } from "../../Avatar/Avatar";

export const Message = ({
    text,
    time,
    avatar,
    isOnline,
    isCurrentUser,
 }) => {

    return (
        isCurrentUser ?
        (
            <div className="message current-user">
                <div className="message-text self">{text}</div>
                <div className="message-sent-time">{time}</div>
            </div>
        )
        :
        (
            <div className="message">
                <Avatar
                    isOnline={isOnline}
                    avatar={avatar}
                />
                <div>
                    <div className="message-text">{text}</div>
                    <div className="message-sent-time">{time}</div>
                </div>
            </div>
        )
    )
}