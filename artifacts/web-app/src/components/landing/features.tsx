import {
  Image,
  VideoCamera,
  Hash,
  Lightning,
  CalendarBlank,
  Brain,
} from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    icon: Image,
    title: "AI Product Photos",
    description:
      "Generate studio-quality product images from a text description. 50+ visual styles, background removal, lifestyle scene composition — all without a photographer.",
  },
  {
    icon: VideoCamera,
    title: "Video Ad Scripts",
    description:
      "GPT-4.1 writes scroll-stopping video scripts tailored to your brand voice and target audience. Ready for TikTok, Reels, and YouTube Shorts.",
  },
  {
    icon: Hash,
    title: "Captions & Hashtags",
    description:
      "Platform-optimised captions and hashtag sets for Instagram, TikTok, and YouTube — generated in seconds, tuned to your tone.",
  },
  {
    icon: Lightning,
    title: "Auto-Publish",
    description:
      "Connect your social accounts once. Schedule posts and publish directly from the dashboard without switching between apps.",
  },
  {
    icon: CalendarBlank,
    title: "Content Calendar",
    description:
      "AI plans your posting schedule for maximum reach. See an entire week of content at a glance, drag to reschedule.",
  },
  {
    icon: Brain,
    title: "Brand Knowledge Base",
    description:
      "Tell the AI about your business once. Products, tone, audience, colours — every piece of content stays on-brand, automatically.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-24 px-4 border-t"
      style={{ borderColor: "oklch(1 0 0 / 8%)" }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 uppercase tracking-widest">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything in one pipeline
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            From AI-generated visuals to auto-published posts — the full content
            workflow, automated. No agencies. No designers. No scheduling apps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border p-6 transition-all hover:border-primary/40"
              style={{
                borderColor: "oklch(1 0 0 / 10%)",
                background: "oklch(0.105 0 0)",
              }}
            >
              <div
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border"
                style={{
                  borderColor: "oklch(0.696 0.17 162.48 / 0.25)",
                  background: "oklch(0.696 0.17 162.48 / 0.1)",
                }}
              >
                <feature.icon
                  weight="duotone"
                  className="h-5 w-5 text-primary"
                />
              </div>
              <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
