import { ReportStatus as Status } from '@prisma/client'

interface StatusProps {
  status: Status
  className?: string
}

export default function ReportStatus({ status, className = '' }: StatusProps) {
  const getStatusColor = (status: Status): string => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'RESOLVED':
        return 'bg-green-100 text-green-800'
      case 'DISMISSED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)} ${className}`}>
      {status.replace('_', ' ')}
    </span>
  )
}
