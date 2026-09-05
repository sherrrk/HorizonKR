window.historyDocument = {
    layout: "organization-overview",
    title: "조직 관계도",
    subtitle: "ZERO HORIZON / ORGANIZATION OVERVIEW",

    concepts: [
        {
            title: "괴이",
            en: "ENTITY",
            description: "인간의 상상력, 종교, 감정에서 탄생한 설명 불가능한 존재들. 유해한 존재도 있지만 인간에게 호의적인 존재도 다수 존재."
        },
        {
            title: "제0번",
            en: "THE ZERO",
            description: "최초의 괴이. (현재는 소멸) 스스로 괴이를 창조했다고 함. 먼 과거엔 지평선과 손을 잡고 양측의 공존에 협조했던 존재."
        }
    ],

    organizations: [
        {
            title: "제0의 지평선",
            en: "ZERO HORIZON",
            tone: "primary",
            logo: "img/logo.png",
            description: "약 2,000년 전 등장한 괴이와 인간의 평화 및 공존을 꾀하는 조직. 현재는 다소 변질되었으나, 본래는 최초의 괴이인 ‘제0번’과 함께 양측의 공존을 꾀하는 조직이었다. 현재는 위험 괴이의 격리를 목표로 하며 각국에 지부가 존재한다."
        },
        {
            title: "창세회",
            en: "GENESIS SOCIETY",
            logo: "img/goc_logo.png",
            description: "인간을 불완전하고 열등한 존재로 인식. 최초의 괴이인 ‘제0번’이 인간의 이 불완전함을 해소할 수 있다고 믿으며 ‘제0번’의 재림을 위해 수단 방법을 가리지 않는 광신도 집단이다. 대한민국에도 소수 존재하고 있다."
        }
    ],

    branch: {
        title: "한국지사",
        en: "KOREA BRANCH",
        groupLabel: "공식 소속팀",
        teams: [
            {
                title: "관찰팀",
                en: "OBSERVATION TEAM",
                description: "괴이의 관측, 정보 수집, 현상 기록 및 분석"
            },
            {
                title: "연구팀",
                en: "RESEARCH TEAM",
                description: "괴이에 대한 연구, 자료 분석, 기술 개발"
            },
            {
                title: "정화팀",
                en: "PURIFICATION TEAM",
                description: "괴이에 의한 오염 지역 정화, 피해 최소화, 사후 처리"
            },
            {
                title: "특수제압팀",
                en: "SPECIAL SUPPRESSION TEAM",
                description: "고위험 괴이 제압, 특수 작전 수행"
            }
        ],
        covertTeam: {
            title: "제액신장",
            en: "SPECIAL TEAM",
            label: "비공식 · 비밀 특수팀",
            logo: "img/jaeak_logo.png",
            description: "한국지부의 특수제압팀이 파견될 수 없는 특수한 경우, 혹은 이례적인 괴이 대응을 전담하는 현장 특수팀.",
            traits: [
                "국내 운영",
                "독립적 활동",
                "본사 직접 보고",
                "존재 비공개"
            ]
        }
    },

    majorFacilities: [
        { title: "젠트 임포리움" },
        { title: "화안 교도소" },
        { title: "청천빛 예배당" },
        { title: "한국지사 격리소" }
    ],

    operations: [
        {
            id: "gent",
            tabTitle: "젠트 임포리움",
            title: "젠트 임포리움",
            en: "GENT EMPORIUM",
            intro: [
                {
                    title: "개요",
                    paragraphs: [
                        "무명의 설립자가 지은 150년 역사의 백화점. 대한민국 서울 외곽에 위치해 있으며, 낮엔 평범한 백화점이지만 밤엔 괴이들이 출현함. 맞춤 신사복의 질이 좋아 고객들에게 사랑받고 있다."
                    ]
                },
                {
                    title: "설립 배경",
                    paragraphs: [
                        "한국지사 설립 후 한반도의 문화 일부를 흡수한 괴이들이 우후죽순 생겨났다. 한복, 갓을 쓴 괴이들이 다수 등장하였으며, 그 중 일부는 시대가 변함에 따라 신사복으로 외관을 변화하였다.",
                        "그들을 포함한 일부가 백화점이라는 명분 하에 마련된 격리소에 머물게 되었으며, 본사에서 마련한 특수한 방법 덕분에 밤 중에만 괴이들이 활동하는 비교적 안전한 격리소가 되었다.",
                        "때문에 교육받은 요원들이 아니라 담력이 좋은 일반인들을 특수 채용하여 관리 중이다."
                    ]
                }
            ],
            floors: [
                { floor:"B02", facility:"프리미엄 식품관", code:"PREMIUM FOOD HALL", purpose:"" },
                { floor:"B01", facility:"라이프스타일 편집숍", code:"LIFESTYLE SELECT SHOP", purpose:"" },
                { floor:"1F", facility:"뷰티 & 주얼리", code:"BEAUTY & JEWELRY", purpose:"" },
                { floor:"2F", facility:"여성 명품관", code:"WOMEN'S LUXURY", purpose:"" },
                { floor:"3F", facility:"여성복", code:"WOMEN'S FASHION", purpose:"" },
                { floor:"4F", facility:"슈즈 & 백", code:"SHOES & BAGS", purpose:"" },
                { floor:"5F", facility:"남성 명품관", code:"MEN'S LUXURY", purpose:"" },
                { floor:"6F", facility:"맞춤 남성복 전문관", code:"BESPOKE MENSWEAR", purpose:"" },
                { floor:"7F", facility:"컬쳐 센터", code:"CULTURE CENTER", purpose:"" },
                { floor:"8F", facility:"레스토랑 & 루프탑", code:"RESTAURANT & ROOFTOP", purpose:"" }
            ],
            ranks: [
                { type:"직급 체계", order:"점장 > 관리자 > 정직원 > 계약직" },
                { type:"점장 조건", order:"본사 파견 혹은 괴이화 된 인간 채용 필수" }
            ]
        },

        {
            id: "hwa",
            tabTitle: "화안 교도소",
            title: "화안 교도소",
            en: "HWAAN PRISON",
            intro: [
                {
                    title: "개요",
                    paragraphs: [
                        "80년 전부터 대한민국에 존재해온 형무소. 겉보기엔 형무소지만, 실은 괴이들을 가두어 두기 위한 시설. 대한민국에 존재하는 괴이 중에서도 질이 나쁘거나 유해한 존재들이 격리되어 있다."
                    ]
                },
                {
                    title: "설립 배경",
                    paragraphs: [
                        "일반적인 방법으로 격리가 불가능한 개체들이 발견되며, 이곳을 신설하였다. 형무소로 위장되어 있기에 폐쇄성이 높아 민간인의 눈에 띄지 않는다.",
                        "교도소장인 화야는 본사에서 직접 파견한 괴이로, 본 시설의 위험성을 잘 알고 있다."
                    ]
                }
            ],
            networkNote: "지하 1층부터 지하 12층은 존재하지 않음.",
            floors: [
                { floor:"1F", facility:"운동장", code:"YARD", purpose:"야외 운동 및 휴식 공간." },
                { floor:"1F", facility:"식당", code:"DINING HALL", purpose:"단체 배식 및 식사 공간." },
                { floor:"1F", facility:"교도소 공장", code:"PRISON FACTORY", purpose:"강제 노역(목공, 세탁 등) 현장." },
                { floor:"2F", facility:"독방", code:"SOLITARY CONFINEMENT", purpose:"고위험 재소자 격리실.", risk:"medium" },
                { floor:"3F", facility:"일반 사동", code:"GENERAL CELL BLOCK", purpose:"재소자 생활 공간." },
                { floor:"4F", facility:"간부 기숙사", code:"OFFICER QUARTERS", purpose:"숙식할 수 있는 공간." },
                { floor:"5F", facility:"소장실", code:"WARDEN'S OFFICE", purpose:"교도소장의 집무실과 숙소. 최상층." },
                { floor:"B13", facility:"최하층", code:"CLASSIFIED BLOCK", purpose:"최상급 기밀 죄수를 모아놓은 곳.", risk:"high" }
            ]
        },

        {
            id: "korea",
            tabTitle: "한국지사",
            title: "대한민국지부",
            en: "KOREA BRANCH / REGIONAL COMMAND",
            subtitle: "제0의 지평선 산하 지역 사령부",
            intro: [
                {
                    title: "개요",
                    paragraphs: [
                        "한국지부의 기원은 약 2,000년 전, 삼국시대 신라 초기(박혁거세 혹은 탈해이사금 재위기 추정)에 조직된 비밀 결사체로 거슬러 올라간다.",
                        "서기 1세기경(신라 초기)에 최초로 설립된 이래, 독자적인 형태의 초자연적 통제 체계를 유지해 왔으며, 본사(지평선) 시스템과의 완전한 통합을 거쳐 현재의 한국지부 형태로 재편되었다."
                    ]
                },
                {
                    title: "설립 배경",
                    paragraphs: [
                        "한반도 전역에 발현되던 재난 및 질병형 괴이 개체들의 활동을 억제하고 민간 사회의 붕괴를 막기 위해, 왕실 직속의 영능력자들과 초자연 현상 관측 학자들이 연합하여 지평선의 아시아권 초기 선발대와 접촉, 동맹을 맺은 것이 시초이다.",
                        "이 시기부터 한반도 내의 괴이들은 설화나 향가의 형태로만 각색되어 전해지도록 통제되었다. 현재는 민간 기업으로 위장 운영중."
                    ]
                }
            ],
            floors: [
                { floor:"B04", facility:"사원 숙소", code:"STAFF DORMITORY", purpose:"각 팀별 사원 숙소" },
                { floor:"B05", facility:"정화팀 사무실 및 식당", code:"PURIFICATION OFFICE", purpose:"정화팀 업무 및 직원 편의시설" },
                { floor:"B06", facility:"특수제압팀 훈련실 및 전용숙소", code:"SUPPRESSION QUARTERS", purpose:"특수제압팀 상시 대기 층" },
                { floor:"B07", facility:"관찰팀 사무실", code:"OBSERVATION OFFICE", purpose:"시설 모니터링 및 괴이 제보 관리" },
                { floor:"B08", facility:"연구소 및 휴게실", code:"RESEARCH LAB", purpose:"괴이 연구소 및 직원 휴게실" },
                { floor:"B09–10", facility:"분석실", code:"ANALYSIS SECTOR", purpose:"연구 대상 괴이 보호" },
                { floor:"B11", facility:"격리실", code:"CONTAINMENT", purpose:"오염 개체 격리소", risk:"medium" },
                { floor:"B12", facility:"심층 격리실", code:"DEEP CONTAINMENT", purpose:"고위험 괴이 격리소", risk:"high" },
                { floor:"B13", facility:"지부장실", code:"DIRECTOR OFFICE", purpose:"디코드 지부장 전용 층" },
                { floor:"B14", facility:"자료보관실", code:"ARCHIVE", purpose:"기록 및 자료 보존실" }
            ],
            departments: [
                { name:"특수제압팀", work:"시설 내외부의 괴이 제압 및 탈출 개체 회수" },
                { name:"관찰팀", work:"시설 모니터링 및 괴이 제보 관리" },
                { name:"연구팀", work:"괴이 및 오염 현상 연구" },
                { name:"정화팀", work:"오염 개체 정화 작업" }
            ],
            ranks: [
                { type:"임직원", order:"지부장 > 팀장 > 부팀장 > 사원" },
                { type:"격리 대상", order:"직급 체계 외 존재" }
            ]
        },

        {
            id: "chapel",
            tabTitle: "청천빛 예배당",
            title: "청천빛 예배당",
            en: "CHEONGCHEONBIT CHAPEL",
            restricted: true,
            intro: [
                {
                    title: "개요",
                    paragraphs: [
                        "본 시설은 원래 '젠트 임포리움'보다 먼저 신설된 제1호 괴이격리소였으나, 창세회와의 접전 끝에 파괴되었다. 이후 재건되었으나 모종의 이유로(사유는 Lv.5 이상 열람 가능) 현재는 폐쇄 시설이 되었다."
                    ]
                },
                {
                    title: "설립 배경",
                    paragraphs: [
                        "개요 참고. 현재는 ████ 의 ██로 사용중."
                    ]
                }
            ],
            floors: [
                { floor:"0F", facility:"폐쇄", code:"SEALED", purpose:"", risk:"high", closed:true },
                { floor:"B01", facility:"회의실", code:"MEETING ROOM", purpose:"" }
            ]
        }
    ]
};
