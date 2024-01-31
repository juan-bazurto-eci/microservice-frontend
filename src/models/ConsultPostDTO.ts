import { isValidArray } from "@/utils/isValidArray";
import { PostType } from "@/types/postType";

export const ConsultPostDTO = (originalData: PostType[]): PostType[] => {
  if (!isValidArray(originalData)) return [];
  return originalData?.map((item) => ({
    userId: item?.userId ?? -1,
    id: item?.id ?? -1,
    title: item?.title ?? "",
    body: item?.body ?? "",
  }));
};

export const GetPostDTO = (originalData: PostType): PostType => {
  return {
    userId: originalData?.userId ?? -1,
    id: originalData?.id ?? -1,
    title: originalData?.title ?? "",
    body: originalData?.body ?? "",
  };
};
