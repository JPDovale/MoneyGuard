import { Requester } from '@config/requests/requester';
import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { CreateTagGateway } from '@modules/Tags/gateways/CreateTag';
import { TagModelResponse } from '@modules/Tags/presenters/types';
import { create } from 'zustand';

interface UseTags {
  tags: TagModelResponse[];
  isLoading: boolean;

  createTag: (
    data: CreateTagGateway,
  ) => Promise<{ status: number; message: string }>;
  loadTags: () => Promise<void>;
}

export const useTags = create<UseTags>((set, get) => {
  return {
    tags: [],
    isLoading: true,

    createTag: async (data) => {
      const response = await Requester.request({
        access: 'create-tag',
        data: {
          name: data.name,
        },
      });

      if (response.status === statusCodeMapper.Created) {
        const { tags } = get();

        const updatedTags = [response.data.tag, ...tags];

        set({ tags: updatedTags });
      }

      return { status: response.status, message: response.message };
    },

    loadTags: async () => {
      const response = await Requester.request({
        access: 'get-tags',
        data: null,
      });

      if (response.status === statusCodeMapper.OK) {
        set({
          tags: response.data.tags,
        });
      }

      set({ isLoading: false });
    },
  };
});
