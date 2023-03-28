interface Risk {
  domain_id: string;
  domain: string;
  subdomains: Subdomain[];
}

interface Subdomain {
  subdomain_id: string;
  subdomain: string;
}

interface Question {
  question_id: string;
  question: string;
  sdoh_domains: Risk[];
}