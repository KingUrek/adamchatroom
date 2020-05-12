import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ComputerIcon from "@material-ui/icons/Computer";
import '../style/NewRoomButton.css'
import { makeStyles } from '@material-ui/core/styles';
var randomId = require('random-id');

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function NewRoomButton({ socket }) {
    const [name, setName] = useState('')

    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [helperText, setHelperText] = useState('')
    const classes = useStyles();




    function handleSubmit(e) {
        e.preventDefault();
        if (!name) {
            setError(true);
            setHelperText("Choose a room name");
        } else {
            var id = randomId()

            socket.emit('create_room', { name, id })
            setName('')
            setError(false)
            setOpen(false)

        }
    }



    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
            >
                New Room
        </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="modal">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            className={classes.margin}
                            error={error}
                            helperText={helperText}
                            placeholder="Awesome room"
                            id="input-with-icon-textfield"
                            label="Room Name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ComputerIcon />
                                    </InputAdornment>
                                ),
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            type="submit"

                        >
                            Create
                        </Button>
                    </form>

                </div>


            </Modal>
        </>
    )
}
