import { JSX } from "react";

interface NextImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  className?: string;
  [key: string]: unknown;
}

export const Image = ({
  src,
  alt,
  width,
  height,
  priority,
  className,
  ...props
}: NextImageProps): JSX.Element => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      className={className}
      {...props}
    />
  );
};
