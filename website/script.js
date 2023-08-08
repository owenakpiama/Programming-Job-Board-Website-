
function createJobCard(job) {
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');

    const jobTitle = document.createElement('h2');
    jobTitle.textContent = job.title;

    const companyInfo = document.createElement('p');
    companyInfo.textContent = `Company: ${job.company} | Location: ${job.location}`;

    const jobDescription = document.createElement('p');
    jobDescription.textContent = job.description;

    const jobSkills = document.createElement('p');
    jobSkills.textContent = `Skills: ${job.skills.join(', ')}`;

    const jobType = document.createElement('p');
    jobType.textContent = `Type: ${job.type}`;

    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply Now';
    applyButton.classList.add('apply-button');
    applyButton.addEventListener('click', () => {
        
    });

    jobCard.appendChild(jobTitle);
    jobCard.appendChild(companyInfo);
    jobCard.appendChild(jobDescription);
    jobCard.appendChild(jobSkills);
    jobCard.appendChild(jobType);
    jobCard.appendChild(applyButton);

    return jobCard;
}


function filterJobs(searchTerm, locationTerm) {
    const jobListingsSection = document.querySelector('.job-listings');
    const jobCards = jobListingsSection.querySelectorAll('.job-card');

    jobCards.forEach(jobCard => {
        const title = jobCard.querySelector('h2').textContent.toLowerCase();
        const location = jobCard.querySelector('.location').textContent.toLowerCase();

        if (title.includes(searchTerm.toLowerCase()) && location.includes(locationTerm.toLowerCase())) {
            jobCard.style.display = 'block';
        } else {
            jobCard.style.display = 'none';
        }
    });
}


const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const locationInput = document.getElementById('location-input');

    const searchTerm = searchInput.value.trim();
    const locationTerm = locationInput.value.trim();

    filterJobs(searchTerm, locationTerm);
});


function fetchJobs() {
    fetch('job-listings.json')
        .then(response => response.json())
        .then(data => {
            const jobListingsSection = document.querySelector('.job-listings');

            data.forEach(job => {
                const jobCard = createJobCard(job);
                jobListingsSection.appendChild(jobCard);
            });
        })
        .catch(error => {
            console.error('Error fetching job listings:', error);
        });
}


window.addEventListener('DOMContentLoaded', () => {
    fetchJobs();
});

