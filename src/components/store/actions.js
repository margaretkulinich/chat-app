export const RESET_CHATS = 'Reset chats';
export const SEND_MESSAGE = 'Send message';
export const OPEN_SELECTED_CHAT = 'Open selected chat';

export function openChat(selectedChatID) {
    return {
        type: OPEN_SELECTED_CHAT,
        payload: {
            selectedChatID,
        }
    }
};

export function sendMessage(messageText, messageSendTimeStamp, isCurrentUser) {
    return {
        type: SEND_MESSAGE,
        payload: {
            isCurrentUser,
            messageText,
            messageSendTime: messageSendTimeStamp,
        }
    }
};

export function resetChats(restoredChats) {
    return {
        type: RESET_CHATS,
        payload: {
            chats: restoredChats,
        }
    }
};
