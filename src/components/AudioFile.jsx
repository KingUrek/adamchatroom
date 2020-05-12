import React from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function AudioFile({ blob }) {
    const audioUrl = URL.createObjectURL(new Blob([blob], { type: 'audio/mpeg' }));
    let audio = new Audio(audioUrl)
    const classes = useStyles();

    return (
        <Button onClick={() => audio.play()}
            disableRipple={true}
            variant="outlined"
            className={classes.button}
            startIcon={<PlayArrowIcon />}
        >
            Audio
        </Button>

    )
}
