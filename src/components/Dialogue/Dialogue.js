import './styles.css';
import {
    formatTimeSendMessageToDialog,
    checkMessageText,
    getSentMessageTimestamp
} from '../../helpers/helpers';
import { Avatar } from '../Avatar/Avatar';
import { Message } from './Message/Message';
import { sendMessage } from '../store/actions';
import { StoreContext } from '../StoreProvider';
import { useContext, useEffect, useState, useRef } from 'react';
import { RANDOM_MESSAGE_SEND_DELAY } from '../constants/constants';

export const Dialogue = ({
    name,
    avatar,
    isOnline,
    messages,
}) => {
    const [, dispatch] = useContext(StoreContext);
    const [messageText, setMessageText] = useState('');
    const didCancelRef = useRef(false);

    const getAnswerFromAPI = () => {
        fetch("https://api.chucknorris.io/jokes/random")
          .then((res) => res.json())
          .then((data) => {
            if (didCancelRef.current) {
                return;
            }

            dispatch(sendMessage(data.value, getSentMessageTimestamp(), false))
          })
          .catch((error) => console.error("Error is:", error));
    };

    const addNewMessage = (event) => {
        const trimmedMessageText = messageText.trim();
        event.preventDefault();

        dispatch(sendMessage(trimmedMessageText, getSentMessageTimestamp(), true));
        setMessageText('');
        setTimeout(getAnswerFromAPI, RANDOM_MESSAGE_SEND_DELAY);
    };

    useEffect(() => {
        return () => {
            didCancelRef.current = true;
        };
    }, []);
    
    return (
        <div className='dialog-container'>
            <header className="header-contact-name">
                <Avatar 
                    isOnline={isOnline}
                    avatar={avatar}
                />
                <p>{name}</p>
            </header>
            <section className="dialogue-section">
                {messages.map((message) => {
                    return (
                        <Message
                            key={message.id}
                            name={name} 
                            avatar={avatar}
                            text={message.text}
                            isOnline={isOnline}
                            isCurrentUser={message.isCurrentUser}
                            time={formatTimeSendMessageToDialog(message.time)}
                        />
                    )
                })}
            </section>
            <section className='send-form-section'>
                <form className='send-form' onSubmit={addNewMessage}>
                    <input
                        value={messageText}
                        className="input-send-message"
                        placeholder="Type your message"
                        onChange={(e) => setMessageText(e.target.value)}
                    >
                    </input>
                    <button 
                        type='submit'
                        className='send-button'
                        disabled={checkMessageText(messageText)}
                    >
                        Send
                    </button>
                </form>
            </section>
        </div>
    )
}