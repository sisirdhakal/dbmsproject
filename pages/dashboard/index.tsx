import { DashboardLayout } from '@/components/layout/dashboard';
import React from 'react'

export default function Dashboard() {
    return (
        <>Dashboard</>
    )
}

Dashboard.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
