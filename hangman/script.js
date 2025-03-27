// activating popups //og
// document.querySelector("#show-login").addEventListener("click",function(){
//     document.querySelector("#login").classList.add("active");
//     document.querySelector("#hangman-header").classList.add("h1-active");
//     document.querySelector("#newgame").classList.add("newgame-active");
//     document.querySelector("#profile").classList.remove("active");
//     console.log("active");
// });

// document.querySelector("#sign-in-redirect").addEventListener("click",function(){
//     document.querySelector("#login").classList.remove("active");
//     document.querySelector("#signup").classList.add("active");
//     console.log("active");
// });

// document.querySelector("#show-profile").addEventListener("click",function(){
    
//     document.querySelector("#hangman-header").classList.toggle("h1-active");
//     document.querySelector("#newgame").classList.toggle("newgame-active");
//     document.querySelector("#login").classList.remove("active");
//     document.querySelector("#signup").classList.remove("active");
//     document.querySelector("#profile").classList.toggle("active");
//     console.log("active");
// });

//activating login,signup,profile 

const clickAudio = new Audio('./game/resource/click.mp3'); 


function playClickSound() {
  clickAudio.play();
}

let loginOrSignupClicked = false;

checkLoginStatus();


function checkLoginStatus() {
    let loginStatus = localStorage.getItem("loginStatus");
    let username = localStorage.getItem("username-logged");
    let pfp = localStorage.getItem("username-pfp");

    if (loginStatus === "1") {
        // Update UI elements to reflect logged-in status
        document.querySelector('#username-profile').textContent = username;
        document.querySelector('.profile-pic').src = pfp;
        document.getElementById('show-login').classList.add("loggedin");
        document.getElementById('logout-span').style.visibility='visible';
    } else {
        // logged out status
        document.querySelector('#username-profile').textContent = "Guest";
        document.querySelector('.profile-pic').src = "./game/resource/profile1.jpg";
        document.getElementById('show-login').classList.remove("loggedin");
        document.getElementById('logout-span').style.visibility='hidden';
        
        document.getElementById('wins-profile').textContent = 0;
        document.getElementById('losses-profile').textContent = 0;
        document.getElementById('total-profile').textContent =0;
        document.getElementById("msg-profile").innerText="Welcome new user!!\nLogin to save your progress";
    }
}

