import SiteFooter from "./components/SiteFooter";
import Reveal from "./components/Reveal";
import SiteHeader from "./components/SiteHeader";

const testimonials = [
  {
    quote:
      "The medical camp organized in our area helped my family get checkups on time. The team was patient, respectful, and genuinely supportive.",
    name: "Ritika Sharma",
    role: "Community Member",
    org: "Andheri West",
    highlight: false,
  },
  {
    quote:
      "Their rescue response was incredibly fast. An injured street dog received treatment within hours and is now recovering safely.",
    name: "Arjun Mehta",
    role: "Volunteer",
    org: "Animal Rescue Wing",
    highlight: true,
  },
  {
    quote:
      "Education sessions at our school were practical and engaging. Students still discuss hygiene and environmental responsibility.",
    name: "Neha Deshpande",
    role: "School Coordinator",
    org: "Public School Program",
    highlight: false,
  },
  {
    quote:
      "Donation transparency is excellent. We can clearly see where funds are used, and the impact updates are frequent and detailed.",
    name: "Manav Shah",
    role: "Donor",
    org: "Monthly Support Circle",
    highlight: false,
  },
  {
    quote:
      "I joined as a weekend volunteer and found the system very organized. Everyone gets clear responsibilities and proper guidance.",
    name: "Pooja Nair",
    role: "Weekend Volunteer",
    org: "Join Us Program",
    highlight: true,
  },
  {
    quote:
      "The blood donation drive was managed professionally from registration to post-donation care. A very trustworthy initiative.",
    name: "Siddharth Rao",
    role: "Participant",
    org: "Health Outreach Camp",
    highlight: false,
  },
  {
    quote:
      "Our sub-branch coordination improved after partnering with this team. Their ground support during emergencies is dependable.",
    name: "Ayesha Khan",
    role: "Branch Lead",
    org: "Thane Sub Branch",
    highlight: false,
  },
  {
    quote:
      "Tree plantation events are not one-time photo opportunities here. They track maintenance and survival of planted saplings too.",
    name: "Rahul Patil",
    role: "Eco Volunteer",
    org: "Green Drive Initiative",
    highlight: true,
  },
  {
    quote:
      "The camp doctors explained everything in simple terms. It felt like care was designed around people, not paperwork.",
    name: "Kavya Iyer",
    role: "Beneficiary",
    org: "Medical Hub Outreach",
    highlight: false,
  },
  {
    quote:
      "Our children benefited from free awareness sessions. The examples were local and relatable, which made learning easy.",
    name: "Meenal Verma",
    role: "Parent Representative",
    org: "School Awareness Program",
    highlight: false,
  },
  {
    quote:
      "I recommended this platform to friends because it combines compassion with accountability. Every campaign has clear outcomes.",
    name: "Nitin Kulkarni",
    role: "Contributor",
    org: "Community Donor Network",
    highlight: true,
  },
  {
    quote:
      "From rescue transport to treatment follow-up, the workflow is smooth. The team communicates every important update quickly.",
    name: "Sana Qureshi",
    role: "Field Coordinator",
    org: "Pet Rescue Operations",
    highlight: false,
  },
];

function ReviewsPage() {
  return (
    <div className="page-shell reviews-page-shell">
      <SiteHeader />
      <main className="medical-hub-page reviews-page">
        <Reveal>
          <section className="reviews-hero">
          <p className="reviews-kicker">Testimonials</p>
          <h1>Thousands of supporters share the love.</h1>
          <p>
            Real stories from community members, volunteers, donors, and program
            partners who have experienced our impact.
          </p>
          </section>
        </Reveal>

        <section className="reviews-grid" aria-label="Community reviews">
          {testimonials.map((item, index) => (
            <Reveal key={`${item.name}-${index}`} delay={0.03 * (index % 8)}>
              <article className={`review-card ${item.highlight ? "highlight" : ""}`}>
                <span className="review-quote-mark" aria-hidden="true">
                  “
                </span>
                <p className="review-quote">{item.quote}</p>
                <p className="review-author">{item.name}</p>
                <p className="review-meta">
                  {item.role} - {item.org}
                </p>
              </article>
            </Reveal>
          ))}
        </section>
      </main>
      <div className="about-footer-flow">
        <SiteFooter />
      </div>
    </div>
  );
}

export default ReviewsPage;
