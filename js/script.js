const cgpaForm = document.getElementById('cgpa_form');
const probidhan = document.getElementById('probidhan');
const cgpaInputs = document.querySelectorAll('.form-control');
const resultArea = document.querySelector('.result_group');
const extarActionArea = document.querySelector('.extra_action');
const submitBtn = document.getElementById('#form_submit');
const printBtn = document.querySelector('.print');
const resetBtn = document.querySelector('.reset');

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
            if (document.querySelector(`.m${index}`)) {
                document.querySelector(`.m${index}`).remove();
                element.style.border = '1px solid var(--light) ';
            }
        } else {
            delete allSemesterGPA[index];
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
        console.log({ allSemesterGPA });
    });
});

cgpaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = allSemesterGPA.findIndex((el) => el === undefined);

    if (allSemesterGPA.length === 8) {
        if (invalid === -1) {
            const cgpa = getResult(allSemesterGPA);
            const finalResult = (Math.round(cgpa * 100) / 100).toFixed(2);
            resultArea.innerHTML = `
                <h5 class="text-warning">Your cGPA is ${finalResult}</h5>
            `;
            extarActionArea.style.display = 'block';
        } else if (invalid !== -1) {
            showValidateMsg();
        }
    } else {
        showValidateMsg();
    }
});

printBtn.addEventListener('click', () => {
    window.print();
});
resetBtn.addEventListener('click', () => {
    window.location.reload();
});

const getResult = (gpa) => {
    const selectedProbidhan = probidhan.value;
    let cGpa = 0;
    if (selectedProbidhan === '2010') {
        cGpa = getCgpa(gpa, importanceOfGPA_2010);
    } else {
        cGpa = getCgpa(gpa, importanceOfGPA_2016);
    }
    return cGpa;
};
const getCgpa = (gpa, formula) => {
    let i = 0;
    return gpa
        .map((gpa) => gpa * (formula[i++] / 100))
        .reduce((acc, value) => acc + value, 0);
};
const showValidateMsg = () => {
    const element = document.querySelector('.validateMsg');
    const message = document.createElement('p');
    message.innerText = 'Enter your GPA';
    message.classList = 'text-danger mb-1 validateMsg';
    if (!element) {
        resultArea.append(message);
    }
    if (element) {
        setTimeout(() => {
            document.querySelector('.validateMsg').remove();
        }, 4000);
    }
};
const validateGPA = (value) => {
    if (value >= 2 && value <= 4) {
        return Number(value);
    }
};
