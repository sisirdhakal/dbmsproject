import { DashboardLayout } from '@/components/layout/dashboard';
import AddTask from '@/components/Tasks/AddTask';
import React from 'react'

export default function Dashboard() {
    return (
        <>
            <AddTask />
        </>
    )
}

Dashboard.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
