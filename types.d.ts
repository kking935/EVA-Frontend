// interface Risk {
//   domain_id: string;
//   domain: string;
//   subdomains: Subdomain[];
// }

// interface Subdomain {
//   subdomain_id: string;
//   subdomain: string;
// }

// interface Question {
//   question_id: string;
//   question: string;
//   sdoh_domains: Risk[];
// }

interface SublabelModel {
  slid: string;
  sublabel: string;
}

interface LabelsModel {
  lid: string;
  label: string;
  sublabels: SublabelModel[];
}

interface QuestionsModel {
  qid: string;
  question: string;
  labels?: LabelsModel[];
}

interface EntryModel {
  qid: string;
  question: string;
  answer: string;
}

interface AnswerModel {
  sid: string;
  qid: string;
  question: string;
  answer: string;
}

interface SurveyQuestion {
  qid: string;
  question: string;
  labels?: LabelsModel[] | null;
  answer?: string | null;
  risk_factors?: Record<string, string[]> | null;
}

interface SurveyModel {
  sid: string;
  survey: Record<string, SurveyQuestion>;
  cur_qid: string;
}

interface Message {
  role: string;
  content: string;
}

interface ReportsModel {
  created_at: string;
  rid: string;
  survey: Record<string, SurveyQuestion>;
  messages?: Message[] | null;
  overall_risk_factors: Record<string, string[]>;
  summary: string | null;
  date: string;
  verified?: boolean
}

interface UsersModel {
  uid?: string | null;
  fname: string;
  lname: string;
  rids?: string[] | null;
  sids?: string[] | null;
}