document.getElementById("show-how-to-play").addEventListener("click", function() {
    playClickSound();
    // Scroll to the footer content
    document.querySelector(".how-to-play").scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function() {
    // Code to execute after DOM content is fully loaded
    document.getElementById("scroll-to-top-btn").addEventListener("click", function() {
        playClickSound();
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}); 




document.querySelector("#show-login").addEventListener("click", function(){
    playClickSound();
    loginOrSignupClicked = true; // Update the variable when login is clicked
    document.querySelector("#login").classList.add("active");
    document.querySelector("#hangman-header").classList.add("h1-active");
    document.querySelector("#newgame").classList.add("newgame-active");
    document.querySelector("#profile").classList.remove("active");
    console.log("login-active");
    console.log("login/signup status",loginOrSignupClicked);
});

document.querySelector("#sign-in-redirect").addEventListener("click", function(){
    playClickSound();
    loginOrSignupClicked = true; // Update the variable when signup is clicked
    document.querySelector("#login").classList.remove("active");
    document.querySelector("#signup").classList.add("active");
    console.log("signup-active");
    console.log("login/signup status",loginOrSignupClicked);
});

document.querySelector("#show-profile").addEventListener("click", function(){
    playClickSound();

    let logged_username=document.getElementById('username-profile').textContent
    console.log("profile clicked")
    console.log("login/signup status",loginOrSignupClicked);
    
    console.log(logged_username);
    if (logged_username!="Guest")
    {
        document.getElementById("msg-profile").innerText="Welcome back!!\nExcited to play today?";

        //changing profile on click
        // document.getElementById("avatar-img").addEventListener('click', function(){
        //     document.getElementById('avatar-upload').click();
        // });

        console.log(logged_username);
        username_logged=localStorage.getItem("username-logged");
        getprofile(username_logged);
    }
    else{
        document.getElementById("msg-profile").innerText="Fun Fact!!\nLogin to save your progress";
    }
    // Check if login or signup was clicked before profile
    if (loginOrSignupClicked) {
        // If yes, remove classes instead of toggling
        document.querySelector("#hangman-header").classList.add("h1-active");
        document.querySelector("#newgame").classList.add("newgame-active");
        // Reset the variable
        loginOrSignupClicked = false;
    } else {
        // If no, toggle classes
        document.querySelector("#hangman-header").classList.toggle("h1-active");
        document.querySelector("#newgame").classList.toggle("newgame-active");
    }

    // Always toggle profile class
    document.querySelector("#login").classList.remove("active");
    document.querySelector("#signup").classList.remove("active");
    document.querySelector("#profile").classList.toggle("active");
    console.log("active");
});


document.querySelector("#profileclose").addEventListener("click", function(){
    playClickSound();
    document.querySelector("#profile").classList.remove("active");
    if (loginOrSignupClicked) {
        // If yes, remove classes instead of toggling
        document.querySelector("#hangman-header").classList.add("h1-active");
        document.querySelector("#newgame").classList.add("newgame-active");
        // Reset the variable
        loginOrSignupClicked = false;
    } else {
        // If no, toggle classes
        document.querySelector("#hangman-header").classList.toggle("h1-active");
        document.querySelector("#newgame").classList.toggle("newgame-active");
    }
});





// closeing popus
document.querySelector("#close-btn-login").addEventListener("click",function(){
    playClickSound();
    document.querySelector("#login").classList.remove("active");
    document.querySelector("#hangman-header").classList.remove("h1-active");
    document.querySelector("#newgame").classList.remove("newgame-active");
});

document.querySelector("#close-btn-signup").addEventListener("click",function(){
    playClickSound();
    document.querySelector("#login").classList.add("active");
    document.querySelector("#signup").classList.remove("active");
});




//validating all input feilds if empty
//validating if passwords match
//handle response from server side on duplicate username entry0

document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the sign-up button
    document.querySelector("#btn-signup").addEventListener("click", function(event) {
        playClickSound();
        console.log("clicked");
        // Prevent default form submission behavior
        event.preventDefault();


        //password auth
        function checkPasswordStrength(password) {
            var regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%?&])[A-Za-z\d@.#$!^%?&]{8,15}$/;
            return regexPattern.test(password);
        }

        // Get password, confirm password, and username values
        var usernameS = document.getElementById("username-S");
        var passwordS = document.getElementById("password-S");
        var confirmPassword = document.getElementById("confirm-password");
        console.log("Username:", usernameS.value, " Password:", passwordS.value, " Confirm Password:", confirmPassword.value);

        // Reset custom validity messages for all inputs
        usernameS.setCustomValidity('');
        passwordS.setCustomValidity('');
        confirmPassword.setCustomValidity('');

        // Check if any input fields are empty
        if (usernameS.value === '') {
           usernameS.setCustomValidity("Please fill out this field");
            usernameS.reportValidity();
        }
        else if (passwordS.value === '') {
            passwordS.setCustomValidity("Please fill out this field");
            passwordS.reportValidity();
        }
        else if (confirmPassword.value === '') {
            confirmPassword.setCustomValidity("Please fill out this field");
            confirmPassword.reportValidity();
        }
        else if (!checkPasswordStrength(passwordS.value)){
            passwordS.setCustomValidity("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8-15 characters long.");
            passwordS.reportValidity();

        }

        // Check if passwords match
        else if (passwordS.value !== confirmPassword.value) {
            // Set custom validity message for confirm password input
            console.log("Passwords don't match");
            // negativealertBox("Passwords do not match!!!");
            alert("Passwords don't match!!!")
        } 

        else {
            // Submit the form if all validations pass
            if (usernameS.checkValidity() && passwordS.checkValidity() && confirmPassword.checkValidity()) {
                // Send the form data to the server
                // var formData = new FormData();
                // formData.append('username', username.value);
                // formData.append('pass', password.value);
                // formData.append('win', '0');
                // formData.append('loss', '0');
                

                fetch('/',{
                    method: 'post',
                    headers: new Headers({'Content-Type': 'application/json'}),
                    body: JSON.stringify({
                        username:usernameS.value,
                        password:passwordS.value
                    })
                })
                
                .then(response => {
                    if (response.ok) {
                        // Signup successful
                        // positivealertBox("Signup successful!!");
                        alert("Signup Successful!!");

                        // Clear signup form input values
                        document.getElementById("username-S").value = '';
                        document.getElementById("password-S").value = '';
                        document.getElementById("confirm-password").value = '';
                        // Set login form to be active
                        document.querySelector("#login").classList.add("active");
                        document.querySelector("#signup").classList.remove("active");
                        
                        
                    } else if (response.status === 400) {
                        // Username already exists
                        return response.text().then(message => {
                            alert(message);
                            // negativealertBox(message);
                            

                        });
                    } else {
                        // Handle other error cases
                        console.error('Server error:', response.statusText);
                        alert('Error: ' + response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    alert('Error: ' + error.message);
                });
            }
        }
    });
});

// const negativealertBox = (data) => {
//     const alertContainer = document.querySelector('.alert-box');
//     const alertMsg = document.querySelector('.alert');
//     alertMsg.innerHTML = data;

//     // alertContainer.style.top = `4%`;
//     alertContainer.classList.add("negative");
//     setTimeout(() => {
//         alertContainer.classList.remove("negative");
//         // alertContainer.style.top = null;
//     }, 3000);
// }





document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the sign-up button
    document.querySelector("#btn-login").addEventListener("click", function(event) {
        playClickSound();
       
        // Prevent default form submission behavior
        event.preventDefault();

        // Get username and password 
        const usernameL = document.getElementById("username-L");
        const passwordL = document.getElementById("password-L");

        console.log(usernameL.value, passwordL.value);

         // Reset custom validity messages for all inputs
        usernameL.setCustomValidity('');
        passwordL.setCustomValidity('');


        // Check if any input fields are empty
        if (usernameL.value === '')    {
            usernameL.setCustomValidity("Please fill out this field");
            usernameL.reportValidity();
        }
        else if (passwordL.value === '')    {
            passwordL.setCustomValidity("Please fill out this field");
            passwordL.reportValidity();
        }
        else {
            // Submit the form if all validations pass
            if (usernameL.checkValidity() && passwordL.checkValidity() ) {

                fetch('/login',{
                    method: 'post',
                    headers: new Headers({'Content-Type': 'application/json'}),
                    body: JSON.stringify({
                        username:usernameL.value,
                        password:passwordL.value
                    })
                })
                
                .then(response => {
                    if (response.ok) {
                        // Login successful
                        return response.json(); // Parse the JSON response
                    } else if (response.status === 401) {
                        // Username already exists or incorrect password
                        return response.json().then(data => {
                            alert(data.error); // Assuming the server sends back an object with an 'error' property
                            throw new Error('Login failed'); // Throw an error to be caught by the catch block
                        });
                    } else {
                        throw new Error('Unexpected response status');
                    }
                })
                .then(data => {
                    // Display the user's data
                    alert("Login Successful!!");
                    // Assuming you have elements with IDs 'usernameDisplay', 'winsDisplay', and 'lossesDisplay'
                    console.log(data.username, data.win , data.loss);
                   
                    // Saving user, wins and loss
                    // After successful login


                    localStorage.setItem("username-logged", data.username);
                    localStorage.setItem("username-pfp", data.avatarPath);
                    localStorage.setItem("loginStatus","1");
                    checkLoginStatus();
                   
                    document.getElementById('username-profile').textContent = data.username;
                    document.getElementById('wins-profile').textContent = data.win;
                    document.getElementById('losses-profile').textContent = data.loss;
                    document.getElementById('total-profile').textContent = (data.win + data.loss);

                   

                    // Clear signup form input values
                    document.getElementById("username-L").value = '';
                    document.getElementById("password-L").value = '';
                    
                    // Set login form to be active
                    document.querySelector("#login").classList.remove("active");
                    document.querySelector("#hangman-header").classList.remove("h1-active");
                    document.querySelector("#newgame").classList.remove("newgame-active");
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    alert('Error: ' + error.message);
                });
                    
            }          
        }



        
    });
});



