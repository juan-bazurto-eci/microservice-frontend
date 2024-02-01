import { ConsultPostDTO, GetPostDTO } from "@/models/ConsultPostDTO";

describe("ConsultPostDTO Function", () => {
  it("should return an empty array if originalData is an empty array", () => {
    const result = ConsultPostDTO([]);
    expect(result).toEqual([]);
  });

  it("should transform the array of PostType objects", () => {
    const originalData = [
      {
        userId: 1,
        id: 101,
        title: "Post 1",
        body: "Body 1",
      },
      {
        userId: 2,
        id: 102,
        title: "Post 2",
        body: "Body 2",
      },
    ];

    const result = ConsultPostDTO(originalData);

    expect(Array.isArray(result)).toBe(true);

    result.forEach((item: any, index: number) => {
      expect(item.userId).toBe(originalData[index]?.userId ?? -1);
      expect(item.id).toBe(originalData[index]?.id ?? -1);
      expect(item.title).toBe(originalData[index]?.title ?? "");
      expect(item.body).toBe(originalData[index]?.body ?? "");
    });
  });
});

describe("GetPostDTO Function", () => {
  it("should return a default PostType object if originalData is null", () => {
    const result = GetPostDTO({});
    const expectedResult = {
      userId: -1,
      id: -1,
      title: "",
      body: "",
    };
    expect(result).toEqual(expectedResult);
  });

  it("should transform the PostType object", () => {
    const originalData = {
      userId: 1,
      id: 101,
      title: "Post 1",
      body: "Body 1",
    };

    const result = GetPostDTO(originalData);

    expect(typeof result).toBe("object");

    expect(result.userId).toBe(originalData.userId ?? -1);
    expect(result.id).toBe(originalData.id ?? -1);
    expect(result.title).toBe(originalData.title ?? "");
    expect(result.body).toBe(originalData.body ?? "");
  });
});
