import { Resolver, Query } from '@nestjs/graphql';
import { groups } from './groups';

@Resolver(groups)
export class GroupsResolver {
  // @Query(returns => )
}
