import React, { createContext, useRef, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const LoggingContext = createContext();

export const useLoggingContext = () => useContext(LoggingContext);

export const LoggingProvider = ({ children }) => {
    const navigate = useNavigate();
    const eventQueue = useRef([]);
    const hasLoaded = useRef(false);
    const location = useLocation();
    const trackEvent = (eventName, eventType) => {
        const event = {
            eventName,
            userId: "123",
            eventType,
            pageUrl: window.location.href,
            eventTimeStamp: new Date().toISOString()
        };
        eventQueue.current.push(event);
        if (eventQueue.current.length >= 5) {
            // flushEventQueue();
        }
    }

    const flushEventQueue = async () => {
        const queueToFlush = [...eventQueue.current];

        if (queueToFlush.length === 0) return;

        try {
            const response = await fetch('https://localhost:7037/api/Logging', {
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
            eventQueue.current = [];
        }
    }

    useEffect(() => {
        const handleButtonClick = (event) => {
            if (event.target.tagName === 'BUTTON') {
                logButtonClickEvent();
            }
        }
        if (!hasLoaded.current) {
            hasLoaded.current = setInterval(flushEventQueue, 10000);
            document.body.addEventListener('click', handleButtonClick);
        }
        trackEvent('Page Loaded', 'PageView')
        return () => {
            if (hasLoaded.current) {
                clearInterval(hasLoaded.current);
                hasLoaded.current = null;
                document.body.removeEventListener('click', handleButtonClick);
            }
        };
    }, [location]);

    const logEvent = (eventName, eventType) => {
        trackEvent(eventName, eventType);
    };

    const logButtonClickEvent = () => {
        trackEvent("Button Click", "ButtonClick")
    }

    const handlePageLeave = () => {
        trackEvent('Page Left', 'PageLeave')
    };

    const navigateWithPageLeave = (destination) => {
        handlePageLeave();
        flushEventQueue().then(() => {
            navigate(destination)
        })
    }
    return (
        <LoggingContext.Provider value={{ trackEvent, navigateWithPageLeave, logEvent, logButtonClickEvent }}>
            {children}
        </LoggingContext.Provider>
    )
}