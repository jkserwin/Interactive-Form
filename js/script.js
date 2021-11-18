// Applies focus to Name input field on page load

let nameInput = document.getElementById('name');
nameInput.focus();

// hides Job Role text input field by default 

let jobRoleInput = document.getElementById('other-job-role');
jobRoleInput.style.display = 'none';

// Displays Job Role text input field when user selects "Other" from dropdown

let jobRoleDropdown = document.getElementById('title');
jobRoleDropdown.addEventListener("change", (e) => {
    if (e.target.value = 'other') {
        jobRoleInput.style.display = 'block';
    } else if (e.target.value != 'other') {
        jobRoleInput.style.display = 'none';
    }
});