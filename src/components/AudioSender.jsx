import React from 'react'
import vmsg from "vmsg";
import Timer from './Timer';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import AudioFile from './AudioFile';
import MicIcon from '@material-ui/icons/Mic';
import '../style/AudioSender.css'

const recorder = new vmsg.Recorder({
    wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
});

export default class App extends React.Component {
    state = {
        isLoading: false,
        isRecording: false,
        recordings: []
    };

    closeRecorder() {
        recorder.close()
        this.setState({ isRecording: false })

    }

    record = async () => {
        this.setState({ isLoading: true });

        if (this.state.isRecording) {
            const blob = await recorder.stopRecording();
            this.setState({
                isLoading: false,
                isRecording: false,
                // recordings: this.state.recordings.concat(blob)
            });
            this.props.sendAudio(blob)
            // console.log(typeof blob)

        } else {
            try {
                await recorder.initAudio();
                await recorder.initWorker();
                recorder.startRecording();
                this.setState({ isLoading: false, isRecording: true });
            } catch (e) {
                console.error(e);
                this.setState({ isLoading: false });
            }
        }
    };
    render() {
        const { isRecording } = this.state;
        return (
            <React.Fragment>
                {isRecording ?
                    <div className="recording">
                        <CancelOutlinedIcon fontSize={"medium"} onClick={this.closeRecorder.bind(this)}></CancelOutlinedIcon>
                        <Timer></Timer>
                        <CheckCircleOutlinedIcon fontSize={"medium"} onClick={this.record}></CheckCircleOutlinedIcon>

                    </div> : <MicIcon ffontSize={"medium"} onClick={this.record}>
                        Record
                </MicIcon>
                }
                {/* 
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {recordings.map(url => {
                        return (<li>
                            <AudioFile blob={url}></AudioFile>
                        </li>)
                    })}
                </ul> */}
            </React.Fragment >
        );
    }
}



