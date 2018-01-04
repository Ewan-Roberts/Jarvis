let setUpMicrophone = () => {

    let gotStream = stream => {
        
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioContext = new AudioContext();
        let mediaStreamSource = audioContext.createMediaStreamSource( stream );
        let src, fftSize = 1024, 
            ac = new AudioContext()
          , analyser = ac.createAnalyser()
          , timeData = new Uint8Array(fftSize)
          , bar = document.querySelector('.bar');

        analyser.fftSize = fftSize;

        navigator.webkitGetUserMedia({audio: true}, stream => {
          src = ac.createMediaStreamSource(stream);
          src.connect(analyser);
          draw();
        },  e => {
          throw e;
        });

        function draw() {
          let i = '';
          let total = i = 0
            , percentage
            , float
            , rms
            , db;
          analyser.getByteTimeDomainData(timeData);
          while ( i < fftSize ) {
             float = ( timeData[i++] / 0x80 ) - 1;
             total += ( float * float );
          }
          rms = Math.sqrt(total / fftSize);
          db  = 20 * ( Math.log(rms) / Math.log(10) );
          // sanity check
          db = Math.max(-48, Math.min(db, 0));
          percentage = 100 + ( db * 2.083 );

          //65 is like a click

            if(percentage > 88){
                
                // loudNoise();

            }
            
            bar.style.webkitTransform = 'scale('+percentage+','+percentage+')';
            
            webkitRequestAnimationFrame(draw);

        }

    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    navigator.getUserMedia( {audio:true}, gotStream, err => {console.log(err)} );

}


// let loudNoise = () => { 

//     responsiveVoice.speak('Yes?', "UK English Male", {rate: 0.9})

//     responsiveVoice.cancel();

//     socket.emit('musicControls', 'pause')

// };