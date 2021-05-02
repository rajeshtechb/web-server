
const formSelector = document.querySelector('form')

const search = document.querySelector('input')

const messageOne =document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

formSelector.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+search.value).then((res)=>{
        res.json().then((data) =>{
            if(data.error){
             messageOne.textContent = data.error
            }else{
                messageTwo.textContent = data.forecastData
            }
        })
      })
      
})