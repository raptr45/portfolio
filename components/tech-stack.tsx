"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { techStack } from "@/lib/tech-data";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export function TechStack() {
  return (
    <section
      id="skills"
      className="py-32 bg-gradient-to-br from-background via-muted/20 to-background"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
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
              🛠️ Skills
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-soft">
              Tech Stack
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Technologies and tools I work with to build{" "}
              <span className="text-primary font-semibold">
                modern applications
              </span>
            </p>
          </motion.div>
        </div>

        {/* Tech Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.map((category) => {
            const IconComponent = category.icon;

            return (
              <motion.div key={category.type} variants={itemVariants}>
                <Card className="h-full group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-4 text-2xl md:text-3xl">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <span className="text-balance font-bold text-foreground">
                        {category.type}
                      </span>
                    </CardTitle>
                    <Separator className="mt-4" />
                  </CardHeader>

                  <CardContent>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {category.tech.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          variants={badgeVariants}
                          custom={skillIndex}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            variant="outline"
                            className="px-4 py-2 text-base font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary/50 cursor-default transition-all duration-200 flex items-center gap-2 border-2"
                          >
                            {skill.icon && (
                              <Image
                                src={skill.icon || "/placeholder.svg"}
                                alt={`${skill.name} icon`}
                                width={20}
                                height={20}
                                className="object-contain"
                              />
                            )}
                            {skill.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
