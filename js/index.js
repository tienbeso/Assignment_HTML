let btnSubmit = document.getElementById('btn-submit');
let inputFullName = document.forms['login-form']['fullName'];
let inputEmail = document.forms['login-form']['email'];
let inputPhone = document.forms['login-form']['phoneNumber'];
let selectGender = document.forms['login-form']['gender'];
let txtIntro = document.getElementById('intro');

function showError(input, message) {
    let error = input.parentElement.querySelector('.msg-error');
    error.innerText = message;
    error.style.color = 'red';
}
function clearError() {
    let errors = document.querySelectorAll('.msg-error');
    errors.forEach(function(el) {
        el.innerText = "";
    });
}
function validateForm(e) {
    e.preventDefault();
    clearError();
    let fullName = inputFullName.value.trim();
    let email = inputEmail.value.trim();
    let phone = inputPhone.value.trim();
    let gender = selectGender.value;
    let intro = txtIntro.value.trim();

    let isValid = true;
    if (fullName === "") {
        showError(inputFullName, '*Please enter full name.');
        isValid = false;
    } else if (fullName.length > 50) {
        showError(inputFullName, '*Max 50 characters.');
        isValid = false;
    }
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError(inputEmail, "*Email is required");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError(inputEmail, "*Invalid email format");
        isValid = false;
    }
    if (phone === "") {
        showError(inputPhone, "*Phone number is required");
        isValid = false;
    }

    if (gender === "") {
        showError(selectGender, "*Please select gender");
        isValid = false;
    }
    if (isValid) {

        let hobbyChecked = document.querySelectorAll("input[name='hobby']:checked");
        let hobbyList = [];

        hobbyChecked.forEach(function(hobby) {
            hobbyList.push(hobby.value);
        });

        let result = document.getElementById("result");

        result.innerHTML = `
            <h2>Thông tin đã đăng ký</h2>
            <p><strong>Full name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Hobby:</strong> ${hobbyList.join(", ") || "None"}</p>
            <p><strong>Intro:</strong> ${intro || "None"}</p>
        `;

        document.forms['login-form'].style.display = "none";
        result.style.display = "block";
    }
}
btnSubmit.addEventListener('click', validateForm);
