import { profile } from '../data/profile.js'

// Link to the resume file in /public, or '' when none is set.
export const resumeHref = profile.resume ? `${import.meta.env.BASE_URL}${profile.resume.replace(/^\//, '')}` : ''
