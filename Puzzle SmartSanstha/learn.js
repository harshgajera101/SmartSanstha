document.addEventListener('DOMContentLoaded', () => {
    const learningContainer = document.getElementById('learning-container');
    const personalizedGreeting = document.getElementById('personalized-greeting');
    const articleModal = document.getElementById('article-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalArticles = document.getElementById('modal-articles');
    const closeModalButton = articleModal.querySelector('.close-button');

    const loggedInUserGrade = "Middle School";

    // NEW: A map for the grade level subheadings
    const gradeSubheadings = {
        "Middle School": "(Grade 6-8)",
        "High School": "(Grade 8-10)",
        "College / General Studies": "(Grade 10-12)",
        "Law / Advanced Learners": "(Grade 12+)"
    };

    const gradeToPartsMap = {
        "Middle School": [
    { name: "The Preamble of the Constitution", articles: "The Preamble" },
    { name: "Part I - The Union and its Territory", articles: "Articles 1-4" },
    { name: "Part II - Citizenship", articles: "Articles 5-11" },
    { name: "Part III - Fundamental Rights", articles: "Articles 12-35" },
    { name: "Part IV - Directive Principles of State Policy", articles: "Articles 36-51" },
    { name: "Part IVA - Fundamental Duties", articles: "Article 51A" }
],
        "High School": [
    { name: "Part V - The Union", articles: "Articles 52-151" },
    { name: "Part VI - The States", articles: "Articles 152-237" },
    { name: "Part IX - The Panchayats", articles: "Articles 243-243O" },
    { name: "Part IX-A - The Municipalities", articles: "Articles 243P-243ZG" },
    { name: "Part X - Scheduled and Tribal Areas", articles: "Articles 244-244A" },
    { name: "Part XV - Elections", articles: "Articles 324-329A" }
],
"College / General Studies": [
    { name: "Part XI - Relations between the Union and the States", articles: "Articles 245-263" },
    { name: "Part XII - Finance, Property, Contracts, and Suits", articles: "Articles 264-300A" },
    { name: "Part XIII - Trade, Commerce, and Intercourse within the Territory of India", articles: "Articles 301-307" },
    { name: "Part XIV - Services under the Union and the States", articles: "Articles 308-323" },
    { name: "Part XVIII - Emergency Provisions", articles: "Articles 352-360" },
    { name: "Part XIX - Miscellaneous", articles: "Articles 361-367" }
],
"Law / Advanced Learners": [
    { name: "Part XIV-A - Tribunals", articles: "Articles 323A-323B" },
    { name: "Part XVII - Official Language", articles: "Articles 343-351" },
    { name: "Part XX - Amendment of the Constitution", articles: "Article 368" },
    { name: "Part XXI - Temporary, Transitional, and Special Provisions", articles: "Articles 369-392" },
    { name: "Part XXII - Short Title, Commencement, Authoritative Text in Hindi, and Repeals", articles: "Articles 393-395" }
],
    };

    // 1. Display the personalized greeting message with subheading
    if (gradeToPartsMap[loggedInUserGrade]) {
        const subheading = gradeSubheadings[loggedInUserGrade] || '';
        personalizedGreeting.innerHTML = `<h2>As you're in <strong>${loggedInUserGrade}</strong> <span class="subheading">${subheading}</span>, this is your learning path:</h2>`;
    }

    const userPath = { [loggedInUserGrade]: gradeToPartsMap[loggedInUserGrade] };
    const otherPaths = { ...gradeToPartsMap };
    delete otherPaths[loggedInUserGrade];

    // 2. A function to create a section on the page
    const createSection = (grade, parts, isHighlighted) => {
        const section = document.createElement('div');
        section.className = 'learning-section';
        if (isHighlighted) {
            section.classList.add('highlighted');
        }

        const subheading = gradeSubheadings[grade] || ''; // Get subheading for the grade
        let sectionHTML = `<h2>${grade} <span class="subheading">${subheading}</span></h2><div class="articles-grid">`;
        
        parts.forEach(part => {
            sectionHTML += `<div class="article-card" data-part-name="${part.name}" data-part-articles="${part.articles}">${part.name}</div>`;
        });
        sectionHTML += `</div>`;
        
        section.innerHTML = sectionHTML;
        learningContainer.appendChild(section);
    };

    // 3. Create the user's highlighted section first
    if (gradeToPartsMap[loggedInUserGrade]) {
        for (const [grade, parts] of Object.entries(userPath)) {
            createSection(grade, parts, true);
        }
    }
    
    // 4. Add the visual divider
    const divider = document.createElement('div');
    divider.className = 'section-divider';
    divider.innerHTML = `<h3>Explore Other Paths</h3>`;
    learningContainer.appendChild(divider);

    // 5. Create the rest of the sections below
    for (const [grade, parts] of Object.entries(otherPaths)) {
        createSection(grade, parts, false);
    }

    // 6. Add event listeners for all article cards and the modal
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', () => {
            const partName = card.dataset.partName;
            const partArticles = card.dataset.partArticles;
            modalTitle.textContent = partName;
            modalArticles.textContent = partArticles;
            articleModal.classList.remove('hidden');
        });
    });

    closeModalButton.addEventListener('click', () => {
        articleModal.classList.add('hidden');
    });

    articleModal.addEventListener('click', (e) => {
        if (e.target === articleModal) {
            articleModal.classList.add('hidden');
        }
    });
});