import { DashboardLayout } from '@/components/layout/dashboard';
import AddTask from '@/components/Tasks/AddTask';
import React from 'react'
import {} from "next/server"

export default function Dashboard() {

    return (
        <>
            <AddTask />
        </>
    )
}

// export const getServerSideProps = async ({ req, res }) => {
//     const { data } = await axios.get(`http://localhost:3000/api/v1/auth/showMe`, { withCredentials: true });

//     // return {
//     //     props: {
//     //         csrf: token,
//     //     },
//     // };
//     if (data) {
//         return {
//             props: {
//                 user: true,
//             },
//         };
//     } else {
//         return {
//             props: {
//                 user: false
//             },
//         };
//     }
// };

Dashboard.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
