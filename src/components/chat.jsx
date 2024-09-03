import { useContext } from "react";
import { client } from "../featherSetup";
import { DataContext } from "../store/store";


export const Chat=()=>{
    const {users,messages,setIsLoggedIn}=useContext(DataContext)
    const handleLogout = async () => {
        await client.logout();
        setIsLoggedIn(false);
      };
      const handleSendMessage = async (e) => {
        e.preventDefault();
        const text = e.target.elements.text.value.trim();
        if (text) {
          try {
            await client.service('messages').create({ text });
            e.target.reset();
          } catch (error) {
            console.error('Message send failed:', error);
            setError('Failed to send message.');
          }
        }
      };
    return <div className="drawer drawer-mobile">
    <input id="drawer-left" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
      <div className="navbar w-full">
        <div className="navbar-start">
          <label htmlFor="drawer-left" className="btn btn-square btn-ghost lg:hidden drawer-button">
            <i className="i-feather-menu text-lg"></i>
          </label>
        </div>
        <div className="navbar-center flex flex-col">
          <p>Feathers Chat</p>
          <label htmlFor="drawer-right" className="text-xs cursor-pointer">
            <span className="online-count">{users.length}</span> User(s)
          </label>
        </div>
        <div className="navbar-end">
          <div className="tooltip tooltip-left" data-tip="Logout">
            <button type="button" className="btn btn-ghost" onClick={handleLogout}>
              <i className="i-feather-log-out text-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <div id="chat" className="h-full overflow-y-auto px-3">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat chat-start py-2">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={msg.user?.avatar || ''} alt={msg.user?.email} />
              </div>
            </div>
            <div className="chat-header pb-1">
              {msg.user?.email}
              <time className="text-xs opacity-50">
{msg.createdAt ? new Intl.DateTimeFormat('en-US', { timeStyle: 'short', dateStyle: 'medium' }).format(new Date(msg.createdAt)) : 'Unknown time'}
</time>

            </div>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="form-control w-full py-2 px-3">
        <form className="input-group overflow-hidden" onSubmit={handleSendMessage}>
          <input name="text" type="text" placeholder="Compose message" className="input input-bordered w-full" />
          <button type="submit" className="btn">Send</button>
        </form>
      </div>
    </div>
    <div className="drawer-side">
      <label htmlFor="drawer-left" className="drawer-overlay"></label>
      <ul className="menu user-list compact p-2 overflow-y-auto w-60 bg-base-300 text-base-content">
        <li className="menu-title"><span>Users</span></li>
        {users.map((user, idx) => (
          <li key={idx} className="user">
            <a>
              <div className="avatar indicator">
                <div className="w-6 rounded">
                  <img src={user.avatar} alt={user.email} />
                </div>
              </div>
              <span>{user.email}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
}