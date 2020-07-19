const container = document.querySelector('.container');
const studentsBut = document.getElementById('students');
const coursesBut = document.getElementById('courses');
const new_studentBut = document.getElementById('new_student');
const saveChangesBut = document.querySelector('.save');
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
const select = document.getElementById('position');

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
        console.log(students);
        console.log(courses);
        generateStudentsHTML(students);
        generateSelect(courses);
    })
});

// addCourse.addEventListener('click', (e) => {
//     e.preventDefault();
//     saveChangesBut.id = addCourse.id;
// });



function addCourseToStudent(studentID, selectedCourse) {
    this.students.forEach(student => {
        if (student.id === studentID) {
            student.courses.push(selectedCourse);
        }
    })
   
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

function getStudentsAray(data){
    var students = [];
    data.forEach(element => {
        var student = new Student(element.name, element.last_name, element.status, element.id, element.courses);
        students.push(student);
    })
    return students;
}

function getCoursesAray(data){
    var students = [];
    data.forEach(element => {
        var student = new Student(element.name, element.last_name, element.status, element.id);
        students.push(student);
    })
    return students;
}

function studentsHTML(students) {
    console.log(students);
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

        ul.appendChild(li); 

        addCourse.addEventListener('click', (e) => {
            e.preventDefault();
            saveChangesBut.id = student.id;
        });
    });
}

//creating HTML for students info
function generateStudentsHTML(data) {
    ul.textContent = '';
    var students = getStudentsAray(data);
    console.log(students);
    studentsHTML(students);
    
    saveChangesBut.addEventListener('click', (e) => {
        console.log('button clicked');
        e.preventDefault();
        var buttonID = saveChangesBut.id;        
        var selectedCourse = select.value;
        students.forEach(student => {
            if (student.id == buttonID && student.courses.length<4) {
                student.courses.push(selectedCourse);
                console.log(student.courses);
            }
        })
        ul.textContent = '';
        studentsHTML(students);
    });
}

//generate option tags for choosing courses
function generateSelect(courses) {
    for (let i=0; i<courses.length; i++) {
      var option = document.createElement('option');
      option.textContent = courses[i].name;
      select.appendChild(option);
    }
}











