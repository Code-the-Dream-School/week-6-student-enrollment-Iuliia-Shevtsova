const container = document.querySelector('.container');
const studentsBut = document.getElementById('students');
const coursesBut = document.getElementById('courses');
const new_studentBut = document.getElementById('new_student');
const saveChangesBut = document.querySelector('.saveCourse');
const saveChangesBut2 = document.querySelector('.saveStudent');
const saveNewstudentBut = document.querySelector('.saveNewstudentBut');
const url_students = 'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json';
const url_courses = 'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json';
const form =  document.getElementById('formCourses');

var students = [];
var courses = [];

const divMain = document.createElement('div');
divMain.className = 'main';
container.appendChild(divMain);
//for students's list
const ul = document.createElement('ul');
ul.className = 'studentList row';
divMain.appendChild(ul);

//selected course in the modal form
const select = document.getElementById('positionCourses');
const select2 = document.getElementById('positionStudents');

//async function
async function getJSON2 (url){
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
        console.log(e);
    }
}

class Student {
    constructor(name, last_name, status, id) {
        this.name = name; 
        this.last_name = last_name; 
        this.status = status; 
        this.id = id;
        this.courses = [];
    }
}

class Course {
    constructor(name, duration, id) {
        this.name = name; 
        this.duration = duration; 
        this.id = id;
        this.students = [];
    }
}

function getStudentsArray(){
    Promise.resolve(getJSON2(url_students))
    .then (data => {
        data.forEach(element => {
            var student = new Student(element.name, element.last_name, element.status, element.id, element.courses);
            students.push(student);
        })
        console.log(students)
        console.log(students[0])
        return students;
    })
    console.log(students)
    console.log(students[0])
    //return students;
}

function getCoursesArray(){
    Promise.resolve(getJSON2(url_courses))
    .then (data => {
        data.forEach(element => {
            var course = new Course(element.name, element.duration, element.id, element.students);
            courses.push(course);
        })
        console.log(courses)
        console.log(courses[0])
        return courses;
    })
    //return courses;
}

getStudentsArray(); 
console.log(students);
// console.log(students[0]);
// students.forEach(student => {
//     console.log(student)
// })
getCoursesArray();
console.log(courses);

//creating list of students
studentsBut.addEventListener ('click', (e) => {
    e.preventDefault();
    console.log(students);
    generateStudentsHTML(students);
    generateSelectCourse(courses);
});

coursesBut.addEventListener ('click', (e) => {
    e.preventDefault();
    generateCoursesHTML(courses);
    generateSelectStudent(students);
});

//creating HTML for students info
function generateStudentsHTML(students) {
    ul.textContent = '';
    //var students = getStudentsArray(data);
    //console.log(students);
    studentsHTML(students);
    
    saveChangesBut.addEventListener('click', (e) => {
        console.log('button clicked');
        e.preventDefault();
        var buttonID = saveChangesBut.id;//to identify student and form assign button ID on the student's form to the button on the form        
        var selectedCourse = select.value; 
        var selectedCourseID;
        addCourseToStudent(students, buttonID, selectedCourse);//add course to the array 'students.courses'
        buttonID = ''; // clear value of ID, otherwise we will have several courses with the same id
        ul.textContent = '';
        studentsHTML(students);
    });
}

function generateCoursesHTML(courses) {
    ul.textContent = '';
    //var courses = getCoursesArray(data);
    coursesHTML(courses);

    saveChangesBut2.addEventListener('click', (e) => {
        console.log('button clicked');
        e.preventDefault();
        var buttonID = saveChangesBut2.id;        
        var selectedStudent = select2.value;
        addStudentToCourse(courses, buttonID, selectedStudent);//add course to the array 'students.courses'
        buttonID = ''; 
        ul.textContent = '';
        coursesHTML(courses);
    });
}

