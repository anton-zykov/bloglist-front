import { useSelector } from 'react-redux'

const SuccessNotification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification.content) {
    return null
  }
  if (notification.success) {
    return <div className='success'>{notification.content}</div>
  }
  return <div className='error'>{notification.content}</div>
}

export default SuccessNotification
