// --- DATA INITIALIZATION ---

// Mock data for Kepengurusan (Management Team)
const initialMembers = [
    // INTI Division
    { id: 1, name: "Ferdyansyah Adi Saputra", role: "Koordinator Lab EIM", division: "inti", image: "person/inti/ferday.JPG", scale: "3", position: "center 32%" },
    { id: 2, name: "Raffi Raditya Sofwan", role: "Sekretaris", division: "inti", image: "person/inti/bewok.JPG", scale: "2.8", position: "55% 35%" },
    { id: 3, name: "Kania Shafa", role: "Bendahara", division: "inti", image: "person/inti/kania.JPG", scale: "2.7", position: "45% 52%" },

    // RISET Division
    { id: 4, name: "Ardy Maulana", role: "Koordinator Riset", division: "riset", image: "person/riset/ardyy.JPG", scale: "2.3", position: "53% 15%" },
    { id: 5, name: "Alta", role: "Staff", division: "riset", image: "person/riset/alta.JPG", scale: "3", position: "49% 35%" },
    { id: 6, name: "Nayla", role: "Staff", division: "riset", image: "person/riset/nayla.JPG", scale: "3", position: "52% 43%" },
    { id: 7, name: "Hana", role: "Staff", division: "riset", image: "person/riset/hana.JPG", scale: "3", position: "center 40%" },
    { id: 8, name: "Dara", role: "Staff", division: "riset", image: "person/riset/dara.JPG", scale: "2.5", position: "48% 34%" },

    // PKU Division
    { id: 9, name: "Winsenlaus Alfero Ivander", role: "Koordinator PKU", division: "pku", image: "person/pku/lael.JPG", scale: "2.8", position: "50% 13%" },
    { id: 10, name: "Habibi", role: "Staff", division: "pku", image: "person/pku/habibi.JPG", scale: "2.8", position: "50% 15%" },
    { id: 11, name: "Faiz Dhya", role: "Staff", division: "pku", image: "person/pku/faiz.JPG", scale: "2.8", position: "50% 15%" },

    // LOMBA Division
    { id: 12, name: "Reza", role: "Koordinator Lomba", division: "lomba", image: "person/lomba/reza.JPG", scale: "2.8", position: "49% 35%" },
    { id: 13, name: "Ganda", role: "Staff", division: "lomba", image: "person/lomba/ganda.JPG", scale: "2.8", position: "50% 31%" },
    { id: 14, name: "Frixtho", role: "Staff", division: "lomba", image: "person/lomba/frixtho.JPG", scale: "2.8", position: "48% 25%" },
    { id: 15, name: "Alif", role: "Staff", division: "lomba", image: "person/lomba/alif.JPG", scale: "2.8", position: "50% 36%" },


    // MEDHUM Division
    { id: 17, name: "Aura", role: "Koordinator Medhum", division: "medhum", image: "person/medhum/aura.JPG", scale: "2.2", position: "50% 40%" },
    { id: 18, name: "Firman", role: "Staff", division: "medhum", image: "person/medhum/firman.JPG", scale: "2.8", position: "50% 33%" },
    { id: 19, name: "Affan", role: "Staff", division: "medhum", image: "person/medhum/affan.JPG", scale: "2.4", position: "48% 19%" },
    { id: 20, name: "Wildan", role: "Staff", division: "medhum", image: "person/medhum/wildan.JPG", scale: "2.4", position: "51% 45%" },
    { id: 21, name: "Imam", role: "Staff", division: "medhum" },

    // PENGMAS Division
    { id: 22, name: "Bagas", role: "Koordinator Pengmas", division: "pengmas", image: "person/pengmas/bagas.JPG", scale: "3", position: "50% 20%" },
    { id: 23, name: "Raya", role: "Staff", division: "pengmas", image: "person/pengmas/raya.JPG", scale: "2", position: "50% 18%" },
    { id: 24, name: "Salman", role: "Staff", division: "pengmas", image: "person/pengmas/salman.JPG", scale: "2.3", position: "50% 43%" },
    { id: 25, name: "Kya", role: "Staff", division: "pengmas", image: "person/pengmas/kya.JPG", scale: "3.3", position: "50% 45%" },
    { id: 26, name: "Rafi", role: "Staff", division: "pengmas", image: "person/pengmas/rafiakbar.JPG", scale: "2.4", position: "45% 51%" },
];

