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
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Services Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">
                My Services
              </p>
              <h2 className="text-4xl font-bold text-balance">
                Things I can do for my clients
              </h2>
              <p className="text-muted-foreground text-lg">
                I develop websites and applications depending on my
                client&apos;s specific instructions and requirements, ensuring a
                customized and responsive digital solution.
              </p>
            </div>

            {/* Milestones */}
            <div className="grid grid-cols-3 gap-6">
              {milestones.map(({ number, label, suffix }) => (
                <div key={label} className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {number}
                    {suffix}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <a href="mailto:abidalwassie@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Hire me
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#" download>
                  <Download className="mr-2 h-4 w-4" />
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
                className="group hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
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
