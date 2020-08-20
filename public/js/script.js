// fetch('http://localhost:3000/weather?address=Boston').then( (response) => {
//     response.json().then( (data) => {
//         if(data.error) {
//             console.log(data.error)
//         }
//         else{
//             console.log(data.data)
//         }
//     })
// })
var weatherForm= document.querySelector('form')
var search= document.querySelector('input')
var msg1= document.querySelector('#m1')
var msg2= document.querySelector('#m2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchloc= search.value
    fetch('/weather?address='+ searchloc).then( (response) => {
    response.json().then( (data) => {
        if(data.error) {
            msg1.textContent= "* "+ data.error
        }
        else{
            msg1.textContent= "* Your search result for " +data.location
            msg2.textContent= "* " +data.data
        }
    })
})

})