import { useState } from "react";

const ImageWithPlaceholder = ({ src, alt, className, style, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className={`relative ${className || ""}`} style={style}>
            {/* Placeholder shown while loading */}
            {isLoading && (
                <div
                    className="absolute inset-0 bg-gradient-to-br from-milk-yellow to-light-brown animate-pulse flex items-center justify-center"
                    style={{ borderRadius: "inherit" }}
                >
                    <svg
                        className="w-12 h-12 text-dark-brown opacity-30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>
            )}

            {/* Error placeholder */}
            {hasError && (
                <div
                    className="absolute inset-0 bg-gradient-to-br from-red-brown to-dark-brown flex items-center justify-center"
                    style={{ borderRadius: "inherit" }}
                >
                    <svg
                        className="w-12 h-12 text-milk opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
            )}

            {/* Actual image */}
            <img
                src={src}
                alt={alt || ""}
                className={`w-full h-full transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
                style={{ objectFit: "inherit", ...style }}
                onLoad={handleLoad}
                onError={handleError}
                {...props}
            />
        </div>
    );
};

export default ImageWithPlaceholder;
