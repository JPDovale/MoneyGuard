export abstract class TagModelResponse {
  abstract id: string;
  abstract name: string;
}

export abstract class TagResponsePartied {
  abstract tag: TagModelResponse | null;
}

export abstract class TagsResponsePartied {
  abstract tags: TagModelResponse[];
}
