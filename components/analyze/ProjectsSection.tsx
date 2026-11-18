"use client";

import { motion } from "framer-motion";
import { Code2, Layers } from "lucide-react";

interface Project {
  title: string;
  technologies: string[];
  description: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.14 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Projects Identified</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">High-impact projects from your portfolio</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <Layers size={16} />
          Project highlights
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <motion.div
            key={project.title}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-slate-900">{project.title}</h4>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Code2 size={18} />
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-600">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
