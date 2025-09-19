/**
 * Dynamic Favicon Generator
 * Creates favicons from images and text dynamically
 */

export interface FaviconOptions {
  imageUrl?: string;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  size?: number;
}

export class FaviconGenerator {
  private static readonly DEFAULT_SIZE = 32;
  private static readonly DEFAULT_BG_COLOR = '#3B82F6';
  private static readonly DEFAULT_TEXT_COLOR = '#FFFFFF';

  /**
   * Generate favicon from image URL
   */
  static async generateFromImage(imageUrl: string, size: number = this.DEFAULT_SIZE): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      canvas.width = size;
      canvas.height = size;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Draw image centered and scaled to fit
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = imageUrl;
    });
  }

  /**
   * Generate favicon from text
   */
  static generateFromText(
    text: string, 
    options: Partial<FaviconOptions> = {}
  ): string {
    const {
      backgroundColor = this.DEFAULT_BG_COLOR,
      textColor = this.DEFAULT_TEXT_COLOR,
      size = this.DEFAULT_SIZE
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    canvas.width = size;
    canvas.height = size;

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, size, size);

    // Set text properties
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Calculate font size based on canvas size and text length
    const fontSize = Math.min(size * 0.6, size / text.length * 2);
    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

    // Draw text
    ctx.fillText(text.toUpperCase(), size / 2, size / 2);

    return canvas.toDataURL('image/png');
  }

  /**
   * Generate favicon from image with text overlay
   */
  static async generateFromImageWithText(
    imageUrl: string,
    text: string,
    options: Partial<FaviconOptions> = {}
  ): Promise<string> {
    const {
      textColor = this.DEFAULT_TEXT_COLOR,
      size = this.DEFAULT_SIZE
    } = options;

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      canvas.width = size;
      canvas.height = size;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Draw image as background
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        // Add semi-transparent overlay for text readability
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, size, size);

        // Draw text
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const fontSize = Math.min(size * 0.4, size / text.length * 1.5);
        ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

        ctx.fillText(text.toUpperCase(), size / 2, size / 2);
        
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = imageUrl;
    });
  }

  /**
   * Set favicon on the page
   */
  static setFavicon(dataUrl: string): void {
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(link => link.remove());

    // Create new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = dataUrl;
    
    document.head.appendChild(link);

    // Also set apple-touch-icon for iOS
    const appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    appleLink.href = dataUrl;
    document.head.appendChild(appleLink);
  }

  /**
   * Generate and set favicon from profile data
   */
  static async generateFromProfile(profileData: {
    fullName?: string;
    avatarUrl?: string;
    theme?: string;
  }): Promise<void> {
    try {
      let faviconDataUrl: string;

      if (profileData.avatarUrl) {
        // Try to generate from avatar image first
        try {
          faviconDataUrl = await this.generateFromImage(profileData.avatarUrl);
        } catch (error) {
          console.warn('Failed to generate favicon from avatar, falling back to text:', error);
          // Fallback to text-based favicon
          const initials = this.getInitials(profileData.fullName || 'P');
          faviconDataUrl = this.generateFromText(initials, {
            backgroundColor: this.getThemeColor(profileData.theme)
          });
        }
      } else if (profileData.fullName) {
        // Generate from name initials
        const initials = this.getInitials(profileData.fullName);
        faviconDataUrl = this.generateFromText(initials, {
          backgroundColor: this.getThemeColor(profileData.theme)
        });
      } else {
        // Default favicon
        faviconDataUrl = this.generateFromText('P', {
          backgroundColor: this.DEFAULT_BG_COLOR
        });
      }

      this.setFavicon(faviconDataUrl);
    } catch (error) {
      console.error('Failed to generate favicon:', error);
    }
  }

  /**
   * Get initials from full name
   */
  private static getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  /**
   * Get theme color for favicon
   */
  private static getThemeColor(theme?: string): string {
    const themeColors: { [key: string]: string } = {
      blue: '#3B82F6',
      orange: '#F97316',
      green: '#10B981',
      purple: '#8B5CF6',
      rose: '#F43F5E'
    };

    return themeColors[theme || 'blue'] || this.DEFAULT_BG_COLOR;
  }
}
