const spinBtn = document.querySelector('.spin-btn'),
    stopBtn = document.querySelector('.stop-btn'),
    spin1 = document.querySelector('.spinner-1'),
    spin2 = document.querySelector('.spinner-2'),
    spin3 = document.querySelector('.spinner-3'),
    spinSymbols = Array.from(spin1.querySelectorAll('.symbol'))


let stopWheel = false,
    canSpin = true

const spinners = [{
    id: spin1,
    delaySpin: 1000,
    acceleration: 1.2,
    rotSpin: 0
},
{
    id: spin2,
    delaySpin: 1000,
    acceleration: 1.1,
    rotSpin: 0
},
{
    id: spin3,
    delaySpin: 1000,
    acceleration: 1.075,
    rotSpin: 0
}]

const checkSymbols = (delay) => {
    setTimeout(() => {
        const getSymbol = (i) => {
            return spinSymbols[((-30 - spinners[i].rotSpin) / 30) % 12].dataset.value
        }

        const symbol1 = getSymbol(0),
            symbol2 = getSymbol(1),
            symbol3 = getSymbol(2)
        console.log(symbol1, symbol2, symbol3)

        if (symbol1 === symbol2 && symbol1 === symbol3) {
            console.log('you win')
        }
        else {
            console.log('you loose')
        }

        stopWheel = false
        canSpin = true
        spinBtn.style.setProperty('--btn-bottom', '12.5%')
        stopBtn.style.setProperty('--btn-bottom', '12.5%')

    }, 125 + delay * 2)
}

const spinWheel = (spinner) => {
    let firstWheel = true

    const wheelInterval = setInterval(() => {

        const formerDelay = spinner.delaySpin

        stopWheel ? spinner.delaySpin *= spinner.acceleration : spinner.delaySpin > 125 && (spinner.delaySpin /= spinner.acceleration)

        firstWheel ? (stoDelay = 0, firstWheel = false) : stoDelay = spinner.delaySpin

        setTimeout(() => {
            spinner.rotSpin -= 30
            spinner.id.style.setProperty('--rot-spin', spinner.rotSpin + 'deg')
            spinner.id.style.setProperty('--rot-speed', (spinner.delaySpin / 1000) + 's')
            if (spinner.id.dataset.id === "3" && spinner.delaySpin >= 900) { console.log(spinner.delaySpin) }
        }, stoDelay)

        spinner.delaySpin >= 1000 && (
            clearInterval(wheelInterval),
            spinner.id.dataset.id === "3" && checkSymbols(spinner.delaySpin),
            spinner.delaySpin = formerDelay
        )
    }, 100)
}

const spin = () => {
    if (canSpin) {
        for (let i = 0; i < spinners.length; i++) {
            setTimeout(() => spinWheel(spinners[i]), 300 * i)
        }
        spinBtn.style.setProperty('--btn-bottom', '5%')
    }
    canSpin = false
}

const stop = () => {
    console.log('stop')
    stopBtn.style.setProperty('--btn-bottom', '5%')
    stopWheel = true
}

spinBtn.addEventListener('click', spin)

stopBtn.addEventListener('click', stop)