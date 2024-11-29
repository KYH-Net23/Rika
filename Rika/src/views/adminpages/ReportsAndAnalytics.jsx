import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ReportsAndAnalytics = () => {

    const navigate = useNavigate();
    const [sessionIds, setSessionIds] = useState([]);
    const [selectedSessionId, setSelectedSessionId] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchSessionIds = async () => {
            try {
                const response = await fetch(`https://localhost:7037/getUserEvents/sessionIds`);
                if (!response.ok) {
                    throw new Error("Failed to fetch session IDs.");
                }
                const data = await response.json();
                setSessionIds(data);
            } catch (error) {
                console.error("Error fetching session IDs:", error)
            }
        };
        fetchSessionIds();
    }, [])

    const fetchEvents = async () => {
        if (!selectedSessionId) return;

        try {
            const response = await fetch(`https://localhost:7037/getUserEvents/${selectedSessionId}`)
            if (!response.ok) {
                throw new Error("Failed to fetch events.");
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error)
        }
    }

    return (

        <div className="bg-gray-100 min-h-screen p-4">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">📊 Reports & Analytics</h1>
            </div>

            <div className='space-y-4'>
                <div className='bg-white rounded-lg shadow-md p-4'>
                    <div className='space-y-2'>
                        <h1 className='font-bold'>Get user session</h1>
                        <div className='flex flex-col items-start gap-3'>
                            <label htmlFor='sessionDropdown'>Selected Session:</label>

                            <select id="sessionDropdown" className='bg-gray-50 border border-gray-300 text-sm rounded-lg' value={selectedSessionId} onChange={(e) => setSelectedSessionId(e.target.value)}>
                                <option value="">Select a Session</option>
                                {sessionIds.map((id) => (
                                    <option key={id} value={id}>
                                        {id}
                                    </option>
                                ))}
                            </select>
                            <button className="bg-black hover:bg-gray-800 transition-colors duration-300 text-white font-bold border border-gray-300 py-2 px-4 rounded-full" onClick={fetchEvents} disabled={!selectedSessionId}>
                                Get Session Events
                            </button>
                        </div>

                    <div className='flex justify-center'>
                        <div className='space-y-4'>
                            {events.map((event, index) => (
                                <div key={index} className='flex items-center'>

                                    <div className='relative flex flex-col items-center'>
                                        <div className='w-6 h-6 bg-blue-500 rounded-full'></div>

                                        {index < events.length - 1 && (
                                            <div className='absolute top-6 h-16 border-2 border-blue-500'></div>
                                        )}
                                    </div>

                                    <div className='ml-4'>
                                        <p className='text-sm text-gray-500'>{event.eventTimeStamp}</p>
                                        <p className='text-base font-semibold text-gray-800'>{event.eventType}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportsAndAnalytics