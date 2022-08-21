import './styles.css';
import { Avatar } from "../Avatar/Avatar";
import { resetChats } from '../store/actions';
import { StoreContext } from "../StoreProvider";
import { Dialogue } from "../Dialogue/Dialogue";
import { useContext, useEffect, useState } from "react";
import { ChatsContainer } from '../ChatsContainer/ChatsContainer';  
import { LOCALSTORAGE_CHATS_KEY } from '../constants/constants';

export const Chat = () => {
    const [state, dispatch] = useContext(StoreContext);
    const [contactSearchValue, setContactSearchValue] = useState('');
    const [filteredChatContacts, setFilteredChatContacts] = useState(state.chats);

    const handleSearchChange = (e) => {
        setContactSearchValue(e.target.value);
    };

    useEffect(() => {
        const setChatsToLocalStorage = () => {
            return localStorage.setItem(LOCALSTORAGE_CHATS_KEY, JSON.stringify(state.chats));
        };

        window.addEventListener("beforeunload", setChatsToLocalStorage );

        return () => {
          window.removeEventListener("beforeunload", setChatsToLocalStorage);
        };
    }, [state.chats]);

    useEffect(() => {
        const restoredChats = JSON.parse(localStorage.getItem(LOCALSTORAGE_CHATS_KEY));

        if (!restoredChats) {
            return;
        }

        dispatch(resetChats(restoredChats));
    }, [dispatch]);
    
    useEffect(() => {
        const filteredChatByDate = state.chats.slice().sort((chat, nextChat) => {
            const lastIndexMessageChat = chat.messages.length - 1;
            const lastIndexMessageNextChat = nextChat.messages.length - 1;
            const lastMessageTimeChat = chat.messages[lastIndexMessageChat].time;
            const lastMessageTimeNextChat = nextChat.messages[lastIndexMessageNextChat].time;

            return lastMessageTimeNextChat - lastMessageTimeChat;
        });

        if (contactSearchValue) {
            const contactSearchValueToLowerCased = contactSearchValue.trim().toLowerCase();

            const filteredContactsByName = filteredChatByDate.filter((chat) => {
                return chat.name.toLowerCase().includes(contactSearchValueToLowerCased)
            });
    
            setFilteredChatContacts(filteredContactsByName);
        } else {
            setFilteredChatContacts(filteredChatByDate);
        }
    }, [contactSearchValue, state.chats]);

    return (
        <div className="chat-cotainer">
            <nav className="navigation">
                <div className="navigation-user-info">
                    <Avatar isOnline='true'/>

                    <form className='form-search'>
                        <input
                            type='search'
                            value={contactSearchValue}
                            onChange={handleSearchChange}
                            className="search-input nosubmit"
                            placeholder="Search or start new chat">
                        </input>
                    </form>
                </div>

                <section className="chats-container">
                    <p className="chat-title">Chats</p>
                    
                    <ChatsContainer chats={filteredChatContacts}/>
                </section>
            </nav>

            {state.selectedChat ? 
            (
                <Dialogue
                    name={state.selectedChat.name}
                    avatar={state.selectedChat.avatar}
                    messages={state.selectedChat.messages}
                    isOnline={state.selectedChat.isOnline}
                />
            )
            : <div className="messaging-container">Select a chat to start messaging</div>}
        </div>
    )
}