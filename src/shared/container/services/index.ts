import { container } from 'tsyringe';
import { InjectableKeys } from '../keys';
import { CreateTagService } from '@modules/Tags/services/CreateTag';
import { GetTagsService } from '@modules/Tags/services/GetTags';

container.registerSingleton(InjectableKeys.CreateTagService, CreateTagService);
container.registerSingleton(InjectableKeys.GetTagsService, GetTagsService);
