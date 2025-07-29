import mainScriptUrl from "/src/assets/js/main.js?url";

async function loadJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    return await response.json();
}

const projects = await loadJson("/data/projects.json");

// Get the current route from direct link access and force to route to root
if (sessionStorage.redirect) {
    const redirectTo = sessionStorage.redirect;
    delete sessionStorage.redirect;
    history.replaceState(null, "", redirectTo);
}

// Reatach script into DOM
function executeScripts(container) {
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        // Copy attributes (like type, src, etc.)
        [...oldScript.attributes].forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
        });
        // Inline scripts need their content set
        if (!newScript.src) {
            newScript.textContent = oldScript.textContent;
        }
        oldScript.replaceWith(newScript);
    });
}

// Nav decision
function navDecision(headerHtml) {
    const desktopMenuNavClass =
        "text-md/6 hover:text-pink-300 font-semibold text-gray-900 transition-colors duration-150";
    const mobileMenuNavClass =
        "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50";

    if (!(location.pathname === "/" || location.pathname === "/index")) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(headerHtml, "text/html");
        const navList = doc.querySelector("#desktop-menu");
        const navListMobile = doc.querySelector("#mobile-menu-nav");

        if (navList) {
            navList.innerHTML = "";
            navList.innerHTML = `
                <a href="/" class="${desktopMenuNavClass}">Home</a>
                <a href="/projects" class="${desktopMenuNavClass}">Projects</a>
            `;
        }

        if (navListMobile) {
            navListMobile.innerHTML = "";
            navListMobile.innerHTML = `
                <a href="/" class="${mobileMenuNavClass}">Home</a>
                <a href="/projects" class="${mobileMenuNavClass}">Projects</a>
            `;
        }

        const updatedHeaderHtml = doc.body.innerHTML;

        return updatedHeaderHtml;
    }
    return headerHtml;
}

// Inject script
function injectScript(scriptUrl) {
    const script = document.createElement("script");
    script.type = "module";
    script.src = scriptUrl;
    document.body.appendChild(script);
}

const pages = import.meta.glob("../../views/**/*.html", {
    query: "?url",
    import: "default",
});

const route = location.pathname.slice(1) || "index";
const path = `../../views/${route}.html`;
const page404 = "../../views/404.html";
const header = "../../views/partials/header.html";
const footer = "../../views/partials/footer.html";
const restricted = ["partials"];
const uri1 = route.split("/")[0];

const pageError = `
<main
    class="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 px-6 lg:px-8 grid place-items-center"
>
    <div class="text-center animate-fade-in">
        <p
            class="text-[8rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-md select-none"
        >
            Oops! Something went wrong
        </p>
        <h1
            class="mt-4 text-5xl font-bold tracking-tight text-gray-800 sm:text-6xl"
        >
            Failed to load this page
        </h1>
        <p class="mt-6 text-lg text-gray-600 sm:text-xl max-w-lg mx-auto">
            Something went wrong while loading the content.
        </p>
        <div class="mt-10 flex justify-center gap-x-6">
            <a
                href="/"
                class="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            >
                Go back home
            </a>
        </div>
    </div>
</main>
`;

// Route
if (uri1 === "project") {
    const slug = route.split("/")[1];
    const partialPath = "../../views/partials/project.html";

    // Check if partial exists
    if (!pages[partialPath]) {
        app.innerHTML = pageError;
        executeScripts(app);
    } else {
        Promise.all([
            pages[header]().then((url) => fetch(url).then((res) => res.text())),
            pages[partialPath]().then((url) =>
                fetch(url).then((res) => res.text())
            ),
            pages[footer]().then((url) => fetch(url).then((res) => res.text())),
        ])
            .then(([headerHtml, templateHtml, footerHtml]) => {
                const project = projects.find((p) => p.slug === slug);

                if (!project) {
                    pages[page404]().then((url) => {
                        fetch(url)
                            .then((res) => res.text())
                            .then((html) => {
                                app.innerHTML = html;
                                executeScripts(app);
                            });
                    });
                    return;
                }

                // ⛏ Replace elements by ID
                const tempContainer = document.createElement("div");
                tempContainer.innerHTML = templateHtml;

                for (const key in project) {
                    const el = tempContainer.querySelector(`#${key}`);
                    if (!el) continue;

                    if (Array.isArray(project[key])) {
                        if (key === "images") {
                            el.innerHTML = project.images
                                .map(
                                    (img) =>
                                        `<div class="w-full h-96 bg-gray-900 flex items-center justify-center flex-shrink-0">
                                            <img
                                                alt="${img}"
                                                title="${img}"
                                                src="/img/projects/${img}"
                                                class="max-h-96 object-contain"
                                            />
                                        </div>
                                        `
                                )
                                .join("");

                            // Set indicators
                            const indicators =
                                tempContainer.querySelector("#indicators");
                            indicators.innerHTML = project.images
                                .map(
                                    (_, i) =>
                                        `<div
                                            class="w-3 h-3 bg-white rounded-full opacity-70 hover:cursor-pointer"
                                            data-index="${i}"
                                        ></div>`
                                )
                                .join("");
                        } else if (key === "techs") {
                            el.innerHTML = project.techs
                                .map(
                                    (tech) =>
                                        `<img src="/img/${tech}.svg" alt="${tech}" title="${tech}" class="h-10 w-10 inline-block mr-2" />`
                                )
                                .join("");
                        }
                    } else {
                        if (key === "links") {
                            el.innerHTML = "";
                            if (Object.values(project.links).length > 0) {
                                Object.values(project.links).forEach((item) => {
                                    let btnColor =
                                        "bg-gray-600 hover:bg-gray-500";
                                    if (item?.label?.includes("Source")) {
                                        btnColor =
                                            "bg-indigo-600 hover:bg-indigo-500";
                                    }
                                    el.innerHTML += `
                                    <a
                                    href="${item.url}"
                                    class="text-white ${btnColor} rounded-lg py-2 px-4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    ${item.label}
                                    </a>
                                `;
                                });
                            } else {
                                el.innerHTML = `<p class="text-lg text-gray-600">No links available</p>`;
                            }
                        } else {
                            el.innerHTML = project[key];
                        }
                    }
                }

                const headerNew = navDecision(headerHtml);
                app.innerHTML =
                    headerNew + tempContainer.innerHTML + footerHtml;
                injectScript(mainScriptUrl);
                executeScripts(app);
            })
            .catch((err) => {
                console.error("Error loading project:", err);
                app.innerHTML = pageError;
                executeScripts(app);
            });
    }
} else if (!pages[path] || restricted.includes(uri1)) {
    pages[page404]().then((url) => {
        fetch(url)
            .then((res) => res.text())
            .then((html) => {
                app.innerHTML = html;
                executeScripts(app);
            });
    });
} else {
    Promise.all([
        pages[header]().then((url) => fetch(url).then((res) => res.text())),
        pages[path]().then((url) => fetch(url).then((res) => res.text())),
        pages[footer]().then((url) => fetch(url).then((res) => res.text())),
    ])
        .then(([headerHtml, pageHtml, footerHtml]) => {
            const headerNew = navDecision(headerHtml);
            app.innerHTML = headerNew + pageHtml + footerHtml;
            injectScript(mainScriptUrl);
            executeScripts(app);
        })
        .catch((err) => {
            console.error("Error loading HTML:", err);
            app.innerHTML = pageError;
            executeScripts(app);
        });
}
