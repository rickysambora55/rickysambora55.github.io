import educationsUrl from "/data/educations.json?url";
import experiencesUrl from "/data/experiences.json?url";
import netSkillsUrl from "/data/net-skills.json?url";
import devSkillsUrl from "/data/dev-skills.json?url";
import projectsUrl from "/data/projects.json?url";

async function loadJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch: " + url);
    return res.json();
}

async function renderSkills(skills, container) {
    if (!container) return;
    skills.forEach((skill) => {
        const card = document.createElement("div");
        card.className = "flip-card w-32 h-32 relative hover:cursor-mouse";
        card.innerHTML = `
                <div class="flip-inner w-full h-full relative">
                    <div class="flip-front hexagon bg-indigo-100 shadow-md flex items-center justify-center">
                        <img src="${skill.img}" alt="${skill.name}" class="h-16 w-auto" />
                    </div>
                    <div class="flip-back hexagon bg-indigo-200 text-md font-semibold text-indigo-800 flex items-center justify-center">
                        ${skill.name}
                    </div>
                </div>`;
        container.appendChild(card);
    });
}

async function renderEducations(educations) {
    const container = document.getElementById("education-list");
    if (!container) return;
    educations.forEach((item) => {
        const li = document.createElement("li");
        li.className =
            "relative pl-8 bg-white shadow-md rounded-lg py-5 pr-5 border-l-4 border-indigo-400";
        li.innerHTML = `
                <h4 class="text-lg font-bold text-gray-800">${item.title}</h4>
                <p class="text-sm text-gray-600">${item.institution} • ${
            item.year
        }</p>
                ${
                    item.description
                        ? `<p class="text-sm text-gray-700 mt-1">${item.description}</p>`
                        : ""
                }
            `;
        container.appendChild(li);
    });
}

async function renderWorkExperiences(experiences) {
    const container = document.getElementById("work-experience-list");
    if (!container) return;
    experiences.forEach((exp) => {
        const li = document.createElement("li");
        li.className =
            "relative pl-8 bg-white shadow-md rounded-lg p-5 border-l-4 border-pink-400";
        li.innerHTML = `
                <h4 class="text-lg font-bold text-gray-800">${exp.title}</h4>
                <p class="text-sm text-gray-600">${exp.company} • ${exp.year}</p>
                <p class="list-disc list-inside text-sm mt-2 text-gray-700">
                    ${exp.description}
                </p>
            `;
        container.appendChild(li);
    });
}

async function renderProjects(projects) {
    const container = document.getElementById("project-list");
    if (!container) return;
    container.innerHTML = "";

    const trimmedProjects = projects.slice(0, 3);
    trimmedProjects.forEach((project) => {
        container.innerHTML += `
        <a href="/project/${project.slug}" rel="noopener noreferrer">
            <div
                class="group relative cursor-pointer overflow-hidden bg-indigo-50 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl rounded-2xl max-w-md mx-auto"
            >
                <!-- Glowing expanding circle -->
                <span
                    class="absolute top-10 left-1/2 -translate-x-1/2 z-0 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 transition-all duration-500 group-hover:scale-[10] blur-xl opacity-50"
                ></span>

                <div class="relative z-10 flex flex-col items-center">
                    <img
                        src="/img/projects/${project.images[0]}"
                        alt="Portfolio Website"
                        class="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div class="w-full p-6 text-left h-full min-h-48 flex flex-col justify-between">
                        <div>
                            <h3
                                class="text-xl font-bold text-gray-800 group-hover:text-indigo-800 transition-colors duration-300 line-clamp-1"
                            >
                                ${project.title || "Untitled Project"}
                            </h3>
                            <p
                                class="mt-2 text-gray-600 group-hover:text-indigo-800/90 text-sm transition-colors duration-300 line-clamp-3 text-justify"
                            >
                                ${
                                    project.description ||
                                    "No description available."
                                }
                            </p>
                        </div>

                        <!-- Tech stack icons -->
                        <div class="flex gap-3 mt-4">
                            ${project.techs
                                .map(
                                    (tech) =>
                                        `<img src="/img/${tech}.svg" class="h-6 w-6" alt="${tech}" />`
                                )
                                .join("")}
                        </div>
                    </div>
                </div>
            </div>
        </a>`;
    });
}

async function renderProjectsFull(projects) {
    const container = document.getElementById("project-full");
    if (!container) return;
    container.innerHTML = "";

    projects.forEach((project) => {
        container.innerHTML += `
        <a href="/project/${project.slug}" rel="noopener noreferrer">
            <div
                class="group relative cursor-pointer overflow-hidden bg-indigo-50 shadow-lg ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl rounded-2xl max-w-md mx-auto"
            >
                <!-- Glowing expanding circle -->
                <span
                    class="absolute top-10 left-1/2 -translate-x-1/2 z-0 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 transition-all duration-500 group-hover:scale-[10] blur-xl opacity-50"
                ></span>

                <div class="relative z-10 flex flex-col items-center">
                    <img
                        src="/img/projects/${project.images[0]}"
                        alt="Portfolio Website"
                        class="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div class="w-full p-6 text-left h-full min-h-48 flex flex-col justify-between">
                        <div>
                            <h3
                                class="text-xl font-bold text-gray-800 group-hover:text-indigo-800 transition-colors duration-300 line-clamp-1"
                            >
                                ${project.title || "Untitled Project"}
                            </h3>
                            <p
                                class="mt-2 text-gray-600 group-hover:text-indigo-800/90 text-sm transition-colors duration-300 line-clamp-3 text-justify"
                            >
                                ${
                                    project.description ||
                                    "No description available."
                                }
                            </p>
                        </div>

                        <!-- Tech stack icons -->
                        <div class="flex gap-3 mt-4">
                            ${project.techs
                                .map(
                                    (tech) =>
                                        `<img src="/img/${tech}.svg" class="h-6 w-6" alt="${tech}" />`
                                )
                                .join("")}
                        </div>
                    </div>
                </div>
            </div>
        </a>`;
    });
}

async function init() {
    const educations = await loadJson(educationsUrl);
    const experiences = await loadJson(experiencesUrl);
    const netSkills = await loadJson(netSkillsUrl);
    const devSkills = await loadJson(devSkillsUrl);
    const projects = await loadJson(projectsUrl);

    renderSkills(devSkills, document.getElementById("dev-skills-grid"));
    renderSkills(netSkills, document.getElementById("net-skills-grid"));
    renderEducations(educations);
    renderWorkExperiences(experiences);
    renderProjects(projects);
    renderProjectsFull(projects);
}
