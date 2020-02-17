/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContainer = `mutation CreateContainer(
  $input: CreateContainerInput!
  $condition: ModelContainerConditionInput
) {
  createContainer(input: $input, condition: $condition) {
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
export const updateContainer = `mutation UpdateContainer(
  $input: UpdateContainerInput!
  $condition: ModelContainerConditionInput
) {
  updateContainer(input: $input, condition: $condition) {
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
export const deleteContainer = `mutation DeleteContainer(
  $input: DeleteContainerInput!
  $condition: ModelContainerConditionInput
) {
  deleteContainer(input: $input, condition: $condition) {
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
