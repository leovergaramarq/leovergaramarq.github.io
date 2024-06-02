"use strict";

export const education = [
    {
        degree: "Systems and Computer Engineering",
        on: "Universidad del Norte",
        period: ["Jan 2019", "Nov 2023"],
        details: ["GPA: 4.1/5.0", "Distinguished student"],
        progress: [10, 10],
        img: "./assets/img/about/uninorte.png"
    }
];

export const experience = [
    {
        title: "Online Tutor",
        company: "LatinHire",
        period: ["Dec 2022", "Current"],
        location: "Remote",
        description:
            "Online tutor, providing remote teaching services in English to U.S. clients, with an emphasis on mathematics and computer science.",
        img: "./assets/img/about/latinhire.png"
    },
    {
        title: "IT Research and Development Assistant",
        company: "Universidad del Norte",
        period: ["Apr 2023", "Apr 2024"],
        location: "Barranquilla, Colombia",
        description:
            "Software developer in data quality projects for data refinement and integration. Additionally, worked on migration of the organization’s software developments to GitHub.",
        img: "./assets/img/about/uninorte.png"
    },
    {
        title: "Full-Stack Developer",
        company: "Eyeland - EPICS in IEEE",
        period: ["Jan 2023", "Nov 2023"],
        location: "Barranquilla, Colombia",
        description:
            "Full-Stack developer in inclusive English learning solution for visually impaired people. I participated in research, solution design, cloud storage, web and mobile development.",
        img: "./assets/img/about/epics-in-ieee.png"
    }
];

const SKILLS_LANG = "skills-lang";
const SKILLS_WEB = "skills-web";
const SKILLS_DB = "skills-db";
const SKILLS_MOB = "skills-mob";
const SKILLS_DEVOPS = "skills-devops";
const SKILLS_OTHER = "skills-other";

export const categories = [
    {
        title: "Programming Languages",
        htmlFor: SKILLS_LANG
    },
    {
        title: "Web",
        htmlFor: SKILLS_WEB
    },
    {
        title: "Database Management",
        htmlFor: SKILLS_DB
    },
    {
        title: "Mobile",
        htmlFor: SKILLS_MOB
    },
    {
        title: "DevOps",
        htmlFor: SKILLS_DEVOPS
    },
    {
        title: "Other",
        htmlFor: SKILLS_OTHER
    }
];

export const skills = {
    [SKILLS_LANG]: [
        {
            title: "Javascript",
            level: "Good",
            icon: "./assets/icons/js.svg"
        },
        {
            title: "Typescript",
            level: "Good",
            icon: "./assets/icons/ts.svg"
        },
        {
            title: "Python",
            level: "Good",
            icon: "./assets/icons/python.svg"
        },
        {
            title: "Java",
            level: "Good",
            icon: "./assets/icons/java.svg"
        },
        {
            title: "PL/SQL",
            level: "Good",
            icon: "./assets/icons/plsql.svg"
        },
        {
            title: "Dart",
            level: "Medium",
            icon: "./assets/icons/dart.svg"
        },
        {
            title: "C#",
            level: "Medium",
            icon: "./assets/icons/c-sharp.svg"
        }
    ],
    [SKILLS_WEB]: [
        {
            title: "ReactJS",
            level: "Good",
            icon: "./assets/icons/react.svg"
        },
        {
            title: "Angular",
            level: "Medium",
            icon: "./assets/icons/angular.svg"
        },
        {
            title: "HTML",
            level: "Good",
            icon: "./assets/icons/html.svg"
        },
        {
            title: "CSS",
            level: "Good",
            icon: "./assets/icons/css.svg"
        },
        {
            title: "Sass",
            level: "Good",
            icon: "./assets/icons/sass.svg"
        },
        {
            title: "Bootstrap",
            level: "Medium",
            icon: "./assets/icons/bootstrap.svg"
        },
        {
            title: "Tailwind CSS",
            level: "Good",
            icon: "./assets/icons/tailwind-css.svg"
        },
        {
            title: "Node.js",
            level: "Good",
            icon: "./assets/icons/node.svg"
        },
        {
            title: "Express.js",
            level: "Good",
            icon: "./assets/icons/express-js.svg"
        },
        {
            title: "Flask",
            level: "Basic",
            icon: "./assets/icons/flask.svg"
        }
    ],
    [SKILLS_MOB]: [
        {
            title: "Flutter",
            level: "Medium",
            icon: "./assets/icons/flutter.svg"
        }
    ],
    [SKILLS_DB]: [
        {
            title: "Oracle Database",
            level: "Good",
            icon: "./assets/icons/oracle-database.svg"
        },
        {
            title: "MySQL",
            level: "Good",
            icon: "./assets/icons/mysql.svg"
        },
        {
            title: "PostgreSQL",
            level: "Good",
            icon: "./assets/icons/postgresql.svg"
        },
        {
            title: "SQL Server",
            level: "Medium",
            icon: "./assets/icons/sql-server.svg"
        },
        {
            title: "MongoDB",
            level: "Medium",
            icon: "./assets/icons/mongodb.svg"
        }
    ],
    [SKILLS_DEVOPS]: [
        {
            title: "Docker",
            level: "Good",
            icon: "./assets/icons/docker.svg"
        },
        {
            title: "Git",
            level: "Good",
            icon: "./assets/icons/git.svg"
        }
    ],
    [SKILLS_OTHER]: [
        {
            title: "MATLAB",
            level: "Medium",
            icon: "./assets/icons/matlab.svg"
        },
        {
            title: ".NET",
            level: "Basic",
            icon: "./assets/icons/dotnet.svg"
        },
        {
            title: "Processing",
            level: "Basic",
            icon: "./assets/icons/processing.svg"
        },
        {
            title: "Figma",
            level: "Medium",
            icon: "./assets/icons/figma.svg"
        }
    ]
};
