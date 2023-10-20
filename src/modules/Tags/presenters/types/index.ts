export abstract class TagModelResponse {
  abstract id: string;
  abstract name: string;
  abstract createdAt: Date;
  abstract updatedAt: Date | null;
}

export abstract class TagResponsePartied {
  abstract tag: TagModelResponse | null;
}

export abstract class TagsResponsePartied {
  abstract tags: TagModelResponse[];
}
