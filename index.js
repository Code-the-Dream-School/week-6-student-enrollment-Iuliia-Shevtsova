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

//creating list of students
studentsBut.addEventListener ('click', (e) => {
    e.preventDefault();
    Promise.all([
        getJSON2(url_students),//array of students's info
        getJSON2(url_courses) //array of courses's info
    ])
    .then (data => {
        var students = data[0];
        var courses = data[1];
        //console.log(students);
        //console.log(courses);
        generateStudentsHTML(students);
        generateSelectCourse(courses);
    })
});

coursesBut.addEventListener ('click', (e) => {
    e.preventDefault();
    Promise.all([
        getJSON2(url_students),//array of students's info
        getJSON2(url_courses) //array of courses's info
    ])
    .then (data => {
        var students = data[0];
        var courses = data[1];
        generateCoursesHTML(courses);
        generateSelectStudent(students);
    })
});

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

function getStudentsArray(data){
    var students = [];
    data.forEach(element => {
        var student = new Student(element.name, element.last_name, element.status, element.id, element.courses);
        students.push(student);
    })
    return students;
}

function getCoursesArray(data){
    var courses = [];
    data.forEach(element => {
        var course = new Course(element.name, element.duration, element.id, element.students);
        courses.push(course);
    })
    return courses;
}

//creating HTML for students info
function generateStudentsHTML(data) {
    ul.textContent = '';
    var students = getStudentsArray(data);
    console.log(students);
    studentsHTML(students);
    
    saveChangesBut.addEventListener('click', (e) => {
        console.log('button clicked');
        e.preventDefault();
        var buttonID = saveChangesBut.id;        
        var selectedCourse = select.value;
        addCourseToStudent(students, buttonID, selectedCourse);//add course to the array 'students.courses'
        ul.textContent = '';
        studentsHTML(students);
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
            saveChangesBut.id = student.id;
        });
    });
}

function generateCoursesHTML(data) {
    ul.textContent = '';
    var courses = getCoursesArray(data);
    coursesHTML(courses);

    saveChangesBut2.addEventListener('click', (e) => {
        console.log('button clicked');
        e.preventDefault();
        var buttonID = saveChangesBut2.id;        
        var selectedStudent = select2.value;
        addStudentToCourse(courses, buttonID, selectedStudent);//add course to the array 'students.courses'
        ul.textContent = '';
        coursesHTML(courses);
    });
}

//creating HTML for courses info
function coursesHTML(courses) {
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

function addCourseToStudent(students, studentID, selectedCourse) {
    students.forEach(student => {
        if (student.id == studentID && student.courses.length < 4) {
            student.courses.push(selectedCourse);
        }
    })
}

function addStudentToCourse(courses, courseID, selectedStudent) {
    courses.forEach(course => {
        if (course.id == courseID && course.students.length < 3) {
            course.students.push(selectedStudent);
        }
    })
}


//  POST DATA
var name = '';
var lastName = '';

async function postData(url = '', data = {}) {

  // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: console.log(data)
        body: JSON.stringify(data)// body data type must match "Content-Type" header
    });
    //return response.text();
    return response.json(); // parses JSON response into native JavaScript objects
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








