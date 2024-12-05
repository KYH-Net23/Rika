import React, { createContext, useRef, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const LoggingContext = createContext();

export const useLoggingContext = () => useContext(LoggingContext);

export const LoggingProvider = ({ children }) => {
    const navigate = useNavigate();
    const userEventQueue = useRef([]);
    const hasLoaded = useRef(false);
    const location = useLocation();

    const sessionId = useRef(sessionStorage.getItem('sessionId') || uuidv4());
    useEffect(() => {
        if(!sessionStorage.getItem('sessionId')){
            sessionStorage.setItem('sessionId', sessionId.current);
        }
    }, [])


    useEffect(() => {
        const sessionTimeoutMinutes = 30;
        const lastActivity = sessionStorage.getItem('lastActivity');
        const now = Date.now();

        if(lastActivity && now - lastActivity > sessionTimeoutMinutes * 60 * 1000){
            const newSessionId = uuidv4();
            sessionStorage.setItem('sessionId', newSessionId);
            sessionId.current = newSessionId;
        }

        const updateLastActivity = () => {
            sessionStorage.setItem('lastActivity', Date.now());
        };

        document.body.addEventListener('click', updateLastActivity);
        return () => document.body.removeEventListener('click', updateLastActivity);
    }, [])


    const registerUserEvent = (eventName, eventType) => {
        const event = {
            eventName,
            userId: "123",
            eventType,
            pageUrl: window.location.href,
            sessionId: sessionId.current,
            eventTimeStamp: new Date().toISOString()
        };
        userEventQueue.current.push(event);
        if (userEventQueue.current.length >= 5) {
            flushUserEventQueue();
        }
    }

    const registerAdminEvent = async (adminEvent) => {
        try {
            const response = await fetch('https://rika-loggingprovider.azurewebsites.net/createadminevent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminEvent),
            });
            console.log(response.json());
            if (!response.ok) {
                console.error('Failed to send event to API');
            } else {
                console.log('Event sent successfully to API');
            }
        } catch (error) {
            console.error('Error sending event to API:', error);
        }
    }

    const flushUserEventQueue = async () => {
        const queueToFlush = [...userEventQueue.current];

        if (queueToFlush.length === 0) return;

        try {
            const response = await fetch('https://rika-loggingprovider.azurewebsites.net//createuserevent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(queueToFlush),
            });
            if (!response.ok) {
                console.error('Failed to send event to API');
            } else {
                console.log('Event sent successfully to API');
            }
        } catch (error) {
            console.error('Error sending event to API:', error);
        } finally {
            console.log('Flushed queue!');
            userEventQueue.current = [];
        }
    }

    useEffect(() => {
        const handleButtonClick = (event) => {
            if (event.target.tagName === 'BUTTON') {
                logButtonClickEvent();
            }
        }
        if (!hasLoaded.current) {
            hasLoaded.current = setInterval(flushUserEventQueue, 10000);
            document.body.addEventListener('click', handleButtonClick);
        }
        registerUserEvent('Page Loaded', 'PageView')
        return () => {
            if (hasLoaded.current) {
                clearInterval(hasLoaded.current);
                hasLoaded.current = null;
                document.body.removeEventListener('click', handleButtonClick);
            }
        };
    }, [location]);

    const logEvent = (eventName, eventType) => {
        registerUserEvent(eventName, eventType);
    };

    const logButtonClickEvent = () => {
        registerUserEvent("Button Click", "ButtonClick")
    }

    const handlePageLeave = () => {
        registerUserEvent('Page Left', 'PageLeave')
    };

    const navigateWithPageLeave = (destination) => {
        handlePageLeave();
        flushUserEventQueue().then(() => {
            navigate(destination)
        })
    }
    return (
        <LoggingContext.Provider value={{ registerAdminEvent, registerUserEvent, navigateWithPageLeave, logEvent, logButtonClickEvent }}>
            {children}
        </LoggingContext.Provider>
    )
}