
const courseContainer = document.querySelector("#course-container");
const creditTotal = document.querySelector("#credit-total");

const allButton = document.querySelector("#all-courses");
const cseButton = document.querySelector("#cse-courses");
const wddButton = document.querySelector("#wdd-courses");

function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>
        `;

        courseContainer.appendChild(courseCard);
    });

    const totalCredits = courseList.reduce((total, course) => total + course.credits, 0);
    creditTotal.textContent = `The total credits for courses listed above is ${totalCredits}.`;
}

function filterCourses(subject) {
    let filteredCourses = courses;

    if (subject !== "All") {
        filteredCourses = courses.filter(course => course.subject === subject);
    }

    displayCourses(filteredCourses);

    document.querySelectorAll(".filter-button").forEach(button => {
        button.classList.remove("active");
    });

    document.querySelector(`#${subject.toLowerCase()}-courses`)?.classList.add("active");
}

allButton.addEventListener("click", () => filterCourses("All"));
cseButton.addEventListener("click", () => filterCourses("CSE"));
wddButton.addEventListener("click", () => filterCourses("WDD"));

displayCourses(courses);
