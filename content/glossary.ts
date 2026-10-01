export interface GlossaryTerm {
  term: string;
  explanation: string;
}

export const glossaryData: Record<string, GlossaryTerm> = {
  API: {
    term: "API",
    explanation: "A way for two software tools to talk to each other and share data automatically."
  },
  BaaS: {
    term: "BaaS",
    explanation: "Ready-made backend (database, login, file storage) so apps do not need a custom server from scratch."
  },
  CDN: {
    term: "CDN",
    explanation: "A network of servers worldwide that delivers your website quickly from the location nearest to each visitor."
  },
  "CI/CD": {
    term: "CI/CD",
    explanation: "Automatic testing and publishing of code every time a change is made."
  },
  CMS: {
    term: "CMS",
    explanation: "A tool that lets you edit website pages and blogs without writing code."
  },
  CRM: {
    term: "CRM",
    explanation: "Software that keeps all your leads, customers and follow-ups in one place."
  },
  DNS: {
    term: "DNS",
    explanation: "The internet's address book that connects your domain name to your website."
  },
  LLM: {
    term: "LLM",
    explanation: "An AI model, like the ones behind modern chatbots, that understands and writes human language."
  },
  OAuth: {
    term: "OAuth",
    explanation: "The secure 'Sign in with Google' style login that never shares your password."
  },
  PWA: {
    term: "PWA",
    explanation: "A website that can be installed on a phone like an app and works well on slow connections."
  },
  RAG: {
    term: "RAG",
    explanation: "An AI method where the bot first looks up facts in your own documents, then answers, so it stays accurate."
  },
  RLS: {
    term: "RLS",
    explanation: "A database safety rule that decides which rows each person is allowed to see or change."
  },
  SaaS: {
    term: "SaaS",
    explanation: "Software you pay for by subscription and use online, usually shared by many customers."
  },
  "SSL/TLS": {
    term: "SSL/TLS",
    explanation: "The encryption that gives your site the secure padlock and https."
  },
  UI: {
    term: "UI",
    explanation: "The screens, buttons and forms people see and tap."
  },
  n8n: {
    term: "n8n",
    explanation: "A tool that links your apps together so repetitive tasks run automatically."
  }
};
