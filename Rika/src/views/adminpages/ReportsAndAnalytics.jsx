import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBack from '../../common/ArrowBack';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ReportsAndAnalytics = () => {
 
    const navigate = useNavigate();
    const [userEventsCount, setUserEventsCount] = useState(0);
    const [sessionIds, setSessionIds] = useState([]);
    const [sessionIdsCount, setSessionIdsCount] = useState(0);
    const [selectedSessionId, setSelectedSessionId] = useState("");
    const [events, setEvents] = useState([]);

    const [dailyEventsSplineOptions, setDailyEventsSplineOptions] = useState ({
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Events'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Time',
            },
        },
        yAxis: {
            title: {
                text: 'Number of Events'
            },
        },
        series: [
          {
            name: 'Events',
            data: [],
          },
        ],
    });

    const sessionsPieOptions = {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Sessions'
        },
        series: [
          {
            data: [sessionIdsCount]
          }
        ]
    };

    useEffect(() => {

        Highcharts.setOptions({
            time: {
                timezone: 'Europe/Stockholm',
            },
        });

        const fetchDailyEvents = async () => {
            try{
                const response = await fetch(`https://localhost:7037/getUserEvents/daily-events`)
                if(!response.ok){
                    throw new Error("Failed to fetch user events count.");
                }
                const data = await response.json();

               const formattedData = data.map((item) => [
                    new Date(item.hourlyBucket).getTime(),
                    item.eventCount,
               ]);

                setDailyEventsSplineOptions((prev) => ({
                    ...prev,
                    series: [
                        {
                            name: 'Events',
                            data: formattedData,
                        },
                    ],
                }));
            } catch (error) {
                console.error("Error fetching daily events", error)
            }
        }

        const fetchUserEventsCount = async () => {
            try{
                const response = await fetch(`https://localhost:7037/getUserEvents/count`);
                if(!response.ok){
                    throw new Error("Failed to fetch user events count.");
                }
                const data = await response.json();
                setUserEventsCount(data);
            } catch (error) {
                console.error("Error fetching user events count", error)
            }
        }

        const fetchSessionIds = async () => {
            try {
                const response = await fetch(`https://localhost:7037/getUserEvents/sessionIds`);
                if (!response.ok) {
                    throw new Error("Failed to fetch session IDs.");
                }
                const data = await response.json();
                setSessionIds(data);
                setSessionIdsCount(data.length);
            } catch (error) {
                console.error("Error fetching session IDs:", error)
            }
        };
        fetchDailyEvents();
        fetchUserEventsCount();
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
            <div className="flex justify-start items-center gap-4 mb-6">
                <ArrowBack goBackTo={"/admin"} />
                <h1 className="text-xl font-bold">📊 Reports & Analytics</h1>
            </div>

            <div className='flex flex-col gap-4'>

            <div className='bg-white rounded-lg shadow-md p-4'>
                    <div className='space-y-5'>
                        <h1 className='font-bold'>Overview</h1>
                        <div className='grid grid-cols-2 gap-4'>      
                            <div className='bg-white border-2 rounded-lg shadow-md p-4'>
                                {sessionIdsCount > 0 ? (
                                    <HighchartsReact highcharts={Highcharts} options={dailyEventsSplineOptions} />
                                ) : (
                                    <div className='bg-red-100  text-red-700 px-4 py-3 rounded'>
                                        <p>Couldn't fetch chart</p>
                                    </div>
                                )}       
                            </div>
                            <div className='bg-white border-2 rounded-lg shadow-md p-4'>
                                {sessionIdsCount > 0 ? (
                                    <HighchartsReact highcharts={Highcharts} options={sessionsPieOptions} />
                                ) : (
                                    <div className='bg-red-100  text-red-700 px-4 py-3 rounded'>
                                        <p>Couldn't fetch chart</p>
                                    </div>
                                )}       
                            </div>
                            
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='bg-white border-2 rounded-lg shadow-md p-4'>
                                Sessions
                                <h1 className='text-center font-bold my-5'>{sessionIdsCount}</h1>
                            </div>
                            <div className='bg-white border-2 rounded-lg shadow-md p-4'>
                                Event Count
                                <h1 className='text-center font-bold my-5'>{userEventsCount}</h1>
                            </div>
                          
                        </div>
                    </div>
                </div>

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