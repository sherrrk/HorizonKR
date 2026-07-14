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

const navButtons = document.querySelectorAll(".nav-btn");

const searchInput = document.querySelector("#searchInput");

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


// 카드 영역 비우기

cards.innerHTML="";


const list = page.records || [];


// 청천빛 예배당 잠금
if(currentSection === "chapel"){
    cards.innerHTML = `
    <div class="access-denied-wrapper">
        <div class="clearance-lock">
            <span class="warning-icon">⚠️</span>
            <div class="warning-title">ACCESS DENIED</div>
            <div class="warning-text">본 시설 데이터는 레벨 5 이상만 열람 가능합니다.</div>
        </div>
    </div>
    `;
    return;
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
        entityTitle.innerHTML = `<h2>ENTITY LIST</h2>`;
        cards.appendChild(entityTitle);

        entities.forEach(item => {
            cards.appendChild(createCard(item));
        });
    }
}
// 문서형 페이지

if(page.document){

    openDocument({
        file:page.document
    });

}


// 데이터 없음

if(
    list.length===0 &&
    !page.document &&
    currentSection !== "chapel"
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
            subtitle.textContent="본 시설은 현재 폐쇄됨 (사유: ███ ██ ██)";
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

        const response = await fetch(data.file);

        if(!response.ok){

            throw new Error(response.status);

        }

        const doc = await response.json();

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