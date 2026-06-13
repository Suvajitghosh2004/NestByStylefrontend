"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { analyticsApi } from "@/lib/api";

const LAST_UPDATED = "June 13, 2025";
const SITE_NAME = "NestByStyle";
const SITE_URL = "https://nestbystyle.vercel.app";
const CONTACT_EMAIL = "suvajitghosh1411@gmail.com"; // ← replace with your real email

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          Welcome to <strong>{SITE_NAME}</strong> ("{SITE_NAME}", "we", "our", or "us"). We operate
          the website located at <a href={SITE_URL} className="text-gold-500 hover:text-gold-600 underline underline-offset-2">{SITE_URL}</a> (the "Site").
        </p>
        <p>
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information
          when you visit our Site. Please read this policy carefully. If you disagree with its terms,
          please discontinue use of the Site.
        </p>
        <p>
          We reserve the right to make changes to this Privacy Policy at any time. We will notify you
          of any changes by updating the "Last Updated" date at the top of this page.
        </p>
      </>
    ),
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: (
      <>
        <p>We may collect the following categories of information:</p>
        <h4 className="font-semibold text-obsidian-900 mt-4 mb-2">a) Information You Provide Directly</h4>
        <ul>
          <li><strong>Contact form submissions</strong> — your name, email address, and message content when you contact us through our Site.</li>
        </ul>
        <h4 className="font-semibold text-obsidian-900 mt-4 mb-2">b) Information Collected Automatically</h4>
        <ul>
          <li><strong>Log data</strong> — IP address (anonymised/hashed), browser type, operating system, referring URLs, pages visited, and timestamps.</li>
          <li><strong>Device information</strong> — device type (mobile or desktop), screen resolution, and browser version.</li>
          <li><strong>Usage data</strong> — pages you view, products you click, and how long you spend on the Site.</li>
          <li><strong>Cookies and tracking technologies</strong> — as described in the Cookies section below.</li>
        </ul>
        <h4 className="font-semibold text-obsidian-900 mt-4 mb-2">c) Information from Third Parties</h4>
        <ul>
          <li><strong>Google AdSense</strong> — may collect data to serve personalised advertisements.</li>
          <li><strong>Amazon Associates</strong> — may track clicks and purchases made through our affiliate links.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "3. Cookies & Tracking Technologies",
    content: (
      <>
        <p>
          We and our third-party partners use cookies, web beacons, pixels, and similar tracking
          technologies to collect and store information when you visit our Site.
        </p>
        <h4 className="font-semibold text-obsidian-900 mt-4 mb-2">Types of cookies we use:</h4>
        <ul>
          <li>
            <strong>Essential cookies</strong> — necessary for the Site to function (e.g. admin session tokens).
            These cannot be disabled.
          </li>
          <li>
            <strong>Analytics cookies</strong> — we run a self-hosted analytics system that logs page
            views, product views, and button clicks using anonymised (hashed) IP addresses. No raw IP
            addresses are ever stored.
          </li>
          <li>
            <strong>Advertising cookies (Google AdSense)</strong> — Google uses cookies to serve ads
            based on your prior visits to our Site or other websites. You can opt out of personalised
            advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
              className="text-gold-500 hover:text-gold-600 underline underline-offset-2">
              Google Ads Settings
            </a>.
          </li>
          <li>
            <strong>Affiliate cookies (Amazon Associates)</strong> — when you click an Amazon link on
            our Site, Amazon places cookies on your browser to track purchases for commission purposes.
            Amazon's cookie lasts 24 hours from the time of click.
          </li>
        </ul>
        <p className="mt-4">
          You can control cookies through your browser settings. Note that disabling certain cookies
          may affect the functionality of this Site.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "4. How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Operate, maintain, and improve the Site.</li>
          <li>Respond to your enquiries and messages submitted through the contact form.</li>
          <li>Understand how visitors use the Site (page views, product interest, traffic sources).</li>
          <li>Display relevant advertisements through Google AdSense.</li>
          <li>Earn commissions through the Amazon Associates affiliate programme.</li>
          <li>Monitor and analyse usage trends to improve user experience.</li>
          <li>Detect and prevent fraudulent or abusive activity.</li>
          <li>Comply with applicable laws and legal obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "amazon-associates",
    title: "5. Amazon Associates Disclosure",
    content: (
      <>
        <p>
          <strong>{SITE_NAME} is a participant in the Amazon Associates Programme</strong>, an affiliate
          advertising programme designed to provide a means for sites to earn advertising fees by
          advertising and linking to Amazon.in and related Amazon sites.
        </p>
        <p>
          When you click on an Amazon product link on our Site and make a purchase, we may earn a
          small commission at <strong>no additional cost to you</strong>. The price you pay is exactly
          the same whether or not you use our affiliate link.
        </p>
        <p>
          We only recommend products we genuinely believe offer value. Our editorial opinions are
          never influenced by affiliate relationships.
        </p>
        <p>
          Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
        </p>
      </>
    ),
  },
  {
    id: "google-adsense",
    title: "6. Google AdSense",
    content: (
      <>
        <p>
          We use Google AdSense to display advertisements on our Site. Google, as a third-party
          vendor, uses cookies to serve ads based on your prior visits to our Site or other websites
          on the internet.
        </p>
        <p>
          Google's use of advertising cookies enables it and its partners to serve ads to our users
          based on their visit to our Site and/or other websites on the Internet.
        </p>
        <p>
          You may opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
            className="text-gold-500 hover:text-gold-600 underline underline-offset-2">
            www.google.com/settings/ads
          </a>{" "}
          or by visiting{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer"
            className="text-gold-500 hover:text-gold-600 underline underline-offset-2">
            www.aboutads.info/choices
          </a>.
        </p>
        <p>
          For more information on how Google uses data when you use our Site, please visit:{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer"
            className="text-gold-500 hover:text-gold-600 underline underline-offset-2">
            Google's Privacy & Terms
          </a>.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "7. Sharing Your Information",
    content: (
      <>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share
          information in the following limited circumstances:
        </p>
        <ul>
          <li>
            <strong>Service providers</strong> — third-party companies that help us operate the Site
            (e.g. hosting providers, database services). They are contractually obligated to protect
            your information.
          </li>
          <li>
            <strong>Advertising partners</strong> — Google AdSense and Amazon Associates, as described
            above, under their own privacy policies.
          </li>
          <li>
            <strong>Legal compliance</strong> — if required by law, court order, or governmental
            authority, we may disclose your information.
          </li>
          <li>
            <strong>Business transfers</strong> — in the event of a merger, acquisition, or sale of
            assets, your information may be transferred to the acquiring entity.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    content: (
      <>
        <p>
          We retain the data we collect for as long as necessary to fulfil the purposes described in
          this Privacy Policy:
        </p>
        <ul>
          <li><strong>Contact form messages</strong> — retained until we have responded and the matter is resolved, or up to 12 months.</li>
          <li><strong>Analytics data</strong> — anonymised page view and event data is retained for up to 12 months for trend analysis.</li>
          <li><strong>Admin session tokens</strong> — expire automatically after a fixed period of inactivity.</li>
        </ul>
        <p>
          You may request deletion of your data at any time by contacting us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-500 hover:text-gold-600 underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "9. Your Rights",
    content: (
      <>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Right to access</strong> — request a copy of the personal data we hold about you.</li>
          <li><strong>Right to rectification</strong> — request correction of inaccurate or incomplete data.</li>
          <li><strong>Right to erasure</strong> — request deletion of your personal data ("right to be forgotten").</li>
          <li><strong>Right to restrict processing</strong> — request that we limit how we use your data.</li>
          <li><strong>Right to object</strong> — object to our processing of your data for direct marketing or legitimate interests.</li>
          <li><strong>Right to data portability</strong> — request your data in a structured, machine-readable format.</li>
          <li><strong>Right to opt out of personalised ads</strong> — as described in the Cookies section above.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-500 hover:text-gold-600 underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>. We will respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "10. Children's Privacy",
    content: (
      <>
        <p>
          Our Site is not directed to children under the age of 13 (or 16 in the European Economic
          Area). We do not knowingly collect personal information from children. If you are a parent
          or guardian and believe your child has provided us with personal information, please contact
          us immediately at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-500 hover:text-gold-600 underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>{" "}
          and we will delete such information promptly.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "11. Security",
    content: (
      <>
        <p>
          We implement commercially reasonable technical and organisational measures to protect your
          information against unauthorised access, alteration, disclosure, or destruction. These
          include:
        </p>
        <ul>
          <li>HTTPS encryption for all data in transit.</li>
          <li>Hashed (anonymised) storage of IP addresses — raw IPs are never stored.</li>
          <li>JWT-based authentication with expiring tokens for admin access.</li>
          <li>MongoDB access controls restricting database access.</li>
        </ul>
        <p>
          However, no method of transmission over the internet or electronic storage is 100% secure.
          We cannot guarantee absolute security of your data.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "12. Third-Party Links",
    content: (
      <>
        <p>
          Our Site contains links to third-party websites, including Amazon product pages and social
          media platforms such as Pinterest. We are not responsible for the privacy practices of those
          websites. We encourage you to review the privacy policies of any third-party sites you visit.
        </p>
        <p>
          Specifically, Amazon's privacy policy can be found at{" "}
          <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200534380"
            target="_blank" rel="noopener noreferrer"
            className="text-gold-500 hover:text-gold-600 underline underline-offset-2">
            Amazon India Privacy Notice
          </a>.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "13. Changes to This Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices,
          technology, legal requirements, or other factors. When we do, we will update the
          "Last Updated" date at the top of this page.
        </p>
        <p>
          Your continued use of the Site after any changes to this Privacy Policy constitutes your
          acceptance of the updated policy. We encourage you to review this page periodically.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "14. Contact Us",
    content: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our
          data practices, please contact us:
        </p>
        <div className="mt-4 p-5 bg-cream-100 border border-cream-200 rounded-xl space-y-1">
          <p><strong className="text-obsidian-900">{SITE_NAME}</strong></p>
          <p>
            Website:{" "}
            <a href={SITE_URL} className="text-gold-500 hover:text-gold-600 underline underline-offset-2">
              {SITE_URL}
            </a>
          </p>
          <p>
            Email:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-500 hover:text-gold-600 underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  useEffect(() => {
    analyticsApi.pageView("/privacy-policy");
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-cream-200 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="text-xs font-medium tracking-widest uppercase text-gold-500 mb-4"
            >
              Legal
            </motion.p>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-display text-5xl md:text-6xl font-light text-obsidian-900 mb-5"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-sm text-obsidian-700/50"
            >
              Last updated: <span className="text-obsidian-700">{LAST_UPDATED}</span>
            </motion.p>
          </div>
        </section>

        {/* ── Content ──────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-16 items-start">

            {/* ── Sticky TOC (desktop) ─────────────────────────────────────── */}
            <aside className="hidden lg:block sticky top-28 self-start">
              <p className="text-xs font-medium tracking-widest uppercase text-obsidian-700/40 mb-4">
                Contents
              </p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-xs text-obsidian-700/50 hover:text-gold-500 py-1.5 transition-colors duration-200 leading-snug"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>

              {/* Back to top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-8 text-xs text-obsidian-700/30 hover:text-gold-500 transition-colors duration-200"
              >
                ↑ Back to top
              </button>
            </aside>

            {/* ── Sections ─────────────────────────────────────────────────── */}
            <div className="space-y-12">

              {/* Affiliate disclosure banner */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="p-5 bg-gold-400/8 border border-gold-400/20 rounded-2xl"
              >
                <p className="text-xs font-medium tracking-widest uppercase text-gold-600 mb-1">
                  Affiliate Disclosure
                </p>
                <p className="text-sm text-obsidian-700/70 leading-relaxed">
                  <strong className="text-obsidian-900">{SITE_NAME}</strong> participates in the Amazon Associates
                  Programme. We earn commissions from qualifying purchases made through links on this site —
                  at no extra cost to you.
                </p>
              </motion.div>

              {sections.map((section, i) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i * 0.3}
                  className="scroll-mt-28"
                >
                  <h2 className="font-display text-2xl md:text-3xl font-light text-obsidian-900 mb-5 pb-3 border-b border-cream-200">
                    {section.title}
                  </h2>
                  <div className="prose-custom space-y-4 text-sm text-obsidian-700/65 leading-relaxed
                    [&_p]:leading-relaxed
                    [&_ul]:space-y-2 [&_ul]:mt-3 [&_ul]:list-none
                    [&_li]:flex [&_li]:gap-2 [&_li]:items-start
                    [&_li]:before:content-['—'] [&_li]:before:text-gold-400 [&_li]:before:flex-shrink-0 [&_li]:before:mt-0.5
                    [&_strong]:text-obsidian-800 [&_strong]:font-medium
                    [&_a]:text-gold-500 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-gold-600">
                    {section.content}
                  </div>
                </motion.section>
              ))}

              {/* Footer note */}
              <div className="pt-8 border-t border-cream-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-obsidian-700/40">
                  © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
                </p>
                <div className="flex gap-6">
                  <Link href="/about" className="text-xs text-obsidian-700/40 hover:text-gold-500 transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-xs text-obsidian-700/40 hover:text-gold-500 transition-colors">
                    Contact
                  </Link>
                  <Link href="/" className="text-xs text-obsidian-700/40 hover:text-gold-500 transition-colors">
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}