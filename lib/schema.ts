import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "next-auth/adapters";
import { v4 as uuidv4 } from "uuid";

// 1. Home Page (Hero)
export const heroTable = sqliteTable("hero", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  heroDescription: text("hero_description").notNull(),
  videoUrl: text("video_url"),
  imageUrl: text("image_url"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type Hero = typeof heroTable.$inferSelect;
export type NewHero = typeof heroTable.$inferInsert;

// 2. About Page
export const aboutTable = sqliteTable("about", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  aboutDescription: text("about_description").notNull(),
  imageUrl: text("image_url").references(() => heroTable.imageUrl),
  signature: text("signature"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type About = typeof aboutTable.$inferSelect;
export type NewAbout = typeof aboutTable.$inferInsert;

// 3. My Experience
export const myExperienceTable = sqliteTable("my_experience", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  title: text("title").notNull(),
  body: text("body").notNull(),
  showIdeaMessage: integer("show_idea_message", { mode: "boolean" }).default(false),
  order: integer("order").default(0),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type MyExperience = typeof myExperienceTable.$inferSelect;
export type NewMyExperience = typeof myExperienceTable.$inferInsert;

// 4. Work Experience
export const workExperienceTable = sqliteTable("work_experience", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  companyName: text("company_name").notNull(),
  position: text("position").notNull(),
  location: text("location").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"), // null means 'Present'
  description: text("description", { mode: 'json' }).$type<string[]>().notNull(), // JSON array
  keyAchievements: text("key_achievements", { mode: 'json' }).$type<string[]>().notNull(), // JSON array
  technologies: text("technologies", { mode: 'json' }).$type<string[]>().notNull(), // JSON array
  publishedStatus: text("published_status", { enum: ['Published', 'Draft'] }).default('Draft').notNull(),
  order: integer("order").default(0),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type WorkExperience = typeof workExperienceTable.$inferSelect;
export type NewWorkExperience = typeof workExperienceTable.$inferInsert;

// 5. Skills
export const skillCategoryTable = sqliteTable("skill_category", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  icon: text("icon").notNull(), // emoji or URL
  order: integer("order").default(0),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type SkillCategory = typeof skillCategoryTable.$inferSelect;
export type NewSkillCategory = typeof skillCategoryTable.$inferInsert;

export const skillTable = sqliteTable("skill", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  categoryId: text("category_id").notNull().references(() => skillCategoryTable.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  level: integer("level").notNull(), // 0-100
  order: integer("order").default(0),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type Skill = typeof skillTable.$inferSelect;
export type NewSkill = typeof skillTable.$inferInsert;

// 6. Projects
export const projectTable = sqliteTable("project", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  technologies: text("technologies", { mode: 'json' }).$type<string[]>().notNull(), // JSON array
  order: integer("order").default(0),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type Project = typeof projectTable.$inferSelect;
export type NewProject = typeof projectTable.$inferInsert;

// 7. Certifications
export const certificationTable = sqliteTable("certification", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  date: text("date").notNull(),
  verificationLink: text("verification_link"),
  description: text("description"),
  imageUrl: text("image_url"),
  order: integer("order").default(0),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type Certification = typeof certificationTable.$inferSelect;
export type NewCertification = typeof certificationTable.$inferInsert;

// 8. Contact
export const contactTable = sqliteTable("contact", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location"),
  github: text("github"),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
  website: text("website"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type Contact = typeof contactTable.$inferSelect;
export type NewContact = typeof contactTable.$inferInsert;

// 9. Resume
export const resumeTable = sqliteTable("resume", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  fileUrl: text("file_url").notNull(),
  fileName: text("file_name"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type Resume = typeof resumeTable.$inferSelect;
export type NewResume = typeof resumeTable.$inferInsert;

// --- NextAuth Tables ---
export const usersTable = sqliteTable("user", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const accountsTable = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
);

export const sessionsTable = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokensTable = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
