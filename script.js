/*==================================================
ZERO HORIZON
script.js
==================================================*/


/*==================================================
ELEMENTS
==================================================*/

const cards = document.querySelector("#cards");

const title = document.querySelector("header h2");

const subtitle = document.querySelector("header p");

const topHeader = document.querySelector(".top-header");
const locationBanner = document.querySelector("#locationBanner");
const locationBannerImage = document.querySelector("#locationBannerImage");

const navButtons = document.querySelectorAll(".nav-btn");

const searchInput = document.querySelector("#searchInput");
const searchBox = document.querySelector(".search-box");

const documentView = document.querySelector("#documentView");

const documentContent = document.querySelector("#documentContent");


/*==================================================
STATE
==================================================*/

let currentSection = "history";

/*==================================================
INITIALIZE
==================================================*/

render();


/*==================================================
RENDER
==================================================*/

function render(){

    const page = database[currentSection];

    // 페이지 이동 시 기존 문서 닫기

    if(documentView){
        documentView.classList.remove("active");
    }

    if(documentContent){
        documentContent.innerHTML="";
    }


    if(!page) return;

if(!cards) return;

// 검색창은 괴이 목록 페이지에서만 노출
if(searchBox){
    const hideSearch = ["history", "timeline", "staff"].includes(currentSection);
    searchBox.classList.toggle("is-hidden", hideSearch);
}

// 장소 페이지 배너
if(locationBanner && locationBannerImage && topHeader){
    if(page.banner){
        locationBannerImage.src = page.banner;
        locationBannerImage.alt = `${page.info?.title || currentSection} 배너`;
        locationBanner.classList.add("active");
        locationBanner.setAttribute("aria-hidden", "false");
        topHeader.classList.add("has-location-banner");
    }else{
        locationBannerImage.removeAttribute("src");
        locationBannerImage.alt = "";
        locationBanner.classList.remove("active");
        locationBanner.setAttribute("aria-hidden", "true");
        topHeader.classList.remove("has-location-banner");
    }
}

// 카드 영역 비우기

cards.innerHTML="";


const list = page.records || [];


// 임직원 명부
if(currentSection === "staff"){
    renderStaffDirectory(page);
    return;
}

if(page.notice){
    const notice = document.createElement("div");
    notice.className = "entity-page-notice";
    notice.innerHTML = `
        <span class="entity-page-notice-label">NOTICE / LEVEL 5 CLEARANCE</span>
        <p>${page.notice}</p>
    `;
    cards.appendChild(notice);
}

if(list.length > 0){
    // 1. 임직원(STAFF)과 괴이(ENTITY) 목록으로 데이터를 따로 분리해서 분류합니다.
    const staffs = list.filter(item => item.type === "STAFF");
    const entities = list.filter(item => item.type === "ENTITY" || !item.type); // type을 안 적은 데이터는 기본 괴이로 봅니다.

    // 2. 만약 임직원 데이터가 있다면 상단 영역에 제목을 달고 카드를 먼저 뿌립니다.
    if (staffs.length > 0) {
        const staffTitle = document.createElement("div");
        staffTitle.className = "section-header-title";
        staffTitle.innerHTML = `<h2>STAFF LIST</h2>`;
        cards.appendChild(staffTitle);

        staffs.forEach(item => {
            cards.appendChild(createCard(item));
        });
    }

    // 3. 임직원과 괴이 둘 다 목록에 존재한다면 중간에 멋진 붉은 구분선을 그립니다.
    if (staffs.length > 0 && entities.length > 0) {
        const divider = document.createElement("div");
        divider.className = "document-divider";
        divider.style.cssText = `
            grid-column: 1 / -1; /* 격자 무늬 줄바꿈을 방지하고 가로를 통째로 차지합니다 */
            display: block !important;
            width: 100% !important;
            height: 2px !important;
            background: #df2b2b !important;
            box-shadow: 0 0 10px rgba(223, 43, 43, 0.8) !important;
            margin: 50px 0 !important;
            opacity: 1 !important;
            visibility: visible !important;
        `;
        cards.appendChild(divider);
    }

    // 4. 그 뒤에 괴이 데이터가 있다면 아래쪽에 괴이 제목을 달고 카드를 마저 뿌립니다.
    if (entities.length > 0) {
        const entityTitle = document.createElement("div");
        entityTitle.className = "section-header-title";
        entityTitle.innerHTML = `<h2>${page.entityListTitle || "ENTITY LIST"}</h2>`;
        cards.appendChild(entityTitle);

        entities.forEach(item => {
            cards.appendChild(createCard(item));
        });
    }
}
// 문서형 페이지

if(page.documentData || page.document){

    openDocument({
        file: page.document,
        documentData: page.documentData
    });

}


// 데이터 없음

if(
    list.length===0 &&
    !page.document &&
    !page.documentData &&
    currentSection !== "chapel" &&
    currentSection !== "staff"
){

    cards.innerHTML=`

    <div class="loading">
    NO DATA
    </div>

    `;

}

}
/*==================================================
CREATE CARD (WITH GRAY COMMENT BOX)
==================================================*/

