import { useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

interface StudentData {
  id: string
  name: string
  class: string
  mathematics: number
  physics: number
  chemistry: number
  biology: number
  computerScience: number
  average: number
  grade: string
}

export default function StudentReports() {
  const [selectedClass, setSelectedClass] = useState<string>('all')
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock student data
  const studentsData: StudentData[] = [
    {
      id: 'STU001',
      name: 'Alice Johnson',
      class: '8A',
      mathematics: 92,
      physics: 88,
      chemistry: 85,
      biology: 90,
      computerScience: 94,
      average: 89.8,
      grade: 'A'
    },
    {
      id: 'STU002',
      name: 'Bob Smith',
      class: '8A',
      mathematics: 78,
      physics: 82,
      chemistry: 79,
      biology: 76,
      computerScience: 85,
      average: 80.0,
      grade: 'B+'
    },
    {
      id: 'STU003',
      name: 'Carol Davis',
      class: '8B',
      mathematics: 95,
      physics: 91,
      chemistry: 89,
      biology: 93,
      computerScience: 97,
      average: 93.0,
      grade: 'A+'
    },
    {
      id: 'STU004',
      name: 'David Wilson',
      class: '8B',
      mathematics: 72,
      physics: 75,
      chemistry: 68,
      biology: 74,
      computerScience: 79,
      average: 73.6,
      grade: 'B'
    },
    {
      id: 'STU005',
      name: 'Emma Brown',
      class: '9A',
      mathematics: 87,
      physics: 84,
      chemistry: 91,
      biology: 88,
      computerScience: 92,
      average: 88.4,
      grade: 'A-'
    }
  ]

  const classes = ['8A', '8B', '9A', '9B', '10A', '10B']
  const subjects = ['mathematics', 'physics', 'chemistry', 'biology', 'computerScience']

  // Filter data based on selected filters
  const filteredData = studentsData.filter((student) => {
    const matchesClass = selectedClass === 'all' || student.class === selectedClass
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesClass && matchesSearch
  })

  // Calculate subject statistics
  const getSubjectStats = (subject: keyof StudentData) => {
    if (typeof studentsData[0][subject] !== 'number') return null
    
    const values = filteredData.map(student => student[subject] as number)
    const average = values.reduce((sum, val) => sum + val, 0) / values.length
    const highest = Math.max(...values)
    const lowest = Math.min(...values)
    
    return { average: average.toFixed(1), highest, lowest }
  }

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(20)
    doc.text('Student Performance Report', 20, 20)
    
    // Add metadata
    doc.setFontSize(12)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35)
    doc.text(`Class Filter: ${selectedClass === 'all' ? 'All Classes' : selectedClass}`, 20, 45)
    
    // Prepare table data
    const tableData = filteredData.map(student => [
      student.id,
      student.name,
      student.class,
      student.mathematics,
      student.physics,
      student.chemistry,
      student.biology,
      student.computerScience,
      student.average.toFixed(1),
      student.grade
    ])
    
    // Add table
    autoTable(doc, {
      head: [['ID', 'Name', 'Class', 'Math', 'Physics', 'Chemistry', 'Biology', 'CS', 'Average', 'Grade']],
      body: tableData,
      startY: 55,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
      },
    })
    
    doc.save('student-performance-report.pdf')
  }

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData.map(student => ({
      'Student ID': student.id,
      'Name': student.name,
      'Class': student.class,
      'Mathematics': student.mathematics,
      'Physics': student.physics,
      'Chemistry': student.chemistry,
      'Biology': student.biology,
      'Computer Science': student.computerScience,
      'Average': student.average,
      'Grade': student.grade
    })))
    
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Performance')
    
    XLSX.writeFile(workbook, 'student-performance-report.xlsx')
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'text-green-600 dark:text-green-400'
      case 'A': case 'A-': return 'text-blue-600 dark:text-blue-400'
      case 'B+': case 'B': return 'text-yellow-600 dark:text-yellow-400'
      case 'B-': case 'C+': return 'text-orange-600 dark:text-orange-400'
      default: return 'text-red-600 dark:text-red-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">📋 Student Performance Reports</h2>
        <div className="flex gap-2">
          <button
            onClick={exportToPDF}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors flex items-center gap-2"
          >
            📄 Export PDF
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors flex items-center gap-2"
          >
            📊 Export Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Class Filter
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Classes</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject Focus
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="computerScience">Computer Science</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search Student
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or ID..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Subject Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {subjects.map((subject) => {
          const stats = getSubjectStats(subject as keyof StudentData)
          const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1).replace(/([A-Z])/g, ' $1')
          
          return (
            <div key={subject} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{subjectName}</h3>
              {stats && (
                <div className="space-y-1">
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Avg: <span className="font-semibold">{stats.average}%</span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    High: <span className="text-green-600 dark:text-green-400">{stats.highest}%</span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Low: <span className="text-red-600 dark:text-red-400">{stats.lowest}%</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Student Performance Table */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Detailed Performance Report ({filteredData.length} students)
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Math
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Physics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Chemistry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Biology
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  CS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Average
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {student.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {student.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {student.mathematics}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {student.physics}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {student.chemistry}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {student.biology}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {student.computerScience}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {student.average.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getGradeColor(student.grade)}`}>
                      {student.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}