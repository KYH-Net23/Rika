import React, { createContext, useRef, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const LoggingContext = createContext();

export const useLoggingContext = () => useContext(LoggingContext);

export const LoggingProvider = ({ children }) => {
    const navigate = useNavigate();
    const userEventQueue = useRef([]);
    const hasLoaded = useRef(false);
    const location = useLocation();

    const registerUserEvent = (eventName, eventType) => {
        const event = {
            eventName,
            userId: "123",
            eventType,
            pageUrl: window.location.href,
            eventTimeStamp: new Date().toISOString()
        };
        userEventQueue.current.push(event);
        if (userEventQueue.current.length >= 5) {
            flushUserEventQueue();
        }
    }

    const registerAdminEvent = async (adminEvent) => {
        try {
            const response = await fetch('https://localhost:7037/createadminevent/', {
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
            const response = await fetch('https://localhost:7037/createuserevent/', {
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