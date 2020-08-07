
function showDashboard(){
    $('.form-login').hide()
    $('.register-page').hide()
    $('#homepage').show()
    $("#current-user").html(currentUser(localStorage.email))
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
    return str
}

function logout(){
    localStorage.clear()
    showLogin()
}

function isLogin(){
    if(localStorage.access_token){
        showDashboard()
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

function reloadHomepage(){
    $('#homepage').empty()
}

function dataOfNews(data){
    data.forEach(el => {
        
    });
}

function fetchNews(){
        $.ajax('http://localhost:3000/', {
            method : "GET",
            headers: {
                access_token : localStorage.access_token
            },
        })
        .done(data=>{
            // dataOfNews(data)
            console.log(data.news)
        })
        .fail(err=>{
            console.log(err)
        })
        .always(()=>{
            console.log('LOGIN SUCCES BROH')
        })
}

$(document).ready(()=>{
    // showDashboard()
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