// =========================
// HOME PAGE
// =========================

const enrollmentForm = document.getElementById("enrollmentForm");

if (enrollmentForm) {
  enrollmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const age = document.getElementById("studentAge").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const phone = document.getElementById("studentPhone").value.trim();
    const grade = document.getElementById("gradeLevel").value;
    const photoFile = document.getElementById("studentPhoto").files[0];

    const message = document.getElementById("message");
    const summary = document.getElementById("studentSummary");

    if (!name || !age || !email || !phone || !grade || !photoFile) {
      message.textContent = "Please fill all fields!";
      message.style.color = "red";
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      const student = {
        name,
        age,
        email,
        phone,
        grade,
        photo: reader.result,
      };

      localStorage.setItem("student", JSON.stringify(student));

      message.textContent = `Welcome ${name} to Champion Academy!`;
      message.style.color = "green";

      summary.innerHTML = `
        <h3>Student Summary</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Grade:</strong> ${grade}</p>
      `;

      enrollmentForm.reset();
    };

    reader.readAsDataURL(photoFile);
  });
}

// =========================
// PROFILE PAGE
// =========================

const profileName = document.getElementById("profileName");

if (profileName) {
  const student = JSON.parse(localStorage.getItem("student"));

  if (student) {
    document.getElementById("profileName").textContent = student.name;
    document.getElementById("profileAge").textContent = student.age;
    document.getElementById("profileGrade").textContent = student.grade;
    document.getElementById("profileEmail").textContent = student.email;
    document.getElementById("profilePhone").textContent = student.phone;
    document.getElementById("profileImage").src = student.photo;
  }
}

// =========================
// CONTACT INFO
// =========================

const contactInfo = document.getElementById("contactInfo");

if (contactInfo) {
  const student = JSON.parse(localStorage.getItem("student"));

  document.getElementById("showEmailBtn").addEventListener("click", () => {
    if (student) {
      contactInfo.textContent = "Email: " + student.email;
    }
  });

  document.getElementById("showPhoneBtn").addEventListener("click", () => {
    if (student) {
      contactInfo.textContent = "Phone: " + student.phone;
    }
  });

  document.getElementById("hideContactBtn").addEventListener("click", () => {
    contactInfo.textContent =
      "Click a button below to view contact information.";
  });
}

// =========================
// STATUS UPDATE
// =========================

const updateStatusBtn = document.getElementById("updateStatusBtn");

const statusInput = document.getElementById("statusInput");

const studentStatus = document.getElementById("studentStatus");

if (updateStatusBtn && statusInput && studentStatus) {
  updateStatusBtn.addEventListener("click", () => {
    const newStatus = statusInput.value.trim();

    if (newStatus === "") {
      alert("Please enter a status");
      return;
    }

    studentStatus.textContent = newStatus;

    statusInput.value = "";
  });
}

// =========================
// COURSES PAGE
// =========================

const coursesContainer = document.getElementById("coursesContainer");

if (coursesContainer) {
  let courses = [
    {
      name: "CMS Builder",
      instructor: "Ms. Wajiha Niazi",
      grade: "Grade 12",
      description: "Learn CMS like Wordpress...",
      image: "img/web-design.jpg",
    },
    {
      name: "English Foundation",
      instructor: "Mr. Ahmad",
      grade: "Grade 10",
      description: "Basic English grammar and vocabulary.",
      image: "img/english.jpg",
    },
    {
      name: "English Conversation",
      instructor: "Ms. Fatima",
      grade: "Grade 11",
      description: "Improve speaking and listening skills.",
      image: "img/conversation.jpg",
    },
    {
      name: "English Reading",
      instructor: "Ms. Morsal",
      grade: "Grade 11",
      description: "Improve speaking and listening skills.",
      image: "img/conversation.jpg",
    },
    {
      name: "Computer Basics",
      instructor: "Ms. Wajiha Nizai",
      grade: "Grade 10",
      description: "Learn computer fundamentals.",
      image: "img/computer.jpg",
    },
    {
      name: "Web Design",
      instructor: "Mr. Ali",
      grade: "Grade 12",
      description: "HTML, CSS and Responsive Design.",
      image: "img/web-design.jpg",
    },
  ];

  const renderCourses = (list) => {
    coursesContainer.innerHTML = "";

    list.forEach((course) => {
      coursesContainer.innerHTML += `
        <div class="course-card">
          <img src="${course.image}" alt="${course.name}">
          <div class="course-content">
            <h3>${course.name}</h3>
            <p>${course.instructor}</p>
            <button class="btn details-btn"
              data-name="${course.name}"
              data-instructor="${course.instructor}"
              data-grade="${course.grade}"
              data-description="${course.description}">
              View Details
            </button>
          </div>
        </div>
      `;
    });

    attachDetailsEvents();
  };

  const attachDetailsEvents = () => {
    const buttons = document.querySelectorAll(".details-btn");
    const detailsBox = document.getElementById("courseDetails");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        detailsBox.innerHTML = `
          <h3>${btn.dataset.name}</h3>
          <p><b>Instructor:</b> ${btn.dataset.instructor}</p>
          <p><b>Grade:</b> ${btn.dataset.grade}</p>
          <p>${btn.dataset.description}</p>
        `;
      });
    });
  };

  renderCourses(courses);

  // =========================
  // ADD COURSE
  // =========================

  const addCourseForm = document.getElementById("addCourseForm");

  if (addCourseForm) {
    addCourseForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("courseName").value.trim();
      const instructor = document
        .getElementById("courseInstructor")
        .value.trim();
      const grade = document.getElementById("courseGrade").value;
      const description = document
        .getElementById("courseDescription")
        .value.trim();
      const imageFile = document.getElementById("courseImage").files[0];

      if (!name || !instructor || !grade || !description || !imageFile) {
        alert("Please fill all fields");
        return;
      }

      const reader = new FileReader();

      reader.onload = function () {
        const newCourse = {
          name,
          instructor,
          grade,
          description,
          image: reader.result,
        };

        courses.push(newCourse);
        renderCourses(courses);

        addCourseForm.reset();
      };

      reader.readAsDataURL(imageFile);
    });
  }

  // =========================
  // SEARCH
  // =========================

  const searchInput = document.getElementById("searchCourse");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();

      const filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(value),
      );

      renderCourses(filtered);
    });
  }

  // =========================
  // FILTER
  // =========================

  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const grade = btn.dataset.grade;

      if (grade === "all") {
        renderCourses(courses);
        return;
      }

      const filtered = courses.filter((course) => course.grade === grade);

      renderCourses(filtered);
    });
  });
}

// =========================
// CONTACT PAGE
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const result = document.getElementById("contactResult");

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    result.innerHTML = `
      <h3>Message Sent </h3>
      <p>Thank you <b>${name}</b>!</p>
      <p>We will contact you soon.</p>
    `;

    contactForm.reset();
  });
}
