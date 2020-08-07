
function showHomepage(){
    $('.form-login').hide()
    $('.register-page').hide()
    $('#homepage').show()
    $("#current-user").html(`<h1> WELCOME USER ${currentUser(localStorage.email)}</h1>`)
    // fetchNews()
}

function currentUser(email){
    let str = ''
    for (let i = 0; i < email.length; i++) {
        if(email[i] == '@'){
            break
        }else{
            str+= email[i]
        }
    }
    return str.toUpperCase()
}

function logout(){
    localStorage.clear()
    showLogin()
}

function isLogin(){
    if(localStorage.access_token){
        showHomepage()
        fetchNews()
    }else{
        showLogin()
    }
}

function showLogin(){
    $('.form-login').show()
    $('.register-page').hide()
    $('#homepage').hide()
    
}

function showRegister(){
    $('.form-login').hide()
    $('.register-page').show()
    $('#homepage').hide()
}

function reloadCards(){
    $('.cards').empty()
}

function randomText(){
    const random = Math.floor(Math.random() * 3)
    let colors = ''
    switch(random){
        case 1 : 
            colors = `red`
            break
        case 2 : 
            colors = `blue`
            break
        case 3 : 
            colors = `green`
            break
        default :
            colors = `orange`
    }
    return colors
}

function dataOfNews(data){
    data.forEach(el => {
        
    });
}

function fetchNews(){
        reloadCards()
        $.ajax('http://localhost:3000/', {
            method : "GET",
            headers: {
                access_token : localStorage.access_token
            },
        })
        .done(data=>{
            const news = data.news
            news.forEach(el=>{
                $(".cards").append(
                `<div id="${el.id}" class="flex bg-gray-200">
                    <div  class="flex-2 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
                        <div class="max-w-sm rounded overflow-hidden shadow-lg">
                            <img class="w-full" src="${el.fields.thumbnail}" alt="Sunset in the mountains">
                            <div class="px-6 bg-${randomText()}-500 py-4">
                                <div class="font-bold text-xl mb-2">${el.webTitle}</div>
                                
                            </div>
                            
                            <div class="px-6 py-4">
                                <p class="text-gray-700 text-base">
                                ${el.fields.trailText}
                                </p>
                            </div>
                            <button><span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"><a href="${el.webUrl}">READ MORE HERE!</a></span></button>
                            <div class="px-6 py-4">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#${el.sectionName}</span>
                            </div>
                        </div>
                    </div>
                </div>`
                )
            })
        })
        .fail(err=>{
            console.log(err)
        })
        .always(()=>{
            console.log('LOGIN SUCCES BROH')
        })
}

$(document).ready(()=>{
    // showHomepage()
    isLogin()
    
//EVENT FORM BROOOOOOOOOOOOOOOOH
    // EVENT LOGIN-REGISTER
    $("#login-form").submit(event=>{
        event.preventDefault()
        const email = $("#email-login").val()
        const password = $("#password-login").val()
        $.ajax('http://localhost:3000/login', {
            method : "POST",
            data : {
                email,
                password
            }
        })
        .done(data=>{
            // console.log(data)
            localStorage.access_token = data.token
            localStorage.email = email
            $("#password-register").val('')
            $("#email-register").val('')
            isLogin()
        })
        .fail(err=>{
            console.log(err)
        })
        .always(()=>{
            console.log('LOGIN SUCCES BROH')
        })
    })
    
    // REGISTER BERHASIL!! AWAS KALO NGGA
    $('#register-form').submit(event=>{
        event.preventDefault()
        const email = $("#email-register").val()
        const password = $("#password-register").val()
        const hobbies = $("#hobbies-register").val()
        $.ajax('http://localhost:3000/register', {
            method : "POST",
            data : {
                email,
                password,
                hobbies
            }
        })
        .done(data=>{
            $("#password-register").val('')
            $("#email-register").val('')
        })
        .fail(err=>{
            console.log(err)
        })
        .always(()=>{
            console.log('REGISTRATION SUCCES BROH')
        })
    })

// EVENT BUTTON BROOOOOOOOOOOOOOOOOOOOH
    $('#register-button').click(event=>{
        event.preventDefault()
        showRegister()
    })

    $("#logoutButton").click(event=>{
        event.preventDefault()
        logout()
    })  

    
})