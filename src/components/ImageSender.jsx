import AttachFileIcon from '@material-ui/icons/AttachFile';
import React, { useState } from 'react'
import ImageUploader from "react-images-upload";
import '../style/ImageSender.css'


function leisso(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
        console.log(e.target.result);
    };



}



export default function ImageSender({ sendImage }) {


    function handlechange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            sendImage(reader.result)
        }

        reader.readAsDataURL(file)

    }
    return (
        <div>
            <label htmlFor="input">
                <AttachFileIcon fontSize={"medium"} />

            </label>
            <input

                onChange={(e) => handlechange(e)}
                id="input"
                type="file"
                accept="image/*" />
            {/* {value ? <img src={url}></img> : null} */}



        </div>

    )
}
