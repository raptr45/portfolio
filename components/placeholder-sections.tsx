"use client";

import { ProjectModal } from "@/components/project-modal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { projects, type Project } from "@/lib/projects-data";
import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { ProjectCard } from "@/components/work/project-card";

export function AboutSection() {
  // Experience data rendered in a timeline while preserving the site's design language
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2020 - Present",
      summary:
        "Leading development of enterprise-level web applications, mentoring junior developers, and implementing best practices across multiple projects.",
      tech: ["Next.js", "TypeScript", "Node.js", "GraphQL", "AWS"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2017 - 2020",
      summary:
        "Developed and maintained multiple client projects, implemented CI/CD pipelines, and optimized application performance.",
      tech: ["React", "Express", "MongoDB", "Docker", "Firebase"],
    },
    {
      title: "Frontend Developer",
      company: "Creative Web Agency",
      period: "2015 - 2017",
      summary:
        "Created responsive and interactive user interfaces for various client websites and web applications.",
      tech: ["JavaScript", "HTML/CSS", "Angular", "SASS", "jQuery"],
    },
  ] as const;

  return (
    <section
      id="experience"
      className="py-32 bg-gradient-to-br from-background via-muted/20 to-background relative"
    >
      {/* subtle gradient blobs to match rest of site */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="secondary"
              className="mb-6 px-6 py-3 text-lg font-semibold bg-primary/10 text-primary border-2 border-primary/20"
            >
              ✨ Experience
            </Badge>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Work Experience
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
              My professional journey spanning over{" "}
              <span className="text-primary font-semibold">8+ years</span> in
              the industry.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* center line */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent rounded-full" />

          <div className="space-y-16 lg:space-y-24">
            {experiences.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className={`relative lg:flex lg:items-stretch ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* node dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-6">
                    <div className="w-3.5 h-3.5 rounded-full bg-primary ring-8 ring-primary/20 shadow-lg" />
                  </div>

                  {/* spacer to keep card away from center line */}
                  <div className="hidden lg:block w-1/2" />

                  {/* experience card */}
                  <Card className="w-full lg:w-[48%] group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 bg-card/80 backdrop-blur-sm pt-0 pb-6">
                    <CardContent className="p-6 md:p-8">
                      <div className="mb-1 text-sm text-muted-foreground">
                        {item.period}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {item.title}
                      </h3>
                      <div className="text-base md:text-lg font-semibold text-primary mt-1">
                        {item.company}
                      </div>

                      <p className="text-muted-foreground leading-relaxed mt-4">
                        {item.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-6">
                        {item.tech.map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="px-3 py-1 text-sm font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200 border-2"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProject, setLoadingProject] = useState<string | null>(null);

  const handleViewDetails = useCallback((project: Project) => {
    setLoadingProject(project.id);
    // Simulate loading for better UX
    setTimeout(() => {
      setSelectedProject(project);
      setIsModalOpen(true);
      setLoadingProject(null);
    }, 150);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  const { featuredProjects, regularProjects } = useMemo(
    () => ({
      featuredProjects: projects.filter((p) => p.featured),
      regularProjects: projects.filter((p) => !p.featured),
    }),
    []
  );

  return (
    <section
      id="work"
      className="py-32 relative overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background decorations to mirror YouTube section */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-red-500/10 to-pink-500/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="secondary"
              className="mb-6 px-6 py-3 text-lg font-semibold bg-primary/10 text-primary border-2 border-primary/20"
            >
              🚀 Portfolio
            </Badge>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              A showcase of projects I&apos;ve worked on, from{" "}
              <span className="text-primary font-semibold">concept</span> to
              <span className="text-green-600 font-semibold"> deployment</span>.
            </p>
          </motion.div>
        </div>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    project={project}
                    onViewDetails={handleViewDetails}
                    size="large"
                    featured
                    loading={loadingProject === project.id}
                  />
                </motion.div>
              ))}
            </div>
            <div className="mt-14 flex justify-center">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                href="#work-all" /* Placeholder anchor or external link */
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/40"
              >
                View All
                <span className="text-xl" aria-hidden>→</span>
              </motion.a>
            </div>
          </div>
        )}

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}

// ProjectCard moved to its own file in components/work/project-card.tsx
