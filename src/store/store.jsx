import { createContext, useEffect, useState } from "react";
import { client } from "../featherSetup";

export const DataContext=createContext(

)
export default function DataContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isLoggedIn) {
          const loadInitialData = async () => {
            // Load messages
            const messages = await client.service('messages').find({
              query: {
                $sort: { createdAt: -1 },
                $limit: 25
              }
            });
            setMessages(messages.data.reverse());
    
            // Load users
            const users = await client.service('users').find();
            setUsers(users.data);
          };
    
          loadInitialData();
    
          // Real-time updates
          client.service('messages').on('created', message => {
            setMessages(messages => [...messages, message]);
          });
    
          client.service('users').on('created', user => {
            setUsers(users => [...users, user]);
          });
        }
      }, [isLoggedIn]);
      const handleLogin = async (email,password) => {
        try {
          await client.authenticate({
            strategy: 'local',
            email,
            password
          });
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Login failed:', error);
          setError('Login failed. Please check your credentials.');
        }
      };
      const handleSignup = async (email,password) => {
        try {
          await client.service('users').create({
            email: email,
            password: password
          });
          // Redirect to login or show success message
          setError('Signup successful! Please log in.');
        } catch (error) {
          console.error('Signup failed:', error);
          setError('Signup failed. Please try again.');
        }
      }; 

    return <DataContext.Provider value={{isLoggedIn, setIsLoggedIn,users, setUsers,messages, setMessages,handleLogin,handleSignup,error}}>
        {children}
    </DataContext.Provider>
}