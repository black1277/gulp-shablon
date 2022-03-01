import {one, other, Bork} from './components/first.js'

console.log(one('js'))

other(3000)
  .then(t=>console.log('res = ', t))
.catch(e=>console.error(e))

let myBork = new Bork('This props from class Bork!')
myBork.onClick()
console.log("myBork.data = ", myBork.data)
myBork.data = 127
console.log(myBork.props)