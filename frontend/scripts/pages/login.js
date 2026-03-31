function showLogin(role, element) {

    let forms = document.querySelectorAll(".login-form");
    let tabs = document.querySelectorAll(".tab");

    forms.forEach(form => {
        form.classList.remove("active");
    });

    tabs.forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById(role).classList.add("active");

    element.classList.add("active");

}