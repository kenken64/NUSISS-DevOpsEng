import React, { Component } from 'react';
import FontPicker from "font-picker-react";
import PropTypes from "prop-types";
import ReactTypingEffect from './ReactTypingEffect';
import SpeechRecognition from 'react-speech-recognition'
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import './App.css';

const options = {
  autoStart: true,
  continuous: true
}
//
const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  startListening: PropTypes.func,
  listening: PropTypes.bool,
  recognition : PropTypes.object,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class App extends Component {
  constructor(props) {
    super(props);
    this.onSelectFlag = this.onSelectFlag.bind(this);
    this.state = {
      activeFontFamily: "Open Sans",
    };
  }

  reset() {
    this.setState({
      transcript: undefined,
    });
  }

  onSelectFlag(countryCode){
    if(countryCode === 'GB'){
      console.log("Great Britian");
      this.props.recognition.lang = "en-GB";
    }
    else if(countryCode === 'CN'){
      console.log("China");
      this.props.recognition.lang = "zh-CN";
    }else{
      console.log("USA");
      this.props.recognition.lang = "en-US";
    }
    
  } 

  render() {
    const { transcript, resetTranscript, startListening, listening, browserSupportsSpeechRecognition } = this.props;
    if (!browserSupportsSpeechRecognition) {
      return null
    }
    const speedVal =1;
    return (
      <div className="App">
        <header className="App-header">
          <ReactTypingEffect 
            text={transcript} speed={speedVal} className="apply-font apply-font-size" cursorClassName="text" resetTranscript={resetTranscript} startListening={startListening}  listening={listening}/>
            <FontPicker
              apiKey="AIzaSyCpdeRd7M5AIGLNx6TH1Dov4Fki8LQJzJc"
              activeFontFamily={this.state.activeFontFamily}
              onChange={nextFont =>
                this.setState({
                  activeFontFamily: nextFont.family,
                })
              }
            />
            <ReactFlagsSelect
                countries={["US", "GB", "CN", "MY"]} defaultCountry="US"
                onSelect={this.onSelectFlag}/>
        </header>
        
      </div>
      
    );
  }
}

App.propTypes = propTypes
export default SpeechRecognition(options)(App);
