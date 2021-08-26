import React, {useState, useEffect, useMemo} from 'react'
import { Progress } from 'antd';


export const CurrentDay = () => {
    //@todo add getting init value from firebase db
    const [habits, setHabits] = useState([
        {
            title: 'habit 1',
            completedSteps: 0,
            totalSteps: 1
        },
        {
            title: 'habit 2',
            completedSteps: 0,
            totalSteps: 1
        },
        {
            title: 'habit 3',
            completedSteps: 1,
            totalSteps: 3
        },
        {
            title: 'habit 4',
            completedSteps: 0,
            totalSteps: 2
        },
        {
            title: 'habit 5',
            completedSteps: 0,
            totalSteps: 4
        },
    ])

    useEffect(() => {
        //@todo add getting init habits from db
    }, [])

const currentDayProgress = useMemo(() => {
    //@todo add calculation
    return 75
}, [habits])

    return (
        <div>
            {/* @todo move header to separate component */}
            <div>HEADER - 
                Add current date here 
                <Progress type="circle" percent={currentDayProgress} />
            </div>

            {/* //@todo habits list to separate component */}
            <div>
                {habits.map(({title, completedSteps, totalSteps}) => (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                trolo
    </div>
))}
            </div>
        </div>
    )

}