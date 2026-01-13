
export enum CourseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: string;
  description: string;
  status: CourseStatus;
}

export interface Student {
  id: string;
  name: string;
  fatherName: string;
  courseId: string;
  sessionYear: string;
  registrationNo: string;
  status: 'verified' | 'pending';
  photo?: string; // Base64 or URL
}

export interface Certificate {
  id: string;
  certificateNo: string;
  studentId: string;
  issueDate: string;
  type: 'certificate' | 'marksheet' | 'ntt';
  status: 'valid' | 'invalid';
  documentPhoto?: string; // Base64 image of the actual document
}

export interface ContactLead {
  id: string;
  name: string;
  mobile: string;
  message: string;
  date: string;
  status: 'new' | 'contacted';
  ip: string;
}

export interface VerificationLog {
  id: string;
  query: string;
  timestamp: string;
  ip: string;
  result: 'valid' | 'invalid';
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutUs: string;
  directorMessage: string;
  directorName: string;
  directorPhoto: string;
  instituteLogo?: string;
}
