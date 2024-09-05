import { gql } from "@apollo/client";
import Image from "next/image";
export default function FeaturedImage({
  image,
  width,
  height,
  className,
  priority,
  layout,
  ...props
}: {
  image: FeaturedImage;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  layout?: string;
}) {
  const src = image?.sourceUrl;
  const { altText } = image || {};

  width = width ? width : image?.mediaDetails?.width;
  height = height ? height : image?.mediaDetails?.height;
  layout = layout ?? "fill";

  return src && width && height ? (
    <figure className={className}>
      <Image
        src={src}
        alt={altText}
        layout={width ? undefined : layout}
        width={width}
        height={height}
        priority={priority}
        {...props}
      />
    </figure>
  ) : null;
}

FeaturedImage.fragments = {
  entry: gql`
    fragment FeaturedImageFragment on NodeWithFeaturedImage {
      featuredImage {
        node {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  `,
};
