import { Spin } from 'antd'
import React from 'react'

function Spinner({ size, className }) {
    const Size = size || 'small'
    return (
        <Spin className={`!absolute  ${className ? className : 'top-1/2 left-[64%] md:left-[64%] lg:left-[62%] -translate-x-1/2 -translate-y-1/2'} [&_.ant-spin-dot-spin]:text-white`} size={Size} />

    )
}

export default Spinner