function createCard(data){
    const card = document.createElement("article");
    card.className = "card entity-card fade";
    
    // 카드의 기본 내용 구성 (이미지 데이터가 존재할 때만 상단에 이미지 영역을 부드럽게 삽입)
    card.innerHTML = `
        ${data.image ? `
        <div class="card-image-wrapper" style="
            width: 100%;
            height: 180px;
            overflow: hidden;
            border-bottom: 1px solid rgba(223, 43, 43, 0.15);
            background: #000;
        ">
            <img src="${data.image}" alt="${data.title}" style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0.85;
                transition: opacity 0.3s;
            ">
        </div>
        ` : ""}
        <div class="card-content" style="padding: 20px;">
            <div class="card-tag">
                ${data.tag}
            </div>
            <div class="card-title">
                ${data.title}
            </div>
            <div class="card-desc">
                ${data.description}
            </div>

            <!-- ★ [신규 추가] 데이터에 comment가 있을 때만 회색 코멘트 칸 생성 -->
            ${data.comment ? `
            <div class="card-comment" style="
                margin-top: 15px;
                margin-bottom: 5px;
                padding: 12px 14px;
                background: rgba(255, 255, 255, 0.05);
                border-left: 3px solid #555;
                color: #aaa;
                font-size: 0.88rem;
                line-height: 1.5;
                word-break: break-all;
                font-family: monospace;
            ">
                <span style="color: #777; font-size: 0.75rem; display: block; margin-bottom: 4px; letter-spacing: 1px;">[COMMENT]</span>
                ${data.comment}
            </div>
            ` : ""}

            <div class="card-footer">
                <span>${data.category}</span>
            </div>
        </div>
    `;

    return card;
}/*==================================================
NAVIGATION
==================================================*/

navButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        navButtons.forEach(btn=>{

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentSection = button.dataset.section;


        updateHeader(currentSection);

        render();

        scrollTopSmooth();

    });

});

/*==================================================
HEADER
==================================================*/

function updateHeader(section){

    switch(section){

        case "timeline":
            title.textContent="Timeline";
            subtitle.textContent="제0의 지평선과 한반도 괴이 통제 체계의 연혁";
            break;

        case "history":

            title.textContent="History";
            subtitle.textContent="제로 호라이즌의 시작과 기록";
            break;

        case "gent":

            title.textContent="Gent Emporium";
            subtitle.textContent="대대로 인간화된 괴이가 관리 중인 대한민국의 백화점. 남성복 매장이 특징적이며, 원활한 관리를 위해 '영원한 젊음' 괴이를 배치 중.";
            break;

        case "hwa":

            title.textContent="Hwa-an Prison";
            subtitle.textContent="대한민국에서 가장 오래된 격리소. 교도소의 외관을 하고 있으며, 원활한 관리를 위하여 ███을 봉인함.";
            break;

        case "chapel":

            title.textContent="Blue Chapel";
            subtitle.textContent="LEVEL 5 CLEARANCE";
            break;

	case "korea":

             title.textContent = "Korea Branch";
            subtitle.textContent = "제0의 지평선 대한민국지사";

            break;


        default:

            title.textContent="ZERO HORIZON";
            subtitle.textContent="";
            break;

    }

}


/*==================================================
SEARCH
==================================================*/

if(searchInput){

    searchInput.addEventListener("input",()=>{

        const keyword = searchInput.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card=>{

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(keyword)

                ? ""

                : "none";

        });

    });

}


/*==================================================
SCROLL
==================================================*/

