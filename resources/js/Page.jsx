import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import DashboardMetrics from '../components/DashBoardMetrics'
import RecentActivity from '../components/recentActivity'
import Sidebar from '../components/sideBar'
import RecentUsers from '../components/RecentUsers'

function PageMain() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <input
              type="text"
              placeholder="Search..."
              className="border px-4 py-2 rounded-md"
            />
          </div>

          {/* Components */}
          <DashboardMetrics />
          <RecentActivity />
          <RecentUsers />
        </main>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('ReactMain')).render(<PageMain />);

// if(document.getElementById('ReactMain')){
//     createRoot(document.getElementById('ReactMain')).render(<PageMain/>);
// }