function studentsHTML(students) {
    //console.log(students);
    students.forEach(student => {
        
        //create li for each student
        const li = document.createElement('li');

        // div for putting name and status on one block on the same line
        const div = document.createElement('div'); 
        div.className = 'display_status';
        // create span to display student's name
        const spanName = document.createElement('span'); //student's name
        spanName.textContent = student.name +' '+ student.last_name;
        div.appendChild(spanName);
        //creating circle for displaying student's status
        if (student.status) { 
        const spanStatus = document.createElement('span'); //student's status
        spanStatus.className = 'status';
        div.appendChild(spanStatus);}
        li.appendChild(div);

        //create span for displaying array of student's courses
        student.courses.forEach(course => {
            var spanCourse = document.createElement('span'); //array of student's courses
            spanCourse.textContent = course;
            console.log(course);
            li.appendChild(spanCourse);
        })

        //create 'Add course' button atributes
        var addCourse = document.createElement('button');
        addCourse.className = ('btn btn-outline-info coursebtn');
        //addCourse.id = student.id;
        addCourse.textContent = 'Add course';
        li.appendChild(addCourse);

        //create form elements for choosing courses
        var toggleAtt = document.createAttribute("data-toggle");       // Create a "data-toggle" attribute
        toggleAtt.value = "modal";                           // Set the value of the "data-toggle" attribute
        addCourse.setAttributeNode(toggleAtt);                          // Add the class attribute to addCourse button

        var targetAtt = document.createAttribute("data-target");       // Create a "data-target" attribute
        targetAtt.value = "#courses_id";                           // Set the value of the "data-target" attribute
        addCourse.setAttributeNode(targetAtt);                          // Add the class attribute to addCourse button
        
        //create Edit button
        const editButton = document.createElement('button');
        editButton.className = ('btn btn-outline-info');
        editButton.textContent = 'Edit info';
        li.appendChild(editButton);
        ul.appendChild(li); //add information about student in the il to display it
        // send id value to saveButton id
        addCourse.addEventListener('click', (e) => {
            e.preventDefault();
            saveChangesBut.id = student.id; // to identify student and form assign student ID value to button ID and then assign it to the button on the form
        });
    });
}

//creating HTML for courses info
function coursesHTML(courses) {
    console.log(courses);
    courses.forEach(course => {
        //create li for each student
        const li = document.createElement('li');
        // create span inside li item to easier acsess
        const div = document.createElement('div'); // div for putting name and status on one block on the same line
        div.className = 'display_hours';
        const spanCourse = document.createElement('span'); //course's name
        spanCourse.textContent = course.name;
        div.appendChild(spanCourse);
        //creating circle for displaying course's hours
        const spanHourse = document.createElement('span');
        spanHourse.className = 'hours';
        spanHourse.textContent = course.duration;// quantity of hours of each course
        div.appendChild(spanHourse);
        li.appendChild(div);

        //create span for displaying array of students
        course.students.forEach(student => {
            var spanStudent = document.createElement('span'); //array of student's courses
            spanStudent.textContent = student;
            li.appendChild(spanStudent);
        })

        //create 'Add student' button using js
        const addStudent = document.createElement('button');
        addStudent.className = ('btn btn-outline-info');
        addStudent.textContent = 'Add student';
        li.appendChild(addStudent);
        //create form elements for choosing students
        var toggleAtt = document.createAttribute("data-toggle");       // Create a "data-toggle" attribute
        toggleAtt.value = "modal";                           // Set the value of the "data-toggle" attribute
        addStudent.setAttributeNode(toggleAtt);                          // Add the class attribute to addStudent button

        var targetAtt = document.createAttribute("data-target");       // Create a "data-target" attribute
        targetAtt.value = "#students_id";                           // Set the value of the "data-target" attribute
        addStudent.setAttributeNode(targetAtt);                          // Add the class attribute to addStudent button
        
        ul.appendChild(li);  
        // send id value to saveButton id
        addStudent.addEventListener('click', (e) => {
            e.preventDefault();
            saveChangesBut2.id = course.id;
        });
    })
}

//generate option tags for choosing courses
function generateSelectCourse(courses) {
    for (let i=0; i<courses.length; i++) {
        var option = document.createElement('option');
        option.textContent = courses[i].name;
        select.appendChild(option);
    }
}

function generateSelectStudent(students) {
    for (let i=0; i<students.length; i++) {
        var option = document.createElement('option');
        option.textContent = students[i].name + ' ' + students[i].last_name;
        select2.appendChild(option);
    }
}

function addCourseToStudent(students, buttonID, selectedCourse) {
    var studentName = '';
    students.forEach(student => {
        if (student.id == buttonID && student.courses.length < 4) {
            student.courses.push(selectedCourse);
            studentName = student.name + ' ' + student.last_name;
        }
    })

    courses.forEach(course => {
        if (selectedCourse === course.name) {
            course.students.push(studentName);
        }
    })
}

function addStudentToCourse(courses, buttonID, selectedStudent) {
    var courseName = '';
    courses.forEach(course => {
        if (course.id == buttonID && course.students.length < 3) {
            course.students.push(selectedStudent);
            courseName = course.name;
        }
    })

    students.forEach(student => {
        var studentName = student.name + ' ' + student.last_name;
        if (selectedStudent === studentName) {
            student.courses.push(courseName);
        }
    })
}


//  POST DATA
var name = '';
var lastName = '';

async function postData(url = '', data = {}) {

  // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        //body: console.log(data)
        body: JSON.stringify(data)
    });
    //return response.text();
    return response.json(); 
}

saveNewstudentBut.addEventListener('click', (e) => {
    e.preventDefault();
    name = document.getElementById('name').value;
    lastName = document.getElementById('lastName').value;
    var newStudent = {
        name: name,
        lastName: lastName
    };
    postData('https://student-challenge-api.herokuapp.com/students', {newStudent})
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });
});








