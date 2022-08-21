export const getUniqueID = () => {
    const NUMBER_INCREASE = 10000;

   return new Date().getTime() * Math.random() * NUMBER_INCREASE;
};


export const formatTimeSendMessageToDialog = (timestamp) => {
    const date = new Date(timestamp);

    return date.toLocaleString('en-US', {
        year: "numeric", 
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
};

export const formatLastMessageTimeToChatItem = (timestamp) => {
    const dateLastMessage = new Date(timestamp);
    const dateNow = new Date();
    const isCurrentDayLastMessage = dateLastMessage.getFullYear() === dateNow.getFullYear() 
        && dateLastMessage.getDate() === dateNow.getDate() 
        && dateLastMessage.getMonth() === dateNow.getMonth()
    ;

    if (isCurrentDayLastMessage) {
        return dateLastMessage.toLocaleTimeString('en-US', {
            hour: "numeric",
            minute: "numeric",
        })
    }

    return dateLastMessage.toLocaleDateString('en-US', {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const checkMessageText = (message) => {
    return !message || (message.trim().length === 0);
};

export const getSentMessageTimestamp = () => new Date().getTime();