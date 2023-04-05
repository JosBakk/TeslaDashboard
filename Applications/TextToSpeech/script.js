const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

//speechBtn2 = document.querySelector("button2");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
	
	// Define the file path
const filePath = 'test.txt';

// Create a new instance of the XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Use the GET method to retrieve the contents of the file
xhr.open('GET', filePath);

// Set the responseType to 'text' to indicate that the response should be treated as text
xhr.responseType = 'text';

// Set up a callback function to handle the response
xhr.onload = function() {
  // Check if the status code indicates success
  if (xhr.status === 200) {
    // If so, display the contents of the file in an alert box
    alert(xhr.response);
  } else {
    // Otherwise, display an error message
    alert('Error loading file');
  }
};

// Send the request
xhr.send();

	
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech('Heisann gamle gubben.');
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});