/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
    // GraphQLBoolean,
    GraphQLInt,
    // GraphQLFloat,
    GraphQLString,

    // GraphQLID,
    // GraphQLList,
    // GraphQLNonNull,
    GraphQLObjectType,

    GraphQLSchema
} from 'graphql';

import {
    fromGlobalId,
    globalIdField,
    nodeDefinitions,

    // connectionArgs,
    // connectionDefinitions,
    // connectionFromArray,

    // mutationWithClientMutationId
} from 'graphql-relay';

import {
    World
} from './database';

const worldType = new GraphQLObjectType({
    name: 'World',

    description: 'A world exploring application',

    fields: () => ({
        'id': globalIdField('World'),
        'name': {
            type: GraphQLString,
            description: 'What the World is called'
        },
        'size': {
            type: GraphQLInt,
            description: 'How big the world is'
        }
    }),

    interfaces: [nodeInterface]
});

const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);

        if (type === 'World') {
            return World.get(id);
        }

        return null;
    },

    (obj) => {
        if (obj instanceof World) {
            return worldType;

        } else {
            return null;
        }
    }
);

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,

        world: {
            type: worldType,
            resolve: (id) => World.get(id)
        }
    })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const Schema = new GraphQLSchema({
    query: queryType,
    // Uncomment the following after adding some mutation fields:
    // mutation: mutationType
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// const exploreCity = mutationWithClientMutationId({
//     name: 'ExploreCity',
//
//     inputFields: {
//         id: { type: new GraphQLNonNull(GraphQLID) }
//     },
//
//     outputFields: {
//         city: {
//             type: cityType,
//             resolve: ({localCityId}) => getCity(localCityId)
//         },
//         world: {
//             type: worldType,
//             resolve: (id) => World.get(id)
//         },
//     },
//
//     mutateAndGetPayload: ({id}) => {
//         let localCityId = fromGlobalId(id).id;
//
//         exploreCity(localCityId);
//
//         return {localCityId};
//     }
// });

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
// const mutationType = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: () => ({
//         // Add your own mutations here
//     })
// });
