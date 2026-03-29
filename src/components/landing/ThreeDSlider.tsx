import React, { useState, useEffect, useCallback, useRef, CSSProperties } from 'react';

export interface SliderItemData {
    title: string;
    num: string;
    imageUrl: string;
    data?: any;
}

interface ThreeDSliderProps {
    items: SliderItemData[];
    speedWheel?: number;
    speedDrag?: number;
    containerStyle?: CSSProperties;
    onItemClick?: (item: SliderItemData, index: number) => void;
}

interface SliderItemProps {
    item: SliderItemData;
    index: number;
    onClick: () => void;
}

const SliderItem = React.forwardRef<HTMLDivElement, SliderItemProps>(({ item, onClick }, ref) => {
    return (
        <div
            ref={ref}
            className="absolute top-1/2 left-1/2 cursor-pointer select-none rounded-xl
                shadow-2xl bg-black pointer-events-auto overflow-hidden will-change-transform"
            style={{
                width: 'clamp(220px, 60vw, 320px)',
                height: 'clamp(320px, 80vw, 440px)',
                marginTop: 'calc(clamp(320px, 80vw, 440px) / -2)',
                marginLeft: 'calc(clamp(220px, 60vw, 320px) / -2)',
                transformOrigin: '0% 100%',
                transition: 'none',
            }}
            onClick={onClick}
        >
            <div
                className="slider-item-content absolute inset-0 z-10 will-change-[opacity]"
                style={{ opacity: 1 }}
            >
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent via-50% to-black/50" />
                <div className="absolute z-10 text-white bottom-5 left-5 text-[clamp(20px,3vw,30px)] drop-shadow-md font-heading font-black">
                    {item.title}
                </div>
                <div className="absolute z-10 text-white top-2.5 left-5 text-[clamp(20px,10vw,80px)] font-heading font-black opacity-80">
                    {item.num}
                </div>
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </div>
    );
});

SliderItem.displayName = 'SliderItem';

const ThreeDSlider: React.FC<ThreeDSliderProps> = ({
    items,
    speedWheel = 0.05,
    speedDrag = -0.15,
    containerStyle = {},
    onItemClick,
}) => {
    const progressRef = useRef(50);
    const targetProgressRef = useRef(50);
    const isDownRef = useRef(false);
    const startXRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cacheRef = useRef<Record<number, { transform: string; zIndex: string; opacity: string }>>({});

    const numItems = items.length;

    const update = useCallback(() => {
        if (!itemRefs.current.length) return;

        progressRef.current += (targetProgressRef.current - progressRef.current) * 0.1;
        const progress = progressRef.current;
        const clamped = Math.max(0, Math.min(progress, 100));
        const activeFloat = (clamped / 100) * (numItems - 1);

        itemRefs.current.forEach((el, index) => {
            if (!el) return;

            const denominator = numItems > 1 ? numItems - 1 : 1;
            const ratio = (index - activeFloat) / denominator;
            const tx = ratio * 800;
            const ty = ratio * 200;
            const rot = ratio * 120;
            const dist = Math.abs(index - activeFloat);
            const z = numItems - dist;
            const opacity = (z / numItems) * 3 - 2;

            const newTransform = `translate3d(${tx}%, ${ty}%, 0) rotate(${rot}deg)`;
            const newZIndex = Math.round(z * 10).toString();
            const newOpacity = Math.max(0, Math.min(1, opacity)).toString();

            if (!cacheRef.current[index]) {
                cacheRef.current[index] = { transform: '', zIndex: '', opacity: '' };
            }
            const cache = cacheRef.current[index];

            if (cache.transform !== newTransform) {
                el.style.transform = newTransform;
                cache.transform = newTransform;
            }
            if (cache.zIndex !== newZIndex) {
                el.style.zIndex = newZIndex;
                cache.zIndex = newZIndex;
            }

            const inner = el.querySelector('.slider-item-content') as HTMLElement;
            if (inner && cache.opacity !== newOpacity) {
                inner.style.opacity = newOpacity;
                cache.opacity = newOpacity;
            }
        });
    }, [numItems]);

    useEffect(() => {
        let active = true;
        const loop = () => {
            if (active) {
                update();
                rafRef.current = requestAnimationFrame(loop);
            }
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => {
            active = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [update]);

    // Enhanced: Allow vertical scroll on the page to control the carousel when in view
    const handleWheel = useCallback((e: WheelEvent) => {
        // Only trigger if the slider is in view
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;
        // Only trigger if the mouse is over the slider or the section is in view
        const wheelProgress = e.deltaY * speedWheel;
        const current = targetProgressRef.current;
        const next = current + wheelProgress;
        if ((next < 0 && e.deltaY < 0) || (next > 100 && e.deltaY > 0)) return;
        e.preventDefault();
        targetProgressRef.current = Math.max(0, Math.min(100, next));
    }, [speedWheel]);

    const getClientX = (e: MouseEvent | TouchEvent) => {
        if ('touches' in e) return e.touches[0].clientX;
        return (e as MouseEvent).clientX;
    };

    const handleMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
        isDownRef.current = true;
        const x = getClientX(e);
        if (x !== undefined) startXRef.current = x;
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDownRef.current) return;
        const x = getClientX(e);
        if (x === undefined) return;
        const diff = (x - startXRef.current) * speedDrag;
        const current = targetProgressRef.current;
        targetProgressRef.current = Math.max(0, Math.min(100, current + diff));
        startXRef.current = x;
    }, [speedDrag]);

    const handleMouseUp = useCallback(() => {
        isDownRef.current = false;
    }, []);

    const handleClick = useCallback((item: SliderItemData, index: number) => {
        const denominator = numItems > 1 ? numItems - 1 : 1;
        targetProgressRef.current = (index / denominator) * 100;
        if (onItemClick) onItemClick(item, index);
    }, [numItems, onItemClick]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('touchstart', handleMouseDown, { passive: true });
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove, { passive: true });
        window.addEventListener('touchend', handleMouseUp);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('touchstart', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={containerRef}
            className="relative w-screen max-w-none overflow-x-auto overflow-y-hidden bg-black"
            style={{ height: '80vh', ...containerStyle, padding: 0, margin: 0 }}
        >
            <div className="relative z-10 h-full flex flex-row items-center gap-8 pointer-events-none w-max min-w-full" style={{ minWidth: '100vw' }}>
                {items.map((item, index) => (
                    <SliderItem
                        key={`slider-item-${index}`}
                        ref={(el) => { itemRefs.current[index] = el; }}
                        item={item}
                        index={index}
                        onClick={() => handleClick(item, index)}
                    />
                ))}
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-[90px] w-[1px] h-full bg-black/10" />
                <div
                    className="absolute bottom-0 left-[30px] text-black/30 text-[9px] uppercase tracking-widest font-heading"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '0% 10%' }}
                >
                    LibraVault
                </div>
            </div>
        </div>
    );
};

export default ThreeDSlider;