async function getprofile(username) {
    let loggedUser = localStorage.getItem("username-logged");
    console.log("Logged in user:", loggedUser);

    if (loggedUser) {
        document.getElementById('username-profile').textContent = loggedUser;
    }

    let logged_username = document.getElementById('username-profile').textContent;

    if (logged_username !== "Guest") {
        try {
            let response = await fetch('/getprofile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error fetching profile:", errorData.error);
                alert(errorData.error || "Failed to fetch profile.");
                return;
            }

            let data = await response.json();

            // Debugging log
            console.log("Profile Data:", data);

            // ✅ Correctly extract win/loss from userProfile
            const userProfile = data.userProfile;
            document.getElementById('wins-profile').textContent = userProfile.win ?? 0;
            document.getElementById('losses-profile').textContent = userProfile.loss ?? 0;
            document.getElementById('total-profile').textContent = (userProfile.win + userProfile.loss) ?? 0;

            // ✅ Update Profile Picture
            let profilePicElement = document.querySelector('.profile-pic');
            if (!data.avatarUrl || data.avatarUrl.includes("placeholder.com")) {
                profilePicElement.src = "./game/resource/profile1.jpg"; // Default Avatar
            } else {
                profilePicElement.src = data.avatarUrl;
                localStorage.setItem("username-pfp", data.avatarUrl);
            }

        } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred while fetching profile.");
        }
    } else {
        console.log("User not logged in");
    }
}



// document.getElementById('avatar-label').addEventListener('click', function() {
//     document.getElementById('avatar-upload').click();
// });
document.getElementById('avatar-img').addEventListener('click', function() {
    playClickSound();
    let logged_username=document.getElementById('username-profile').textContent;
    if (logged_username!="Guest")
    {
    document.getElementById('avatar-upload').click();
    }
});




document.getElementById('avatar-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('avatar', file);
        // Assuming you have the username stored in a variable or input field
        logged_username=document.getElementById('username-profile').textContent
        const username = logged_username; // Replace this with actual username
        formData.append('username', username);

        fetch('/uploadavatar', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log(data); // Log the received data (including the file path)
            // Update the profile picture display with the received file path
            const profilePic = document.querySelector('.profile-pic');
            
            
            profilePic.src = data.avatarPath; // Assuming the received data contains the file path
        })
       
        .catch(error => console.error('Error:', error));
    }
});


document.getElementById('logout-span').addEventListener('click', function() {
    playClickSound();
    this.classList.toggle('clicked');
    document.getElementById('logout-span').style.visibility = 'hidden';
   
    document.querySelector("#profile").classList.remove("active");
    if (loginOrSignupClicked) {
        // If yes, remove classes instead of toggling
        document.querySelector("#hangman-header").classList.add("h1-active");
        document.querySelector("#newgame").classList.add("newgame-active");
        // Reset the variable
        loginOrSignupClicked = false;
    } else {
        // If no, toggle classes
        document.querySelector("#hangman-header").classList.toggle("h1-active");
        document.querySelector("#newgame").classList.toggle("newgame-active");
    }
    
    localStorage.removeItem("username-logged");
    localStorage.removeItem("username-pfp");
    localStorage.setItem("loginStatus", 0);
    checkLoginStatus();


});










//validating all input feilds if empty
//validating if passwords match

// document.addEventListener("DOMContentLoaded", function() {
//     // Add event listener to the sign-up button
//     document.querySelector("#btn-signup").addEventListener("click", function(event) {
//         console.log("clicked");
//         // Prevent default form submission behavior
//         event.preventDefault();

//         // Get password, confirm password, and username values
//         var username = document.getElementById("username");
//         var password = document.getElementById("passWord");
//         var confirmPassword = document.getElementById("confirm-password");
//         console.log("Username:", username.value, " Password:", password.value, " Confirm Password:", confirmPassword.value);

//         // Reset custom validity messages for all inputs
//         username.setCustomValidity('');
//         password.setCustomValidity('');
//         confirmPassword.setCustomValidity('');

//         // Check if any input fields are empty
//         if (username.value === '') {
//             username.setCustomValidity("Please fill out this field");
//             username.reportValidity();
//         }
//         else if (password.value === '') {
//             password.setCustomValidity("Please fill out this field");
//             password.reportValidity();
//         }
//         else if (confirmPassword.value === '') {
//             confirmPassword.setCustomValidity("Please fill out this field");
//             confirmPassword.reportValidity();
//         }

//         // Check if passwords match
//         else if (password.value !== confirmPassword.value) {
//             // Set custom validity message for confirm password input
//             console.log("Passwords don't match");
//             // confirmPassword.setCustomValidity("Passwords Don't Match");
//             // confirmPassword.reportValidity();
//             alert("Passwords do not match!!!");
//         } 

//         else {
//             // Submit the form if all validations pass
            
//             if (username.checkValidity() && password.checkValidity() && confirmPassword.checkValidity()) {
//                 this.closest("form").submit();
//             }
//         }
//     });
// });
