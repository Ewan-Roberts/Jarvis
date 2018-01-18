
let setUpMicrophone = () => {

    let gotStream = stream => {
        
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioContext = new AudioContext();
        let mediaStreamSource = audioContext.createMediaStreamSource( stream );

        let src, fftSize = 1024, 
            ac = new AudioContext()
          , analyser = ac.createAnalyser()
          , timeData = new Uint8Array(fftSize)
          , voiceCircle = document.querySelector('.voiceCircle');
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
            , float
            , rms;
          analyser.getByteTimeDomainData(timeData);

          while ( i < fftSize ) {

             float = ( timeData[i++] / 0x80 ) - 1;
             total += ( float * float );

          }

          rms = Math.sqrt(total*100)+20;
          voiceCircle.style.webkitTransform = 'scale('+rms+')';
          webkitRequestAnimationFrame(draw);

        }

    }

    // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

    navigator.getUserMedia( {audio:true}, gotStream, err => {console.log(err)} );

}
