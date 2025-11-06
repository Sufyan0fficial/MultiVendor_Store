import { message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { UserLogout } from '../api/routes'
import { useNavigate } from 'react-router'
import { Message } from '../utils/notifymessage'
import { useDispatch } from 'react-redux'
import { deleteUserData } from '../Redux/UserSlice'

function Logout({setActiveMenu}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [messageApi,contextHolder] = message.useMessage()
    const [isModalOpen, setIsModalOpen] = useState(true)
    const handleOk = async()=>{
        const res = await UserLogout()
        if(res.status === 201){
            dispatch(deleteUserData())
            Message(messageApi,'success','Logout Successful')
            setTimeout(() => {
                navigate('/login')
            }, 1500);
        }
    }
    const handleCancel = ()=>{
        setIsModalOpen(false)
        setActiveMenu(1)
    }
  return (
    <div>
        {contextHolder}
    <Modal
        title="Are you sure to Logout ?"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
      </Modal>
          </div>

  )
}

export default Logout