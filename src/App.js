import { Chat } from './components/Chat/Chat';
import { StoreProvider } from './components/StoreProvider';
import { initialState, reducer } from './components/store/reducer';

function App() {
  return (
    <StoreProvider initialState={initialState} reducer={reducer}>
      <Chat />
    </StoreProvider>
  );
}

export default App;