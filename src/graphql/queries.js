/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContainer = `query GetContainer($id: ID!) {
  getContainer(id: $id) {
    id
    whereismycontainerId
    pickup {
      name
      address
    }
    delivery {
      name
      address
    }
    shipperReference
  }
}
`;
export const listContainers = `query ListContainers(
  $filter: ModelContainerFilterInput
  $limit: Int
  $nextToken: String
) {
  listContainers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      whereismycontainerId
      pickup {
        name
        address
      }
      delivery {
        name
        address
      }
      shipperReference
    }
    nextToken
  }
}
`;
