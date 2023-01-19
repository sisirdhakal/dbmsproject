import { DashboardLayout } from '@/components/layout/dashboard';
import { useRouter } from 'next/router'
import React from 'react'

function EditTask() {

  const { query: { taskId } } = useRouter()

  

  return (
    <div>
      EditTask
    </div>
  )
}
EditTask.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default EditTask