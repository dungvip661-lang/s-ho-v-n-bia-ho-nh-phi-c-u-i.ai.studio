import React, { useState } from 'react';
import { Scroll, Landmark, BookOpen, Image as ImageIcon, Camera } from 'lucide-react';
import { HeritageType } from '../types';

interface HeritageImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  type?: HeritageType;
  title?: string;
  monument?: string;
  character?: string;
  size?: 'thumb' | 'card' | 'detail';
}

export const HeritageImage: React.FC<HeritageImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  type = 'Văn bia',
  title = '',
  monument = '',
  character = '',
  size = 'card',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Traditional watermark glyph based on type
  const typeGlyph = type === 'Văn bia' ? '碑' : type === 'Hoành phi' ? '匾' : '聯';
  const typeAccentColor =
    type === 'Văn bia'
      ? 'from-[#42130F] via-[#2A0C0A] to-[#190605]'
      : type === 'Hoành phi'
      ? 'from-[#3D250C] via-[#241505] to-[#140C03]'
      : 'from-[#143024] via-[#0B1C15] to-[#06120D]';

  // If the image fails to load, render this beautiful heritage placeholder frame
  if (hasError || !src) {
    if (size === 'thumb') {
      return (
        <div
          className={`flex items-center justify-center bg-gradient-to-br ${typeAccentColor} text-amber-200 border border-amber-500/30 rounded-lg shrink-0 overflow-hidden relative select-none ${containerClassName}`}
          style={{ width: '48px', height: '40px' }}
          title={`${title} - ${monument}`}
        >
          <span className="font-hannom font-bold text-amber-300 text-lg opacity-80">{typeGlyph}</span>
        </div>
      );
    }

    if (size === 'detail') {
      return (
        <div
          className={`w-full h-80 sm:h-96 md:h-[420px] rounded-xl overflow-hidden bg-gradient-to-br ${typeAccentColor} border-2 border-amber-600/40 relative flex flex-col items-center justify-center p-6 text-center shadow-inner select-none ${containerClassName}`}
        >
          {/* Subtle background traditional pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

          {/* Large decorative watermark character */}
          <div className="absolute font-hannom text-[140px] text-amber-400/10 pointer-events-none select-none">
            {typeGlyph}
          </div>

          <div className="relative z-10 max-w-lg space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
              <Camera className="w-3.5 h-3.5" />
              <span>Ảnh Tư Liệu Hiện Vật Thực Địa</span>
            </div>

            <div className="font-hannom text-amber-300 text-2xl font-bold tracking-widest line-clamp-1 py-1">
              {character || typeGlyph}
            </div>

            <h3 className="font-serif-heritage text-lg sm:text-xl font-bold text-amber-100 line-clamp-2">
              {title || alt}
            </h3>

            {monument && (
              <p className="text-xs text-amber-200/80 font-medium">
                {monument}
              </p>
            )}

            <div className="pt-2 text-[11px] text-amber-300/60 font-mono">
              [ Bản dập & ảnh khảo sát thực địa A05 ]
            </div>
          </div>
        </div>
      );
    }

    // Default 'card' size for Grid cards
    return (
      <div
        className={`w-full aspect-[16/10] bg-gradient-to-br ${typeAccentColor} border-b border-amber-600/30 relative flex flex-col items-center justify-center p-4 text-center overflow-hidden select-none ${containerClassName}`}
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        {/* Large watermark character */}
        <div className="absolute font-hannom text-8xl text-amber-400/10 pointer-events-none select-none">
          {typeGlyph}
        </div>

        <div className="relative z-10 space-y-1.5 max-w-[90%]">
          <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-300 shadow-sm">
            <Landmark className="w-4 h-4" />
          </div>
          <div className="font-hannom text-amber-300 text-base font-bold tracking-wider line-clamp-1">
            {character ? character.slice(0, 8) : typeGlyph}
          </div>
          <div className="font-serif-heritage text-xs font-bold text-amber-100 line-clamp-1">
            {title || alt}
          </div>
          {monument && (
            <div className="text-[10px] text-amber-200/70 truncate">
              {monument}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Normal image render with fallback protection
  return (
    <div className={`relative w-full h-full overflow-hidden bg-stone-900 ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#2A0C0A] animate-pulse flex items-center justify-center text-amber-200/40">
          <Landmark className="w-6 h-6 animate-spin opacity-50" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        } ${className}`}
      />
    </div>
  );
};
