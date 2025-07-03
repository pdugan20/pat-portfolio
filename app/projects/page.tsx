import Layout from '@/components/Layout';
import ProjectCard from '@/components/ProjectCard';
import { getAllProjects } from '@/lib/projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Pat Dugan',
  description:
    'A collection of my work, showcasing various technologies and solutions',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Layout>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-white'>
            Projects
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            A collection of my work, showcasing various technologies and
            solutions
          </p>
        </div>

        {projects.length === 0 ? (
          <div className='py-12 text-center'>
            <p className='text-gray-600 dark:text-gray-300'>
              No projects yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {projects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