// --- APP STATE ---
let members = [...initialMembers];
let newsList = [];
let eventList = [];
let currentUser = { logged_in: false, role: 'guest' };

// Initialize App Data from API
async function initAppData() {
    try {
        // Fetch Auth Status
        const authRes = await fetch('api_auth.php');
        if (authRes.ok) {
            currentUser = await authRes.json();
        }

        // Fetch News
        const newsRes = await fetch('api_news.php');
        if (newsRes.ok) {
            newsList = await newsRes.json();
            renderNews();
            renderLatestNews(); // If on index page
        }

        // Fetch Events
        const eventsRes = await fetch('api_events.php');
        if (eventsRes.ok) {
            eventList = await eventsRes.json();
            renderEvents();
        }

        // Toggle admin features
        toggleAdminFeatures();
    } catch (e) {
        console.error("Failed to load app data", e);
    }
}

function toggleAdminFeatures() {
    const isAdmin = currentUser.role === 'admin';
    const btnAddNews = document.getElementById('btn-add-news');
    const btnAddEvent = document.getElementById('btn-add-event');
    
    if (btnAddNews) btnAddNews.style.display = isAdmin ? 'inline-block' : 'none';
    if (btnAddEvent) btnAddEvent.style.display = isAdmin ? 'inline-block' : 'none';
}

// --- UTILITY: TOAST NOTIFICATIONS ---
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = '<i class="fa-solid fa-circle-check"></i>';
    if (type === 'danger') {
        icon = '<i class="fa-solid fa-circle-exclamation"></i>';
    } else if (type === 'info') {
        icon = '<i class="fa-solid fa-circle-info"></i>';
    }

    toast.innerHTML = `${icon} <span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    // Remove toast after 4s
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}

// --- RENDER KEPENGURUSAN ---
function renderMembers(filter = "all") {
    const memberGrid = document.getElementById("member-grid");
    if (!memberGrid) return;

    memberGrid.innerHTML = "";

    const filteredMembers = filter === "all"
        ? members
        : members.filter(m => m.division.toLowerCase() === filter.toLowerCase());

    filteredMembers.forEach((member, index) => {
        const card = document.createElement("div");
        card.className = `member-card glass-panel div-${member.division}`;
        card.style.animationDelay = `${index * 0.06}s`;

        let avatarContent = member.initials ? `<span>${member.initials}</span>` : `<i class="fa-solid fa-user" style="font-size: 2.5rem; opacity: 0.5;"></i>`;
        if (member.image) {
            // Tambahkan dukungan untuk custom zoom (scale) dan posisi gambar
            const scaleStyle = member.scale ? `transform: scale(${member.scale});` : '';
            // Mengubah dari object-position menjadi transform-origin agar lebih akurat saat di-zoom
            const positionStyle = member.position ? `transform-origin: ${member.position};` : '';

            avatarContent = `<img src="${member.image}" alt="${member.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; display: block; ${scaleStyle} ${positionStyle}">`;
        }

        card.innerHTML = `
            <div class="member-avatar-wrapper">
                <div class="member-avatar" ${member.image ? 'style="background: transparent;"' : ''}>
                    ${avatarContent}
                </div>
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <div class="member-role">${member.role}</div>
                <span class="member-div">${member.division.toUpperCase()}</span>
            </div>
        `;
        memberGrid.appendChild(card);
    });
}

// --- RENDER BERITA (NEWS) ---// Render News
function renderNews() {
    const grid = document.getElementById("news-grid");
    if (!grid) return;

    grid.innerHTML = "";

    if (newsList.length === 0) {
        grid.innerHTML = `
            <div class="news-empty-state">
                <i class="fa-regular fa-folder-open"></i>
                <h3>Belum ada berita</h3>
                <p>Jadilah yang pertama menambahkan berita baru!</p>
            </div>
        `;
        return;
    }

    newsList.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(news => {
        const card = document.createElement("div");
        card.className = "news-card glass-panel";
        card.innerHTML = `
            <div class="news-cover">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
                <div class="news-category">${news.category}</div>
            </div>
            <div class="news-content">
                <div class="news-date">
                    <i class="fa-regular fa-calendar"></i> ${formatDate(news.date)}
                </div>
                <h3>${news.title}</h3>
                <p class="news-desc">${news.content}</p>
                
                <div class="news-footer">
                    <span class="news-author"><i class="fa-solid fa-user-pen" style="margin-right: 6px; color: var(--accent-cyan);"></i>${news.author}</span>
                    ${window.USER_ROLE === 'admin' ? `
                    <div class="news-action-btns">
                        <button class="btn-icon btn-icon-edit" onclick="editNews('${news.id}')" title="Edit Berita">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn-icon btn-icon-delete" onclick="deleteNews('${news.id}')" title="Hapus Berita">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>` : ''}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- EVENT CRUD FUNCTIONS ---
