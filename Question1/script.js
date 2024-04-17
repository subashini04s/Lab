class Student {
constructor(name, age, grade) {
this.name=name;
this.age=age;
this.grade=grade;
}
updateInfo(name, age, grade) {
this.name=name;
this.age=age;
this.grade=grade;
}            
}
function updateStudentInfo(student) {
document.getElementById('student-name').textContent = student.name;
document.getElementById('student-age').textContent = student.age;
document.getElementById('student-grade').textContent = student.grade;
}
let student = new Student('Suba',19, 'A');
document.getElementById('update-info-btn').addEventListener('click', function() {
student.updateInfo('Sinamika', 22, 'B');
updateStudentInfo(student);
});
  