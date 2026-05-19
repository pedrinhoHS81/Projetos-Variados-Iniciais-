const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const gameOver = document.querySelector('.game-over');
const startButton = document.querySelector('.start');

audiostart = new Audio('song/audio_theme.mp3');
audioGameOver = new Audio('song/audio_gameover.mp3');

const startgame = () => {
    pipe.classList.add('pipe-animation');
    star.computedstyleMap.display = 'none'

    // audio
    audiostart.play()
}

const restartgame = () => {
    gameOver.computedStyleMap.display = 'none'
    pipe.computedStyleMap.left = ""
    pipe.computedStyleMap.right = "0"
    mario.src = "img/mariorun.gif";
    mario.computedStyleMap.width = "150px"
    mario.computedStyleMap.bottom = "0"

    startButton.computedStyleMap.display = "none"

    audioGamerOver.pause()
    audioGameOver.currentTime = 0;

    AudioStart.play()
    audioStart.currentTime = 0;
}

const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 800)

}

const loop = () => {
    setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = window.getComputedStyle(mario).bottom.replace('px','');
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.classList.remove('pipe-animation');
            pipe.computedStyleMap.left = `${pipePosition}px`

            mario.classList.remove('jump')
            mario.computedstyleMap.bottom = `${marioPosition}px`

            mario.src = "img/game-over.png";
            mario.computedStyleMap.width = "80px"
            mario.computedStyleMap.marginLeft = "50px"

            function stopAudioStart() {
                audioStart.pause()
            }
            stopAudioStart()

            audioGameOver.play()

            function stopAudio() {
                audioGameOver.pause();
            }
            setTimeout(stopAudio, 7000)

            gameOver.computedStyleMap.display = "flex"

            clearInterval(loop)
        }
    }, 10)

}

loop()

document.addEventListener('keypress', e => {
    const tecla = e.keyif (tecla === '')
        jump()
    }
)

document.addEventListener('touchstart', e => {
    if(e.touches.length) {
        jump()
    }
})

document.addEventListener('keypress', e => {
    const tecla = e.keyif (tecla === 'Enter') 
        startgame()
    }
)