let eventBase64Images = [];

function getEventIcon(category) {
    switch(category) {
        case "Study Group": return "fa-graduation-cap";
        case "Kuliah Umum": return "fa-chalkboard-user";
        case "Company Visit": return "fa-building-columns";
        case "EIM Peduli": return "fa-heart";
        default: return "fa-calendar";
    }
}

function renderEvents() {
    const grid = document.getElementById("events-grid");
    if (!grid) return;

    grid.innerHTML = "";

    if (eventList.length === 0) {
        grid.innerHTML = `
            <div class="news-empty-state">
                <i class="fa-regular fa-folder-open"></i>
                <h3>Belum ada Event</h3>
                <p>Tambahkan event pertama Anda!</p>
            </div>
        `;
        return;
    }

    eventList.forEach(event => {
        const statusClass = event.status === 'completed' ? 'completed' : 'upcoming';
        const statusIcon = event.status === 'completed' ? 'fa-circle-check' : 'fa-clock';
        const statusText = event.status === 'completed' ? 'Completed' : 'Upcoming';
        
        let coverImg = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600";
        let parsedImage = event.image;
        try { if (typeof event.image === 'string') parsedImage = JSON.parse(event.image); } catch(e){}
        
        if (Array.isArray(parsedImage) && parsedImage.length > 0) {
            coverImg = parsedImage[0];
        } else if (typeof event.image === 'string' && event.image.trim() !== '') {
            coverImg = event.image;
        }

        const card = document.createElement("div");
        card.className = "event-card glass-panel";
        card.innerHTML = `
            <div class="event-cover-img">
                <img src="${coverImg}" alt="Cover ${event.title}">
            </div>
            <div class="event-status ${statusClass}">
                <i class="fa-solid ${statusIcon}"></i> ${statusText}
            </div>
            <div class="event-icon">
                <i class="fa-solid ${event.icon}"></i>
            </div>
            <h3>${event.title}</h3>
            <p class="event-cat">Kategori: ${event.category}</p>
            <p>${event.description}</p>

            <a href="event-detail.php?id=${event.id}" class="btn btn-secondary btn-read-more"
                style="width: 100%; margin-top: 15px; padding: 8px; font-size: 0.9rem; text-align: center;">Baca
                Selengkapnya <i class="fa-solid fa-arrow-right" style="margin-left: 5px;"></i></a>

            <div class="event-footer" style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 20px;">
                <span class="event-date"><i class="fa-regular fa-calendar"></i> ${event.event_date}</span>
                ${window.USER_ROLE === 'admin' ? `
                <div class="news-action-btns">
                    <button class="btn-icon btn-icon-edit" onclick="editEvent('${event.id}')" title="Edit Event">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-icon btn-icon-delete" onclick="deleteEvent('${event.id}')" title="Hapus Event">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

window.deleteEvent = async function (id) {
    if (confirm("Apakah Anda yakin ingin menghapus event ini?")) {
        try {
            const res = await fetch('api_events.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                eventList = eventList.filter(e => e.id != id);
                renderEvents();
                showToast("Event berhasil dihapus!", "success");
            } else {
                showToast("Gagal menghapus event", "danger");
            }
        } catch (e) {
            showToast("Terjadi kesalahan", "danger");
        }
    }
};

window.editEvent = function (id) {
    const ev = eventList.find(e => e.id === id);
    if (!ev) return;

    document.getElementById("event-modal-title").innerText = "Edit Event";
    document.getElementById("event-id").value = ev.id;
    document.getElementById("event-input-title").value = ev.title;
    document.getElementById("event-input-category").value = ev.category;
    document.getElementById("event-input-status").value = ev.status;
    document.getElementById("event-input-date").value = ev.event_date;
    document.getElementById("event-input-desc").value = ev.description;
    
    document.getElementById("event-input-organizer").value = ev.organizer || "";
    
    let benefitsStr = "";
    try { if (ev.benefits) benefitsStr = JSON.parse(ev.benefits).join("\n"); } catch(e) {}
    document.getElementById("event-input-benefits").value = benefitsStr;
    
    let reqsStr = "";
    try { if (ev.requirements) reqsStr = JSON.parse(ev.requirements).join("\n"); } catch(e) {}
    document.getElementById("event-input-reqs").value = reqsStr;
    
    document.getElementById("event-input-url").value = "";
    document.getElementById("event-input-file").value = "";
    
    const previewContainer = document.getElementById("event-file-preview-container");
    if(previewContainer) previewContainer.innerHTML = "";
    eventBase64Images = [];

    let parsedImage = ev.image;
    try { if (typeof ev.image === 'string') parsedImage = JSON.parse(ev.image); } catch(e){}

    if (Array.isArray(parsedImage)) {
        eventBase64Images = [...parsedImage];
        if (previewContainer) {
            parsedImage.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.className = "file-upload-preview";
                img.style.display = "block";
                img.style.width = "60px";
                img.style.height = "60px";
                img.style.objectFit = "cover";
                previewContainer.appendChild(img);
            });
        }
        document.getElementById("event-file-label-text").innerText = `${parsedImage.length} file terpilih`;
    } else {
        eventBase64Images = [parsedImage];
        if (previewContainer) {
            const img = document.createElement("img");
            img.src = parsedImage;
            img.className = "file-upload-preview";
            img.style.display = "block";
            img.style.width = "60px";
            img.style.height = "60px";
            img.style.objectFit = "cover";
            previewContainer.appendChild(img);
        }
        document.getElementById("event-file-label-text").innerText = `1 file terpilih`;
    }

    document.getElementById("event-modal").classList.add("active");
};

function openEventModal() {
    document.getElementById("event-modal-title").innerText = "Tambah Event Baru";
    document.getElementById("event-form").reset();
    document.getElementById("event-id").value = "";
    const previewContainer = document.getElementById("event-file-preview-container");
    if(previewContainer) previewContainer.innerHTML = "";
    document.getElementById("event-file-label-text").innerText = "Klik atau seret gambar ke sini";
    eventBase64Images = [];
    document.getElementById("event-modal").classList.add("active");
}

function closeEventModal() {
    const modal = document.getElementById("event-modal");
    if(modal) modal.classList.remove("active");
}


// --- RENDER LATEST NEWS (for Beranda page) ---
function renderLatestNews() {
    const container = document.getElementById("latest-news-container");
    if (!container) return;

    container.innerHTML = "";

    if (newsList.length === 0) {
        container.innerHTML = `
            <div class="news-empty-state glass-panel" style="grid-column: 1 / -1;">
                <i class="fa-regular fa-newspaper"></i>
                <p style="color: var(--text-secondary);">Belum ada berita terbaru.</p>
            </div>
        `;
        return;
    }

    // Sort and take only latest 3
    const sortedNews = [...newsList].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestNews = sortedNews.slice(0, 3);

    latestNews.forEach(news => {
        const dateObj = new Date(news.date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('id-ID', options);
        const imgSource = news.image || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600";

        const card = document.createElement("div");
        card.className = "news-card glass-panel";

        card.innerHTML = `
            <div class="news-img">
                <img src="${imgSource}" alt="${news.title}" loading="lazy">
                <span class="news-tag">${news.category}</span>
            </div>
            <div class="news-content">
                <div class="news-date"><i class="fa-regular fa-calendar"></i> ${formattedDate}</div>
                <h3>${news.title}</h3>
                <p class="news-desc">${news.content}</p>
                <div class="news-footer">
                    <span class="news-author">Oleh: ${news.author}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- NEWS PERSISTENCE & CRUD FUNCTIONS ---

// Base64 storage variable for news image upload
let newsBase64Image = "";

// Open Modal for adding news
function openAddModal() {
    const newsForm = document.getElementById("news-form");
    const newsIdInput = document.getElementById("news-id");
    const modalTitle = document.getElementById("modal-title");
    const fileLabelText = document.getElementById("file-label-text");
    const filePreviewImg = document.getElementById("file-preview-img");

    if (!newsForm) return;

    newsForm.reset();
    newsIdInput.value = "";
    modalTitle.innerText = "Tambah Berita Baru";
    fileLabelText.innerText = "Klik atau seret gambar ke sini (Opsional)";
    filePreviewImg.style.display = "none";
    filePreviewImg.src = "";
    newsBase64Image = "";

    const newsModal = document.getElementById("news-modal");
    newsModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

// Close Modal
function closeModal() {
    const newsModal = document.getElementById("news-modal");
    if (!newsModal) return;
    newsModal.classList.remove("active");
    document.body.style.overflow = "";
}

// Edit news handler
window.editNews = function (id) {
    const newsItem = newsList.find(n => n.id === id);
    if (!newsItem) return;

    const newsIdInput = document.getElementById("news-id");
    const newsTitleInput = document.getElementById("news-input-title");
    const newsCategoryInput = document.getElementById("news-input-category");
    const newsAuthorInput = document.getElementById("news-input-author");
    const newsContentInput = document.getElementById("news-input-content");
    const newsUrlInput = document.getElementById("news-input-url");
    const fileLabelText = document.getElementById("file-label-text");
    const filePreviewImg = document.getElementById("file-preview-img");
    const modalTitle = document.getElementById("modal-title");
    const newsModal = document.getElementById("news-modal");

    if (!newsIdInput || !newsModal) return;

    newsIdInput.value = newsItem.id;
    newsTitleInput.value = newsItem.title;
    newsCategoryInput.value = newsItem.category;
    newsAuthorInput.value = newsItem.author;
    newsContentInput.value = newsItem.content;

    // Set image source if it exists
    if (newsItem.image) {
        if (newsItem.image.startsWith("data:")) {
            filePreviewImg.src = newsItem.image;
            filePreviewImg.style.display = "block";
            fileLabelText.innerText = "Ganti berkas terunggah";
            newsBase64Image = newsItem.image;
            newsUrlInput.value = "";
        } else {
            newsUrlInput.value = newsItem.image;
            filePreviewImg.style.display = "none";
            filePreviewImg.src = "";
            newsBase64Image = "";
        }
    }

    modalTitle.innerText = "Sunting Berita";
    newsModal.classList.add("active");
    document.body.style.overflow = "hidden";
};

// Delete news handler
window.deleteNews = async function (id) {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
        try {
            const res = await fetch('api_news.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                newsList = newsList.filter(n => n.id != id);
                renderNews();
                showToast("Berita berhasil dihapus!", "danger");
            } else {
                showToast("Gagal menghapus berita", "danger");
            }
        } catch (e) {
            showToast("Terjadi kesalahan", "danger");
        }
    }
};

// --- NAVIGATION & SCROLL HANDLERS ---

// Scroll navbar handling
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// --- APP INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initAppData();

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById("nav-toggle");
    const navLinksContainer = document.getElementById("nav-links");

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener("click", function () {
            this.classList.toggle("active");
            navLinksContainer.classList.toggle("active");
        });

        // Close mobile menu when nav link is clicked
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("active");
                navLinksContainer.classList.remove("active");
            });
        });
    }

    // --- Structure Page: Member Grid & Filter Tabs ---
    const memberGrid = document.getElementById("member-grid");
    const filterTabs = document.querySelectorAll(".filter-tab");

    if (memberGrid) {
        // Read URL search parameter for 'div' or 'divisi'
        const urlParams = new URLSearchParams(window.location.search);
        const divParam = urlParams.get('div') || urlParams.get('divisi') || 'all';

        // Update active class on tabs based on URL parameter
        filterTabs.forEach(t => t.classList.remove("active"));
        const activeTab = Array.from(filterTabs).find(t => t.getAttribute("data-filter") === divParam.toLowerCase());
        if (activeTab) {
            activeTab.classList.add("active");
        } else {
            const allTab = Array.from(filterTabs).find(t => t.getAttribute("data-filter") === "all");
            if (allTab) allTab.classList.add("active");
        }

        renderMembers(divParam);

        filterTabs.forEach(tab => {
            tab.addEventListener("click", function () {
                filterTabs.forEach(t => t.classList.remove("active"));
                this.classList.add("active");
                const filterVal = this.getAttribute("data-filter");
                // Update URL parameter without reloading page
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?div=' + filterVal;
                window.history.pushState({ path: newUrl }, '', newUrl);
                renderMembers(filterVal);
            });
        });
    }

    // --- News Page: Full CRUD ---
    const newsGrid = document.getElementById("news-grid");
    const btnAddNews = document.getElementById("btn-add-news");
    const newsModal = document.getElementById("news-modal");
    const newsModalOverlay = document.getElementById("news-modal-overlay");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const newsForm = document.getElementById("news-form");
    const btnCancelNews = document.getElementById("btn-cancel-news");
    const newsFileInput = document.getElementById("news-input-file");

    if (newsGrid && btnAddNews && newsModal) {
        renderNews();

        // Event listeners for modal
        btnAddNews.addEventListener("click", openAddModal);
        modalCloseBtn.addEventListener("click", closeModal);
        newsModalOverlay.addEventListener("click", closeModal);
        btnCancelNews.addEventListener("click", closeModal);

        // Convert image upload to Base64
        if (newsFileInput) {
            newsFileInput.addEventListener("change", function (e) {
                const file = e.target.files[0];
                if (!file) return;

                if (file.size > 10 * 1024 * 1024) {
                    showToast("Ukuran gambar terlalu besar! Maksimal 10MB.", "danger");
                    newsFileInput.value = "";
                    return;
                }

                const reader = new FileReader();
                const fileLabelText = document.getElementById("file-label-text");
                const filePreviewImg = document.getElementById("file-preview-img");
                const newsUrlInput = document.getElementById("news-input-url");

                reader.onload = function (event) {
                    newsBase64Image = event.target.result;
                    filePreviewImg.src = newsBase64Image;
                    filePreviewImg.style.display = "block";
                    fileLabelText.innerText = `Berkas: ${file.name}`;
                    newsUrlInput.value = "";
                };
                reader.readAsDataURL(file);
            });
        }

        // Form submit handler (Add/Update)
        newsForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const newsIdInput = document.getElementById("news-id");
            const newsTitleInput = document.getElementById("news-input-title");
            const newsCategoryInput = document.getElementById("news-input-category");
            const newsAuthorInput = document.getElementById("news-input-author");
            const newsContentInput = document.getElementById("news-input-content");
            const newsUrlInput = document.getElementById("news-input-url");

            const id = newsIdInput.value;
            const title = newsTitleInput.value.trim();
            const category = newsCategoryInput.value;
            const author = newsAuthorInput.value.trim();
            const content = newsContentInput.value.trim();
            const urlImage = newsUrlInput.value.trim();

            let image = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600";
            if (newsBase64Image) {
                image = newsBase64Image;
            } else if (urlImage) {
                image = urlImage;
            }

            const payload = {
                title, category, author, content, image, 
                date: new Date().toISOString().split('T')[0]
            };

            try {
                if (id) {
                    payload.id = id;
                    const res = await fetch('api_news.php', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                        showToast("Berita berhasil diperbarui!");
                        initAppData(); // Reload
                    }
                } else {
                    const res = await fetch('api_news.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                        showToast("Berita baru berhasil diterbitkan!");
                        initAppData(); // Reload
                    }
                }
                closeModal();
            } catch (e) {
                showToast("Terjadi kesalahan", "danger");
            }
        });
    }

    // --- Event Page: Full CRUD ---
    const eventsGrid = document.getElementById("events-grid");
    const btnAddEvent = document.getElementById("btn-add-event");
    const eventModal = document.getElementById("event-modal");
    const eventModalOverlay = document.getElementById("event-modal-overlay");
    const eventModalCloseBtn = document.getElementById("event-modal-close-btn");
    const eventForm = document.getElementById("event-form");
    const btnCancelEvent = document.getElementById("btn-cancel-event");
    const eventFileInput = document.getElementById("event-input-file");

    if (eventsGrid && btnAddEvent && eventModal) {
        renderEvents();

        btnAddEvent.addEventListener("click", openEventModal);
        eventModalCloseBtn.addEventListener("click", closeEventModal);
        eventModalOverlay.addEventListener("click", closeEventModal);
        btnCancelEvent.addEventListener("click", closeEventModal);

        if (eventFileInput) {
            eventFileInput.addEventListener("change", function (e) {
                const files = e.target.files;
                if (files.length === 0) return;

                const previewContainer = document.getElementById("event-file-preview-container");
                if (previewContainer) previewContainer.innerHTML = "";
                eventBase64Images = [];
                const urlInput = document.getElementById("event-input-url");
                let allValid = true;

                Array.from(files).forEach(file => {
                    if (file.size > 10 * 1024 * 1024) {
                        showToast(`File ${file.name} terlalu besar! Maksimal 10MB.`, "danger");
                        allValid = false;
                    }
                });

                if (!allValid) {
                    eventFileInput.value = "";
                    return;
                }

                document.getElementById("event-file-label-text").innerText = `${files.length} file dipilih`;
                if(urlInput) urlInput.value = "";

                Array.from(files).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        eventBase64Images.push(event.target.result);
                        if (previewContainer) {
                            const img = document.createElement("img");
                            img.src = event.target.result;
                            img.className = "file-upload-preview";
                            img.style.display = "block";
                            img.style.width = "60px";
                            img.style.height = "60px";
                            img.style.objectFit = "cover";
                            previewContainer.appendChild(img);
                        }
                    };
                    reader.readAsDataURL(file);
                });
            });
        }

        eventForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const id = document.getElementById("event-id").value;
            const title = document.getElementById("event-input-title").value.trim();
            const category = document.getElementById("event-input-category").value;
            const status = document.getElementById("event-input-status").value;
            const event_date = document.getElementById("event-input-date").value.trim();
            const icon = getEventIcon(category);
            const description = document.getElementById("event-input-desc").value.trim();
            const link = "event-detail.php";
            const urlImage = document.getElementById("event-input-url").value.trim();
            
            const organizer = document.getElementById("event-input-organizer").value.trim();
            const benefitsText = document.getElementById("event-input-benefits").value.trim();
            const requirementsText = document.getElementById("event-input-reqs").value.trim();
            
            const benefits = benefitsText ? benefitsText.split('\n').map(s => s.trim()).filter(s => s) : [];
            const requirements = requirementsText ? requirementsText.split('\n').map(s => s.trim()).filter(s => s) : [];

            let image = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600";
            if (eventBase64Images.length > 0) {
                image = JSON.stringify(eventBase64Images); // Convert array to string for DB
            } else if (urlImage) {
                image = JSON.stringify([urlImage]);
            }

            const payload = {
                title, category, status, event_date, icon, description, link, image,
                organizer, 
                benefits: JSON.stringify(benefits), 
                requirements: JSON.stringify(requirements)
            };

            try {
                if (id) {
                    payload.id = id;
                    const res = await fetch('api_events.php', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                        showToast("Event berhasil diperbarui!");
                        initAppData(); // Reload
                        closeEventModal();
                    } else {
                        showToast("Gagal menyimpan perubahan. Periksa batas ukuran PHP/MySQL.", "danger");
                    }
                } else {
                    const res = await fetch('api_events.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                        showToast("Event baru berhasil ditambahkan!");
                        initAppData(); // Reload
                        closeEventModal();
                    } else {
                        showToast("Gagal menyimpan event. Periksa batas ukuran PHP/MySQL.", "danger");
                    }
                }
            } catch (e) {
                showToast("Terjadi kesalahan: " + e.message, "danger");
            }
        });
    }

    // --- Beranda Page: Latest News Preview ---
    const latestNewsContainer = document.getElementById("latest-news-container");
    if (latestNewsContainer) {
        renderLatestNews();
    }

    // --- PAGE TRANSITION SYSTEM ---
    initPageTransitions();
});

// --- PAGE TRANSITIONS ---
function initPageTransitions() {
    // Create transition overlay element
    const overlay = document.createElement("div");
    overlay.className = "page-transition-overlay";
    overlay.innerHTML = `
        <div class="transition-strip"></div>
        <div class="transition-strip"></div>
        <div class="transition-strip"></div>
        <div class="transition-strip"></div>
    `;
    document.body.appendChild(overlay);

    // Animate content sections on enter
    const contentSections = document.querySelectorAll(
        ".hero, .page-header, .section-padding, .footer"
    );
    contentSections.forEach((section, i) => {
        section.style.animationDelay = `${0.3 + i * 0.08}s`;
        section.classList.add("page-content-animate");
    });

    // Play reveal (enter) animation on page load
    overlay.classList.add("enter");

    // Clean up overlay after enter animation finishes
    setTimeout(() => {
        overlay.classList.remove("enter");
    }, 350);

    // Intercept internal navigation links for exit transition
    const internalLinks = document.querySelectorAll(
        'a[href$=".php"], a[href^="index"], a[href^="about"], a[href^="event"], a[href^="structure"], a[href^="news"]'
    );

    internalLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            // Skip if same page, external, or has target
            if (!href || href.startsWith("#") || href.startsWith("http") || this.target === "_blank") return;

            // Get current page filename
            const currentPage = window.location.pathname.split("/").pop() || "index.php";
            if (href === currentPage) return;

            e.preventDefault();

            // Play exit animation
            overlay.classList.add("exit");

            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = href;
            }, 250);
        });
    });
}

// Handle browser back/forward with bfcache
window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        // Page was restored from bfcache, re-trigger enter animation
        const overlay = document.querySelector(".page-transition-overlay");
        if (overlay) {
            overlay.classList.remove("exit");
            overlay.classList.add("enter");
            setTimeout(() => {
                overlay.classList.remove("enter");
            }, 350);
        }
    }
});
