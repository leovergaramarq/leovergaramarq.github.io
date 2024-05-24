"use strict";

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
            title: "Heroku",
            level: "Good",
            icon: "./assets/icons/heroku.svg"
        },
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
            title: "Matlab",
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
