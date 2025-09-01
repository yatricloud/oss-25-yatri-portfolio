import React from 'react';
import { motion } from 'framer-motion';

const ProjectSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
      {/* Header skeleton */}
      <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 p-6 flex items-center justify-between">
        <div className="bg-gray-400/50 backdrop-blur-sm w-20 h-6 rounded-full animate-pulse"></div>
        <div className="bg-gray-400/50 backdrop-blur-sm w-16 h-6 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-6">
          <div className="w-12 h-12 bg-gray-400/50 backdrop-blur-sm rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
        </div>
        
        {/* Technologies skeleton */}
        <div className="flex flex-wrap gap-2">
          <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-14 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        {/* Action buttons skeleton */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ProjectSkeleton />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectSkeleton;
