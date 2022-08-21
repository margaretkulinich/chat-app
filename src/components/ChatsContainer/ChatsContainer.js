import { ChatItem } from "./ChatItem/ChatItem";
import { formatLastMessageTimeToChatItem } from "../../helpers/helpers";

export const ChatsContainer = ({ chats }) => {
    return (
        chats.map((chat) => {
            const lastMessage = chat.messages[chat.messages.length -1];
            const lastMessageText = lastMessage.text;
            const chatItemTime = formatLastMessageTimeToChatItem(lastMessage.time);

            return (
                <ChatItem
                    key={chat.id}
                    id={chat.id}
                    name={chat.name}
                    time={chatItemTime}
                    text={lastMessageText}
                    isOnline={chat.isOnline}
                    avatar={chat.avatar}
                />
            );
        })
    )
    
};
