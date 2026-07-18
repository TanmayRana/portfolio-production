import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "@/containers/admin/home/heroReducer";
import aboutReducer from "@/containers/admin/about/aboutReducer";
import contactReducer from "@/containers/admin/contact/contactReducer";
import resumeReducer from "@/containers/admin/resume/resumeReducer";
import projectsReducer from "@/containers/admin/projects/projectsReducer";
import certificationsReducer from "@/containers/admin/certifications/certificationsReducer";
import skillsReducer from "@/containers/admin/skills/skillsReducer";
import workExperienceReducer from "@/containers/admin/work-experience/workExperienceReducer";
import myExperienceReducer from "@/containers/admin/my-experience/myExperienceReducer";
import homeReducer from "@/containers/home/homeReducer";

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    about: aboutReducer,
    contact: contactReducer,
    resume: resumeReducer,
    projects: projectsReducer,
    certifications: certificationsReducer,
    skills: skillsReducer,
    workExperience: workExperienceReducer,
    myExperience: myExperienceReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
