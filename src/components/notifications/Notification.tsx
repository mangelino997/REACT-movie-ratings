import React from 'react'
import IconCheck from '../../icons/check'
import IconCross from '../../icons/cross'

const Notification = (props: { type: any, message: any }) => {
    return (
        <div id="toast"
            className={props.type === "success" ? "show success" : "show error"}>
            <div id="img"
                className={props.type === "success" ? "success" : "error"}>
                {props.type === "success" ?
                    <IconCheck stroke="#fff" fill="#28a745" /> :
                    <IconCross stroke="#fff" fill="#DD4535" />
                }
            </div>
            <div id="desc">{props.message}</div>
        </div>
    )
}

export default Notification
