interface Resource {
  id: number
  name: string
  uploadDate: string
  lessonInfo: string
  type: string
}

interface ResourceListTableProps {
  resources: Resource[]
  onDeleteResource: (id: number) => void
}

const ResourceListTable = ({ resources, onDeleteResource }: ResourceListTableProps) => {
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return '📄'
      case 'ppt': return '📊'
      case 'doc': return '📝'
      case 'img': return '🖼️'
      case 'video': return '🎬'
      case 'link': return '🔗'
      default: return '📄'
    }
  }

  const handleView = (resource: Resource) => {
    // In a real app, this would open the file or navigate to view page
    alert(`Viewing: ${resource.name}`)
  }

  const handleEdit = (resource: Resource) => {
    // In a real app, this would open edit dialog or navigate to edit page
    alert(`Editing: ${resource.name}`)
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resource Library</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {resources.length} resource{resources.length !== 1 ? 's' : ''} available
        </div>
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources yet</h3>
          <p className="text-gray-600 dark:text-gray-400">Upload your first resource using the form above</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">File Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Upload Date</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Subject/Grade/Lesson</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource, index) => (
                <tr 
                  key={resource.id} 
                  className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 ${
                    index % 2 === 0 ? 'bg-white dark:bg-slate-900/30' : 'bg-gray-50/50 dark:bg-slate-800/30'
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="mr-3 text-2xl">{getFileIcon(resource.type)}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {resource.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                          {resource.type} FILE
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {new Date(resource.uploadDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {resource.lessonInfo}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleView(resource)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                      >
                        👁️ View
                      </button>
                      <button 
                        onClick={() => handleEdit(resource)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${resource.name}"?`)) {
                            onDeleteResource(resource.id)
                          }
                        }}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ResourceListTable