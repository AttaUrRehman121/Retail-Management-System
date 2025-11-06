
import React from 'react';
import { ActivityLog } from '../../types';

interface ActivityLogViewProps {
    activityLog: ActivityLog[];
}

const ActivityLogView: React.FC<ActivityLogViewProps> = ({ activityLog }) => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Activity Log</h1>
            <div className="bg-surface rounded-lg shadow-sm border">
                <table className="w-full text-left">
                    <thead className="border-b">
                        <tr>
                            <th className="p-4">Date & Time</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activityLog.map(log => (
                            <tr key={log.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{new Date(log.date).toLocaleString()}</td>
                                <td className="p-4">{log.user}</td>
                                <td className="p-4">{log.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivityLogView;
