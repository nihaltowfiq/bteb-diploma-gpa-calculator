const cgpaForm = document.getElementById('cgpa_form');
const probidhan = document.getElementById('probidhan');
const cgpaInputs = document.querySelectorAll('.form-control');
const formSubmitBtn = document.getElementById('#form_submit');

let allSemesterGPA = [];
let importanceOfGPA = [];

probidhan.value = 2016;

cgpaInputs.forEach((input, index) => {
    input.addEventListener('change', (e) => {
        const value = e.target.value.trim();
        const gpa = validateGPA(value);
        if (gpa) {
            allSemesterGPA[index] = gpa;
        }
    });
});

cgpaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    probidhan.value;

    console.log(allSemesterGPA);
    // console.log(input1st.value);
});

console.log(allSemesterGPA.length);

const validateGPA = (value) => {
    if (value >= 2 && value <= 4) {
        return Number(value);
    }
};
