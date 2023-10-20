import gql from 'graphql-tag'
export const allItemQuery = gql`
  query Items {
    items {
      data {
        id
        attributes {
          Name
          Date
          Important
        }
      }
    }
  }
`
export const postItem = gql`
  mutation createItem ($name: String!, $date: DateTime, $important: Boolean) {
    createItem(
      data: {  Name: $name, Date: $date, Important: $important  }
    ) {
      data  {
        attributes{
          Name
        Date
        Important
        }
      }
    }
  }
`
