const deg = 6
const ElementHr = document.getElementById("hr")
const ElementMn = document.getElementById("mn")
const ElementSc = document.getElementById("sc")

const [ elementHourLeft, elementHourRight] = document.querySelectorAll(".dg-hour")
const [ elementMinLeft, elementMinRight] = document.querySelectorAll(".dg-min")
const [ elementSecLeft, elementSecRight] = document.querySelectorAll(".dg-sec")

function clock() {
    const date = new Date()

    const hour = date.getHours() * 30
    const mn = date.getMinutes() * deg
    const sc = date.getSeconds() * deg


    ElementHr.style.transform = `rotateZ(${(hour) + (mn/12)}deg)`
    ElementMn.style.transform = `rotateZ(${mn}deg)`
    ElementSc.style.transform = `rotateZ(${sc}deg)`

    const [ hourLeft, hourRight ] = String(date.getHours()).padStart(2, '0').split('')
    const [ minLeft, minRight ] = String(date.getMinutes()).padStart(2, '0').split('')
    const [ secLeft, secRight ] = String(date.getSeconds()).padStart(2, '0').split('')

   

    elementHourLeft.innerHTML = hourLeft
    elementHourRight.innerHTML = hourRight
    elementMinLeft.innerHTML = minLeft
    elementMinRight.innerHTML = minRight
    elementSecLeft.innerHTML = secLeft
    elementSecRight.innerHTML = secRight

}

clock()

setInterval( clock, 500)




