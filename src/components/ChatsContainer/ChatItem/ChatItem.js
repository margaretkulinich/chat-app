import './styles.css';
import { useContext } from "react";
import { Avatar } from "../../Avatar/Avatar";
import { openChat } from "../../store/actions";
import { StoreContext } from "../../StoreProvider";

export const ChatItem = ({ id, avatar, name, time, text, isOnline }) => {
  const [, dispatch] = useContext(StoreContext);
  const selectChatID = (e) => {
    dispatch(openChat(e.currentTarget.id));
  };

  return (
    <div
      id={id}
      onClick={selectChatID}
      className='chat-item-box'
    >
      <Avatar
          avatar={avatar}
          isOnline={isOnline}
      />

      <div className="chat-item-information">
        <div className="chat-item-title">
          <p className="user-name">{name}</p>
          <span className="chat-item-text small-text-size">{time}</span>
        </div>

        <div className="chat-item-text">{text}</div>
      </div>
    </div>
  );
};
