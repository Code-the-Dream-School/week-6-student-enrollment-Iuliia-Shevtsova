const container = document.querySelector('.container');
const studentsBut = document.getElementById('students');
const coursesBut = document.getElementById('courses');
const new_studentBut = document.getElementById('new_student');
const saveChangesBut = document.querySelector('.save');
const url_students = 'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json';
const url_courses = 'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json';

const divMain = document.createElement('div');
divMain.className = 'main';
container.appendChild(divMain);
const ul = document.createElement('ul');
ul.className = 'studentList row';
divMain.appendChild(ul);

//async function
async function getJSON2 (url, generateHTML){
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return generateHTML(data);
  } catch (e) {
      console.log(e);
  }
}

// an AJAX request
function getJSON(url, generateHTML) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      console.log(data);
      return generateHTML(data); // call or return function callback with the data, that got from the Ajax request in JSON format
    }
  };
  xhr.send();
};

//creating list of students
studentsBut.addEventListener ('click', (e) => {
  e.preventDefault();
  console.log(studentsBut.click);
  var studentHTML = getJSON2(url_students, generateStudentsHTML);
  var selectHTML = getJSON2(url_courses, generateSelect);
  console.log(studentHTML);
});

//creating list of courses
coursesBut.addEventListener ('click', (e) => {
  e.preventDefault();
var studentHTML = getJSON2(url_courses, generateCoursesHTML);
});


// //save choosed in the list course and display it
// saveChangesBut.addEventListener('click', () => {
//   var coursesArray = document.getElementsByTagName('option'); //array of courses in the modal form
//   console.log(li.className);
//   var coursebtn = document.querySelector('coursebtn');
//   // create span inside li item to add choosed course 
//   const span = document.createElement('span');
//   for (let i=0; i<coursesArray.length; i++){
//     if (coursesArray[i].selected) { // if selected course == true
//       var selectedCourse = coursesArray[i].value;
//       span.textContent = selectedCourse;
//     }
//   }
//   li.appendChild(span);
// });


//add courses in the form when click the button "Add course"
function generateSelect(data) {
  const select = document.getElementById('position');
  for (let i=0; i<data.length; i++) {
    var option = document.createElement('option');
    //var optionValue = document.createAttribute('value');
    //optionValue.value = i+'_course';
    //option.setAttributeNode(optionValue);
    option.textContent = data[i].name;
    select.appendChild(option);
  }
}

//save choosed in the list course and display it
function saveChanges(li) {
  var coursesArray = document.getElementsByTagName('option'); //array of courses in the modal form
  var coursebtn = document.querySelector('.coursebtn');
  // create span inside li item to add choosed course 
  const span = document.createElement('span');
  
  saveChangesBut.addEventListener('click', (e) => {
    e.preventDefault();
    for (let i=0; i<coursesArray.length; i++){
      if (coursesArray[i].selected) { // if selected course == true
        var selectedCourse = coursesArray[i].value;
        span.textContent = selectedCourse;
      }
    }
    li.insertBefore(span, coursebtn);
  });
};

//creating HTML for students info
function generateStudentsHTML(data) {
  ul.textContent = '';
  for (let i=0; i<data.length; i++) {
    //create li for each student
    const li = document.createElement('li');
    li.className = data[i].id+'_student'; // li class of each student =id_number of student
    const div = document.createElement('div'); // div for putting name and status on one block on the same line
    div.className = 'display_status';
    // create span inside li item to easier acsess
    const spanName = document.createElement('span'); //student's name
    spanName.textContent = data[i].name +' '+data[i].last_name;
    div.appendChild(spanName);
    //creating circle for displaying student's status
    if (data[i].status) { 
      const spanStatus = document.createElement('span'); //student's status
      spanStatus.className = 'status';
    div.appendChild(spanStatus);}
    li.appendChild(div);
    
    //create 'Add course' button using js
    const addCourse = document.createElement('button');
    addCourse.className = ('btn btn-outline-info coursebtn');
    addCourse.textContent = 'Add course';
    li.appendChild(addCourse);

    //create form element for choosing courses
    var toggleAtt = document.createAttribute("data-toggle");       // Create a "data-toggle" attribute
    toggleAtt.value = "modal";                           // Set the value of the "data-toggle" attribute
    addCourse.setAttributeNode(toggleAtt);                          // Add the class attribute to addCourse button

    var targetAtt = document.createAttribute("data-target");       // Create a "data-target" attribute
    targetAtt.value = "#courses_id";                           // Set the value of the "data-target" attribute
    addCourse.setAttributeNode(targetAtt);                          // Add the class attribute to addCourse button
    
    //create Edit button using js
    const editButton = document.createElement('button');
    editButton.className = ('btn btn-outline-info');
    editButton.textContent = 'Edit info';
    li.appendChild(editButton);

    ul.appendChild(li);  

    addCourse.addEventListener ('click', (e) => {
      e.preventDefault();
      saveChanges(li);
    });
      
  }
}

//creating HTML for courses info
function generateCoursesHTML(data) {
  ul.textContent = '';
  for (let i=0; i<data.length; i++) {
    //create li for each student
    const li = document.createElement('li');
    li.className = data[i].id+'_course'; // li class of each student =id_number of student
    // create span inside li item to easier acsess
    const div = document.createElement('div'); // div for putting name and status on one block on the same line
    div.className = 'display_hours';
    const spanCourse = document.createElement('span'); //course's name
    spanCourse.textContent = data[i].name;
    div.appendChild(spanCourse);
    //creating circle for displaying course's hours
    const spanHourse = document.createElement('span');
    spanHourse.className = 'hours';
    spanHourse.textContent = data[i].duration;// quantity of hours of each course
    div.appendChild(spanHourse);
    li.appendChild(div);
    //create 'Add student' button using js
    const addStudent = document.createElement('button');
    addStudent.className = ('btn btn-outline-info');
    addStudent.textContent = 'Add student';
    li.appendChild(addStudent);

    ul.appendChild(li);  
  }
}






















