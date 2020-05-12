import React, { useState } from 'react'
import Popover from '@material-ui/core/Popover';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

export default function EmojiOpener({ emojiSelector }) {
    const [open, setOpen] = useState(false)

    function newEmoji(emoji) {
        emojiSelector(emoji)
    }
    return (
        <div>

            <InsertEmoticonIcon fontSize={"medium"} style={{ cursor: "pointer" }} onClick={() => setOpen(true)} />

            <Popover open={open} onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >>
                <Picker title="" showPreview={false} emoji="" set='twitter'
                    showSkinTones={false} onClick={(emoji, event) => newEmoji(emoji.native)} />
            </Popover>

        </div >
    )
}
