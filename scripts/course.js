const courses = [
    { code: "CSE 110", name: "Introduction to Programming", credits: 2, completed: true, type: "CSE" },
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true, type: "WDD" },
    { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: false, type: "CSE" },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: false, type: "CSE" },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: false, type: "WDD" },
    { code: "WDD 231", name: "Front-end Web Development I", credits: 2, completed: false, type: "WDD" }
  ];
  
  function renderCourses(filter = "All") {
    const container = document.getElementById('courses');
    container.innerHTML = '';
    let filtered = courses;
    if (filter === "CSE") filtered = courses.filter(c => c.type === "CSE");
    if (filter === "WDD") filtered = courses.filter(c => c.type === "WDD");
    let totalCredits = 0;
    filtered.forEach(course => {
      totalCredits += course.credits;
      const div = document.createElement('div');
      div.className = 'course-card' + (course.completed ? ' completed' : '');
      div.textContent = `${course.code}`;
      container.appendChild(div);
    });
    document.getElementById('total-credits').textContent = `Total Credits: ${totalCredits}`;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    document.getElementById('allBtn').addEventListener('click', function() {
      setActive(this);
      renderCourses("All");
    });
    document.getElementById('cseBtn').addEventListener('click', function() {
      setActive(this);
      renderCourses("CSE");
    });
    document.getElementById('wddBtn').addEventListener('click', function() {
      setActive(this);
      renderCourses("WDD");
    });
  });
  
  function setActive(btn) {
    document.querySelectorAll('.course-filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }