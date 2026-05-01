import {
  SiPython, SiDjango, SiFlask, SiPostgresql, SiMysql, SiMongodb,
  SiSqlite, SiDocker, SiGit, SiGithub, SiLinux, SiSwagger,
  SiPostman, SiCplusplus, SiJsonwebtokens
} from 'react-icons/si';

export const skillGroups = [
  {
    label: 'Languages',
    skills: [
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
    ],
  },
  {
    label: 'Frameworks',
    skills: [
      { name: 'Django', Icon: SiDjango, color: '#092E20' },
      { name: 'DRF', Icon: SiDjango, color: '#A30000' },
      { name: 'Flask', Icon: SiFlask, color: '#000000' },
    ],
  },
  {
    label: 'Databases',
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      { name: 'SQLite', Icon: SiSqlite, color: '#003B57' },
    ],
  },
  {
    label: 'Tools & DevOps',
    skills: [
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#181717' },
      { name: 'Swagger', Icon: SiSwagger, color: '#85EA2D' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
      { name: 'JWT', Icon: SiJsonwebtokens, color: '#d63aff' },
    ],
  },
  {
    label: 'Systems',
    skills: [
      { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
    ],
  },
];
