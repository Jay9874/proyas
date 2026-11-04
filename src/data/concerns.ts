// Concerns a parent can tick on the assessment form. The condition cards link to these by id.
export const CONCERN_OPTIONS = [
  { id: 'speech', value: 'Speech & Language Delay', label: 'Speech & Language Delay' },
  { id: 'autism', value: 'Autism Spectrum Disorder (ASD)', label: 'Autism Spectrum (ASD)' },
  { id: 'adhd', value: 'ADHD / Focus & Hyperactivity', label: 'ADHD / Focus Issues' },
  { id: 'sensory', value: 'Sensory Processing Issues', label: 'Sensory Issues' },
  { id: 'intellectual', value: 'Intellectual Disability', label: 'Intellectual Disability' },
  { id: 'cp', value: 'Cerebral Palsy', label: 'Cerebral Palsy' },
  { id: 'down', value: 'Down Syndrome', label: 'Down Syndrome' },
  { id: 'school', value: 'School Readiness & IEP', label: 'School Readiness' },
] as const;

export type ConcernId = (typeof CONCERN_OPTIONS)[number]['id'];
