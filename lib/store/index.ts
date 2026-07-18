import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "./heroSlice";
import aboutReducer from "./aboutSlice";
import contactReducer from "./contactSlice";
import resumeReducer from "./resumeSlice";
import projectsReducer from "./projectsSlice";
import certificationsReducer from "./certificationsSlice";
import skillsReducer from "./skillsSlice";
import workExperienceReducer from "./workExperienceSlice";
import myExperienceReducer from "./myExperienceSlice";

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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./heroSlice";
export * from "./aboutSlice";
export * from "./contactSlice";
export * from "./resumeSlice";
export * from "./projectsSlice";
export * from "./certificationsSlice";
export * from "./skillsSlice";
export * from "./workExperienceSlice";
export * from "./myExperienceSlice";
