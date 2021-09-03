const cgpaForm = document.getElementById('cgpa_form');
const probidhan = document.getElementById('probidhan');
const cgpaInputs = document.querySelectorAll('.form-control');
const formSubmitBtn = document.getElementById('#form_submit');

let allSemesterGPA = [];
const importanceOfGPA_2010 = [5, 5, 5, 15, 15, 20, 25, 10];
const importanceOfGPA_2016 = [5, 5, 5, 10, 15, 20, 25, 15];

cgpaInputs.forEach((input, index) => {
    input.addEventListener('change', (e) => {
        const element = e.target;
        const value = element.value.trim();
        const gpa = validateGPA(value);
        if (gpa) {
            allSemesterGPA[index] = gpa;
            document.querySelector(`.m${index}`).remove();
            element.style.border = '1px solid var(--light) ';
        } else {
            if (!document.querySelector(`.m${index}`)) {
                const message = document.createElement('p');
                message.classList = `text-danger invalid_message m${index}`;
                message.innerText = 'Invalid';
                element.parentElement.insertAdjacentElement(
                    'afterend',
                    message
                );
                element.style.border = '2px solid var(--danger)';
            }
        }
    });
});

cgpaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(probidhan.value);
    console.log(allSemesterGPA, allSemesterGPA.length);
    console.log(getResult(allSemesterGPA));
});

const getResult = (gpa) => {
    const selectedProbidhan = probidhan.value;
    let i = 0;
    let cGpa = 0;
    if (selectedProbidhan === '2010') {
        cGpa = gpa
            .map((gpa) => gpa * (importanceOfGPA_2010[i++] / 100))
            .reduce((acc, value) => acc + value, 0);
    } else {
        cGpa = gpa
            .map((gpa) => gpa * (importanceOfGPA_2016[i++] / 100))
            .reduce((acc, value) => acc + value, 0);
    }
    return cGpa;
};

const validateGPA = (value) => {
    if (value >= 2 && value <= 4) {
        return Number(value);
    }
};
