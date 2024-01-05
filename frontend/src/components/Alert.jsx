import React from "react"

const Alert = ({mensaje}) => (
    <div class="alert alert-danger d-grid col-4 mx-auto mb-2" role="alert">
        { mensaje }
    </div>
)

export default Alert