import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Image, Type, Download, Eye } from 'lucide-react';
import { useDynamicFavicon } from '../hooks/useDynamicFavicon';
import { useTheme } from '../contexts/ThemeContext';

interface FaviconCustomizerProps {
  className?: string;
}

const FaviconCustomizer: React.FC<FaviconCustomizerProps> = ({ className = '' }) => {
  const { generateFavicon } = useDynamicFavicon();
  const { colors } = useTheme();
  const [customText, setCustomText] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#3B82F6');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGenerateFromText = async () => {
    if (!customText.trim()) return;
    
    try {
      await generateFavicon({
        text: customText,
        backgroundColor,
        textColor
      });
    } catch (error) {
      console.error('Failed to generate favicon from text:', error);
    }
  };

  const handleGenerateFromImage = async () => {
    if (!customImageUrl.trim()) return;
    
    try {
      await generateFavicon({
        imageUrl: customImageUrl,
        text: customText || undefined,
        backgroundColor,
        textColor
      });
    } catch (error) {
      console.error('Failed to generate favicon from image:', error);
    }
  };

  const handlePreview = () => {
    if (customText) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      canvas.width = 32;
      canvas.height = 32;
      
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, 32, 32);
      
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 16px system-ui';
      
      ctx.fillText(customText.toUpperCase(), 16, 16);
      
      setPreviewUrl(canvas.toDataURL('image/png'));
    }
  };

  const presetColors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Rose', value: '#F43F5E' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Yellow', value: '#EAB308' }
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-10 h-10 ${colors.primaryBg} rounded-xl flex items-center justify-center`}>
          <Palette className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Favicon Customizer</h3>
          <p className="text-sm text-gray-600">Create custom favicons from text or images</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Text-based Favicon */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Type className="w-5 h-5 text-gray-500" />
            <h4 className="font-medium text-gray-900">Text-based Favicon</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text (1-2 characters)
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value.slice(0, 2))}
                placeholder="e.g., YC"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={2}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setBackgroundColor(color.value)}
                  className={`w-8 h-8 rounded-lg border-2 ${
                    backgroundColor === color.value ? 'border-gray-900' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="mt-2 w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex space-x-3">
            <motion.button
              onClick={handlePreview}
              disabled={!customText}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </motion.button>
            
            <motion.button
              onClick={handleGenerateFromText}
              disabled={!customText}
              className={`flex items-center space-x-2 px-4 py-2 ${colors.primaryBg} ${colors.primaryBgHover} text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              <span>Apply</span>
            </motion.button>
          </div>
        </div>

        {/* Image-based Favicon */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image className="w-5 h-5 text-gray-500" />
            <h4 className="font-medium text-gray-900">Image-based Favicon</h4>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <motion.button
            onClick={handleGenerateFromImage}
            disabled={!customImageUrl}
            className={`flex items-center space-x-2 px-4 py-2 ${colors.primaryBg} ${colors.primaryBgHover} text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image className="w-4 h-4" />
            <span>Generate from Image</span>
          </motion.button>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Preview</h4>
            <div className="flex items-center space-x-4">
              <img
                src={previewUrl}
                alt="Favicon preview"
                className="w-8 h-8 rounded"
              />
              <span className="text-sm text-gray-600">32x32 pixels</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaviconCustomizer;
