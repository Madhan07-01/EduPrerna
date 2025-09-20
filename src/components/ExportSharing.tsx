import { useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface ReportConfig {
  title: string
  description: string
  includeCharts: boolean
  includeStudentData: boolean
  includeFeedback: boolean
  dateRange: 'week' | 'month' | 'semester' | 'custom'
  format: 'pdf' | 'excel'
  recipients: string[]
}

export default function ExportSharing() {
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    title: 'Monthly Performance Report',
    description: 'Comprehensive analysis of student performance and engagement',
    includeCharts: true,
    includeStudentData: true,
    includeFeedback: true,
    dateRange: 'month',
    format: 'pdf',
    recipients: []
  })

  const [emailList, setEmailList] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  // Predefined admin contacts
  const adminContacts = [
    { name: 'Principal', email: 'principal@eduprerna.edu', department: 'Administration' },
    { name: 'Academic Coordinator', email: 'academic@eduprerna.edu', department: 'Academics' },
    { name: 'Vice Principal', email: 'vp@eduprerna.edu', department: 'Administration' }
  ]

  const generateComprehensiveReport = async () => {
    setIsGenerating(true)
    
    try {
      const doc = new jsPDF()
      
      // Add header
      doc.setFontSize(24)
      doc.setTextColor(59, 130, 246)
      doc.text('EduPrerna Analytics Report', 20, 25)
      
      // Add metadata
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text(`Report Title: ${reportConfig.title}`, 20, 45)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 55)
      doc.text(`Period: ${reportConfig.dateRange}`, 20, 65)
      doc.text(`Description: ${reportConfig.description}`, 20, 75)
      
      let currentY = 90
      
      // Executive Summary
      if (reportConfig.includeCharts) {
        doc.setFontSize(16)
        doc.setTextColor(59, 130, 246)
        doc.text('Executive Summary', 20, currentY)
        currentY += 15
        
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)
        const summaryData = [
          ['Metric', 'Value', 'Trend'],
          ['Total Students', '127', '+5.2%'],
          ['Average Performance', '83.2%', '+2.1%'],
          ['Assignment Completion', '89%', '-1.3%'],
          ['Student Engagement', '84%', '+7.8%'],
          ['Positive Feedback', '72%', '+4.5%']
        ]
        
        autoTable(doc, {
          head: [summaryData[0]],
          body: summaryData.slice(1),
          startY: currentY,
          theme: 'grid',
          headStyles: { fillColor: [59, 130, 246] }
        })
        
        currentY = (doc as any).lastAutoTable.finalY + 20
      }
      
      // Student Performance Data
      if (reportConfig.includeStudentData) {
        doc.setFontSize(16)
        doc.setTextColor(59, 130, 246)
        doc.text('Student Performance Analysis', 20, currentY)
        currentY += 15
        
        const performanceData = [
          ['Subject', 'Class Average', 'Highest Score', 'Lowest Score', 'Std Deviation'],
          ['Mathematics', '85%', '98%', '64%', '12.3'],
          ['Physics', '78%', '95%', '52%', '15.7'],
          ['Chemistry', '82%', '96%', '58%', '13.2'],
          ['Biology', '79%', '94%', '61%', '11.8'],
          ['Computer Science', '88%', '99%', '67%', '10.5']
        ]
        
        autoTable(doc, {
          head: [performanceData[0]],
          body: performanceData.slice(1),
          startY: currentY,
          theme: 'striped',
          headStyles: { fillColor: [16, 185, 129] }
        })
        
        currentY = (doc as any).lastAutoTable.finalY + 20
      }
      
      // Add new page if needed
      if (currentY > 250) {
        doc.addPage()
        currentY = 20
      }
      
      // Feedback Summary
      if (reportConfig.includeFeedback) {
        doc.setFontSize(16)
        doc.setTextColor(59, 130, 246)
        doc.text('Student Feedback Summary', 20, currentY)
        currentY += 15
        
        const feedbackData = [
          ['Category', 'Positive', 'Neutral', 'Negative', 'Avg Rating'],
          ['Teaching Quality', '78%', '18%', '4%', '8.2/10'],
          ['Course Content', '71%', '23%', '6%', '7.8/10'],
          ['Engagement', '82%', '15%', '3%', '8.5/10'],
          ['Assignments', '65%', '28%', '7%', '7.4/10'],
          ['Overall Experience', '75%', '20%', '5%', '8.0/10']
        ]
        
        autoTable(doc, {
          head: [feedbackData[0]],
          body: feedbackData.slice(1),
          startY: currentY,
          theme: 'grid',
          headStyles: { fillColor: [245, 158, 11] }
        })
        
        currentY = (doc as any).lastAutoTable.finalY + 20
      }
      
      // Add recommendations
      doc.setFontSize(16)
      doc.setTextColor(59, 130, 246)
      doc.text('Recommendations', 20, currentY)
      currentY += 15
      
      const recommendations = [
        '• Focus on improving Physics performance through additional practice sessions',
        '• Implement more interactive elements to boost engagement',
        '• Consider revising assignment difficulty based on student feedback',
        '• Maintain current teaching methodology for high-performing subjects',
        '• Increase practical examples in Chemistry and Biology classes'
      ]
      
      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)
      recommendations.forEach(rec => {
        doc.text(rec, 20, currentY)
        currentY += 10
      })
      
      // Footer
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.text('Generated by EduPrerna Analytics Dashboard', 20, 280)
      doc.text('Confidential - For Educational Use Only', 20, 285)
      
      const filename = `eduprerna-analytics-${reportConfig.dateRange}-${Date.now()}.pdf`
      doc.save(filename)
      
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Error generating report. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateSecureLink = () => {
    // In a real application, this would generate a secure, time-limited link
    const linkId = Math.random().toString(36).substring(2, 15)
    const secureLink = `https://eduprerna.edu/reports/secure/${linkId}`
    setShareLink(secureLink)
    
    // Copy to clipboard
    navigator.clipboard.writeText(secureLink)
    alert('Secure link generated and copied to clipboard!')
  }

  const sendEmailReport = () => {
    const emails = emailList.split(',').map(email => email.trim()).filter(email => email)
    if (emails.length === 0) {
      alert('Please enter at least one email address')
      return
    }
    
    // In a real application, this would send the email via backend API
    alert(`Report would be sent to: ${emails.join(', ')}`)
    setEmailList('')
  }

  const addAdminEmail = (email: string) => {
    const emails = emailList.split(',').map(e => e.trim()).filter(e => e)
    if (!emails.includes(email)) {
      setEmailList(emails.length > 0 ? `${emailList}, ${email}` : email)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">📤 Export & Sharing</h2>
        <div className="flex gap-2">
          <button
            onClick={generateComprehensiveReport}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md transition-colors flex items-center gap-2"
          >
            {isGenerating ? '⏳' : '📊'} 
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
          <button
            onClick={generateSecureLink}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors flex items-center gap-2"
          >
            🔗 Generate Secure Link
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
          ✅ Report generated successfully and downloaded!
        </div>
      )}

      {/* Report Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Report Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Report Title
              </label>
              <input
                type="text"
                value={reportConfig.title}
                onChange={(e) => setReportConfig({...reportConfig, title: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={reportConfig.description}
                onChange={(e) => setReportConfig({...reportConfig, description: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date Range
              </label>
              <select
                value={reportConfig.dateRange}
                onChange={(e) => setReportConfig({...reportConfig, dateRange: e.target.value as any})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="semester">This Semester</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Include Sections
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportConfig.includeCharts}
                    onChange={(e) => setReportConfig({...reportConfig, includeCharts: e.target.checked})}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Dashboard Charts</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportConfig.includeStudentData}
                    onChange={(e) => setReportConfig({...reportConfig, includeStudentData: e.target.checked})}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Student Performance Data</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportConfig.includeFeedback}
                    onChange={(e) => setReportConfig({...reportConfig, includeFeedback: e.target.checked})}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Feedback Analysis</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sharing Options */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sharing Options</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quick Add Admin Contacts
              </label>
              <div className="space-y-2">
                {adminContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{contact.department}</div>
                    </div>
                    <button
                      onClick={() => addAdminEmail(contact.email)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Recipients (comma-separated)
              </label>
              <textarea
                value={emailList}
                onChange={(e) => setEmailList(e.target.value)}
                placeholder="admin@school.com, principal@school.com"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                rows={3}
              />
              <button
                onClick={sendEmailReport}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                📧 Send Email Report
              </button>
            </div>
            
            {shareLink && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Secure Share Link (24hr expiry)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(shareLink)}
                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    📋 Copy
                  </button>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  This link will expire in 24 hours and requires admin authentication to access.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export History */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Exports</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            {[
              { name: 'Monthly Performance Report', date: '2024-01-15', format: 'PDF', status: 'Completed' },
              { name: 'Weekly Analytics Summary', date: '2024-01-08', format: 'Excel', status: 'Completed' },
              { name: 'Semester Overview Report', date: '2024-01-01', format: 'PDF', status: 'Shared with Admin' }
            ].map((export_, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-3 rounded">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{export_.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {export_.format} • {export_.date}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600 dark:text-green-400">{export_.status}</span>
                  <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}