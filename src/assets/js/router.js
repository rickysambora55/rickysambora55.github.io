const pages = import.meta.glob("/src/views/**/*.html", {
    query: "?url",
    import: "default",
});

const route = location.pathname.slice(1) || "index";
const path = `/src/views/${route}.html`;
const restricted = ["partials"];

const uri1 = route.split("/")[0];

if (uri1 === "project") {
    const slug = route.split("/")[1];
    const partialPath = "/src/views/partials/project.html";

    // Check if partial exists
    if (!pages[partialPath]) {
        app.innerHTML = "<h1 class='text-red-600'>Partial not found</h1>";
    } else {
        Promise.all([
            pages[partialPath]().then((url) =>
                fetch(url).then((res) => res.text())
            ),
            fetch("/src/data/projects.json").then((res) => res.json()),
        ])
            .then(([templateHtml, projects]) => {
                const project = projects.find((p) => p.slug === slug);

                if (!project) {
                    app.innerHTML =
                        "<h1 class='text-red-600'>Project not found</h1>";
                    return;
                }

                // ⛏ Replace elements by ID
                const tempContainer = document.createElement("div");
                tempContainer.innerHTML = templateHtml;

                for (const key in project) {
                    const el = tempContainer.querySelector(`#${key}`);
                    if (el) el.innerHTML = project[key];
                }

                app.innerHTML = tempContainer.innerHTML;
            })
            .catch((err) => {
                console.error("Error loading project:", err);
                app.innerHTML = "<h1>⚠️ Failed to load project</h1>";
            });
    }
} else if (!pages[path] || restricted.includes(uri1)) {
    app.innerHTML = "<h1 class='text-red-600'>404: Page not found</h1>";
} else {
    pages[path]().then((url) => {
        fetch(url)
            .then((res) => res.text())
            .then((html) => {
                app.innerHTML = html;
            })
            .catch((err) => {
                console.error("Error loading HTML:", err);
                app.innerHTML = "<h1>⚠️ Failed to load</h1>";
            });
    });
}
