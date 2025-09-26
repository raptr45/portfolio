import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Mail } from "lucide-react";

const milestones = [
  { number: 5, label: "Years", suffix: "+" },
  { number: 60, label: "Projects", suffix: "+" },
  { number: 7, label: "Clients", suffix: "+" },
] as const;

const services = [
  {
    title: "Responsive UIs",
    description:
      "I offer responsive UIs, ensuring seamless user experiences across devices through innovative design, fluid layouts, and adaptability.",
  },
  {
    title: "Backend Development",
    description:
      "I mainly use Next.js with auth libraries with Auth.js or Auth0 with databases like Postgres, MongoDB, etc. I might use BaaS like Firebase or Supabase to build a production ready fullstack app in a short time. I deliver scalable and efficient server-side solutions with a focus on clean, maintainable code.",
  },
  {
    title: "Web Security Essentials",
    description:
      "I prioritize web security, implementing HTTPS, robust authentication, and protection against vulnerabilities. Proficient in securing user data, I follow best practices to ensure resilient and reliable web applications.",
  },
  {
    title: "Latest Tech",
    description:
      "I tend to use cutting-edge technologies in web development, staying at the forefront of industry advancements. From progressive frameworks to emerging tools, I ensure my work is innovative, efficient, and future-ready.",
  },
] as const;

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-32 bg-gradient-to-br from-muted/10 via-background to-primary/5"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Services Info */}
          <div className="space-y-10">
            <div className="space-y-6">
              <p className="text-lg font-bold text-primary uppercase tracking-widest">
                🚀 My Services
              </p>
              <h2 className="text-5xl md:text-6xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Things I can do for my clients
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                I develop websites and applications depending on my
                client&apos;s specific instructions and requirements, ensuring a
                <span className="text-primary font-semibold"> customized</span>{" "}
                and{" "}
                <span className="text-blue-600 font-semibold">responsive</span>{" "}
                digital solution.
              </p>
            </div>

            {/* Milestones */}
            <div className="grid grid-cols-3 gap-8">
              {milestones.map(({ number, label, suffix }) => (
                <div
                  key={label}
                  className="text-center space-y-3 p-4 rounded-xl bg-primary/5 border-2 border-primary/10"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {number}
                    {suffix}
                  </div>
                  <div className="text-lg text-foreground font-semibold">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="xl" className="text-xl font-semibold">
                <a href="mailto:abidalwassie@gmail.com">
                  <Mail className="mr-3 h-6 w-6" />
                  Hire me
                </a>
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
                className="text-xl font-semibold border-2 border-primary/30 hover:border-primary"
              >
                <a href="#" download>
                  <Download className="mr-3 h-6 w-6" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 bg-card/90 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all duration-200 border-2 border-primary/20 hover:border-primary text-lg font-semibold !text-foreground hover:!text-primary-foreground dark:!text-foreground"
                  >
                    Read more
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
