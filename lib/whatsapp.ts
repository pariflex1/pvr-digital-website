import { siteConfig } from "@/content/site";

export interface WhatsAppLinkOptions {
  serviceTitle?: string;
  pagePath?: string;
  customMessage?: string;
}

export function getWhatsAppUrl(options: WhatsAppLinkOptions = {}): string {
  const number = siteConfig.whatsappNumberIntl.replace(/[^0-9]/g, "");
  
  let message = "";
  if (options.customMessage) {
    message = options.customMessage;
  } else if (options.serviceTitle) {
    message = `Hi, I am interested in ${options.serviceTitle}. I found you at ${options.pagePath || siteConfig.domain}.`;
  } else {
    message = `Hi, I want to discuss a project. I found you at ${options.pagePath || siteConfig.domain}.`;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}
