const courses = [
    { code: "WDD 230", name: "Web Frontend Development", credits: 3, completed: true },
    { code: "CSE 121b", name: "JavaScript Language", credits: 3, completed: true },
    { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: false },
    { code: "WDD 130", name: "Web Basics", credits: 2, completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 3, completed: false }
  ];
  
  const container = document.getElementById("courses");
  const totalEl = document.getElementById("total-credits");
  
  function displayCourses(filtered) {
    container.innerHTML = "";
    let total = 0;
    filtered.forEach(course => {
      const card = document.createElement("div");
      card.className = "course-card";
      card.style.borderLeft = course.completed ? "5px solid green" : "5px solid red";
      card.innerHTML = `
        <h3>${course.code}</h3>
        <p>${course.name}</p>
        <p>Credits: ${course.credits}</p>
      `;
      container.appendChild(card);
      total += course.credits;
    });
    totalEl.textContent = `Total Credits: ${total}`;
  }
  
  document.getElementById("all").addEventListener("click", () => displayCourses(courses));
  document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.code.startsWith("WDD"))));
  document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.code.startsWith("CSE"))));
  
  displayCourses(courses);
  