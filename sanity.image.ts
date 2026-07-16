import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./sanity.client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: Image) {
  return builder.image(source);
}
