import { message } from "antd"

export const UseAlert = (type, content) => {
    const [messageApi, contextHolder] = message.useMessage()
    messageApi.open({
        type: type,
        content: content,
    })
    return (
        <>
            {contextHolder}
        </>
    )
}