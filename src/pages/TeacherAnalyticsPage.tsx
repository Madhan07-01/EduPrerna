import React, { useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Mock data for demonstration
const studentPerformanceData = {
  labels: ['Mathematics', 'Science', 'English', 'History', 'Geography'],
  datasets: [
    {
      label: 'Average Grade (%)',
      data: [78, 82, 75, 68, 72],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const classParticipationData = {
  labels: ['Announcements Read', 'Chat Messages', 'Assignment Submissions', 'Resource Downloads', 'Forum Posts'],
  datasets: [
    {
      label: 'Engagement Count',
      data: [120, 85, 95, 110, 65],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
  ],
};

const feedbackData = {
  labels: ['Positive', 'Neutral', 'Negative'],
  datasets: [
    {
      label: 'Student Feedback',
      data: [65, 25, 10],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const studentReportData = [
  { id: 1, name: 'Aisha Patel', math: 85, science: 92, english: 78, history: 65, geography: 72, average: 78.4 },
  { id: 2, name: 'Rahul Singh', math: 92, science: 88, english: 82, history: 75, geography: 80, average: 83.4 },
  { id: 3, name: 'Priya Sharma', math: 78, science: 75, english: 88, history: 82, geography: 70, average: 78.6 },
  { id: 4, name: 'Vikram Mehta', math: 65, science: 72, english: 68, history: 58, geography: 62, average: 65.0 },
  { id: 5, name: 'Neha Gupta', math: 88, science: 90, english: 85, history: 78, geography: 82, average: 84.6 },
  { id: 6, name: 'Arjun Kumar', math: 72, science: 68, english: 75, history: 70, geography: 65, average: 70.0 },
  { id: 7, name: 'Divya Reddy', math: 95, science: 92, english: 88, history: 85, geography: 90, average: 90.0 },
  { id: 8, name: 'Sanjay Verma', math: 82, science: 78, english: 72, history: 68, geography: 75, average: 75.0 },
];

const performanceTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Class Average',
      data: [72, 75, 78, 76, 80, 82],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
    },
  ],
};

const TeacherAnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [shareEmail, setShareEmail] = useState<string>('');

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(studentReportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Performance');
    
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'student_performance_report.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Student Performance Report', 14, 22);
    
    // Add date
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Create table
    const tableColumn = ["ID", "Name", "Math", "Science", "English", "History", "Geography", "Average"];
    const tableRows = studentReportData.map(student => [
      student.id,
      student.name,
      student.math,
      student.science,
      student.english,
      student.history,
      student.geography,
      student.average.toFixed(1)
    ]);
    
    // @ts-ignore - jspdf-autotable types not recognized
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [75, 75, 75] }
    });
    
    doc.save('student_performance_report.pdf');
  };

  const handleShareReport = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the report via email or generate a secure link
    alert(`Report shared with ${shareEmail} successfully!`);
    setShowShareModal(false);
    setShareEmail('');
  };

  return (
    <div className="flex flex-col p-6 bg-slate-950 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Analytics & Reports</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-slate-700 mb-6">
        <button
          className={`py-2 px-4 ${activeTab === 'dashboard' ? 'border-b-2 border-emerald-500 text-emerald-500' : 'text-slate-400 hover:text-white'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard Charts
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'reports' ? 'border-b-2 border-emerald-500 text-emerald-500' : 'text-slate-400 hover:text-white'}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'feedback' ? 'border-b-2 border-emerald-500 text-emerald-500' : 'text-slate-400 hover:text-white'}`}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
      </div>
      
      {/* Dashboard Charts */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Student Performance Overview</h2>
            <div className="h-80">
              <Bar 
                data={studentPerformanceData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                      labels: { color: 'white' }
                    },
                    title: {
                      display: false
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: 'rgba(255, 255, 255, 0.1)' },
                      ticks: { color: 'white' }
                    },
                    x: {
                      grid: { display: false },
                      ticks: { color: 'white' }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Class Participation</h2>
            <div className="h-80">
              <Bar 
                data={classParticipationData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                      labels: { color: 'white' }
                    },
                    title: {
                      display: false
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: 'rgba(255, 255, 255, 0.1)' },
                      ticks: { color: 'white' }
                    },
                    x: {
                      grid: { display: false },
                      ticks: { color: 'white' }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg shadow md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
            <div className="h-80">
              <Line 
                data={performanceTrendData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                      labels: { color: 'white' }
                    },
                    title: {
                      display: false
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      grid: { color: 'rgba(255, 255, 255, 0.1)' },
                      ticks: { color: 'white' }
                    },
                    x: {
                      grid: { display: false },
                      ticks: { color: 'white' }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Reports */}
      {activeTab === 'reports' && (
        <div className="bg-slate-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Student Performance Report</h2>
            <div className="flex gap-2">
              <button 
                onClick={exportToExcel}
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded flex items-center gap-2"
              >
                <span>Export Excel</span>
              </button>
              <button 
                onClick={exportToPDF}
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded flex items-center gap-2"
              >
                <span>Export PDF</span>
              </button>
              <button 
                onClick={() => setShowShareModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center gap-2"
              >
                <span>Share Report</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-900 rounded-lg overflow-hidden">
              <thead className="bg-slate-700">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-center">Math</th>
                  <th className="py-3 px-4 text-center">Science</th>
                  <th className="py-3 px-4 text-center">English</th>
                  <th className="py-3 px-4 text-center">History</th>
                  <th className="py-3 px-4 text-center">Geography</th>
                  <th className="py-3 px-4 text-center">Average</th>
                </tr>
              </thead>
              <tbody>
                {studentReportData.map((student) => (
                  <tr key={student.id} className="border-b border-slate-800 hover:bg-slate-800">
                    <td className="py-3 px-4">{student.id}</td>
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4 text-center">{student.math}</td>
                    <td className="py-3 px-4 text-center">{student.science}</td>
                    <td className="py-3 px-4 text-center">{student.english}</td>
                    <td className="py-3 px-4 text-center">{student.history}</td>
                    <td className="py-3 px-4 text-center">{student.geography}</td>
                    <td className="py-3 px-4 text-center font-semibold">{student.average.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Feedback Visualization */}
      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Student Feedback Overview</h2>
            <div className="h-80 flex items-center justify-center">
              <div className="w-3/4 h-3/4">
                <Pie 
                  data={feedbackData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right' as const,
                        labels: { color: 'white' }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Feedback Categories</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-700 rounded">
                <h3 className="font-semibold text-emerald-400">Positive Feedback (65%)</h3>
                <p className="mt-2 text-sm">Students appreciate the interactive teaching methods and clear explanations of complex topics. Many mentioned the helpful additional resources provided.</p>
              </div>
              <div className="p-4 bg-slate-700 rounded">
                <h3 className="font-semibold text-yellow-400">Neutral Feedback (25%)</h3>
                <p className="mt-2 text-sm">Some students suggested more practice problems and additional review sessions before exams. Others requested more varied teaching methods.</p>
              </div>
              <div className="p-4 bg-slate-700 rounded">
                <h3 className="font-semibold text-red-400">Areas for Improvement (10%)</h3>
                <p className="mt-2 text-sm">A few students mentioned difficulty keeping up with the pace of lessons and would like more time for questions during class.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Share Report</h3>
            <form onSubmit={handleShareReport}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Recipient Email</label>
                <input
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="admin@eduprerna.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                <textarea
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                  placeholder="Here's the latest student performance report..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 rounded"
                >
                  Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAnalyticsPage;