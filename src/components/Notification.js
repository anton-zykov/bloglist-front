import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const SuccessNotification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification.content) {
    return null
  }
  if (notification.success) {
    return <Alert key='success' variant='success'>{notification.content}</Alert>
  }
  return <Alert key='danger' variant='danger'>{notification.content}</Alert>
}

export default SuccessNotification
