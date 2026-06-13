import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function GraphicWrapper({
  children,
  filename = 'graphics-studio',
  width = 1080,
  height = 1080,
  className = '',
}) {
  const ref = useRef(null);

  const handleDownload = useCallback(async () => {
    if (!ref.current) return;

    try {
      const dataUrl = await toPng(ref.current, {
        width,
        height,
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: `${width}px`,
          height: `${height}px`,
        },
      });

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Graphic downloaded!');
    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Failed to export graphic');
    }
  }, [filename, width, height]);

  // Scale to fit available space — max 520px wide for portrait, taller allowed
  const maxW = 520;
  const maxH = 780;
  const scale = Math.min(maxW / width, maxH / height);

  return (
    <div className="space-y-4">
      {/* Preview container */}
      <div
        className="relative mx-auto overflow-hidden rounded-xl border border-border/50 shadow-2xl shadow-black/30"
        style={{ width: width * scale, height: height * scale }}
      >
        <div
          ref={ref}
          className={`graphic-card ${className}`}
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>

      {/* Download button */}
      <div className="flex justify-center">
        <Button onClick={handleDownload} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Download className="h-4 w-4" />
          Download PNG
        </Button>
      </div>
    </div>
  );
}
