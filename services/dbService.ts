
import { Course, Student, Certificate, ContactLead, VerificationLog, SiteContent, CourseStatus } from '../types';

const STORAGE_KEYS = {
  COURSES: 'vk_courses',
  STUDENTS: 'vk_students',
  CERTIFICATES: 'vk_certificates',
  LEADS: 'vk_leads',
  LOGS: 'vk_logs',
  CONTENT: 'vk_content'
};

const initialCourses: Course[] = [
  { id: '1', name: 'ADCA (Advance Diploma)', duration: '12 Months', fees: '₹15,000', description: 'MS Office, DTP, Tally ERP 9, Internet.', status: CourseStatus.ACTIVE },
  { id: '2', name: 'DCA (Diploma in Computer Application)', duration: '6 Months', fees: '₹6,500', description: 'Fundamentals, MS Office, Internet, Basic Hardware.', status: CourseStatus.ACTIVE },
  { id: '3', name: 'Tally Prime & GST', duration: '3 Months', fees: '₹5,000', description: 'Accounting, Inventory, Taxation.', status: CourseStatus.ACTIVE },
  { id: '4', name: 'CCC (Course on Computer Concepts)', duration: '3 Months', fees: '₹3,500', description: 'Computer Basics, GUI Operating System, Spreadsheet, WWW & Web Browsers.', status: CourseStatus.ACTIVE }
];

const initialStudents: Student[] = [
  { id: 'S1', name: 'Rahul Joshi', fatherName: 'M.P. Joshi', courseId: '1', sessionYear: '2023-24', registrationNo: 'VKCI-2023-1001', status: 'verified' },
  { id: 'S2', name: 'Priya Sharma', fatherName: 'S.K. Sharma', courseId: '2', sessionYear: '2023-24', registrationNo: 'VKCI-2023-1002', status: 'verified' }
];

const initialCertificates: Certificate[] = [
  { id: 'C1', certificateNo: 'VKCI-2023-1001', studentId: 'S1', issueDate: '2023-10-12', type: 'certificate', status: 'valid' }
];

const initialContent: SiteContent = {
  heroTitle: "Transform Your Future with Professional Skills",
  heroSubtitle: "V.K Computer Institute provides industry-leading education in Computer Applications, Accounting, and Digital Literacy to build your professional career.",
  aboutUs: "V.K Computer Institute is a premier education center established to provide high-quality IT education.",
  directorMessage: "At V.K Computer Institute, our mission is to bridge the digital divide by providing affordable, high-quality computer education to students from all walks of life.",
  directorName: "Vishal Kumar",
  directorPhoto: "pages/photo_2026-01-12_08-20-26.jpg"
};

class DBService {
  private get<T,>(key: string, defaultValue: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  private set<T,>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Courses
  getCourses(): Course[] { return this.get(STORAGE_KEYS.COURSES, initialCourses); }
  saveCourse(course: Course) {
    const list = this.getCourses();
    const index = list.findIndex(c => c.id === course.id);
    if (index > -1) list[index] = course;
    else list.push({ ...course, id: Date.now().toString() });
    this.set(STORAGE_KEYS.COURSES, list);
  }

  // Students
  getStudents(): Student[] { return this.get(STORAGE_KEYS.STUDENTS, initialStudents); }
  saveStudent(student: Student) {
    const list = this.getStudents();
    list.push(student);
    this.set(STORAGE_KEYS.STUDENTS, list);
  }

  // Certificates
  getCertificates(): Certificate[] { return this.get(STORAGE_KEYS.CERTIFICATES, initialCertificates); }
  saveCertificate(cert: Certificate) {
    const list = this.getCertificates();
    list.push(cert);
    this.set(STORAGE_KEYS.CERTIFICATES, list);
  }
  
  // Verification
  verify(registrationNo: string): { student?: Student, cert?: Certificate } {
    const students = this.getStudents();
    const certs = this.getCertificates();
    
    const student = students.find(s => s.registrationNo === registrationNo);
    const cert = certs.find(c => c.certificateNo === registrationNo);
    
    // Log verification attempt
    const logs = this.getLogs();
    logs.unshift({
      id: Date.now().toString(),
      query: registrationNo,
      timestamp: new Date().toISOString(),
      ip: '127.0.0.1',
      result: (student || cert) ? 'valid' : 'invalid'
    });
    this.set(STORAGE_KEYS.LOGS, logs.slice(0, 100)); // Keep last 100

    return { student, cert };
  }

  // Logs
  getLogs(): VerificationLog[] { return this.get(STORAGE_KEYS.LOGS, []); }

  // Leads
  getLeads(): ContactLead[] { return this.get(STORAGE_KEYS.LEADS, []); }
  saveLead(lead: Omit<ContactLead, 'id' | 'date' | 'status' | 'ip'>) {
    const list = this.getLeads();
    list.unshift({
      ...lead,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'new',
      ip: '127.0.0.1'
    });
    this.set(STORAGE_KEYS.LEADS, list);
  }

  // Site Content
  getContent(): SiteContent { return this.get(STORAGE_KEYS.CONTENT, initialContent); }
  saveContent(content: SiteContent) { this.set(STORAGE_KEYS.CONTENT, content); }
}

export const db = new DBService();
