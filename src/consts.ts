import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Vinay Manala",
  DESCRIPTION:
    "A personal blog about software development, technology, and life.",
  EMAIL: "vinaymworks@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "A personal blog about software development, technology, and life.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Thoughts, stories and ideas.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my work, including open source contributions and personal projects.",
};

export const ABOUT: Metadata = {
  TITLE: "About",
  DESCRIPTION: "Learn more about me and my journey as a software developer.",
};

export const SOCIALS: Socials = [
  {
    NAME: "BlueSky",
    HREF: "https://bsky.app/profile/vinyman.bsky.social",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/vinaymanala",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://linkedin.com/in/vinaymanala",
  },
];