function scrollTopSmooth(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*==================================================
OPEN DOCUMENT
==================================================*/

async function openDocument(data){

    if(!documentView || !documentContent){

        console.error("documentView가 없습니다.");

        return;

    }

    try{

        let doc = data.documentData || null;

        // history.js가 있으면 온/오프라인 모두 이 데이터를 사용합니다.
        // 없는 경우에는 GitHub Pages 등 온라인 환경에서 history.json으로 폴백합니다.
        if(!doc){
            const response = await fetch(data.file);

            if(!response.ok){
                throw new Error(response.status);
            }

            doc = await response.json();
        }

        // 타임라인 전용 레이아웃
        if(doc.layout === "timeline"){
            documentContent.innerHTML = buildTimeline(doc);
            documentView.classList.add("active");
            return;
        }

        // 조직 개요 전용 레이아웃
        if(doc.layout === "organization-overview"){
            documentContent.innerHTML = buildOrganizationOverview(doc);
            documentView.classList.add("active");
            return;
        }

        let html = "";

        if(doc.banner){

            html += `

            <div class="document-banner">

                <img src="${doc.banner}" alt="${doc.title}">

            </div>

            `;

        }

        html += `

        <h1>${doc.title}</h1>

${doc.subtitle ? `
<p class="document-subtitle">
${doc.subtitle.replace(/\n/g,"<br>")}
</p>

<div class="document-title-divider"></div>
` : ""}

        `;

if (doc.sections) {
    doc.sections.forEach((section, index) => {
        
			// section.divider에 true든, "true"든 무슨 값이든 존재하기만 하면 선을 그리도록 조건문을 완화합니다.
        if (section.divider) {
            html += `
            <div class="document-divider" style="
                display: block !important;
                width: 100% !important;
                height: 2px !important;
                background: #df2b2b !important;
                box-shadow: 0 0 10px rgba(223, 43, 43, 0.8) !important;
                margin: 50px 0 !important;
                opacity: 1 !important;
                visibility: visible !important;
            "></div>`;
        }

        // 기본 제목 및 본문 구성
        html += `
            <h2>${section.title}</h2>
            <h3>${section.subtitle || ""}</h3>${section.image ? `
            <div class="document-section-image">
                <img src="${section.image}" alt="${section.title}">
            </div>
            ` : ""}
            <p>${section.content}</p>
        `;

        // 3. 디테일 리스트 처리
        if (section.details) {
            html += `<ul class="document-list">`;
            section.details.forEach(detail => {
                html += `
                <li>
                    ${detail.replace(/\n/g, "<br>")}
                </li>
                `;
            });
            html += `</ul>`;
        }

        // 4. 테이블 처리
        if (section.tables) {
            section.tables.forEach(table => {
                html += `
                <div class="document-table">
                    <h3>${table.title}</h3>
                    <table>
                        <thead>
                            <tr>
                `;

                table.headers.forEach(header => {
                    html += `<th>${header}</th>`;
                });

                html += `
                            </tr>
                        </thead>
                        <tbody>
                `;

                table.rows.forEach(row => {
                    html += `<tr>`;
                    row.forEach(cell => {
                        html += `<td>${cell}</td>`;
                    });
                    html += `</tr>`;
                });

                html += `
                        </tbody>
                    </table>
                </div>
                `;
            });
        }
    });
}

documentContent.innerHTML = html;

documentView.classList.add("active");

documentView.scrollIntoView({

    behavior:"smooth",

    block:"start"

});
    }

    catch(error){

        console.error(error);

        documentContent.innerHTML = `

        <h1>문서를 불러올 수 없습니다.</h1>

        <p>

        ${data.file}

        </p>

        `;

        documentView.classList.add("active");

    }

}

/*==================================================
ORGANIZATION OVERVIEW / HISTORY
==================================================*/

function buildHistoryOperationPanel(item){
    if(item.status === "placeholder"){
        return `
            <div class="history-operation-placeholder">
                <span class="history-operation-placeholder-code">DATA PENDING</span>
                <h3>${item.title}</h3>
                <p>${item.message || "시설 내부 구조 및 운영방침 자료가 등록되지 않았습니다."}</p>
            </div>
        `;
    }

    const intro = item.intro || [];
    const floors = item.floors || [];
    const departments = item.departments || [];
    const ranks = item.ranks || [];

    const introHtml = intro.map(section => `
        <section class="history-operation-copy">
            <h4>${section.title}</h4>
            ${(section.paragraphs || []).map(p => `<p>${p}</p>`).join("")}
        </section>
    `).join("");

    const floorsHtml = floors.map((floor, index) => `
        <article class="facility-node ${floor.risk ? `risk-${floor.risk}` : ""} ${floor.closed ? "is-closed" : ""}">
            <div class="facility-floor">${floor.floor}</div>
            <div class="facility-node-point" aria-hidden="true"></div>
            <div class="facility-node-content">
                <div class="facility-node-head">
                    <strong>${floor.facility}</strong>
                    ${floor.code ? `<span>${floor.code}</span>` : ""}
                </div>
                <p>${floor.purpose || ""}</p>
            </div>
        </article>
    `).join("");

    const departmentHtml = departments.map(row => `
        <div class="history-system-row">
            <strong>${row.name}</strong>
            <span>${row.work}</span>
        </div>
    `).join("");

    const rankHtml = ranks.map(row => `
        <div class="history-system-row">
            <strong>${row.type}</strong>
            <span>${row.order}</span>
        </div>
    `).join("");

    const systemCards = [
        departments.length ? `
            <section class="history-system-card">
                <div class="history-subheading">
                    <span>DEPARTMENT SYSTEM</span>
                    <h4>부서 체계</h4>
                </div>
                <div class="history-system-table">${departmentHtml}</div>
            </section>` : "",
        ranks.length ? `
            <section class="history-system-card">
                <div class="history-subheading">
                    <span>RANK SYSTEM</span>
                    <h4>직급 체계</h4>
                </div>
                <div class="history-system-table">${rankHtml}</div>
            </section>` : ""
    ].filter(Boolean).join("");

    const systemCount = (departments.length ? 1 : 0) + (ranks.length ? 1 : 0);

    return `
        <div class="history-operation-header ${item.restricted ? "is-restricted" : ""}">
            <span class="history-operation-code">${item.en || ""}</span>
            <h3>${item.title}</h3>
            ${item.subtitle ? `<p>${item.subtitle}</p>` : ""}
        </div>

        <div class="history-operation-intro">
            ${introHtml}
        </div>

        ${floors.length ? `
        <section class="facility-network-section">
            <div class="history-subheading">
                <span>FACILITY NETWORK</span>
                <h4>층별 시설 구조</h4>
            </div>
            ${item.networkNote ? `<div class="facility-network-note">${item.networkNote}</div>` : ""}
            <div class="facility-network">
                ${floorsHtml}
            </div>
        </section>` : ""}

        ${systemCards ? `
        <div class="history-system-grid ${systemCount === 1 ? "single" : ""}">
            ${systemCards}
        </div>` : ""}
    `;
}

function switchHistoryOperationTab(id){
    document.querySelectorAll("[data-operation-tab]").forEach(button => {
        const active = button.dataset.operationTab === id;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", active ? "true" : "false");
    });

    document.querySelectorAll("[data-operation-panel]").forEach(panel => {
        panel.classList.toggle("active", panel.dataset.operationPanel === id);
    });
}

function buildTimeline(doc){
    const entries = doc.entries || [];
    const entryHtml = entries.map((item, index) => `
        <article class="timeline-entry">
            <div class="timeline-marker" aria-hidden="true">
                <span>${String(index + 1).padStart(2, "0")}</span>
            </div>
            <div class="timeline-entry-card">
                <div class="timeline-date">${item.date}</div>
                <h2>${item.title}</h2>
                <div class="timeline-copy">
                    ${(item.paragraphs || []).map(p => `<p>${p}</p>`).join("")}
                </div>
            </div>
        </article>
    `).join("");

    return `
        <div class="timeline-document">
            <div class="history-clearance-strip">
                <span>ARCHIVE / CHRONOLOGY</span>
                <strong>ZERO HORIZON HISTORICAL RECORD</strong>
            </div>
            <div class="timeline-heading">
                <span class="history-overview-kicker">HISTORICAL TIMELINE</span>
                <h1>${doc.title || "타임라인"}</h1>
                ${doc.subtitle ? `<p>${doc.subtitle}</p>` : ""}
            </div>
            <div class="timeline-axis">
                ${entryHtml}
            </div>
            <div class="timeline-endmark"><span>2026 / PRESENT</span></div>
        </div>
    `;
}

function buildOrganizationOverview(doc){
    const concepts = doc.concepts || [];
    const organizations = doc.organizations || [];
    const branch = doc.branch || {};
    const teams = branch.teams || [];
    const covertTeam = branch.covertTeam || null;
    const majorFacilities = doc.majorFacilities || [];

    const conceptHtml = concepts.map(item => `
        <article class="history-concept-card">
            <div class="history-card-title">${item.title}</div>
            <div class="history-card-en">${item.en || ""}</div>
            <p>${item.description || ""}</p>
        </article>
    `).join("");

    const organizationHtml = organizations.map(item => `
        <article class="history-organization-card">
            ${item.logo ? `<div class="history-org-logo"><img src="${item.logo}" alt="${item.title} 로고"></div>` : `<div class="history-org-symbol" aria-hidden="true">◉</div>`}
            <div class="history-card-title">${item.title}</div>
            <div class="history-card-en">${item.en || ""}</div>
            <div class="history-mini-divider"></div>
            <p>${item.description || ""}</p>
        </article>
    `).join("");

    const teamLogoMap = {
        "연구팀": "img/YG_logo.png",
        "관찰팀": "img/GC_logo.png",
        "정화팀": "img/JH_logo.png",
        "특수제압팀": "img/TJ_logo.png"
    };

    const teamHtml = teams.map((team, index) => {
        const logo = team.logo || teamLogoMap[team.title] || "";
        return `
        <article class="history-team-card">
            ${logo ? `<div class="history-team-logo"><img src="${logo}" alt="${team.title} 로고"></div>` : `<div class="history-team-index">0${index + 1}</div>`}
            <div class="history-card-title">${team.title}</div>
            <div class="history-card-en">${team.en || ""}</div>
            <p>${team.description || ""}</p>
        </article>
        `;
    }).join("");

    const covertTeamHtml = covertTeam ? `
        <section class="history-covert-team">
            <div class="history-covert-label">${covertTeam.label || "비공식 · 비밀 특수팀"}</div>
            <div class="history-covert-body">
                <div class="history-covert-main">
                    ${covertTeam.logo ? `<div class="history-covert-logo"><img src="${covertTeam.logo}" alt="${covertTeam.title} 로고"></div>` : ""}
                    <div class="history-covert-title">${covertTeam.title || "제액신장"}</div>
                    <div class="history-covert-en">${covertTeam.en || "SPECIAL TEAM"}</div>
                    <p>${covertTeam.description || ""}</p>
                </div>
                ${Array.isArray(covertTeam.traits) && covertTeam.traits.length ? `
                <div class="history-covert-traits">
                    ${covertTeam.traits.map(item => `<span>${item}</span>`).join("")}
                </div>` : ""}
            </div>
        </section>
    ` : "";

    const majorFacilityHtml = majorFacilities.map((facility, index) => `
        <div class="history-major-facility-card">
            <span class="history-major-facility-index">${String(index + 1).padStart(2, "0")}</span>
            <strong>${facility.title}</strong>
        </div>
    `).join("");

    const operations = doc.operations || [];
    const defaultOperationId = (operations.find(item => item.status !== "placeholder") || operations[0] || {}).id;

    const operationsTabs = operations.map(item => `
        <button type="button"
                class="history-operation-tab ${item.id === defaultOperationId ? "active" : ""}"
                data-operation-tab="${item.id}"
                aria-selected="${item.id === defaultOperationId ? "true" : "false"}"
                onclick="switchHistoryOperationTab('${item.id}')">
            ${item.tabTitle || item.title}
        </button>
    `).join("");

    const operationsPanels = operations.map(item => `
        <section class="history-operation-panel ${item.id === defaultOperationId ? "active" : ""}" data-operation-panel="${item.id}">
            ${buildHistoryOperationPanel(item)}
        </section>
    `).join("");

    return `
        <div class="history-overview">
            <div class="history-clearance-strip">
                <span>LEVEL 5 CLEARANCE</span>
                <strong>레벨 5 이상 접근 가능</strong>
            </div>

            <div class="history-overview-heading">
                <span class="history-overview-kicker">ORGANIZATION MAP</span>
                <h1>${doc.title || "조직 관계도"}</h1>
                <div class="history-heading-line"></div>
            </div>

            <section class="history-concept-grid">
                ${conceptHtml}
            </section>

            <div class="history-relation-line" aria-hidden="true">
                <span></span><i></i><span></span>
            </div>

            <section class="history-organization-grid">
                ${organizationHtml}
            </section>

            <section class="history-branch-block">
                <div class="history-branch-node">
                    <span class="history-branch-logo"><img src="img/KR_logo.png" alt="한국지사 로고"></span>
                    <div>
                        <div class="history-card-title">${branch.title || "한국지사"}</div>
                        <div class="history-card-en">${branch.en || "KOREA BRANCH"}</div>
                    </div>
                </div>

                <div class="history-branch-stem" aria-hidden="true"></div>
                <div class="history-group-label">${branch.groupLabel || "공식 소속팀"}</div>
                <div class="history-team-stem" aria-hidden="true"></div>

                <div class="history-team-grid">
                    ${teamHtml}
                </div>

                ${covertTeamHtml}

                ${majorFacilities.length ? `
                <div class="history-major-facilities">
                    <div class="history-major-facility-label">
                        <span>PRIMARY CONTAINMENT FACILITIES</span>
                        <strong>주요 격리 시설</strong>
                    </div>
                    <div class="history-major-facility-grid">
                        ${majorFacilityHtml}
                    </div>
                </div>
                ` : ""}
            </section>

            ${operations.length ? `
            <section class="history-operations">
                <div class="history-section-heading">
                    <span class="history-overview-kicker">FACILITY OPERATIONS</span>
                    <h2>시설 주요 구조 및 운영방침</h2>
                    <div class="history-heading-line"></div>
                </div>

                <div class="history-operation-tabs" role="tablist" aria-label="시설 선택">
                    ${operationsTabs}
                </div>

                <div class="history-operation-panels">
                    ${operationsPanels}
                </div>
            </section>
            ` : ""}
        </div>
    `;
}

/*==================================================
CREATE CARD (ONLY ENTITY / NO IMAGE)
==================================================*/

function createCard(data){
    const card = document.createElement("article");
    card.className = "card entity-card fade";
    
    // 이미지를 완전히 배제하고, 텍스트 가독성에만 집중한 레이아웃
    card.innerHTML = `
        <div class="card-content" style="padding: 22px;">
            <div class="card-tag" style="font-family: monospace; letter-spacing: 1px;">
                ${data.tag}
            </div>
            <div class="card-title" style="font-size: 1.25rem; margin-top: 5px; margin-bottom: 12px; font-weight: bold;">
                ${data.title}
            </div>
            <div class="card-desc" style="color: #ccc; line-height: 1.6; font-size: 0.95rem;">
                ${data.description}
            </div>

            <!-- 데이터에 comment가 있을 때만 회색 코멘트 칸 생성 -->
            ${data.comment ? `
            <div class="card-comment" style="
                margin-top: 15px;
                margin-bottom: 5px;
                padding: 12px 14px;
                background: rgba(255, 255, 255, 0.04);
                border-left: 3px solid #555;
                color: #aaa;
                font-size: 0.88rem;
                line-height: 1.5;
                word-break: break-all;
                font-family: monospace;
            ">
                <span style="color: #666; font-size: 0.75rem; display: block; margin-bottom: 4px; letter-spacing: 1px;">[REPORT_LOG]</span>
                ${data.comment}
            </div>
            ` : ""}

            <div class="card-footer" style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;">
                <span>${data.category}</span>
            </div>
        </div>
    `;

    return card;
}

/*==================================================
STAFF DIRECTORY
==================================================*/
function renderStaffDirectory(page){
    cards.innerHTML = "";
    const groups = page.groups || [];
    const staffMap = page.staff || {};

    groups.forEach(group=>{
        const section = document.createElement("section");
        section.className = "staff-directory-section";

        const head = document.createElement("div");
        head.className = "staff-directory-heading";
        const groupStaff = staffMap[group.key] || [];
        head.innerHTML = `<div><span class="staff-kicker">FACILITY</span><h2>${group.title}</h2></div><div class="staff-count">총 ${group.count ?? groupStaff.length}명</div>`;
        section.appendChild(head);

        const grid = document.createElement("div");
        grid.className = "staff-card-grid";
        groupStaff.forEach((staff, idx)=>grid.appendChild(createStaffCard(staff, idx)));
        section.appendChild(grid);

        cards.appendChild(section);
    });
}

function createStaffCard(staff, index){
    const card = document.createElement("article");
    card.className = "staff-card";
    const image = staff.image
        ? `<img src="${staff.image}" alt="${staff.name}">`
        : `<div class="staff-image-placeholder"><span>NO IMAGE</span></div>`;
    card.innerHTML = `
        <div class="staff-photo">${image}</div>
        <div class="staff-card-body">
            <div class="staff-card-index">STAFF ${String(index+1).padStart(2,"0")}</div>
            <h3>${staff.name}</h3>
            <dl class="staff-meta">
                <div><dt>성별</dt><dd>${staff.gender}</dd></div>
                <div><dt>나이</dt><dd>${staff.age}</dd></div>
                <div><dt>직위</dt><dd>${staff.position}</dd></div>
                <div><dt>특징</dt><dd>${staff.feature}</dd></div>
            </dl>
        </div>
    `;
    return card;
}
