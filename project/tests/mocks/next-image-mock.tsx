import { JSX } from "react";

export const Image = ({ src, alt, width, height, priority, className, ...props }: any): JSX.Element => {
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
