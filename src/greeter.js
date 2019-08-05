const config =  require('./greeter.json')
let greet = function(){
    let dom = document.createElement('div')
    dom.innerHTML = config.greetText
    dom.classList.add('hellow')

    return dom
}
export {greet}