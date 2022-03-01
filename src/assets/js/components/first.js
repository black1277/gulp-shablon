export const one = (props) => {
  return `<div>${props}</div>`
}

export const other = async (ms) => {
  return new Promise((res) => {
    setTimeout(()=>res(42), ms)
  })
}

export class Bork {
  constructor(a) {
    this.props = a
  }
  onClick() {
    console.log('Click!')
  }
  get data() {
    return this.props
  }
  set data(param) {
    this.props = param
  }
}
