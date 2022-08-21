import { OPEN_SELECTED_CHAT, RESET_CHATS, SEND_MESSAGE } from "./actions";
import { chats } from "../constants/chats";
import { getUniqueID } from "../../helpers/helpers";

export const initialState = {
    chats,
    selectedChat: null,
    chatIdToIndex: new Map(),
};

export const reducer = (state, action) => {
    switch (action.type) {
        case OPEN_SELECTED_CHAT:
            const selectedChatID = action.payload.selectedChatID;
            let selectedChatIndex = state.chatIdToIndex.get(selectedChatID);
            let newChatIdToIndex;

            if (selectedChatIndex === undefined) {
                newChatIdToIndex = new Map(state.chatIdToIndex);
                selectedChatIndex = state.chats.findIndex((chat) =>
                    chat.id === Number(selectedChatID)
                );

                newChatIdToIndex.set(selectedChatID, selectedChatIndex);
            }

            return {
                ...state,
                chatIdToIndex: newChatIdToIndex ?? state.chatIdToIndex,
                selectedChat: state.chats[selectedChatIndex],
            };

        case SEND_MESSAGE:
            const newChats = state.chats.slice();
            const chatIndex = state.chatIdToIndex.get(String(state.selectedChat.id));
            const newMessage = {
                id: getUniqueID(),
                isCurrentUser: action.payload.isCurrentUser,
                time: action.payload.messageSendTime,
                text: action.payload.messageText,
            };

            newChats[chatIndex].messages.push(newMessage);

            return {
                ...state,
                chats: newChats,
            }
        case RESET_CHATS:
            return {
                ...state,
                chats: action.payload.chats,
            }
        default:
            return state;
    }
}
